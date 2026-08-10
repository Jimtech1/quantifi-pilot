/** Mock data powering the NexaFi demo experience. */

export const user = {
  name: "Adaeze Okonkwo",
  email: "adaeze@nexafi.io",
  phone: "+234 802 555 0198",
  initials: "AO",
  wallet: "0x7F3A9c21D4eB0a5F81cC3e77bB4A2f19D6e0aB44",
  plan: "Pro",
  lastActive: "Today, 09:42",
  region: "Nigeria",
  language: "English",
  riskTolerance: "Balanced",
};

export const portfolioStats = [
  { label: "Total Balance", value: "$124,850.32", delta: "+2.4% today", tone: "accent" as const },
  { label: "Total Invested", value: "$98,200.00", delta: "4 strategies", tone: "muted" as const },
  { label: "Total Earned", value: "$26,650.32", delta: "+$1,240 this week", tone: "success" as const },
  { label: "AI P/L", value: "+12.4%", delta: "vs 6.1% benchmark", tone: "success" as const },
];

export const allocation = [
  { name: "SmartSave", value: 42000, color: "var(--color-chart-1)" },
  { name: "USDC", value: 25000, color: "var(--color-chart-2)" },
  { name: "ETH", value: 8960, color: "var(--color-chart-3)" },
  { name: "BNB", value: 7500, color: "var(--color-chart-4)" },
  { name: "Growth Pool", value: 41390, color: "var(--color-chart-5)" },
];

export const performanceSeries = [
  { date: "Jan", value: 78000, benchmark: 76000 },
  { date: "Feb", value: 82400, benchmark: 78200 },
  { date: "Mar", value: 88100, benchmark: 80400 },
  { date: "Apr", value: 94600, benchmark: 83100 },
  { date: "May", value: 101200, benchmark: 86000 },
  { date: "Jun", value: 109800, benchmark: 89400 },
  { date: "Jul", value: 117400, benchmark: 92100 },
  { date: "Aug", value: 124850, benchmark: 94800 },
];

export const activity = [
  { tone: "success", text: 'AI Strategy "Growth Plus" earned $42.50', time: "12 min ago" },
  { tone: "accent", text: "Deposited $5,000 USDC to wallet", time: "2 hours ago" },
  { tone: "primary", text: "Yield position matured — $1,200 profit", time: "Yesterday" },
  { tone: "destructive", text: "Withdrew $2,000 to external wallet", time: "2 days ago" },
  { tone: "warning", text: "Rebalance scheduled for Growth Plus", time: "3 days ago" },
] as const;

export const strategies = [
  { name: "Growth Plus", status: "Active", pnl: "+18.2%", risk: "Medium", allocated: "$42,000" },
  { name: "Stable Income", status: "Active", pnl: "+8.5%", risk: "Low", allocated: "$31,200" },
  { name: "Aggressive Alpha", status: "Paused", pnl: "+22.1%", risk: "High", allocated: "$15,000" },
  { name: "SmartSave", status: "Active", pnl: "+16.4%", risk: "Low", allocated: "$10,000" },
];

export const oneClickStrategies = [
  { name: "Conservative", apy: "3–5% APY", blurb: "Capital preservation first." },
  { name: "Balanced", apy: "5–10% APY", blurb: "Steady compounding growth." },
  { name: "Growth", apy: "10–18% APY", blurb: "Optimised yield rotation." },
  { name: "Aggressive", apy: "18–30% APY", blurb: "Maximum yield capture." },
];

export const holdings = [
  { asset: "USDC", balance: "25,000", value: "$25,000", pnl: "—", tone: "muted" },
  { asset: "ETH", balance: "3.2", value: "$8,960", pnl: "+15.2%", tone: "success" },
  { asset: "BNB", balance: "12.5", value: "$7,500", pnl: "+8.1%", tone: "success" },
  { asset: "SOL", balance: "48.0", value: "$6,240", pnl: "-2.4%", tone: "destructive" },
  { asset: "Yield Strategy", balance: "—", value: "$45,000", pnl: "+12.0%", tone: "success" },
] as const;

export const marketOpportunities = [
  { name: "NexaFi SmartSave", apy: "18.5%", risk: "Low", tvl: "$42.1M" },
  { name: "NexaFi Growth", apy: "14.2%", risk: "Medium", tvl: "$28.7M" },
  { name: "NexaFi Balanced", apy: "12.8%", risk: "Medium", tvl: "$19.3M" },
  { name: "NexaFi Stable", apy: "7.4%", risk: "Low", tvl: "$61.5M" },
  { name: "NexaFi Aggressive", apy: "24.9%", risk: "High", tvl: "$8.2M" },
];

export const marketAssets = [
  { symbol: "BTC", price: "$96,412", change: "+1.8%", up: true },
  { symbol: "ETH", price: "$2,801", change: "+2.6%", up: true },
  { symbol: "BNB", price: "$601.44", change: "-0.7%", up: false },
  { symbol: "USDC", price: "$1.00", change: "+0.0%", up: true },
  { symbol: "SOL", price: "$130.12", change: "+4.1%", up: true },
  { symbol: "AVAX", price: "$28.90", change: "-1.2%", up: false },
];

export const cardTransactions = [
  { date: "10 Aug", merchant: "Amazon.com", amount: "-$45.20", status: "Completed" },
  { date: "09 Aug", merchant: "Starbucks", amount: "-$8.50", status: "Completed" },
  { date: "08 Aug", merchant: "Notion Labs", amount: "-$16.00", status: "Completed" },
  { date: "07 Aug", merchant: "Uber", amount: "-$23.75", status: "Pending" },
];

export const transactions = [
  { date: "10 Aug", type: "Deposit", asset: "USDC", amount: "+$5,000", status: "Completed" },
  { date: "10 Aug", type: "Trade", asset: "ETH", amount: "-$2,500", status: "Completed" },
  { date: "09 Aug", type: "Yield", asset: "USDC", amount: "+$42.50", status: "Completed" },
  { date: "09 Aug", type: "Withdraw", asset: "USDC", amount: "-$1,000", status: "Pending" },
  { date: "08 Aug", type: "Deposit", asset: "BNB", amount: "+$3,200", status: "Completed" },
  { date: "07 Aug", type: "Yield", asset: "USDC", amount: "+$38.10", status: "Completed" },
  { date: "06 Aug", type: "Trade", asset: "SOL", amount: "-$820", status: "Failed" },
];

export const goals = [
  {
    icon: "🏠",
    name: "Down Payment Fund",
    saved: 12000,
    target: 50000,
    eta: "8 months",
    strategy: "Balanced Growth",
  },
  {
    icon: "🚀",
    name: "Business Expansion Fund",
    saved: 8500,
    target: 20000,
    eta: "5 months",
    strategy: "Aggressive Growth",
  },
  {
    icon: "🌍",
    name: "Travel Reserve",
    saved: 3400,
    target: 6000,
    eta: "3 months",
    strategy: "SmartSave",
  },
];

export const savedAddresses = [
  { label: "Cold wallet", address: "0x9A2b...41Ce" },
  { label: "Chidi (payroll)", address: "chidi@nexafi.io" },
  { label: "Binance", address: "0x77Fa...09Bd" },
];

export const copilotSeed = [
  {
    role: "assistant" as const,
    content:
      "Hey Adaeze 👋 Your portfolio is up 12.4% this month. Growth Plus is your strongest strategy. Want me to rebalance 5% of idle USDC into SmartSave at 18.5% APY?",
  },
];

export const copilotSuggestions = [
  "Optimize Portfolio",
  "Find Yield Opportunities",
  "Set Savings Goal",
  "Auto-Invest",
  "Generate Report",
  "Tax Optimization",
];

/* ---------------- Admin ---------------- */

export const adminStats = [
  { label: "Total Users", value: "24,850", delta: "+1,245 this month" },
  { label: "Active Users", value: "18,230", delta: "73.4% activation" },
  { label: "Total Volume", value: "$42.5M", delta: "+9.8% MoM" },
  { label: "Revenue", value: "$2.1M", delta: "+12.2% MoM" },
];

export const adminGrowth = [
  { month: "Mar", users: 12400, volume: 21 },
  { month: "Apr", users: 15100, volume: 26 },
  { month: "May", users: 17800, volume: 30 },
  { month: "Jun", users: 20400, volume: 34 },
  { month: "Jul", users: 22900, volume: 38 },
  { month: "Aug", users: 24850, volume: 42.5 },
];

export const adminUsers = [
  {
    wallet: "0x7F3A..44",
    email: "john@email.com",
    balance: "$45,230",
    status: "Active",
    tx: 342,
    strategies: 3,
    risk: "Medium",
  },
  {
    wallet: "0xA1B2..91",
    email: "jane@email.com",
    balance: "$12,500",
    status: "Active",
    tx: 118,
    strategies: 2,
    risk: "Low",
  },
  {
    wallet: "0xC4D5..07",
    email: "bob@email.com",
    balance: "$3,200",
    status: "Pending",
    tx: 12,
    strategies: 1,
    risk: "Low",
  },
  {
    wallet: "0xE8F1..2A",
    email: "amaka@email.com",
    balance: "$88,410",
    status: "Active",
    tx: 921,
    strategies: 5,
    risk: "High",
  },
  {
    wallet: "0x33B7..5D",
    email: "tunde@email.com",
    balance: "$610",
    status: "Suspended",
    tx: 8,
    strategies: 0,
    risk: "Medium",
  },
];

export const adminTransactions = [
  { id: "#001", user: "0x7F3A..44", type: "Deposit", amount: "+$50,000", status: "Completed", flag: "Low" },
  { id: "#002", user: "0xA1B2..91", type: "Trade", amount: "-$2,500", status: "Completed", flag: "Low" },
  { id: "#003", user: "0xC4D5..07", type: "Withdraw", amount: "-$10,000", status: "Pending", flag: "Medium" },
  { id: "#004", user: "0xE8F1..2A", type: "Withdraw", amount: "-$140,000", status: "Review", flag: "High" },
  { id: "#005", user: "0x33B7..5D", type: "Deposit", amount: "+$900", status: "Completed", flag: "Low" },
];

export const adminStrategies = [
  { name: "Growth Plus", type: "DeFi", apy: "12–18%", status: "Active", users: 6420 },
  { name: "Stable Income", type: "Lending", apy: "6–8%", status: "Active", users: 9110 },
  { name: "SmartSave", type: "Savings", apy: "15–20%", status: "Active", users: 12840 },
  { name: "Aggressive Alpha", type: "High yield", apy: "18–30%", status: "Draft", users: 0 },
];

export const adminYields = [
  { pool: "Safe Yield Pot", category: "Savings", apy: "20.0%", capacity: "82%", status: "Live" },
  { pool: "Fixed Term 90d", category: "Fixed deposit", apy: "16.5%", capacity: "61%", status: "Live" },
  { pool: "Money Market", category: "Liquidity", apy: "11.2%", capacity: "44%", status: "Live" },
  { pool: "Alpha Rotation", category: "Structured", apy: "26.8%", capacity: "17%", status: "Pending" },
];

export const adminCards = [
  { id: "VC-8421", user: "0x7F3A..44", type: "Virtual", spend: "$3,240", status: "Active" },
  { id: "VC-7710", user: "0xA1B2..91", type: "Virtual", spend: "$860", status: "Frozen" },
  { id: "PC-2290", user: "0xE8F1..2A", type: "Physical", spend: "$11,420", status: "Active" },
];

export const adminAudit = [
  { time: "10 Aug 14:22", actor: "admin@nexafi.io", action: "Approved strategy 'SmartSave v2'", ip: "102.89.4.21" },
  { time: "10 Aug 11:05", actor: "risk-bot", action: "Flagged TX #004 as high risk", ip: "internal" },
  { time: "09 Aug 18:44", actor: "admin@nexafi.io", action: "Suspended user 0x33B7..5D", ip: "102.89.4.21" },
  { time: "09 Aug 09:12", actor: "ops@nexafi.io", action: "Updated fee schedule", ip: "41.203.7.8" },
];

export const systemAlerts = [
  { tone: "success", text: "All systems operational" },
  { tone: "warning", text: "High gas fees detected — consider route optimization" },
  { tone: "accent", text: "3 new AI strategies pending approval" },
] as const;
