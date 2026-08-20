import React, { useState } from "react";
import {
  Search, Filter, X, Check, ChevronDown, Eye, Clock,
  ShoppingCart, AlertCircle,
} from "lucide-react";
import {
  MOCK_ORDERS, ORDER_STATUS_COLOR, ORDER_STATUS_LABEL,
  REJECT_REASONS, inr,
} from "../SellerConstants";

const TABS = ["NEW", "ACCEPTED", "PREPARING", "PACKED", "READY", "DELIVERED", "REJECTED", "CANCELLED"];

function StatusBadge({ status }) {
  const cls = ORDER_STATUS_COLOR[status] || "bg-slate-500/15 text-slate-400 border-slate-500/30";
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cls}`}>
      {ORDER_STATUS_LABEL[status] || status}
    </span>
  );
}

function PayBadge({ status }) {
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
      status === "PAID" ? "bg-emerald-500/15 text-emerald-400" : status === "REFUNDED" ? "bg-blue-500/15 text-blue-400" : "bg-amber-500/15 text-amber-400"
    }`}>
      {status}
    </span>
  );
}

function RejectModal({ onConfirm, onClose }) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl gd-rise">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
            <AlertCircle size={18} className="text-red-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100">Reject this order?</div>
            <div className="text-xs text-slate-500">Select a reason to continue.</div>
          </div>
        </div>
        <div className="space-y-2 mb-5">
          {REJECT_REASONS.map((r) => (
            <button
              key={r}
              onClick={() => setReason(r)}
              className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                reason === r
                  ? "bg-red-500/15 border-red-500/40 text-red-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => reason && onConfirm(reason)}
            disabled={!reason}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold disabled:opacity-40 hover:bg-red-500 transition-colors"
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderRow({ order, onAction, onView, isMobile }) {
  const tabletActionButton = () => {
    if (order.status === "NEW" || order.status === "PLACED") return (
      <div className="flex gap-2">
        <button onClick={() => onAction(order.id, "ACCEPTED")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer">
          <Check size={12} /> Accept
        </button>
        <button onClick={() => onAction(order.id, "REJECT_PROMPT")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-red-500/50 text-slate-400 hover:text-red-400 text-xs font-bold transition-colors cursor-pointer">
          <X size={12} /> Reject
        </button>
      </div>
    );
    if (order.status === "ACCEPTED") return <button onClick={() => onAction(order.id, "PREPARING")} className="px-3 py-1.5 rounded-lg bg-amber-600/20 border border-amber-500/40 text-amber-400 text-xs font-bold hover:bg-amber-600/30 transition-colors cursor-pointer">Start Preparing</button>;
    if (order.status === "PREPARING") return <button onClick={() => onAction(order.id, "PACKED")} className="px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/40 text-violet-400 text-xs font-bold hover:bg-violet-600/30 transition-colors cursor-pointer">Mark Packed</button>;
    if (order.status === "PACKED") return <button onClick={() => onAction(order.id, "READY")} className="px-3 py-1.5 rounded-lg bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 text-xs font-bold hover:bg-cyan-600/30 transition-colors cursor-pointer">Mark Ready</button>;
    if (order.status === "READY") return <button onClick={() => onAction(order.id, "OUT_FOR_DELIVERY")} className="px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-bold hover:bg-blue-600/30 transition-colors cursor-pointer">Hand to Delivery</button>;
    if (order.status === "OUT_FOR_DELIVERY") return <button onClick={() => onAction(order.id, "DELIVERED")} className="px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold hover:bg-emerald-600/30 transition-colors cursor-pointer">Mark Delivered</button>;
    return null;
  };

  if (isMobile) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-indigo-400">#{order.id}</span>
              <StatusBadge status={order.status} />
              <PayBadge status={order.paymentStatus} />
            </div>
            <div className="text-sm font-bold text-slate-200 mt-1">{order.customer}</div>
            <div className="text-xs text-slate-500 mt-0.5">{order.items.length} items · <span className="font-mono font-bold text-slate-300">{inr(order.total)}</span> · {order.time}</div>
          </div>
          <button onClick={() => onView(order.id)} className="p-2 rounded-xl hover:bg-slate-700 text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0">
            <Eye size={15} />
          </button>
        </div>
        {tabletActionButton() && (
          <div className="pt-1 border-t border-slate-700/60">{tabletActionButton()}</div>
        )}
      </div>
    );
  }

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors group">
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <button onClick={() => onView(order.id)} className="font-mono text-sm font-bold text-indigo-400 hover:text-indigo-300">
            #{order.id}
          </button>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <div className="text-sm font-semibold text-slate-200">{order.customer}</div>
      </td>
      <td className="px-4 py-3.5 text-sm text-slate-400">{order.items.length} items</td>
      <td className="px-4 py-3.5">
        <span className="font-mono text-sm font-bold text-slate-200">{inr(order.total)}</span>
      </td>
      <td className="px-4 py-3.5"><PayBadge status={order.paymentStatus} /></td>
      <td className="px-4 py-3.5 text-xs text-slate-500">{order.time}</td>
      <td className="px-4 py-3.5"><StatusBadge status={order.status} /></td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          {tabletActionButton()}
          <button onClick={() => onView(order.id)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-600 hover:text-slate-300 transition-colors opacity-0 group-hover:opacity-100">
            <Eye size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function SellerOrders({ orders = [], onUpdateOrderStatus, onOpenOrder }) {
  const [activeTab, setActiveTab] = useState("NEW");
  const [searchQ, setSearchQ] = useState("");
  const [rejectTarget, setRejectTarget] = useState(null);

  const isMatchingTab = (status, tab) => {
    if (tab === "NEW") return status === "NEW" || status === "PLACED";
    return status === tab;
  };

  const filtered = orders.filter((o) => {
    const matchTab = isMatchingTab(o.status, activeTab);
    const q = searchQ.trim().toLowerCase();
    const matchSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      (o.customer && o.customer.toLowerCase().includes(q)) ||
      (o.customerPhone && o.customerPhone.toLowerCase().includes(q));
    return matchTab && matchSearch;
  });

  const tabCount = (tab) =>
    orders.filter((o) => isMatchingTab(o.status, tab)).length;

  const newOrdersCount = tabCount("NEW");

  const handleAction = (orderId, nextStatus) => {
    if (nextStatus === "REJECT_PROMPT") {
      setRejectTarget(orderId);
      return;
    }
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, nextStatus);
    }
  };

  const handleReject = (reason) => {
    if (!rejectTarget) return;
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(rejectTarget, "REJECTED", { rejectReason: reason });
    }
    setRejectTarget(null);
  };

  return (
    <div className="space-y-5 gd-rise">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Orders</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {orders.length} total orders · {newOrdersCount} new
          </p>
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Search order ID / customer…"
            className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto scrollbar-none pb-1">
        {TABS.map((tab) => {
          const count = tabCount(tab);
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
                  : "seller-tab-inactive bg-slate-800 border border-slate-700 text-slate-500 hover:text-slate-300"
              }`}
            >
              {ORDER_STATUS_LABEL[tab]}
              {count > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab ? "bg-white/20 text-white" : "bg-slate-700 text-slate-400"}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-600">
            <ShoppingCart size={40} className="mx-auto mb-4 opacity-30" />
            <div className="text-sm font-bold">No {ORDER_STATUS_LABEL[activeTab]} orders</div>
            <div className="text-xs mt-1">Orders will appear here as they arrive.</div>
          </div>
        ) : (
          <div className="overflow-x-auto ticket-table-container">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 ticket-table-header">
                  {["Order ID", "Customer", "Items", "Amount", "Payment", "Time", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <OrderRow key={order.id} order={order} onAction={handleAction} onView={onOpenOrder} isMobile={false} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-600 bg-slate-900 border border-slate-800 rounded-2xl">
            <ShoppingCart size={36} className="mx-auto mb-3 opacity-30" />
            <div className="text-sm font-bold">No {ORDER_STATUS_LABEL[activeTab]} orders</div>
          </div>
        ) : (
          filtered.map((order) => (
            <OrderRow key={order.id} order={order} onAction={handleAction} onView={onOpenOrder} isMobile={true} />
          ))
        )}
      </div>

      {rejectTarget && <RejectModal onConfirm={handleReject} onClose={() => setRejectTarget(null)} />}
    </div>
  );
}
