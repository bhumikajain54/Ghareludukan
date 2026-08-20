import React from "react";
import {
  ArrowLeft, MapPin, Store, Navigation, Phone, ShieldCheck,
  Clock, CheckCircle2, ChevronRight, Package,
} from "lucide-react";
import { MOCK_ORDERS, inr } from "../CustomerConstants";

export default function CustomerTracking({ orders = [], orderId, onNav }) {
  const order =
    orders.find((o) => o.id === orderId) || orders[0] || MOCK_ORDERS[0];

  return (
    <div className="gd-rise space-y-5 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNav("order-detail", { orderId: order.id })}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-base font-extrabold text-white">Live Tracking</h1>
          <div className="text-xs text-slate-400">Order #{order.id}</div>
        </div>
      </div>

      {/* Map Mock Simulation Box */}
      <div className="relative rounded-3xl bg-slate-900 border border-slate-800 h-64 sm:h-80 overflow-hidden shadow-2xl flex flex-col justify-between p-4">
        {/* Grid road lines pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Route Line SVG Simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 60 70 Q 180 180 300 130 T 480 220"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="4"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        </svg>

        {/* Shop Node */}
        <div className="relative z-10 self-start flex items-center gap-2 bg-slate-950/90 border border-cyan-500/40 px-3 py-1.5 rounded-2xl shadow-xl">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
            <Store size={14} />
          </div>
          <div>
            <div className="text-[10px] text-cyan-400 font-bold uppercase">
              Pickup Store
            </div>
            <div className="text-xs font-bold text-white">
              {order.shopName}
            </div>
          </div>
        </div>

        {/* Moving Delivery Partner Node */}
        <div className="relative z-10 self-center my-auto flex items-center gap-2 bg-cyan-950/90 border border-cyan-400 px-3 py-1.5 rounded-2xl shadow-xl animate-bounce">
          <div className="w-7 h-7 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center">
            <Navigation size={14} className="rotate-45" />
          </div>
          <div>
            <div className="text-[10px] text-cyan-300 font-bold">
              Rider: Rajesh K.
            </div>
            <div className="text-xs font-bold text-white">8 mins away</div>
          </div>
        </div>

        {/* Customer Node */}
        <div className="relative z-10 self-end flex items-center gap-2 bg-slate-950/90 border border-emerald-500/40 px-3 py-1.5 rounded-2xl shadow-xl">
          <div className="w-7 h-7 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
            <MapPin size={14} />
          </div>
          <div>
            <div className="text-[10px] text-emerald-400 font-bold uppercase">
              Your Location
            </div>
            <div className="text-xs font-bold text-white">
              {order.address?.line1 || "Sector 7, Jaipur"}
            </div>
          </div>
        </div>
      </div>

      {/* ETA & Status Card */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-cyan-400 font-bold">
              ESTIMATED ARRIVAL
            </div>
            <div className="text-2xl font-black text-white mt-0.5">
              {order.deliveryEta || "15–20 Mins"}
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40 animate-pulse">
            Out for Delivery
          </span>
        </div>

        {/* Rider Info Row */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-extrabold text-sm">
              RK
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100 flex items-center gap-1">
                <span>Rajesh Kumar</span>
                <ShieldCheck size={13} className="text-cyan-400" />
              </div>
              <div className="text-[10px] text-slate-400">
                Verified Delivery Partner · Vaccine Verified
              </div>
            </div>
          </div>
          <button
            onClick={() => alert("Connecting call to delivery partner...")}
            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white shadow-md shadow-cyan-950 transition-all"
            title="Call Delivery Partner"
          >
            <Phone size={15} />
          </button>
        </div>

        {/* Mini Order Checklist */}
        <div className="space-y-1 pt-1 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-400 mb-2">
            Items in this delivery ({order.items.length})
          </div>
          {order.items.map((i, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs text-slate-300 py-1"
            >
              <span>
                {i.name} × {i.qty}
              </span>
              <span className="font-bold text-white">
                {inr(i.price * i.qty)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
