import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ChevronUp } from 'lucide-react-native';
import { Badge } from '../common/Badge';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, neoShadows } from '../../theme/spacing';

export const LeaderboardRow = ({
  idea,
  rank,
  isVoted = false,
  onVote,
}) => {
  const handleDetails = () => {
    router.push(`/idea/${idea.id}`);
  };

  return (
    <View style={[styles.container, neoShadows.sm]}>
      {/* Clickable Area for Venture Info */}
      <Pressable
        onPress={handleDetails}
        style={({ pressed }) => [
          styles.clickableContent,
          pressed && styles.contentPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Rank ${rank}: ${idea.title}`}
      >
        {/* Rank Index */}
        <View style={styles.rankBox}>
          <Text style={styles.rankText}>#{rank}</Text>
        </View>

        {/* Idea Title & Meta */}
        <View style={styles.contentColumn}>
          <View style={styles.titleRow}>
            <Text style={[typography.subtitle, styles.titleText]} numberOfLines={1}>
              {idea.title}
            </Text>
            <Badge label={idea.category} type="category" size="sm" style={{ marginLeft: 6 }} shadow={false} showIcon />
          </View>
          <Text style={[typography.caption, styles.taglineText]} numberOfLines={1}>
            {idea.tagline}
          </Text>
        </View>
      </Pressable>

      {/* Sibling Vote Count & Action */}
      <Pressable
        onPress={() => onVote?.(idea.id)}
        style={({ pressed }) => [
          styles.votePill,
          isVoted ? styles.votePillActive : styles.votePillInactive,
          pressed && styles.votePillPressed,
        ]}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityLabel={`Upvote ${idea.title}`}
      >
        <ChevronUp
          size={16}
          color={colors.ink}
          strokeWidth={3}
        />
        <Text style={[typography.button, styles.voteCount]}>
          {idea.votes || 0}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: layout.cardRadiusSm,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
  },
  clickableContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  contentPressed: {
    opacity: 0.8,
  },
  rankBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.yellowLight,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  rankText: {
    ...typography.caption,
    color: colors.ink,
    fontWeight: '900',
    fontSize: 13,
  },
  contentColumn: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  titleText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
    flexShrink: 1,
  },
  taglineText: {
    color: colors.inkSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  votePill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: layout.pillRadius,
    minHeight: 32,
  },
  votePillInactive: {
    backgroundColor: colors.yellow,
    boxShadow: '2px 2px 0px #121212',
  },
  votePillActive: {
    backgroundColor: colors.mint,
    boxShadow: '1px 1px 0px #121212',
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
  votePillPressed: {
    transform: [{ translateX: 1.5 }, { translateY: 1.5 }],
    boxShadow: '1px 1px 0px #121212',
  },
  voteCount: {
    color: colors.ink,
    fontWeight: '900',
    marginLeft: 3,
    fontSize: 13,
  },
});
