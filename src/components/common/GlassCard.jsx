import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../theme/colors';
import { layout, neoShadows } from '../../theme/spacing';

export const GlassCard = ({
  children,
  style,
  onPress,
  variant = 'default', // 'default' | 'yellow' | 'pink' | 'mint' | 'purple' | 'cyan' | 'subtle'
  color,
  active = false,
  shadow = 'md', // 'sm' | 'md' | 'lg' | 'none'
  ...rest
}) => {
  const getBackgroundColor = () => {
    if (color) return color;
    switch (variant) {
      case 'yellow':
        return colors.yellowLight;
      case 'pink':
        return colors.pinkLight;
      case 'mint':
        return colors.mintLight;
      case 'purple':
        return colors.primaryLight;
      case 'cyan':
        return colors.cyanLight;
      case 'subtle':
        return colors.surfaceSubtle;
      default:
        return colors.surface;
    }
  };

  const shadowStyle =
    shadow === 'sm'
      ? neoShadows.sm
      : shadow === 'lg'
      ? neoShadows.lg
      : shadow === 'none'
      ? {}
      : neoShadows.md;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          shadowStyle,
          { backgroundColor: getBackgroundColor() },
          active && styles.cardActive,
          pressed && styles.cardPressed,
          style,
        ]}
        {...rest}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.card,
        shadowStyle,
        { backgroundColor: getBackgroundColor() },
        active && styles.cardActive,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: layout.cardRadius,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    padding: 16,
    overflow: 'hidden',
  },
  cardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceHover,
  },
  cardPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    boxShadow: '1px 1px 0px #121212',
    shadowOffset: { width: 1, height: 1 },
  },
});
