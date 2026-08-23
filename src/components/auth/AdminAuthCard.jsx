import React, { useState } from "react";
import { ShieldCheck, Lock, ArrowRight, AlertCircle, UserCheck } from "lucide-react";

export default function AdminAuthCard({ onLogin }) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e?.preventDefault();
    if (!adminId.trim()) {
      setError("Please enter your Platform Admin ID");
      return;
    }
    if (password !== "admin123" && password !== "1234") {
      setError("Invalid password — try admin123 (demo)");
      return;
    }
    setError("");
    onLogin({
      phone: "+91 98290 00001",
      role: "admin",
      name: "Sanjay Saxena (Admin)",
      adminId: adminId || "ADM-001",
    });
  };

  return (
    <div className="space-y-4">
      {/* Brand Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-black shadow-md shadow-cyan-600/30">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">
            Platform Administration
          </h2>
          <div className="flex items-center gap-1 text-[11px] text-cyan-600 font-bold">
            <span>Compliance & Operations Authority</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-3.5">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
            Admin Identifier / Email
          </label>
          <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all shadow-xs">
            <span className="flex items-center gap-1 px-3 bg-slate-50 text-slate-700 font-mono text-xs font-bold border-r border-slate-200 select-none">
              <UserCheck size={14} className="text-cyan-600" />
            </span>
            <input
              type="text"
              value={adminId}
              onChange={(e) => {
                setAdminId(e.target.value);
                if (error) setError("");
              }}
              placeholder="admin@ghareludukan.com or ADM-001"
              className="w-full px-3.5 py-2.5 sm:py-3 outline-none font-medium text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Demo ID: <span className="font-mono text-cyan-600 font-bold">admin@ghareludukan.com</span>
          </p>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
            Admin Security Passkey
          </label>
          <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all shadow-xs">
            <span className="flex items-center gap-1 px-3 bg-slate-50 text-slate-700 font-mono text-xs font-bold border-r border-slate-200 select-none">
              <Lock size={14} className="text-cyan-600" />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter security passkey (admin123)"
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
          className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all border-0"
        >
          <span>Authenticate & Access Admin</span>
          <ArrowRight size={15} />
        </button>
      </form>
    </div>
  );
}
