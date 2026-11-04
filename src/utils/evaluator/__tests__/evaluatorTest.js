// Comprehensive Evaluation Test Suite for StartupIQ Content-Aware Evaluator
// Tests 10+ distinct industries, vague submissions, determinism, and score separation

const { evaluatePitch } = require('../../../src/utils/aiPitchEvaluator');

const testCases = [
  {
    name: '1. Food Delivery & Logistics',
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
    },
  },
  {
    name: '2. Healthcare AI',
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
    },
  },
  {
    name: '3. Smart Agriculture',
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
    },
  },
  {
    name: '4. EdTech',
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
    },
  },
  {
    name: '5. FinTech',
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
    },
  },
  {
    name: '6. E-Commerce & Retail',
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
    },
  },
  {
    name: '7. Cybersecurity',
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
    },
  },
  {
    name: '8. Electric Vehicle (EV) Charging',
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
    },
  },
  {
    name: '9. Waste Management',
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
    },
  },
  {
    name: '10. Social Networking',
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
    },
  },
  {
    name: '11. Vague & Buzzword-Heavy Pitch',
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
    },
  },
  {
    name: '12. Empty Incomplete Submission',
    idea: {},
  },
];

console.log('================================================================');
console.log('🚀 RUNNING STARTUPIQ CONTENT-AWARE EVALUATOR VERIFICATION SUITE');
console.log('================================================================\n');

const results = [];

testCases.forEach((tc) => {
  const eval1 = evaluatePitch(tc.idea);
  const eval2 = evaluatePitch(tc.idea); // To test determinism!

  const isDeterministic =
    eval1.overallScore === eval2.overallScore &&
    eval1.breakdown.marketSize === eval2.breakdown.marketSize &&
    eval1.breakdown.defensibility === eval2.breakdown.defensibility &&
    eval1.breakdown.clarity === eval2.breakdown.clarity &&
    eval1.investorTake === eval2.investorTake &&
    JSON.stringify(eval1.strengths) === JSON.stringify(eval2.strengths) &&
    JSON.stringify(eval1.risks) === JSON.stringify(eval2.risks);

  results.push({
    name: tc.name,
    overallScore: eval1.overallScore,
    grade: eval1.grade,
    verdict: eval1.verdict,
    marketSize: eval1.breakdown.marketSize,
    defensibility: eval1.breakdown.defensibility,
    clarity: eval1.breakdown.clarity,
    domain: eval1.detectedDomain.name,
    strengths: eval1.strengths,
    risks: eval1.risks,
    investorTake: eval1.investorTake,
    isDeterministic,
  });
});

// Print Results in structured table & review
results.forEach((r, idx) => {
  console.log(`\n------------------------------------------------------------`);
  console.log(`📌 TEST ${idx + 1}: ${r.name}`);
  console.log(`Detected Domain: ${r.domain}`);
  console.log(`Scores: Overall=${r.overallScore} (${r.grade}) | Market=${r.marketSize} | Defensibility=${r.defensibility} | Clarity=${r.clarity}`);
  console.log(`Deterministic Match: ${r.isDeterministic ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Strengths (3):`);
  r.strengths.forEach((s, i) => console.log(`   ${i + 1}. ${s}`));
  console.log(`Risks (3):`);
  r.risks.forEach((rk, i) => console.log(`   ${i + 1}. ${rk}`));
  console.log(`Investor Takeaway:`);
  console.log(`   "${r.investorTake}"`);
});

// Check Verification Criteria
console.log('\n============================================================');
console.log('📊 VERIFICATION SUMMARY');
console.log('============================================================');

const scores = results.map((r) => r.overallScore);
const distinctScores = new Set(scores);
console.log(`Total Ideas Tested: ${testCases.length}`);
console.log(`Distinct Scores Produced: ${distinctScores.size}/${testCases.length}`);
console.log(`All Deterministic (eval1 === eval2): ${results.every((r) => r.isDeterministic) ? '✅ YES' : '❌ NO'}`);

// Check that Vague and Empty pitches get significantly lower scores
const vagueResult = results.find((r) => r.name.includes('Vague'));
const emptyResult = results.find((r) => r.name.includes('Empty'));
const deepTechResult = results.find((r) => r.name.includes('Cybersecurity'));
const healthcareResult = results.find((r) => r.name.includes('Healthcare'));

console.log(`\nScore Contrast Checks:`);
console.log(`- Deep Tech (KernelGuard): ${deepTechResult.overallScore} (${deepTechResult.grade})`);
console.log(`- Healthcare (NeuroFlow): ${healthcareResult.overallScore} (${healthcareResult.grade})`);
console.log(`- Vague Buzzword Pitch: ${vagueResult.overallScore} (${vagueResult.grade})`);
console.log(`- Empty Submission: ${emptyResult.overallScore} (${emptyResult.grade})`);

const passesScoreSeparation =
  deepTechResult.overallScore > 80 &&
  healthcareResult.overallScore > 80 &&
  vagueResult.overallScore < 50 &&
  emptyResult.overallScore < 35;

console.log(`Wide Score Separation Validation: ${passesScoreSeparation ? '✅ PASS' : '❌ FAIL'}`);

// Check that food delivery risks mention courier / margins / food safety
const foodResult = results.find((r) => r.name.includes('Food Delivery'));
const foodRisksMatch = foodResult.risks.some((rk) => /margin|courier|spoilage|delivery/i.test(rk));
console.log(`Food Delivery Domain Risk Relevance: ${foodRisksMatch ? '✅ PASS' : '❌ FAIL'}`);

// Check that healthcare risks mention regulatory / HIPAA / hospital sales
const healthcareRisksMatch = healthcareResult.risks.some((rk) => /hipaa|procurement|regulatory|clinical|sales cycle/i.test(rk));
console.log(`Healthcare Domain Risk Relevance: ${healthcareRisksMatch ? '✅ PASS' : '❌ FAIL'}`);

// Check that IoT / Agriculture risks mention sensor durability / weather / farmer adoption
const agResult = results.find((r) => r.name.includes('Smart Agriculture'));
const agRisksMatch = agResult.risks.some((rk) => /weather|sensor|durability|farmer|connectivity/i.test(rk));
console.log(`Smart Agriculture Risk Relevance: ${agRisksMatch ? '✅ PASS' : '❌ FAIL'}`);

// Check that Vague pitch explicitly notes missing elements
const vagueMissingIdentified = vagueResult.risks.some((rk) => /unstated|missing|vague|pricing|model/i.test(rk));
console.log(`Vague Pitch Identifies Missing Elements: ${vagueMissingIdentified ? '✅ PASS' : '❌ FAIL'}`);

