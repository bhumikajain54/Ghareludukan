import React from "react";
import { AlertCircle, ArrowRight, Phone, ShieldCheck } from "lucide-react";

export default function PhoneStep({
  phone,
  onPhoneChange,
  onSendOtp,
  error,
}) {
  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="text-left space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Sign In / Registration
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700">
            Secure OTP Access
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Enter your 10-digit mobile number to receive a secure SMS verification code.
        </p>
      </div>

      {/* Input Group */}
      <div>
        <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
          Mobile Number
        </label>
        <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all shadow-xs">
          <span className="flex items-center gap-1 px-3.5 bg-slate-50 text-slate-700 font-mono text-xs sm:text-sm font-bold border-r border-slate-200 select-none">
            <Phone size={14} className="text-cyan-600" />
            +91
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              onPhoneChange(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="Enter mobile number"
            className="w-full px-3.5 py-3 outline-none font-mono text-xs sm:text-sm text-slate-900 placeholder-slate-400 font-medium bg-transparent tracking-wider"
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
        className="w-full py-3 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all border-0"
      >
        <span>Send Verification Code</span>
        <ArrowRight size={15} className="text-white" />
      </button>

      {/* Trust reassurance */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
        <ShieldCheck size={13} className="text-cyan-600" />
        <span>End-to-end encrypted session verification</span>
      </div>
    </div>
  );
}
