import React from "react";
import { Store, Sparkles, Edit3 } from "lucide-react";

export default function OTPHeader({ phone, onChangePhone }) {
  // Format masked phone number e.g. +91 98765 ••••• or +91 98XXX XX210
  const formatMaskedPhone = (rawPhone) => {
    if (!rawPhone) return "+91 XXXXX XXXXX";
    const clean = String(rawPhone).replace(/\D/g, "");
    if (clean.length === 10) {
      return `+91 ${clean.slice(0, 2)}••• ••${clean.slice(-3)}`;
    }
    return `+91 ${rawPhone}`;
  };

  return (
    <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
      {/* Ghareludukan Logo / Icon with Soft Glowing Accent */}
      <div className="relative mb-3 group">
        <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
            <Store size={26} className="text-cyan-400" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-md animate-pulse">
          <Sparkles size={10} className="stroke-[2.5]" />
        </div>
      </div>

      {/* Main Heading */}
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
        Verify Your OTP
      </h2>

      {/* Supporting Text & Masked Phone */}
      <p className="text-xs sm:text-[13px] text-slate-500 mt-1 font-medium max-w-xs leading-relaxed">
        We've sent a 6-digit verification code to
      </p>
      
      <div className="inline-flex items-center gap-2 mt-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-2xs">
        <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 tracking-wider">
          {formatMaskedPhone(phone)}
        </span>
        {onChangePhone && (
          <button
            type="button"
            onClick={onChangePhone}
            aria-label="Change phone number"
            title="Change phone number"
            className="text-cyan-600 hover:text-cyan-700 p-0.5 rounded transition-colors cursor-pointer inline-flex items-center"
          >
            <Edit3 size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
