import React, { useState } from "react";
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Key,
  Lock,
  Camera,
  Save,
  CheckCircle2,
  Sparkles,
  Award,
  Activity,
  Calendar,
} from "lucide-react";

export default function AdminProfile({ user = {}, onNav }) {
  const [name, setName] = useState(user?.name || "Sanjay Saxena");
  const [email, setEmail] = useState("admin.sanjay@ghareludukan.com");
  const [phone, setPhone] = useState(user?.phone || "+91 98290 00001");
  const [roleTitle, setRoleTitle] = useState("Platform Admin · Compliance Lead");
  const [department, setDepartment] = useState("Trust, Safety & Governance");
  const [clusterZone, setClusterZone] = useState("Jaipur Central & Suburbs (Cluster 1)");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/25 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl font-black text-cyan-400">
                {name.charAt(0)}
              </div>
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-cyan-600 border-2 border-slate-900 flex items-center justify-center text-white hover:bg-cyan-500 cursor-pointer shadow-md transition-all"
              title="Change Profile Photo"
            >
              <Camera size={11} />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">{name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
                <Sparkles size={10} /> ROOT ACCESS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{roleTitle}</p>
            <p className="text-[11px] text-cyan-400/90 font-mono mt-1 font-semibold flex items-center gap-1">
              <ShieldCheck size={12} /> ID: ADM-9901 · {department}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNav?.("settings")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 cursor-pointer transition-all"
          >
            Open Settings
          </button>
        </div>
      </div>

      {/* Profile Form & Permissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Editable Admin Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <User size={18} className="text-cyan-400" />
                <span>Administrative Profile Details</span>
              </h2>
              {saved && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold animate-fade-in">
                  <CheckCircle2 size={13} />
                  <span>Profile updated</span>
                </span>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500 font-medium transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500 font-medium transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Official Email
                  </label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <Mail size={14} className="text-slate-500 shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-xs text-white outline-none font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Registered Mobile
                  </label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <Phone size={14} className="text-slate-500 shrink-0" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent text-xs text-white outline-none font-mono font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500 font-medium transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Operating Cluster
                  </label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <MapPin size={14} className="text-slate-500 shrink-0" />
                    <input
                      type="text"
                      value={clusterZone}
                      onChange={(e) => setClusterZone(e.target.value)}
                      className="w-full bg-transparent text-xs text-white outline-none font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/30 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Save size={14} />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          </div>

          {/* System Audit Authority Metadata */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Activity size={16} className="text-cyan-400" />
              <span>Current Session & Security Metadata</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">2FA Status</span>
                <span className="text-emerald-400 font-bold mt-0.5 block flex items-center gap-1">
                  <ShieldCheck size={12} /> Active (Hardware Key + OTP)
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Session IP</span>
                <span className="text-slate-300 font-mono font-bold mt-0.5 block">103.21.144.18 (Jaipur)</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Session Key</span>
                <span className="text-slate-300 font-mono font-bold mt-0.5 block">AUTH-KEY-8192-X</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Roles & Privileges */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Award size={16} className="text-cyan-400" />
              <span>Assigned Governance Clearances</span>
            </h3>

            <div className="space-y-2.5">
              {[
                { title: "Merchant Onboarding & KYC Approval", desc: "Full statutory sign-off authority for shops" },
                { title: "Rider Background Verification Clearance", desc: "Driver license & police record approval" },
                { title: "Fraud Mitigation & Account Suspension", desc: "Real-time freeze & velocity restriction" },
                { title: "Merchant Payout & Settlement Clearance", desc: "Escrow release & UPI transaction sign-off" },
                { title: "Immutable Audit Trail Access", desc: "Read & append authority for regulatory logs" },
              ].map((perm, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                    <span>{perm.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 ml-5">{perm.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
