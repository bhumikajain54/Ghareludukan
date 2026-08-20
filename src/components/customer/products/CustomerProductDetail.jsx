import React, { useState } from "react";
import {
  ArrowLeft, Star, ShoppingBag, Heart, Share2, ShieldCheck,
  Clock, Store, Plus, Minus, AlertTriangle, CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { MOCK_PRODUCTS, inr } from "../CustomerConstants";

function StarRating({ rating, count }) {
  return (
    <span className="flex items-center gap-1">
      <Star size={13} className="text-amber-400 fill-amber-400" />
      <span className="font-bold text-amber-400">{rating}</span>
      {count && <span className="text-xs text-slate-500">({count} reviews)</span>}
    </span>
  );
}

const MOCK_REVIEWS = [
  { name: "Rahul S.", rating: 5, text: "Excellent quality! Fresh and exactly as described.", verified: true, date: "Aug 18" },
  { name: "Sunita J.", rating: 4, text: "Good product, delivered on time. Will order again.", verified: true, date: "Aug 12" },
];

export default function CustomerProductDetail({ productId, onNav, onAddToCart }) {
  const product = MOCK_PRODUCTS.find((p) => p.id === productId) || MOCK_PRODUCTS[0];
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAdd = () => {
    onAddToCart({ ...product, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stockStatus = !product.available
    ? { label: "Out of Stock", color: "text-red-400", bg: "bg-red-500/10 border-red-500/25", icon: AlertTriangle }
    : product.lowStock
    ? { label: "Low Stock", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/25", icon: AlertTriangle }
    : { label: "In Stock", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/25", icon: CheckCircle2 };

  return (
    <div className="gd-rise space-y-5 max-w-2xl mx-auto">
      {/* ── Back ───────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNav("home")}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="flex-1 text-sm font-bold text-white truncate">{product.name}</h1>
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors"
        >
          <Heart size={16} className={wishlisted ? "text-red-400 fill-red-400" : ""} />
        </button>
        <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors">
          <Share2 size={16} />
        </button>
      </div>

      {/* ── Product Image ───────────────────────────── */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-800 h-56 sm:h-72 flex items-center justify-center overflow-hidden">
        <div className="w-24 h-24 rounded-3xl bg-slate-700/50 border-2 border-slate-600/40 flex items-center justify-center">
          <ShoppingBag size={40} className="text-slate-400" />
        </div>
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
            -{product.discount}% OFF
          </span>
        )}
      </div>

      {/* ── Product Info ────────────────────────────── */}
      <div className="space-y-3">
        <div>
          <h2 className="text-xl font-black text-white leading-tight">{product.name}</h2>
          <div className="text-sm text-slate-400 mt-1">{product.unit}</div>
        </div>

        {/* Price Block */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-white">{inr(product.price)}</span>
          {product.discount > 0 && (
            <>
              <span className="text-lg text-slate-500 line-through">{inr(product.originalPrice)}</span>
              <span className="text-sm font-bold text-emerald-400">{product.discount}% off</span>
            </>
          )}
        </div>

        {/* Tax note */}
        <div className="text-[10px] text-slate-500">Inclusive of all taxes</div>

        {/* Rating */}
        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Stock Status */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${stockStatus.bg}`}>
          <stockStatus.icon size={14} className={stockStatus.color} />
          <span className={`text-xs font-bold ${stockStatus.color}`}>{stockStatus.label}</span>
          {product.lowStock && <span className="text-xs text-slate-400">— Only a few left</span>}
        </div>

        {/* Shop & Delivery */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNav("shop-detail", { shopId: product.shopId })}
            className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all text-left"
          >
            <Store size={16} className="text-cyan-400 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-slate-500">Sold by</div>
              <div className="text-xs font-bold text-slate-200 truncate">{product.shopName}</div>
            </div>
            <ChevronRight size={12} className="text-slate-500 flex-shrink-0 ml-auto" />
          </button>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <Clock size={16} className="text-emerald-400 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-slate-500">Delivery</div>
              <div className="text-xs font-bold text-emerald-400">{product.deliveryEta}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Qty + Add to Cart ───────────────────────── */}
      {product.available && (
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center gap-1 px-1 py-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center text-sm font-black text-white">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(10, q + 1))}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-3 rounded-2xl text-sm font-black flex items-center justify-center gap-2 transition-all gd-tap ${
              added
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/40"
                : "bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-900/50"
            }`}
          >
            {added ? <><CheckCircle2 size={16} /> Added to Cart!</> : <><ShoppingBag size={16} /> Add to Cart — {inr(product.price * qty)}</>}
          </button>
        </div>
      )}

      {/* Buy Now */}
      {product.available && (
        <button
          onClick={() => { onAddToCart({ ...product, qty }); onNav("cart"); }}
          className="w-full py-3 rounded-2xl text-sm font-black bg-slate-900 border border-cyan-500/50 text-cyan-400 hover:bg-slate-800 transition-all gd-tap"
        >
          Buy Now
        </button>
      )}

      {/* ── Description ─────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="text-sm font-bold text-slate-200">Product Description</div>
        <p className="text-xs text-slate-400 leading-relaxed">{product.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {product.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-lg bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Reviews ─────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-100">Reviews</h3>
          <button className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
            See all <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-3">
          {MOCK_REVIEWS.map((r, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{r.name}</div>
                    {r.verified && (
                      <div className="flex items-center gap-1">
                        <ShieldCheck size={9} className="text-emerald-400" />
                        <span className="text-[9px] text-emerald-400 font-semibold">Verified Purchase</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="font-bold text-amber-400">{r.rating}</span>
                  <span className="text-slate-500 ml-1">{r.date}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Related Products ─────────────────────────── */}
      {relatedProducts.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-100 mb-3">You May Also Like</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
            {relatedProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => onNav("product-detail", { productId: p.id })}
                className="flex-shrink-0 w-36 p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all text-left"
              >
                <div className="w-full h-20 rounded-xl bg-slate-800 flex items-center justify-center mb-2">
                  <ShoppingBag size={20} className="text-slate-500" />
                </div>
                <div className="text-xs font-bold text-slate-200 truncate">{p.name}</div>
                <div className="text-xs font-black text-white mt-1">{inr(p.price)}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
