import React from "react";
import { Bell, CheckCheck, Bike, Wallet, AlertTriangle, ShieldCheck } from "lucide-react";

export default function DeliveryNotifications({
  notifications = [],
  unreadCount = 0,
  onMarkAsRead,
  onMarkAllRead,
  onNav,
}) {
  return (
    <div className="space-y-6 gd-rise w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Bell size={24} className="text-cyan-400" />
            <span>Rider Notifications</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread updates` : "All caught up!"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
          >
            <CheckCheck size={14} />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 rounded-3xl bg-slate-900/50 border border-slate-800 text-center space-y-2">
            <Bell size={32} className="mx-auto text-slate-600" />
            <p className="text-sm font-bold text-slate-300">No notifications</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onMarkAsRead(n.id);
                if (n.link) onNav(n.link);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                !n.isRead
                  ? "bg-slate-900/90 border-cyan-500/30 shadow-md"
                  : "bg-slate-900/40 border-slate-800 text-slate-400"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  n.type === "job"
                    ? "bg-indigo-500/10 text-indigo-400"
                    : n.type === "payout"
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {n.type === "job" ? <Bike size={18} /> : n.type === "payout" ? <Wallet size={18} /> : <AlertTriangle size={18} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white">{n.title}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
