import React from "react";
import { Settings, ShieldCheck, Bell, Lock, Sliders } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="space-y-6 gd-rise w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Settings size={24} className="text-cyan-400" />
          <span>Platform Verification Guidelines & Rules</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure statutory checking parameters, mandatory KYC criteria, and moderation rules.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <ShieldCheck size={18} className="text-cyan-400" />
          <span>Merchant Onboarding Requirements</span>
        </h2>

        <div className="space-y-3 text-xs text-slate-300">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80">
            <span>Mandatory GSTIN validation for all non-exempt categories</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer" />
          </label>
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80">
            <span>Mandatory FSSAI Food License verification for Dairy, Sweets & Groceries</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer" />
          </label>
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80">
            <span>Geotagged physical storefront photo match mandatory</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm accent-cyan-500 cursor-pointer" />
          </label>
        </div>
      </div>
    </div>
  );
}
