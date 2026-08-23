// ─────────────────────────────────────────────
// Ghareludukan – Customer Portal Constants
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
  MOCK_ADDRESSES,
  MOCK_ORDERS,
  INITIAL_CART,
  MOCK_WISHLIST_PRODUCTS,
  MOCK_SAVED_SHOPS,
  MOCK_OFFERS,
  MOCK_COUPONS,
  MOCK_NOTIFICATIONS,
  MOCK_CUSTOMER_NOTIFICATIONS,
  MOCK_CUSTOMERS,
  MOCK_REVIEWS,
  MOCK_TICKETS,
  DELIVERY_SLOTS,
  HERO_BANNERS,
  CANCEL_REASONS,
  RETURN_REASONS,
  REJECT_REASONS,
} from "../../data/mockData";

// ─── Order Status (Customer View) ────────────
export const ORDER_STATUS_LABEL = {
  PLACED: "Order Placed",
  ACCEPTED: "Accepted",
  PREPARING: "Preparing",
  PACKED: "Packed",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  RETURN_REQUESTED: "Return Requested",
  RETURN_APPROVED: "Return Approved",
  REFUNDED: "Refunded",
};

export const ORDER_STATUS_COLOR = {
  PLACED: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  ACCEPTED: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  PREPARING: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  PACKED: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  OUT_FOR_DELIVERY: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  DELIVERED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  CANCELLED: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  RETURN_REQUESTED: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  RETURN_APPROVED: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  REFUNDED: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export const PAYMENT_STATUS_COLOR = {
  PAID: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  PENDING: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  FAILED: "bg-red-500/15 text-red-400 border-red-500/30",
  REFUNDED: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  COD: "bg-sky-500/15 text-sky-400 border-sky-500/30",
};

export const NOTIF_TYPE_COLOR = {
  ORDER: "bg-cyan-500/15 text-cyan-400",
  PAYMENT: "bg-emerald-500/15 text-emerald-400",
  OFFER: "bg-amber-500/15 text-amber-400",
  REFUND: "bg-purple-500/15 text-purple-400",
  DELIVERY: "bg-indigo-500/15 text-indigo-400",
  SUPPORT: "bg-rose-500/15 text-rose-400",
};

export const TICKET_STATUS_COLOR = {
  OPEN: "bg-sky-500/15 text-sky-400",
  IN_PROGRESS: "bg-amber-500/15 text-amber-400",
  RESOLVED: "bg-emerald-500/15 text-emerald-400",
  CLOSED: "bg-slate-500/15 text-slate-400",
};

export const PRIORITY_COLOR = {
  LOW: "bg-slate-500/15 text-slate-400",
  NORMAL: "bg-sky-500/15 text-sky-400",
  HIGH: "bg-amber-500/15 text-amber-400",
  CRITICAL: "bg-red-500/15 text-red-400",
};

// ─── Customer Nav ─────────────────────────────
export const CUSTOMER_BOTTOM_NAV = [
  { id: "home", label: "Home", icon: "Home" },
  { id: "search", label: "Search", icon: "Search" },
  { id: "orders", label: "Orders", icon: "ShoppingBag" },
  { id: "wishlist", label: "Wishlist", icon: "Heart" },
  { id: "profile", label: "Profile", icon: "User" },
];

export const CUSTOMER_NAV = [
  {
    group: "Marketplace",
    items: [
      { id: "home", label: "Home", icon: "Home" },
      { id: "search", label: "Explore & Search", icon: "Search" },
      { id: "shops", label: "Nearby Shops", icon: "Store" },
      { id: "cart", label: "Shopping Cart", icon: "ShoppingCart", badge: "cart" },
      { id: "wishlist", label: "Wishlist & Saved", icon: "Heart" },
    ],
  },
  {
    group: "Orders & Activity",
    items: [
      { id: "orders", label: "My Orders", icon: "ShoppingBag" },
      { id: "wallet", label: "Wallet & Cash", icon: "Wallet" },
      { id: "coupons", label: "Coupons & Offers", icon: "Tag" },
    ],
  },
  {
    group: "Account & Help",
    items: [
      { id: "profile", label: "My Profile", icon: "User" },
      { id: "addresses", label: "Saved Addresses", icon: "MapPin" },
      { id: "notifications", label: "Notifications", icon: "Bell", badge: "notifications" },
      { id: "support", label: "Help & Support", icon: "Headphones" },
      { id: "settings", label: "Settings", icon: "Settings" },
    ],
  },
];
