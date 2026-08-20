import React from "react";
import { Store, Sparkles } from "lucide-react";

export default function AuthBrandHeader() {
  return (
    <div className="flex flex-col items-center text-center mb-6 gd-rise">
      {/* Brand Icon Badge */}
      <div className="relative mb-3">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-xl shadow-cyan-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
            <Store size={28} className="text-cyan-400" />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-md animate-pulse">
          <Sparkles size={11} className="stroke-[2.5]" />
        </div>
      </div>

      {/* Brand Title */}
      <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
        GHARELUDUKAN
      </h1>

      {/* Tagline Badge */}
      <div className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-semibold tracking-wide shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
        <span>Your Gully, Your Dukan, Online</span>
      </div>
    </div>
  );
}
