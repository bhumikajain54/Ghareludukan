import React, { useState } from "react";
import {
  Settings,
  Navigation,
  Bell,
  Volume2,
  Shield,
  CreditCard,
  Sliders,
  CheckCircle2,
  Save,
  MapPin,
  Bike,
  Smartphone,
} from "lucide-react";
import { MOCK_DELIVERY_RIDER } from "../DeliveryConstants";

export default function DeliverySettings({ rider = MOCK_DELIVERY_RIDER, onNav }) {
  const [activeTab, setActiveTab] = useState("delivery"); // 'delivery' | 'navigation' | 'alerts' | 'payout'
  const [saved, setSaved] = useState(false);

  // Delivery Preferences
  const [maxRadiusKm, setMaxRadiusKm] = useState("10");
  const [autoAcceptExpress, setAutoAcceptExpress] = useState(false);
  const [allowCodOrders, setAllowCodOrders] = useState(true);
  const [maxCodLimit, setMaxCodLimit] = useState("5000");

  // Navigation Preferences
  const [navApp, setNavApp] = useState("google_maps");
  const [autoLaunchNav, setAutoLaunchNav] = useState(true);
  const [voiceGuidance, setVoiceGuidance] = useState(true);

  // Alerts & Sound
  const [loudChime, setLoudChime] = useState(true);
  const [vibrationAlert, setVibrationAlert] = useState(true);
  const [batteryOptimization, setBatteryOptimization] = useState(true);

  // Payout Preferences
  const [payoutCycle, setPayoutCycle] = useState("daily");
  const [autoTransfer, setAutoTransfer] = useState(true);

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
            <span>Rider Preferences & Delivery Settings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure order acceptance radius, GPS navigation app, loud request chimes, and automatic daily earnings transfer.
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
          { id: "delivery", label: "Job Dispatch & Radius", icon: Bike },
          { id: "navigation", label: "Maps & GPS Navigation", icon: Navigation },
          { id: "alerts", label: "Order Audio & Alerts", icon: Volume2 },
          { id: "payout", label: "Payout Preferences", icon: CreditCard },
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
        {activeTab === "delivery" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Bike size={16} className="text-cyan-400" />
                <span>Job Pool & Delivery Radius</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Set geographical boundaries and cash handling limits for delivery requests.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="font-bold text-slate-200 block">Maximum Delivery Radius (km)</label>
                <p className="text-[11px] text-slate-500">Only receive orders within this distance from your current location.</p>
                <input
                  type="number"
                  value={maxRadiusKm}
                  onChange={(e) => setMaxRadiusKm(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="font-bold text-slate-200 block">Max Cash on Delivery (COD) Limit (₹)</label>
                <p className="text-[11px] text-slate-500">Maximum cash amount allowed per order bag before remittance.</p>
                <input
                  type="number"
                  value={maxCodLimit}
                  onChange={(e) => setMaxCodLimit(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Auto-Accept Express Nearby Deliveries (&lt;2 km)</span>
                  <span className="text-[11px] text-slate-500">Automatically accept instant 10-minute grocery runs nearby</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoAcceptExpress}
                  onChange={(e) => setAutoAcceptExpress(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Accept Cash on Delivery (COD) Orders</span>
                  <span className="text-[11px] text-slate-500">Receive cash-based deliveries from local merchants</span>
                </div>
                <input
                  type="checkbox"
                  checked={allowCodOrders}
                  onChange={(e) => setAllowCodOrders(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === "navigation" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Navigation size={16} className="text-cyan-400" />
                <span>Map Provider & Route Guidance</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure GPS routing app and automatic turn-by-turn launch settings.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="font-bold text-slate-200 block">Preferred Navigation App</label>
                <select
                  value={navApp}
                  onChange={(e) => setNavApp(e.target.value)}
                  className="w-full sm:w-64 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium"
                >
                  <option value="google_maps">Google Maps (Recommended)</option>
                  <option value="mapmyindia">MapMyIndia Mappls</option>
                  <option value="apple_maps">Apple Maps / Device Default</option>
                </select>
              </div>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Auto-Launch Maps Upon Order Pickup</span>
                  <span className="text-[11px] text-slate-500">Directly open turn-by-turn route to customer location when package is collected</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoLaunchNav}
                  onChange={(e) => setAutoLaunchNav(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Voice Route Prompts in Hindi / Local Dialect</span>
                  <span className="text-[11px] text-slate-500">Audio navigation announcements for safer riding</span>
                </div>
                <input
                  type="checkbox"
                  checked={voiceGuidance}
                  onChange={(e) => setVoiceGuidance(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Volume2 size={16} className="text-cyan-400" />
                <span>Duty Audio & Order Alert Volume</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Ensure you never miss high-value order assignments while riding.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Loud Ring Chime for Incoming Orders</span>
                  <span className="text-[11px] text-slate-500">Play distinctive loud alarm sound even in noisy traffic environments</span>
                </div>
                <input
                  type="checkbox"
                  checked={loudChime}
                  onChange={(e) => setLoudChime(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Continuous Vibration Pattern</span>
                  <span className="text-[11px] text-slate-500">Vibrate phone in pocket during order countdown timer (30s)</span>
                </div>
                <input
                  type="checkbox"
                  checked={vibrationAlert}
                  onChange={(e) => setVibrationAlert(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Battery Saver Intelligent GPS Throttling</span>
                  <span className="text-[11px] text-slate-500">Reduce background GPS polling frequency when rider is idle</span>
                </div>
                <input
                  type="checkbox"
                  checked={batteryOptimization}
                  onChange={(e) => setBatteryOptimization(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === "payout" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <CreditCard size={16} className="text-cyan-400" />
                <span>Earnings & Bank Payout Schedule</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage bank settlement frequency and instant UPI payout triggers.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="font-bold text-slate-200 block">Automated Bank Transfer Cycle</label>
                <select
                  value={payoutCycle}
                  onChange={(e) => setPayoutCycle(e.target.value)}
                  className="w-full sm:w-64 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium"
                >
                  <option value="daily">Daily Midnight Settlement (Standard)</option>
                  <option value="weekly">Weekly Settlement (Every Monday)</option>
                  <option value="instant">Instant On-Demand UPI Payout</option>
                </select>
              </div>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Auto-Transfer Delivered Order Earnings to Bank</span>
                  <span className="text-[11px] text-slate-500">Automatically disburse verified trip earnings directly to {rider.bankDetails?.bankName}</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoTransfer}
                  onChange={(e) => setAutoTransfer(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer"
                />
              </label>
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
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
