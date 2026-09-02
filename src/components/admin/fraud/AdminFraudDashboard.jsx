import React, { useState } from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, ShieldOff, Eye, Search, Filter } from "lucide-react";
import { MOCK_FRAUD_ALERTS } from "../AdminConstants";

export default function AdminFraudDashboard({
  fraudAlerts = MOCK_FRAUD_ALERTS,
  onResolveAlert,
}) {
  const [filter, setFilter] = useState("all"); // 'all' | 'pending' | 'resolved'
  const [confirmCase, setConfirmCase] = useState(null); // { alert, action: 'SUSPENDED' | 'CLEARED' }
  const [note, setNote] = useState("");

  const pendingCount = fraudAlerts.filter(
    (a) => a.status !== "SUSPENDED" && a.status !== "CLEARED"
  ).length;

  const filteredAlerts = fraudAlerts.filter((a) => {
    const isResolved = a.status === "SUSPENDED" || a.status === "CLEARED";
    if (filter === "pending") return !isResolved;
    if (filter === "resolved") return isResolved;
    return true;
  });

  const handleConfirmAction = () => {
    if (!confirmCase) return;
    onResolveAlert?.(
      confirmCase.alert.id,
      confirmCase.action,
      note || (confirmCase.action === "SUSPENDED" ? "Account suspended due to policy violation." : "Exonerated after investigation.")
    );
    setConfirmCase(null);
    setNote("");
  };

  return (
    <div className="space-y-6 gd-rise w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShieldAlert size={24} className="text-rose-400" />
            <span>Fraud Prevention & Investigation Desk</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time anomaly triggers: velocity spikes, GPS location spoofing, coupon multi-accounting, and merchant price tampering.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "all" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            All Alerts ({fraudAlerts.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "pending" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("resolved")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "resolved" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            Resolved ({fraudAlerts.length - pendingCount})
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-base font-extrabold text-white">No Alerts in this Category</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              All fraud and anomaly triggers have been investigated and actioned appropriately.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isSuspended = alert.status === "SUSPENDED";
            const isCleared = alert.status === "CLEARED";
            const isResolved = isSuspended || isCleared;

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-3xl border space-y-3 shadow-lg transition-all ${
                  isSuspended
                    ? "bg-rose-950/20 border-rose-800/50"
                    : isCleared
                    ? "bg-slate-900/60 border-emerald-900/40 opacity-80"
                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        isSuspended
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                          : isCleared
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : alert.severity === "CRITICAL"
                          ? "bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse"
                          : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {alert.severity} RISK ({alert.riskScore}/100)
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-semibold">{alert.id}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{alert.timestamp}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{alert.type.replace(/_/g, " ")}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">{alert.details}</p>
                  <p className="text-[11px] text-cyan-400 mt-1 font-bold">
                    Target: {alert.targetName} ({alert.targetType})
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400">Status:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isSuspended
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : isCleared
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-200"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isResolved ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">
                          {isSuspended ? "✓ Account Suspended & Blocked" : "✓ Case Exonerated & Closed"}
                        </span>
                        <button
                          type="button"
                          onClick={() => onResolveAlert?.(alert.id, "UNDER_INVESTIGATION", "Re-opened for investigation")}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 cursor-pointer transition-all"
                        >
                          Re-open Case
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmCase({ alert, action: "CLEARED" });
                            setNote("Exonerated after reviewing order velocity & location logs.");
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer transition-all"
                        >
                          Exonerate / Dismiss
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmCase({ alert, action: "SUSPENDED" });
                            setNote("Account frozen & suspended due to high-risk anomaly trigger.");
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white cursor-pointer shadow-md shadow-rose-600/20 transition-all"
                        >
                          Freeze Account / Suspend
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Audit Confirmation Modal */}
      {confirmCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <ShieldAlert size={18} className={confirmCase.action === "SUSPENDED" ? "text-rose-400" : "text-emerald-400"} />
              <span>
                {confirmCase.action === "SUSPENDED" ? "Freeze Account & Suspend Target" : "Dismiss Alert / Exonerate"}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Please enter an immutable audit note for <span className="text-white font-bold">{confirmCase.alert.targetName}</span> ({confirmCase.alert.id}).
            </p>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter audit rationale..."
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmCase(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer ${
                  confirmCase.action === "SUSPENDED"
                    ? "bg-rose-600 hover:bg-rose-500 shadow-rose-600/30"
                    : "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30"
                }`}
              >
                Confirm Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

