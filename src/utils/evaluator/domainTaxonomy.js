// Domain Taxonomy & Industry Dictionaries for Content-Aware Startup Evaluation
// Contains domain definitions, industry keywords, risk profiles, and investor heuristics

export const DOMAINS = {
  HEALTHCARE_CLINICAL_AI: {
    id: 'healthcare_clinical_ai',
    name: 'Clinical AI & Diagnostic Systems',
    keywords: [
      'clinical', 'diagnosis', 'radiology', 'pathology', 'ct scan', 'mri',
      'imaging', 'oncology', 'cancer', 'nodule', 'biotech', 'genomic', 'therapy',
      'fda', 'clinical trial', 'cro', 'biomedical', 'ehr protocol', 'protocol matching',
      'deep learning diagnosis', 'medical imaging',
    ],
    strengths: [
      'Addresses severe clinical diagnostic backlogs and physician specialist shortages',
      'High clinical economic value through protocol matching and early anomaly detection',
      'Deep technical and regulatory moat when integrated into hospital PACS/EHR systems',
    ],
    risks: [
      'Lengthy FDA 510(k) or De Novo regulatory clearance pathways and clinical trials',
      'Liability exposure regarding false-negative diagnostic anomalies and clinical accuracy',
      'Protracted institutional hospital procurement committee cycles (12–18 months)',
    ],
    investorTake:
      'Clinical diagnostic AI holds immense economic potential but demands rigorous clinical validation. Founders must secure at least two IRB-approved hospital imaging pilots to prove sensitivity and specificity before attempting commercial rollout.',
  },

  HEALTHCARE_OPERATIONS: {
    id: 'healthcare_operations',
    name: 'Healthcare Practice Operations & Scheduling',
    keywords: [
      'appointment', 'booking', 'scheduling', 'queue', 'waiting room', 'clinic',
      'outpatient', 'no-show', 'doctor appointment', 'calendar sync', 'patient reminder',
      'practice management', 'dental clinic', 'medical practice', 'reception',
    ],
    strengths: [
      'Directly reduces clinic outpatient waiting room congestion and patient no-show rates',
      'Immediate return on investment for private practices by maximizing billable provider hours',
      'Streamlined administrative workflow without requiring intensive clinical FDA clearance',
    ],
    risks: [
      'Low technical barrier: scheduling features can be replicated by EHR vendors or generic calendar tools',
      'Clinic staff inertia and resistance to adopting secondary software outside their primary EHR',
      'High customer churn if the software fails to integrate seamlessly with existing practice management workflows',
    ],
    investorTake:
      'Practice management and appointment scheduling succeed on workflow stickiness rather than deep tech. Focus on proving a measurable reduction in clinic no-show rates across your first 20 outpatient clinics to establish a defensible beachhead.',
  },

  HEALTHCARE_PHARMACY_LOGISTICS: {
    id: 'healthcare_pharmacy_logistics',
    name: 'Pharmacy Logistics & Medicine Delivery',
    keywords: [
      'medicine delivery', 'prescription delivery', 'pharmacy', 'medication',
      'rx delivery', 'pharmaceutical', 'chemist', 'drug delivery', 'pills',
      'tamper-evident', 'cold chain medication', 'refill', 'antibiotics',
    ],
    strengths: [
      'Essential, non-discretionary recurring consumer demand for chronic medication refills',
      'High patient convenience especially for mobility-impaired, elderly, and acutely ill populations',
      'Commercial partnership opportunities with local independent retail pharmacies',
    ],
    risks: [
      'Strict state pharmacy board regulations and compliance regarding prescription courier handling',
      'Cold-chain temperature degradation risks for biologicals and temperature-sensitive medications',
      'Unit economic pressure from courier delivery costs against modest retail pharmacy gross margins',
    ],
    investorTake:
      'Prescription medicine delivery requires absolute compliance with pharmaceutical transport regulations. Partner directly with trusted retail pharmacy networks and prove cold-chain reliability before expanding geographic courier coverage.',
  },

  HEALTHCARE_AI: {
    id: 'healthcare_ai',
    name: 'Healthcare Technology',
    keywords: [
      'health', 'hospital', 'patient', 'doctor', 'physician', 'ehr', 'emr',
      'hipaa', 'medical', 'pharma', 'telemedicine', 'nurse', 'triage', 'healthtech',
    ],
    strengths: [
      'Addresses severe clinical administrative burden and healthcare workflow friction',
      'Significant potential return on investment via clinical throughput acceleration',
      'Deep domain barrier with strong workflow switching costs in hospital EHRs',
    ],
    risks: [
      'Protracted institutional sales cycles (12–18 months) with complex hospital procurement committees',
      'Strict regulatory liabilities under HIPAA data governance and patient privacy standards',
      'High customer acquisition friction in conservative healthcare environments',
    ],
    investorTake:
      'Healthcare technology holds massive economic value, but enterprise sales cycles are notoriously sluggish. Founders must secure verified clinical pilot design partners early to prove both operational efficacy and billing compliance.',
  },

  FOOD_LOGISTICS: {
    id: 'food_logistics',
    name: 'Food Delivery & Hyperlocal Logistics',
    keywords: [
      'food delivery', 'restaurant', 'meal', 'kitchen', 'cloud kitchen',
      'grocery', 'courier', 'rider', 'fleet', 'hyperlocal', 'quick commerce',
      'q-commerce', 'dispatch', 'spoilage', 'takeout', 'dining', 'cold chain',
      'cooking', 'catering', 'chef', 'food waste',
    ],
    strengths: [
      'High consumer purchase frequency with potential for strong daily habit formation',
      'Clear transactional unit economics per delivered order or vendor commission',
      'Opportunities for hyperlocal density advantages within targeted city clusters',
    ],
    risks: [
      'Razor-thin contribution margins vulnerable to courier wage inflation and fuel costs',
      'Brutal customer acquisition costs (CAC) with low consumer brand loyalty across platforms',
      'Perishable inventory liabilities and food safety/spoilage risks during delivery delays',
    ],
    investorTake:
      'Hyperlocal food logistics is fundamentally a game of order density and contribution margins. Do not scale geographic territory until single-neighborhood unit economics are verifiably cash-flow positive after courier payouts.',
  },

  SMART_AGRICULTURE: {
    id: 'smart_agriculture',
    name: 'Smart Agriculture & AgTech',
    keywords: [
      'agriculture', 'agtech', 'farm', 'farmer', 'crop', 'soil', 'irrigation',
      'harvest', 'fertilizer', 'pesticide', 'livestock', 'yield', 'agronomy',
      'greenhouse', 'tractor', 'hectare', 'acre', 'seed', 'weather', 'drought',
      'pest', 'grain', 'dairy', 'precision agriculture',
    ],
    strengths: [
      'Directly impacts farm yield, water conservation, and input cost reduction',
      'High secular tailwinds from climate adaptation and sustainable farming subsidies',
      'Sticky annual renewals once embedded into a farm operational cycle',
    ],
    risks: [
      'Severe hardware and sensor durability challenges in extreme weather and dust environments',
      'Conservative buyer adoption with purchase decisions strictly tied to seasonal harvest cash flow',
      'Rural connectivity dead-zones (lack of 4G/5G/LoRa coverage across vast acreage)',
    ],
    investorTake:
      'Farmers are pragmatic, ROI-driven operators who evaluate tech on payback within a single growing season. Focus on a clear pilot demonstrating undeniable yield protection or fertilizer cost savings before scaling distribution.',
  },

  EDTECH: {
    id: 'edtech',
    name: 'Education Technology & Learning',
    keywords: [
      'education', 'edtech', 'student', 'teacher', 'school', 'university',
      'college', 'course', 'curriculum', 'tutoring', 'grading', 'classroom',
      'learning', 'pedagogy', 'lms', 'k-12', 'homework', 'exam', 'skill',
      'bootcamp', 'training', 'upskilling', 'syllabus',
    ],
    strengths: [
      'Global accessibility with massive digital addressable audience of lifelong learners',
      'Automated pedagogical feedback loops that scale linearly with minimal marginal delivery costs',
      'Alignment with corporate upskilling budgets and accredited education standards',
    ],
    risks: [
      'High student drop-off rates and poor long-term completion retention in self-paced learning',
      'Bureaucratic procurement hurdles and fragmented district budgets in institutional K-12 sales',
      'Intense competition from commoditized free learning resources and open-source tutorials',
    ],
    investorTake:
      'Consumer EdTech frequently suffers from sharp churn after the initial novelty fades. Demonstrate verifiable learning outcomes, career placement uplift, or B2B enterprise employer sponsorship to command sustained pricing power.',
  },

  FINTECH: {
    id: 'fintech',
    name: 'Financial Technology & Payments',
    keywords: [
      'fintech', 'payment', 'banking', 'lending', 'loan', 'credit', 'wallet',
      'underwriting', 'fraud', 'aml', 'kyc', 'remittance', 'invoice', 'payroll',
      'treasury', 'interchange', 'neobank', 'pci', 'chargeback', 'debit',
      'settlement', 'cross-border', 'factoring', 'insurance', 'insurtech',
    ],
    strengths: [
      'Monetization built directly into transaction volume via take-rate or interchange fees',
      'High customer lock-in once embedded into corporate ledger or core banking flows',
      'Compounding data advantage on credit risk assessment and automated fraud scoring',
    ],
    risks: [
      'Heavy regulatory compliance demands (AML/KYC, money transmitter licenses, PCI-DSS)',
      'Direct balance sheet exposure to loan defaults, chargeback fraud, and credit risk',
      'Vulnerability to banking partner policy shifts and sponsor bank dependency',
    ],
    investorTake:
      'Fintech startups succeed by controlling risk while maximizing transaction volume. Ensure your regulatory licensing and sponsor-bank architecture are established early to prevent sudden compliance shutdowns as volume spikes.',
  },

  ECOMMERCE_RETAIL: {
    id: 'ecommerce_retail',
    name: 'E-Commerce & Retail Technology',
    keywords: [
      'ecommerce', 'e-commerce', 'retail', 'merchant', 'storefront', 'shop',
      'shopify', 'cart', 'checkout', 'd2c', 'inventory', 'warehouse', 'catalog',
      'returns', 'fulfillment', 'dropshipping', 'skus', 'merchandise',
      'consumer goods', 'pos', 'point of sale',
    ],
    strengths: [
      'Direct monetization per transaction with immediate cash flow settlement',
      'Clear consumer product-market fit metrics measurable through cart conversion rates',
      'Ecosystem integration opportunities with Shopify, Amazon, and enterprise ERPs',
    ],
    risks: [
      'Escalating customer acquisition costs (CAC) across digital ad platforms eroding unit margins',
      'Heavy reverse-logistics costs and margin decay from product return rates (often 20–30%)',
      'Inventory capital lockup and supply-chain lead-time disruptions',
    ],
    investorTake:
      'D2C and retail platforms live and die by repeat purchase rates and blended customer acquisition costs. Prioritize organic retention and demonstrate that customer 90-day LTV substantially outpaces acquisition ad spend.',
  },

  CYBERSECURITY: {
    id: 'cybersecurity',
    name: 'Cybersecurity & Threat Defense',
    keywords: [
      'cybersecurity', 'security', 'malware', 'ransomware', 'threat', 'vulnerability',
      'soc', 'siem', 'edr', 'firewall', 'encryption', 'breach', 'zero-day',
      'penetration', 'iam', 'identity', 'auth', 'endpoint', 'phishing',
      'devsecops', 'ciso', 'exploit', 'audit', 'compliance',
    ],
    strengths: [
      'Must-have enterprise budget line item that is rarely cut during economic downturns',
      'Exceptionally high switching costs once deployed across enterprise infrastructure',
      'High annual contract values (ACVs) with strong net revenue retention (NRR)',
    ],
    risks: [
      'Catastrophic liability and reputational damage in the event of an unhandled breach or zero-day',
      'Alert fatigue among enterprise SOC analysts causing security software to be muted or ignored',
      'Intense competition against massive incumbents (CrowdStrike, Palo Alto Networks, Microsoft)',
    ],
    investorTake:
      'Enterprise security buyers are deeply risk-averse and demand hard proof of efficacy. Conduct live proof-of-concept bake-offs directly demonstrating attack vector detection that bypasses incumbent defense tools.',
  },

  EV_CLEANTECH: {
    id: 'ev_cleantech',
    name: 'Electric Vehicles & Clean Energy',
    keywords: [
      'electric vehicle', 'ev', 'charging', 'battery', 'grid', 'solar',
      'renewable', 'clean energy', 'cleantech', 'decarbonization', 'carbon credit',
      'megawatt', 'kilowatt', 'fleet', 'electrification', 'charger', 'storage',
      'inverter', 'transformer', 'substation', 'emissions',
    ],
    strengths: [
      'Unprecedented global regulatory mandates phasing out internal combustion engines',
      'Dual revenue potential: hardware charging utilization plus grid stabilization grid services',
      'Predictable recurring energy consumption patterns across commercial fleet depots',
    ],
    risks: [
      'Substantial upfront capital expenditure (CapEx) for hardware, utility grid hookups, and transformers',
      'Protracted permitting cycles and municipal utility interconnection delays (often 6–18 months)',
      'Hardware uptime vulnerabilities (charger payment terminal failures, broken connectors, vandalism)',
    ],
    investorTake:
      'CleanTech hardware infrastructure demands strict capital discipline. Prioritize asset-light software management or secure site host co-funding to de-risk upfront capital deployment before scaling charging networks.',
  },

  WASTE_MANAGEMENT: {
    id: 'waste_management',
    name: 'Waste Management & Circular Economy',
    keywords: [
      'waste', 'recycling', 'landfill', 'circular economy', 'trash', 'compost',
      'plastic', 'sorting', 'scrap', 'e-waste', 'upcycling', 'rubbish',
      'collection', 'route optimization', 'hauler', 'municipal waste', 'feedstock',
    ],
    strengths: [
      'Multi-year municipal contracts provide stable, inflation-resistant recurring cash flow',
      'Growing corporate ESG mandates and carbon offset accountability driving demand',
      'Substantial cost reduction potential through automated optical/robotic sorting facilities',
    ],
    risks: [
      'High contamination rates in collected waste streams severely degrading recyclable feedstock resale value',
      'Capital-intensive fleet maintenance, sorting machinery depreciation, and fuel overhead',
      'Long municipal public tender cycles requiring political lobbying and bonding capacity',
    ],
    investorTake:
      'Waste management offers high barriers to entry once municipal contracts are locked down. Run a localized pilot demonstrating high feedstock purity and reduced route transport costs before bidding on large-scale metro contracts.',
  },

  SOCIAL_COMMUNITY: {
    id: 'social_community',
    name: 'Social Networking & Creator Communities',
    keywords: [
      'social network', 'community', 'creator', 'messaging', 'chat', 'feed',
      'dating', 'follower', 'viral', 'creator economy', 'influencer', 'ugc',
      'forum', 'networking', 'matchmaking', 'social media', 'friends', 'groups',
      'streaming', 'fans',
    ],
    strengths: [
      'Uncapped upside if organic viral loop triggers exponential user network effects',
      'Extremely low marginal delivery cost for user-generated software feeds',
      'High daily engagement time-in-app potential with opportunities for micro-transactions',
    ],
    risks: [
      'Severe cold-start problem: platforms have zero value without existing active participants',
      'High user churn rates once initial consumer novelty and status mechanics fade',
      'Heavy content moderation, trust & safety liabilities, and uncertain ad monetization',
    ],
    investorTake:
      'Consumer social platforms face an uphill struggle against entrenched graph monopolies. Focus on solving an acute single-player utility or building hyper-dense engagement inside a tiny passionate subculture before pursuing broad viral scale.',
  },

  DEVTOOLS_INFRASTRUCTURE: {
    id: 'devtools_infrastructure',
    name: 'Developer Tools & Cloud Infrastructure',
    keywords: [
      'devtools', 'developer', 'api', 'sdk', 'kubernetes', 'ebpf', 'docker',
      'container', 'ci/cd', 'deployment', 'debugging', 'telemetry', 'open-source',
      'database', 'latency', 'microservice', 'observability', 'compiler', 'git',
      'devops', 'infrastructure', 'runtime', 'cloud', 'aws', 'gcp',
    ],
    strengths: [
      'Bottom-up developer adoption flywheel that bypasses slow corporate procurement',
      'High technical moat and switching costs once embedded in production software codebases',
      'Rapid organic expansion through developer word-of-mouth and GitHub community channels',
    ],
    risks: [
      'Difficult monetization bridge from enthusiastic free open-source users to paying enterprise teams',
      'Developer skepticism toward closed-source lock-in and vendor telemetry tracking',
      'Complex enterprise security and compliance audits required for production runtime deployment',
    ],
    investorTake:
      'Developer tooling requires immediate time-to-value without marketing fluff. Build a frictionless self-serve CLI or SDK that delivers demonstrable developer joy within the first five minutes of onboarding.',
  },

  B2B_SAAS_GENERAL: {
    id: 'b2b_saas_general',
    name: 'B2B SaaS & Enterprise Workflow',
    keywords: [
      'saas', 'workflow', 'crm', 'erp', 'automation', 'enterprise', 'collaboration',
      'dashboard', 'ticketing', 'hrtech', 'b2b', 'productivity', 'onboarding',
      'procurement', 'contract', 'pipeline', 'sales', 'operations',
    ],
    strengths: [
      'Predictable recurring revenue model with annual contract upfront billing',
      'Expansion revenue potential through seat-based or volume-tiered pricing expansion',
      'Clear enterprise productivity ROI by eliminating fragmented manual spreadsheet workflows',
    ],
    risks: [
      'Crowded competitive landscape with numerous point-solution alternatives',
      'Customer churn risk if the tool fails to become the undisputed daily system of record',
      'Long onboarding timelines requiring custom enterprise integration and IT signoff',
    ],
    investorTake:
      'B2B SaaS is won on customer retention and net revenue retention (NRR). Prove that your software becomes an irreplaceable operational system of record rather than a nice-to-have widget.',
  },
};

// Tech barrier classifications
export const TECH_BARRIERS = {
  DEEP_TECH: {
    id: 'deep_tech',
    bonus: 24,
    keywords: ['kernel', 'ebpf', 'genomic', 'bioinformatics', 'protocol', 'distributed systems', 'neural network', 'spectral', 'computer vision', 'lidar', 'rf', 'robotics', 'firmware', 'zero-knowledge'],
    strength: 'Deep technological barrier requiring specialized engineering expertise',
    moatReason: 'High technical moat that cannot be easily replicated by generic software builders',
  },
  INTEGRATED_HARDWARE: {
    id: 'integrated_hardware',
    bonus: 14,
    keywords: ['hardware', 'sensor', 'iot', 'iot device', 'charger', 'microcontroller', 'meter', 'camera', 'drone', 'station'],
    strength: 'Physical hardware footprint creates defensive deployment moats once installed',
    risk: 'Hardware manufacturing supply-chain complexities and field maintenance overhead',
  },
  COMPLEX_WORKFLOW: {
    id: 'complex_workflow',
    bonus: 12,
    keywords: ['workflow', 'orchestration', 'pipeline', 'multi-agent', 'consensus', 'audit', 'compliance', 'system of record', 'integration'],
    strength: 'Deep integration into operational workflows establishes sticky switching costs',
    moatReason: 'Enterprise stickiness through deep workflow integration and daily employee habits',
  },
  LIGHTWEIGHT_WRAPPER: {
    id: 'lightweight_wrapper',
    bonus: -14,
    keywords: ['wrapper', 'bot', 'prompt', 'chrome extension', 'directory', 'aggregator', 'curation', 'list of', 'template'],
    risk: 'Low technical defensibility: minimal proprietary software barrier, highly vulnerable to copycats',
    moatReason: 'Thin software layer with low switching costs, highly vulnerable to rapid replication',
  },
};

// Revenue model taxonomy
export const REVENUE_MODELS = {
  ENTERPRISE_SUBSCRIPTION: {
    id: 'enterprise_subscription',
    score: 22,
    keywords: ['enterprise saas', 'annual contract', 'license', 'seat-based', 'per user', 'subscription', 'arr', 'mrr'],
    desc: 'B2B subscription model with predictable recurring revenue and upfront cash flow',
  },
  USAGE_BASED: {
    id: 'usage_based',
    score: 20,
    keywords: ['usage-based', 'per-api', 'per-query', 'compute fee', 'metering', 'consumption', 'per transaction'],
    desc: 'Usage-based monetization directly aligned with customer operational scaling',
  },
  MARKETPLACE_TAKE_RATE: {
    id: 'marketplace_take_rate',
    score: 16,
    keywords: ['commission', 'take-rate', 'take rate', 'transaction fee', 'gmv cut', 'marketplace fee', 'listing fee'],
    desc: 'Transactional take-rate monetization leveraging platform transaction volume',
  },
  HARDWARE_SALES: {
    id: 'hardware_sales',
    score: 10,
    keywords: ['hardware sale', 'device cost', 'capex', 'installation fee', 'equipment fee', 'upfront price'],
    desc: 'Upfront hardware purchase model with recurring maintenance service potential',
  },
  ADVERTISING: {
    id: 'advertising',
    score: 6,
    keywords: ['ad-supported', 'advertising', 'ads', 'sponsored', 'cpm', 'impressions', 'free to use'],
    desc: 'Ad-driven revenue model requiring massive scale to achieve meaningful monetization',
  },
  UNMENTIONED: {
    id: 'unmentioned',
    score: -12,
    keywords: [],
    desc: 'No clear pricing, business model, or revenue capture mechanism stated in the pitch',
    risk: 'Business and revenue model is completely unstated — risk of building a utility without monetization',
  },
};

