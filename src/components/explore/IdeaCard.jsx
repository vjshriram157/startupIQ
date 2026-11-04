import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import {
  ChevronUp,
  Bookmark,
  MessageSquare,
  Eye,
  ArrowRight,
} from 'lucide-react-native';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';
import { evaluatePitch } from '../../utils/aiPitchEvaluator';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout } from '../../theme/spacing';

export const IdeaCard = ({
  idea,
  isVoted = false,
  isBookmarked = false,
  onVote,
  onBookmark,
}) => {
  const handleCardPress = () => {
    router.push(`/idea/${idea.id}`);
  };

  return (
    <GlassCard style={styles.card} variant="default" shadow="md">
      {/* Top Badges & Bookmark Action */}
      <View style={styles.topRow}>
        <View style={styles.badgeGroup}>
          <Badge label={idea.category} type="category" showIcon />
          <Badge label={idea.stage} type="stage" style={{ marginLeft: 6 }} showIcon />
          <View style={styles.iqBadge}>
            <Text style={styles.iqBadgeText}>⚡ {evaluatePitch(idea).overallScore} IQ</Text>
          </View>
        </View>

        <Pressable
          onPress={() => onBookmark?.(idea.id)}
          style={({ pressed }) => [
            styles.bookmarkBtn,
            isBookmarked && styles.bookmarkBtnActive,
            pressed && styles.btnPressed,
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel={isBookmarked ? 'Remove bookmark' : 'Bookmark startup idea'}
        >
          <Bookmark
            size={16}
            color={colors.ink}
            strokeWidth={2.5}
            fill={isBookmarked ? colors.yellow : 'transparent'}
          />
        </Pressable>
      </View>

      {/* Clickable Pitch Body */}
      <Pressable
        onPress={handleCardPress}
        style={({ pressed }) => [styles.clickableBody, pressed && styles.bodyPressed]}
        accessibilityRole="button"
        accessibilityLabel={`View ${idea.title} pitch`}
      >
        <Text style={[typography.h3, styles.title]}>{idea.title}</Text>
        <View style={styles.taglineBox}>
          <Text style={[typography.subtitle, styles.tagline]}>{idea.tagline}</Text>
        </View>
        <Text style={[typography.body, styles.description]} numberOfLines={2}>
          {idea.description}
        </Text>

        {/* Founder Row */}
        <View style={styles.founderRow}>
          <View
            style={[
              styles.avatarCircle,
              { backgroundColor: idea.founder?.avatarColor || colors.yellow },
            ]}
          >
            <Text style={styles.avatarInitials}>
              {idea.founder?.initials || 'FD'}
            </Text>
          </View>
          <View style={styles.founderInfo}>
            <Text style={styles.founderName}>{idea.founder?.name}</Text>
            <Text style={styles.founderCreds} numberOfLines={1}>
              {idea.founder?.credentials || 'Startup Founder'}
            </Text>
          </View>
        </View>
      </Pressable>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom Actions & Engagement */}
      <View style={styles.bottomRow}>
        {/* Upvote Button */}
        <Pressable
          onPress={() => onVote?.(idea.id)}
          style={({ pressed }) => [
            styles.voteButton,
            isVoted ? styles.voteButtonActive : styles.voteButtonInactive,
            pressed && styles.voteButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Upvote ${idea.title}, currently ${idea.votes} votes`}
        >
          <ChevronUp size={18} color={colors.ink} strokeWidth={3} />
          <Text style={[typography.button, styles.voteCount]}>
            {idea.votes || 0}
          </Text>
        </Pressable>

        {/* Pitch link and stats */}
        <Pressable
          onPress={handleCardPress}
          style={({ pressed }) => [styles.statsGroup, pressed && { opacity: 0.8 }]}
          accessibilityRole="button"
          accessibilityLabel="Read full pitch"
        >
          <View style={styles.statItem}>
            <Eye size={13} color={colors.ink} strokeWidth={2.5} style={{ marginRight: 4 }} />
            <Text style={styles.statText}>{idea.views || 0}</Text>
          </View>
          <View style={styles.statItem}>
            <MessageSquare
              size={13}
              color={colors.ink}
              strokeWidth={2.5}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.statText}>
              {idea.commentsCount || idea.comments?.length || 0}
            </Text>
          </View>

          <View style={styles.viewLink}>
            <Text style={styles.viewLinkText}>Pitch</Text>
            <ArrowRight size={13} color={colors.ink} strokeWidth={3} />
          </View>
        </Pressable>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  iqBadge: {
    backgroundColor: '#FEF08A',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: layout.pillRadius,
    paddingHorizontal: 7,
    paddingVertical: 2,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  iqBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#121212',
  },
  bookmarkBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '2px 2px 0px #121212',
  },
  bookmarkBtnActive: {
    backgroundColor: colors.yellowLight,
  },
  btnPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
    boxShadow: '1px 1px 0px #121212',
  },
  clickableBody: {
    marginBottom: 8,
  },
  bodyPressed: {
    opacity: 0.85,
  },
  title: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  taglineBox: {
    backgroundColor: colors.yellowLight,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  tagline: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  description: {
    color: colors.inkSecondary,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '500',
  },
  founderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F6F0',
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: 8,
    borderRadius: 10,
    marginTop: 8,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  avatarInitials: {
    color: '#121212',
    fontSize: 12,
    fontWeight: '900',
  },
  founderInfo: {
    flex: 1,
  },
  founderName: {
    ...typography.caption,
    color: colors.ink,
    fontWeight: '800',
    fontSize: 13,
  },
  founderCreds: {
    ...typography.captionSmall,
    color: colors.inkMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  divider: {
    height: 2,
    backgroundColor: colors.border,
    marginVertical: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: layout.pillRadius,
    minHeight: 38,
  },
  voteButtonInactive: {
    backgroundColor: colors.yellow,
    boxShadow: '2.5px 2.5px 0px #121212',
  },
  voteButtonActive: {
    backgroundColor: colors.mint,
    boxShadow: '1px 1px 0px #121212',
    transform: [{ translateX: 1.5 }, { translateY: 1.5 }],
  },
  voteButtonPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    boxShadow: '1px 1px 0px #121212',
  },
  voteCount: {
    color: colors.ink,
    fontWeight: '900',
    marginLeft: 4,
    fontSize: 14,
  },
  statsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    ...typography.captionSmall,
    color: colors.ink,
    fontWeight: '700',
  },
  viewLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cyanLight,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    boxShadow: '2px 2px 0px #121212',
  },
  viewLinkText: {
    ...typography.captionSmall,
    color: colors.ink,
    fontWeight: '900',
    marginRight: 4,
  },
});
