import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SearchX } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, neoShadows } from '../../theme/spacing';
import { GradientButton } from './GradientButton';

export const EmptyState = ({
  icon: IconComponent = SearchX,
  title = 'No ideas found',
  description = 'Try adjusting your search criteria or switch category filters.',
  actionLabel,
  onAction,
}) => {
  return (
    <View style={[styles.container, neoShadows.md]}>
      <View style={styles.iconContainer}>
        <IconComponent size={32} color={colors.ink} strokeWidth={2.5} />
      </View>
      <Text style={[typography.h3, styles.title]}>{title}</Text>
      <Text style={[typography.body, styles.description]}>{description}</Text>
      {actionLabel && onAction && (
        <GradientButton
          title={actionLabel}
          onPress={onAction}
          variant="yellow"
          size="sm"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    borderRadius: layout.cardRadius,
    marginHorizontal: 16,
    marginVertical: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.yellow,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    boxShadow: '3px 3px 0px #121212',
  },
  title: {
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '900',
  },
  description: {
    color: colors.inkSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    maxWidth: 280,
    fontWeight: '600',
  },
  button: {
    marginTop: 4,
  },
});
