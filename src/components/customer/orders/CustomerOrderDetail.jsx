import React, { useState } from "react";
import {
  ArrowLeft, Store, MapPin, Clock, ShoppingBag, CheckCircle2,
  Circle, CreditCard, Receipt, RotateCcw, XCircle, Headphones,
  Download, Star, AlertTriangle, ChevronRight,
} from "lucide-react";
import { MOCK_ORDERS, ORDER_STATUS_LABEL, ORDER_STATUS_COLOR, PAYMENT_STATUS_COLOR, CANCEL_REASONS, RETURN_REASONS, inr } from "../CustomerConstants";

export default function CustomerOrderDetail({ orders = [], orderId, onNav, onUpdateOrderStatus }) {
  const order = orders.find((o) => o.id === orderId) || orders[0] || MOCK_ORDERS[0];
  const [showCancel, setShowCancel] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const [returned, setReturned] = useState(false);

  const statusMeta = ORDER_STATUS_COLOR[order.status] || "bg-slate-700/50 text-slate-400";
  const paymentMeta = PAYMENT_STATUS_COLOR[order.paymentStatus] || "bg-slate-700/50 text-slate-400";

  const handleCancel = () => {
    if (!cancelReason) return;
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(order.id, "CANCELLED", { cancelReason });
    }
    setCancelled(true);
    setShowCancel(false);
  };

  const handleReturn = () => {
    if (!returnReason) return;
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(order.id, "RETURN_REQUESTED", { returnReason });
    }
    setReturned(true);
    setShowReturn(false);
  };

  return (
    <div className="gd-rise max-w-2xl mx-auto space-y-5">
      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNav("orders")}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-sm font-bold text-white">Order #{order.id}</h1>
          <div className="text-xs text-slate-400">{order.placedAt}</div>
        </div>
        <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border ${statusMeta}`}>
          {ORDER_STATUS_LABEL[order.status]}
        </span>
      </div>

      {/* ── Success/Cancel Alert ────────────────────── */}
      {cancelled && (
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-500/10 border border-slate-500/25">
          <XCircle size={16} className="text-slate-400" />
          <div className="text-sm font-bold text-slate-400">Order Cancellation Requested</div>
        </div>
      )}
      {returned && (
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25">
          <CheckCircle2 size={16} className="text-amber-400" />
          <div className="text-sm font-bold text-amber-400">Return Request Submitted</div>
        </div>
      )}

      {/* ── Order Items ─────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Store size={14} className="text-cyan-400" />
          <span className="text-sm font-bold text-slate-200">{order.shopName}</span>
        </div>
        <div className="divide-y divide-slate-800">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={14} className="text-slate-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">{item.name}</div>
                  <div className="text-[10px] text-slate-500">{item.unit} × {item.qty}</div>
                </div>
              </div>
              <div className="text-sm font-bold text-white">{inr(item.price * item.qty)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Price Breakdown ─────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard size={14} className="text-cyan-400" />
          <span className="text-sm font-bold text-slate-200">Payment</span>
        </div>
        {[
          { label: "Subtotal", value: inr(order.subtotal) },
          { label: "Discount", value: `-${inr(order.discount)}`, green: true, show: order.discount > 0 },
          { label: "Delivery Fee", value: order.deliveryFee === 0 ? "FREE" : inr(order.deliveryFee), green: order.deliveryFee === 0 },
          { label: "GST & Taxes", value: inr(order.tax) },
        ].filter((r) => r.show !== false).map(({ label, value, green }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-slate-400">{label}</span>
            <span className={green ? "text-emerald-400 font-semibold" : "text-slate-200"}>{value}</span>
          </div>
        ))}
        <div className="border-t border-slate-800 pt-2 flex justify-between">
          <span className="font-black text-white">Total Paid</span>
          <span className="font-black text-white">{inr(order.total)}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-500">Payment via {order.payment}</span>
          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${paymentMeta}`}>
            {order.paymentStatus}
          </span>
        </div>
      </div>

      {/* ── Delivery Info ───────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={14} className="text-cyan-400" />
          <span className="text-sm font-bold text-slate-200">Delivery Address</span>
        </div>
        <div className="text-xs text-slate-300 font-semibold">{order.address.recipient}</div>
        <div className="text-xs text-slate-400">{order.address.line1}, {order.address.line2}</div>
        <div className="text-xs text-slate-400">{order.address.city} – {order.address.pincode}</div>
        {order.deliveryEta && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400 font-semibold">
            <Clock size={12} />
            ETA: {order.deliveryEta}
          </div>
        )}
      </div>

      {/* ── Order Timeline ──────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
        <div className="text-sm font-bold text-slate-200 mb-3">Order Timeline</div>
        {order.timeline.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              {step.done ? (
                <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />
              ) : (
                <Circle size={16} className="text-slate-700 flex-shrink-0" />
              )}
              {idx < order.timeline.length - 1 && (
                <div className={`w-0.5 h-5 mt-1 ${step.done ? "bg-cyan-500/40" : "bg-slate-800"}`} />
              )}
            </div>
            <div className="flex-1 pb-1">
              <div className={`text-xs font-bold ${step.done ? "text-slate-200" : "text-slate-600"}`}>
                {step.label}
              </div>
              {step.time && <div className="text-[10px] text-slate-500 mt-0.5">{step.time}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Actions ─────────────────────────────────── */}
      <div className="space-y-2.5">
        {/* Track Order */}
        {order.status === "OUT_FOR_DELIVERY" && (
          <button
            onClick={() => onNav("order-tracking", { orderId: order.id })}
            className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold text-sm hover:bg-cyan-500/25 transition-all"
          >
            <div className="flex items-center gap-2"><MapPin size={15} /> Track Live</div>
            <ChevronRight size={16} />
          </button>
        )}

        {/* Reorder */}
        {order.status === "DELIVERED" && (
          <button
            onClick={() => onNav("home")}
            className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-sm hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-center gap-2"><RotateCcw size={15} /> Reorder</div>
            <ChevronRight size={16} />
          </button>
        )}

        {/* Review */}
        {order.canReview && !cancelled && (
          <button
            onClick={() => onNav("review", { orderId: order.id })}
            className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm hover:bg-amber-500/15 transition-all"
          >
            <div className="flex items-center gap-2"><Star size={15} /> Rate & Review</div>
            <ChevronRight size={16} />
          </button>
        )}

        {/* Return */}
        {order.canReturn && !returned && !cancelled && (
          <button
            onClick={() => setShowReturn(true)}
            className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-300 font-bold text-sm hover:bg-orange-500/15 transition-all"
          >
            <div className="flex items-center gap-2"><Receipt size={15} /> Return / Refund</div>
            <ChevronRight size={16} />
          </button>
        )}

        {/* Cancel */}
        {order.canCancel && !cancelled && (
          <button
            onClick={() => setShowCancel(true)}
            className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 font-bold text-sm hover:bg-red-500/15 transition-all"
          >
            <div className="flex items-center gap-2"><XCircle size={15} /> Cancel Order</div>
            <ChevronRight size={16} />
          </button>
        )}

        {/* Support */}
        <button
          onClick={() => onNav("support")}
          className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 font-bold text-sm hover:border-slate-700 transition-all"
        >
          <div className="flex items-center gap-2"><Headphones size={15} /> Get Support</div>
          <ChevronRight size={16} />
        </button>

        {/* Invoice */}
        <button
          onClick={() => {}}
          className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 font-bold text-sm hover:border-slate-700 transition-all"
        >
          <div className="flex items-center gap-2"><Download size={15} /> Download Invoice</div>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* ── Cancel Bottom Sheet ──────────────────────── */}
      {showCancel && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCancel(false)} />
          <div className="relative z-10 w-full bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white">Why are you cancelling?</h3>
              <button onClick={() => setShowCancel(false)} className="text-slate-400 hover:text-white transition-colors">
                <XCircle size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {CANCEL_REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setCancelReason(reason)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left font-semibold transition-all ${
                    cancelReason === reason
                      ? "border-red-500/50 bg-red-500/10 text-red-300"
                      : "border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${cancelReason === reason ? "border-red-400 bg-red-400" : "border-slate-600"}`} />
                  {reason}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowCancel(false)} className="flex-1 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold text-sm">
                Keep Order
              </button>
              <button
                onClick={handleCancel}
                disabled={!cancelReason}
                className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                  cancelReason ? "bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30" : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                Cancel Order
              </button>
            </div>
            <p className="text-center text-xs text-slate-500">Refund will be processed within 3–5 business days</p>
          </div>
        </div>
      )}

      {/* ── Return Bottom Sheet ──────────────────────── */}
      {showReturn && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowReturn(false)} />
          <div className="relative z-10 w-full bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white">Return / Refund Request</h3>
              <button onClick={() => setShowReturn(false)} className="text-slate-400 hover:text-white transition-colors">
                <XCircle size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {RETURN_REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setReturnReason(reason)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left font-semibold transition-all ${
                    returnReason === reason
                      ? "border-amber-500/50 bg-amber-500/10 text-amber-300"
                      : "border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${returnReason === reason ? "border-amber-400 bg-amber-400" : "border-slate-600"}`} />
                  {reason}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowReturn(false)} className="flex-1 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold text-sm">
                Cancel
              </button>
              <button
                onClick={handleReturn}
                disabled={!returnReason}
                className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                  returnReason ? "bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30" : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
