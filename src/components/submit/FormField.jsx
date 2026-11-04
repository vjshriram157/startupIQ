import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, neoShadows } from '../../theme/spacing';

export const FormField = ({
  label,
  required = false,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 3,
  maxLength,
  hint,
  error,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {/* Label & Character count */}
      <View style={styles.labelRow}>
        <Text style={[typography.caption, styles.label]}>
          {label}
          {required && <Text style={styles.requiredMark}> *</Text>}
        </Text>
        {maxLength && (
          <Text style={[typography.captionSmall, styles.counter]}>
            {(value || '').length}/{maxLength}
          </Text>
        )}
      </View>

      {/* Input */}
      <View
        style={[
          styles.inputContainer,
          multiline && styles.inputMultiline,
          isFocused ? styles.inputFocused : neoShadows.sm,
          Boolean(error) && styles.inputError,
        ]}
      >
        <TextInput
          style={[
            typography.bodyBold,
            styles.textInput,
            multiline && styles.textInputMultiline,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textPlaceholder}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>

      {/* Helper text or Error */}
      {error ? (
        <View style={styles.errorBox}>
          <Text style={[typography.captionSmall, styles.errorText]}>{error}</Text>
        </View>
      ) : hint ? (
        <Text style={[typography.captionSmall, styles.hintText]}>{hint}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 13,
  },
  requiredMark: {
    color: colors.coral,
    fontWeight: '900',
  },
  counter: {
    color: colors.inkMuted,
    fontWeight: '700',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: layout.cardRadiusSm,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    paddingHorizontal: 14,
    minHeight: 48,
    justifyContent: 'center',
  },
  inputMultiline: {
    paddingVertical: 10,
    minHeight: 90,
  },
  inputFocused: {
    backgroundColor: '#FFFDEB',
    boxShadow: '1px 1px 0px #121212',
    transform: [{ translateX: 1.5 }, { translateY: 1.5 }],
  },
  inputError: {
    backgroundColor: '#FEE2E2',
    borderColor: colors.coral,
  },
  textInput: {
    color: colors.ink,
    padding: 0,
    margin: 0,
    fontWeight: '700',
  },
  textInputMultiline: {
    height: '100%',
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1.5,
    borderColor: colors.coral,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  errorText: {
    color: colors.coral,
    fontWeight: '900',
  },
  hintText: {
    color: colors.inkMuted,
    marginTop: 4,
    fontWeight: '600',
  },
});
