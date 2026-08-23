export * from "../../data/mockData";

export const ADMIN_NAV_ITEMS = [
  { id: "dashboard", label: "Operations Dashboard", icon: "LayoutDashboard" },
  { id: "shop-approvals", label: "Shop Verification Queue", icon: "Store", badgeKey: "pendingShopApprovals" },
  { id: "approved-shops", label: "Registered Merchants", icon: "CheckCircle2" },
  { id: "delivery-approvals", label: "Delivery Partner KYC", icon: "Bike", badgeKey: "pendingDeliveryApprovals" },
  { id: "fraud-investigation", label: "Fraud & Trust Desk", icon: "ShieldAlert", badgeKey: "fraudAlertsCount" },
  { id: "audit-logs", label: "Immutable Audit Trail", icon: "FileText" },
  { id: "reports", label: "Platform GMV & Reports", icon: "BarChart3" },
  { id: "orders", label: "All Platform Orders", icon: "ShoppingBag" },
  { id: "settlements", label: "Merchant Payout Ledger", icon: "CreditCard" },
  { id: "notifications", label: "Operational Alerts", icon: "Bell" },
  { id: "settings", label: "Admin Settings", icon: "Settings" },
];
