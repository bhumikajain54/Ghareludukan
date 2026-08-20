import React, { useState } from "react";
import {
  MapPin, Search, ChevronRight, Star, Clock, Zap, ShoppingBag,
  Tag, ArrowRight, ShieldCheck, RotateCcw, Flame, Store, Heart,
} from "lucide-react";
import { MOCK_SHOPS, MOCK_PRODUCTS, CATEGORIES, HERO_BANNERS, inr } from "../CustomerConstants";

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1">
      <Star size={11} className="text-amber-400 fill-amber-400" />
      <span className="text-xs font-bold text-amber-400">{rating}</span>
    </span>
  );
}

function ShopCard({ shop, onNav }) {
  return (
    <button
      onClick={() => onNav("shop-detail", { shopId: shop.id })}
      className="flex-shrink-0 w-56 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all group gd-tap text-left"
    >
      {/* Shop Image Placeholder */}
      <div className="h-28 bg-gradient-to-br from-slate-800 to-slate-850 flex items-center justify-center relative">
        <div className="w-14 h-14 rounded-2xl bg-slate-700/60 border border-slate-600/40 flex items-center justify-center">
          <Store size={26} className="text-slate-400" />
        </div>
        {shop.offer && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold">
            OFFER
          </span>
        )}
        {!shop.isOpen && (
          <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center">
            <span className="text-xs font-bold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">Closed</span>
          </div>
        )}
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex items-start justify-between gap-1">
          <div className="font-bold text-sm text-slate-100 truncate">{shop.name}</div>
          {shop.verified && <ShieldCheck size={13} className="text-cyan-400 flex-shrink-0 mt-0.5" />}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <StarRating rating={shop.rating} />
          <span>·</span>
          <span>{shop.distance}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-400">
          <Clock size={11} />
          <span>{shop.deliveryEta}</span>
        </div>
        {shop.offer && (
          <div className="text-[10px] font-semibold text-cyan-400 truncate">{shop.offer}</div>
        )}
      </div>
    </button>
  );
}

function ProductCard({ product, onNav, onAddToCart }) {
  const hasDiscount = product.discount > 0;
  return (
    <button
      onClick={() => onNav("product-detail", { productId: product.id })}
      className="flex-shrink-0 w-44 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all group gd-tap text-left"
    >
      {/* Product Image Placeholder */}
      <div className="h-28 bg-gradient-to-br from-slate-800 to-slate-850 flex items-center justify-center relative">
        <div className="w-12 h-12 rounded-xl bg-slate-700/60 border border-slate-600/40 flex items-center justify-center">
          <ShoppingBag size={22} className="text-slate-400" />
        </div>
        {hasDiscount && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
            -{product.discount}%
          </span>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center">
            <span className="text-xs font-bold text-slate-400">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-3 space-y-1">
        <div className="text-xs font-bold text-slate-100 line-clamp-2 leading-tight">{product.name}</div>
        <div className="text-[10px] text-slate-500 truncate">{product.shopName}</div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-black text-white">{inr(product.price)}</span>
          {hasDiscount && (
            <span className="text-[10px] text-slate-500 line-through">{inr(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} />
        </div>
        {product.available ? (
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="w-full mt-1 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 transition-colors"
          >
            + Add
          </button>
        ) : (
          <div className="w-full mt-1 py-1.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-bold text-center">
            Unavailable
          </div>
        )}
      </div>
    </button>
  );
}

export default function CustomerHome({ onNav, onAddToCart, recentOrders = [] }) {
  const [activeBanner, setActiveBanner] = useState(0);
  const [savedShops, setSavedShops] = useState(new Set());

  const toggleSave = (shopId, e) => {
    e.stopPropagation();
    setSavedShops((prev) => {
      const next = new Set(prev);
      next.has(shopId) ? next.delete(shopId) : next.add(shopId);
      return next;
    });
  };

  return (
    <div className="space-y-6 gd-rise pb-4">
      {/* ── Hero Banner Carousel ───────────────────── */}
      <section>
        <div className="relative rounded-2xl overflow-hidden">
          {HERO_BANNERS.map((b, i) => (
            <div
              key={b.id}
              className={`transition-all duration-500 ${i === activeBanner ? "block" : "hidden"}`}
            >
              <div className={`bg-gradient-to-br ${b.accent} border border-slate-800 rounded-2xl p-6 sm:p-8 min-h-[140px] flex flex-col justify-between`}>
                <span className={`self-start px-2.5 py-1 rounded-lg border text-[10px] font-bold tracking-wider uppercase ${b.badgeColor}`}>
                  {b.tag}
                </span>
                <div className="mt-3 space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{b.title}</h2>
                  <p className="text-sm text-slate-300">{b.subtitle}</p>
                </div>
                <button
                  onClick={() => onNav("search")}
                  className="self-start mt-4 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition-all flex items-center gap-1.5"
                >
                  {b.cta} <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
          {/* Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {HERO_BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBanner(i)}
                className={`rounded-full transition-all ${i === activeBanner ? "w-4 h-1.5 bg-cyan-400" : "w-1.5 h-1.5 bg-slate-600"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ─────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-100">Shop by Category</h3>
          <button onClick={() => onNav("categories")} className="flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
            All <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNav("search", { category: cat.id })}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-gradient-to-b border text-center hover:scale-105 transition-all gd-tap ${cat.color}`}
            >
              <span className="text-xl">{cat.emoji}</span>
              <span className="text-[10px] font-bold leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Nearby Shops ───────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-cyan-400" />
            <h3 className="font-bold text-sm text-slate-100">Nearby Shops</h3>
          </div>
          <button onClick={() => onNav("shops")} className="flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
            See all <ChevronRight size={13} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
          {MOCK_SHOPS.map((shop) => (
            <div key={shop.id} className="relative flex-shrink-0">
              <ShopCard shop={shop} onNav={onNav} />
              <button
                onClick={(e) => toggleSave(shop.id, e)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-slate-950/60 border border-slate-700/60 flex items-center justify-center hover:bg-slate-800 transition-all"
              >
                <Heart
                  size={13}
                  className={savedShops.has(shop.id) ? "text-red-400 fill-red-400" : "text-slate-400"}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trending Products ──────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame size={14} className="text-orange-400" />
            <h3 className="font-bold text-sm text-slate-100">Trending Near You</h3>
          </div>
          <button onClick={() => onNav("search")} className="flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
            View all <ChevronRight size={13} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
          {MOCK_PRODUCTS.filter(p => p.available).slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} onNav={onNav} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* ── Offers Banner ──────────────────────────── */}
      <section>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-900/30 to-indigo-900/20 border border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
              <Tag size={18} className="text-cyan-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white">Weekend Flash Sale</div>
              <div className="text-xs text-slate-400 mt-0.5">Use code <span className="text-cyan-400 font-bold font-mono">SAVE20</span> · 20% off up to ₹100</div>
            </div>
            <button
              onClick={() => onNav("coupons")}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-all flex-shrink-0"
            >
              Apply
            </button>
          </div>
        </div>
      </section>

      {/* ── Buy Again ──────────────────────────────── */}
      {recentOrders.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <RotateCcw size={14} className="text-indigo-400" />
              <h3 className="font-bold text-sm text-slate-100">Buy Again</h3>
            </div>
            <button onClick={() => onNav("orders")} className="flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
              Orders <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
            {recentOrders.slice(0, 3).flatMap((order) =>
              order.items.slice(0, 2).map((item) => (
                <button
                  key={`${order.id}-${item.productId}`}
                  onClick={() => onNav("product-detail", { productId: item.productId })}
                  className="flex-shrink-0 flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all w-52 gd-tap"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <ShoppingBag size={18} className="text-slate-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-200 truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{inr(item.price)}</div>
                    <div className="text-[10px] text-indigo-400 font-semibold mt-1">Reorder</div>
                  </div>
                </button>
              ))
            )}
          </div>
        </section>
      )}

      {/* ── Trust Strip ────────────────────────────── */}
      <section className="grid grid-cols-3 gap-2.5">
        {[
          { icon: Zap, label: "15-Min", sub: "Express Delivery", color: "text-cyan-400" },
          { icon: ShieldCheck, label: "Verified", sub: "Local Shops", color: "text-emerald-400" },
          { icon: Tag, label: "Best", sub: "Local Prices", color: "text-amber-400" },
        ].map(({ icon: Icon, label, sub, color }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <Icon size={18} className={color} />
            <div className="text-xs font-bold text-white">{label}</div>
            <div className="text-[10px] text-slate-500 text-center">{sub}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
