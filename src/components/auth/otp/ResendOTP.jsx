import React from "react";
import { RotateCw, Clock, Check, Loader2 } from "lucide-react";

export default function ResendOTP({
  secondsLeft = 30,
  onResend,
  loading = false,
  resendSuccess = false,
}) {
  const isExpired = secondsLeft <= 0;

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  };

  return (
    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col items-center gap-2 text-center">
      {/* Resend Success Toast / Notice */}
      {resendSuccess && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold animate-fade-in shadow-2xs">
          <Check size={13} className="text-emerald-600 stroke-[2.5]" />
          <span>New OTP sent successfully.</span>
        </div>
      )}

      <div className="flex items-center justify-between w-full px-1 text-xs">
        {/* Timer / Expiration Status */}
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <Clock size={13} className={isExpired ? "text-red-500" : "text-cyan-600"} />
          {isExpired ? (
            <span className="text-red-600 font-semibold">OTP Expired</span>
          ) : (
            <span>
              Expires in <span className="font-mono font-bold text-slate-700">{formatTime(secondsLeft)}</span>
            </span>
          )}
        </div>

        {/* Resend Action */}
        <button
          type="button"
          onClick={onResend}
          disabled={!isExpired || loading}
          aria-label="Resend OTP code"
          className={`inline-flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
            isExpired && !loading
              ? "text-cyan-600 hover:text-cyan-700 underline underline-offset-2 hover:scale-[1.02]"
              : loading
              ? "text-cyan-500 cursor-wait"
              : "text-slate-400 cursor-not-allowed opacity-70"
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <RotateCw size={12} className={isExpired ? "text-cyan-600" : "text-slate-400"} />
              <span>RESEND OTP</span>
            </>
          )}
        </button>
      </div>

      {/* Helpful Hint on expiration */}
      {isExpired && (
        <p className="text-[11px] text-red-500/90 font-medium">
          OTP has expired. Please request a new OTP.
        </p>
      )}
    </div>
  );
}
