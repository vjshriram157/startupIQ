# StartupIQ 🚀

A mobile application built with **React Native**, **Expo (SDK 58)**, and **Expo Router** for startup idea submission, community voting, and pitch evaluation.

Designed with an ultra-premium **AMOLED dark theme (`#0B0B12`)**, glowing purple and blue gradient accents, rounded glass cards, and micro-interactions tailored for Android and iOS.

---

## 📱 Features & Screens

### 1. 🔍 Explore Ideas (`src/app/(tabs)/index.jsx`)
- **Live Search**: Instant keyword filtering across titles, taglines, problem statements, and categories.
- **Category Filter Chips**: Scrollable chips (`All`, `AI & ML`, `DevTools`, `FinTech`, `ClimateTech`, `HealthTech`, `Cybersecurity`, `SaaS`) with real-time idea counts.
- **Sort Selector**: Toggle between **Trending** (algorithmic momentum), **Top Voted** (highest community score), and **Newest** (recent submissions).
- **Interactive Startup Cards**:
  - Category pill & stage badge.
  - Startup name, punchy tagline, and 2-line pitch teaser.
  - Founder avatar badge with credentials.
  - Interactive **Upvote button** with real-time counter, tactile haptic feedback, and AsyncStorage persistence.
  - Bookmark toggle button.
  - Full card tap opens the comprehensive pitch deck.
- **Pull-to-Refresh**: Instant synchronization with local storage.

### 2. 💡 Submit Idea (`src/app/(tabs)/submit.jsx`)
- Clean, validated founder submission workflow:
  - Startup Name & Punchy Tagline.
  - Elevator Pitch Summary.
  - Industry Domain & Development Stage selector pills.
  - The Acute Problem statement.
  - The 10x Solution & Innovation.
  - Business Model & Monetization pricing.
  - Founder Name & Credibility credentials.
- **Pitching Tips Banner**: Actionable guidance for high-ranking startup submissions.
- **Instant Community Publishing**: Submitting automatically generates a unique venture profile, saves it to AsyncStorage, registers author vote, and prompts navigation to the live pitch or feed.

### 3. 🏆 Leaderboard (`src/app/(tabs)/leaderboard.jsx`)
- **Metric Highlights**: Total active startups, aggregate community votes, and personal votes cast.
- **Timeframe Selector**: Toggle between **All-Time High** and **Trending This Week**.
- **Top 3 Podium**:
  - **#1 Rank**: Elevated Gold pedestal with trophy badge and gold gradient.
  - **#2 Rank**: Silver pedestal with medal badge.
  - **#3 Rank**: Bronze pedestal with award badge.
  - Direct tap on any pedestal navigates to the startup pitch.
- **Runner-Up Startups (#4+)**: Ranked list with rank index, category badge, and direct upvote buttons that dynamically re-rank ventures in real time.

### 4. ⚙️ Settings & Founder Profile (`src/app/settings.jsx`)
- **Innovator Profile**: Summary card displaying votes cast, submitted ventures, and bookmarked startups.
- **Preferences**:
  - Haptic feedback toggle.
  - Trending idea digests notification toggle.
  - AMOLED True Dark Mode (`#0B0B12`) theme indicator.
- **Demo & Data Controls**:
  - **"Reset to Sample Data"**: One-tap restoration of 7 realistic deep-tech sample proposals with confirmation dialog (ideal for evaluators).
- **Community Guidelines**: Built-in modal explaining what makes an investable idea on StartupIQ.

### 5. 📄 Pitch Detail View (`src/app/idea/[id].jsx`)
- Back button, category & stage badges, bookmarking, and native **Share** sheet.
- Founder credentials and verification badge.
- Verified traction & milestone callout.
- Modular pitch breakdown cards:
  - Executive Overview
  - The Acute Market Friction (Problem)
  - The 10x Innovation (Solution)
  - Business Model, Monetization & Target Audience
  - Market Size (TAM & CAGR)
- **Floating Bottom Action Bar**: Live vote count with prominent gradient upvote button.
- **Community Q&A & Feedback**: Founder feedback input and discussion thread with timestamps.

---

## 🎨 Design System

- **Background**: `#0B0B12` (OLED True Dark)
- **Secondary Surface**: `#11101D`
- **Elevated Card Surface**: `#151426` / `#1D1B33`
- **Borders**: `rgba(255, 255, 255, 0.08)` (Subtle) & `rgba(139, 92, 246, 0.35)` (Accent)
- **Gradients**:
  - Primary: `['#8B5CF6', '#3B82F6']` (Electric Purple to Blue)
  - Gold: `['#F59E0B', '#D97706']`
  - Silver: `['#CBD5E1', '#64748B']`
  - Bronze: `['#F97316', '#B45309']`
- **Typography**: Clean scale with Roboto on Android and San Francisco on iOS.
- **Touch Targets**: Minimum 48dp on all interactive elements.

---

## 🏗️ Architecture & Folder Structure

```
StartupIQ/
├── src/
│   ├── app/                    # Expo Router file-based routes
│   │   ├── _layout.jsx         # Root layout with SafeAreaProvider & IdeasProvider
│   │   ├── (tabs)/
│   │   │   ├── _layout.jsx     # Floating bottom navigation bar
│   │   │   ├── index.jsx       # Explore screen
│   │   │   ├── submit.jsx      # Submit idea screen
│   │   │   └── leaderboard.jsx # Leaderboard screen
│   │   ├── idea/
│   │   │   └── [id].jsx        # Deep dive pitch view
│   │   └── settings.jsx        # Settings & Profile screen
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx          # Category and stage pill badges
│   │   │   ├── EmptyState.jsx     # Zero-state placeholder
│   │   │   ├── GlassCard.jsx      # Rounded glass card with subtle borders
│   │   │   ├── GradientButton.jsx # Gradient action button
│   │   │   ├── Header.jsx         # Top brand bar with settings icon
│   │   │   └── StatPill.jsx       # Metric counter pill
│   │   ├── explore/
│   │   │   ├── CategoryFilter.jsx # Horizontal category scroll chips
│   │   │   ├── IdeaCard.jsx       # Venture card with live upvoting
│   │   │   ├── SearchBar.jsx      # Search input with clear button
│   │   │   └── SortSelector.jsx   # Trending / Top / Newest toggle
│   │   ├── leaderboard/
│   │   │   ├── LeaderboardRow.jsx # Ranked startup row item
│   │   │   └── Podium.jsx         # Top 3 Gold/Silver/Bronze pedestals
│   │   └── submit/
│   │       ├── CategoryPicker.jsx # Grid selector for category & stage
│   │       └── FormField.jsx      # Custom input with counter and validation
│   ├── context/
│   │   └── IdeasContext.jsx       # Global state management & AsyncStorage sync
│   ├── data/
│   │   └── initialIdeas.js        # Realistic startup ideas
│   ├── hooks/
│   │   └── useIdeas.js            # Consumer hook for IdeasContext
│   └── theme/
│       ├── colors.js              # Color tokens & gradients
│       ├── spacing.js             # 8dp spacing grid
│       └── typography.js          # Font scale & weights
├── app.json
├── babel.config.js
└── package.json
```

---

## 🚀 Running the Application

### 1. Start Metro Dev Server
```bash
npx expo start
```

### 2. Run on Android
Press `a` in the terminal or run:
```bash
npx expo start --android
```

### 3. Test on Physical Device
Download **Expo Go** from Google Play Store or App Store and scan the QR code displayed in the terminal.

