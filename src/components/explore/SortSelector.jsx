import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Flame, Trophy, Clock } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, neoShadows } from '../../theme/spacing';

const SORT_OPTIONS = [
  { id: 'trending', label: 'Trending', icon: Flame },
  { id: 'top', label: 'Top Voted', icon: Trophy },
  { id: 'newest', label: 'Newest', icon: Clock },
];

export const SortSelector = ({ selectedSort, onSelectSort }) => {
  return (
    <View style={[styles.container, neoShadows.sm]}>
      {SORT_OPTIONS.map((option) => {
        const isSelected = selectedSort === option.id;
        const IconComponent = option.icon;

        return (
          <Pressable
            key={option.id}
            onPress={() => onSelectSort(option.id)}
            style={({ pressed }) => [
              styles.optionTab,
              isSelected && styles.optionTabSelected,
              pressed && styles.optionTabPressed,
            ]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
          >
            <IconComponent
              size={14}
              color={colors.ink}
              strokeWidth={2.5}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                typography.caption,
                styles.optionLabel,
                isSelected && styles.optionLabelSelected,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: layout.cardRadiusSm,
    padding: 4,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
  },
  optionTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 7,
  },
  optionTabSelected: {
    backgroundColor: colors.yellow,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  optionTabPressed: {
    opacity: 0.85,
  },
  optionLabel: {
    color: colors.inkMuted,
    fontWeight: '800',
    fontSize: 12,
  },
  optionLabelSelected: {
    color: colors.ink,
    fontWeight: '900',
  },
});
