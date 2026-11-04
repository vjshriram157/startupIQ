import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Trophy, Award, Medal, ChevronUp } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, neoShadows } from '../../theme/spacing';

export const Podium = ({ topIdeas = [] }) => {
  const first = topIdeas[0];
  const second = topIdeas[1];
  const third = topIdeas[2];

  if (!first) return null;

  const handlePress = (id) => {
    if (id) router.push(`/idea/${id}`);
  };

  return (
    <View style={styles.podiumContainer}>
      {/* 2nd Place */}
      {second && (
        <Pressable
          onPress={() => handlePress(second.id)}
          style={({ pressed }) => [
            styles.podiumColumn,
            styles.columnSecond,
            pressed && styles.cardPressed,
          ]}
          accessibilityLabel={`Second place: ${second.title}`}
        >
          <View style={[styles.avatarBadge, { backgroundColor: colors.cyanLight }]}>
            <Text style={styles.avatarText}>{second.founder?.initials || '2'}</Text>
          </View>
          <View style={styles.rankBadgeSilver}>
            <Medal size={12} color="#121212" strokeWidth={3} />
            <Text style={styles.rankNumber}>2</Text>
          </View>

          <Text style={[typography.caption, styles.startupTitle]} numberOfLines={1}>
            {second.title}
          </Text>
          <View style={styles.votePill}>
            <ChevronUp size={12} color="#121212" strokeWidth={3} />
            <Text style={styles.voteCount}>{second.votes}</Text>
          </View>

          <View style={[styles.pedestal, styles.pedestalSecond]}>
            <Text style={styles.pedestalRank}>#2</Text>
          </View>
        </Pressable>
      )}

      {/* 1st Place - Center & Elevated */}
      {first && (
        <Pressable
          onPress={() => handlePress(first.id)}
          style={({ pressed }) => [
            styles.podiumColumn,
            styles.columnFirst,
            pressed && styles.cardPressed,
          ]}
          accessibilityLabel={`First place winner: ${first.title}`}
        >
          <View style={styles.crownContainer}>
            <Trophy size={20} color="#121212" strokeWidth={2.5} />
          </View>

          <View style={[styles.avatarBadge, styles.avatarFirst]}>
            <Text style={styles.avatarText}>{first.founder?.initials || '1'}</Text>
          </View>

          <View style={styles.rankBadgeGold}>
            <Trophy size={12} color="#121212" strokeWidth={3} />
            <Text style={styles.rankNumber}>1</Text>
          </View>

          <Text style={[typography.caption, styles.startupTitle, styles.titleFirst]} numberOfLines={1}>
            {first.title}
          </Text>
          <View style={[styles.votePill, styles.votePillFirst]}>
            <ChevronUp size={12} color="#121212" strokeWidth={3} />
            <Text style={styles.voteCount}>{first.votes}</Text>
          </View>

          <View style={[styles.pedestal, styles.pedestalFirst]}>
            <Text style={[styles.pedestalRank, { color: '#121212' }]}>#1</Text>
          </View>
        </Pressable>
      )}

      {/* 3rd Place */}
      {third && (
        <Pressable
          onPress={() => handlePress(third.id)}
          style={({ pressed }) => [
            styles.podiumColumn,
            styles.columnThird,
            pressed && styles.cardPressed,
          ]}
          accessibilityLabel={`Third place: ${third.title}`}
        >
          <View style={[styles.avatarBadge, { backgroundColor: colors.orangeLight }]}>
            <Text style={styles.avatarText}>{third.founder?.initials || '3'}</Text>
          </View>
          <View style={styles.rankBadgeBronze}>
            <Award size={12} color="#121212" strokeWidth={3} />
            <Text style={styles.rankNumber}>3</Text>
          </View>

          <Text style={[typography.caption, styles.startupTitle]} numberOfLines={1}>
            {third.title}
          </Text>
          <View style={styles.votePill}>
            <ChevronUp size={12} color="#121212" strokeWidth={3} />
            <Text style={styles.voteCount}>{third.votes}</Text>
          </View>

          <View style={[styles.pedestal, styles.pedestalThird]}>
            <Text style={styles.pedestalRank}>#3</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  podiumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 20,
    gap: 10,
  },
  podiumColumn: {
    flex: 1,
    alignItems: 'center',
  },
  columnFirst: {
    zIndex: 3,
  },
  columnSecond: {
    zIndex: 2,
  },
  columnThird: {
    zIndex: 1,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  crownContainer: {
    marginBottom: -6,
    zIndex: 5,
  },
  avatarBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    boxShadow: '2px 2px 0px #121212',
  },
  avatarFirst: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.yellow,
    boxShadow: '3px 3px 0px #121212',
  },
  avatarText: {
    color: '#121212',
    fontWeight: '900',
    fontSize: 14,
  },
  rankBadgeGold: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: layout.pillRadius,
    marginTop: -10,
    marginBottom: 6,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  rankBadgeSilver: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cyanLight,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: layout.pillRadius,
    marginTop: -10,
    marginBottom: 6,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  rankBadgeBronze: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.orangeLight,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: layout.pillRadius,
    marginTop: -10,
    marginBottom: 6,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  rankNumber: {
    ...typography.captionSmall,
    color: '#121212',
    fontWeight: '900',
    marginLeft: 3,
  },
  startupTitle: {
    color: colors.ink,
    fontWeight: '800',
    textAlign: 'center',
    width: '100%',
    marginBottom: 4,
    fontSize: 12,
  },
  titleFirst: {
    fontSize: 13,
    fontWeight: '900',
  },
  votePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: layout.pillRadius,
    marginBottom: 8,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  votePillFirst: {
    backgroundColor: colors.yellowLight,
  },
  voteCount: {
    ...typography.captionSmall,
    fontWeight: '900',
    marginLeft: 2,
    color: colors.ink,
  },
  pedestal: {
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    borderBottomWidth: 0,
  },
  pedestalFirst: {
    height: 95,
    backgroundColor: colors.yellow,
    boxShadow: '3px -2px 0px #121212',
  },
  pedestalSecond: {
    height: 75,
    backgroundColor: colors.cyanLight,
    boxShadow: '2px -2px 0px #121212',
  },
  pedestalThird: {
    height: 60,
    backgroundColor: colors.orangeLight,
    boxShadow: '2px -2px 0px #121212',
  },
  pedestalRank: {
    ...typography.h3,
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
  },
});
