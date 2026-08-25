import React from "react";
import { Check, ShieldCheck, Sparkles } from "lucide-react";

export default function OTPSuccess({ message = "Your OTP has been successfully verified." }) {
  return (
    <div className="py-6 sm:py-8 flex flex-col items-center text-center animate-scale-up">
      {/* Animated Glowing Success Badge */}
      <div className="relative mb-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-pulse">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
            <Check size={28} className="stroke-[3] text-white" />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shadow-md">
          <Sparkles size={13} className="stroke-[2.5]" />
        </div>
      </div>

      {/* Success Title */}
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
        Verification Successful
      </h2>

      {/* Success Subtitle */}
      <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xs font-medium leading-relaxed">
        {message}
      </p>

      {/* Redirect / Progress Bar */}
      <div className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
        <ShieldCheck size={14} className="text-emerald-600" />
        <span>Redirecting to your workspace...</span>
      </div>
    </div>
  );
}
