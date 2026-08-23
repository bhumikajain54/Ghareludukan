import React, { useState } from "react";
import { ShieldAlert, Terminal, ArrowRight, AlertCircle, Key } from "lucide-react";

export default function SuperAdminAuthCard({ onLogin }) {
  const [rootKey, setRootKey] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e?.preventDefault();
    if (rootKey !== "root123" && rootKey !== "1234" && rootKey !== "superadmin") {
      setError("Invalid root authorization passkey — try root123 (demo)");
      return;
    }
    setError("");
    onLogin({
      phone: "+91 98290 00000",
      role: "superadmin",
      name: "Bhumika Jain (Super Admin)",
    });
  };

  return (
    <div className="space-y-4">
      {/* Brand Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black shadow-md shadow-purple-600/30">
          <ShieldAlert size={20} />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">
            Super Administrator Root Terminal
          </h2>
          <div className="flex items-center gap-1 text-[11px] text-purple-600 font-bold">
            <span>Privileged Governance & RBAC Access</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-3.5">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
            Root Security Authorization Key
          </label>
          <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all shadow-xs">
            <span className="flex items-center gap-1 px-3 bg-slate-50 text-slate-700 font-mono text-xs font-bold border-r border-slate-200 select-none">
              <Key size={14} className="text-purple-600" />
            </span>
            <input
              type="password"
              value={rootKey}
              onChange={(e) => {
                setRootKey(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter root master passkey (root123)"
              className="w-full px-3.5 py-2.5 sm:py-3 outline-none font-mono text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent tracking-widest"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Demo Key: <span className="font-mono text-purple-600 font-bold">root123</span>
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all border-0"
        >
          <span>Unlock Root Governance</span>
          <ArrowRight size={15} />
        </button>
      </form>
    </div>
  );
}
