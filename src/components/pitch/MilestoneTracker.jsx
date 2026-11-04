import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CheckCircle2, Clock, CircleDot, Flag, Sparkles } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout } from '../../theme/spacing';

const DEFAULT_MILESTONES = [
  {
    id: 1,
    stage: 'Phase 1',
    title: 'Problem & Market Discovery',
    description: '30+ founder interviews and validation of workflow inefficiencies.',
    status: 'completed', // 'completed' | 'in_progress' | 'upcoming'
    targetDate: 'Achieved',
    icon: '💡',
  },
  {
    id: 2,
    stage: 'Phase 2',
    title: 'MVP Alpha Release',
    description: 'Closed-beta deployment with first 5 pilot enterprise teams.',
    status: 'completed',
    targetDate: 'Achieved',
    icon: '🛠️',
  },
  {
    id: 3,
    stage: 'Phase 3',
    title: 'First 100 Active Users',
    description: 'Proving 80%+ weekly retention and self-serve onboarding.',
    status: 'in_progress',
    targetDate: 'Current Sprint',
    icon: '👥',
  },
  {
    id: 4,
    stage: 'Phase 4',
    title: 'Institutional Seed Round',
    description: 'Securing $1.5M - $2.5M to expand core engineering & sales.',
    status: 'upcoming',
    targetDate: 'Q3 2026',
    icon: '💰',
  },
];

export const MilestoneTracker = ({ initialMilestones, onMilestoneToggle }) => {
  const [milestones, setMilestones] = useState(
    initialMilestones && initialMilestones.length > 0
      ? initialMilestones
      : DEFAULT_MILESTONES
  );

  const toggleStatus = (id) => {
    const updated = milestones.map((m) => {
      if (m.id === id) {
        const nextStatus =
          m.status === 'completed'
            ? 'in_progress'
            : m.status === 'in_progress'
            ? 'upcoming'
            : 'completed';
        return { ...m, status: nextStatus };
      }
      return m;
    });
    setMilestones(updated);
    onMilestoneToggle?.(updated);
  };

  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.tagBadge}>
          <Flag size={13} color="#121212" strokeWidth={2.5} style={{ marginRight: 4 }} />
          <Text style={styles.tagText}>ROADMAP & EXECUTION</Text>
        </View>
        <View style={styles.progressBadge}>
          <Text style={styles.progressBadgeText}>{progressPercent}% COMPLETED</Text>
        </View>
      </View>

      <Text style={[typography.h3, styles.title]}>Venture Milestones</Text>
      <Text style={styles.subtitle}>
        Track execution velocity from initial concept to institutional scale.
      </Text>

      {/* Progress Track */}
      <View style={styles.overallTrack}>
        <View style={[styles.overallFill, { width: `${progressPercent}%` }]} />
      </View>

      {/* Timeline Steps */}
      <View style={styles.timeline}>
        {milestones.map((item, index) => {
          const isCompleted = item.status === 'completed';
          const isInProgress = item.status === 'in_progress';
          const isLast = index === milestones.length - 1;

          return (
            <View key={item.id} style={styles.stepContainer}>
              {/* Left Column: Icon & Connector Line */}
              <View style={styles.stepLeft}>
                <Pressable
                  onPress={() => toggleStatus(item.id)}
                  style={[
                    styles.nodeCircle,
                    isCompleted && styles.nodeCompleted,
                    isInProgress && styles.nodeInProgress,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Milestone ${item.title}: ${item.status}. Tap to update.`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={16} color="#121212" strokeWidth={3} />
                  ) : isInProgress ? (
                    <CircleDot size={16} color="#121212" strokeWidth={3} />
                  ) : (
                    <Text style={styles.nodeIconText}>{item.icon || '○'}</Text>
                  )}
                </Pressable>

                {!isLast && (
                  <View
                    style={[
                      styles.connectorLine,
                      isCompleted && styles.connectorCompleted,
                    ]}
                  />
                )}
              </View>

              {/* Right Column: Milestone Content Card */}
              <Pressable
                onPress={() => toggleStatus(item.id)}
                style={({ pressed }) => [
                  styles.stepCard,
                  isCompleted && styles.stepCardCompleted,
                  isInProgress && styles.stepCardInProgress,
                  pressed && styles.stepPressed,
                ]}
              >
                <View style={styles.stepCardHeader}>
                  <Text style={styles.stepPhase}>{item.stage}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      isCompleted && styles.statusPillCompleted,
                      isInProgress && styles.statusPillInProgress,
                    ]}
                  >
                    <Text style={styles.statusPillText}>
                      {isCompleted
                        ? 'COMPLETED ✓'
                        : isInProgress
                        ? 'IN PROGRESS ⏳'
                        : 'UPCOMING'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.stepTitle}>{item.title}</Text>
                <Text style={styles.stepDescription}>{item.description}</Text>

                <View style={styles.metaRow}>
                  <Clock size={11} color="#6B7280" strokeWidth={2.5} style={{ marginRight: 4 }} />
                  <Text style={styles.targetDateText}>{item.targetDate}</Text>
                  <Text style={styles.tapHint}>• Tap to toggle status</Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: layout.borderWidthThick,
    borderColor: colors.border,
    padding: 16,
    marginVertical: 12,
    boxShadow: '4px 4px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BAE6FD',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    ...typography.sticker,
    fontSize: 10,
    color: '#121212',
  },
  progressBadge: {
    backgroundColor: '#DDD6FE',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  progressBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#121212',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.ink,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.inkMuted,
    marginBottom: 12,
  },
  overallTrack: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  overallFill: {
    height: '100%',
    backgroundColor: colors.mint,
    borderRadius: 3,
  },
  timeline: {
    gap: 4,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepLeft: {
    alignItems: 'center',
    width: 32,
    marginRight: 10,
  },
  nodeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  nodeCompleted: {
    backgroundColor: colors.mintLight,
  },
  nodeInProgress: {
    backgroundColor: colors.yellow,
  },
  nodeIconText: {
    fontSize: 12,
  },
  connectorLine: {
    width: 3,
    flex: 1,
    minHeight: 48,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
    borderRadius: 2,
  },
  connectorCompleted: {
    backgroundColor: colors.mint,
  },
  stepCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 12,
    boxShadow: '2px 2px 0px #121212',
  },
  stepCardCompleted: {
    backgroundColor: '#F0FDF4',
  },
  stepCardInProgress: {
    backgroundColor: '#FEFCE8',
    borderColor: '#121212',
  },
  stepPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
    boxShadow: '1px 1px 0px #121212',
  },
  stepCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepPhase: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.inkMuted,
    textTransform: 'uppercase',
  },
  statusPill: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: layout.pillRadius,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: '#F3F4F6',
  },
  statusPillCompleted: {
    backgroundColor: colors.mintLight,
  },
  statusPillInProgress: {
    backgroundColor: colors.yellow,
  },
  statusPillText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#121212',
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.ink,
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.inkSecondary,
    lineHeight: 15,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  targetDateText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.inkMuted,
  },
  tapHint: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    marginLeft: 4,
  },
});

