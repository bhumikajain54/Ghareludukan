import React, { useState } from "react";
import { Headphones, ShieldCheck, ArrowRight, AlertCircle, User, KeyRound } from "lucide-react";

export default function SupportAuthCard({ onLogin }) {
  const [agentId, setAgentId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e?.preventDefault();
    if (!agentId.trim()) {
      setError("Please enter your Support Agent ID");
      return;
    }
    if (pin !== "support123" && pin !== "1234") {
      setError("Invalid passkey — try support123 (demo)");
      return;
    }
    setError("");
    onLogin({
      phone: "+91 98290 00002",
      role: "support",
      name: "Neha Rathore (Support Lead)",
      agentId: agentId || "SUP-101",
    });
  };

  return (
    <div className="space-y-4">
      {/* Brand Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-md shadow-indigo-600/30">
          <Headphones size={20} />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">
            Support Desk Portal
          </h2>
          <div className="flex items-center gap-1 text-[11px] text-indigo-600 font-bold">
            <ShieldCheck size={12} />
            <span>Customer & Seller Resolution Desk</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-3.5">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
            Support Agent Identifier
          </label>
          <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-xs">
            <span className="flex items-center gap-1 px-3 bg-slate-50 text-slate-700 font-mono text-xs font-bold border-r border-slate-200 select-none">
              <User size={14} className="text-indigo-600" />
            </span>
            <input
              type="text"
              value={agentId}
              onChange={(e) => {
                setAgentId(e.target.value);
                if (error) setError("");
              }}
              placeholder="agent@ghareludukan.com or SUP-101"
              className="w-full px-3.5 py-2.5 sm:py-3 outline-none font-medium text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Demo ID: <span className="font-mono text-indigo-600 font-bold">SUP-101</span>
          </p>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
            Agent Security PIN / Password
          </label>
          <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-xs">
            <span className="flex items-center gap-1 px-3 bg-slate-50 text-slate-700 font-mono text-xs font-bold border-r border-slate-200 select-none">
              <KeyRound size={14} className="text-indigo-600" />
            </span>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter PIN (support123)"
              className="w-full px-3.5 py-2.5 sm:py-3 outline-none font-medium text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all border-0"
        >
          <span>Access Support Desk</span>
          <ArrowRight size={15} />
        </button>
      </form>
    </div>
  );
}
