// Calibrated Independent Scoring Engines for StartupIQ
// Eliminates score saturation, separates theoretical TAM from demonstrated validation,
// and enforces evidence-based evaluation without keyword inflation.

export const calculateMarketSizeScore = (signals) => {
  // -----------------------------------------------------------------
  // PILLAR A: Theoretical Market Potential (Max 48 pts)
  // -----------------------------------------------------------------
  let theoreticalTam = 0;

  // 1. Industry Macro Scope (Max 18 pts)
  const tier1Domains = ['healthcare_ai', 'fintech', 'cybersecurity', 'b2b_saas_general'];
  const tier2Domains = ['smart_agriculture', 'ev_cleantech', 'edtech', 'ecommerce_retail'];
  const tier3Domains = ['food_logistics', 'waste_management', 'devtools_infrastructure', 'social_community'];

  if (tier1Domains.includes(signals.primaryDomain.id)) {
    theoreticalTam += 16;
  } else if (tier2Domains.includes(signals.primaryDomain.id)) {
    theoreticalTam += 13;
  } else if (tier3Domains.includes(signals.primaryDomain.id)) {
    theoreticalTam += 10;
  } else {
    theoreticalTam += 8;
  }

  // Explicit credible market size figure cited (e.g. "$38B Global Market", "$500M TAM")
  if (signals.marketSize && /\$\d+/i.test(signals.marketSize)) {
    theoreticalTam += 4;
  }

  // 2. Target Audience Breadth & Definition (Max 16 pts)
  if (signals.customerTypes.length >= 2) {
    theoreticalTam += 16;
  } else if (signals.customerTypes.length === 1) {
    theoreticalTam += 12;
  } else if (signals.targetAudience && signals.targetAudience.trim().length >= 10) {
    theoreticalTam += 8;
  } else {
    // Missing or undefined audience penalty
    theoreticalTam -= 8;
  }

  // 3. Scalability & Distribution Economics (Max 14 pts)
  const isGlobalSoftware =
    signals.primaryDomain.id === 'devtools_infrastructure' ||
    signals.primaryDomain.id === 'cybersecurity' ||
    signals.primaryDomain.id === 'b2b_saas_general' ||
    signals.primaryDomain.id === 'edtech';

  const isOpsHeavy =
    signals.primaryDomain.id === 'food_logistics' ||
    signals.primaryDomain.id === 'waste_management' ||
    signals.primaryDomain.id === 'ev_cleantech';

  if (isGlobalSoftware) {
    theoreticalTam += 14;
  } else if (isOpsHeavy) {
    theoreticalTam += 5; // Constrained by physical city-by-city capital rollout
  } else {
    theoreticalTam += 9;
  }

  theoreticalTam = Math.min(48, Math.max(0, theoreticalTam));

  // -----------------------------------------------------------------
  // PILLAR B: Demonstrated Validation & Business Model Economics (Max 52 pts)
  // -----------------------------------------------------------------
  let validationAndEconomics = 0;

  // 1. Demonstrated Traction & Customer Demand Evidence (Max 26 pts)
  // CRITICAL CALIBRATION: An unvalidated concept with zero customers/pilots gets max 4-6 pts!
  if (signals.hasExplicitTraction) {
    // Verified paying customers, MRR, or active hospital/enterprise pilots
    validationAndEconomics += 24;
  } else if (signals.stage === 'Series A' || signals.stage === 'Seed') {
    // Early capital stage but no explicit traction metrics cited
    validationAndEconomics += 8;
  } else if (signals.stage === 'Pre-Seed') {
    validationAndEconomics += 4;
  } else {
    // Pure Idea / Concept stage: unvalidated market demand
    validationAndEconomics += 2;
  }

  // 2. Revenue Model Viability & Pricing Specificity (Max 26 pts)
  const hasSpecificPricing = /\$\d+|\b\d+%\b|\/mo|\/month|\/year|\/acre|\/vehicle|\/user/i.test(
    signals.businessModel || ''
  );

  if (signals.detectedRevenueModel.id === 'enterprise_subscription') {
    validationAndEconomics += hasSpecificPricing ? 24 : 14;
  } else if (signals.detectedRevenueModel.id === 'usage_based') {
    validationAndEconomics += hasSpecificPricing ? 22 : 12;
  } else if (signals.detectedRevenueModel.id === 'marketplace_take_rate') {
    validationAndEconomics += hasSpecificPricing ? 20 : 10;
  } else if (signals.detectedRevenueModel.id === 'hardware_sales') {
    validationAndEconomics += hasSpecificPricing ? 14 : 8;
  } else if (signals.detectedRevenueModel.id === 'advertising') {
    validationAndEconomics += 6;
  } else if (signals.detectedRevenueModel.id === 'unmentioned') {
    validationAndEconomics -= 16; // Severe penalty for zero monetization
  }

  validationAndEconomics = Math.min(52, Math.max(0, validationAndEconomics));

  // Combine Pillars
  let finalMarketScore = theoreticalTam + validationAndEconomics;

  // Penalize vague buzzword submissions with no concrete substance
  if (signals.vaguenessCount >= 3) {
    finalMarketScore -= 14;
  }

  return Math.min(94, Math.max(15, Math.round(finalMarketScore)));
};

export const calculateDefensibilityScore = (signals) => {
  let score = 25; // Calibrated base

  // 1. Technical Complexity & Proprietary Software Barrier (Max 35 pts)
  if (signals.detectedTechBarrier) {
    score += signals.detectedTechBarrier.bonus;
  }

  // Strict Rule: If it mentions AI or smart but has no proprietary tech or data moat
  const claimsAi = /\bai\b|llm|smart/i.test(signals.tagline + ' ' + signals.description);
  const isThinLayer =
    signals.detectedTechBarrier?.id === 'lightweight_wrapper' ||
    signals.vaguenessCount >= 2 ||
    signals.fullLength < 120;

  if (claimsAi && isThinLayer) {
    score -= 18; // Heavy penalty for "AI wrappers" or buzzwords
  }

  // 2. Proprietary Data Loops & Compounding Flywheels (Max 25 pts)
  const fullText = (signals.description + ' ' + signals.problem + ' ' + signals.solution).toLowerCase();
  const hasProprietaryDataLoop =
    fullText.includes('ehr') ||
    fullText.includes('proprietary data') ||
    fullText.includes('telemetry') ||
    fullText.includes('kernel') ||
    fullText.includes('spectral') ||
    fullText.includes('sensor') ||
    fullText.includes('closed-loop') ||
    fullText.includes('clinical trial') ||
    fullText.includes('dataset');

  if (hasProprietaryDataLoop) {
    score += 22;
  }

  // 3. Switching Costs & Infrastructure Stickiness (Max 20 pts)
  const hasHighSwitchingCosts =
    fullText.includes('system of record') ||
    fullText.includes('hipaa') ||
    fullText.includes('soc2') ||
    fullText.includes('infrastructure') ||
    fullText.includes('ledger') ||
    fullText.includes('enterprise integration') ||
    fullText.includes('ebpf');

  if (hasHighSwitchingCosts) {
    score += 16;
  }

  // 4. Regulatory, Compliance & Contractual Moats (Max 15 pts)
  const hasRegulatoryMoat =
    fullText.includes('fda') ||
    fullText.includes('compliance') ||
    fullText.includes('regulatory') ||
    fullText.includes('audit') ||
    fullText.includes('aml') ||
    fullText.includes('kyc') ||
    fullText.includes('interconnection');

  if (hasRegulatoryMoat) {
    score += 12;
  }

  // 5. Commodity Penalty: If trivially cloneable in weeks by incumbents
  const isCommodityVulnerable =
    signals.primaryDomain.id === 'social_community' ||
    signals.primaryDomain.id === 'food_logistics' ||
    signals.detectedTechBarrier?.id === 'lightweight_wrapper' ||
    signals.fullLength < 100;

  if (isCommodityVulnerable) {
    score -= 14;
  }

  // Missing solution definition penalty
  if (signals.missingElements.includes('solution_definition')) {
    score -= 16;
  }

  return Math.min(94, Math.max(10, Math.round(score)));
};

export const calculateClarityScore = (signals) => {
  let score = 25; // Calibrated base

  // 1. Problem Articulation & Evidence (Max 28 pts)
  if (signals.problem && signals.problem.trim().length >= 40) {
    score += 16;
    if (signals.hasProblemMetrics) {
      score += 10; // Explicit quantifiable metrics in problem statement
    }
  } else if (signals.problem && signals.problem.trim().length >= 15) {
    score += 8;
  } else {
    score -= 14; // Missing problem statement
  }

  // 2. Solution Mechanism Specificity (Max 28 pts)
  if (signals.solution && signals.solution.trim().length >= 40) {
    score += 16;
    const hasMechanism = /protocol|pipeline|sensor|algorithm|model|architecture|dispatch|infrastructure|ebpf|agent|consensus|mesh|delta robot/i.test(
      signals.solution
    );
    if (hasMechanism) score += 10; // Specific architectural mechanism of action
  } else if (signals.solution && signals.solution.trim().length >= 15) {
    score += 8;
  } else {
    score -= 14; // Missing solution definition
  }

  // 3. Tagline Precision & Scope (Max 12 pts)
  const tagLen = signals.tagline.trim().length;
  if (tagLen >= 20 && tagLen <= 95 && signals.vaguenessCount === 0) {
    score += 12;
  } else if (tagLen > 0) {
    score += 5;
  } else {
    score -= 8;
  }

  // 4. Concrete Metrics Count across full submission (Max 12 pts)
  if (signals.metricsCount >= 3) {
    score += 12;
  } else if (signals.metricsCount >= 1) {
    score += 6;
  }

  // 5. Target Audience & Business Model Specificity (Max 12 pts)
  if (!signals.missingElements.includes('target_audience') && !signals.missingElements.includes('revenue_model')) {
    score += 12;
  } else if (signals.missingElements.length >= 3) {
    score -= 14;
  }

  // 6. Vagueness & Fluff Penalties
  if (signals.vaguenessCount >= 3) {
    score -= 22;
  } else if (signals.vaguenessCount >= 1) {
    score -= 10;
  }

  if (signals.vaguenessCount >= 2 && signals.metricsCount === 0) {
    score -= 14;
  }

  // Extremely short submission penalty
  if (signals.fullLength < 60) {
    score -= 18;
  }

  return Math.min(92, Math.max(10, Math.round(score)));
};
