import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Compass, PlusCircle, Trophy } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout } from '../../theme/spacing';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'android' ? 8 : 12);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.inkMuted,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: colors.border,
          borderTopWidth: layout.borderWidthThick,
          height: 62 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 8,
          boxShadow: '0px -3px 0px #121212',
          elevation: 12,
        },
        tabBarLabelStyle: {
          ...typography.captionSmall,
          fontWeight: '900',
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconExploreActive]}>
              <Compass
                size={22}
                color={colors.ink}
                strokeWidth={focused ? 3 : 2.5}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="submit"
        options={{
          title: 'Submit',
          tabBarLabel: 'Submit',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, styles.submitContainer, focused && styles.iconSubmitActive]}>
              <PlusCircle
                size={22}
                color={colors.ink}
                strokeWidth={focused ? 3 : 2.5}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconLeaderboardActive]}>
              <Trophy
                size={22}
                color={colors.ink}
                strokeWidth={focused ? 3 : 2.5}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 32,
    borderRadius: 8,
  },
  iconExploreActive: {
    backgroundColor: colors.yellow,
    borderWidth: 2,
    borderColor: colors.border,
    boxShadow: '2px 2px 0px #121212',
  },
  submitContainer: {
    width: 38,
    height: 34,
    borderRadius: 8,
  },
  iconSubmitActive: {
    backgroundColor: colors.pinkLight,
    borderWidth: 2,
    borderColor: colors.border,
    boxShadow: '2px 2px 0px #121212',
  },
  iconLeaderboardActive: {
    backgroundColor: colors.cyanLight,
    borderWidth: 2,
    borderColor: colors.border,
    boxShadow: '2px 2px 0px #121212',
  },
});
