// Comprehensive 16-Proposal Test Suite for StartupIQ Calibrated Evaluator
// Tests Strong, Average, Weak, Vague, and Incomplete proposals
// Tests multiple proposals within the SAME industry to verify differentiation and calibration

import { evaluatePitch } from '../../aiPitchEvaluator.js';

const testProposals = [
  // Pair 1: Healthcare (Deep Tech Enterprise with Verified Traction vs Consumer Bot with No Model)
  {
    id: 'health-1',
    name: '1. NeuroFlow AI (Healthcare - Strong Deep Tech + Verified Traction)',
    idea: {
      title: 'NeuroFlow AI',
      tagline: 'Autonomous AI agent orchestration for multi-site clinical trials',
      description: 'Streamlines clinical trial protocol drafting, FDA compliance documentation, and automated patient matching across multi-center medical institutions, cutting launch times from 9 months to 3 weeks.',
      problem: 'Biotech startups and hospital networks spend over $2.4M and 8-12 months manually reconciling patient EHR criteria and drafting regulatory audit reports before initiating Phase I/II trials.',
      solution: 'Multi-agent LLM consensus pipeline that connects directly to HIPAA-compliant hospital databases to identify eligible cohorts with 98.4% protocol matching precision and auto-generates audit-ready FDA dossiers.',
      category: 'AI & ML',
      stage: 'Seed',
      marketSize: '$38B Global Clinical Trials Market (8.2% CAGR)',
      businessModel: 'B2B Enterprise SaaS ($4,500/mo base + per-trial compute fee)',
      targetAudience: 'Contract Research Organizations (CROs) & Biotech Teams',
      traction: '3 Academic Medical Centers onboarded, $42k MRR, 1,200 patients matched',
    },
  },
  {
    id: 'health-2',
    name: '2. MediChat (Healthcare - Weak Unvalidated Consumer Chatbot)',
    idea: {
      title: 'MediChat',
      tagline: 'An AI chatbot app that answers general patient symptom questions',
      description: 'A mobile app where consumers type their symptoms to get immediate AI-generated suggestions before going to a clinic.',
      problem: 'People wait too long in doctor waiting rooms and feel anxious about common symptoms.',
      solution: 'ChatGPT-powered conversational prompt wrapper that gives health tips and clinic directories.',
      category: 'HealthTech',
      stage: 'Idea / Concept',
      marketSize: 'Huge global health market',
      businessModel: '', // Completely unstated!
      targetAudience: 'General public',
      traction: 'Newly submitted',
    },
  },

  // Pair 2: Cybersecurity (In-Kernel eBPF Enterprise vs Basic Password Wrapper)
  {
    id: 'sec-1',
    name: '3. KernelGuard (Cybersecurity - Strong Deep Tech Systems Engine)',
    idea: {
      title: 'KernelGuard',
      tagline: 'Autonomous eBPF-powered runtime exploit detection and zero-day containment',
      description: 'Inspects Linux kernel syscalls at bare-metal execution speed using eBPF to detect zero-day privilege escalations and instantly quarantine compromised containers in under 5 milliseconds.',
      problem: 'Enterprise cloud security teams endure 10,000+ noisy alerts daily while evasive fileless malware and kernel exploits bypass traditional user-space endpoint detection agents.',
      solution: 'In-kernel eBPF sensor requiring zero code modification that intercepts anomalous system calls and automatically enforces immutable network isolation before lateral movement occurs.',
      category: 'Cybersecurity',
      stage: 'Series A',
      marketSize: '$68B Cloud Workload Protection Market (19.4% CAGR)',
      businessModel: 'Annual license at $45/host node/month with SOC2 Type II compliance',
      targetAudience: 'Enterprise Security Operations Centers (SOCs), DevSecOps Teams',
      traction: '18 Enterprise SOC deployments, $180k ARR, SOC2 certified',
    },
  },
  {
    id: 'sec-2',
    name: '4. PassVault (Cybersecurity - Average Consumer Password Storage)',
    idea: {
      title: 'PassVault',
      tagline: 'Clean password manager browser extension with biometric auto-fill',
      description: 'A client-side encrypted browser extension that saves logins and flags reused passwords across websites.',
      problem: 'Internet users use the same password on 5+ websites and frequently get credential-stuffed.',
      solution: 'AES-256 encrypted local vault with single-click master password unlock and breach alerts.',
      category: 'Cybersecurity',
      stage: 'Pre-Seed',
      marketSize: '$2.5B Consumer Password Manager Market',
      businessModel: 'Freemium ($2.99/mo for cloud sync across 3 devices)',
      targetAudience: 'Everyday Internet Browsers and Remote Freelancers',
      traction: '500 beta signups on ProductHunt',
    },
  },

  // Pair 3: Food Delivery & Logistics (Hyperlocal Kitchen Optimization vs Student Snack Courier)
  {
    id: 'food-1',
    name: '5. DineRoute (Food Delivery - Average Ops-Constrained B2B Take-Rate)',
    idea: {
      title: 'DineRoute',
      tagline: 'Hyperlocal batch dispatching for independent cloud kitchens',
      description: 'Optimizes order batching and courier routing for neighborhood cloud kitchens, reducing food delivery transit times to under 18 minutes while cutting per-delivery courier costs by 32%.',
      problem: 'Independent restaurants lose 25-30% of order value to third-party delivery platforms while suffering 40-minute wait times that degrade food quality and customer retention.',
      solution: 'Algorithmic batching engine that clusters kitchen pickups and dynamic courier dispatch within a strict 2-mile radius, preserving food heat and ensuring positive contribution margins.',
      category: 'SaaS',
      stage: 'Seed',
      marketSize: '$120B Global Food Delivery Market (11% CAGR)',
      businessModel: '12% flat transaction commission per delivered order ($1.80 avg)',
      targetAudience: 'Independent Cloud Kitchens & Urban Foodies',
      traction: 'Piloting in 1 neighborhood across 6 kitchens',
    },
  },
  {
    id: 'food-2',
    name: '6. CampusBite (Food Delivery - Weak Informal Student Snack Courier)',
    idea: {
      title: 'CampusBite',
      tagline: 'Late night dorm snack delivery by college students for college students',
      description: 'A peer-to-peer campus delivery chat group where students living in dorms order instant ramen and soda delivered to their floor.',
      problem: 'College students get hungry at 2 AM when campus dining halls are closed.',
      solution: 'A mobile app where student runners deliver snacks stocked in dorm basements.',
      category: 'SaaS',
      stage: 'Idea / Concept',
      marketSize: 'College campuses across the country',
      businessModel: '$1 delivery fee per order',
      targetAudience: 'College dorm students',
      traction: '',
    },
  },

  // Pair 4: FinTech (Cross-Border Invoice Protocol vs Social Tipping Bot)
  {
    id: 'fin-1',
    name: '7. FactoFlow (FinTech - Strong Enterprise Capital Protocol)',
    idea: {
      title: 'FactoFlow',
      tagline: 'Instant cross-border invoice factoring and automated AML underwriting protocol',
      description: 'Finances unpaid international commercial invoices in 4 hours using real-time bill-of-lading verification and automated AML/KYC risk underwriting, charging transparent 1.5% discount fees.',
      problem: 'Cross-border export suppliers wait 60 to 90 days to receive payments for delivered goods, locking up over $400B in working capital and facing predatory factoring fees of 6-8%.',
      solution: 'Automated credit underwriting engine connecting international customs declarations, container IoT trackers, and bank transaction histories to wire instant working capital advances.',
      category: 'FinTech',
      stage: 'Seed',
      marketSize: '$3.2T Global Receivables Financing Market',
      businessModel: '1.5% - 2.2% factoring discount fee per funded 60-day invoice',
      targetAudience: 'Mid-Market Exporters, Freight Forwarders, Commercial Banks',
      traction: '$1.4M in funded invoices settled across 12 exporters',
    },
  },
  {
    id: 'fin-2',
    name: '8. TipjarBot (FinTech - Weak Social Media Crypto Micro-Tipper)',
    idea: {
      title: 'TipjarBot',
      tagline: 'Tip your favorite Twitter and Reddit creators with crypto memes',
      description: 'A browser plugin and bot that allows social media users to send 10-cent crypto micro-tips to creators under tweets.',
      problem: 'Creators do not get enough direct tips from viral posts.',
      solution: 'Custodial crypto wallet bot that sends tokens on social media feeds.',
      category: 'FinTech',
      stage: 'Idea / Concept',
      marketSize: 'Millions of social media creators',
      businessModel: '', // Missing
      targetAudience: 'Social media users',
      traction: '',
    },
  },

  // Standalone Verticals:
  {
    id: 'ag-1',
    name: '9. AgriSense IoT (Smart Agriculture - Hardware + Soil Telemetry)',
    idea: {
      title: 'AgriSense IoT',
      tagline: 'Autonomous soil sensor mesh and drone spectral imaging for precision irrigation',
      description: 'Solar-powered wireless soil sensors combined with multispectral drone imaging to continuously profile field nitrogen levels and moisture depth, saving 35% on irrigation water and reducing fertilizer runoff.',
      problem: 'Commercial grain and corn farmers over-apply chemical fertilizers by 40% and waste billions in irrigation pumping energy to prevent localized drought patches.',
      solution: 'Ruggedized LoRa mesh sensor nodes that transmit sub-surface soil telemetry every 15 minutes to automate pivot irrigation valves and generate prescription fertilizer maps.',
      category: 'ClimateTech',
      stage: 'Pre-Seed',
      marketSize: '$24B Global Precision Agriculture Market (13.1% CAGR)',
      businessModel: 'Hardware device lease ($49/sensor) + $8/acre annual SaaS subscription',
      targetAudience: 'Commercial Grain & Corn Farmers, Agribusiness Co-ops',
      traction: '2 farm cooperative field trials running across 1,800 acres',
    },
  },
  {
    id: 'ed-1',
    name: '10. CalculusAI (EdTech - Adaptive Step-by-Step LMS Tutor)',
    idea: {
      title: 'CalculusAI',
      tagline: 'Adaptive conversational math tutor with real-time step-by-step grading for high schools',
      description: 'Provides personalized step-by-step calculus and algebra tutoring with voice dialogue, integrating directly into Google Classroom and Canvas LMS to automate teacher grading.',
      problem: 'High school math teachers spend 15+ hours weekly grading homework assignments while 45% of students fall behind due to a lack of immediate feedback on algebra homework steps.',
      solution: 'Socratic LLM tutor that identifies conceptual math errors at each formula step without revealing answers, providing real-time pedagogical scaffolding and syncs grade reports to school LMS.',
      category: 'EdTech',
      stage: 'Seed',
      marketSize: '$89B Global K-12 EdTech Market (15.2% CAGR)',
      businessModel: 'School district annual licensing ($12/student/year) + $9.99/mo parent premium',
      targetAudience: 'K-12 School Districts, High School Teachers & Students',
      traction: '4 high school pilot programs active with 850 students',
    },
  },
  {
    id: 'ecom-1',
    name: '11. ReviveRetail (E-Commerce - Circular Resale & Returnless Refunds)',
    idea: {
      title: 'ReviveRetail',
      tagline: 'Automated returnless refunds and circular resale marketplace for Shopify merchants',
      description: 'Predicts return fraud and routes damaged or unwanted apparel to localized circular resale channels, saving brands 60% on reverse logistics and disposal costs.',
      problem: 'E-commerce fashion merchants suffer 28% return rates, spending $35 per return in shipping and restocking overhead while 30% of returned clothing ends up in landfills.',
      solution: 'Checkout plugin that calculates customer trust scores and item resale value to offer instant store credit exchanges or localized peer-to-peer buyer fulfillment before warehouse returns.',
      category: 'E-Commerce',
      stage: 'Pre-Seed',
      marketSize: '$812B Global E-commerce Returns & Reverse Logistics Market',
      businessModel: 'B2B SaaS ($299/mo) + $1.25 per settled reverse logistics transaction',
      targetAudience: 'Direct-to-Consumer (D2C) Apparel & Fashion Brands on Shopify',
      traction: '12 Shopify merchants testing in closed beta',
    },
  },
  {
    id: 'ev-1',
    name: '12. VoltGrid Fleet (EV CleanTech - Megawatt Fleet Charging Orchestration)',
    idea: {
      title: 'VoltGrid Fleet',
      tagline: 'Dynamic megawatt charging orchestration and grid peak-load balancing for delivery fleets',
      description: 'Coordinates overnight charging schedules for electric truck and van fleets to avoid utility peak demand charges while guaranteeing 100% departure readiness every morning.',
      problem: 'Commercial electric delivery fleets face catastrophic utility demand surcharges of up to $40/kW when multiple heavy vans fast-charge simultaneously during afternoon peak grid hours.',
      solution: 'Cloud optimization software that interfaces directly with depot charger hardware and utility dynamic pricing APIs to stagger charging amperage according to route departure schedules.',
      category: 'ClimateTech',
      stage: 'Seed',
      marketSize: '$42B Commercial Fleet Electrification Market (28% CAGR)',
      businessModel: 'B2B SaaS ($25/vehicle/month) + 15% share of utility demand charge savings',
      targetAudience: 'Commercial Logistics Fleets, Municipal Bus Transit Depots',
      traction: '1 regional transit depot pilot managing 45 electric buses',
    },
  },
  {
    id: 'waste-1',
    name: '13. SortCycle Robotics (Waste Management - Optical Delta Sorting)',
    idea: {
      title: 'SortCycle Robotics',
      tagline: 'AI-guided delta robots for automated optical sorting in municipal recycling facilities',
      description: 'High-speed computer vision delta robots installed along municipal recycling conveyor belts to identify and sort PET, HDPE, and cardboard at 85 picks per minute with 97% purity.',
      problem: 'Municipal material recovery facilities (MRFs) suffer 30% contamination rates and severe human sorter labor shortages, causing entire bales of recyclables to be rejected and sent to landfills.',
      solution: 'Hyperspectral camera gantry paired with custom robotic vacuum arms that classify resin grades and eject contaminants at 3x human sorting speed.',
      category: 'ClimateTech',
      stage: 'Pre-Seed',
      marketSize: '$58B Municipal Solid Waste Sorting & Recycling Industry',
      businessModel: 'Robotics-as-a-Service (RaaS) subscription ($3,200/robot/month) with zero capex',
      targetAudience: 'Municipal Material Recovery Facilities (MRFs), Waste Management Haulers',
      traction: 'Prototype running on conveyor test rig with 94% resin pick accuracy',
    },
  },
  {
    id: 'soc-1',
    name: '14. PodClub (Social Networking - Audio Micro-Communities)',
    idea: {
      title: 'PodClub',
      tagline: 'Private voice micro-communities and subscription audio discussion rooms for podcast listeners',
      description: 'Enables independent podcast creators to host gated audio debriefs, voice Q&As, and community AMAs directly with their top 5% paying supporters.',
      problem: 'Podcasters have millions of passive listeners on Spotify and Apple Podcasts but zero direct relationships, contact data, or recurring direct monetization from their core audience.',
      solution: 'Creator-hosted social audio app where episodes automatically unlock private voice discussion threads, member-only AMAs, and recurring fan patronage tiers.',
      category: 'Social',
      stage: 'Idea / Concept',
      marketSize: '$4B Podcast Creator Monetization Niche',
      businessModel: '10% platform take-rate on monthly fan subscription memberships ($5/mo)',
      targetAudience: 'Independent Podcast Creators and Passionate Listeners',
      traction: 'Waitlist of 140 independent creators',
    },
  },

  // Edge Cases:
  {
    id: 'vague-1',
    name: '15. OmniAI (Vague - Pure Aspirational Buzzwords Without Mechanics)',
    idea: {
      title: 'OmniAI Platform',
      tagline: 'A revolutionary game-changing all-in-one AI platform for everyone',
      description: 'Disrupting everything seamlessly with world-class next-gen magic AI that makes life simply better for all users across the world.',
      problem: 'People struggle every day and need an easier way to do things.',
      solution: 'Our paradigm-shifting platform uses AI to fix all daily issues seamlessly.',
      category: 'AI & ML',
      stage: 'Idea / Concept',
      marketSize: '',
      businessModel: '',
      targetAudience: '',
      traction: '',
    },
  },
  {
    id: 'empty-1',
    name: '16. Blank Proposal (Incomplete - Zero Fields Provided)',
    idea: {},
  },
];

console.log('================================================================');
console.log('🚀 RUNNING CALIBRATED 16-PROPOSAL EVALUATION & CONFIDENCE SUITE');
console.log('================================================================\n');

const results = [];

testProposals.forEach((tp) => {
  const evalResult = evaluatePitch(tp.idea);

  results.push({
    id: tp.id,
    name: tp.name,
    overallScore: evalResult.overallScore,
    grade: evalResult.grade,
    verdict: evalResult.verdict,
    marketSize: evalResult.breakdown.marketSize,
    defensibility: evalResult.breakdown.defensibility,
    clarity: evalResult.breakdown.clarity,
    confidenceScore: evalResult.confidence?.completenessScore || 0,
    confidenceLevel: evalResult.confidence?.level || 'Low',
    missingEvidence: evalResult.confidence?.missingEvidence || [],
    strengths: evalResult.strengths,
    risks: evalResult.risks,
    investorTake: evalResult.investorTake,
  });
});

// Print Structured Inspection
results.forEach((r, idx) => {
  console.log(`------------------------------------------------------------`);
  console.log(`📌 PROPOSAL ${idx + 1}: ${r.name}`);
  console.log(`SCORES: Overall=${r.overallScore} (${r.grade}) | Market=${r.marketSize} | Defensibility=${r.defensibility} | Clarity=${r.clarity}`);
  console.log(`EVIDENCE CONFIDENCE: ${r.confidenceLevel.toUpperCase()} (${r.confidenceScore}%)`);
  if (r.missingEvidence.length > 0) {
    console.log(`Missing Evidence Identified:`);
    r.missingEvidence.forEach((me) => console.log(`   ⚠️  ${me}`));
  }
  console.log(`Key Strengths:`);
  r.strengths.forEach((s, i) => console.log(`   ${i + 1}. ${s}`));
  console.log(`Risk Factors:`);
  r.risks.forEach((rk, i) => console.log(`   ${i + 1}. ${rk}`));
  console.log(`Investor Takeaway:`);
  console.log(`   "${r.investorTake}"`);
});

// Verification Metrics
console.log('\n============================================================');
console.log('📊 CALIBRATION & DISPERSION AUDIT REPORT');
console.log('============================================================');

const marketScores = results.map((r) => r.marketSize);
const clarityScores = results.map((r) => r.clarity);
const overallScores = results.map((r) => r.overallScore);

const marketMax = Math.max(...marketScores);
const marketMin = Math.min(...marketScores);
const clarityMax = Math.max(...clarityScores);
const clarityMin = Math.min(...clarityScores);
const overallMax = Math.max(...overallScores);
const overallMin = Math.min(...overallScores);

console.log(`Total Proposals Evaluated: ${testProposals.length}`);
console.log(`Market Size Range: ${marketMin} - ${marketMax} (Spread: ${marketMax - marketMin} pts)`);
console.log(`Pitch Clarity Range: ${clarityMin} - ${clarityMax} (Spread: ${clarityMax - clarityMin} pts)`);
console.log(`Overall Score Range: ${overallMin} - ${overallMax} (Spread: ${overallMax - overallMin} pts)`);

// Check Intra-Industry Separation (Healthcare strong vs weak)
const hStrong = results.find((r) => r.id === 'health-1');
const hWeak = results.find((r) => r.id === 'health-2');
console.log(`\nIntra-Industry Separation 1 (Healthcare):`);
console.log(`- NeuroFlow AI (Strong): Overall=${hStrong.overallScore}, Market=${hStrong.marketSize}, Confidence=${hStrong.confidenceScore}%`);
console.log(`- MediChat (Weak):       Overall=${hWeak.overallScore}, Market=${hWeak.marketSize}, Confidence=${hWeak.confidenceScore}%`);
const hDiff = hStrong.overallScore - hWeak.overallScore;
console.log(`  -> Intra-Industry Score Delta: ${hDiff} pts (${hDiff >= 25 ? '✅ EXCELLENT DISPERSION' : '❌ INSUFFICIENT'})`);

// Check Intra-Industry Separation (Cybersecurity strong vs average)
const sStrong = results.find((r) => r.id === 'sec-1');
const sWeak = results.find((r) => r.id === 'sec-2');
console.log(`\nIntra-Industry Separation 2 (Cybersecurity):`);
console.log(`- KernelGuard (eBPF):   Overall=${sStrong.overallScore}, Defensibility=${sStrong.defensibility}, Confidence=${sStrong.confidenceScore}%`);
console.log(`- PassVault (Consumer): Overall=${sWeak.overallScore}, Defensibility=${sWeak.defensibility}, Confidence=${sWeak.confidenceScore}%`);
const sDiff = sStrong.defensibility - sWeak.defensibility;
console.log(`  -> Defensibility Delta: ${sDiff} pts (${sDiff >= 30 ? '✅ EXCELLENT DEFENSIVE DIFFERENTIATION' : '❌ INSUFFICIENT'})`);

// Check Intra-Industry Separation (Food delivery B2B batching vs student group)
const fStrong = results.find((r) => r.id === 'food-1');
const fWeak = results.find((r) => r.id === 'food-2');
console.log(`\nIntra-Industry Separation 3 (Food Delivery):`);
console.log(`- DineRoute (B2B Batch): Overall=${fStrong.overallScore}, Market=${fStrong.marketSize}, Confidence=${fStrong.confidenceScore}%`);
console.log(`- CampusBite (Student):  Overall=${fWeak.overallScore}, Market=${fWeak.marketSize}, Confidence=${fWeak.confidenceScore}%`);
const fDiff = fStrong.overallScore - fWeak.overallScore;
console.log(`  -> Food Delivery Score Delta: ${fDiff} pts (${fDiff >= 20 ? '✅ EXCELLENT DISPERSION' : '❌ INSUFFICIENT'})`);

// Verify Saturation is Cured (No clustering at 98-99)
const saturatedCount = marketScores.filter((s) => s >= 98).length;
console.log(`\nScore Saturation Check:`);
console.log(`Proposals scoring >= 98 in Market: ${saturatedCount}/${testProposals.length} (${saturatedCount <= 1 ? '✅ SATURATION CURED' : '❌ STILL SATURATED'})`);

// Check Evidence Completeness Separation
const highConf = results.filter((r) => r.confidenceLevel === 'High').length;
const medConf = results.filter((r) => r.confidenceLevel === 'Medium').length;
const lowConf = results.filter((r) => r.confidenceLevel === 'Low').length;
console.log(`\nEvidence Confidence Distribution:`);
console.log(`- High Confidence (>= 80%): ${highConf} proposals`);
console.log(`- Medium Confidence (55-79%): ${medConf} proposals`);
console.log(`- Low Confidence (< 55%): ${lowConf} proposals`);
console.log(`Evidence Confidence Layer: ${highConf > 0 && medConf > 0 && lowConf > 0 ? '✅ FULLY BALANCED' : '❌ IMBALANCED'}`);
