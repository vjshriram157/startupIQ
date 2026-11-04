// StartupIQ Content-Aware AI Pitch Evaluation Engine
// Performs intelligent offline heuristic analysis across Market Size, Defensibility, and Clarity

import { extractContentSignals } from './evaluator/contentExtractor.js';
import {
  calculateMarketSizeScore,
  calculateDefensibilityScore,
  calculateClarityScore,
} from './evaluator/scoringEngines.js';
import { calculateEvidenceConfidence } from './evaluator/confidenceEngine.js';
import { generateDynamicFeedback } from './evaluator/feedbackGenerator.js';

/**
 * Evaluates a startup idea submission deterministically using content-aware heuristics.
 * @param {Object} idea - The startup submission object containing title, tagline, description, problem, solution, etc.
 * @returns {Object} Comprehensive evaluation metrics, grades, breakdowns, confidence, strengths, risks, and investor takeaway.
 */
export const evaluatePitch = (idea) => {
  if (!idea || (!idea.title && !idea.description && !idea.tagline)) {
    return {
      overallScore: 28,
      grade: 'C',
      verdict: 'Incomplete Submission ⚠️',
      color: '#FF5757',
      breakdown: {
        marketSize: 25,
        defensibility: 20,
        clarity: 40,
      },
      confidence: {
        completenessScore: 12,
        level: 'Low',
        badgeColor: '#FF5757',
        missingEvidence: [
          'Missing problem statement',
          'Missing solution definition',
          'Monetization model is completely unstated',
          'Zero empirical metrics or validation evidence',
        ],
      },
      strengths: [
        'Submission created on StartupIQ',
        'Open canvas ready for venture formulation',
        'Early ideation stage',
      ],
      risks: [
        'No problem statement provided to establish customer pain or urgency',
        'Solution mechanism is unstated — lacks architectural specificity',
        'Business and revenue capture model is completely missing',
      ],
      investorTake:
        'This pitch lacks foundational details regarding the target customer, problem, and monetization model. Before seeking capital, formulate an acute customer pain point, draft a specific solution mechanism, and validate initial willingness to pay.',
      detectedDomain: { id: 'unspecified', name: 'General Ideation' },
      methodologyNote:
        'Algorithmic heuristic analysis based on submitted proposal content. Does not constitute real-world financial or legal diligence.',
    };
  }

  // Phase 1: Extract Structured Content Signals & Taxonomy Matching
  const signals = extractContentSignals(idea);

  // Phase 2: Calculate Evidence Completeness & Confidence Layer
  const confidence = calculateEvidenceConfidence(signals);

  // Phase 3: Calculate Three Calibrated Metric Scores
  const marketScore = calculateMarketSizeScore(signals);
  const defensibilityScore = calculateDefensibilityScore(signals);
  const clarityScore = calculateClarityScore(signals);

  // Phase 4: Calculate Weighted Overall Score
  // Weights: Market Size (35%), Defensibility (30%), Pitch Clarity (35%)
  const overallScore = Math.round(
    marketScore * 0.35 + defensibilityScore * 0.3 + clarityScore * 0.35
  );

  // Consistent Score Thresholds & Letter Grades
  let grade = 'B';
  let verdict = 'Solid Seed Concept 💡';
  let color = '#FFDE59'; // Yellow

  if (overallScore >= 90) {
    grade = 'A+';
    verdict = 'Unicorn Tier 🦄';
    color = '#34D399'; // Mint
  } else if (overallScore >= 82) {
    grade = 'A';
    verdict = 'High Alpha Potential 🚀';
    color = '#34D399'; // Mint
  } else if (overallScore >= 74) {
    grade = 'B+';
    verdict = 'Strong Contender ⚡';
    color = '#38BDF8'; // Sky Cyan
  } else if (overallScore >= 65) {
    grade = 'B';
    verdict = 'Solid Seed Concept 💡';
    color = '#FFDE59'; // Lemon Yellow
  } else if (overallScore >= 50) {
    grade = 'C+';
    verdict = 'Needs Refinement 🛠️';
    color = '#FF6B8B'; // Pop Pink
  } else {
    grade = 'C';
    verdict = 'High Execution Risk ⚠️';
    color = '#FF5757'; // Coral Red
  }

  // Phase 5: Generate Dynamic, Grounded Feedback
  const feedback = generateDynamicFeedback(
    signals,
    {
      marketScore,
      defensibilityScore,
      clarityScore,
      overallScore,
    },
    confidence
  );

  return {
    overallScore,
    grade,
    verdict,
    color,
    breakdown: {
      marketSize: marketScore,
      defensibility: defensibilityScore,
      clarity: clarityScore,
    },
    confidence,
    strengths: feedback.strengths,
    risks: feedback.risks,
    investorTake: feedback.investorTake,
    detectedDomain: {
      id: signals.primaryDomain.id,
      name: signals.primaryDomain.name,
    },
    methodologyNote:
      'Algorithmic heuristic evaluation based on submitted content signals. Not an external financial audit.',
  };
};
