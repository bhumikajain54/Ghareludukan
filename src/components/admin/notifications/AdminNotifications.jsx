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
        {notifications.length === 0 ? (
          <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 mx-auto flex items-center justify-center border border-cyan-500/20">
              <Bell size={28} />
            </div>
            <h3 className="text-base font-extrabold text-white">No Notifications</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You are all caught up! No operational alerts require your attention at this time.
            </p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                !n.isRead
                  ? "bg-slate-900/90 border-cyan-500/40 shadow-md shadow-cyan-950/20 hover:border-cyan-400/60"
                  : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700"
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

              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => {
                  onMarkAsRead?.(n.id);
                  if (n.link) onNav?.(n.link);
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-xs font-bold ${!n.isRead ? "text-white" : "text-slate-300"}`}>
                      {n.title}
                    </h3>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.body}</p>
              </div>

              <div className="shrink-0 pt-0.5">
                {!n.isRead ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAsRead?.(n.id);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-cyan-400 border border-slate-700 cursor-pointer transition-all"
                  >
                    Mark Read
                  </button>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded-md bg-slate-800/50">
                    Read
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
