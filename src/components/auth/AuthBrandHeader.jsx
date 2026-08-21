import React from "react";
import { Store, Sparkles } from "lucide-react";

export default function AuthBrandHeader() {
  return (
    <div className="flex flex-col items-center text-center mb-4 sm:mb-5 gd-rise">
      {/* Brand Icon Badge */}
      <div className="relative mb-2 sm:mb-2.5">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
            <Store size={24} className="text-cyan-400" />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-md animate-pulse">
          <Sparkles size={10} className="stroke-[2.5]" />
        </div>
      </div>

      {/* Brand Title */}
      <h1 className="font-display text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
        GHARELUDUKAN
      </h1>

      {/* Tagline Badge */}
      <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-[11px] font-semibold tracking-wide shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
        <span>Your Gully, Your Dukan, Online</span>
      </div>
    </div>
  );
}
