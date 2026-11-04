import React, { useMemo } from 'react';
import { ScrollView, Text, StyleSheet, Pressable, View } from 'react-native';
import { colors, getCategoryMeta } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout } from '../../theme/spacing';

export const BASE_CATEGORIES = [
  'All',
  'AI & ML',
  'DevTools',
  'FinTech',
  'ClimateTech',
  'HealthTech',
  'Cybersecurity',
  'SaaS',
  'EdTech',
  'E-Commerce',
  'Web3',
];

export const CategoryFilter = ({ selectedCategory, onSelectCategory, ideaCounts = {} }) => {
  // Combine base categories with any custom user-submitted categories present in ideas
  const allCategories = useMemo(() => {
    const list = [...BASE_CATEGORIES];
    Object.keys(ideaCounts).forEach((cat) => {
      if (cat && !list.includes(cat)) {
        list.push(cat);
      }
    });
    return list;
  }, [ideaCounts]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      {allCategories.map((cat) => {
        const isSelected = selectedCategory === cat;
        const count = ideaCounts[cat];
        const meta = cat === 'All' ? { bg: colors.yellow, icon: '🔥' } : getCategoryMeta(cat);
        const activeBg = meta.bg || colors.yellow;

        return (
          <Pressable
            key={cat}
            onPress={() => onSelectCategory(cat)}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: isSelected ? activeBg : '#FFFFFF',
              },
              isSelected ? styles.chipSelected : styles.chipUnselected,
              pressed && styles.chipPressed,
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            {meta.icon && <Text style={styles.chipIcon}>{meta.icon}</Text>}
            <Text style={[typography.caption, styles.chipText, isSelected && styles.chipTextSelected]}>
              {cat}
            </Text>
            {count !== undefined && count > 0 && (
              <View
                style={[
                  styles.countBadge,
                  { backgroundColor: isSelected ? '#121212' : '#F3F4F6' },
                ]}
              >
                <Text
                  style={[
                    typography.captionSmall,
                    styles.countText,
                    { color: isSelected ? '#FFFFFF' : '#121212' },
                  ]}
                >
                  {count}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: layout.pillRadius,
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
    minHeight: 36,
  },
  chipUnselected: {
    boxShadow: '2.5px 2.5px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  chipSelected: {
    boxShadow: '1px 1px 0px #121212',
    shadowOffset: { width: 1, height: 1 },
    transform: [{ translateX: 1.5 }, { translateY: 1.5 }],
  },
  chipPressed: {
    opacity: 0.9,
  },
  chipIcon: {
    fontSize: 13,
    marginRight: 5,
  },
  chipText: {
    color: colors.ink,
    fontWeight: '800',
    fontSize: 12,
  },
  chipTextSelected: {
    fontWeight: '900',
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginLeft: 6,
  },
  countText: {
    fontSize: 10,
    fontWeight: '900',
  },
});
