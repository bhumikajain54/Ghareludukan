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
    <div className="space-y-4">
      {/* Header Info */}
      <div className="text-left">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Enter Verification Code</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Code sent to <span className="font-mono text-cyan-800 font-bold">+91 {phone}</span>
        </p>
      </div>

      {/* Demo Hint Banner - preserved in code logic, hidden from UI as requested */}
      {/* 
      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs">
        <span className="font-semibold">Demo Access Code:</span>
        <span className="font-mono font-bold bg-cyan-100 px-2.5 py-0.5 rounded text-cyan-900 tracking-widest text-sm border border-cyan-200">
          1234
        </span>
      </div>
      */}

      {/* OTP Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
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
          className="w-full text-center tracking-[0.8em] font-mono text-2xl font-bold py-3.5 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-slate-300 shadow-xs"
        />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
          <AlertCircle size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="button"
        onClick={onVerify}
        className="w-full py-3.5 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all border-0"
      >
        <CheckCircle2 size={16} className="text-white" />
        <span>Verify & Continue</span>
      </button>

      {/* Change Number Button */}
      <div className="pt-1 text-center">
        <button
          type="button"
          onClick={onChangePhone}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-700 transition-colors font-semibold cursor-pointer"
        >
          <RefreshCw size={13} />
          <span>Change phone number</span>
        </button>
      </div>
    </div>
  );
}
