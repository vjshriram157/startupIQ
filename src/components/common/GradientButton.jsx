import React from 'react';
import { StyleSheet, Text, Pressable, View, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, neoShadows } from '../../theme/spacing';

export const GradientButton = ({
  title,
  onPress,
  icon: IconComponent,
  iconPosition = 'left',
  variant = 'yellow', // 'yellow' | 'purple' | 'pink' | 'mint' | 'cyan' | 'black' | 'white'
  color,
  textColor,
  loading = false,
  disabled = false,
  size = 'md', // 'sm' | 'md' | 'lg'
  fullWidth = false,
  shadow = true,
  style,
  textStyle,
}) => {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const getVariantStyles = () => {
    if (color) {
      return { bg: color, text: textColor || '#121212' };
    }
    switch (variant) {
      case 'purple':
        return { bg: colors.primary, text: '#FFFFFF' };
      case 'pink':
        return { bg: colors.pink, text: '#FFFFFF' };
      case 'mint':
        return { bg: colors.mint, text: '#121212' };
      case 'cyan':
        return { bg: colors.cyan, text: '#121212' };
      case 'black':
        return { bg: colors.ink, text: '#FFFFFF' };
      case 'white':
        return { bg: '#FFFFFF', text: '#121212' };
      case 'yellow':
      default:
        return { bg: colors.yellow, text: '#121212' };
    }
  };

  const currentVariant = getVariantStyles();

  const containerPadding = isSmall
    ? { paddingVertical: 8, paddingHorizontal: 14 }
    : isLarge
    ? { paddingVertical: 14, paddingHorizontal: 24 }
    : { paddingVertical: 11, paddingHorizontal: 18 };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.buttonBase,
        shadow && neoShadows.md,
        {
          backgroundColor: disabled ? '#E5E7EB' : currentVariant.bg,
          borderColor: colors.border,
        },
        containerPadding,
        fullWidth && styles.fullWidth,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={currentVariant.text} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {IconComponent && iconPosition === 'left' && (
            <View style={styles.iconLeft}>
              <IconComponent
                size={isSmall ? 16 : isLarge ? 20 : 18}
                color={disabled ? colors.inkMuted : currentVariant.text}
                strokeWidth={2.5}
              />
            </View>
          )}
          <Text
            style={[
              typography.button,
              styles.buttonText,
              { color: disabled ? colors.inkMuted : currentVariant.text },
              isSmall && styles.textSmall,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {IconComponent && iconPosition === 'right' && (
            <View style={styles.iconRight}>
              <IconComponent
                size={isSmall ? 16 : isLarge ? 20 : 18}
                color={disabled ? colors.inkMuted : currentVariant.text}
                strokeWidth={2.5}
              />
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: layout.buttonRadius,
    borderWidth: layout.borderWidth,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: layout.minTouchSize,
  },
  fullWidth: {
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  buttonText: {
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  textSmall: {
    fontSize: 13,
  },
  pressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    boxShadow: '1px 1px 0px #121212',
    shadowOffset: { width: 1, height: 1 },
  },
  disabled: {
    opacity: 0.6,
    boxShadow: '1px 1px 0px #121212',
    shadowOffset: { width: 1, height: 1 },
  },
});
