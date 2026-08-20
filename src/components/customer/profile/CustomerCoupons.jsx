import React, { useState } from "react";
import {
  Tag, Copy, Check, Sparkles, Clock, ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { MOCK_COUPONS, inr } from "../CustomerConstants";

export default function CustomerCoupons({ onNav }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyCoupon = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="gd-rise space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white">Coupons & Offers</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Exclusive neighborhood promo codes, festival sales, and instant shop discounts
        </p>
      </div>

      {/* Coupon Grid */}
      <div className="space-y-3.5">
        {MOCK_COUPONS.map((coupon) => (
          <div
            key={coupon.id}
            className={`p-5 rounded-3xl bg-slate-900 border transition-all ${
              coupon.expired
                ? "border-slate-800 opacity-60"
                : "border-cyan-500/30 shadow-xl shadow-cyan-950/20 hover:border-cyan-500/50"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-sm font-black text-cyan-400 tracking-wider bg-cyan-500/10 px-2.5 py-1 rounded-xl border border-cyan-500/30">
                    {coupon.code}
                  </span>
                  {coupon.expired ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-bold border border-red-500/30">
                      Expired
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                      <Sparkles size={10} /> Active Coupon
                    </span>
                  )}
                </div>

                <div className="text-sm font-extrabold text-white mt-1">
                  {coupon.name} — {coupon.description}
                </div>

                <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                  <span>Min. Order: <strong className="text-slate-200">{inr(coupon.minOrder)}</strong></span>
                  <span>·</span>
                  <span>Max Discount: <strong className="text-slate-200">{inr(coupon.maxDiscount)}</strong></span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock size={11} /> Valid till {coupon.validTill}
                  </span>
                </div>
              </div>

              {!coupon.expired && (
                <div className="flex sm:flex-col items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => copyCoupon(coupon.code)}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check size={14} /> <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> <span>Copy Code</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onNav("cart")}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>Use in Cart</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
