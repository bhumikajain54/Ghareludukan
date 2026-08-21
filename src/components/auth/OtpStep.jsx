import React from "react";
import { AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";

export default function OtpStep({
  phone,
  otp,
  onOtpChange,
  onVerify,
  onChangePhone,
  error,
}) {
  return (
    <div className="space-y-3 sm:space-y-3.5">
      {/* Header Info */}
      <div className="text-left">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Enter Verification Code</span>
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
          Code sent to <span className="font-mono text-cyan-800 font-bold">+91 {phone}</span>
        </p>
      </div>

      {/* OTP Input */}
      <div>
        <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
          4-Digit Security Code
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={otp}
          onChange={(e) =>
            onOtpChange(e.target.value.replace(/\D/g, "").slice(0, 4))
          }
          placeholder="••••"
          maxLength={4}
          className="w-full text-center tracking-[0.8em] font-mono text-xl sm:text-2xl font-bold py-2.5 sm:py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-slate-300 shadow-xs"
        />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
          <AlertCircle size={14} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="button"
        onClick={onVerify}
        className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all border-0"
      >
        <CheckCircle2 size={15} className="text-white" />
        <span>Verify & Continue</span>
      </button>

      {/* Change Number Button */}
      <div className="pt-0.5 text-center">
        <button
          type="button"
          onClick={onChangePhone}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-700 transition-colors font-semibold cursor-pointer"
        >
          <RefreshCw size={12} />
          <span>Change phone number</span>
        </button>
      </div>
    </div>
  );
}
