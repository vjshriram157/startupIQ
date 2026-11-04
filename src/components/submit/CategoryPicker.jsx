import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Platform,
} from 'react-native';
import { Plus, X, Sparkles } from 'lucide-react-native';
import { colors, getCategoryMeta, stageMeta } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout } from '../../theme/spacing';

export const CategoryPicker = ({
  title,
  options = [],
  selectedOption,
  onSelectOption,
  allowCustom = false,
  customValue = '',
  onCustomChange,
  type = 'category', // 'category' | 'stage'
  style,
}) => {
  const isCustomOption =
    allowCustom &&
    (selectedOption === 'Other' ||
      selectedOption === 'Custom' ||
      (selectedOption && !options.includes(selectedOption)));

  const [isCustomActive, setIsCustomActive] = useState(isCustomOption);
  const [customInput, setCustomInput] = useState(
    customValue || (isCustomOption ? selectedOption : '')
  );

  useEffect(() => {
    if (isCustomOption) {
      setIsCustomActive(true);
      if (selectedOption !== 'Other' && selectedOption !== 'Custom') {
        setCustomInput(selectedOption);
      }
    }
  }, [selectedOption, isCustomOption]);

  const handleSelectPreset = (option) => {
    setIsCustomActive(false);
    onSelectOption(option);
  };

  const handleSelectCustom = () => {
    setIsCustomActive(true);
    const valueToUse = customInput.trim() || 'Other';
    onSelectOption(valueToUse);
    if (onCustomChange) onCustomChange(valueToUse);
  };

  const handleCustomInputChange = (text) => {
    setCustomInput(text);
    const sanitized = text.trim();
    const finalValue = sanitized || 'Other';
    onSelectOption(finalValue);
    if (onCustomChange) onCustomChange(finalValue);
  };

  const handleClearCustom = () => {
    setCustomInput('');
    onSelectOption('Other');
    if (onCustomChange) onCustomChange('Other');
  };

  const getOptionMeta = (option) => {
    if (type === 'stage') {
      return stageMeta[option] || { bg: colors.yellowLight, icon: '💡' };
    }
    return getCategoryMeta(option);
  };

  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={styles.headerRow}>
          <Text style={[typography.caption, styles.title]}>{title}</Text>
          <Text style={styles.hint}>
            {type === 'category' ? 'Choose industry domain' : 'Current progress'}
          </Text>
        </View>
      )}

      {/* Preset Pills Grid */}
      <View style={styles.grid}>
        {options.map((option) => {
          const meta = getOptionMeta(option);
          const isSelected = !isCustomActive && selectedOption === option;

          return (
            <Pressable
              key={option}
              onPress={() => handleSelectPreset(option)}
              style={({ pressed }) => [
                styles.optionPill,
                isSelected
                  ? [styles.optionPillSelected, { backgroundColor: meta.bg || colors.yellow }]
                  : styles.optionPillUnselected,
                pressed && styles.optionPressed,
              ]}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
            >
              {meta.icon && <Text style={styles.pillIcon}>{meta.icon}</Text>}
              <Text
                style={[
                  typography.caption,
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}

        {/* Custom / Other Category Pill */}
        {allowCustom && (
          <Pressable
            onPress={handleSelectCustom}
            style={({ pressed }) => [
              styles.optionPill,
              styles.customPill,
              isCustomActive
                ? [styles.optionPillSelected, { backgroundColor: '#F3E8FF' }]
                : styles.optionPillUnselected,
              pressed && styles.optionPressed,
            ]}
            accessibilityRole="radio"
            accessibilityState={{ selected: isCustomActive }}
          >
            <Sparkles size={14} color="#121212" strokeWidth={2.5} style={{ marginRight: 4 }} />
            <Text
              style={[
                typography.caption,
                styles.optionText,
                isCustomActive && styles.optionTextSelected,
              ]}
            >
              + Custom / Other
            </Text>
          </Pressable>
        )}
      </View>

      {/* Dynamic Custom Category Text Input */}
      {allowCustom && isCustomActive && (
        <View style={styles.customInputContainer}>
          <View style={styles.customInputHeader}>
            <Text style={styles.customInputLabel}>Type Your Custom Category:</Text>
            {customInput.trim().length > 0 && (
              <View style={styles.previewBadge}>
                <Text style={styles.previewBadgeText}>
                  Preview: ✨ {customInput.trim()}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputPrefixIcon}>✨</Text>
            <TextInput
              style={styles.textInput}
              value={customInput}
              onChangeText={handleCustomInputChange}
              placeholder="e.g. BioTech, SpaceTech, EdTech, AgTech..."
              placeholderTextColor="#9CA3AF"
              maxLength={24}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="done"
            />
            {customInput.length > 0 && (
              <Pressable
                onPress={handleClearCustom}
                hitSlop={8}
                style={styles.clearBtn}
              >
                <X size={16} color="#121212" strokeWidth={3} />
              </Pressable>
            )}
          </View>
          <Text style={styles.customHint}>
            Your custom domain will be given a distinctive sticker badge in the Explore feed!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 13,
  },
  hint: {
    ...typography.captionSmall,
    color: colors.inkMuted,
    fontWeight: '700',
    fontSize: 11,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: layout.pillRadius,
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
  },
  pillIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  customPill: {
    borderStyle: 'dashed',
  },
  optionPillUnselected: {
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 2px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  optionPillSelected: {
    boxShadow: '1px 1px 0px #121212',
    borderWidth: 2.5,
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
  optionPressed: {
    opacity: 0.85,
  },
  optionText: {
    color: colors.ink,
    fontWeight: '800',
    fontSize: 12,
  },
  optionTextSelected: {
    fontWeight: '900',
  },
  customInputContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FAF5FF',
    borderRadius: 12,
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
    boxShadow: '3px 3px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  customInputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customInputLabel: {
    ...typography.captionSmall,
    fontWeight: '900',
    color: colors.ink,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  previewBadge: {
    backgroundColor: '#DDD6FE',
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: layout.pillRadius,
  },
  previewBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#121212',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
    paddingHorizontal: 10,
    height: 44,
  },
  inputPrefixIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 4,
    backgroundColor: colors.yellow,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  customHint: {
    ...typography.captionSmall,
    color: colors.inkMuted,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
  },
});
