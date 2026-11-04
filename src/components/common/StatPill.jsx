import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout } from '../../theme/spacing';

export const StatPill = ({ icon: IconComponent, value, label, color = colors.textSecondary }) => {
  return (
    <View style={styles.container}>
      {IconComponent && <IconComponent size={14} color={color} style={styles.icon} />}
      <Text style={[typography.caption, styles.valueText, { color }]}>{value}</Text>
      {label && <Text style={[typography.captionSmall, styles.labelText]}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: layout.pillRadius,
  },
  icon: {
    marginRight: 4,
  },
  valueText: {
    fontWeight: '700',
    fontSize: 12,
  },
  labelText: {
    color: colors.textMuted,
    marginLeft: 3,
    fontSize: 11,
  },
});

