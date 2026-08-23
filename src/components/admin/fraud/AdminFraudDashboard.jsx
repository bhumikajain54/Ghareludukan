import React, { useState } from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, ShieldOff, Eye, Search } from "lucide-react";
import { MOCK_FRAUD_ALERTS } from "../AdminConstants";

export default function AdminFraudDashboard({ fraudAlerts = MOCK_FRAUD_ALERTS }) {
  const [alerts, setAlerts] = useState(fraudAlerts);
  const [selectedCase, setSelectedCase] = useState(null);

  const handleResolveAlert = (alertId, newStatus) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: newStatus } : a))
    );
    setSelectedCase(null);
  };

  return (
    <div className="space-y-6 gd-rise w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <ShieldAlert size={24} className="text-rose-400" />
          <span>Fraud Prevention & Investigation Desk</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Real-time anomaly triggers: velocity spikes, GPS location spoofing, coupon multi-accounting, and merchant price tampering.
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                    alert.severity === "CRITICAL"
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
              <p className="text-[11px] text-cyan-400 mt-1 font-bold">Target: {alert.targetName} ({alert.targetType})</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400">
                Status: <span className="text-white">{alert.status}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleResolveAlert(alert.id, "CLEARED")}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer"
                >
                  Exonerate / Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => handleResolveAlert(alert.id, "SUSPENDED")}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white cursor-pointer shadow-md shadow-rose-600/20"
                >
                  Freeze Account / Suspend
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
