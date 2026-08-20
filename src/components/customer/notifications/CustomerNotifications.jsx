import React, { useState } from "react";
import {
  Bell, CheckCheck, ShoppingBag, CreditCard, Tag, RefreshCw,
  Truck, Headphones, ChevronRight, Sparkles,
} from "lucide-react";
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

  return (
    <div className="gd-rise space-y-5 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">Notifications</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time shop status updates, delivery alerts & deals
          </p>
        </div>
        {dynamicUnread > 0 && (
          <button
            onClick={() => onMarkAllRead?.()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 text-xs font-bold transition-all shadow-md cursor-pointer hover:border-cyan-500/40"
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
                className={`p-4 rounded-2xl bg-slate-900 border transition-all flex items-start gap-3.5 relative overflow-hidden group cursor-pointer ${
                  isUnread
                    ? "border-cyan-500/40 shadow-lg shadow-cyan-950/25 bg-slate-900"
                    : "border-slate-800/80 opacity-75 hover:opacity-100 bg-slate-900/90"
                }`}
              >
                {/* Visual Unread Indicator Dot */}
                {isUnread && (
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400 animate-pulse" />
                )}

                {/* Icon Badge */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${badgeStyle}`}
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

                {/* Direct quick action if linked */}
                {item.link && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(item);
                      onNav?.(item.link);
                    }}
                    className="self-center p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title={`Go to ${item.link}`}
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
