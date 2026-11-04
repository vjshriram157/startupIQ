import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Trophy, Flame } from 'lucide-react-native';
import { Header } from '../../components/common/Header';
import { Podium } from '../../components/leaderboard/Podium';
import { LeaderboardRow } from '../../components/leaderboard/LeaderboardRow';
import { useIdeas } from '../../hooks/useIdeas';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, neoShadows } from '../../theme/spacing';

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const { ideas, userVotes, toggleVote, refreshIdeas, totalUserVotes } = useIdeas();
  const [timeframe, setTimeframe] = useState('all-time'); // 'all-time' | 'week'
  const [refreshing, setRefreshing] = useState(false);

  // Ranked ideas sorted by votes descending
  const sortedIdeas = useMemo(() => {
    const list = [...ideas];
    if (timeframe === 'week') {
      // Simulate weekly momentum
      return list.sort((a, b) => {
        const scoreA = (a.votes || 0) * 1.5 + (a.views || 0) * 0.2;
        const scoreB = (b.votes || 0) * 1.5 + (b.views || 0) * 0.2;
        return scoreB - scoreA;
      });
    }
    return list.sort((a, b) => (b.votes || 0) - (a.votes || 0));
  }, [ideas, timeframe]);

  const topThree = useMemo(() => sortedIdeas.slice(0, 3), [sortedIdeas]);
  const restIdeas = useMemo(() => sortedIdeas.slice(3), [sortedIdeas]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshIdeas();
    setRefreshing(false);
  }, [refreshIdeas]);

  const totalVotesAcrossAll = useMemo(() => {
    return ideas.reduce((acc, curr) => acc + (curr.votes || 0), 0);
  }, [ideas]);

  const renderHeader = () => (
    <View style={styles.headerSection}>
      {/* Timeframe Filter Tabs */}
      <View style={[styles.filterRow, neoShadows.sm]}>
        <Pressable
          onPress={() => setTimeframe('all-time')}
          style={[styles.filterTab, timeframe === 'all-time' && styles.filterTabActive]}
        >
          <Trophy
            size={14}
            color={colors.ink}
            strokeWidth={2.5}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[
              typography.caption,
              styles.filterText,
              timeframe === 'all-time' && styles.filterTextActive,
            ]}
          >
            All-Time High
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTimeframe('week')}
          style={[styles.filterTab, timeframe === 'week' && styles.filterTabActive]}
        >
          <Flame
            size={14}
            color={colors.ink}
            strokeWidth={2.5}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[
              typography.caption,
              styles.filterText,
              timeframe === 'week' && styles.filterTextActive,
            ]}
          >
            Trending This Week
          </Text>
        </Pressable>
      </View>

      {/* Metric Highlights Banner */}
      <View style={styles.metricsBanner}>
        <View style={[styles.metricCard, { backgroundColor: colors.yellowLight }]}>
          <Text style={styles.metricNumber}>{ideas.length}</Text>
          <Text style={styles.metricLabel}>STARTUPS</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: colors.primaryLight }]}>
          <Text style={styles.metricNumber}>
            {totalVotesAcrossAll.toLocaleString()}
          </Text>
          <Text style={styles.metricLabel}>VOTES</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: colors.mintLight }]}>
          <Text style={styles.metricNumber}>{totalUserVotes}</Text>
          <Text style={styles.metricLabel}>YOUR VOTES</Text>
        </View>
      </View>

      {/* Top 3 Podium */}
      <Podium topIdeas={topThree} />

      {/* Subheader for subsequent ranks */}
      {restIdeas.length > 0 && (
        <View style={styles.rankSubheader}>
          <Text style={[typography.subtitle, styles.rankSubheaderTitle]}>
            Runner-Up Startups
          </Text>
          <View style={styles.runnerTag}>
            <Text style={styles.runnerTagText}>
              RANK #4 — #{sortedIdeas.length}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        subtitle="Ranked by community conviction"
        showSettings={true}
      />

      <FlatList
        data={restIdeas}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <LeaderboardRow
            idea={item}
            rank={index + 4}
            isVoted={Boolean(userVotes[item.id])}
            onVote={toggleVote}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.ink}
            colors={[colors.yellow, colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 32,
  },
  headerSection: {
    paddingTop: 12,
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: layout.cardRadiusSm,
    padding: 4,
    marginHorizontal: 16,
    marginBottom: 14,
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
  },
  filterTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 7,
  },
  filterTabActive: {
    backgroundColor: colors.yellow,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  filterText: {
    color: colors.inkMuted,
    fontWeight: '800',
    fontSize: 12,
  },
  filterTextActive: {
    color: colors.ink,
    fontWeight: '900',
  },
  metricsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: layout.cardRadiusSm,
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
    boxShadow: '2.5px 2.5px 0px #121212',
  },
  metricNumber: {
    ...typography.h3,
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  metricLabel: {
    ...typography.captionSmall,
    color: colors.ink,
    marginTop: 2,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  rankSubheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  rankSubheaderTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '900',
  },
  runnerTag: {
    backgroundColor: colors.yellowLight,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  runnerTagText: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 10,
  },
});
