# AI Finance Assistant

# NexaFi — Complete Frontend Build Prompt

```
Build a complete, production-ready frontend for NexaFi — an AI-powered DeFi neobank that combines automated treasury management, intelligent yield optimization, and seamless cross-border payments. The platform presents itself as a cutting-edge AI-driven financial assistant, with the underlying Nomba API infrastructure completely hidden from the user.

## Brand Identity

- **Platform Name:** NexaFi
- **Tagline:** "Your AI-Powered Financial Copilot" or "Wealth, Automated."
- **Positioning:** A next-generation neobank that uses artificial intelligence to automatically grow, protect, and move your money — all through simple conversation.
- **Target Audience:** Tech-savvy professionals, SMEs, freelancers, and crypto-savvy individuals in emerging markets
- **Tone:** Futuristic, trustworthy, intelligent, accessible, premium

## Design System

### Color Palette
- **Primary:** Deep Indigo (#0A0A1A) or Dark Navy (#0F172A) — conveys trust and sophistication
- **Secondary:** Electric Violet (#6C3CE1) or Neon Purple — AI/tech accent
- **Accent:** Cyan (#00D4FF) or Teal (#14B8A6) — interactive elements, CTAs
- **Success:** Emerald (#10B981) — positive actions, deposits
- **Warning:** Amber (#F59E0B) — alerts, high-risk strategies
- **Danger:** Coral (#FF6B6B) — errors, withdrawals
- **Background:** Dark (#0A0A14) with subtle gradient mesh
- **Cards:** Glassmorphism (rgba(255,255,255,0.05) backdrop-blur)
- **Text:** White (#FFFFFF) primary, muted (#94A3B8) secondary

### Dark / Light Theme
- **Dark Mode:** Default — immersive, futuristic, reduces eye strain
- **Light Mode:** Clean, professional, high contrast
- **Theme Toggle:** Smooth transition with sun/moon icon in header

### Typography
- **Headings:** Clash Display or Satoshi (geometric, futuristic)
- **Body:** Inter (clean, readable)
- **Numbers/Monospace:** DM Mono or JetBrains Mono (for crypto amounts, wallet addresses)

### Visual Design
- **Glassmorphism + Neumorphism** hybrid
- **Smooth micro-interactions** (Framer Motion)
- **Beautiful background gradients and mesh patterns**
- **High-quality images** (Unsplash integration or placeholder)
- **Subtle animations** throughout the interface
- **Data-rich but airy** — information density without clutter

### Logo & Favicon
- **Logo:** Minimalist geometric mark — stylized "N" or infinity symbol with gradient (Indigo to Cyan)
- **Favicon:** Simplified logo mark
- **Browser Tab:** Logo + "NexaFi" text

---

## PART 1: LANDING PAGE (Public — No Auth Required)

### Route: `/`

### Hero Section
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🌌 [Background: Animated gradient mesh + subtle floating particles]        │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                                                                       │  │
│  │  ✨ Your AI-Powered Financial Copilot                                │  │
│  │                                                                       │  │
│  │  "Automate your wealth. Earn yield. Move money globally.             │  │
│  │   All through simple conversation."                                   │  │
│  │                                                                       │  │
│  │  [Get Started — Free]  [Watch Demo]                                  │  │
│  │                                                                       │  │
│  │  ┌───────┬───────┬───────┬─────────┐                                 │  │
│  │  │ $50M+ │ 25K+  │ 4.9★  │  150+   │                                 │  │
│  │  │Volume │ Users │Rating │Countries│                                 │  │
│  │  └───────┴───────┴───────┴─────────┘                                 │  │
│  │                                                                       │  │
│  │  🔒 Audited  │  🔒 Licensed  │  🔒 Secure                            │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  [Laptop/phone mockup showing NexaFi dashboard]                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Features Section (3-Column Grid)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Why NexaFi?                                                                │
│                                                                             │
│  ┌─────────────────┬─────────────────┬───────────────────────────────────┐  │
│  │  🤖 AI Copilot  │  💰 Auto-Yield  │  🔒 Smart Security              │  │
│  │                 │                 │                                   │  │
│  │  Natural        │  Automatically  │  Bank-grade encryption           │  │
│  │  language       │  find and       │  + multi-factor auth             │  │
│  │  commands       │  invest in      │  + 24/7 monitoring               │  │
│  │  for DeFi       │  high-yield     │                                   │  │
│  │                 │  opportunities  │                                   │  │
│  └─────────────────┴─────────────────┴───────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────┬─────────────────┬───────────────────────────────────┐  │
│  │  💳 Global Spend │  📈 Smart      │  🌍 Cross-Border                │  │
│  │                 │  Rebalancing    │                                   │  │
│  │  Virtual cards  │  AI-driven      │  Send and receive                │  │
│  │  + real-world   │  portfolio      │  across 150+                    │  │
│  │  payments       │  optimization   │  countries                       │  │
│  └─────────────────┴─────────────────┴───────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### How It Works Section
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  How It Works — 3 Simple Steps                                              │
│                                                                             │
│  ┌───────────────┐    ┌───────────────┐    ┌─────────────────────────────┐  │
│  │  1️⃣ Connect   │ →  │  2️⃣ Set Goals │ →  │  3️⃣ AI Automates            │  │
│  │               │    │               │    │                             │  │
│  │  Connect your │    │  Tell AI what │    │  Watch your portfolio       │  │
│  │  wallet in    │    │  you want to  │    │  grow automatically         │  │
│  │  seconds      │    │  achieve      │    │                             │  │
│  └───────────────┘    └───────────────┘    └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Social Proof / Testimonials
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ⭐ What Our Users Say                                                      │
│                                                                             │
│  ┌─────────────────┬─────────────────┬───────────────────────────────────┐  │
│  │  "NexaFi AI     │  "I've never    │  "NexaFi is the                  │  │
│  │  saved me       │  understood     │  future of                       │  │
│  │  20+ hours      │  DeFi before    │  personal finance."              │  │
│  │  of research    │  NexaFi. Now    │                                   │  │
│  │  this month."   │  I earn 15%     │  — [User Name]                   │  │
│  │                 │  APY daily."    │                                   │  │
│  │  — [User]       │  — [User]       │                                   │  │
│  └─────────────────┴─────────────────┴───────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Pricing Section
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💎 Simple, Transparent Pricing                                             │
│                                                                             │
│  ┌───────────────────────────────────┬───────────────────────────────────┐  │
│  │  Free                            │  Pro                             │  │
│  │  $0/month                        │  $29/month                       │  │
│  │                                   │                                   │  │
│  │  • Basic portfolio tracking      │  • All Free features             │  │
│  │  • Manual trades                 │  • AI Copilot (unlimited)        │  │
│  │  • 1 active strategy             │  • 10 active strategies          │  │
│  │  • Community support             │  • Priority support              │  │
│  │                                   │  • Premium yield strategies      │  │
│  │                                   │  • Virtual card included         │  │
│  │  [Get Started]                    │  [Get Started]                   │  │
│  └───────────────────────────────────┴───────────────────────────────────┘  │
│                                                                             │
│  🔹 25% discount with annual billing                                       │
│  🔹 Enterprise plans available                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### FAQ Section
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ❓ Frequently Asked Questions                                              │
│                                                                             │
│  Accordion items:                                                           │
│  • What is NexaFi?                                                         │
│  • How does the AI Copilot work?                                           │
│  • What are the risks?                                                     │
│  • How do I start?                                                         │
│  • Is my money safe?                                                       │
│  • What networks does NexaFi support?                                     │
│  • Can I withdraw anytime?                                                 │
│  • What fees are involved?                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Final CTA Section
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🚀 Ready to automate your wealth?                                         │
│                                                                             │
│  Join 25,000+ users already using NexaFi                                  │
│                                                                             │
│  [Get Started — Free]                                                       │
│  No credit card required · 2-minute setup                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Footer
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Logo                                                                       │
│                                                                             │
│  ┌───────────┬───────────┬───────────┬───────────────────────────────────┐  │
│  │ Product   │ Resources │ Company   │ Social                            │  │
│  │ Features  │ Blog      │ About     │ Twitter                          │  │
│  │ Pricing   │ Docs      │ Careers   │ LinkedIn                         │  │
│  │           │ Support   │ Contact   │ Discord                          │  │
│  │           │           │           │ Telegram                         │  │
│  └───────────┴───────────┴───────────┴───────────────────────────────────┘  │
│                                                                             │
│  © 2026 NexaFi. All rights reserved.                                       │
│  [Privacy Policy] [Terms of Service] [Cookie Policy]                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## PART 2: USER DASHBOARD (Authenticated)

### Route: `/dashboard`

### Navigation Structure
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Logo          [Search]                    [Theme Toggle] [Notif] [Profile] │
├─────────────────────────────────────────────────────────────────────────────┤
│  Sidebar Navigation:                                                        │
│  ├── 📊 Dashboard                                                          │
│  ├── 🤖 AI Copilot                                                         │
│  ├── 💰 Portfolio                                                          │
│  ├── 📈 Markets                                                           │
│  ├── 💳 Spend                                                             │
│  ├── 📤 Send / Receive                                                    │
│  ├── 📋 Transactions                                                      │
│  ├── 🎯 Goals                                                            │
│  ├── ⚙️ Settings                                                         │
│  └── ❓ Help & Support                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Page 1: Dashboard (Home)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  👋 Welcome back, [User Name]                                              │
│  AI Copilot: Active ✅  |  Last active: [date/time]                        │
│                                                                             │
│  Portfolio Overview Cards:                                                  │
│  ┌────────────┬────────────┬────────────┬────────────────────────────────┐  │
│  │Total Balance│Total Invested│Total Earned│ AI P/L                      │  │
│  │ $124,850.32 │ $98,200.00  │ $26,650.32 │ +12.4%                      │  │
│  └────────────┴────────────┴────────────┴────────────────────────────────┘  │
│                                                                             │
│  Portfolio Allocation Chart (Donut/Pie)                                    │
│                                                                             │
│  AI Copilot Quick Actions:                                                  │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  "What's my best-performing strategy this month?"                   │  │
│  │  "Move 10% of my USDC into high-yield lending"                     │  │
│  │  "Show me my top 5 positions"                                       │  │
│  │  "Autopilot my portfolio for low risk"                              │  │
│  │  [Chat with AI Copilot] [View All Strategies]                       │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Recent Activity Feed:                                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  🟢 AI Strategy "Growth Plus" earned $42.50                        │  │
│  │  🔵 Deposited $5,000 USDC to wallet                                 │  │
│  │  🟣 Yield position matured — $1,200 profit                         │  │
│  │  🔴 Withdrew $2,000 to external wallet                             │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Page 2: AI Copilot (Core Feature)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🤖 AI Financial Copilot                                                    │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  "How can I help you today?"                                         │  │
│  │  [Chat input field with voice button]                                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Suggested Actions:                                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  [Optimize Portfolio] [Find Yield Opportunities] [Set Savings Goal]  │  │
│  │  [Auto-Invest] [Generate Report] [Tax Optimization]                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Active AI Strategies:                                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Strategy Name    │ Status   │ P&L     │ Actions                     │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │  Growth Plus      │ Active   │ +18.2%  │ [Pause] [Edit]              │  │
│  │  Stable Income    │ Active   │ +8.5%   │ [Pause] [Edit]              │  │
│  │  Aggressive       │ Paused   │ +22.1%  │ [Resume] [Edit]             │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  One-Click Strategies:                                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  [Conservative] [Balanced] [Growth] [Aggressive]                    │  │
│  │  3–5% APY      5–10% APY   10–18% APY  18–30% APY                   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Page 3: Portfolio

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💰 Portfolio Management                                                    │
│                                                                             │
│  📊 Performance Chart (Line chart with time filter)                         │
│  [1D] [1W] [1M] [3M] [1Y] [All]                                           │
│                                                                             │
│  Holdings Breakdown:                                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Asset          │ Balance  │ Value  │ P&L   │ Actions               │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │  USDC           │ 25,000   │ 25,000 │ -     │ [Send] [Invest]        │  │
│  │  ETH            │ 3.2      │ 8,960  │ +15%  │ [Send] [Invest]        │  │
│  │  BNB            │ 12.5     │ 7,500  │ +8%   │ [Send] [Invest]        │  │
│  │  Yield Strategy │ -        │ 45,000 │ +12%  │ [Withdraw]             │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  AI Recommendations:                                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  ⚡ Rebalance suggestion: Move 5% ETH to BNB                        │  │
│  │  💡 New opportunity: 15% APY on new lending pool                   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Page 4: Markets

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📈 Live Markets & Opportunities                                           │
│                                                                             │
│  🔍 [Search assets]  [Filter: All▼]  [Sort: APY▼]                         │
│                                                                             │
│  Top Opportunities (AI-curated):                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  🌟 High-Yield Strategy  │ 18.5% APY  │ 🔵 Invest                   │  │
│  │  🌟 Growth Portfolio     │ 14.2% APY  │ 🔵 Invest                   │  │
│  │  🌟 Balanced Approach    │ 12.8% APY  │ 🔵 Invest                   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Market Overview (small charts for top assets):                            │
│  BTC  │ ETH  │ BNB  │ USDC  │ SOL  │ ...                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Page 5: Spend (Cards & Payments)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💳 Spend                                                                   │
│                                                                             │
│  Virtual Card:                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  💳 Virtual Card:                                                    │  │
│  │  ●●●● ●●●● ●●●● 8421                                                 │  │
│  │  Balance: $12,450.32                                                 │  │
│  │  [Freeze Card] [Request Physical] [Add Funds]                       │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  AI Spending Insights:                                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  This month: $3,240 spent  ⬇ 8% from last month                    │  │
│  │  Top categories: Investments (40%), Shopping (30%), Food (20%)     │  │
│  │  💡 AI Tip: You could save $120 by optimizing...                   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Recent Card Transactions:                                                  │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Date     │ Merchant       │ Amount  │ Status                       │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │  10 Aug   │ Amazon.com     │ -$45.20 │ ✅ Completed                  │  │
│  │  09 Aug   │ Starbucks      │ -$8.50  │ ✅ Completed                  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Page 6: Send / Receive

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📤 Send / Receive                                                          │
│                                                                             │
│  [Send] [Receive]                                                           │
│                                                                             │
│  Asset: [USDC ▼]  Amount: [________]                                       │
│  Recipient: [0x... or Email]                                               │
│  Network: [BNB Chain ▼]                                                   │
│  Fee: $0.12 (estimated)                                                    │
│                                                                             │
│  [Send Now]  [Schedule]  [AI Optimize Route]                              │
│                                                                             │
│  Saved Addresses / Frequent Contacts:                                      │
│  [Address 1] [Address 2] [Address 3] [Add New]                            │
│                                                                             │
│  💡 AI Tip: "Sending now? Use BNB Chain for lower fees"                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Page 7: Transactions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📋 Transaction History                                                     │
│                                                                             │
│  [Search] [Filter: All▼] [Date Range: [________]]                          │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Date     │ Type    │ Asset │ Amount  │ Status                     │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │  10 Aug   │ Deposit │ USDC  │ +$5,000 │ ✅ Completed               │  │
│  │  10 Aug   │ Trade   │ ETH   │ -$2,500 │ ✅ Completed               │  │
│  │  09 Aug   │ Yield   │ USDC  │ +$42.50 │ ✅ Completed               │  │
│  │  09 Aug   │ Withdraw│ USDC  │ -$1,000 │ ⏳ Pending                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Transaction Analytics:                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Total Volume: $45,230    Top Asset: USDC                          │  │
│  │  Most Active Day: Wed     Avg TX: 4.2/day                         │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Page 8: Goals

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🎯 Financial Goals                                                         │
│                                                                             │
│  [+ Create New Goal]                                                        │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  🏠 Down Payment Fund                                               │  │
│  │  $12,000 of $50,000 saved  24% complete                             │  │
│  │  Projected completion: 8 months                                     │  │
│  │  AI Strategy: "Balanced Growth"                                     │  │
│  │  [View] [Edit] [Pause]                                             │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  🚀 Business Expansion Fund                                         │  │
│  │  $8,500 of $20,000 saved  42.5% complete                           │  │
│  │  Projected completion: 5 months                                     │  │
│  │  AI Strategy: "Aggressive Growth"                                   │  │
│  │  [View] [Edit] [Pause]                                             │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Page 9: Settings

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ⚙️ Settings                                                                │
│                                                                             │
│  Profile:                                                                   │
│  Name, Email, Phone, Avatar                                                │
│                                                                             │
│  Security:                                                                  │
│  Change Password, 2FA, Biometric Login, Recovery Phrases                   │
│                                                                             │
│  AI Preferences:                                                            │
│  Risk Tolerance (Conservative / Balanced / Aggressive)                     │
│  Auto-invest Settings, Notification Preferences                            │
│                                                                             │
│  Wallet Connections:                                                        │
│  [Connect Wallet] [Add New Wallet] [View Connected]                       │
│                                                                             │
│  Notifications:                                                             │
│  Push, Email, In-app — AI Alert Toggles                                   │
│                                                                             │
│  Language & Region:                                                         │
│  [English ▼] [Nigeria ▼]                                                  │
│                                                                             │
│  Support:                                                                   │
│  [Contact Support] [FAQ] [Docs]                                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## PART 3: ADMIN DASHBOARD

### Route: `/admin`

### Navigation Structure
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Logo          [Search]                    [Theme Toggle] [Notif] [Admin]   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Sidebar Navigation:                                                        │
│  ├── 📊 Dashboard                                                          │
│  ├── 👥 Users                                                              │
│  ├── 💰 Transactions                                                       │
│  ├── 🤖 AI Strategies                                                      │
│  ├── 📈 Analytics                                                          │
│  ├── 🏦 Yield Opportunities                                                │
│  ├── 💳 Cards                                                              │
│  ├── ⚙️ System Settings                                                    │
│  └── 📋 Audit Log                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Admin Page 1: Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📊 Admin Dashboard                                                         │
│                                                                             │
│  ┌───────────┬───────────┬───────────┬────────────────────────────────────┐  │
│  │Total Users│Active Users│Total Vol.│ Revenue                           │  │
│  │ 24,850    │ 18,230    │ $42.5M   │ $2.1M                            │  │
│  └───────────┴───────────┴───────────┴────────────────────────────────────┘  │
│                                                                             │
│  Growth Metrics (Last 30 days):                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  New Users: 1,245   │  Churn Rate: 4.2%                           │  │
│  │  Avg Deposit: $3,200 │  Avg AI Usage: 6.8x/week                  │  │
│  │  Top Region: Nigeria │  Top Asset: USDC                           │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  System Alerts:                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  🟢 All systems operational                                        │  │
│  │  🟡 High gas fees detected — consider optimization                │  │
│  │  🔵 3 new AI strategies pending approval                          │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Admin Page 2: User Management

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  👥 User Management                                                         │
│                                                                             │
│  [Search] [Filter: All▼] [Status: All▼] [Export CSV]                       │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  User      │ Email          │ Balance  │ Status │ Actions           │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │  0x7F3A..  │ john@email.com │ $45,230  │ Active │ 👁️🔒              │  │
│  │  0xA1B2..  │ jane@email.com │ $12,500  │ Active │ 👁️🔒              │  │
│  │  0xC4D5..  │ bob@email.com  │ $3,200   │ Pending│ 👁️🔒              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  User Detail Modal (on click):                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  User Profile: 0x7F3A...                                            │  │
│  │  Email: john@email.com                                              │  │
│  │  Total Balance: $45,230   Total TX: 342                            │  │
│  │  AI Strategies: 3 active   Risk Level: Medium                      │  │
│  │  [View Transactions] [Suspend] [Delete]                            │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Admin Page 3: Transaction Monitoring

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💰 Transaction Monitoring                                                  │
│                                                                             │
│  [Search TX] [Filter: All▼] [Date Range] [Export]                          │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  TX ID │ User      │ Type    │ Amount  │ Status │ Flag             │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │  #001  │ 0x7F3A..  │ Deposit │ +$50K  │ ✅     │ 🟢               │  │
│  │  #002  │ 0xA1B2..  │ Trade   │ -$2.5K │ ✅     │ 🟢               │  │
│  │  #003  │ 0xC4D5..  │ Withdraw│ -$10K  │ ⏳     │ 🟡               │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Risk Alert Summary:                                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  🟢 Low Risk: 892 TX                                               │  │
│  │  🟡 Medium Risk: 45 TX — Review recommended                       │  │
│  │  🔴 High Risk: 3 TX — Investigate immediately                     │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Admin Page 4: AI Strategies

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🤖 AI Strategy Management                                                  │
│                                                                             │
│  [Create New Strategy] [Filter: All▼] [Publish/ Draft]                     │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Strategy Name │ Type   │ APY Range │ Status │ Actions             │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │  Growth Plus  │ DeFi   │ 12–18%    │ Active │ 👁️✏️🔒              │  │
│  │  Stable Income│ Lending│ 6–8%      │ Active │ 👁️✏️🔒              │  │
│  │  Aggressive   │ High   │ 18–30%    │ Draft  │ 👁️✏️🚀              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Strategy Editor (on edit):                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Name: [_________]  Type: [DeFi ▼]                                 │  │
│  │  Description: [__________________________]                         │  │
│  │  Risk Level: [Low] [Medium] [High]                                │  │
│  │  Allocation: Lending 40% │ Staking 30% │ Farming 30%              │  │
│  │  Auto-rebalance: [Yes] [No]                                       │  │
│  │  [Save] [Preview] [Deploy]                                        │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## PART 4: AI Strategy Implementation (Nomba Hidden)

### How the AI Strategy Works (User-Facing)

The AI Copilot presents itself as an intelligent portfolio manager that automatically optimizes user funds. The underlying Nomba API infrastructure is completely hidden.

### User-Facing Strategy Types

| Strategy Name | Description | User-Facing APY Range |
|---------------|-------------|----------------------|
| **NexaFi SmartSave** | Automatically allocates idle cash to high-yield savings | 15–20% APY |
| **NexaFi Growth** | Balances savings with moderate risk opportunities | 10–18% APY |
| **NexaFi Stable** | Conservative approach focusing on capital preservation | 6–8% APY |
| **NexaFi Aggressive** | Maximizes yield through optimized allocations | 18–30% APY |

### What Actually Happens (Backend)

```
1. User selects a strategy (e.g., "NexaFi SmartSave")
2. AI Copilot routes funds to Nomba's Safe Stash Savings Pot (up to 20% APY)
3. User sees: "Your funds are now earning 18.5% APY in our SmartSave strategy"
4. Behind the scenes: Nomba API handles all deposits, yield accrual, and withdrawals
5. User receives AI-generated reports on their portfolio performance
```

### Nomba API Integration (Hidden from UI)

```typescript
// services/strategies/nombaStrategy.ts
// This is the hidden backend integration
class NombaStrategyService {
  private readonly nombaClient: NombaClient;
  
  async executeStrategy(userId: string, strategyType: string, amount: number) {
    switch(strategyType) {
      case 'SMART_SAVE':
        // Route to Nomba Safe Stash (up to 20% APY)
        return this.nombaClient.createSavingsPot({
          userId,
          amount,
          product: 'SAFE_STASH'
        });
      case 'GROWTH':
        // Split between Nomba savings and yield opportunities
        return this.nombaClient.allocateFunds({
          userId,
          amount,
          allocations: [
            { product: 'SAFE_STASH', percentage: 40 },
            { product: 'FIXED_DEPOSIT', percentage: 30 },
            { product: 'MONEY_MARKET', percentage: 30 }
          ]
        });
      default:
        // Default to Nomba savings
        return this.nombaClient.createSavingsPot({
          userId,
          amount,
          product: 'SAFE_STASH'
        });
    }
  }
}
```

---

## PART 5: Technical Stack & Implementation

### Technology Stack
```
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS + shadcn/ui
- State Management: Zustand or Context API
- Data Fetching: TanStack Query (React Query)
- Animations: Framer Motion
- Charts: Recharts
- Forms: React Hook Form + Zod validation
- Theme: next-themes for dark/light mode
- Web3: Wagmi / RainbowKit for wallet connection
- AI: OpenAI / Anthropic API for Copilot (backend)
- Images: Unsplash API (for landing page backgrounds)
```

### Folder Structure
```
nexafi-frontend/
├── app/
│   ├── page.tsx (landing page)
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── copilot/
│   │   ├── portfolio/
│   │   ├── markets/
│   │   ├── spend/
│   │   ├── send-receive/
│   │   ├── transactions/
│   │   ├── goals/
│   │   └── settings/
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── users/
│   │   ├── transactions/
│   │   ├── strategies/
│   │   ├── analytics/
│   │   ├── yields/
│   │   ├── settings/
│   │   └── audit/
│   └── layout.tsx
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── landing/ (hero, features, pricing, faq, cta, footer)
│   ├── dashboard/ (reusable dashboard components)
│   ├── admin/ (admin components)
│   └── shared/ (header, footer, sidebar, theme toggle)
├── lib/
│   ├── api/ (API integration layer)
│   ├── strategies/ (Nomba strategy logic — hidden)
│   └── utils/
├── hooks/
├── context/ (AuthContext, ThemeContext)
└── public/
    ├── images/
    ├── icons/
    └── favicon.ico
```

### Key Features to Implement
1. **AI Copilot Chat Interface** — Natural language processing for financial commands
2. **Nomba Strategy Integration** — Hidden backend yield optimization via Nomba API
3. **Dark/Light Theme Toggle** — Smooth transition with persistent preference
4. **Beautiful Landing Page** — Hero with background animations, features, pricing, FAQ
5. **Wallet Connection** — Multi-wallet support (MetaMask, Trust Wallet, WalletConnect)
6. **Portfolio Tracking** — Real-time asset values, P&L, allocation charts
7. **Automated Strategies** — Pre-configured AI strategies with one-click activation
8. **Admin Dashboard** — Full user, transaction, and system oversight
9. **Mobile-First** — Fully responsive design optimized for mobile users

---

## PART 6: Deliverables

1. Complete landing page with hero, features, pricing, FAQ, footer
2. Full user dashboard with all pages (Dashboard, AI Copilot, Portfolio, Markets, Spend, Send/Receive, Transactions, Goals, Settings)
3. Complete admin dashboard with all pages
4. Dark/Light theme toggle with persistent state
5. Beautiful background images and gradient meshes on landing page
6. Logo and favicon (minimalist geometric mark)
7. Footer with links and social icons
8. AI Copilot chat interface (UI + mock API responses)
9. Nomba strategy integration (backend — hidden from user)
10. Fully responsive mobile-first design
11. Mock data for all dashboards (users, transactions, strategies)
12. Documentation covering setup, architecture, and deployment

---

## PART 7: Success Criteria

- Landing page renders beautifully with animated hero and background
- Dark/light theme toggle works smoothly
- All user dashboard pages render correctly on mobile and desktop
- AI Copilot interface accepts natural language input
- Portfolio charts display real-time data (mock)
- Admin dashboard shows all key metrics
- Wallet connection flow works (mock)
- Nomba strategy is completely hidden from user
- Design matches the premium, futuristic brand identity
- Footer displays correctly on all pages
- Navigation is intuitive and smooth
- All interactive elements have proper micro-interactions
- Logo and favicon display correctly in browser tab
```

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://quantifi-pilot.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c9f9682c-5ed6-40a4-8a0a-0e7aa9261aa8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
