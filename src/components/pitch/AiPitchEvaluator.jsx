import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import {
  Sparkles,
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  Award,
  ChevronRight,
  BrainCircuit,
} from 'lucide-react-native';
import { evaluatePitch } from '../../utils/aiPitchEvaluator';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout } from '../../theme/spacing';

export const AiPitchEvaluator = ({ idea, onScoreCalculated }) => {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [reevalVersion, setReevalVersion] = useState(0);

  // Derived state: instantly computes on any idea change without stale frames or setState-in-render
  const evaluation = useMemo(() => {
    return evaluatePitch(idea);
  }, [
    idea?.id,
    idea?.title,
    idea?.tagline,
    idea?.description,
    idea?.problem,
    idea?.solution,
    idea?.category,
    idea?.stage,
    idea?.marketSize,
    idea?.businessModel,
    idea?.targetAudience,
    idea?.traction,
    reevalVersion,
  ]);

  // Notify parent listener when score changes
  useEffect(() => {
    onScoreCalculated?.(evaluation.overallScore);
  }, [evaluation.overallScore, onScoreCalculated]);

  const handleReevaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setReevalVersion((v) => v + 1);
      setIsEvaluating(false);
    }, 400);
  };

  const {
    overallScore,
    grade,
    verdict,
    color,
    breakdown,
    confidence,
    strengths,
    risks,
    investorTake,
    detectedDomain,
  } = evaluation;

  return (
    <View style={styles.card}>
      {/* Header Badge & Title */}
      <View style={styles.headerRow}>
        <View style={styles.headerTag}>
          <BrainCircuit size={14} color="#121212" strokeWidth={2.5} style={{ marginRight: 4 }} />
          <Text style={styles.headerTagText}>AI PITCH EVALUATOR</Text>
        </View>

        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>
            {detectedDomain?.name ? detectedDomain.name.toUpperCase() : 'CONTENT-AWARE v3'}
          </Text>
        </View>
      </View>

      {/* Evidence Completeness & Evaluation Confidence Strip */}
      {confidence && (
        <View style={styles.confidenceRow}>
          <Text style={styles.confidenceLabel}>EVIDENCE COMPLETENESS:</Text>
          <View style={[styles.confidenceBadge, { backgroundColor: confidence.badgeColor || '#FEF08A' }]}>
            <Text style={styles.confidenceText}>
              {confidence.level?.toUpperCase()} ({confidence.completenessScore}%)
            </Text>
          </View>
        </View>
      )}

      {/* Main Score Hero */}
      <View style={styles.heroRow}>
        <View style={[styles.scoreCircle, { backgroundColor: color }]}>
          <Text style={styles.scoreNumber}>{overallScore}</Text>
          <Text style={styles.scoreMax}>/100</Text>
        </View>

        <View style={styles.heroMeta}>
          <View style={styles.verdictRow}>
            <Text style={styles.verdictText}>{verdict}</Text>
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeText}>{grade}</Text>
            </View>
          </View>
          <Text style={styles.subVerdict}>
            StartupIQ Alpha Index evaluated based on TAM, defensibility & problem urgency.
          </Text>
        </View>
      </View>

      {/* 3 Metric Breakdown Bars */}
      <View style={styles.breakdownContainer}>
        {/* Market TAM */}
        <View style={styles.metricRow}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricName}>🌐 Market Size & TAM</Text>
            <Text style={styles.metricScore}>{breakdown.marketSize}%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${breakdown.marketSize}%`, backgroundColor: colors.yellow },
              ]}
            />
          </View>
        </View>

        {/* Defensibility */}
        <View style={styles.metricRow}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricName}>🛡️ Defensibility & Moat</Text>
            <Text style={styles.metricScore}>{breakdown.defensibility}%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${breakdown.defensibility}%`, backgroundColor: colors.mint },
              ]}
            />
          </View>
        </View>

        {/* Pitch Clarity */}
        <View style={styles.metricRow}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricName}>🎯 Pitch & Value Clarity</Text>
            <Text style={styles.metricScore}>{breakdown.clarity}%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${breakdown.clarity}%`, backgroundColor: colors.cyan },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Strengths & Risks */}
      <View style={styles.insightsSection}>
        <Text style={styles.insightHeader}>Key Strengths</Text>
        {strengths.map((str, idx) => (
          <View key={`str-${idx}`} style={styles.bulletRow}>
            <CheckCircle2 size={15} color="#10B981" strokeWidth={3} style={{ marginRight: 6 }} />
            <Text style={styles.bulletText}>{str}</Text>
          </View>
        ))}

        <Text style={[styles.insightHeader, { marginTop: 10 }]}>Risk Factors to Watch</Text>
        {risks.map((risk, idx) => (
          <View key={`risk-${idx}`} style={styles.bulletRow}>
            <ShieldAlert size={15} color="#F59E0B" strokeWidth={3} style={{ marginRight: 6 }} />
            <Text style={styles.bulletText}>{risk}</Text>
          </View>
        ))}
      </View>

      {/* Investor Takeaway Banner */}
      <View style={styles.takeawayBox}>
        <View style={styles.takeawayIconBox}>
          <Award size={16} color="#121212" strokeWidth={2.5} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.takeawayTitle}>ANGEL INVESTOR TAKEAWAY</Text>
          <Text style={styles.takeawayText}>{investorTake}</Text>
        </View>
      </View>

      {/* Refresh Evaluation Button */}
      <Pressable
        onPress={handleReevaluate}
        disabled={isEvaluating}
        style={({ pressed }) => [
          styles.refreshBtn,
          pressed && styles.refreshBtnPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Re-analyze pitch with AI"
      >
        {isEvaluating ? (
          <ActivityIndicator size="small" color="#121212" />
        ) : (
          <>
            <RefreshCw size={14} color="#121212" strokeWidth={2.5} style={{ marginRight: 6 }} />
            <Text style={styles.refreshBtnText}>Re-analyze Proposal with AI</Text>
          </>
        )}
      </Pressable>

      <Text style={styles.disclaimerText}>
        * Algorithmic heuristic analysis based on submitted proposal content.
      </Text>
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
    marginBottom: 14,
  },
  headerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDD6FE',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  headerTagText: {
    ...typography.sticker,
    fontSize: 10,
    color: '#121212',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#121212',
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F6F0',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 12,
  },
  confidenceLabel: {
    ...typography.captionSmall,
    fontSize: 10,
    fontWeight: '900',
    color: colors.inkMuted,
    letterSpacing: 0.5,
  },
  confidenceBadge: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: layout.pillRadius,
    paddingHorizontal: 8,
    paddingVertical: 2,
    boxShadow: '1px 1px 0px #121212',
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#121212',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '2px 2px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    marginRight: 14,
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#121212',
    lineHeight: 26,
  },
  scoreMax: {
    fontSize: 10,
    fontWeight: '800',
    color: '#374151',
    marginTop: -2,
  },
  heroMeta: {
    flex: 1,
  },
  verdictRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  verdictText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.ink,
    marginRight: 8,
  },
  gradeBadge: {
    backgroundColor: '#121212',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  gradeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  subVerdict: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.inkMuted,
    lineHeight: 16,
  },
  breakdownContainer: {
    backgroundColor: '#FAF5FF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 14,
    gap: 10,
  },
  metricRow: {},
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metricName: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.ink,
  },
  metricScore: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.ink,
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    borderRightWidth: 1.5,
    borderColor: colors.border,
  },
  insightsSection: {
    marginBottom: 14,
  },
  insightHeader: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.ink,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.inkSecondary,
    flex: 1,
    lineHeight: 16,
  },
  takeawayBox: {
    flexDirection: 'row',
    backgroundColor: colors.yellowLight,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 14,
    alignItems: 'center',
  },
  takeawayIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  takeawayTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#121212',
    letterSpacing: 0.5,
  },
  takeawayText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#121212',
    marginTop: 2,
    lineHeight: 15,
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 10,
    boxShadow: '2px 2px 0px #121212',
  },
  refreshBtnPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
    boxShadow: '1px 1px 0px #121212',
  },
  refreshBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.ink,
  },
  disclaimerText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.inkMuted,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

