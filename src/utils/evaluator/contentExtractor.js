// Content Extractor & Signal Detection Engine
// Parses startup submission content to detect domain, technology stack, business model, and clarity metrics

import { DOMAINS, TECH_BARRIERS, REVENUE_MODELS } from './domainTaxonomy.js';

const VAGUENESS_PATTERNS = [
  /\bdisrupting\b/i,
  /\bgame[- ]changer\b/i,
  /\ball[- ]in[- ]one\b/i,
  /\bfor everyone\b/i,
  /\bmagic\b/i,
  /\brevolutionary\b/i,
  /\bseamlessly\b/i,
  /\bnext[- ]gen\b/i,
  /\bworld[- ]class\b/i,
  /\bsimply better\b/i,
  /\beasiest way\b/i,
  /\bparadigm[- ]shifting\b/i,
];

const METRIC_PATTERNS = [
  /\$\d+(?:\.\d+)?(?:[kKmMbB]|(?:\s*(?:million|billion|thousand|trillion)))?/g, // $38B, $2.4M, $42k
  /\b\d+(?:\.\d+)?%/g, // 98.4%, 42%, 10x
  /\b\d+(?:,\d{3})*\s*(?:users|patients|customers|clients|hospitals|farmers|tractors|hectares|acres|orders|merchants|developers)\b/gi,
  /\b\d+\s*(?:months?|weeks?|days?|hours?|seconds?|minutes?|ms)\b/gi,
  /\b\d+x\b/gi,
  /\b(?:soc2|hipaa|fda|ebpf|iso\d+|pci-dss|gdpr)\b/gi,
];

export const extractContentSignals = (idea = {}) => {
  const title = (idea.title || '').trim();
  const tagline = (idea.tagline || '').trim();
  const description = (idea.description || '').trim();
  const problem = (idea.problem || '').trim();
  const solution = (idea.solution || '').trim();
  const category = (idea.category || '').trim();
  const marketSize = (idea.marketSize || '').trim();
  const businessModel = (idea.businessModel || '').trim();
  const targetAudience = (idea.targetAudience || '').trim();
  const traction = (idea.traction || '').trim();
  const stage = (idea.stage || 'Idea / Concept').trim();

  // Unified full corpus for token search
  const fullCorpus = [
    title,
    tagline,
    description,
    problem,
    solution,
    category,
    marketSize,
    businessModel,
    targetAudience,
    traction,
  ]
    .join(' ')
    .toLowerCase();

  const primaryCorpus = [title, tagline, description, problem, solution].join(' ').toLowerCase();

  // 1. Detect Domain Match Scores
  const domainScores = {};
  for (const [key, domain] of Object.entries(DOMAINS)) {
    let score = 0;
    // Category match bonus
    if (category && domain.name.toLowerCase().includes(category.toLowerCase())) {
      score += 15;
    }
    // Keyword scoring
    domain.keywords.forEach((kw) => {
      if (kw.includes(' ')) {
        if (fullCorpus.includes(kw)) score += 4;
      } else {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        const matches = (fullCorpus.match(regex) || []).length;
        if (matches > 0) score += Math.min(matches * 2, 8);
      }
    });
    domainScores[key] = score;
  }

  // Sort domains by score
  const sortedDomains = Object.entries(domainScores).sort((a, b) => b[1] - a[1]);
  const primaryDomainKey = sortedDomains[0] && sortedDomains[0][1] > 2 ? sortedDomains[0][0] : 'B2B_SAAS_GENERAL';
  const secondaryDomainKey = sortedDomains[1] && sortedDomains[1][1] > 3 ? sortedDomains[1][0] : null;

  const primaryDomain = DOMAINS[primaryDomainKey] || DOMAINS.B2B_SAAS_GENERAL;
  const secondaryDomain = secondaryDomainKey ? DOMAINS[secondaryDomainKey] : null;

  // 2. Detect Tech Barrier Level
  let detectedTechBarrier = null;
  let techBarrierScore = 0;

  for (const barrier of Object.values(TECH_BARRIERS)) {
    let matches = 0;
    barrier.keywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      if (regex.test(fullCorpus)) matches++;
    });
    if (matches > 0 && (!detectedTechBarrier || matches > techBarrierScore)) {
      detectedTechBarrier = barrier;
      techBarrierScore = matches;
    }
  }

  // 3. Detect Business & Revenue Model (from dedicated businessModel field first)
  let detectedRevenueModel = REVENUE_MODELS.UNMENTIONED;
  const bizText = (businessModel || '').toLowerCase();

  if (bizText.length >= 3) {
    if (bizText.includes('/mo') || bizText.includes('saas') || bizText.includes('subscription') || bizText.includes('annual contract') || bizText.includes('license') || bizText.includes('per-student') || bizText.includes('per-vehicle')) {
      detectedRevenueModel = REVENUE_MODELS.ENTERPRISE_SUBSCRIPTION;
    } else if (bizText.includes('usage') || bizText.includes('per-api') || bizText.includes('per-query') || bizText.includes('compute fee') || bizText.includes('metering')) {
      detectedRevenueModel = REVENUE_MODELS.USAGE_BASED;
    } else if (bizText.includes('commission') || bizText.includes('take-rate') || bizText.includes('take rate') || bizText.includes('transaction fee') || bizText.includes('factoring discount')) {
      detectedRevenueModel = REVENUE_MODELS.MARKETPLACE_TAKE_RATE;
    } else if (bizText.includes('hardware') || bizText.includes('device cost') || bizText.includes('capex') || bizText.includes('lease')) {
      detectedRevenueModel = REVENUE_MODELS.HARDWARE_SALES;
    } else if (bizText.includes('advertising') || bizText.includes('ads') || bizText.includes('sponsored')) {
      detectedRevenueModel = REVENUE_MODELS.ADVERTISING;
    }
  }

  // 4. Detect Customer Persona / Audience (strictly from targetAudience if provided)
  const audText = (targetAudience || '').toLowerCase();
  const customerTypes = [];

  if (audText.length >= 3) {
    if (audText.includes('enterprise') || audText.includes('hospital') || audText.includes('bank') || audText.includes('cro') || audText.includes('fortune') || audText.includes('soc')) {
      customerTypes.push('Enterprise');
    }
    if (audText.includes('developer') || audText.includes('engineer') || audText.includes('devops')) {
      customerTypes.push('Developers');
    }
    if (audText.includes('small business') || audText.includes('smb') || audText.includes('clinic') || audText.includes('restaurant') || audText.includes('kitchen') || audText.includes('store')) {
      customerTypes.push('SMBs');
    }
    if (audText.includes('farmer') || audText.includes('grower') || audText.includes('agribusiness')) {
      customerTypes.push('Farmers');
    }
    if (audText.includes('student') || audText.includes('teacher') || audText.includes('school') || audText.includes('district')) {
      customerTypes.push('Education');
    }
    if (audText.includes('consumer') || audText.includes('patient') || audText.includes('driver') || audText.includes('shopper') || audText.includes('foodie') || audText.includes('listener')) {
      customerTypes.push('B2C Consumers');
    }
    if (audText.includes('municipality') || audText.includes('city') || audText.includes('government') || audText.includes('hauler') || audText.includes('mrf') || audText.includes('transit')) {
      customerTypes.push('Municipalities');
    }
    if (audText.includes('creator') || audText.includes('podcaster') || audText.includes('influencer')) {
      customerTypes.push('Creators');
    }
  }

  // 5. Detect Concrete Metrics and Numbers
  let metricsCount = 0;
  METRIC_PATTERNS.forEach((pat) => {
    const found = fullCorpus.match(pat) || [];
    metricsCount += found.length;
  });

  const hasProblemMetrics = METRIC_PATTERNS.some((pat) => pat.test(problem));

  // 6. Detect Buzzword & Vagueness Count
  let vaguenessCount = 0;
  VAGUENESS_PATTERNS.forEach((pat) => {
    if (pat.test(primaryCorpus)) vaguenessCount++;
  });

  // 7. Missing Information Audit
  const missingElements = [];
  if (!businessModel || businessModel.trim().length < 5 || detectedRevenueModel.id === 'unmentioned') {
    missingElements.push('revenue_model');
  }
  if (!targetAudience || targetAudience.trim().length < 5 || customerTypes.length === 0) {
    missingElements.push('target_audience');
  }
  if (!problem || problem.trim().length < 15) {
    missingElements.push('problem_definition');
  }
  if (!solution || solution.trim().length < 15) {
    missingElements.push('solution_definition');
  }
  if (!marketSize || marketSize.trim().length < 5) {
    missingElements.push('market_size');
  }

  // 8. Explicit Traction Proof Check
  const hasExplicitTraction =
    Boolean(traction && traction.trim().length > 10 && !traction.toLowerCase().includes('newly submitted')) ||
    /(\$\d+[kKmM]\s*MRR|\d+\s*(?:pilot|center|hospital|client|customer|user)s?\s*(?:onboarded|paying|live))/i.test(fullCorpus);

  return {
    title,
    tagline,
    description,
    problem,
    solution,
    category,
    marketSize,
    businessModel,
    targetAudience,
    traction,
    stage,
    primaryDomain,
    secondaryDomain,
    detectedTechBarrier,
    detectedRevenueModel,
    customerTypes,
    metricsCount,
    vaguenessCount,
    missingElements,
    hasExplicitTraction,
    hasProblemMetrics,
    fullLength: primaryCorpus.length,
  };
};
