import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Rocket, Settings, Sparkles, Zap } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, neoShadows } from '../../theme/spacing';

export const Header = ({ title, subtitle, showSettings = true, rightAction }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftRow}>
        <View style={styles.logoBadge}>
          <Rocket size={20} color="#121212" strokeWidth={2.5} />
        </View>
        <View style={styles.titleColumn}>
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>Startup</Text>
            <View style={styles.iqBadge}>
              <Text style={styles.iqText}>IQ</Text>
            </View>
            <View style={styles.stickerPill}>
              <Zap size={10} color="#121212" strokeWidth={3} style={{ marginRight: 2 }} />
              <Text style={styles.stickerPillText}>HOT</Text>
            </View>
          </View>
          {subtitle ? (
            <Text style={styles.subtitleText} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : (
            <Text style={styles.subtitleText}>Community Idea Lab</Text>
          )}
        </View>
      </View>

      <View style={styles.rightRow}>
        {rightAction}
        {showSettings && (
          <Pressable
            onPress={() => router.push('/settings')}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Open Settings"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Settings size={20} color={colors.ink} strokeWidth={2.5} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: layout.borderWidthThick,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.yellow,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    boxShadow: '3px 3px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  titleColumn: {
    justifyContent: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    ...typography.h3,
    color: colors.ink,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  iqBadge: {
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginLeft: 4,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  iqText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  stickerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pinkLight,
    borderColor: colors.border,
    borderWidth: 1.5,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: layout.pillRadius,
    marginLeft: 8,
    transform: [{ rotate: '-2deg' }],
  },
  stickerPillText: {
    ...typography.captionSmall,
    color: colors.ink,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  subtitleText: {
    ...typography.caption,
    color: colors.inkMuted,
    marginTop: 1,
    fontSize: 11,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: layout.borderWidthThin,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '2.5px 2.5px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  iconButtonPressed: {
    transform: [{ translateX: 1.5 }, { translateY: 1.5 }],
    boxShadow: '1px 1px 0px #121212',
    shadowOffset: { width: 1, height: 1 },
  },
});
