import React, { useState } from "react";
import {
  User, Mail, Phone, MapPin, ShieldCheck, Edit3, Save,
  CheckCircle2, Calendar, Lock, Sparkles, ArrowLeft,
} from "lucide-react";

export default function CustomerProfile({ user, onNav, onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Bhumika Jain",
    phone: user?.phone || "+91 98765 43210",
    email: user?.email || "bhumika.jain@example.com",
    gender: "Female",
    dob: "1998-05-14",
    city: "Jaipur, Rajasthan",
    primaryPincode: "302017",
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="gd-rise space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">Profile Details</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your personal identity, contact information, and verification status
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-all cursor-pointer"
          >
            <Edit3 size={14} />
            <span>Edit Profile</span>
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="text-xs text-slate-400 hover:text-white font-bold"
          >
            Cancel
          </button>
        )}
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <CheckCircle2 size={16} />
          <span>Profile details successfully updated!</span>
        </div>
      )}

      {/* Profile ID Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4 z-10">
          <div className="w-16 h-16 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-black text-2xl shadow-xl flex-shrink-0">
            {formData.name[0] || "B"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">{formData.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/40 flex items-center gap-1">
                <Sparkles size={10} /> Active Customer
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <span>{formData.phone}</span>
              <span>·</span>
              <span>{formData.city}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-emerald-400 font-bold z-10">
          <ShieldCheck size={16} />
          <span>Level 1 Phone Verified</span>
        </div>
      </div>

      {/* Profile Form Details */}
      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="text-sm font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <User size={16} className="text-cyan-400" />
          <span>Personal Information</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">Full Name</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold outline-none border transition-all ${
                isEditing
                  ? "bg-slate-800 border-cyan-500/50 text-white"
                  : "bg-slate-950 border-slate-800 text-slate-300 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">Phone Number (Registered)</label>
            <input
              type="text"
              disabled
              value={formData.phone}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono font-bold cursor-not-allowed"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Phone number cannot be changed directly</span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">Email Address</label>
            <input
              type="email"
              disabled={!isEditing}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold outline-none border transition-all ${
                isEditing
                  ? "bg-slate-800 border-cyan-500/50 text-white"
                  : "bg-slate-950 border-slate-800 text-slate-300 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">Gender</label>
            <select
              disabled={!isEditing}
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold outline-none border transition-all ${
                isEditing
                  ? "bg-slate-800 border-cyan-500/50 text-white"
                  : "bg-slate-950 border-slate-800 text-slate-300 cursor-not-allowed"
              }`}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">Date of Birth</label>
            <input
              type="date"
              disabled={!isEditing}
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold outline-none border transition-all ${
                isEditing
                  ? "bg-slate-800 border-cyan-500/50 text-white"
                  : "bg-slate-950 border-slate-800 text-slate-300 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">Home Delivery City</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold outline-none border transition-all ${
                isEditing
                  ? "bg-slate-800 border-cyan-500/50 text-white"
                  : "bg-slate-950 border-slate-800 text-slate-300 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {isEditing && (
          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-cyan-950 transition-all cursor-pointer"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </form>

      {/* Quick Navigation to Other Profile Subsections */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => onNav("addresses")}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
            <MapPin size={15} />
            <span>Saved Addresses</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Manage delivery locations and default home pins</p>
        </button>

        <button
          onClick={() => onNav("wallet")}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <ShieldCheck size={15} />
            <span>Wallet & Refunds</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Check instant cash balance and refund records</p>
        </button>

        <button
          onClick={() => onNav("settings")}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
            <Lock size={15} />
            <span>Security & Settings</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Notification preferences and account controls</p>
        </button>
      </div>
    </div>
  );
}
