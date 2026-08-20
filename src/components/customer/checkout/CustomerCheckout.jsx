import React, { useState } from "react";
import {
  MapPin, Clock, Tag, ChevronDown, CheckCircle2, AlertTriangle,
  Edit2, Plus, ShieldCheck, CreditCard, Smartphone, Wallet,
  Banknote, ArrowRight, X, ShoppingBag, Lock,
} from "lucide-react";
import { MOCK_ADDRESSES, MOCK_COUPONS, DELIVERY_SLOTS, inr } from "../CustomerConstants";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", sub: "Pay via any UPI app", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "wallet", label: "Wallet", sub: "Paytm, PhonePe", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives", icon: Banknote },
];

const CART_ITEMS = [
  { productId: "p1", name: "Toor Dal", qty: 2, price: 185, unit: "1 kg" },
  { productId: "p4", name: "Farm Fresh Tomatoes", qty: 1, price: 45, unit: "1 kg" },
];

export default function CustomerCheckout({ onNav, onOrderPlaced }) {
  const [selectedAddress, setSelectedAddress] = useState(MOCK_ADDRESSES[0].id);
  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_SLOTS[0].id);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [placing, setPlacing] = useState(false);

  const address = MOCK_ADDRESSES.find((a) => a.id === selectedAddress);
  const slot = DELIVERY_SLOTS.find((s) => s.id === selectedSlot);

  const subtotal = CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = subtotal >= 300 ? 0 : 25;
  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === "FIXED"
      ? appliedCoupon.value
      : Math.min(Math.round(subtotal * appliedCoupon.value / 100), appliedCoupon.maxDiscount)
    : 0;
  const tax = Math.round((subtotal - couponDiscount) * 0.05);
  const total = subtotal + deliveryFee - couponDiscount + tax;

  const applyCoupon = () => {
    const found = MOCK_COUPONS.find((c) => c.code === couponCode.toUpperCase());
    if (!found) { setCouponError("Invalid code"); return; }
    if (found.expired) { setCouponError("Coupon expired"); return; }
    if (!found.eligible) { setCouponError(found.reason || "Not applicable"); return; }
    if (subtotal < found.minOrder) { setCouponError(`Min order ${inr(found.minOrder)} required`); return; }
    setAppliedCoupon(found); setCouponError("");
  };

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      onOrderPlaced?.("GLD20513");
      onNav("order-confirm", { orderId: "GLD20513" });
    }, 1800);
  };

  const SectionLabel = ({ step, label }) => (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
        <span className="text-[10px] font-black text-cyan-400">{step}</span>
      </div>
      <span className="text-sm font-bold text-slate-200">{label}</span>
    </div>
  );

  return (
    <div className="gd-rise max-w-2xl mx-auto space-y-5">
      <h1 className="text-base font-bold text-white">Checkout</h1>

      {/* ── 1. Delivery Address ─────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <SectionLabel step="1" label="Delivery Address" />
        {MOCK_ADDRESSES.map((addr) => (
          <button
            key={addr.id}
            onClick={() => setSelectedAddress(addr.id)}
            className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
              selectedAddress === addr.id
                ? "border-cyan-500/50 bg-cyan-500/5"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
              selectedAddress === addr.id ? "border-cyan-500" : "border-slate-600"
            }`}>
              {selectedAddress === addr.id && <div className="w-2 h-2 rounded-full bg-cyan-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-100">{addr.label}</span>
                {addr.isDefault && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30">
                    Default
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{addr.recipient} · {addr.phone}</div>
              <div className="text-xs text-slate-500 mt-0.5">{addr.line1}, {addr.line2}, {addr.city} - {addr.pincode}</div>
            </div>
          </button>
        ))}
        <button
          onClick={() => onNav("add-address")}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-slate-700 text-slate-400 text-xs font-semibold hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
        >
          <Plus size={14} /> Add New Address
        </button>
      </div>

      {/* ── 2. Serviceability ──────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
        <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
        <div>
          <div className="text-sm font-bold text-emerald-400">Delivery available to this address</div>
          <div className="text-xs text-slate-400 mt-0.5">{address?.city}, {address?.pincode}</div>
        </div>
      </div>

      {/* ── 3. Delivery Slot ────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <SectionLabel step="2" label="Delivery Option" />
        <div className="space-y-2">
          {DELIVERY_SLOTS.map((s) => (
            <button
              key={s.id}
              disabled={!s.available}
              onClick={() => setSelectedSlot(s.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                !s.available
                  ? "border-slate-800 opacity-40 cursor-not-allowed"
                  : selectedSlot === s.id
                  ? "border-cyan-500/50 bg-cyan-500/5"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedSlot === s.id ? "border-cyan-500" : "border-slate-600"
              }`}>
                {selectedSlot === s.id && <div className="w-2 h-2 rounded-full bg-cyan-500" />}
              </div>
              <Clock size={14} className="text-slate-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-200">{s.label} — {s.time}</div>
                {s.recommended && <div className="text-[10px] text-cyan-400 font-semibold">Recommended</div>}
              </div>
              <div className="text-xs font-bold text-emerald-400">{s.fee === 0 ? "FREE" : inr(s.fee)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── 4. Coupon ───────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <SectionLabel step="3" label="Apply Coupon" />
        {appliedCoupon ? (
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-center gap-2">
              <Tag size={13} className="text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400 font-mono">{appliedCoupon.code}</span>
              <span className="text-xs text-slate-400">saves {inr(couponDiscount)}</span>
            </div>
            <button onClick={() => { setAppliedCoupon(null); setCouponCode(""); }} className="text-slate-500 hover:text-red-400 transition-colors">
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500/60 font-mono uppercase"
            />
            <button onClick={applyCoupon} className="px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-sm font-bold hover:bg-cyan-500/30 transition-all">
              Apply
            </button>
          </div>
        )}
        {couponError && <div className="text-xs text-red-400 font-semibold">{couponError}</div>}
      </div>

      {/* ── 5. Order Summary ────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <SectionLabel step="4" label="Order Summary" />
        {CART_ITEMS.map((item) => (
          <div key={item.productId} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
                <ShoppingBag size={12} className="text-slate-500" />
              </div>
              <span className="text-slate-300">{item.name} × {item.qty}</span>
            </div>
            <span className="font-bold text-slate-100">{inr(item.price * item.qty)}</span>
          </div>
        ))}
        <div className="border-t border-slate-800 pt-3 space-y-2">
          {[
            { label: "Subtotal", value: inr(subtotal) },
            { label: "Delivery", value: deliveryFee === 0 ? "FREE" : inr(deliveryFee), green: deliveryFee === 0 },
            ...(couponDiscount > 0 ? [{ label: `Discount (${appliedCoupon.code})`, value: `-${inr(couponDiscount)}`, green: true }] : []),
            { label: "GST & Taxes", value: inr(tax) },
          ].map(({ label, value, green }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-slate-400">{label}</span>
              <span className={green ? "text-emerald-400 font-semibold" : "text-slate-200"}>{value}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 pt-3 flex justify-between">
          <span className="font-black text-white">Total Payable</span>
          <span className="font-black text-white text-lg">{inr(total)}</span>
        </div>
      </div>

      {/* ── 6. Payment Method ────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <SectionLabel step="5" label="Payment Method" />
        <div className="space-y-2">
          {PAYMENT_METHODS.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setPaymentMethod(pm.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                paymentMethod === pm.id
                  ? "border-cyan-500/50 bg-cyan-500/5"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                paymentMethod === pm.id ? "border-cyan-500" : "border-slate-600"
              }`}>
                {paymentMethod === pm.id && <div className="w-2 h-2 rounded-full bg-cyan-500" />}
              </div>
              <pm.icon size={16} className="text-slate-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-200">{pm.label}</div>
                <div className="text-[10px] text-slate-500">{pm.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Place Order CTA ──────────────────────────── */}
      <div className="space-y-2">
        <button
          onClick={placeOrder}
          disabled={placing}
          className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-base transition-all gd-tap shadow-lg ${
            placing
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-400 text-white shadow-cyan-900/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <Lock size={16} />
            <span>{placing ? "Placing Order…" : `Place Order & Pay`}</span>
          </div>
          {!placing && (
            <div className="flex items-center gap-2">
              <span>{inr(total)}</span>
              <ArrowRight size={18} />
            </div>
          )}
        </button>
        <p className="text-center text-[10px] text-slate-500">
          By placing this order you agree to our Terms & Conditions. Price and availability are confirmed before order creation.
        </p>
      </div>
    </div>
  );
}
