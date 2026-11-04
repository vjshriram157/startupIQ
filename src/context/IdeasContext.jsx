import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { initialIdeas } from '../data/initialIdeas';

export const IdeasContext = createContext(null);

const STORAGE_KEYS = {
  IDEAS: '@startupiq_ideas_v4',
  BOOKMARKS: '@startupiq_bookmarks_v4',
  USER_VOTES: '@startupiq_user_votes_v4',
  SUBMISSIONS: '@startupiq_user_submissions_v4',
};

// In-Memory Fallback Map (Session Cache)
const memoryStore = new Map();

// Sequential write queue to serialize all disk writes and avoid race conditions
let writeQueue = Promise.resolve();
const queueWrite = (task) => {
  const currentTask = writeQueue.then(task).catch((err) => {
    console.warn('[StartupIQ Storage Queue] Write task error:', err);
    return { success: false, error: err?.message || 'Unexpected queue task error' };
  });
  // Advance the queue chain to the new task
  writeQueue = currentTask;
  return currentTask;
};

// Cross-Platform Storage Adapter with Defensive Fallbacks and Availability Probing
const storage = {
  // Probe persistent storage availability
  testAvailability: async () => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        const testKey = '@startupiq_canary';
        window.localStorage.setItem(testKey, '1');
        window.localStorage.removeItem(testKey);
        return { isPersistent: true, status: 'persistent', error: null };
      }
      const instance = AsyncStorage?.default || AsyncStorage;
      if (instance && typeof instance.setItem === 'function') {
        const testKey = '@startupiq_canary';
        await instance.setItem(testKey, '1');
        await instance.removeItem(testKey);
        return { isPersistent: true, status: 'persistent', error: null };
      }
      return {
        isPersistent: false,
        status: 'in-memory-fallback',
        error: 'AsyncStorage instance or setItem method is not available in environment.',
      };
    } catch (err) {
      return {
        isPersistent: false,
        status: 'in-memory-fallback',
        error: err?.message || 'Persistent storage probe failed.',
      };
    }
  },

  getItem: async (key) => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        const val = window.localStorage.getItem(key);
        if (val !== null) return val;
        return memoryStore.get(key) || null;
      }
      const instance = AsyncStorage?.default || AsyncStorage;
      if (instance && typeof instance.getItem === 'function') {
        const val = await instance.getItem(key);
        if (val !== null) return val;
      }
      return memoryStore.get(key) || null;
    } catch (err) {
      console.warn(`[StartupIQ Storage] getItem error for "${key}". Falling back to session memory:`, err);
      return memoryStore.get(key) || null;
    }
  },

  setItem: async (key, val) => {
    // Always keep in-memory cache synchronized immediately
    memoryStore.set(key, val);

    return queueWrite(async () => {
      try {
        if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, val);
          return { success: true };
        }
        const instance = AsyncStorage?.default || AsyncStorage;
        if (instance && typeof instance.setItem === 'function') {
          await instance.setItem(key, val);
          return { success: true };
        }
        return {
          success: false,
          error: 'AsyncStorage not available, saved to session memory only.',
        };
      } catch (err) {
        console.warn(`[StartupIQ Storage Error] Failed to persist "${key}" to disk storage. Saved to session memory fallback:`, err);
        return { success: false, error: err?.message || 'Failed to write to persistent storage' };
      }
    });
  },

  multiRemove: async (keys) => {
    keys.forEach((k) => memoryStore.delete(k));

    return queueWrite(async () => {
      try {
        if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
          keys.forEach((k) => window.localStorage.removeItem(k));
          return { success: true };
        }
        const instance = AsyncStorage?.default || AsyncStorage;
        if (instance && typeof instance.multiRemove === 'function') {
          await instance.multiRemove(keys);
          return { success: true };
        }
        return { success: false };
      } catch (err) {
        console.warn('[StartupIQ Storage Error] multiRemove failed:', err);
        return { success: false, error: err?.message };
      }
    });
  },
};

export const IdeasProvider = ({ children }) => {
  const [ideas, setIdeas] = useState(initialIdeas);
  const [bookmarks, setBookmarks] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Storage reliability & persistence indicators
  const [isPersistentStorageAvailable, setIsPersistentStorageAvailable] = useState(true);
  const [storageStatus, setStorageStatus] = useState('initializing'); // 'persistent' | 'in-memory-fallback'
  const [storageError, setStorageError] = useState(null);

  // Mutable refs to prevent race conditions during async state transitions
  const ideasRef = useRef(initialIdeas);
  const userVotesRef = useRef({});
  const bookmarksRef = useRef([]);
  const userSubmissionsRef = useRef([]);
  const isHydratingRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => {
    ideasRef.current = ideas;
  }, [ideas]);
  useEffect(() => {
    userVotesRef.current = userVotes;
  }, [userVotes]);
  useEffect(() => {
    bookmarksRef.current = bookmarks;
  }, [bookmarks]);
  useEffect(() => {
    userSubmissionsRef.current = userSubmissions;
  }, [userSubmissions]);

  // Safe haptic feedback trigger for mobile
  const triggerHaptic = useCallback(async (style = 'medium') => {
    try {
      if (Platform.OS === 'web' || !Haptics) return;
      if (style === 'light' && typeof Haptics.impactAsync === 'function') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle?.Light || 'light');
      } else if (style === 'heavy' && typeof Haptics.impactAsync === 'function') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle?.Heavy || 'heavy');
      } else if (style === 'success' && typeof Haptics.notificationAsync === 'function') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType?.Success || 'success');
      } else if (typeof Haptics.impactAsync === 'function') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle?.Medium || 'medium');
      }
    } catch {
      // Haptics not available on unsupported platforms/emulators
    }
  }, []);

  // Hydrate from Storage with Availability Diagnostics
  const loadData = useCallback(async () => {
    if (isHydratingRef.current) return;
    isHydratingRef.current = true;

    try {
      setIsLoading(true);

      // 1. Probe storage availability
      const probe = await storage.testAvailability();
      setIsPersistentStorageAvailable(probe.isPersistent);
      setStorageStatus(probe.status);
      setStorageError(probe.error);

      if (!probe.isPersistent) {
        console.warn(`[StartupIQ Storage Alert] ${probe.error} Running in in-memory session mode. Data will NOT persist after restarting the application.`);
      }

      // 2. Load stored items concurrently
      const [storedIdeas, storedBookmarks, storedVotes, storedSubmissions] = await Promise.all([
        storage.getItem(STORAGE_KEYS.IDEAS),
        storage.getItem(STORAGE_KEYS.BOOKMARKS),
        storage.getItem(STORAGE_KEYS.USER_VOTES),
        storage.getItem(STORAGE_KEYS.SUBMISSIONS),
      ]);

      if (storedIdeas) {
        try {
          const parsed = JSON.parse(storedIdeas);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setIdeas(parsed);
            ideasRef.current = parsed;
          } else {
            setIdeas(initialIdeas);
            ideasRef.current = initialIdeas;
            await storage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(initialIdeas));
          }
        } catch {
          setIdeas(initialIdeas);
          ideasRef.current = initialIdeas;
        }
      } else {
        setIdeas(initialIdeas);
        ideasRef.current = initialIdeas;
        await storage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(initialIdeas));
      }

      if (storedBookmarks) {
        try {
          const parsedB = JSON.parse(storedBookmarks) || [];
          setBookmarks(parsedB);
          bookmarksRef.current = parsedB;
        } catch {
          setBookmarks([]);
          bookmarksRef.current = [];
        }
      }

      if (storedVotes) {
        try {
          const parsedV = JSON.parse(storedVotes) || {};
          setUserVotes(parsedV);
          userVotesRef.current = parsedV;
        } catch {
          setUserVotes({});
          userVotesRef.current = {};
        }
      }

      if (storedSubmissions) {
        try {
          const parsedS = JSON.parse(storedSubmissions) || [];
          setUserSubmissions(parsedS);
          userSubmissionsRef.current = parsedS;
        } catch {
          setUserSubmissions([]);
          userSubmissionsRef.current = [];
        }
      }
    } catch (error) {
      console.warn('Error loading StartupIQ data from storage:', error);
      setIdeas(initialIdeas);
      ideasRef.current = initialIdeas;
    } finally {
      setIsLoading(false);
      isHydratingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Persist ideas helper using atomic serialization
  const persistIdeas = async (updatedIdeas) => {
    try {
      setIdeas(updatedIdeas);
      ideasRef.current = updatedIdeas;
      const res = await storage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(updatedIdeas));
      if (!res.success && isPersistentStorageAvailable) {
        setIsPersistentStorageAvailable(false);
        setStorageStatus('in-memory-fallback');
        setStorageError(res.error);
      }
    } catch (err) {
      console.warn('[StartupIQ Storage Error] persistIdeas failed:', err);
    }
  };

  // Toggle upvote on an idea (Race-condition safe using refs & sequential write)
  const toggleVote = useCallback(
    async (ideaId) => {
      triggerHaptic('medium');
      const currentVotes = userVotesRef.current;
      const isCurrentlyVoted = Boolean(currentVotes[ideaId]);
      const newVotesState = {
        ...currentVotes,
        [ideaId]: !isCurrentlyVoted,
      };

      setUserVotes(newVotesState);
      userVotesRef.current = newVotesState;
      await storage.setItem(STORAGE_KEYS.USER_VOTES, JSON.stringify(newVotesState));

      const updated = ideasRef.current.map((idea) => {
        if (idea.id === ideaId) {
          const delta = isCurrentlyVoted ? -1 : 1;
          return {
            ...idea,
            votes: Math.max(0, (idea.votes || 0) + delta),
          };
        }
        return idea;
      });

      await persistIdeas(updated);
    },
    [triggerHaptic]
  );

  // Toggle bookmark (Race-condition safe)
  const toggleBookmark = useCallback(
    async (ideaId) => {
      triggerHaptic('light');
      const currentBookmarks = bookmarksRef.current;
      let newBookmarks;
      if (currentBookmarks.includes(ideaId)) {
        newBookmarks = currentBookmarks.filter((id) => id !== ideaId);
      } else {
        newBookmarks = [...currentBookmarks, ideaId];
      }
      setBookmarks(newBookmarks);
      bookmarksRef.current = newBookmarks;
      await storage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(newBookmarks));
    },
    [triggerHaptic]
  );

  // Add a new idea from Submit Screen (Race-condition safe)
  const addIdea = useCallback(
    async (newIdeaData) => {
      triggerHaptic('success');
      const id = `startup-${Date.now()}`;
      const newIdea = {
        id,
        title: newIdeaData.title.trim(),
        tagline: newIdeaData.tagline.trim(),
        description: newIdeaData.description.trim(),
        problem: newIdeaData.problem?.trim() || 'Acute industry inefficiency and high friction costs.',
        solution: newIdeaData.solution?.trim() || 'Modern automated software solution built for scale.',
        category: newIdeaData.category || 'AI & ML',
        stage: newIdeaData.stage || 'Idea / Concept',
        marketSize: newIdeaData.marketSize?.trim() || 'Expanding Global TAM',
        businessModel: newIdeaData.businessModel?.trim() || 'B2B SaaS / Usage-Based',
        targetAudience: newIdeaData.targetAudience?.trim() || 'Enterprise & Scaleup Teams',
        traction: newIdeaData.traction?.trim() || 'Newly submitted on StartupIQ',
        founder: {
          name: newIdeaData.founderName?.trim() || 'Community Innovator',
          role: 'Founder & CEO',
          credentials: newIdeaData.founderCredentials?.trim() || 'StartupIQ Builder',
          initials: (newIdeaData.founderName || 'CI')
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase(),
          avatarColor: '#FFDE59',
        },
        votes: 1, // Start with 1 vote from author
        views: 1,
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        comments: [],
      };

      const updated = [newIdea, ...ideasRef.current];
      await persistIdeas(updated);

      // Automatically register user's upvote for their newly submitted idea
      const newVotesState = { ...userVotesRef.current, [id]: true };
      setUserVotes(newVotesState);
      userVotesRef.current = newVotesState;

      const newSubmissions = [id, ...userSubmissionsRef.current];
      setUserSubmissions(newSubmissions);
      userSubmissionsRef.current = newSubmissions;

      await storage.setItem(STORAGE_KEYS.USER_VOTES, JSON.stringify(newVotesState));
      await storage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(newSubmissions));

      return newIdea;
    },
    [triggerHaptic]
  );

  // Add comment / Q&A to an idea with role badge and founder tags
  const addComment = useCallback(
    async (ideaId, commentText, author = 'Anonymous Angel', role = 'Angel Investor', isFounder = false) => {
      if (!commentText?.trim()) return;
      triggerHaptic('light');

      const roleColorMap = {
        'Founder': { bg: '#FEF08A', icon: '🦄' },
        'Angel Investor': { bg: '#D1FAE5', icon: '💼' },
        'Lead Dev': { bg: '#E0F2FE', icon: '⚡' },
        'Product Scout': { bg: '#DDD6FE', icon: '🎯' },
        'Community Angel': { bg: '#FED7AA', icon: '🔍' },
      };

      const meta = roleColorMap[role] || { bg: '#F3F4F6', icon: '💬' };

      const newComment = {
        id: `c-${Date.now()}`,
        author: author.trim() || 'Anonymous Angel',
        role: role || 'Angel Investor',
        roleIcon: meta.icon,
        roleBg: meta.bg,
        isFounder: Boolean(isFounder || role === 'Founder'),
        initials: (author || 'AA')
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
        text: commentText.trim(),
        likes: 0,
        timestamp: 'Just now',
        replies: [],
      };

      const updated = ideasRef.current.map((idea) => {
        if (idea.id === ideaId) {
          const currentComments = idea.comments || [];
          return {
            ...idea,
            comments: [newComment, ...currentComments],
            commentsCount: (idea.commentsCount || 0) + 1,
          };
        }
        return idea;
      });

      await persistIdeas(updated);
    },
    [triggerHaptic]
  );

  // Like a comment / Q&A entry
  const likeComment = useCallback(
    async (ideaId, commentId) => {
      triggerHaptic('light');
      const updated = ideasRef.current.map((idea) => {
        if (idea.id === ideaId && idea.comments) {
          const updatedComments = idea.comments.map((c) => {
            if (c.id === commentId) {
              return { ...c, likes: (c.likes || 0) + 1 };
            }
            return c;
          });
          return { ...idea, comments: updatedComments };
        }
        return idea;
      });
      await persistIdeas(updated);
    },
    [triggerHaptic]
  );

  // Update venture milestone roadmap
  const updateMilestones = useCallback(
    async (ideaId, updatedMilestones) => {
      triggerHaptic('light');
      const updated = ideasRef.current.map((idea) => {
        if (idea.id === ideaId) {
          return { ...idea, milestones: updatedMilestones };
        }
        return idea;
      });
      await persistIdeas(updated);
    },
    [triggerHaptic]
  );

  // Reset to initial sample data
  const resetToDefaults = useCallback(async () => {
    triggerHaptic('heavy');
    try {
      await storage.multiRemove([
        STORAGE_KEYS.IDEAS,
        STORAGE_KEYS.BOOKMARKS,
        STORAGE_KEYS.USER_VOTES,
        STORAGE_KEYS.SUBMISSIONS,
      ]);
      setIdeas(initialIdeas);
      ideasRef.current = initialIdeas;
      setBookmarks([]);
      bookmarksRef.current = [];
      setUserVotes({});
      userVotesRef.current = {};
      setUserSubmissions([]);
      userSubmissionsRef.current = [];
      await storage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(initialIdeas));
    } catch (err) {
      console.warn('[StartupIQ Storage Error] resetToDefaults failed:', err);
    }
  }, [triggerHaptic]);

  // Total votes cast by this user
  const totalUserVotes = useMemo(() => {
    return Object.values(userVotes).filter(Boolean).length;
  }, [userVotes]);

  const value = {
    ideas,
    isLoading,
    bookmarks,
    userVotes,
    userSubmissions,
    totalUserVotes,
    // Storage reliability indicators
    isPersistentStorageAvailable,
    storageStatus,
    storageError,
    // Mutators
    toggleVote,
    toggleBookmark,
    addIdea,
    addComment,
    likeComment,
    updateMilestones,
    resetToDefaults,
    refreshIdeas: loadData,
  };

  return <IdeasContext.Provider value={value}>{children}</IdeasContext.Provider>;
};
