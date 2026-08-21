import React, { useState } from "react";
import {
  Bell, ShoppingCart, Package, AlertTriangle, IndianRupee,
  Wallet, Headphones, Star, CheckCircle2, Settings, ChevronRight, CheckCheck,
  X, ArrowRight, Clock, User, ShieldCheck, Tag, ExternalLink,
} from "lucide-react";
import { MOCK_SELLER_NOTIFICATIONS, MOCK_NOTIFICATIONS } from "../SellerConstants";

const TYPE_ICON = {
  NEW_ORDER: ShoppingCart,
  order: ShoppingCart,
  PAYMENT: IndianRupee,
  payment: IndianRupee,
  LOW_STOCK: AlertTriangle,
  low_stock: AlertTriangle,
  SETTLEMENT: Wallet,
  settlement: Wallet,
  ORDER_CANCELLED: Package,
  order_cancelled: Package,
  REVIEW: Star,
  review: Star,
  DEFAULT: Bell,
};

const TYPE_COLOR = {
  NEW_ORDER: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  order: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  PAYMENT: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  payment: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  LOW_STOCK: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  low_stock: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  SETTLEMENT: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  settlement: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  ORDER_CANCELLED: "bg-red-500/15 text-red-400 border-red-500/30",
  order_cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
  REVIEW: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  review: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  DEFAULT: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export default function SellerNotifications({
  notifications = MOCK_SELLER_NOTIFICATIONS || MOCK_NOTIFICATIONS,
  unreadCount,
  onMarkAsRead,
  onMarkAllRead,
  onNav,
}) {
  const [filter, setFilter] = useState("ALL");
  const [selectedNotif, setSelectedNotif] = useState(null);

  const dynamicUnread =
    typeof unreadCount === "number"
      ? unreadCount
      : notifications.filter((n) => !n.isRead && n.unread !== false).length;

  const handleCardClick = (notif) => {
    const isUnread = !notif.isRead && notif.unread !== false;
    if (isUnread && onMarkAsRead) {
      onMarkAsRead(notif.id);
    }
    // Open detailed popup modal
    setSelectedNotif(notif);
  };

  const filtered = notifications.filter((n) => {
    const isUnread = !n.isRead && n.unread !== false;
    const typeStr = (n.type || "").toUpperCase();

    if (filter === "ALL") return true;
    if (filter === "UNREAD") return isUnread;
    if (filter === "ORDERS") return typeStr === "NEW_ORDER" || typeStr === "ORDER" || typeStr === "ORDER_CANCELLED";
    if (filter === "PAYMENTS") return typeStr === "PAYMENT" || typeStr === "SETTLEMENT";
    if (filter === "INVENTORY") return typeStr === "LOW_STOCK";
    return true;
  });

  // Extract metadata from notification for modal rendering
  const getNotificationDetails = (item) => {
    if (!item) return {};
    const fullText = `${item.title || ""} ${item.message || ""} ${item.body || ""}`;
    
    // Extract Order ID (e.g. #GLD10245, GLD20513)
    const orderMatch = fullText.match(/#?(GLD[A-Z0-9]+)/i);
    const orderId = orderMatch ? orderMatch[1].toUpperCase() : null;

    // Extract Amount (e.g. ₹825, ₹4,520)
    const amountMatch = fullText.match(/(₹\s*[\d,]+(\.\d{2})?)/);
    const amount = amountMatch ? amountMatch[1] : null;

    // Extract Customer Name
    const customerMatch = fullText.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(?:placed|ordered|paid|reviewed)/);
    const customerName = customerMatch ? customerMatch[1] : null;

    const typeStr = (item.type || "").toUpperCase();
    const isOrderType = typeStr === "NEW_ORDER" || typeStr === "ORDER" || typeStr === "ORDER_CANCELLED" || !!orderId;
    const isPaymentType = typeStr === "PAYMENT" || typeStr === "SETTLEMENT" || fullText.toLowerCase().includes("payment") || fullText.toLowerCase().includes("upi");
    const isStockType = typeStr === "LOW_STOCK" || fullText.toLowerCase().includes("stock");
    const isReviewType = typeStr === "REVIEW" || fullText.toLowerCase().includes("review") || fullText.toLowerCase().includes("rating");

    return {
      orderId,
      amount,
      customerName,
      isOrderType,
      isPaymentType,
      isStockType,
      isReviewType,
    };
  };

  const modalMeta = selectedNotif ? getNotificationDetails(selectedNotif) : {};
  const ModalIcon = selectedNotif
    ? TYPE_ICON[selectedNotif.type] || TYPE_ICON[(selectedNotif.type || "").toUpperCase()] || TYPE_ICON.DEFAULT
    : TYPE_ICON.DEFAULT;
  const modalBadgeStyle = selectedNotif
    ? TYPE_COLOR[selectedNotif.type] || TYPE_COLOR[(selectedNotif.type || "").toUpperCase()] || TYPE_COLOR.DEFAULT
    : TYPE_COLOR.DEFAULT;

  return (
    <div className="space-y-5 gd-rise max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Notifications</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {dynamicUnread > 0
              ? `${dynamicUnread} unread notification${dynamicUnread !== 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {dynamicUnread > 0 && (
          <button
            onClick={() => onMarkAllRead?.()}
            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer shadow-md"
          >
            <CheckCheck size={14} />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "ALL", label: "All" },
          { id: "UNREAD", label: `Unread (${dynamicUnread})` },
          { id: "ORDERS", label: "Orders" },
          { id: "PAYMENTS", label: "Payments & Payouts" },
          { id: "INVENTORY", label: "Inventory" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex-shrink-0 cursor-pointer ${
              filter === f.id
                ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-400 shadow-md shadow-indigo-950/40"
                : "seller-tab-inactive bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl text-slate-600">
          <Bell size={40} className="mx-auto mb-4 opacity-30" />
          <div className="text-sm font-bold">
            {filter === "UNREAD" ? "No unread notifications" : "No notifications"}
          </div>
          <div className="text-xs mt-1">You're all caught up with your store alerts.</div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          {filtered.map((notif, i) => {
            const isUnread = !notif.isRead && notif.unread !== false;
            const Icon = TYPE_ICON[notif.type] || TYPE_ICON[(notif.type || "").toUpperCase()] || TYPE_ICON.DEFAULT;
            const color = TYPE_COLOR[notif.type] || TYPE_COLOR[(notif.type || "").toUpperCase()] || TYPE_COLOR.DEFAULT;

            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-slate-800/60 transition-all ticket-row-hover ${
                  i < filtered.length - 1 ? "border-b border-slate-800/60" : ""
                } ${isUnread ? "bg-indigo-600/10" : "opacity-80 hover:opacity-100"}`}
                onClick={() => handleCardClick(notif)}
              >
                {/* Unread dot & Icon */}
                <div className="relative flex-shrink-0 mt-0.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${color}`}>
                    <Icon size={17} />
                  </div>
                  {isUnread && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-400 rounded-full ring-2 ring-slate-900 shadow-md animate-pulse" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm ${isUnread ? "font-extrabold text-slate-100" : "font-semibold text-slate-300"}`}>
                    {notif.title}
                  </div>
                  <div className={`text-xs mt-0.5 leading-relaxed ${isUnread ? "text-slate-300 font-medium" : "text-slate-400"}`}>
                    {notif.message || notif.body}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5 font-mono flex items-center gap-2">
                    <span>{notif.timestamp || notif.time}</span>
                    {isUnread ? (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                        NEW
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-500">Read</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 self-center">
                  <ChevronRight size={15} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Notification Settings Link */}
      <button
        onClick={() => onNav?.("settings")}
        className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-left cursor-pointer shadow-md"
      >
        <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center">
          <Settings size={15} className="text-slate-400" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-slate-200">Store Alert & Notification Preferences</div>
          <div className="text-xs text-slate-500">Manage orders, payouts, stock threshold and review alerts</div>
        </div>
        <ChevronRight size={14} className="text-slate-600" />
      </button>

      {/* ─── Detailed Seller Notification Interactive Popup / Modal ─── */}
      {selectedNotif && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedNotif(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-7 text-left space-y-5 overflow-hidden gd-rise max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pt-1">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border ${modalBadgeStyle}`}>
                  <ModalIcon size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                      {selectedNotif.type || "Store Alert"}
                    </span>
                    <span className="text-slate-500 text-xs">·</span>
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock size={11} /> {selectedNotif.timestamp || selectedNotif.time}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-white mt-0.5 tracking-tight leading-snug">
                    {selectedNotif.title}
                  </h2>
                </div>
              </div>

              {/* Close (X) Button */}
              <button
                onClick={() => setSelectedNotif(null)}
                className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Message Box */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-slate-200 text-sm leading-relaxed font-medium">
              {selectedNotif.message || selectedNotif.body}
            </div>

            {/* Contextual Action Blocks */}
            {/* 1. If Order Notification */}
            {modalMeta.isOrderType && (
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Order Reference:</span>
                  <span className="font-mono font-bold text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded-lg border border-indigo-700/50">
                    {modalMeta.orderId ? `#${modalMeta.orderId}` : "Store Order"}
                  </span>
                </div>
                {modalMeta.customerName && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Customer:</span>
                    <span className="font-bold text-slate-200 flex items-center gap-1">
                      <User size={13} className="text-indigo-400" /> {modalMeta.customerName}
                    </span>
                  </div>
                )}
                {modalMeta.amount && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Order Value:</span>
                    <span className="font-mono font-black text-emerald-400">
                      {modalMeta.amount}
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-indigo-800/30 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedNotif(null);
                      onNav?.("orders");
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-950 cursor-pointer"
                  >
                    <ShoppingCart size={14} />
                    <span>Manage Orders</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. If Payment or Settlement Notification */}
            {modalMeta.isPaymentType && (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Payment Event:</span>
                  <span className="font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-700/50 flex items-center gap-1">
                    <ShieldCheck size={13} /> Verified
                  </span>
                </div>
                {modalMeta.amount && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Amount:</span>
                    <span className="font-mono text-base font-black text-emerald-400">
                      {modalMeta.amount}
                    </span>
                  </div>
                )}
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedNotif(null);
                      onNav?.("settlements");
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Wallet size={14} />
                    <span>View Settlements & Payouts</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNotif(null);
                      onNav?.("transactions");
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    Transactions
                  </button>
                </div>
              </div>
            )}

            {/* 3. If Low Stock Alert */}
            {modalMeta.isStockType && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <AlertTriangle size={14} />
                  <span>Inventory Threshold Alert</span>
                </div>
                <p className="text-xs text-slate-400">
                  Update your stock count now to avoid missed customer orders in your neighborhood.
                </p>
                <div className="pt-1 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedNotif(null);
                      onNav?.("inventory");
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Package size={14} />
                    <span>Update Inventory</span>
                  </button>
                </div>
              </div>
            )}

            {/* 4. If Customer Review */}
            {modalMeta.isReviewType && (
              <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-800/40 space-y-3">
                <div className="flex items-center gap-2 text-violet-300 text-xs font-bold">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span>New Customer Rating</span>
                </div>
                <div className="pt-1 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedNotif(null);
                      onNav?.("reviews");
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Star size={14} />
                    <span>View All Reviews</span>
                  </button>
                </div>
              </div>
            )}

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedNotif(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
              {selectedNotif.link && (
                <button
                  type="button"
                  onClick={() => {
                    const targetLink = selectedNotif.link;
                    setSelectedNotif(null);
                    onNav?.(targetLink);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-950/50 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Go to {selectedNotif.link}</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
