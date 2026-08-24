import React, { useState } from "react";
import {
  ShoppingBag, Plus, Minus, Trash2, Heart, Tag, ChevronRight,
  ArrowRight, Store, AlertTriangle, ShoppingCart, X,
} from "lucide-react";
import { inr, MOCK_COUPONS, MOCK_PRODUCTS } from "../CustomerConstants";
import ProductImage from "../../common/ProductImage";

function CartItem({ item, onQtyChange, onRemove, onMoveToWishlist }) {
  const matchedProduct = MOCK_PRODUCTS.find(
    (p) => p.id === item.productId || p.productId === item.productId || (p.name && item.name && p.name.toLowerCase() === item.name.toLowerCase())
  );
  const productImage = item.image || matchedProduct?.image;
  const productCategory = item.category || matchedProduct?.category || "Grocery & Food";
  const productSubcategory = item.subcategory || matchedProduct?.subcategory;

  return (
    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
      <div className="flex items-start gap-3">
        {/* Thumb */}
        <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-700/50 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
          <ProductImage
            src={productImage}
            alt={item.name}
            category={productCategory}
            subcategory={productSubcategory}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-slate-100 leading-tight">{item.name}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Store size={10} className="text-slate-500" />
            <span className="text-[10px] text-slate-500">{item.shopName}</span>
          </div>
          <div className="text-sm font-black text-white mt-1.5">{inr(item.price)}</div>
        </div>
        {/* Remove */}
        <button
          onClick={() => onRemove(item.productId)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        {/* Qty Selector */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-xl px-1 py-1">
          <button
            onClick={() => onQtyChange(item.productId, item.qty - 1)}
            className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 flex items-center justify-center transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="w-8 text-center text-sm font-black text-white">{item.qty}</span>
          <button
            onClick={() => onQtyChange(item.productId, item.qty + 1)}
            className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 flex items-center justify-center transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
        {/* Move to Wishlist */}
        <button
          onClick={() => onMoveToWishlist(item.productId)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-pink-400 transition-colors"
        >
          <Heart size={12} />
          Save
        </button>
        {/* Line Total */}
        <div className="text-sm font-black text-white">{inr(item.price * item.qty)}</div>
      </div>

      {!item.available && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/25">
          <AlertTriangle size={13} className="text-red-400" />
          <span className="text-xs font-semibold text-red-400">This item is no longer available</span>
        </div>
      )}
    </div>
  );
}

export default function CustomerCart({ cart, onNav, onQtyChange, onRemove, onMoveToWishlist }) {
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal >= 300 ? 0 : 25;
  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === "FIXED"
      ? appliedCoupon.value
      : Math.min(Math.round(subtotal * appliedCoupon.value / 100), appliedCoupon.maxDiscount)
    : 0;
  const tax = Math.round((subtotal - couponDiscount) * 0.05);
  const total = subtotal + deliveryFee - couponDiscount + tax;

  const applyCoupon = () => {
    const found = MOCK_COUPONS.find((c) => c.code === couponInput.toUpperCase());
    if (!found) { setCouponError("Invalid coupon code"); return; }
    if (found.expired) { setCouponError("This coupon has expired"); return; }
    if (!found.eligible) { setCouponError(found.reason || "Not applicable"); return; }
    if (subtotal < found.minOrder) { setCouponError(`Minimum order ₹${found.minOrder} required`); return; }
    setAppliedCoupon(found);
    setCouponError("");
  };

  const removeCoupon = () => { setAppliedCoupon(null); setCouponInput(""); setCouponError(""); };

  if (cart.length === 0) {
    return (
      <div className="gd-rise flex flex-col items-center justify-center py-20 text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center">
          <ShoppingCart size={36} className="text-slate-600" />
        </div>
        <div>
          <div className="text-lg font-black text-white">Your cart is empty</div>
          <p className="text-sm text-slate-400 mt-1">Add products from nearby shops to get started</p>
        </div>
        <button
          onClick={() => onNav("home")}
          className="px-6 py-3 rounded-2xl bg-cyan-500 text-white text-sm font-bold hover:bg-cyan-400 transition-all gd-tap"
        >
          Browse Shops
        </button>
      </div>
    );
  }

  return (
    <div className="gd-rise w-full space-y-5">
      <h1 className="text-xl font-black text-white">
        My Cart <span className="text-slate-500 text-sm font-normal">({cart.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Cart Items & Delivery Info */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {/* ── Cart Items ──────────────────────────────── */}
          <div className="space-y-3">
            {cart.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onQtyChange={onQtyChange}
                onRemove={onRemove}
                onMoveToWishlist={onMoveToWishlist}
              />
            ))}
          </div>

          {/* ── Delivery Info ───────────────────────────── */}
          {deliveryFee === 0 ? (
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-xs font-semibold text-emerald-400">
              🎉 Free delivery applied!
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
              Add <span className="text-white font-bold mx-1">{inr(300 - subtotal)}</span> more for free delivery
            </div>
          )}
        </div>

        {/* Right Column: Coupon, Price Summary & Checkout CTA */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4 sticky top-20">
          {/* ── Coupon ──────────────────────────────────── */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <Tag size={15} className="text-cyan-400" />
              Apply Coupon
            </div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div>
                  <span className="text-sm font-bold text-emerald-400 font-mono">{appliedCoupon.code}</span>
                  <span className="text-xs text-slate-400 ml-2">— {appliedCoupon.description}</span>
                </div>
                <button onClick={removeCoupon} className="text-xs text-slate-500 hover:text-red-400 transition-colors ml-2 cursor-pointer">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500/60 transition-all font-mono uppercase"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-sm font-bold hover:bg-cyan-500/30 transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            )}
            {couponError && <div className="text-xs text-red-400 font-semibold">{couponError}</div>}
            <button
              onClick={() => onNav("coupons")}
              className="flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors cursor-pointer"
            >
              View all available coupons <ChevronRight size={12} />
            </button>
          </div>

          {/* ── Price Summary ───────────────────────────── */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl">
            <div className="text-sm font-bold text-slate-200">Price Details</div>
            <div className="space-y-2">
              {[
                { label: `Subtotal (${cart.length} items)`, value: inr(subtotal) },
                { label: "Delivery Fee", value: deliveryFee === 0 ? "FREE" : inr(deliveryFee), green: deliveryFee === 0 },
                ...(couponDiscount > 0 ? [{ label: `Coupon (${appliedCoupon.code})`, value: `-${inr(couponDiscount)}`, green: true }] : []),
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
            {couponDiscount > 0 && (
              <div className="text-xs text-emerald-400 font-semibold">
                🎉 You save {inr(couponDiscount)} with this order!
              </div>
            )}
          </div>

          {/* ── Checkout CTA ────────────────────────────── */}
          <button
            onClick={() => onNav("checkout")}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-black text-base shadow-lg shadow-cyan-900/50 transition-all gd-tap cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <div className="flex items-center gap-2">
              <span>{inr(total)}</span>
              <ArrowRight size={18} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
