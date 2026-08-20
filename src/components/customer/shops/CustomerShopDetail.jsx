import React, { useState } from "react";
import {
  ArrowLeft, Star, MapPin, Clock, ShieldCheck, Tag, Phone,
  ShoppingBag, Heart, ChevronRight, CheckCircle2, XCircle, Share2,
} from "lucide-react";
import { MOCK_SHOPS, MOCK_PRODUCTS, inr } from "../CustomerConstants";

function StarRating({ rating, count }) {
  return (
    <span className="flex items-center gap-1">
      <Star size={13} className="text-amber-400 fill-amber-400" />
      <span className="text-sm font-bold text-amber-400">{rating}</span>
      {count && <span className="text-xs text-slate-500">({count} reviews)</span>}
    </span>
  );
}

function ProductRow({ product, onNav, onAddToCart }) {
  return (
    <button
      onClick={() => onNav("product-detail", { productId: product.id })}
      className="w-full flex items-center gap-3 p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/40 transition-all gd-tap text-left"
    >
      <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
        <ShoppingBag size={22} className="text-slate-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-slate-100 truncate">{product.name}</div>
        <div className="text-xs text-slate-500 mt-0.5">{product.unit}</div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-black text-white text-sm">{inr(product.price)}</span>
          {product.discount > 0 && (
            <span className="text-[10px] text-slate-500 line-through">{inr(product.originalPrice)}</span>
          )}
          {product.discount > 0 && (
            <span className="text-[10px] text-emerald-400 font-bold">{product.discount}% off</span>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">
        {product.available ? (
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 transition-colors"
          >
            + Add
          </button>
        ) : (
          <span className="text-[10px] text-red-400 font-semibold">Out of Stock</span>
        )}
      </div>
    </button>
  );
}

export default function CustomerShopDetail({ shopId, onNav, onAddToCart }) {
  const shop = MOCK_SHOPS.find((s) => s.id === shopId) || MOCK_SHOPS[0];
  const products = MOCK_PRODUCTS.filter((p) => p.shopId === shop.id);
  const [saved, setSaved] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", ...new Set(products.map((p) => p.subcategory))];
  const filtered = activeCategory === "all" ? products : products.filter((p) => p.subcategory === activeCategory);

  const mockReviews = [
    { name: "Rahul S.", rating: 5, text: "Very fresh products and fast delivery. Highly recommended!", verified: true, date: "Aug 18" },
    { name: "Priya G.", rating: 4, text: "Good quality. Packaging could be better but products are excellent.", verified: true, date: "Aug 14" },
  ];

  return (
    <div className="gd-rise space-y-5">
      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNav("home")}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-base font-bold text-white flex-1 truncate">{shop.name}</h1>
        <button
          onClick={() => setSaved(!saved)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors"
        >
          <Heart size={16} className={saved ? "text-red-400 fill-red-400" : ""} />
        </button>
        <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors">
          <Share2 size={16} />
        </button>
      </div>

      {/* ── Shop Banner ─────────────────────────────── */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        {/* Banner image placeholder */}
        <div className="h-36 bg-cyan-500/10 border-b border-slate-800 flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-slate-800 border-2 border-cyan-500/30 flex items-center justify-center">
            <span className="text-3xl font-black text-cyan-400">{shop.name[0]}</span>
          </div>
        </div>
        {/* Info row */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">{shop.name}</h2>
                {shop.verified && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30">
                    <ShieldCheck size={11} className="text-cyan-400" />
                    <span className="text-[10px] font-bold text-cyan-400">Verified</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{shop.category}</div>
            </div>
            <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${
              shop.isOpen
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                : "bg-slate-700/50 text-slate-400 border-slate-700"
            }`}>
              {shop.isOpen ? "● Open" : "● Closed"}
            </span>
          </div>

          <StarRating rating={shop.rating} count={shop.reviewCount} />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin size={13} className="text-cyan-400" />
              <span>{shop.distance} away</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock size={13} className="text-cyan-400" />
              <span>{shop.deliveryEta}</span>
            </div>
          </div>

          {shop.offer && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Tag size={13} className="text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-300">{shop.offer}</span>
            </div>
          )}

          <div className="flex items-start gap-2 text-xs text-slate-400">
            <MapPin size={13} className="text-slate-500 flex-shrink-0 mt-0.5" />
            <span>{shop.address}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Delivers within {shop.serviceRadius}</span>
          </div>
        </div>
      </div>

      {/* ── Serviceability Check ────────────────────── */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
        <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
        <div>
          <div className="text-sm font-bold text-emerald-400">Delivery available to your location</div>
          <div className="text-xs text-slate-400 mt-0.5">Sector 7, Jaipur · {shop.deliveryEta}</div>
        </div>
      </div>

      {/* ── Category Tabs ───────────────────────────── */}
      <div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold border capitalize transition-all ${
                activeCategory === cat
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                  : "seller-tab-inactive bg-slate-900 border-slate-800 text-slate-400"
              }`}
            >
              {cat === "all" ? "All Products" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Products ────────────────────────────────── */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="py-10 text-center text-slate-500 text-sm">No products in this category</div>
        ) : (
          filtered.map((p) => (
            <ProductRow key={p.id} product={p} onNav={onNav} onAddToCart={onAddToCart} />
          ))
        )}
      </div>

      {/* ── Reviews ─────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-100">Customer Reviews</h3>
          <button className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
            All reviews <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-3">
          {mockReviews.map((r, i) => (
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
                <div className="flex items-center gap-1">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-amber-400">{r.rating}</span>
                  <span className="text-[10px] text-slate-500 ml-1">{r.date}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
