import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../../components/common/Header';
import { SearchBar } from '../../components/explore/SearchBar';
import { CategoryFilter } from '../../components/explore/CategoryFilter';
import { SortSelector } from '../../components/explore/SortSelector';
import { IdeaCard } from '../../components/explore/IdeaCard';
import { EmptyState } from '../../components/common/EmptyState';
import { useIdeas } from '../../hooks/useIdeas';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { ideas, userVotes, bookmarks, toggleVote, toggleBookmark, refreshIdeas, isLoading } =
    useIdeas();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('trending');
  const [refreshing, setRefreshing] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: ideas.length };
    ideas.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [ideas]);

  // Filtered & Sorted ideas
  const filteredIdeas = useMemo(() => {
    let result = [...ideas];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.tagline?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.problem?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (selectedSort === 'top') {
      result.sort((a, b) => (b.votes || 0) - (a.votes || 0));
    } else if (selectedSort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      // Trending: hybrid score of votes + views
      result.sort((a, b) => {
        const scoreA = (a.votes || 0) * 2 + (a.views || 0) * 0.1;
        const scoreB = (b.votes || 0) * 2 + (b.views || 0) * 0.1;
        return scoreB - scoreA;
      });
    }

    return result;
  }, [ideas, selectedCategory, searchQuery, selectedSort]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshIdeas();
    setRefreshing(false);
  }, [refreshIdeas]);

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
      </View>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        ideaCounts={categoryCounts}
      />

      <SortSelector
        selectedSort={selectedSort}
        onSelectSort={setSelectedSort}
      />

      {/* Results header */}
      <View style={styles.resultsInfoRow}>
        <Text style={[typography.caption, styles.resultsCount]}>
          SHOWING {filteredIdeas.length} {filteredIdeas.length === 1 ? 'VENTURE' : 'VENTURES'}
        </Text>
        {selectedCategory !== 'All' && (
          <View style={styles.activeFilterPill}>
            <Text style={[typography.captionSmall, styles.activeFilterTag]}>
              {selectedCategory.toUpperCase()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        subtitle={`${ideas.length} community proposals`}
        showSettings={true}
      />

      <FlatList
        data={filteredIdeas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <IdeaCard
            idea={item}
            isVoted={Boolean(userVotes[item.id])}
            isBookmarked={bookmarks.includes(item.id)}
            onVote={toggleVote}
            onBookmark={toggleBookmark}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              title="No ideas match your criteria"
              description={
                searchQuery
                  ? `No startup ideas found matching "${searchQuery}". Try different keywords.`
                  : `No startup ideas found under the ${selectedCategory} category yet.`
              }
              actionLabel="Reset Filters"
              onAction={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            />
          ) : null
        }
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
        initialNumToRender={5}
        maxToRenderPerBatch={8}
        windowSize={7}
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
    paddingBottom: 24,
  },
  listHeader: {
    paddingBottom: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  resultsInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  resultsCount: {
    color: colors.inkMuted,
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  activeFilterPill: {
    backgroundColor: colors.yellowLight,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  activeFilterTag: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 10,
  },
});
