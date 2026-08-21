import React, { useState } from "react";
import {
  ShoppingBag, Clock, MapPin, Store, ChevronRight, RotateCcw,
  Package, CheckCircle2, XCircle, ArrowRight, Filter,
} from "lucide-react";
import { MOCK_ORDERS, ORDER_STATUS_LABEL, ORDER_STATUS_COLOR, PAYMENT_STATUS_COLOR, inr } from "../CustomerConstants";

const TABS = [
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

function OrderCard({ order, onNav }) {
  const statusMeta = ORDER_STATUS_COLOR[order.status] || "bg-slate-700/50 text-slate-400 border-slate-700";
  const isActive = !["DELIVERED", "CANCELLED", "REFUNDED"].includes(order.status);

  return (
    <button
      onClick={() => onNav("order-detail", { orderId: order.id })}
      className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all gd-tap text-left space-y-3"
    >
      {/* Top Row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs font-mono text-slate-400">#{order.id}</div>
          <div className="text-sm font-bold text-slate-100 mt-0.5 flex items-center gap-1.5">
            <Store size={13} className="text-cyan-400" />
            {order.shopName}
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border ${statusMeta}`}>
          {ORDER_STATUS_LABEL[order.status]}
        </span>
      </div>

      {/* Items preview */}
      <div className="text-xs text-slate-400">
        {order.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-sm font-black text-white">{inr(order.total)}</div>
          <div className="text-[10px] text-slate-500">{order.placedAt}</div>
        </div>
        <div className="flex items-center gap-2">
          {isActive && order.deliveryEta && (
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
              <Clock size={11} />
              ETA {order.deliveryEta}
            </div>
          )}
          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${PAYMENT_STATUS_COLOR[order.paymentStatus]}`}>
            {order.paymentStatus}
          </span>
        </div>
      </div>

      {/* Action row */}
      <div className="flex gap-2 pt-1 border-t border-slate-800">
        {isActive ? (
          <button
            onClick={(e) => { e.stopPropagation(); onNav("order-tracking", { orderId: order.id }); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 transition-colors"
          >
            <MapPin size={12} /> Track Order
          </button>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); onNav("home"); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            <RotateCcw size={12} /> Reorder
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onNav("order-detail", { orderId: order.id }); }}
          className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold hover:bg-slate-700 transition-colors"
        >
          Details <ChevronRight size={12} />
        </button>
      </div>
    </button>
  );
}

export default function CustomerOrders({ orders = [], onNav }) {
  const [activeTab, setActiveTab] = useState("active");

  const activeOrders = orders.filter((o) =>
    ["PLACED", "NEW", "ACCEPTED", "PREPARING", "PACKED", "READY", "OUT_FOR_DELIVERY"].includes(o.status)
  );
  const completedOrders = orders.filter((o) =>
    ["DELIVERED"].includes(o.status)
  );
  const cancelledOrders = orders.filter((o) =>
    ["CANCELLED", "REJECTED", "RETURN_REQUESTED", "RETURN_APPROVED", "REFUNDED"].includes(o.status)
  );

  const getTabCount = (tabId) => {
    if (tabId === "active") return activeOrders.length;
    if (tabId === "completed") return completedOrders.length;
    if (tabId === "cancelled") return cancelledOrders.length;
    return 0;
  };

  const filtered =
    activeTab === "active"
      ? activeOrders
      : activeTab === "completed"
      ? completedOrders
      : cancelledOrders;

  return (
    <div className="gd-rise space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-white">My Orders</h1>
        <span className="text-xs text-slate-400 font-medium">
          {activeOrders.length} active · {orders.length} total
        </span>
      </div>

      {/* ── Tabs ────────────────────────────────────── */}
      <div className="flex gap-2">
        {TABS.map((tab) => {
          const count = getTabCount(tab.id);
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                isSelected
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                  : "seller-tab-inactive bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{tab.label}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Empty State ─────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
            <Package size={24} className="text-slate-600" />
          </div>
          <div className="text-slate-400 font-semibold">No {activeTab} orders</div>
          {activeTab === "active" && (
            <button
              onClick={() => onNav("home")}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-sm font-bold hover:bg-cyan-500/30 transition-all cursor-pointer"
            >
              Browse Shops
            </button>
          )}
        </div>
      )}

      {/* ── Order List ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((order) => (
          <OrderCard key={order.id} order={order} onNav={onNav} />
        ))}
      </div>
    </div>
  );
}
