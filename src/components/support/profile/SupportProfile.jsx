import React, { useState } from "react";
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  Building,
  MapPin,
  Clock,
  Key,
  CheckCircle2,
  Save,
  LifeBuoy,
  Headphones,
  Sliders,
  Sparkles,
  Award,
  AlertCircle,
} from "lucide-react";

export default function SupportProfile({ user, onNav }) {
  const [name, setName] = useState(user?.name || "Neha Rathore (Support Lead)");
  const [email, setEmail] = useState("support.lead@ghareludukan.com");
  const [phone, setPhone] = useState(user?.phone || "+91 98290 00002");
  const [roleTitle, setRoleTitle] = useState("Support Desk Lead · L1/L2 Operations");
  const [department, setDepartment] = useState("Hyperlocal Customer & Merchant Support");
  const [clusterZone, setClusterZone] = useState("Jaipur Central & Suburbs (Support Hub 1)");
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
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-indigo-400 font-black text-2xl">
                {name.charAt(0)}
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-white font-bold" title="Online & On-Duty">
              ✓
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">{name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-extrabold uppercase tracking-wider">
                Active Lead
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
              <Headphones size={13} className="text-indigo-400" />
              <span>{roleTitle}</span>
            </p>
            <p className="text-[11px] font-mono text-slate-500 mt-1">
              Support Officer ID: <span className="text-indigo-400 font-bold">SUP-4402</span> · Shift: Morning (08:00 - 17:00 IST)
            </p>
          </div>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold animate-fade-in self-start sm:self-auto">
            <CheckCircle2 size={14} />
            <span>Profile Updated</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <User size={18} className="text-indigo-400" />
                <h2 className="text-sm font-extrabold text-white">Officer Details & Contact Info</h2>
              </div>
              <span className="text-[11px] text-slate-400">Authorized Support Lead</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold block">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:border-indigo-500 transition-colors"
                  />
                  <User size={14} className="absolute left-3 top-3 text-slate-500" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold block">Official Support Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:border-indigo-500 transition-colors"
                  />
                  <Mail size={14} className="absolute left-3 top-3 text-slate-500" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold block">Contact Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:border-indigo-500 transition-colors"
                  />
                  <Phone size={14} className="absolute left-3 top-3 text-slate-500" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold block">Role Designation</label>
                <div className="relative">
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:border-indigo-500 transition-colors"
                  />
                  <Headphones size={14} className="absolute left-3 top-3 text-slate-500" />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-slate-400 font-semibold block">Operations Department</label>
                <div className="relative">
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:border-indigo-500 transition-colors"
                  />
                  <Building size={14} className="absolute left-3 top-3 text-slate-500" />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-slate-400 font-semibold block">Assigned Support Hub / City</label>
                <div className="relative">
                  <input
                    type="text"
                    value={clusterZone}
                    onChange={(e) => setClusterZone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:border-indigo-500 transition-colors"
                  />
                  <MapPin size={14} className="absolute left-3 top-3 text-slate-500" />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Save size={14} />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>

          {/* Assigned Clearances Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Award size={18} className="text-indigo-400" />
              <h2 className="text-sm font-extrabold text-white">Helpdesk Authority & Clearances</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <LifeBuoy size={14} />
                  <span>L1 / L2 Ticket Resolution</span>
                </div>
                <p className="text-[11px] text-slate-400">Authorized to resolve customer, merchant, and rider order disputes.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <AlertCircle size={14} />
                  <span>Priority Escalation Desk</span>
                </div>
                <p className="text-[11px] text-slate-400">Direct channel to escalate fraud, refund discrepancies, and logistics issues.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <ShieldCheck size={14} />
                  <span>Instant Refund Approvals</span>
                </div>
                <p className="text-[11px] text-slate-400">Clearance to approve instant wallet / UPI refunds up to ₹5,000.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <Clock size={14} />
                  <span>SLA Guarantee Monitoring</span>
                </div>
                <p className="text-[11px] text-slate-400">Authority to reassign overdue tickets and track 15-min resolution metrics.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Security & Session Metadata */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Key size={18} className="text-indigo-400" />
              <h2 className="text-sm font-extrabold text-white">Active Session & Security</h2>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Helpdesk Session Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AUTHENTICATED
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">2FA Security</span>
                <span className="text-indigo-400 font-bold">SMS + OTP Verified</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Operator ID</span>
                <span className="font-mono text-slate-100 font-bold">SUP-4402</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Last Login IP</span>
                <span className="font-mono text-slate-300">103.21.144.18</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
