import React, { useState } from "react";
import {
  Settings, Bell, ShieldCheck, Lock, Smartphone,
  Volume2, CheckCircle2, Save, Store, Clock,
  CreditCard, Key, AlertTriangle, ChevronRight,
} from "lucide-react";

export default function SellerSettings({ onNav }) {
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    autoAcceptOrders: true,
    soundAlerts: true,
    whatsappUpdates: true,
    smsAlerts: false,
    maxConcurrentOrders: "15",
    preparationTimeBuffer: "10",
    payoutUpi: "rajtraders@hdfcbank",
    twoFactorAuth: true,
    autoCloseStoreAtNight: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Merchant & Account Settings</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Configure order acceptance rules, alert preferences, payout accounts and security
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNav?.("shop-profile")}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            Shop Profile
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950/40 cursor-pointer"
          >
            <Save size={14} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold gd-rise">
          <CheckCircle2 size={16} />
          <span>All merchant settings and preferences have been successfully updated!</span>
        </div>
      )}

      {/* 1. Order Acceptance & Operations */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-md">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            <Store size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Order Automation & Operational Limits</h2>
            <p className="text-xs text-slate-400">Manage how fast incoming orders are processed</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-200">Auto-Accept Incoming Orders</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Automatically confirm orders within serviceable 3.5 km delivery radius
              </div>
            </div>
            <button
              onClick={() => handleToggle("autoAcceptOrders")}
              className={`w-12 h-6.5 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${
                settings.autoAcceptOrders ? "bg-indigo-600" : "bg-slate-800 border border-slate-700"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.autoAcceptOrders ? "translate-x-6.5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-200">Auto-Close Shop at 10:00 PM</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Automatically switches shop toggle to Offline when working hours end
              </div>
            </div>
            <button
              onClick={() => handleToggle("autoCloseStoreAtNight")}
              className={`w-12 h-6.5 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${
                settings.autoCloseStoreAtNight ? "bg-indigo-600" : "bg-slate-800 border border-slate-700"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.autoCloseStoreAtNight ? "translate-x-6.5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Max Concurrent Live Orders
              </label>
              <input
                type="number"
                value={settings.maxConcurrentOrders}
                onChange={(e) => setSettings({ ...settings, maxConcurrentOrders: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500/50"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Prevents store overwhelm during rush hours</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Prep Time Buffer (minutes)
              </label>
              <input
                type="number"
                value={settings.preparationTimeBuffer}
                onChange={(e) => setSettings({ ...settings, preparationTimeBuffer: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500/50"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Added to delivery partner ETA</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Notification & Sound Preferences */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-md">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            <Volume2 size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Alerts & Sound Notifications</h2>
            <p className="text-xs text-slate-400">Ring tones, push notices, and customer communication channels</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-200">Loud Ringtone on New Order</div>
              <div className="text-xs text-slate-400 mt-0.5">Plays audio chime continuously until order is accepted</div>
            </div>
            <button
              onClick={() => handleToggle("soundAlerts")}
              className={`w-12 h-6.5 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${
                settings.soundAlerts ? "bg-indigo-600" : "bg-slate-800 border border-slate-700"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.soundAlerts ? "translate-x-6.5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-200">WhatsApp Instant Order Receipts</div>
              <div className="text-xs text-slate-400 mt-0.5">Send packing slips and customer numbers directly to WhatsApp</div>
            </div>
            <button
              onClick={() => handleToggle("whatsappUpdates")}
              className={`w-12 h-6.5 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${
                settings.whatsappUpdates ? "bg-indigo-600" : "bg-slate-800 border border-slate-700"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.whatsappUpdates ? "translate-x-6.5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Payout & Bank Verification */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-md">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            <CreditCard size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Default Payout & Bank Details</h2>
            <p className="text-xs text-slate-400">Weekly bank transfers and instant settlement destination</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Primary Settlement VPA / UPI ID
            </label>
            <input
              type="text"
              value={settings.payoutUpi}
              onChange={(e) => setSettings({ ...settings, payoutUpi: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500/50 font-mono"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-200">Verified Bank Account: HDFC Bank (A/C ...8821)</div>
              <div className="text-[11px] text-slate-400">IFSC: HDFC0001245 · Raj Traders</div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
              Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
