import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, neoShadows } from '../../theme/spacing';

export const SearchBar = ({ value, onChangeText, onClear, placeholder = 'Search startup ideas, problems, tech...' }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused ? styles.containerFocused : neoShadows.md,
      ]}
    >
      <Search
        size={18}
        color={colors.ink}
        strokeWidth={2.5}
        style={styles.searchIcon}
      />
      <TextInput
        style={[typography.bodyBold, styles.input]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={colors.textPlaceholder}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value?.length > 0 && (
        <Pressable
          onPress={onClear || (() => onChangeText(''))}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.clearButtonPressed,
          ]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel="Clear search text"
        >
          <X size={16} color={colors.ink} strokeWidth={2.5} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: layout.cardRadiusSm,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 48,
  },
  containerFocused: {
    backgroundColor: colors.surfaceHover,
    boxShadow: '2px 2px 0px #121212',
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: colors.ink,
    paddingVertical: 0,
    height: '100%',
    fontWeight: '700',
  },
  clearButton: {
    padding: 3,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.pinkLight,
  },
  clearButtonPressed: {
    opacity: 0.7,
  },
});
