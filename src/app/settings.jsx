import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  RotateCcw,
  Shield,
  Bell,
  Vibrate,
  Moon,
  Sparkles,
  Bookmark,
  ThumbsUp,
  FileText,
  Info,
  ChevronRight,
  Palette,
} from 'lucide-react-native';
import { GlassCard } from '../components/common/GlassCard';
import { GradientButton } from '../components/common/GradientButton';
import { useIdeas } from '../hooks/useIdeas';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, neoShadows } from '../theme/spacing';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const {
    ideas,
    userSubmissions,
    totalUserVotes,
    bookmarks,
    resetToDefaults,
  } = useIdeas();

  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleResetData = () => {
    Alert.alert(
      'Reset Sample Startups?',
      'This will restore all default startup proposals, reset user votes and clear custom submissions. This is helpful for testing.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Everything',
          style: 'destructive',
          onPress: async () => {
            await resetToDefaults();
            Alert.alert('Data Reset', 'StartupIQ has been restored to default sample data.');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={20} color={colors.ink} strokeWidth={2.5} />
        </Pressable>
        <Text style={[typography.h3, styles.topBarTitle]}>Settings & Profile</Text>
        <View style={{ width: 42 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <GlassCard variant="yellow" shadow="md" style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarInitials}>IQ</Text>
            </View>
            <View style={styles.profileMeta}>
              <View style={styles.nameRow}>
                <Text style={[typography.h3, styles.userName]}>Innovator</Text>
                <View style={styles.verifiedBadge}>
                  <Sparkles size={10} color="#121212" strokeWidth={3} style={{ marginRight: 3 }} />
                  <Text style={styles.verifiedText}>PRO JUDGE</Text>
                </View>
              </View>
              <Text style={[typography.caption, styles.userSub]}>
                Active Community Member & Founder
              </Text>
            </View>
          </View>

          {/* Stats Bar */}
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: colors.primaryLight }]}>
              <ThumbsUp size={16} color={colors.ink} strokeWidth={2.5} />
              <Text style={styles.statNumber}>{totalUserVotes}</Text>
              <Text style={styles.statLabel}>VOTES</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.mintLight }]}>
              <FileText size={16} color={colors.ink} strokeWidth={2.5} />
              <Text style={styles.statNumber}>{userSubmissions.length}</Text>
              <Text style={styles.statLabel}>PITCHES</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.pinkLight }]}>
              <Bookmark size={16} color={colors.ink} strokeWidth={2.5} />
              <Text style={styles.statNumber}>{bookmarks.length}</Text>
              <Text style={styles.statLabel}>SAVED</Text>
            </View>
          </View>
        </GlassCard>

        {/* Aesthetic Theme Indicator */}
        <Text style={[typography.subtitle, styles.sectionTitle]}>Theme & Design</Text>
        <GlassCard style={styles.sectionCard} shadow="sm">
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: colors.yellow }]}>
                <Palette size={18} color={colors.ink} strokeWidth={2.5} />
              </View>
              <View>
                <Text style={[typography.bodyBold, styles.settingName]}>Neo-Brutalism</Text>
                <Text style={[typography.captionSmall, styles.settingDesc]}>
                  High-contrast pop art with hard shadows
                </Text>
              </View>
            </View>
            <View style={styles.themePill}>
              <Text style={styles.themePillText}>ACTIVE</Text>
            </View>
          </View>
        </GlassCard>

        {/* Preferences Section */}
        <Text style={[typography.subtitle, styles.sectionTitle]}>Preferences</Text>
        <GlassCard style={styles.sectionCard} shadow="sm">
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: colors.primaryLight }]}>
                <Vibrate size={18} color={colors.ink} strokeWidth={2.5} />
              </View>
              <View>
                <Text style={[typography.bodyBold, styles.settingName]}>Haptic Feedback</Text>
                <Text style={[typography.captionSmall, styles.settingDesc]}>
                  Tactile mechanical feel when upvoting
                </Text>
              </View>
            </View>
            <Switch
              value={hapticsEnabled}
              onValueChange={setHapticsEnabled}
              trackColor={{ false: '#E5E7EB', true: colors.yellow }}
              thumbColor={hapticsEnabled ? '#121212' : '#9CA3AF'}
            />
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: colors.cyanLight }]}>
                <Bell size={18} color={colors.ink} strokeWidth={2.5} />
              </View>
              <View>
                <Text style={[typography.bodyBold, styles.settingName]}>Trending Alerts</Text>
                <Text style={[typography.captionSmall, styles.settingDesc]}>
                  Weekly top-voted startup digests
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E7EB', true: colors.primaryLight }}
              thumbColor={notificationsEnabled ? '#121212' : '#9CA3AF'}
            />
          </View>
        </GlassCard>

        {/* Data & Storage Management */}
        <Text style={[typography.subtitle, styles.sectionTitle]}>Demo & Data Controls</Text>
        <GlassCard style={styles.sectionCard} shadow="sm">
          <Pressable
            onPress={handleResetData}
            style={({ pressed }) => [styles.actionRow, pressed && styles.actionRowPressed]}
            accessibilityRole="button"
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: colors.coralLight }]}>
                <RotateCcw size={18} color={colors.coral} strokeWidth={2.5} />
              </View>
              <View>
                <Text style={[typography.bodyBold, { color: colors.coral }]}>
                  Reset to Sample Data
                </Text>
                <Text style={[typography.captionSmall, styles.settingDesc]}>
                  Restores 7 realistic seed startups & clears tests
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={colors.ink} strokeWidth={2.5} />
          </Pressable>
        </GlassCard>

        {/* Quality Guidelines & About */}
        <Text style={[typography.subtitle, styles.sectionTitle]}>About & Community</Text>
        <GlassCard style={styles.sectionCard} shadow="sm">
          <Pressable
            onPress={() =>
              Alert.alert(
                'StartupIQ Guidelines',
                '1. Clear Problem: Quantify the pain point in dollars, hours, or lives.\n\n2. Real Solution: Detail the 10x advantage over legacy workflows.\n\n3. Credibility: Share relevant founder insights and initial traction metrics.'
              )
            }
            style={({ pressed }) => [styles.actionRow, pressed && styles.actionRowPressed]}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: colors.mintLight }]}>
                <Shield size={18} color={colors.ink} strokeWidth={2.5} />
              </View>
              <View>
                <Text style={[typography.bodyBold, styles.settingName]}>Quality Standards</Text>
                <Text style={[typography.captionSmall, styles.settingDesc]}>
                  How proposals are evaluated
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={colors.ink} strokeWidth={2.5} />
          </Pressable>

          <View style={styles.rowDivider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconBg, { backgroundColor: colors.yellowLight }]}>
                <Info size={18} color={colors.ink} strokeWidth={2.5} />
              </View>
              <View>
                <Text style={[typography.bodyBold, styles.settingName]}>Version</Text>
                <Text style={[typography.captionSmall, styles.settingDesc]}>
                  StartupIQ Mobile v1.0.0 • Neo-Brutalist Edition
                </Text>
              </View>
            </View>
            <Text style={[typography.caption, { color: colors.inkMuted, fontWeight: '800' }]}>
              Build 2026.1
            </Text>
          </View>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  backBtn: {
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
  backBtnPressed: {
    transform: [{ translateX: 1.5 }, { translateY: 1.5 }],
    boxShadow: '1px 1px 0px #121212',
  },
  topBarTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 48,
  },
  profileCard: {
    marginBottom: 20,
    backgroundColor: colors.yellowLight,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.yellow,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    boxShadow: '3px 3px 0px #121212',
  },
  avatarInitials: {
    color: '#121212',
    fontWeight: '900',
    fontSize: 18,
  },
  profileMeta: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '900',
    marginRight: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pinkLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: layout.pillRadius,
    borderWidth: 1.5,
    borderColor: colors.border,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  verifiedText: {
    ...typography.captionSmall,
    color: colors.ink,
    fontSize: 9,
    fontWeight: '900',
  },
  userSub: {
    color: colors.inkSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    boxShadow: '2px 2px 0px #121212',
  },
  statNumber: {
    ...typography.h3,
    color: colors.ink,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 3,
  },
  statLabel: {
    ...typography.captionSmall,
    color: colors.ink,
    marginTop: 1,
    fontSize: 9,
    fontWeight: '900',
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 8,
    marginTop: 8,
  },
  sectionCard: {
    padding: 0,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  actionRowPressed: {
    backgroundColor: colors.surfaceHover,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconBg: {
    width: 38,
    height: 38,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  settingName: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '800',
  },
  settingDesc: {
    color: colors.inkMuted,
    marginTop: 1,
    fontWeight: '600',
  },
  rowDivider: {
    height: 1.5,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  themePill: {
    backgroundColor: colors.yellow,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: layout.pillRadius,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  themePillText: {
    ...typography.captionSmall,
    color: colors.ink,
    fontSize: 10,
    fontWeight: '900',
  },
});
