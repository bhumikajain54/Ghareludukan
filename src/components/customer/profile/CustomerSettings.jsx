import React, { useState } from "react";
import {
  Settings, Bell, MapPin, Globe, Shield, Lock, Trash2,
  CheckCircle2, Smartphone, Moon, Sun,
} from "lucide-react";

export default function CustomerSettings({ onNav, onLogout }) {
  const [settings, setSettings] = useState({
    orderSms: true,
    whatsappUpdates: true,
    dealAlerts: false,
    locationAutodetect: true,
    language: "English (India)",
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="gd-rise space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white">Settings & Preferences</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Control your communication channels, privacy, and account security
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
          <CheckCircle2 size={16} />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Notifications Section */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="text-sm font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Bell size={16} className="text-cyan-400" />
          <span>Notification & Communication Preferences</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {[
            {
              key: "orderSms",
              title: "SMS Order Status Alerts",
              desc: "Get instantaneous SMS notifications when local seller accepts and dispatches your order",
            },
            {
              key: "whatsappUpdates",
              title: "WhatsApp Live Order Tracking",
              desc: "Receive rider live location link and digital itemized receipt on WhatsApp",
            },
            {
              key: "dealAlerts",
              title: "Nearby Shop Offers & Seasonal Discounts",
              desc: "Promotional notifications for flash sales from shops within your delivery radius",
            },
          ].map((item) => (
            <div key={item.key} className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-100">{item.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 max-w-md leading-relaxed">{item.desc}</div>
              </div>
              <button
                type="button"
                onClick={() => toggle(item.key)}
                className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer flex-shrink-0 ${
                  settings[item.key] ? "bg-cyan-500" : "bg-slate-700"
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                    settings[item.key] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Location & Language */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="text-sm font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Globe size={16} className="text-cyan-400" />
          <span>Regional & Localization</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">App Display Language</label>
            <select
              value={settings.language}
              onChange={(e) => {
                setSettings({ ...settings, language: e.target.value });
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white outline-none cursor-pointer"
            >
              <option value="English (India)">English (India)</option>
              <option value="हिन्दी (Hindi)">हिन्दी (Hindi)</option>
              <option value="राजस्थानी (Rajasthani)">राजस्थानी (Rajasthani)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">GPS Location Access</label>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-xs font-bold text-slate-200">Autodetect Nearby Stores</span>
              <button
                type="button"
                onClick={() => toggle("locationAutodetect")}
                className={`relative inline-flex items-center h-5 w-9 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
                  settings.locationAutodetect ? "bg-emerald-500" : "bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block w-3.5 h-3.5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                    settings.locationAutodetect ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Danger Zone */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="text-sm font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Shield size={16} className="text-cyan-400" />
          <span>Security & Account Actions</span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-slate-200">Logout of Current Session</div>
            <div className="text-[11px] text-slate-400">Safely log out of your Ghareludukan customer account</div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-all cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
