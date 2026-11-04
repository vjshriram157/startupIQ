// Dynamic Evidence-Grounded Feedback Generator
// Synthesizes idea-specific Strengths (3), Evidence-Backed Risks (3), and an Investor Takeaway (2-3 sentences)
// Avoids fixed static lists; grounds all points in detected vs missing evidence.

export const generateDynamicFeedback = (signals, scores, confidence) => {
  const { marketScore, defensibilityScore, clarityScore, overallScore } = scores;
  const domain = signals.primaryDomain;

  // -------------------------------------------------------------
  // 1. DYNAMIC KEY STRENGTHS (Top 3 evidence-backed items)
  // -------------------------------------------------------------
  const candidateStrengths = [];

  // A. Traction & Empirical Proof (Highest Quality Signal)
  if (signals.hasExplicitTraction) {
    candidateStrengths.push(
      `Demonstrated customer traction: cited active pilots, users, or revenue validation (${signals.traction})`
    );
  }

  // B. Business Model & Pricing Specificity
  const hasSpecificPricing = /\$\d+|\b\d+%\b|\/mo|\/month|\/year|\/acre|\/vehicle|\/user/i.test(
    signals.businessModel || ''
  );
  if (signals.detectedRevenueModel.id !== 'unmentioned' && hasSpecificPricing) {
    candidateStrengths.push(
      `Clear unit economics: defined monetization framework (${signals.businessModel})`
    );
  } else if (signals.detectedRevenueModel.id !== 'unmentioned') {
    candidateStrengths.push(
      `Identified monetization model: ${signals.detectedRevenueModel.desc}`
    );
  }

  // C. Technical Moat / Mechanism Specificity
  if (signals.detectedTechBarrier?.id === 'deep_tech') {
    candidateStrengths.push(
      `High technical barrier: ${signals.detectedTechBarrier.strength}`
    );
  } else if (signals.detectedTechBarrier?.id === 'integrated_hardware') {
    candidateStrengths.push(
      'Hardware deployment footprint creates defensible physical switching costs'
    );
  } else if (defensibilityScore >= 65) {
    candidateStrengths.push(
      'Defensive moat supported by operational workflow stickiness and high switching costs'
    );
  }

  // D. Problem Grounding & Quantified Metrics
  if (signals.hasProblemMetrics && signals.problem.length >= 40) {
    candidateStrengths.push(
      'Grounded problem statement supported by empirical pain metrics and quantifiable customer cost'
    );
  } else if (clarityScore >= 70) {
    candidateStrengths.push(
      'High-clarity value proposition with sharply articulated problem-to-solution alignment'
    );
  }

  // E. Customer Persona Alignment
  if (signals.customerTypes.length >= 1) {
    candidateStrengths.push(
      `Focused initial buyer persona targeting ${signals.customerTypes.join(' and ')}`
    );
  }

  // F. Domain Core Strength (only if not already covered)
  if (domain && domain.strengths && domain.strengths[0]) {
    const s0 = domain.strengths[0];
    const isRevenueClaim = /revenue|billing|cash flow|contract|commission/i.test(s0);
    if (!isRevenueClaim || !signals.missingElements.includes('revenue_model')) {
      candidateStrengths.push(s0);
    }
  }

  // Deduplicate and ensure top 3
  const uniqueStrengths = Array.from(new Set(candidateStrengths)).slice(0, 3);

  const genericFallbacks = [
    'Identifiable market category with active industry demand',
    'Broad conceptual scope with multiple potential product pivots',
    'Early-stage concept open for customer validation and discovery',
  ];
  for (const fb of genericFallbacks) {
    if (uniqueStrengths.length < 3 && !uniqueStrengths.includes(fb)) {
      uniqueStrengths.push(fb);
    }
  }

  // -------------------------------------------------------------
  // 2. DYNAMIC RISK FACTORS TO WATCH (Top 3 evidence-backed items)
  // -------------------------------------------------------------
  const candidateRisks = [];

  // Priority A: Evidence Gaps (Missing critical information)
  if (!signals.hasExplicitTraction && signals.stage === 'Idea / Concept') {
    candidateRisks.push(
      'Customer demand is unvalidated: lacks verified paying pilots, LOIs, or customer retention data'
    );
  }

  if (signals.missingElements.includes('revenue_model')) {
    candidateRisks.push(
      'Monetization model is completely unstated — lacks clear pricing, take-rate, or unit revenue capture logic'
    );
  }

  if (signals.missingElements.includes('target_audience')) {
    candidateRisks.push(
      'Target customer persona is undefined — risk of broad positioning rather than solving for an acute initial buyer'
    );
  }

  if (signals.missingElements.includes('problem_definition')) {
    candidateRisks.push(
      'Problem statement lacks quantifiable pain metrics or urgency proof vs existing alternatives'
    );
  }

  if (signals.missingElements.includes('solution_definition')) {
    candidateRisks.push(
      'Solution lacks architectural specificity on the concrete technical mechanism of execution'
    );
  }

  // Priority B: Moat & Replicability Risks
  if (defensibilityScore < 50) {
    candidateRisks.push(
      'Low technical moat: core product functionality can be rapidly replicated by established market incumbents'
    );
  }

  if (signals.vaguenessCount >= 2) {
    candidateRisks.push(
      'Pitch relies heavily on aspirational buzzwords without explaining defensible operational mechanics'
    );
  }

  // Priority C: Contextual Domain Risks
  if (domain && domain.risks) {
    domain.risks.forEach((r) => {
      if (candidateRisks.length < 3 && !candidateRisks.includes(r)) {
        candidateRisks.push(r);
      }
    });
  }

  // Deduplicate and ensure top 3
  const uniqueRisks = Array.from(new Set(candidateRisks)).slice(0, 3);

  while (uniqueRisks.length < 3) {
    uniqueRisks.push('Customer acquisition cost (CAC) scaling risks during geographic rollout');
  }

  // -------------------------------------------------------------
  // 3. ANGEL INVESTOR TAKEAWAY (2-3 tailored sentences)
  // -------------------------------------------------------------
  let investorTake = '';

  if (confidence.completenessScore < 45 || overallScore < 50) {
    investorTake =
      'The pitch currently relies on broad aspirational claims without defining an acute problem, target buyer, or monetization mechanism. Before seeking capital, narrow down to one specific customer segment, quantify their exact dollar waste, and validate willingness to pay with 15 customer discovery interviews.';
  } else if (signals.hasExplicitTraction && overallScore >= 85) {
    investorTake = `${domain.investorTake} With demonstrated pilot traction and a strong StartupIQ rating, the immediate priority is converting active design partnerships into multi-year enterprise contracts with upfront billing.`;
  } else if (!signals.hasExplicitTraction && overallScore >= 75) {
    investorTake =
      `The proposal presents a compelling theoretical opportunity in ${domain.name}, but customer demand remains unproven. Focus on securing at least two signed letters of intent or pilot design agreements before committing capital to full-scale engineering buildout.`;
  } else if (defensibilityScore < 50) {
    investorTake =
      'Market opportunity is apparent, but defensibility against established incumbents remains thin. Identify a proprietary data flywheel, specialized workflow integration, or regulatory moat that prevents competitors from easily replicating your offering.';
  } else if (signals.missingElements.includes('revenue_model')) {
    investorTake =
      'The foundational concept addresses an identifiable industry pain point, but lacks a viable monetization framework. Formulate a clear unit pricing model and test customer willingness to pay before investing heavily in engineering buildout.';
  } else {
    investorTake = domain.investorTake;
  }

  return {
    strengths: uniqueStrengths,
    risks: uniqueRisks,
    investorTake,
  };
};
