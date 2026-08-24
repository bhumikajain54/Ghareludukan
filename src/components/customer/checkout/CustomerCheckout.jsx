import React, { useState } from "react";
import {
  MapPin, Clock, Tag, ChevronDown, CheckCircle2, AlertTriangle,
  Edit2, Plus, ShieldCheck, CreditCard, Smartphone, Wallet,
  Banknote, ArrowRight, X, ShoppingBag, Lock,
} from "lucide-react";
import { MOCK_ADDRESSES, MOCK_COUPONS, DELIVERY_SLOTS, MOCK_PRODUCTS, INITIAL_CART, inr } from "../CustomerConstants";
import ProductImage from "../../common/ProductImage";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", sub: "Pay via any UPI app", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "wallet", label: "Wallet", sub: "Paytm, PhonePe", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives", icon: Banknote },
];

export default function CustomerCheckout({ cart = [], onNav, onOrderPlaced }) {
  const [selectedAddress, setSelectedAddress] = useState(MOCK_ADDRESSES[0].id);
  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_SLOTS[0].id);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [placing, setPlacing] = useState(false);

  const cartItems = cart && cart.length > 0 ? cart : INITIAL_CART;

  const address = MOCK_ADDRESSES.find((a) => a.id === selectedAddress);
  const slot = DELIVERY_SLOTS.find((s) => s.id === selectedSlot);

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
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
    <div className="gd-rise w-full space-y-6">
      <h1 className="text-xl font-black text-white">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Address, Delivery Slot, Payment Method */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-5">
          {/* ── 1. Delivery Address ─────────────────────── */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl">
            <SectionLabel step="1" label="Delivery Address" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MOCK_ADDRESSES.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={`w-full flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedAddress === addr.id
                      ? "border-cyan-500/50 bg-cyan-500/10 shadow-md shadow-cyan-950/20"
                      : "border-slate-800 hover:border-slate-700 bg-slate-900/60"
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
            </div>
            <button
              onClick={() => onNav("add-address")}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl border border-dashed border-slate-700 text-slate-400 text-xs font-semibold hover:border-cyan-500/40 hover:text-cyan-400 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add New Address
            </button>
          </div>

          {/* ── 2. Serviceability ──────────────────────── */}
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
            <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-emerald-400">Delivery available to this address</div>
              <div className="text-xs text-slate-400 mt-0.5">{address?.city}, {address?.pincode}</div>
            </div>
          </div>

          {/* ── 3. Delivery Slot ────────────────────────── */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl">
            <SectionLabel step="2" label="Delivery Option" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DELIVERY_SLOTS.map((s) => (
                <button
                  key={s.id}
                  disabled={!s.available}
                  onClick={() => setSelectedSlot(s.id)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    !s.available
                      ? "border-slate-800 opacity-40 cursor-not-allowed"
                      : selectedSlot === s.id
                      ? "border-cyan-500/50 bg-cyan-500/10 shadow-md shadow-cyan-950/20"
                      : "border-slate-800 hover:border-slate-700 bg-slate-900/60"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedSlot === s.id ? "border-cyan-500" : "border-slate-600"
                  }`}>
                    {selectedSlot === s.id && <div className="w-2 h-2 rounded-full bg-cyan-500" />}
                  </div>
                  <Clock size={16} className="text-slate-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-200">{s.label} — {s.time}</div>
                    {s.recommended && <div className="text-[10px] text-cyan-400 font-semibold">Recommended</div>}
                  </div>
                  <div className="text-xs font-bold text-emerald-400">{s.fee === 0 ? "FREE" : inr(s.fee)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ── 4. Payment Method ────────────────────────── */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl">
            <SectionLabel step="3" label="Payment Method" />
            <div className="space-y-2">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    paymentMethod === pm.id
                      ? "border-cyan-500/50 bg-cyan-500/10 shadow-md shadow-cyan-950/20"
                      : "border-slate-800 hover:border-slate-700 bg-slate-900/60"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === pm.id ? "border-cyan-500" : "border-slate-600"
                  }`}>
                    {paymentMethod === pm.id && <div className="w-2 h-2 rounded-full bg-cyan-500" />}
                  </div>
                  <pm.icon size={18} className="text-cyan-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-200">{pm.label}</div>
                    <div className="text-[10px] text-slate-500">{pm.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary, Coupon & Pay Button */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5 sticky top-20">
          {/* ── Coupon ───────────────────────────────── */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <Tag size={15} className="text-cyan-400" />
              Apply Coupon
            </div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-emerald-400 font-mono">{appliedCoupon.code}</span>
                  <span className="text-xs text-slate-400">saves {inr(couponDiscount)}</span>
                </div>
                <button onClick={() => { setAppliedCoupon(null); setCouponCode(""); }} className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer">
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
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500/60 font-mono uppercase"
                />
                <button onClick={applyCoupon} className="px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-sm font-bold hover:bg-cyan-500/30 transition-all cursor-pointer">
                  Apply
                </button>
              </div>
            )}
            {couponError && <div className="text-xs text-red-400 font-semibold">{couponError}</div>}
          </div>

          {/* ── Order Summary ────────────────────────── */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl">
            <div className="text-sm font-bold text-slate-200">Order Summary</div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {cartItems.map((item) => {
                const matchedProduct = MOCK_PRODUCTS.find(
                  (p) => p.id === item.productId || p.productId === item.productId || (p.name && item.name && (p.name.toLowerCase().includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(p.name.toLowerCase())))
                );
                const productImage = item.image || matchedProduct?.image || (item.name?.toLowerCase().includes("toor") ? "/products/toor-dal.png" : item.name?.toLowerCase().includes("tomato") ? "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80" : null);
                const productCategory = item.category || matchedProduct?.category || "Grocery & Food";
                const productSubcategory = item.subcategory || matchedProduct?.subcategory;

                return (
                  <div key={item.productId || item.id} className="flex items-center justify-between text-sm py-1.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <ProductImage
                          src={productImage}
                          alt={item.name}
                          category={productCategory}
                          subcategory={productSubcategory}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-slate-300 text-xs truncate font-medium">{item.name} × {item.qty}</span>
                    </div>
                    <span className="font-bold text-slate-100 text-xs flex-shrink-0">{inr(item.price * item.qty)}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-slate-800 pt-3 space-y-2">
              {[
                { label: "Subtotal", value: inr(subtotal) },
                { label: "Delivery", value: deliveryFee === 0 ? "FREE" : inr(deliveryFee), green: deliveryFee === 0 },
                ...(couponDiscount > 0 ? [{ label: `Discount (${appliedCoupon.code})`, value: `-${inr(couponDiscount)}`, green: true }] : []),
                { label: "GST & Taxes", value: inr(tax) },
              ].map(({ label, value, green }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-slate-400 text-xs">{label}</span>
                  <span className={`text-xs ${green ? "text-emerald-400 font-semibold" : "text-slate-200"}`}>{value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
              <span className="font-black text-white">Total Payable</span>
              <span className="font-black text-white text-lg">{inr(total)}</span>
            </div>
          </div>

          {/* ── Place Order CTA ──────────────────────────── */}
          <div className="space-y-2">
            <button
              onClick={placeOrder}
              disabled={placing}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-base transition-all gd-tap shadow-xl cursor-pointer ${
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
              By placing this order you agree to our Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
