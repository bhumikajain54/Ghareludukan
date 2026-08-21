import React, { useState } from "react";
import {
  ArrowLeft, Check, X, Package, PackageCheck, Truck,
  CheckCircle2, Clock, Printer, Phone, AlertCircle, ChevronRight,
} from "lucide-react";
import { MOCK_ORDERS, ORDER_STATUS_COLOR, ORDER_STATUS_LABEL, REJECT_REASONS, inr } from "../SellerConstants";

const STATE_FLOW = ["NEW", "ACCEPTED", "PREPARING", "PACKED", "READY", "OUT_FOR_DELIVERY", "DELIVERED"];

const STATE_ICONS = {
  NEW: Clock,
  ACCEPTED: Check,
  PREPARING: Package,
  PACKED: PackageCheck,
  READY: CheckCircle2,
  OUT_FOR_DELIVERY: Truck,
  DELIVERED: CheckCircle2,
  REJECTED: X,
  CANCELLED: X,
};

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
            <div className="font-bold text-slate-100 text-sm">Reject this order?</div>
            <div className="text-xs text-slate-500">Select a reason before rejecting.</div>
          </div>
        </div>
        <div className="space-y-2 mb-5">
          {REJECT_REASONS.map((r) => (
            <button key={r} onClick={() => setReason(r)}
              className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${reason === r ? "bg-red-500/15 border-red-500/40 text-red-300" : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"}`}>
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800">Cancel</button>
          <button onClick={() => reason && onConfirm(reason)} disabled={!reason}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold disabled:opacity-40 hover:bg-red-500 transition-colors">
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SellerOrderDetail({ orders = [], orderId, onBack, onUpdateOrderStatus }) {
  const [showReject, setShowReject] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleAction = (nextStatus) => {
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(order.id, nextStatus);
    }
    showToast(`Order ${ORDER_STATUS_LABEL[nextStatus] || nextStatus}`);
  };

  const handleReject = (reason) => {
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(order.id, "REJECTED", { rejectReason: reason });
    }
    setShowReject(false);
    showToast("Order Rejected");
  };

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-600 gd-rise">
        <Package size={40} className="mb-4 opacity-30" />
        <div className="text-sm font-bold">Order not found</div>
        <button onClick={onBack} className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-sm font-semibold">Go Back</button>
      </div>
    );
  }

  const currentNormalizedStatus = order.status === "PLACED" ? "NEW" : order.status;
  const currentIndex = STATE_FLOW.indexOf(currentNormalizedStatus);
  const isTerminal = ["REJECTED", "CANCELLED"].includes(order.status);

  const renderActionButton = () => {
    if (isTerminal) return null;
    const actions = {
      NEW: { label: "Accept Order", next: "ACCEPTED", color: "bg-indigo-600 hover:bg-indigo-500 text-white" },
      PLACED: { label: "Accept Order", next: "ACCEPTED", color: "bg-indigo-600 hover:bg-indigo-500 text-white" },
      ACCEPTED: { label: "Start Preparing", next: "PREPARING", color: "bg-amber-600 hover:bg-amber-500 text-white" },
      PREPARING: { label: "Mark as Packed", next: "PACKED", color: "bg-violet-600 hover:bg-violet-500 text-white" },
      PACKED: { label: "Mark as Ready", next: "READY", color: "bg-cyan-600 hover:bg-cyan-500 text-white" },
      READY: { label: "Handed to Delivery", next: "OUT_FOR_DELIVERY", color: "bg-blue-600 hover:bg-blue-500 text-white" },
      OUT_FOR_DELIVERY: { label: "Mark Delivered", next: "DELIVERED", color: "bg-emerald-600 hover:bg-emerald-500 text-white" },
    };
    const action = actions[order.status];
    if (!action) return null;
    return (
      <button onClick={() => handleAction(action.next)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${action.color}`}>
        <Check size={15} />
        {action.label}
      </button>
    );
  };

  return (
    <div className="space-y-5 gd-rise w-full">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-extrabold text-slate-100 font-mono">Order #{order.id}</h1>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${ORDER_STATUS_COLOR[order.status]}`}>
              {ORDER_STATUS_LABEL[order.status]}
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-1">{order.date} · {order.time} · {order.payment}</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Order Timeline</div>
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {STATE_FLOW.map((step, i) => {
            const Icon = STATE_ICONS[step] || Check;
            const done = isTerminal ? false : i <= currentIndex;
            const active = !isTerminal && i === currentIndex;
            return (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    active ? "bg-indigo-600 ring-4 ring-indigo-600/30" : done ? "bg-emerald-500/20 border border-emerald-500/40" : "bg-slate-800 border border-slate-700"
                  }`}>
                    <Icon size={14} className={active ? "text-white" : done ? "text-emerald-400" : "text-slate-600"} />
                  </div>
                  <span className={`text-[9px] font-bold text-center w-14 leading-tight ${
                    active ? "text-indigo-400" : done ? "text-emerald-400" : "text-slate-600"
                  }`}>
                    {ORDER_STATUS_LABEL[step] || step}
                  </span>
                </div>
                {i < STATE_FLOW.length - 1 && (
                  <div className={`flex-1 h-0.5 min-w-[16px] mx-1 rounded-full ${i < currentIndex && !isTerminal ? "bg-emerald-500/40" : "bg-slate-800"}`} />
                )}
              </React.Fragment>
            );
          })}
          {isTerminal && (
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0 ml-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/15 border border-red-500/30">
                <X size={14} className="text-red-400" />
              </div>
              <span className="text-[9px] font-bold text-red-400 text-center w-14 leading-tight">{ORDER_STATUS_LABEL[order.status]}</span>
            </div>
          )}
        </div>
        {order.history && (
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-1.5">
            {order.history.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span className="font-semibold text-slate-400">{ORDER_STATUS_LABEL[h.status] || h.status}</span>
                <span>·</span>
                <span>{h.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left: Items + Customer */}
        <div className="lg:col-span-3 space-y-4">
          {/* Customer Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Customer & Delivery</div>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-indigo-400">{order.customer[0]}</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200">{order.customer}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{order.address}</div>
                  {order.deliveryInstructions && (
                    <div className="text-xs text-amber-400 mt-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1.5">
                      📝 {order.deliveryInstructions}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Order Items</div>
            <div className="space-y-3">
              {order.items.map((item, i) => {
                const lineTotal = item.qty * item.price - item.discount;
                const tax = Math.round(lineTotal * item.gst / 100);
                return (
                  <div key={i} className="seller-item-box flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="w-11 h-11 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <Package size={18} className="text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-200 truncate">{item.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {inr(item.price)} × {item.qty}
                        {item.discount > 0 && <span className="text-emerald-400 ml-1.5">−{inr(item.discount)} off</span>}
                        {item.gst > 0 && <span className="text-slate-600 ml-1.5">+{inr(tax)} GST</span>}
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-200">{inr(lineTotal + tax)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Payment + Actions */}
        <div className="lg:col-span-2 space-y-4">
          {/* Payment Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Payment Summary</div>
            <div className="space-y-2 text-sm">
              {[
                { label: "Subtotal", value: inr(order.subtotal) },
                { label: "Discount", value: order.discount ? `−${inr(order.discount)}` : "—", cls: "text-emerald-400" },
                { label: "GST & Taxes", value: inr(order.tax) },
                { label: "Delivery Charge", value: order.deliveryCharge ? inr(order.deliveryCharge) : "Free", cls: "text-emerald-400" },
              ].map(({ label, value, cls }) => (
                <div key={label} className="flex items-center justify-between text-slate-400">
                  <span>{label}</span>
                  <span className={`font-mono font-semibold ${cls || "text-slate-300"}`}>{value}</span>
                </div>
              ))}
              <div className="border-t border-slate-800 pt-2 mt-2 flex items-center justify-between">
                <span className="font-bold text-slate-200">Total</span>
                <span className="font-mono font-extrabold text-lg text-slate-100">{inr(order.total)}</span>
              </div>
              <div className={`flex items-center justify-between pt-1`}>
                <span className="text-xs text-slate-500">Payment Status</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  order.paymentStatus === "PAID" ? "bg-emerald-500/15 text-emerald-400" : order.paymentStatus === "REFUNDED" ? "bg-blue-500/15 text-blue-400" : "bg-amber-500/15 text-amber-400"
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Payment Method</span>
                <span className="text-xs font-bold text-slate-400">{order.payment}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {!isTerminal && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</div>
              <div className="flex gap-2">
                {renderActionButton()}
                {order.status === "NEW" && (
                  <button onClick={() => setShowReject(true)} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700 hover:border-red-500/40 text-slate-400 hover:text-red-400 text-sm font-bold transition-colors">
                    <X size={15} />
                    Reject
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-colors">
                  <Printer size={14} />
                  Print Invoice
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-colors">
                  <Printer size={14} />
                  Packing Slip
                </button>
              </div>
            </div>
          )}

          {order.rejectReason && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <div className="text-xs font-bold text-red-400 mb-1">Rejection Reason</div>
              <div className="text-sm text-red-300">{order.rejectReason}</div>
            </div>
          )}
        </div>
      </div>

      {showReject && <RejectModal onConfirm={handleReject} onClose={() => setShowReject(false)} />}

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl gd-rise">
          <CheckCircle2 size={16} className="text-emerald-400" />
          {toastMsg}
        </div>
      )}
    </div>
  );
}
