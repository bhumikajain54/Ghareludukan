import React from "react";
import {
  User,
  ShieldCheck,
  Phone,
  Mail,
  Bike,
  CreditCard,
  HeartHandshake,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { MOCK_DELIVERY_RIDER } from "../DeliveryConstants";

export default function DeliveryProfile({ rider = MOCK_DELIVERY_RIDER, onNav }) {
  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Profile Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-2xl border border-cyan-500/30">
            {rider.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white">{rider.name}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                {rider.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Partner ID: {rider.id} • Joined {rider.joiningDate}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-amber-400">★ {rider.rating} Rating</span>
          <p className="text-[11px] text-slate-400 mt-0.5">{rider.totalDeliveries} total deliveries</p>
        </div>
      </div>

      {/* Vehicle & KYC */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Bike size={18} className="text-cyan-400" />
          <span>Vehicle & License Information</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-400 block">Vehicle Model / Type</span>
            <p className="text-xs font-black text-white mt-0.5">{rider.vehicleType}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-400 block">Registration Number</span>
            <p className="text-xs font-black text-white mt-0.5">{rider.vehicleNumber}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-400 block">Driving License (DL)</span>
            <p className="text-xs font-black text-white mt-0.5">{rider.drivingLicense}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 block">KYC Verification</span>
              <p className="text-xs font-black text-cyan-400 mt-0.5">Government ID Verified</p>
            </div>
            <ShieldCheck size={20} className="text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Bank Settlement Account */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <CreditCard size={18} className="text-cyan-400" />
          <span>Direct Bank Payout Details</span>
        </h2>

        <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Account Holder</span>
            <span className="font-bold text-white">{rider.bankDetails?.accountHolder}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Bank Name</span>
            <span className="font-bold text-white">{rider.bankDetails?.bankName}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Account Number</span>
            <span className="font-bold text-white">{rider.bankDetails?.accountNumber}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">IFSC Code</span>
            <span className="font-bold text-cyan-400">{rider.bankDetails?.ifsc}</span>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <HeartHandshake size={18} className="text-rose-400" />
          <span>Emergency Contact (SOS)</span>
        </h2>
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80 text-xs">
          <div>
            <p className="font-bold text-white">{rider.emergencyContact?.name}</p>
            <p className="text-[11px] text-slate-400">{rider.emergencyContact?.relation}</p>
          </div>
          <a
            href={`tel:${rider.emergencyContact?.phone}`}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold hover:bg-rose-500/20 transition-colors"
          >
            {rider.emergencyContact?.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
