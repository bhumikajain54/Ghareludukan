import React from "react";
import {
  Bell, ShoppingCart, Package, AlertTriangle, IndianRupee,
  Wallet, Headphones, Star, CheckCircle2, Settings, ChevronRight, CheckCheck,
} from "lucide-react";
import { MOCK_SELLER_NOTIFICATIONS, MOCK_NOTIFICATIONS } from "../SellerConstants";

const TYPE_ICON = {
  NEW_ORDER: ShoppingCart,
  PAYMENT: IndianRupee,
  LOW_STOCK: AlertTriangle,
  SETTLEMENT: Wallet,
  ORDER_CANCELLED: Package,
  REVIEW: Star,
  DEFAULT: Bell,
};

const TYPE_COLOR = {
  NEW_ORDER: "bg-indigo-500/15 text-indigo-400",
  PAYMENT: "bg-emerald-500/15 text-emerald-400",
  LOW_STOCK: "bg-amber-500/15 text-amber-400",
  SETTLEMENT: "bg-violet-500/15 text-violet-400",
  ORDER_CANCELLED: "bg-red-500/15 text-red-400",
  REVIEW: "bg-amber-500/15 text-amber-400",
  DEFAULT: "bg-slate-500/15 text-slate-400",
};

export default function SellerNotifications({
  notifications = MOCK_SELLER_NOTIFICATIONS || MOCK_NOTIFICATIONS,
  unreadCount,
  onMarkAsRead,
  onMarkAllRead,
  onNav,
}) {
  const dynamicUnread =
    typeof unreadCount === "number"
      ? unreadCount
      : notifications.filter((n) => !n.isRead && n.unread !== false).length;

  const handleCardClick = (notif) => {
    const isUnread = !notif.isRead && notif.unread !== false;
    if (isUnread && onMarkAsRead) {
      onMarkAsRead(notif.id);
    }
    if (notif.link) {
      onNav?.(notif.link);
    }
  };

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
            className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            <CheckCheck size={14} />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl text-slate-600">
          <Bell size={40} className="mx-auto mb-4 opacity-30" />
          <div className="text-sm font-bold">No notifications</div>
          <div className="text-xs mt-1">You're all caught up.</div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          {notifications.map((notif, i) => {
            const isUnread = !notif.isRead && notif.unread !== false;
            const Icon = TYPE_ICON[notif.type] || TYPE_ICON.DEFAULT;
            const color = TYPE_COLOR[notif.type] || TYPE_COLOR.DEFAULT;

            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors ticket-row-hover ${
                  i < notifications.length - 1 ? "border-b border-slate-800/60" : ""
                } ${isUnread ? "bg-indigo-600/5" : "opacity-80 hover:opacity-100"}`}
                onClick={() => handleCardClick(notif)}
              >
                {/* Unread dot */}
                <div className="relative flex-shrink-0 mt-0.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon size={17} />
                  </div>
                  {isUnread && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-indigo-500 rounded-full ring-2 ring-slate-900 shadow-sm" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm ${isUnread ? "font-extrabold text-slate-100" : "font-semibold text-slate-300"}`}>
                    {notif.title}
                  </div>
                  <div className={`text-xs mt-0.5 leading-relaxed ${isUnread ? "text-slate-300" : "text-slate-400"}`}>
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
                  <ChevronRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Notification Settings Link */}
      <button
        onClick={() => onNav?.("settings")}
        className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-left cursor-pointer"
      >
        <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center">
          <Settings size={15} className="text-slate-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-slate-300">Notification Settings</div>
          <div className="text-xs text-slate-500">Manage order, payment and promotional alerts</div>
        </div>
        <ChevronRight size={14} className="text-slate-600" />
      </button>
    </div>
  );
}
