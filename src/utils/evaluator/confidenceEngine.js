// Evaluation Confidence & Evidence Completeness Engine
// Calculates an independent evidence completeness score (0-100%) based on 6 core dimensions:
// 1. Problem definition
// 2. Target audience
// 3. Solution specificity
// 4. Revenue model
// 5. Competitive differentiation
// 6. Supporting evidence or measurable outcomes
// Note: Evaluates evidence completeness, NOT startup quality.

export const calculateEvidenceConfidence = (signals) => {
  let completenessScore = 0;
  const dimensions = {
    problemDefinition: { score: 0, max: 18, label: 'Problem Definition' },
    targetAudience: { score: 0, max: 16, label: 'Target Audience' },
    solutionSpecificity: { score: 0, max: 18, label: 'Solution Specificity' },
    revenueModel: { score: 0, max: 16, label: 'Revenue Model' },
    competitiveDifferentiation: { score: 0, max: 16, label: 'Competitive Moat' },
    measurableOutcomes: { score: 0, max: 16, label: 'Measurable Outcomes & Proof' },
  };

  const detectedEvidence = [];
  const missingEvidence = [];

  // 1. Problem Definition (max 18)
  const prob = (signals.problem || '').trim();
  if (prob.length >= 60 && signals.hasProblemMetrics) {
    dimensions.problemDefinition.score = 18;
    detectedEvidence.push('Quantified problem definition with acute customer pain metrics');
  } else if (prob.length >= 30) {
    dimensions.problemDefinition.score = 12;
    detectedEvidence.push('Identified qualitative customer friction and market pain');
  } else if (prob.length > 0) {
    dimensions.problemDefinition.score = 6;
    missingEvidence.push('Problem statement lacks quantifiable cost, delay, or failure metrics');
  } else {
    dimensions.problemDefinition.score = 0;
    missingEvidence.push('Missing problem statement — acute customer pain is undefined');
  }

  // 2. Target Audience (max 16)
  const aud = (signals.targetAudience || '').trim();
  if (signals.customerTypes.length >= 2 || (aud.length >= 25 && signals.customerTypes.length >= 1)) {
    dimensions.targetAudience.score = 16;
    detectedEvidence.push(`Specific target buyer persona defined (${signals.customerTypes.join(', ')})`);
  } else if (signals.customerTypes.length === 1 || aud.length >= 10) {
    dimensions.targetAudience.score = 10;
    detectedEvidence.push('Identified customer segment');
  } else {
    dimensions.targetAudience.score = 0;
    missingEvidence.push('Target customer profile is unstated or overly broad');
  }

  // 3. Solution Specificity (max 18)
  const sol = (signals.solution || '').trim();
  const hasMechanismWords = /protocol|pipeline|sensor|algorithm|model|architecture|dispatch|infrastructure|ebpf|consensus|mesh|delta robot|spectral/i.test(
    sol
  );
  if (sol.length >= 60 && hasMechanismWords) {
    dimensions.solutionSpecificity.score = 18;
    detectedEvidence.push('Detailed technical or operational mechanism of execution');
  } else if (sol.length >= 30) {
    dimensions.solutionSpecificity.score = 11;
    detectedEvidence.push('Outlined functional solution features');
  } else if (sol.length > 0) {
    dimensions.solutionSpecificity.score = 5;
    missingEvidence.push('Solution lacks architectural specificity on how it technically works');
  } else {
    dimensions.solutionSpecificity.score = 0;
    missingEvidence.push('Missing solution definition');
  }

  // 4. Revenue Model (max 16)
  const biz = (signals.businessModel || '').trim();
  const hasSpecificPricing = /\$\d+|\b\d+%\b|\/mo|\/month|\/year|\/acre|\/vehicle|\/user|\/sensor/i.test(biz);
  if (signals.detectedRevenueModel.id !== 'unmentioned' && hasSpecificPricing) {
    dimensions.revenueModel.score = 16;
    detectedEvidence.push(`Specific monetization and unit pricing defined (${signals.detectedRevenueModel.desc})`);
  } else if (signals.detectedRevenueModel.id !== 'unmentioned') {
    dimensions.revenueModel.score = 10;
    detectedEvidence.push('General business model category identified');
  } else {
    dimensions.revenueModel.score = 0;
    missingEvidence.push('Monetization model and unit pricing are completely unstated');
  }

  // 5. Competitive Differentiation / Moat (max 16)
  const fullText = (signals.description + ' ' + signals.problem + ' ' + signals.solution).toLowerCase();
  const hasMoatKeywords =
    signals.detectedTechBarrier?.id === 'deep_tech' ||
    signals.detectedTechBarrier?.id === 'integrated_hardware' ||
    /switching cost|system of record|proprietary data|patent|hipaa|soc2|ebpf|in-kernel|lo-ra|network effect/i.test(fullText);

  if (hasMoatKeywords && signals.vaguenessCount === 0) {
    dimensions.competitiveDifferentiation.score = 16;
    detectedEvidence.push('Identified technical, data, or structural switching cost defensibility');
  } else if (hasMoatKeywords) {
    dimensions.competitiveDifferentiation.score = 10;
    detectedEvidence.push('Early competitive differentiation claims');
  } else {
    dimensions.competitiveDifferentiation.score = 2;
    missingEvidence.push('Lacks defensible moat or switching costs against existing alternatives');
  }

  // 6. Supporting Evidence or Measurable Outcomes (max 16)
  if (signals.hasExplicitTraction && signals.metricsCount >= 3) {
    dimensions.measurableOutcomes.score = 16;
    detectedEvidence.push('Self-reported milestone claims: active pilots/users and quantitative benchmarks cited in proposal');
  } else if (signals.metricsCount >= 2 || signals.hasExplicitTraction) {
    dimensions.measurableOutcomes.score = 11;
    detectedEvidence.push('Self-reported claims: quantitative benchmarks or early pilot validation cited');
  } else if (signals.metricsCount >= 1) {
    dimensions.measurableOutcomes.score = 6;
    missingEvidence.push('Lacks customer validation data, letters of intent, or empirical validation metrics');
  } else {
    dimensions.measurableOutcomes.score = 0;
    missingEvidence.push('Zero empirical metrics or validation evidence provided in proposal');
  }

  // Total Evidence Completeness Score (0-100)
  completenessScore = Math.min(
    100,
    Math.max(
      0,
      dimensions.problemDefinition.score +
        dimensions.targetAudience.score +
        dimensions.solutionSpecificity.score +
        dimensions.revenueModel.score +
        dimensions.competitiveDifferentiation.score +
        dimensions.measurableOutcomes.score
    )
  );

  let level = 'Low';
  let badgeColor = '#FF6B8B'; // Pink

  if (completenessScore >= 80) {
    level = 'High';
    badgeColor = '#34D399'; // Mint
  } else if (completenessScore >= 55) {
    level = 'Medium';
    badgeColor = '#FFDE59'; // Yellow
  }

  return {
    completenessScore,
    level,
    badgeColor,
    dimensions,
    detectedEvidence,
    missingEvidence,
  };
};

