import React from "react";
import { Headphones, Phone, ShieldAlert, MessageCircle, AlertTriangle } from "lucide-react";

export default function DeliverySupport() {
  return (
    <div className="space-y-6 gd-rise w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Headphones size={24} className="text-cyan-400" />
          <span>Rider Partner Helpline</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          24x7 operational assistance for on-trip accidents, customer unreachable, and payout queries.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 border border-rose-500/30 space-y-3">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
          <ShieldAlert size={18} />
          <span>RIDER SOS & ROAD ACCIDENT EMERGENCY</span>
        </div>
        <p className="text-xs text-slate-300">
          If you are in an emergency or accident on the road, tap the emergency button immediately for priority response and ambulance dispatch.
        </p>
        <div className="pt-2">
          <a
            href="tel:112"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-all shadow-lg shadow-rose-600/30"
          >
            <Phone size={16} />
            <span>CALL SOS DISPATCH (112)</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <MessageCircle size={24} className="text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Live Support Chat</h3>
          <p className="text-xs text-slate-400">Chat with partner dispatch agents regarding order cancellations or wrong customer location.</p>
          <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-indigo-400 transition-colors cursor-pointer">
            Start Partner Chat
          </button>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <Phone size={24} className="text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Dedicated Rider Helpline</h3>
          <p className="text-xs text-slate-400">Call our Jaipur hub operations desk directly for urgent assistance.</p>
          <a href="tel:+911800123999" className="inline-block px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-400 transition-colors">
            1800-123-999 (Toll Free)
          </a>
        </div>
      </div>
    </div>
  );
}
