import React from "react";
import { AlertCircle, ArrowRight, Phone, ShieldCheck, Store } from "lucide-react";
import RoleSelector from "./RoleSelector";

export default function PhoneStep({
  phone,
  onPhoneChange,
  role,
  onRoleChange,
  onSendOtp,
  error,
}) {
  const isSeller = role === "seller";

  return (
    <div className="space-y-3 sm:space-y-3.5">
      {/* Top Segmented Role Tab Selector */}
      <RoleSelector role={role} onRoleChange={onRoleChange} />

      {/* Dynamic Header Info based on active role */}
      <div className="text-left">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            {isSeller ? "Merchant Dukan Login" : "Customer Log In"}
          </h2>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            isSeller
              ? "bg-indigo-50 border-indigo-200 text-indigo-700"
              : "bg-cyan-50 border-cyan-200 text-cyan-700"
          }`}>
            {isSeller ? "Shop Partner" : "Hyperlocal Shopper"}
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
          {isSeller
            ? "Enter your registered mobile number to manage orders and shop."
            : "Enter your mobile number to receive a secure SMS verification code."}
        </p>
      </div>

      {/* Input Group */}
      <div>
        <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
          Mobile Number
        </label>
        <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all shadow-xs">
          <span className="flex items-center gap-1 px-3 bg-slate-50 text-slate-700 font-mono text-xs sm:text-sm font-bold border-r border-slate-200 select-none">
            <Phone size={13} className={isSeller ? "text-indigo-600" : "text-cyan-600"} />
            +91
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              onPhoneChange(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="Enter mobile number"
            className="w-full px-3.5 py-2.5 sm:py-3 outline-none font-mono text-xs sm:text-sm text-slate-900 placeholder-slate-400 font-medium bg-transparent tracking-wider"
          />
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
          <AlertCircle size={14} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Action Button */}
      <button
        type="button"
        onClick={onSendOtp}
        className={`w-full py-2.5 sm:py-3 px-5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all border-0 ${
          isSeller
            ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30"
            : "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30"
        }`}
      >
        <span>Send Verification Code</span>
        <ArrowRight size={15} className="text-white" />
      </button>
    </div>
  );
}
