import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Lightbulb, Send, Sparkles, CheckCircle2 } from 'lucide-react-native';
import { FormField } from '../../components/submit/FormField';
import { CategoryPicker } from '../../components/submit/CategoryPicker';
import { GradientButton } from '../../components/common/GradientButton';
import { GlassCard } from '../../components/common/GlassCard';
import { useIdeas } from '../../hooks/useIdeas';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, neoShadows } from '../../theme/spacing';

const CATEGORIES = [
  'AI & ML',
  'DevTools',
  'FinTech',
  'ClimateTech',
  'HealthTech',
  'Cybersecurity',
  'SaaS',
  'EdTech',
  'E-Commerce',
  'Web3',
];

const STAGES = ['Idea / Concept', 'Pre-Seed', 'Seed', 'Series A'];

export default function SubmitScreen() {
  const insets = useSafeAreaInsets();
  const { addIdea } = useIdeas();

  // Form State
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [category, setCategory] = useState('AI & ML');
  const [stage, setStage] = useState('Idea / Concept');
  const [businessModel, setBusinessModel] = useState('');
  const [founderName, setFounderName] = useState('');
  const [founderCredentials, setFounderCredentials] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Startup title is required';
    } else if (title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters';
    }

    if (!tagline.trim()) {
      errs.tagline = 'A punchy one-line tagline is required';
    } else if (tagline.trim().length < 10) {
      errs.tagline = 'Tagline should be descriptive (at least 10 chars)';
    }

    if (!description.trim()) {
      errs.description = 'Elevator pitch summary is required';
    } else if (description.trim().length < 20) {
      errs.description = 'Please provide at least 20 characters of detail';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Alert.alert(
        'Incomplete Form',
        'Please provide a title, tagline (10+ chars), and description (20+ chars) before submitting.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const newIdea = await addIdea({
        title,
        tagline,
        description,
        problem,
        solution,
        category,
        stage,
        businessModel: businessModel || 'B2B SaaS / Usage-Based',
        founderName: founderName || 'Anonymous Founder',
        founderCredentials: founderCredentials || 'Startup Enthusiast',
      });

      // Reset form
      setTitle('');
      setTagline('');
      setDescription('');
      setProblem('');
      setSolution('');
      setBusinessModel('');
      setFounderName('');
      setFounderCredentials('');
      setErrors({});

      Alert.alert(
        '🚀 Startup Idea Published!',
        `"${newIdea.title}" is now live on StartupIQ for community voting.`,
        [
          {
            text: 'View Pitch',
            onPress: () => router.push(`/idea/${newIdea.id}`),
          },
          {
            text: 'Explore Feed',
            onPress: () => router.push('/'),
          },
        ]
      );
    } catch (e) {
      Alert.alert('Error', 'Unable to submit your idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Sticky Top Header Bar with Instant Submit Action */}
        <View style={styles.topBar}>
          <View>
            <Text style={[typography.h3, styles.topBarTitle]}>Submit Startup</Text>
            <Text style={styles.topBarSub}>Pitch to investors & community</Text>
          </View>
          <GradientButton
            title="Publish 🚀"
            icon={Send}
            iconPosition="right"
            variant="yellow"
            size="sm"
            onPress={handleSubmit}
            loading={isSubmitting}
            style={styles.topPublishBtn}
          />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Pitch Lab Tag */}
          <View style={styles.titleSection}>
            <View style={styles.badgeRow}>
              <View style={styles.categoryPill}>
                <Sparkles size={12} color="#121212" strokeWidth={3} style={{ marginRight: 4 }} />
                <Text style={styles.categoryPillText}>FOUNDER PITCH LAB</Text>
              </View>
            </View>
            <Text style={[typography.h1, styles.mainTitle]}>Share Your Vision</Text>
            <Text style={[typography.body, styles.mainSubtitle]}>
              Fill in the proposal details below. Your idea will instantly appear on the Explore
              feed and Leaderboard.
            </Text>
          </View>

          {/* Tips Box */}
          <GlassCard variant="yellow" style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <View style={styles.bulbIconBox}>
                <Lightbulb size={16} color="#121212" strokeWidth={3} />
              </View>
              <Text style={[typography.subtitle, styles.tipsTitle]}>What makes ideas rank high?</Text>
            </View>
            <Text style={[typography.body, styles.tipsText]}>
              Focus on an acute problem, why current alternatives fail, and your unfair advantage.
              Specific numbers and market figures build instant credibility.
            </Text>
          </GlassCard>

          {/* Core Info */}
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionNumberBox}>
              <Text style={styles.sectionNumber}>1</Text>
            </View>
            <Text style={[typography.subtitle, styles.sectionHeader]}>Core Concept</Text>
          </View>

          <FormField
            label="Startup Name"
            required
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. NeuroFlow AI"
            maxLength={50}
            error={errors.title}
          />

          <FormField
            label="One-Line Tagline"
            required
            value={tagline}
            onChangeText={setTagline}
            placeholder="e.g. Autonomous AI agent orchestration for clinical trials"
            maxLength={100}
            hint="Make it clear what you do in one sentence"
            error={errors.tagline}
          />

          <FormField
            label="Elevator Pitch / Overview"
            required
            value={description}
            onChangeText={setDescription}
            placeholder="Describe what your product does, how it works, and why customers love it..."
            multiline
            numberOfLines={3}
            maxLength={300}
            error={errors.description}
          />

          {/* Classification */}
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionNumberBox, { backgroundColor: colors.cyanLight }]}>
              <Text style={styles.sectionNumber}>2</Text>
            </View>
            <Text style={[typography.subtitle, styles.sectionHeader]}>Category & Stage</Text>
          </View>

          <CategoryPicker
            title="Industry Domain"
            options={CATEGORIES}
            selectedOption={category}
            onSelectOption={setCategory}
            allowCustom
            type="category"
          />

          <CategoryPicker
            title="Current Venture Stage"
            options={STAGES}
            selectedOption={stage}
            onSelectOption={setStage}
            type="stage"
          />

          {/* Deep Dive */}
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionNumberBox, { backgroundColor: colors.pinkLight }]}>
              <Text style={styles.sectionNumber}>3</Text>
            </View>
            <Text style={[typography.subtitle, styles.sectionHeader]}>The Pitch Breakdown</Text>
          </View>

          <FormField
            label="The Acute Problem"
            value={problem}
            onChangeText={setProblem}
            placeholder="What specific acute pain point does your customer experience today? What does it cost them?"
            multiline
            numberOfLines={3}
            maxLength={350}
          />

          <FormField
            label="The 10x Solution"
            value={solution}
            onChangeText={setSolution}
            placeholder="How does your technology or approach solve this 10x better, faster, or cheaper?"
            multiline
            numberOfLines={3}
            maxLength={350}
          />

          <FormField
            label="Business Model & Pricing"
            value={businessModel}
            onChangeText={setBusinessModel}
            placeholder="e.g. B2B SaaS ($299/mo) + 1.5% take-rate on settled transactions"
            maxLength={100}
          />

          {/* Founder Bio */}
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionNumberBox, { backgroundColor: colors.mintLight }]}>
              <Text style={styles.sectionNumber}>4</Text>
            </View>
            <Text style={[typography.subtitle, styles.sectionHeader]}>Founder Credentials</Text>
          </View>

          <FormField
            label="Your Name or Team"
            value={founderName}
            onChangeText={setFounderName}
            placeholder="e.g. Dr. Alex Mercer"
            maxLength={60}
          />

          <FormField
            label="Background & Credentials"
            value={founderCredentials}
            onChangeText={setFounderCredentials}
            placeholder="e.g. Ex-Datadog Staff Engineer, MIT Clean Energy Fellow"
            maxLength={100}
          />

          {/* Full Bottom Submit CTA Card */}
          <GlassCard variant="yellow" shadow="md" style={styles.finalSubmitCard}>
            <View style={styles.submitCardRow}>
              <View style={styles.readyIconBox}>
                <CheckCircle2 size={24} color="#121212" strokeWidth={2.5} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[typography.h3, styles.readyTitle]}>All Set to Launch?</Text>
                <Text style={[typography.caption, styles.readySub]}>
                  Your idea will go live for votes and founder reviews.
                </Text>
              </View>
            </View>

            <GradientButton
              title="Publish Startup Proposal 🚀"
              icon={Send}
              iconPosition="right"
              variant="black"
              textColor="#FFFFFF"
              onPress={handleSubmit}
              loading={isSubmitting}
              size="lg"
              fullWidth
              style={{ marginTop: 12 }}
            />
          </GlassCard>

          {/* Bottom spacing so content never gets hidden behind the tab bar or floating bar */}
          <View style={{ height: 140 }} />
        </ScrollView>

        {/* Floating Bottom Quick Submit Bar */}
        <View style={styles.floatingBar}>
          <View style={styles.floatingMeta}>
            <Text style={styles.floatingTitle}>Ready to publish?</Text>
            <Text style={styles.floatingSub}>
              {title ? title : 'Fill details above'}
            </Text>
          </View>
          <GradientButton
            title="Publish 🚀"
            icon={Send}
            iconPosition="right"
            variant="yellow"
            onPress={handleSubmit}
            loading={isSubmitting}
            size="md"
            style={styles.floatingBtn}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: layout.borderWidthThick,
    borderBottomColor: colors.border,
    boxShadow: '0px 2px 0px #121212',
    zIndex: 10,
  },
  topBarTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  topBarSub: {
    ...typography.captionSmall,
    color: colors.inkMuted,
    fontWeight: '700',
  },
  topPublishBtn: {
    minHeight: 38,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  titleSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pinkLight,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: layout.pillRadius,
    boxShadow: '1.5px 1.5px 0px #121212',
    transform: [{ rotate: '-1.5deg' }],
  },
  categoryPillText: {
    ...typography.captionSmall,
    color: colors.ink,
    fontWeight: '900',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  mainTitle: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 6,
  },
  mainSubtitle: {
    color: colors.inkSecondary,
    lineHeight: 20,
    fontWeight: '600',
  },
  tipsCard: {
    marginBottom: 20,
    backgroundColor: colors.yellowLight,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulbIconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: colors.yellow,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  tipsTitle: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 14,
  },
  tipsText: {
    color: colors.ink,
    lineHeight: 19,
    fontWeight: '600',
    fontSize: 13,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
  sectionNumberBox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: colors.yellow,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    boxShadow: '1.5px 1.5px 0px #121212',
  },
  sectionNumber: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 13,
  },
  sectionHeader: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '900',
  },
  finalSubmitCard: {
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: colors.yellowLight,
  },
  submitCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readyIconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: colors.mintLight,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    boxShadow: '2px 2px 0px #121212',
  },
  readyTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  readySub: {
    color: colors.inkSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  floatingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderTopWidth: layout.borderWidthThick,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    boxShadow: '0px -3px 0px #121212',
    elevation: 8,
  },
  floatingMeta: {
    flex: 1,
    marginRight: 12,
  },
  floatingTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '900',
  },
  floatingSub: {
    ...typography.captionSmall,
    color: colors.inkMuted,
    fontWeight: '700',
    marginTop: 1,
  },
  floatingBtn: {
    minWidth: 130,
  },
});
