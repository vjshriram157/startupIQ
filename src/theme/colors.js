// Design tokens for StartupIQ - Aesthetic Neo-Brutalism Theme
export const colors = {
  // Canvas & Backgrounds
  background: '#FDFBF7',          // Warm aesthetic ivory / cream canvas
  backgroundAlt: '#F4EFE6',       // Slightly deeper parchment
  surface: '#FFFFFF',             // Clean crisp white card surface
  surfaceElevated: '#FFFFFF',
  surfaceHover: '#FFF9E6',        // Soft buttery tint on hover
  surfaceSubtle: '#F7F3EB',

  // Ink & Structural Lines (Core Neo-Brutalist DNA)
  ink: '#121212',                 // Primary text & borders
  inkSecondary: '#374151',        // Body text
  inkMuted: '#6B7280',            // Captions & counters
  border: '#121212',              // Thick 2.5px-3px solid black border
  borderLight: '#121212',
  borderAccent: '#121212',
  shadowColor: '#121212',         // Pure black hard drop shadow (no blur)

  // Legacy mappings for backwards-compat
  text: '#121212',
  textSecondary: '#374151',
  textMuted: '#6B7280',
  textPlaceholder: '#9CA3AF',
  textInverse: '#FFFFFF',

  // High-Energy Pop Accents
  primary: '#8B5CF6',             // Electric Purple
  primaryLight: '#DDD6FE',        // Soft Lavender Lilac
  primaryDark: '#6D28D9',
  primaryGlow: 'rgba(139, 92, 246, 0.3)',

  secondary: '#3B82F6',           // Bright Royal Blue
  secondaryLight: '#BAE6FD',      // Soft Sky
  secondaryDark: '#1D4ED8',

  yellow: '#FFDE59',              // Iconic Neo-Brutalist Lemon Yellow
  yellowLight: '#FEF08A',
  yellowDark: '#EAB308',

  pink: '#FF6B8B',                // Pop Bubblegum Pink
  pinkLight: '#FCE7F3',

  mint: '#34D399',                // Electric Mint
  mintLight: '#D1FAE5',

  coral: '#FF5757',               // Hot Coral
  coralLight: '#FEE2E2',

  orange: '#FB923C',              // Tangerine Pop
  orangeLight: '#FFEDD5',

  cyan: '#38BDF8',                // Cyber Cyan
  cyanLight: '#E0F2FE',

  // Gradients for highlights
  gradientPrimary: ['#8B5CF6', '#3B82F6'],
  gradientYellow: ['#FFDE59', '#FBBF24'],
  gradientPink: ['#FF6B8B', '#EC4899'],
  gradientMint: ['#34D399', '#10B981'],
  gradientGold: ['#FFDE59', '#F59E0B'],
  gradientSilver: ['#E2E8F0', '#94A3B8'],
  gradientBronze: ['#FED7AA', '#F97316'],

  // Status & Semantic Feedback
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Category-specific colorful sticker palettes & icons
  categoryColors: {
    'AI & ML': { bg: '#DDD6FE', text: '#121212', border: '#121212', accent: '#8B5CF6', icon: '🤖' },
    'FinTech': { bg: '#D1FAE5', text: '#121212', border: '#121212', accent: '#10B981', icon: '💳' },
    'DevTools': { bg: '#E0F2FE', text: '#121212', border: '#121212', accent: '#0284C7', icon: '⚡' },
    'ClimateTech': { bg: '#CCFBF1', text: '#121212', border: '#121212', accent: '#0D9488', icon: '🌱' },
    'HealthTech': { bg: '#FCE7F3', text: '#121212', border: '#121212', accent: '#DB2777', icon: '🧬' },
    'Cybersecurity': { bg: '#FEE2E2', text: '#121212', border: '#121212', accent: '#EF4444', icon: '🛡️' },
    'SaaS': { bg: '#FEF08A', text: '#121212', border: '#121212', accent: '#EAB308', icon: '💼' },
    'EdTech': { bg: '#FED7AA', text: '#121212', border: '#121212', accent: '#EA580C', icon: '🎓' },
    'E-Commerce': { bg: '#E0E7FF', text: '#121212', border: '#121212', accent: '#4F46E5', icon: '🛒' },
    'Web3': { bg: '#EDE9FE', text: '#121212', border: '#121212', accent: '#6366F1', icon: '🌐' },
    'Other': { bg: '#F3E8FF', text: '#121212', border: '#121212', accent: '#9333EA', icon: '✨' },
    'Custom': { bg: '#F3E8FF', text: '#121212', border: '#121212', accent: '#9333EA', icon: '✨' },
  },
};

// Fallback palette generator for custom user-created categories
const fallbackPalette = [
  { bg: '#DDD6FE', text: '#121212', icon: '✨' },
  { bg: '#BAE6FD', text: '#121212', icon: '🚀' },
  { bg: '#D1FAE5', text: '#121212', icon: '💡' },
  { bg: '#FCE7F3', text: '#121212', icon: '🎯' },
  { bg: '#FED7AA', text: '#121212', icon: '⚡' },
  { bg: '#FEF08A', text: '#121212', icon: '🌟' },
];

export const getCategoryMeta = (category = '') => {
  if (colors.categoryColors[category]) {
    return colors.categoryColors[category];
  }
  // Deterministic fallback color based on name hash
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % fallbackPalette.length;
  return fallbackPalette[index];
};

export const stageMeta = {
  'Idea / Concept': { bg: '#FEF08A', icon: '💡' },
  'Pre-Seed': { bg: '#BAE6FD', icon: '🌱' },
  Seed: { bg: '#DDD6FE', icon: '🚀' },
  'Series A': { bg: '#BBF7D0', icon: '📈' },
};
