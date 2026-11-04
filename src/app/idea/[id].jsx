import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Share,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ChevronUp,
  Bookmark,
  Share2,
  TrendingUp,
  Target,
  DollarSign,
  AlertCircle,
  Lightbulb,
  Send,
  MessageSquare,
  Sparkles,
  ThumbsUp,
  Reply,
  ShieldCheck,
} from 'lucide-react-native';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { GradientButton } from '../../components/common/GradientButton';
import { AiPitchEvaluator } from '../../components/pitch/AiPitchEvaluator';
import { MilestoneTracker } from '../../components/pitch/MilestoneTracker';
import { useIdeas } from '../../hooks/useIdeas';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, neoShadows } from '../../theme/spacing';

const ROLES = [
  { id: 'Angel Investor', label: 'Angel Investor', icon: '💼' },
  { id: 'Lead Dev', label: 'Lead Dev', icon: '⚡' },
  { id: 'Product Scout', label: 'Product Scout', icon: '🎯' },
  { id: 'Founder', label: 'Founder', icon: '🦄' },
  { id: 'Community Angel', label: 'Community', icon: '🔍' },
];

export default function IdeaDetailScreen() {
  const insets = useLocalSearchParams();
  const safeInsets = useSafeAreaInsets();
  const { id } = insets;

  const {
    ideas,
    userVotes,
    bookmarks,
    toggleVote,
    toggleBookmark,
    addComment,
    likeComment,
    updateMilestones,
  } = useIdeas();

  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedRole, setSelectedRole] = useState('Angel Investor');

  const idea = useMemo(() => {
    return ideas.find((item) => item.id === id);
  }, [ideas, id]);

  const isVoted = Boolean(userVotes[id]);
  const isBookmarked = bookmarks.includes(id);

  if (!idea) {
    return (
      <View style={[styles.container, styles.center, { paddingTop: safeInsets.top }]}>
        <Text style={[typography.h3, { color: colors.ink }]}>Startup not found</Text>
        <GradientButton
          title="Back to Explore"
          onPress={() => router.back()}
          size="sm"
          variant="yellow"
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out "${idea.title}" on StartupIQ: ${idea.tagline}\nUpvote on StartupIQ!`,
        title: idea.title,
      });
    } catch {
      // share dismissed
    }
  };

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    addComment(
      idea.id,
      commentText,
      authorName.trim() || `${selectedRole}`,
      selectedRole,
      selectedRole === 'Founder'
    );
    setCommentText('');
  };

  const handleReplyTo = (author) => {
    setCommentText(`@${author} `);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { paddingTop: safeInsets.top }]}>
        {/* Top App Bar */}
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={20} color={colors.ink} strokeWidth={2.5} />
          </Pressable>

          <View style={styles.topRightActions}>
            <Pressable
              onPress={() => toggleBookmark(idea.id)}
              style={({ pressed }) => [
                styles.iconBtn,
                isBookmarked && styles.iconBtnActive,
                pressed && styles.iconBtnPressed,
              ]}
              accessibilityLabel="Bookmark this idea"
            >
              <Bookmark
                size={18}
                color={colors.ink}
                strokeWidth={2.5}
                fill={isBookmarked ? colors.yellow : 'transparent'}
              />
            </Pressable>

            <Pressable
              onPress={handleShare}
              style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
              accessibilityLabel="Share this idea"
            >
              <Share2 size={18} color={colors.ink} strokeWidth={2.5} />
            </Pressable>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Category & Stage header */}
          <View style={styles.badgeRow}>
            <Badge label={idea.category} type="category" showIcon />
            <Badge label={idea.stage} type="stage" style={{ marginLeft: 8 }} showIcon />
          </View>

          {/* Hero Titles */}
          <Text style={[typography.h1, styles.title]}>{idea.title}</Text>
          <View style={styles.taglineBox}>
            <Text style={[typography.subtitle, styles.tagline]}>{idea.tagline}</Text>
          </View>

          {/* Traction Highlight Banner */}
          {idea.traction && (
            <GlassCard variant="mint" shadow="md" style={styles.tractionCard}>
              <View style={styles.tractionRow}>
                <Sparkles size={18} color="#121212" strokeWidth={2.5} style={{ marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Text style={[typography.captionSmall, styles.tractionLabel]}>
                    VERIFIED TRACTION & MILESTONES
                  </Text>
                  <Text style={[typography.caption, styles.tractionText]}>
                    {idea.traction}
                  </Text>
                </View>
              </View>
            </GlassCard>
          )}

          {/* Founder Profile Card */}
          <GlassCard style={styles.founderCard} shadow="sm">
            <View style={styles.founderRow}>
              <View
                style={[
                  styles.founderAvatar,
                  { backgroundColor: idea.founder?.avatarColor || colors.yellow },
                ]}
              >
                <Text style={styles.avatarInitials}>
                  {idea.founder?.initials || 'FD'}
                </Text>
              </View>
              <View style={styles.founderMeta}>
                <Text style={[typography.bodyBold, styles.founderName]}>
                  {idea.founder?.name || 'Venture Founder'}
                </Text>
                <Text style={[typography.caption, styles.founderRole]}>
                  {idea.founder?.role || 'Founder & CEO'}
                </Text>
                <Text style={[typography.captionSmall, styles.founderCreds]} numberOfLines={2}>
                  {idea.founder?.credentials || 'StartupIQ Innovator'}
                </Text>
              </View>
            </View>
          </GlassCard>

          {/* Executive Overview */}
          <Text style={[typography.subtitle, styles.sectionHeader]}>
            Executive Overview
          </Text>
          <GlassCard style={styles.contentCard} shadow="sm">
            <Text style={[typography.body, styles.bodyText]}>{idea.description}</Text>
          </GlassCard>

          {/* AI Pitch Evaluator & Score Engine */}
          <AiPitchEvaluator idea={idea} />

          {/* Problem Statement */}
          <Text style={[typography.subtitle, styles.sectionHeader]}>
            The Acute Problem
          </Text>
          <GlassCard variant="coral" color="#FEE2E2" shadow="md" style={styles.contentCard}>
            <View style={styles.iconHeadingRow}>
              <View style={[styles.miniIconBox, { backgroundColor: colors.coral }]}>
                <AlertCircle size={14} color="#FFFFFF" strokeWidth={3} />
              </View>
              <Text style={[typography.caption, styles.accentHeading, { color: colors.coral }]}>
                MARKET PAIN POINT
              </Text>
            </View>
            <Text style={[typography.body, styles.bodyTextDark]}>{idea.problem}</Text>
          </GlassCard>

          {/* The Solution */}
          <Text style={[typography.subtitle, styles.sectionHeader]}>
            The 10x Solution
          </Text>
          <GlassCard variant="yellow" shadow="md" style={styles.contentCard}>
            <View style={styles.iconHeadingRow}>
              <View style={[styles.miniIconBox, { backgroundColor: colors.yellow }]}>
                <Lightbulb size={14} color="#121212" strokeWidth={3} />
              </View>
              <Text style={[typography.caption, styles.accentHeading, { color: colors.ink }]}>
                CORE INNOVATION
              </Text>
            </View>
            <Text style={[typography.body, styles.bodyTextDark]}>{idea.solution}</Text>
          </GlassCard>

          {/* Business Model & Target Market */}
          <Text style={[typography.subtitle, styles.sectionHeader]}>
            Business Model & Target Audience
          </Text>
          <GlassCard variant="cyan" color="#E0F2FE" shadow="md" style={styles.contentCard}>
            <View style={styles.modelRow}>
              <DollarSign size={16} color={colors.ink} strokeWidth={3} style={{ marginRight: 6 }} />
              <Text style={[typography.caption, styles.accentHeading, { color: colors.ink }]}>
                MONETIZATION STRATEGY
              </Text>
            </View>
            <Text style={[typography.body, styles.bodyTextDark, { marginBottom: 12 }]}>
              {idea.businessModel || 'B2B SaaS with usage metering'}
            </Text>

            <View style={styles.modelRow}>
              <Target size={16} color={colors.ink} strokeWidth={3} style={{ marginRight: 6 }} />
              <Text style={[typography.caption, styles.accentHeading, { color: colors.ink }]}>
                TARGET CUSTOMERS
              </Text>
            </View>
            <Text style={[typography.body, styles.bodyTextDark]}>
              {idea.targetAudience || 'Enterprise and growth-stage software companies'}
            </Text>

            {idea.marketSize && (
              <>
                <View style={[styles.modelRow, { marginTop: 12 }]}>
                  <TrendingUp size={16} color={colors.ink} strokeWidth={3} style={{ marginRight: 6 }} />
                  <Text style={[typography.caption, styles.accentHeading, { color: colors.ink }]}>
                    MARKET SIZE (TAM)
                  </Text>
                </View>
                <Text style={[typography.body, styles.bodyTextDark]}>{idea.marketSize}</Text>
              </>
            )}
          </GlassCard>

          {/* Milestone Roadmap Tracker */}
          <MilestoneTracker
            initialMilestones={idea.milestones}
            onMilestoneToggle={(updated) => updateMilestones?.(idea.id, updated)}
          />

          {/* Community Discussion & Founder Q&A Section */}
          <View style={styles.commentHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MessageSquare size={18} color={colors.ink} strokeWidth={2.5} style={{ marginRight: 8 }} />
              <Text style={[typography.subtitle, styles.sectionHeader, { marginTop: 0, marginBottom: 0 }]}>
                Founder Q&A & Investor Reviews ({idea.comments?.length || 0})
              </Text>
            </View>
          </View>

          {/* Add feedback box */}
          <GlassCard style={styles.addCommentCard} shadow="sm">
            {/* Role Selector Pills */}
            <Text style={styles.roleLabel}>I AM COMMENTING AS:</Text>
            <View style={styles.roleRow}>
              {ROLES.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <Pressable
                    key={role.id}
                    onPress={() => setSelectedRole(role.id)}
                    style={[
                      styles.rolePill,
                      isSelected && styles.rolePillActive,
                    ]}
                  >
                    <Text style={styles.rolePillIcon}>{role.icon}</Text>
                    <Text
                      style={[
                        styles.rolePillText,
                        isSelected && styles.rolePillTextActive,
                      ]}
                    >
                      {role.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <TextInput
              style={[typography.caption, styles.authorInput]}
              placeholder="Your name or handle (optional)"
              placeholderTextColor={colors.textPlaceholder}
              value={authorName}
              onChangeText={setAuthorName}
              maxLength={40}
            />
            <TextInput
              style={[typography.bodyBold, styles.commentInput]}
              placeholder="Ask the founder a question, evaluate the moat, or share investor feedback..."
              placeholderTextColor={colors.textPlaceholder}
              value={commentText}
              onChangeText={setCommentText}
              multiline
              numberOfLines={2}
              maxLength={250}
            />
            <View style={styles.sendRow}>
              <Text style={styles.commentCharCount}>
                {commentText.length}/250
              </Text>
              <GradientButton
                title="Post Question / Feedback"
                icon={Send}
                iconPosition="right"
                variant="yellow"
                size="sm"
                onPress={handleSendComment}
                disabled={!commentText.trim()}
              />
            </View>
          </GlassCard>

          {/* Comments List */}
          {idea.comments?.length > 0 ? (
            idea.comments.map((comment) => {
              const isFounder = Boolean(comment.isFounder || comment.role === 'Founder');
              return (
                <GlassCard
                  key={comment.id}
                  variant={isFounder ? 'yellow' : 'subtle'}
                  shadow="sm"
                  style={[
                    styles.commentItemCard,
                    isFounder && styles.founderCommentCard,
                  ]}
                >
                  <View style={styles.commentAuthorRow}>
                    <View
                      style={[
                        styles.commentAvatar,
                        { backgroundColor: comment.roleBg || colors.yellowLight },
                      ]}
                    >
                      <Text style={styles.commentAvatarText}>
                        {comment.roleIcon || comment.initials || 'U'}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Text style={[typography.caption, styles.commentAuthorName]}>
                          {comment.author}
                        </Text>
                        {isFounder ? (
                          <View style={styles.verifiedFounderBadge}>
                            <ShieldCheck size={11} color="#121212" strokeWidth={3} style={{ marginRight: 2 }} />
                            <Text style={styles.verifiedFounderText}>FOUNDER VERIFIED</Text>
                          </View>
                        ) : (
                          <View
                            style={[
                              styles.roleBadgeSmall,
                              { backgroundColor: comment.roleBg || '#F3F4F6' },
                            ]}
                          >
                            <Text style={styles.roleBadgeSmallText}>
                              {comment.role || 'Member'}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={[typography.captionSmall, styles.commentAuthorRole]}>
                        {comment.timestamp}
                      </Text>
                    </View>

                    {/* Like comment button */}
                    <Pressable
                      onPress={() => likeComment(idea.id, comment.id)}
                      style={styles.commentLikeBtn}
                      hitSlop={8}
                    >
                      <ThumbsUp size={12} color="#121212" strokeWidth={2.5} style={{ marginRight: 4 }} />
                      <Text style={styles.commentLikeCount}>{comment.likes || 0}</Text>
                    </Pressable>
                  </View>

                  <Text style={[typography.body, styles.commentBodyText]}>{comment.text}</Text>

                  {/* Reply Action */}
                  <View style={styles.commentActionRow}>
                    <Pressable
                      onPress={() => handleReplyTo(comment.author)}
                      style={styles.replyBtn}
                      hitSlop={6}
                    >
                      <Reply size={12} color="#6B7280" strokeWidth={2.5} style={{ marginRight: 4 }} />
                      <Text style={styles.replyBtnText}>Reply</Text>
                    </Pressable>
                  </View>
                </GlassCard>
              );
            })
          ) : (
            <Text style={[typography.caption, styles.noCommentsText]}>
              No feedback yet. Be the first to share an evaluation or question!
            </Text>
          )}

          {/* Bottom spacing for floating CTA bar */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Floating Bottom Voting Bar */}
        <View style={[styles.bottomActionBar, { paddingBottom: Math.max(safeInsets.bottom, 12) }]}>
          <View style={styles.bottomStatsCol}>
            <Text style={styles.bottomVoteCount}>{idea.votes || 0}</Text>
            <Text style={styles.bottomVoteLabel}>COMMUNITY UPVOTES</Text>
          </View>

          <GradientButton
            title={isVoted ? 'Upvoted ✓' : 'Upvote Idea ⚡'}
            icon={ChevronUp}
            iconPosition="left"
            variant={isVoted ? 'mint' : 'yellow'}
            onPress={() => toggleVote(idea.id)}
            size="md"
            style={styles.voteCta}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: layout.borderWidthThick,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '2px 2px 0px #121212',
  },
  iconBtnPressed: {
    transform: [{ translateX: 1.5 }, { translateY: 1.5 }],
    boxShadow: '1px 1px 0px #121212',
  },
  iconBtnActive: {
    backgroundColor: colors.yellowLight,
  },
  topRightActions: {
    flexDirection: 'row',
    gap: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 8,
  },
  taglineBox: {
    backgroundColor: colors.yellowLight,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 14,
    alignSelf: 'flex-start',
    boxShadow: '2px 2px 0px #121212',
  },
  tagline: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
  },
  tractionCard: {
    marginBottom: 16,
    padding: 12,
  },
  tractionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tractionLabel: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  tractionText: {
    color: colors.ink,
    fontWeight: '700',
    marginTop: 2,
  },
  founderCard: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  founderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  founderAvatar: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    boxShadow: '2px 2px 0px #121212',
  },
  avatarInitials: {
    color: '#121212',
    fontWeight: '900',
    fontSize: 14,
  },
  founderMeta: {
    flex: 1,
  },
  founderName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '900',
  },
  founderRole: {
    color: colors.inkSecondary,
    fontWeight: '700',
    fontSize: 12,
  },
  founderCreds: {
    color: colors.inkMuted,
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  sectionHeader: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 10,
    marginBottom: 8,
  },
  contentCard: {
    marginBottom: 14,
    padding: 14,
  },
  bodyText: {
    color: colors.inkSecondary,
    lineHeight: 22,
    fontWeight: '500',
  },
  bodyTextDark: {
    color: colors.ink,
    lineHeight: 22,
    fontWeight: '600',
  },
  iconHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  miniIconBox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  modelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  accentHeading: {
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  commentHeaderRow: {
    marginTop: 10,
    marginBottom: 12,
  },
  addCommentCard: {
    padding: 12,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  authorInput: {
    color: colors.ink,
    backgroundColor: '#F8F6F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    fontWeight: '700',
  },
  commentInput: {
    color: colors.ink,
    backgroundColor: '#F8F6F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 56,
    borderWidth: 1.5,
    borderColor: colors.border,
    textAlignVertical: 'top',
    fontWeight: '600',
  },
  sendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  commentCharCount: {
    ...typography.captionSmall,
    color: colors.inkMuted,
    fontWeight: '700',
  },
  commentItemCard: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  commentAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.yellowLight,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  commentAvatarText: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 11,
  },
  commentAuthorName: {
    color: colors.ink,
    fontWeight: '900',
  },
  commentAuthorRole: {
    color: colors.inkMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  commentBodyText: {
    color: colors.inkSecondary,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  roleLabel: {
    ...typography.captionSmall,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  roleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  rolePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: layout.pillRadius,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  rolePillActive: {
    backgroundColor: colors.yellow,
    transform: [{ translateX: 1 }, { translateY: 1 }],
    boxShadow: '0.5px 0.5px 0px #121212',
  },
  rolePillIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  rolePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.ink,
  },
  rolePillTextActive: {
    fontWeight: '900',
  },
  founderCommentCard: {
    backgroundColor: '#FEFCE8',
    borderColor: '#EAB308',
    borderWidth: 2.5,
  },
  verifiedFounderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF08A',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft: 6,
  },
  verifiedFounderText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#121212',
    letterSpacing: 0.3,
  },
  roleBadgeSmall: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
    marginLeft: 6,
  },
  roleBadgeSmallText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#121212',
  },
  commentLikeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    boxShadow: '1px 1px 0px #121212',
  },
  commentLikeCount: {
    fontSize: 11,
    fontWeight: '900',
    color: '#121212',
  },
  commentActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  replyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  replyBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.inkMuted,
  },
  noCommentsText: {
    color: colors.inkMuted,
    textAlign: 'center',
    marginVertical: 14,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderTopWidth: layout.borderWidthThick,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingTop: 12,
    boxShadow: '0px -3px 0px #121212',
    elevation: 10,
  },
  bottomStatsCol: {
    justifyContent: 'center',
  },
  bottomVoteCount: {
    ...typography.h2,
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
  },
  bottomVoteLabel: {
    ...typography.captionSmall,
    color: colors.inkMuted,
    fontWeight: '900',
    fontSize: 9,
    letterSpacing: 0.5,
  },
  voteCta: {
    minWidth: 160,
  },
});
