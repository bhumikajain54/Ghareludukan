import React, { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Bell,
  Lock,
  Sliders,
  CheckCircle2,
  Save,
  AlertTriangle,
  Zap,
  Globe,
  FileCheck,
} from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("rules"); // 'rules' | 'fraud' | 'notifs' | 'security'
  const [saved, setSaved] = useState(false);

  // Settings State
  const [gstMandatory, setGstMandatory] = useState(true);
  const [fssaiMandatory, setFssaiMandatory] = useState(true);
  const [geoPhotoMandatory, setGeoPhotoMandatory] = useState(true);
  const [riderPoliceCheck, setRiderPoliceCheck] = useState(true);
  const [riderRcMandatory, setRiderRcMandatory] = useState(true);

  const [velocityThreshold, setVelocityThreshold] = useState("5");
  const [autoFreezeCritical, setAutoFreezeCritical] = useState(true);
  const [geoFencingRadiusKm, setGeoFencingRadiusKm] = useState("15");

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [instantFraudPush, setInstantFraudPush] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Settings size={24} className="text-cyan-400" />
            <span>Platform Governance & System Settings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure statutory verification criteria, fraud mitigation sensitivity, and administrative alert protocols.
          </p>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold animate-fade-in self-start sm:self-auto">
            <CheckCircle2 size={14} />
            <span>Settings Saved</span>
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: "rules", label: "Merchant & Rider KYC Rules", icon: FileCheck },
          { id: "fraud", label: "Fraud & Anomaly Triggers", icon: AlertTriangle },
          { id: "notifs", label: "Alerts & Notifications", icon: Bell },
          { id: "security", label: "Audit & Security Controls", icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-6">
        {activeTab === "rules" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <ShieldCheck size={16} className="text-cyan-400" />
                <span>Merchant Shop Onboarding Requirements</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Statutory criteria enforced before a store can accept hyperlocal customer orders.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Mandatory GSTIN Validation</span>
                  <span className="text-[11px] text-slate-500">Auto-verify GSTIN with national tax portal for all commercial shops</span>
                </div>
                <input
                  type="checkbox"
                  checked={gstMandatory}
                  onChange={(e) => setGstMandatory(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Mandatory FSSAI Food License</span>
                  <span className="text-[11px] text-slate-500">Enforce valid FSSAI certificate for Bakeries, Sweet shops & Grocery marts</span>
                </div>
                <input
                  type="checkbox"
                  checked={fssaiMandatory}
                  onChange={(e) => setFssaiMandatory(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Geotagged Storefront Photo Verification</span>
                  <span className="text-[11px] text-slate-500">Require physical gully shop exterior photo with matching GPS location</span>
                </div>
                <input
                  type="checkbox"
                  checked={geoPhotoMandatory}
                  onChange={(e) => setGeoPhotoMandatory(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2 mb-3">
                <ShieldCheck size={16} className="text-cyan-400" />
                <span>Delivery Partner KYC Criteria</span>
              </h2>

              <div className="space-y-3 text-xs text-slate-300">
                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-200 block">Third-Party Background Check Clearance</span>
                    <span className="text-[11px] text-slate-500">Require certified background screening before rider activation</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={riderPoliceCheck}
                    onChange={(e) => setRiderPoliceCheck(e.target.checked)}
                    className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-200 block">Valid Vehicle Registration Certificate (RC)</span>
                    <span className="text-[11px] text-slate-500">Require vehicle registration document for all 2-wheelers</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={riderRcMandatory}
                    onChange={(e) => setRiderRcMandatory(e.target.checked)}
                    className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "fraud" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <AlertTriangle size={16} className="text-rose-400" />
                <span>Fraud Anomaly & Velocity Thresholds</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automated security rules to detect order abuse, price manipulation, and location spoofing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="font-bold text-slate-200 block">High-Velocity Order Alert Limit</label>
                <p className="text-[11px] text-slate-500">Number of orders per customer in 10 minutes before triggering alert.</p>
                <input
                  type="number"
                  value={velocityThreshold}
                  onChange={(e) => setVelocityThreshold(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="font-bold text-slate-200 block">Maximum Delivery Geofence Radius</label>
                <p className="text-[11px] text-slate-500">Outer radius limit in kilometers for hyperlocal shop delivery dispatch.</p>
                <input
                  type="number"
                  value={geoFencingRadiusKm}
                  onChange={(e) => setGeoFencingRadiusKm(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
            </div>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
              <div>
                <span className="font-bold text-slate-200 block">Auto-Suspend Critical Anomaly Triggers</span>
                <span className="text-[11px] text-slate-500">Temporarily freeze accounts triggering critical risk score (&gt;95/100)</span>
              </div>
              <input
                type="checkbox"
                checked={autoFreezeCritical}
                onChange={(e) => setAutoFreezeCritical(e.target.checked)}
                className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
              />
            </label>
          </div>
        )}

        {activeTab === "notifs" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Bell size={16} className="text-cyan-400" />
                <span>Admin Notification Dispatch Rules</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure real-time communication channels for platform operational incidents.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Email Notifications for New Merchant Submissions</span>
                  <span className="text-[11px] text-slate-500">Send instant email digest when a new shop uploads onboarding paperwork</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Critical Fraud Alert Push Notifications</span>
                  <span className="text-[11px] text-slate-500">Send high-priority browser & header alerts for urgent security events</span>
                </div>
                <input
                  type="checkbox"
                  checked={instantFraudPush}
                  onChange={(e) => setInstantFraudPush(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Lock size={16} className="text-cyan-400" />
                <span>Audit Authority & Platform Encryption</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review immutable log encryption standards and administrator session security.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Audit Trail Hashing:</span>
                <span className="font-mono text-cyan-400 font-bold">SHA-256 Block-Linked</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Session Timeout:</span>
                <span className="text-slate-200 font-bold">30 Minutes Idle Auto-Lock</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Enforce Multi-Factor Authentication:</span>
                <span className="text-emerald-400 font-bold">ENABLED (Mandatory for Admin)</span>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/30 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Save size={14} />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>
    </div>
  );
}
