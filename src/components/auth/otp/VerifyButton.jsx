import React from "react";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export default function VerifyButton({
  onClick,
  disabled = false,
  loading = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`w-full mt-4 py-3 sm:py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border-0 gd-tap shadow-md select-none ${
        disabled && !loading
          ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          : loading
          ? "bg-cyan-600/80 text-white cursor-wait shadow-cyan-600/20"
          : "bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-cyan-600/30 hover:shadow-lg hover:shadow-cyan-600/40 hover:-translate-y-0.5 active:translate-y-0"
      }`}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin text-white" />
          <span>Verifying...</span>
        </>
      ) : (
        <>
          <CheckCircle2 size={16} className="text-white/90" />
          <span>Verify OTP</span>
          <ArrowRight size={14} className="opacity-80 group-hover:translate-x-0.5 transition-transform" />
        </>
      )}
    </button>
  );
}
