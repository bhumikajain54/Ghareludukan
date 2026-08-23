import React from "react";
import { Bell, CheckCheck, Store, ShieldAlert, Bike, Clock } from "lucide-react";
import { MOCK_ADMIN_NOTIFICATIONS } from "../AdminConstants";

export default function AdminNotifications({
  notifications = MOCK_ADMIN_NOTIFICATIONS,
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
            <span>Platform Operational Notifications</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time critical alerts requiring administrative attention.
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
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              onMarkAsRead?.(n.id);
              if (n.link) onNav?.(n.link);
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              !n.isRead
                ? "bg-slate-900/90 border-cyan-500/30 shadow-md"
                : "bg-slate-900/40 border-slate-800 text-slate-400"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                n.type === "fraud"
                  ? "bg-rose-500/10 text-rose-400"
                  : n.type === "approval"
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "bg-indigo-500/10 text-indigo-400"
              }`}
            >
              {n.type === "fraud" ? <ShieldAlert size={18} /> : n.type === "approval" ? <Store size={18} /> : <Bike size={18} />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white">{n.title}</h3>
                <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
