export type PayoutMethod = "bank" | "mobile_money" | "cash_pickup" | "wallet";

export type Corridor = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  methods: PayoutMethod[];
  eta: string;
  /** Units of local currency per 1 USD (indicative). */
  usdRate: number;
  mobileNetworks?: string[];
};

export const methodLabel: Record<PayoutMethod, string> = {
  bank: "Bank deposit",
  mobile_money: "Mobile money",
  cash_pickup: "Cash pickup",
  wallet: "NexaFi wallet",
};

/** Priority corridors. NexaFi settles into 190+ countries; these are the fully-instant lanes. */
export const corridors: Corridor[] = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "NGN", methods: ["bank", "mobile_money", "cash_pickup", "wallet"], eta: "Instant", usdRate: 1580, mobileNetworks: ["OPay", "PalmPay", "MoMo PSB", "Airtel SmartCash"] },
  { code: "GH", name: "Ghana", flag: "🇬🇭", currency: "GHS", methods: ["bank", "mobile_money", "cash_pickup"], eta: "Instant", usdRate: 15.2, mobileNetworks: ["MTN MoMo", "Telecel Cash", "AT Money"] },
  { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "KES", methods: ["bank", "mobile_money"], eta: "Instant", usdRate: 129, mobileNetworks: ["M-Pesa", "Airtel Money"] },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", currency: "ZAR", methods: ["bank", "wallet"], eta: "Same day", usdRate: 18.1 },
  { code: "EG", name: "Egypt", flag: "🇪🇬", currency: "EGP", methods: ["bank", "cash_pickup"], eta: "Same day", usdRate: 48.5 },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿", currency: "TZS", methods: ["bank", "mobile_money"], eta: "Instant", usdRate: 2650, mobileNetworks: ["M-Pesa", "Tigo Pesa", "Airtel Money"] },
  { code: "UG", name: "Uganda", flag: "🇺🇬", currency: "UGX", methods: ["bank", "mobile_money"], eta: "Instant", usdRate: 3700, mobileNetworks: ["MTN MoMo", "Airtel Money"] },
  { code: "SN", name: "Senegal", flag: "🇸🇳", currency: "XOF", methods: ["bank", "mobile_money", "cash_pickup"], eta: "Instant", usdRate: 605, mobileNetworks: ["Wave", "Orange Money"] },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", currency: "XOF", methods: ["bank", "mobile_money"], eta: "Instant", usdRate: 605, mobileNetworks: ["Wave", "Orange Money", "MTN MoMo"] },
  { code: "MA", name: "Morocco", flag: "🇲🇦", currency: "MAD", methods: ["bank", "cash_pickup"], eta: "Same day", usdRate: 9.9 },
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", methods: ["bank", "wallet"], eta: "Same day", usdRate: 1 },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", methods: ["bank"], eta: "Same day", usdRate: 1.37 },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", methods: ["bank", "wallet"], eta: "Instant", usdRate: 0.78 },
  { code: "IE", name: "Ireland", flag: "🇮🇪", currency: "EUR", methods: ["bank"], eta: "Instant", usdRate: 0.92 },
  { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR", methods: ["bank"], eta: "Instant", usdRate: 0.92 },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR", methods: ["bank"], eta: "Instant", usdRate: 0.92 },
  { code: "ES", name: "Spain", flag: "🇪🇸", currency: "EUR", methods: ["bank"], eta: "Instant", usdRate: 0.92 },
  { code: "IT", name: "Italy", flag: "🇮🇹", currency: "EUR", methods: ["bank"], eta: "Instant", usdRate: 0.92 },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", currency: "EUR", methods: ["bank"], eta: "Instant", usdRate: 0.92 },
  { code: "PT", name: "Portugal", flag: "🇵🇹", currency: "EUR", methods: ["bank"], eta: "Instant", usdRate: 0.92 },
  { code: "PL", name: "Poland", flag: "🇵🇱", currency: "PLN", methods: ["bank"], eta: "Same day", usdRate: 3.95 },
  { code: "TR", name: "Türkiye", flag: "🇹🇷", currency: "TRY", methods: ["bank", "cash_pickup"], eta: "Same day", usdRate: 34.2 },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", currency: "AED", methods: ["bank", "cash_pickup"], eta: "Instant", usdRate: 3.67 },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR", methods: ["bank", "cash_pickup"], eta: "Same day", usdRate: 3.75 },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", methods: ["bank", "wallet"], eta: "Instant", usdRate: 84.1 },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", currency: "PKR", methods: ["bank", "cash_pickup", "mobile_money"], eta: "Instant", usdRate: 278, mobileNetworks: ["JazzCash", "Easypaisa"] },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", currency: "BDT", methods: ["bank", "mobile_money"], eta: "Instant", usdRate: 120, mobileNetworks: ["bKash", "Nagad"] },
  { code: "PH", name: "Philippines", flag: "🇵🇭", currency: "PHP", methods: ["bank", "mobile_money", "cash_pickup"], eta: "Instant", usdRate: 58.2, mobileNetworks: ["GCash", "Maya"] },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", currency: "IDR", methods: ["bank", "wallet"], eta: "Same day", usdRate: 15800 },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", currency: "VND", methods: ["bank", "cash_pickup"], eta: "Same day", usdRate: 25400 },
  { code: "CN", name: "China", flag: "🇨🇳", currency: "CNY", methods: ["bank", "wallet"], eta: "1 business day", usdRate: 7.2 },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY", methods: ["bank"], eta: "1 business day", usdRate: 152 },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", methods: ["bank"], eta: "Same day", usdRate: 1.52 },
  { code: "BR", name: "Brazil", flag: "🇧🇷", currency: "BRL", methods: ["bank", "wallet"], eta: "Instant", usdRate: 5.6 },
  { code: "MX", name: "Mexico", flag: "🇲🇽", currency: "MXN", methods: ["bank", "cash_pickup"], eta: "Instant", usdRate: 19.9 },
  { code: "AR", name: "Argentina", flag: "🇦🇷", currency: "ARS", methods: ["bank", "wallet"], eta: "Same day", usdRate: 985 },
  { code: "CO", name: "Colombia", flag: "🇨🇴", currency: "COP", methods: ["bank", "cash_pickup"], eta: "Same day", usdRate: 4300 },
];

export const corridorMap = new Map(corridors.map((c) => [c.code, c]));

/** Fee schedule per payout method, as a share of the send amount plus a fixed component in USD. */
export const feeSchedule: Record<PayoutMethod, { pct: number; fixedUsd: number }> = {
  bank: { pct: 0.004, fixedUsd: 0.5 },
  mobile_money: { pct: 0.006, fixedUsd: 0.3 },
  cash_pickup: { pct: 0.009, fixedUsd: 1.2 },
  wallet: { pct: 0.001, fixedUsd: 0 },
};
