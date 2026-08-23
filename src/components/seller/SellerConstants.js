// ─────────────────────────────────────────────
// Ghareludukan – Seller Dashboard Constants
// Re-exports master data from centralized /data layer
// ─────────────────────────────────────────────

export {
  inr,
  nowStamp,
  PRODUCT_CATEGORIES,
  CATEGORIES,
  SUBCATEGORIES_MAP,
  MOCK_SHOPS,
  MOCK_PRODUCTS,
  MOCK_ORDERS,
  MOCK_STOCK_HISTORY,
  MOCK_CUSTOMERS,
  MOCK_SETTLEMENTS,
  MOCK_OFFERS,
  MOCK_NOTIFICATIONS,
  MOCK_SELLER_NOTIFICATIONS,
  MOCK_REVIEWS,
  MOCK_TICKETS,
  ANALYTICS_WEEKLY,
  TOP_PRODUCTS,
  REJECT_REASONS,
  CANCEL_REASONS,
  RETURN_REASONS,
} from "../../data/mockData";

// ─── Order Status (Seller View) ──────────────
export const ORDER_STATUSES = [
  "NEW", "ACCEPTED", "PREPARING", "PACKED", "READY",
  "OUT_FOR_DELIVERY", "DELIVERED", "REJECTED", "CANCELLED",
];

export const ORDER_STATUS_LABEL = {
  NEW: "New Order",
  ACCEPTED: "Accepted",
  PREPARING: "Preparing",
  PACKED: "Packed",
  READY: "Ready",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_COLOR = {
  NEW: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  ACCEPTED: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  PREPARING: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  PACKED: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  READY: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  OUT_FOR_DELIVERY: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  DELIVERED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  REJECTED: "bg-red-500/15 text-red-400 border-red-500/30",
  CANCELLED: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

// ─── Settlement Status ───────────────────────
export const SETTLEMENT_STATUS_COLOR = {
  PAID: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  PROCESSING: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  CREATED: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  ELIGIBLE: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  FAILED: "bg-red-500/15 text-red-400 border-red-500/30",
  ON_HOLD: "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

// ─── Ticket Priority Colors ──────────────────
export const PRIORITY_COLOR = {
  LOW: "bg-slate-500/15 text-slate-400",
  NORMAL: "bg-sky-500/15 text-sky-400",
  HIGH: "bg-amber-500/15 text-amber-400",
  CRITICAL: "bg-red-500/15 text-red-400",
};

export const TICKET_STATUS_COLOR = {
  OPEN: "bg-sky-500/15 text-sky-400",
  IN_PROGRESS: "bg-amber-500/15 text-amber-400",
  RESOLVED: "bg-emerald-500/15 text-emerald-400",
  CLOSED: "bg-slate-500/15 text-slate-400",
};

// ─── Seller Nav ──────────────────────────────
export const SELLER_NAV = [
  {
    group: "Main",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
      { id: "orders", label: "Orders", icon: "ShoppingCart", badge: "pending" },
      { id: "products", label: "Products", icon: "Package" },
      { id: "inventory", label: "Inventory", icon: "Warehouse" },
      { id: "customers", label: "Customers", icon: "Users" },
    ],
  },
  {
    group: "Sales & Marketing",
    items: [
      { id: "offers", label: "Offers & Coupons", icon: "Tag" },
      { id: "analytics", label: "Analytics", icon: "BarChart3" },
      { id: "reports", label: "Reports", icon: "FileBarChart" },
    ],
  },
  {
    group: "Finance",
    items: [
      { id: "settlements", label: "Settlements", icon: "Wallet" },
      { id: "transactions", label: "Transactions", icon: "ArrowLeftRight" },
      { id: "invoices", label: "Invoices", icon: "Receipt" },
    ],
  },
  {
    group: "Communication",
    items: [
      { id: "notifications", label: "Notifications", icon: "Bell" },
      { id: "support", label: "Support", icon: "Headphones" },
    ],
  },
  {
    group: "Shop",
    items: [
      { id: "shop-profile", label: "Shop Profile", icon: "Store" },
      { id: "settings", label: "Settings", icon: "Settings" },
    ],
  },
];
