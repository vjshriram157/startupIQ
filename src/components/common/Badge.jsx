import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, getCategoryMeta, stageMeta } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout } from '../../theme/spacing';

export const Badge = ({
  label,
  type = 'category', // 'category' | 'stage' | 'status' | 'custom'
  color,
  textColor = '#121212',
  size = 'md', // 'sm' | 'md'
  rotate,
  shadow = true,
  showIcon = false,
  style,
}) => {
  let bg = color || colors.yellowLight;
  let text = textColor;
  let icon = null;

  if (type === 'category') {
    const meta = getCategoryMeta(label);
    bg = color || meta.bg;
    text = textColor || meta.text || '#121212';
    icon = meta.icon;
  } else if (type === 'stage') {
    const meta = stageMeta[label] || { bg: '#FEF08A', icon: '💡' };
    bg = color || meta.bg;
    icon = meta.icon;
  }

  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        shadow && styles.badgeShadow,
        {
          backgroundColor: bg,
          borderColor: colors.border,
        },
        rotate && { transform: [{ rotate }] },
        isSmall && styles.badgeSmall,
        style,
      ]}
    >
      <Text
        style={[
          typography.sticker,
          { color: text },
          isSmall && styles.textSmall,
        ]}
      >
        {showIcon && icon ? `${icon} ` : ''}
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: layout.pillRadius,
    borderWidth: layout.borderWidthThin,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeShadow: {
    boxShadow: '2px 2px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  badgeSmall: {
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  textSmall: {
    fontSize: 9,
    lineHeight: 11,
  },
});
