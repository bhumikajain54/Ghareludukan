import React, { useState } from "react";
import {
  Bell, CheckCheck, ShoppingBag, CreditCard, Tag, RefreshCw,
  Truck, Headphones, ChevronRight, Sparkles, X, Copy, Check,
  ArrowRight, ExternalLink, ShieldCheck, Clock, Store, MapPin
} from "lucide-react";
import confetti from "canvas-confetti";
import { NOTIF_TYPE_COLOR } from "../CustomerConstants";

const ICON_MAP = {
  order: ShoppingBag,
  ORDER: ShoppingBag,
  NEW_ORDER: ShoppingBag,
  payment: CreditCard,
  PAYMENT: CreditCard,
  offer: Tag,
  OFFER: Tag,
  refund: RefreshCw,
  REFUND: RefreshCw,
  delivery: Truck,
  DELIVERY: Truck,
  support: Headphones,
  SUPPORT: Headphones,
};

export default function CustomerNotifications({
  notifications = [],
  unreadCount,
  onMarkAsRead,
  onMarkAllRead,
  onNav,
}) {
  const [filter, setFilter] = useState("ALL");
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Dynamic calculation derived from source of truth
  const dynamicUnread =
    typeof unreadCount === "number"
      ? unreadCount
      : notifications.filter((n) => !n.isRead && n.unread !== false).length;

  const handleCardClick = (item) => {
    // If notification is unread, mark it as read immediately
    const isUnread = !item.isRead && item.unread !== false;
    if (isUnread && onMarkAsRead) {
      onMarkAsRead(item.id);
    }
    // Open detailed popup modal
    setSelectedNotif(item);
    setCopiedCode(false);
  };

  const handleCopyCoupon = (code) => {
    if (!code) return;
    try {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
      setTimeout(() => setCopiedCode(false), 2500);
    } catch (e) {
      console.error("Clipboard copy error:", e);
    }
  };

  const filtered = notifications.filter((n) => {
    const isUnread = !n.isRead && n.unread !== false;
    const typeStr = (n.type || "").toLowerCase();

    if (filter === "ALL") return true;
    if (filter === "UNREAD") return isUnread;
    if (filter === "ORDER") return typeStr === "order" || typeStr === "new_order" || typeStr === "delivery";
    if (filter === "OFFER") return typeStr === "offer";
    if (filter === "REFUND") return typeStr === "refund";
    return true;
  });

  // Extract metadata from notification for modal rendering
  const getNotificationDetails = (item) => {
    if (!item) return {};
    const fullText = `${item.title || ""} ${item.message || ""} ${item.body || ""}`;
    
    // Extract Order ID (e.g. #GLD10245, GLD20513)
    const orderMatch = fullText.match(/#?(GLD[A-Z0-9]+)/i);
    const orderId = orderMatch ? orderMatch[1].toUpperCase() : null;

    // Extract Coupon Code (e.g. SAVE20, FIRST50)
    const couponMatch = fullText.match(/code\s+([A-Z0-9]+)/i);
    const couponCode = couponMatch ? couponMatch[1].toUpperCase() : null;

    // Extract Amount (e.g. ₹825, ₹460.00)
    const amountMatch = fullText.match(/(₹\s*[\d,]+(\.\d{2})?)/);
    const amount = amountMatch ? amountMatch[1] : null;

    // Check for specific shop mentions
    const shopMatch = fullText.match(/(?:from|by)\s+([A-Za-z0-9\s&]+?)(?:\s+has|\s+is|\s+this|\.|\,|$)/i);
    const shopName = shopMatch ? shopMatch[1].trim() : null;

    const typeStr = (item.type || "").toLowerCase();
    const isOrderType = typeStr === "order" || typeStr === "delivery" || typeStr === "new_order" || fullText.toLowerCase().includes("order");
    const isOfferType = typeStr === "offer" || !!couponCode || fullText.toLowerCase().includes("coupon") || fullText.toLowerCase().includes("off");
    const isRefundType = typeStr === "refund" || fullText.toLowerCase().includes("refund");
    const isPaymentType = typeStr === "payment" || fullText.toLowerCase().includes("paid via") || fullText.toLowerCase().includes("payment");

    return {
      orderId,
      couponCode,
      amount,
      shopName,
      isOrderType,
      isOfferType,
      isRefundType,
      isPaymentType,
    };
  };

  const modalMeta = selectedNotif ? getNotificationDetails(selectedNotif) : {};
  const ModalIcon = selectedNotif
    ? ICON_MAP[selectedNotif.type] || ICON_MAP[(selectedNotif.type || "").toUpperCase()] || Bell
    : Bell;
  const modalBadgeStyle = selectedNotif
    ? NOTIF_TYPE_COLOR[(selectedNotif.type || "").toUpperCase()] ||
      NOTIF_TYPE_COLOR[selectedNotif.type] ||
      "bg-cyan-500/15 text-cyan-400"
    : "bg-cyan-500/15 text-cyan-400";

  return (
    <div className="gd-rise space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Notifications</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time shop status updates, delivery alerts, wallet credits & deals
          </p>
        </div>
        {dynamicUnread > 0 && (
          <button
            onClick={() => onMarkAllRead?.()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 text-xs font-bold transition-all shadow-md cursor-pointer hover:border-cyan-500/40"
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
          { id: "ORDER", label: "Orders" },
          { id: "OFFER", label: "Offers" },
          { id: "REFUND", label: "Refunds" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex-shrink-0 cursor-pointer ${
              filter === f.id
                ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-md shadow-cyan-950/30"
                : "seller-tab-inactive bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <Bell size={32} className="text-slate-600 mx-auto" />
            <div className="text-sm font-bold text-slate-400">
              {filter === "UNREAD" ? "No unread notifications" : "No notifications here"}
            </div>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              {filter === "UNREAD"
                ? "You are all caught up! All your previous notifications remain available under All."
                : "You will receive real-time updates as local shops prepare and dispatch your orders."}
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const isUnread = !item.isRead && item.unread !== false;
            const Icon = ICON_MAP[item.type] || ICON_MAP[(item.type || "").toUpperCase()] || Bell;
            const badgeStyle =
              NOTIF_TYPE_COLOR[(item.type || "").toUpperCase()] ||
              NOTIF_TYPE_COLOR[item.type] ||
              "bg-cyan-500/15 text-cyan-400";

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className={`p-4 rounded-2xl bg-slate-900 border transition-all flex items-start gap-3.5 relative overflow-hidden group cursor-pointer hover:scale-[1.008] hover:border-cyan-500/50 hover:shadow-lg ${
                  isUnread
                    ? "border-cyan-500/40 shadow-lg shadow-cyan-950/25 bg-slate-900"
                    : "border-slate-800/80 opacity-80 hover:opacity-100 bg-slate-900/90"
                }`}
              >
                {/* Visual Unread Indicator Dot */}
                {isUnread && (
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400 animate-pulse" />
                )}

                {/* Icon Badge */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform ${badgeStyle}`}
                >
                  <Icon size={18} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-sm truncate ${
                        isUnread
                          ? "font-extrabold text-white"
                          : "font-bold text-slate-300"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${isUnread ? "text-slate-300 font-medium" : "text-slate-400"}`}>
                    {item.message || item.body}
                  </p>
                  <div className="text-[10px] text-slate-500 font-mono mt-2 flex items-center gap-2">
                    <span>{item.timestamp || item.time}</span>
                    {isUnread ? (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                        NEW
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-500">Read</span>
                    )}
                  </div>
                </div>

                {/* Arrow icon indicating clickability */}
                <div className="self-center p-1.5 rounded-lg text-slate-500 group-hover:text-cyan-400 group-hover:bg-slate-800 transition-colors">
                  <ChevronRight size={16} />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ─── Detailed Notification Interactive Popup / Modal ─── */}
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
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500" />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pt-1">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${modalBadgeStyle}`}>
                  <ModalIcon size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                      {selectedNotif.type || "Notification"}
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

            {/* Main Notification Body Box */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-slate-200 text-sm leading-relaxed font-medium">
              {selectedNotif.message || selectedNotif.body}
            </div>

            {/* Contextual Rich Content Sections */}
            {/* 1. If notification is an Order / Delivery / Payment notification */}
            {modalMeta.isOrderType && (
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Associated Order:</span>
                  <span className="font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-lg border border-cyan-700/50">
                    {modalMeta.orderId ? `#${modalMeta.orderId}` : "Order Update"}
                  </span>
                </div>
                {modalMeta.shopName && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Gully Store:</span>
                    <span className="font-bold text-slate-200 flex items-center gap-1">
                      <Store size={13} className="text-cyan-400" /> {modalMeta.shopName}
                    </span>
                  </div>
                )}
                {modalMeta.amount && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Order Total / Paid:</span>
                    <span className="font-mono font-black text-emerald-400">
                      {modalMeta.amount}
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-cyan-800/30 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedNotif(null);
                      if (modalMeta.orderId) {
                        onNav?.("order-detail", { orderId: modalMeta.orderId });
                      } else {
                        onNav?.("orders");
                      }
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-950 cursor-pointer"
                  >
                    <ShoppingBag size={14} />
                    <span>Track & View Order</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNotif(null);
                      onNav?.("orders");
                    }}
                    className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    All Orders
                  </button>
                </div>
              </div>
            )}

            {/* 2. If notification is an Offer / Coupon */}
            {modalMeta.isOfferType && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <Sparkles size={14} />
                  <span>Exclusive Gully Discount Available</span>
                </div>
                
                {modalMeta.couponCode && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-dashed border-amber-500/50 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                        Promo Code
                      </span>
                      <span className="font-mono text-base font-black text-amber-300 tracking-wider">
                        {modalMeta.couponCode}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCoupon(modalMeta.couponCode)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        copiedCode
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-slate-950"
                      }`}
                    >
                      {copiedCode ? (
                        <>
                          <Check size={13} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedNotif(null);
                      onNav?.("coupons");
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Tag size={14} />
                    <span>View All Offers & Coupons</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNotif(null);
                      onNav?.("home");
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            )}

            {/* 3. If notification is a Refund or Payment update */}
            {modalMeta.isRefundType && (
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Refund Status:</span>
                  <span className="font-bold text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded-lg border border-purple-700/50 flex items-center gap-1">
                    <ShieldCheck size={13} /> Credited to Wallet
                  </span>
                </div>
                {modalMeta.amount && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Amount Credited:</span>
                    <span className="font-mono text-base font-black text-emerald-400">
                      {modalMeta.amount}
                    </span>
                  </div>
                )}
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedNotif(null);
                      onNav?.("wallet");
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <RefreshCw size={14} />
                    <span>Check Wallet Balance & History</span>
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
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-950/50 flex items-center gap-1.5 cursor-pointer"
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
