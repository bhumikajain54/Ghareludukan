import React, { useState } from "react";
import {
  MapPin, Search, ChevronRight, Star, Clock, Zap, ShoppingBag,
  Tag, ArrowRight, ShieldCheck, RotateCcw, Flame, Store, Heart,
  Laptop, Baby, Gift, Shirt, Sparkles, Home as HomeIcon,
} from "lucide-react";
import {
  MOCK_SHOPS,
  MOCK_PRODUCTS,
  CATEGORIES,
  SUBCATEGORIES_MAP,
  HERO_BANNERS,
  inr,
} from "../CustomerConstants";
import ProductImage from "../../common/ProductImage";

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1">
      <Star size={11} className="text-amber-400 fill-amber-400" />
      <span className="text-xs font-bold text-amber-400">{rating}</span>
    </span>
  );
}

function ShopCard({ shop, onNav }) {
  const [imgError, setImgError] = useState(false);
  return (
    <button
      onClick={() => onNav("shop-detail", { shopId: shop.id })}
      className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all group gd-tap text-left shadow-lg"
    >
      {/* Shop Image Container */}
      <div className="h-28 sm:h-32 w-full bg-slate-800 relative overflow-hidden">
        {shop.image && !imgError ? (
          <img
            src={shop.image}
            alt={shop.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-850 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-700/60 border border-slate-600/40 flex items-center justify-center">
              <Store size={26} className="text-slate-400" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/20 pointer-events-none" />
        {shop.offer && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-cyan-500 text-white shadow-md text-[10px] font-black uppercase tracking-wider">
            OFFER
          </span>
        )}
        {!shop.isOpen && (
          <div className="absolute inset-0 bg-slate-950/75 flex items-center justify-center backdrop-blur-xs">
            <span className="text-xs font-bold text-slate-300 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700 shadow-md">Closed</span>
          </div>
        )}
      </div>
      <div className="p-2.5 sm:p-3 space-y-1.5">
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

export function ProductCard({ product, onNav, onAddToCart }) {
  const hasDiscount = product.discount > 0;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onNav("product-detail", { productId: product.id })}
      className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all group gd-tap text-left cursor-pointer select-none shadow-lg flex flex-col justify-between"
    >
      {/* Product Image Container */}
      <div className="h-32 sm:h-36 w-full bg-slate-950 relative overflow-hidden flex items-center justify-center">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          subcategory={product.subcategory}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
        {hasDiscount && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-black shadow-sm z-10">
            -{product.discount}%
          </span>
        )}
        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs border border-slate-700/60 text-slate-300 text-[9px] font-semibold truncate max-w-[80px] z-10">
          {product.subcategory || product.category}
        </span>
        {!product.available && (
          <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center backdrop-blur-xs z-10">
            <span className="text-xs font-bold text-slate-300 bg-slate-900/90 px-2.5 py-0.5 rounded-full border border-slate-700">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-2.5 sm:p-3 space-y-1 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-bold text-slate-100 line-clamp-2 leading-tight min-h-[32px]">{product.name}</div>
          <div className="text-[10px] text-slate-400 truncate mt-0.5 font-medium">{product.brand || product.shopName} · {product.unit}</div>
        </div>

        <div className="pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-black text-white">{inr(product.price)}</span>
            {hasDiscount && (
              <span className="text-[10px] text-slate-500 line-through">{inr(product.originalPrice)}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <StarRating rating={product.rating} />
            <span className="text-[10px] text-slate-500">({product.reviewCount || 45})</span>
          </div>
          {product.available ? (
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
              className="w-full mt-2 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 transition-colors cursor-pointer active:scale-98"
            >
              + Add
            </button>
          ) : (
            <div className="w-full mt-2 py-1.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-bold text-center">
              Unavailable
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CustomerHome({ onNav, onAddToCart, recentOrders = [] }) {
  const [activeBanner, setActiveBanner] = useState(0);
  const [savedShops, setSavedShops] = useState(new Set());
  const [selectedHomeCat, setSelectedHomeCat] = useState("all");

  const toggleSave = (shopId, e) => {
    e.stopPropagation();
    setSavedShops((prev) => {
      const next = new Set(prev);
      next.has(shopId) ? next.delete(shopId) : next.add(shopId);
      return next;
    });
  };

  // Products grouped by category for shelves
  const electronicsProducts = MOCK_PRODUCTS.filter((p) => p.category === "Electronics & Gadgets").slice(0, 8);
  const fashionProducts = MOCK_PRODUCTS.filter((p) => p.category.startsWith("Fashion")).slice(0, 8);
  const kidsProducts = MOCK_PRODUCTS.filter((p) => p.category === "Kids Products").slice(0, 8);
  const giftsProducts = MOCK_PRODUCTS.filter((p) => p.category === "Gifts").slice(0, 8);
  const groceryProducts = MOCK_PRODUCTS.filter((p) => p.category === "Grocery & Food").slice(0, 8);
  const homeKitchenProducts = MOCK_PRODUCTS.filter((p) => p.category === "Home & Kitchen").slice(0, 8);
  const beautyProducts = MOCK_PRODUCTS.filter((p) => p.category === "Beauty & Personal Care").slice(0, 8);

  const activeSubcategories =
    selectedHomeCat === "all"
      ? ["All Products", "Electronics", "Gifts", "Kids", "Fashion", "Grocery", "Home & Kitchen", "Beauty"]
      : SUBCATEGORIES_MAP[
          CATEGORIES.find((c) => c.id === selectedHomeCat)?.label || ""
        ] || ["All"];

  return (
    <div className="space-y-7 gd-rise pb-8">
      {/* ── Hero Banner Carousel ───────────────────── */}
      <section>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50">
          {HERO_BANNERS.map((b, i) => (
            <div
              key={b.id}
              className={`transition-all duration-500 ${i === activeBanner ? "block" : "hidden"}`}
            >
              <div className={`bg-gradient-to-br ${b.accent} relative overflow-hidden`}>
                {/* SVG dot-grid pattern overlay */}
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`dots-${i}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#dots-${i})`} />
                </svg>

                {/* Large hollow decorative ring — right side */}
                <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-[28px] border-white/10 pointer-events-none" />
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-[16px] border-white/8 pointer-events-none" />

                {/* Glow blob top-left */}
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/8 blur-2xl pointer-events-none" />

                {/* Main layout */}
                <div className="relative flex items-stretch min-h-[200px]">
                  {/* LEFT content */}
                  <div className="flex-1 flex flex-col justify-between px-6 sm:px-8 py-6 gap-4">
                    {/* Top: badge + title + subtitle */}
                    <div className="space-y-2.5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black tracking-widest uppercase ${b.badgeColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {b.tag}
                      </span>
                      <h2 className="text-2xl sm:text-[2.2rem] font-black text-white leading-[1.1] tracking-tight">
                        {b.title}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-white/65 leading-relaxed max-w-[260px]">
                        {b.subtitle}
                      </p>
                    </div>

                    {/* Bottom: buttons + dots */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => onNav("search")}
                          className="px-5 py-2.5 rounded-2xl bg-white text-slate-900 font-extrabold text-xs transition-all flex items-center gap-2 shadow-xl hover:shadow-white/20 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          {b.cta} <ArrowRight size={13} />
                        </button>
                        <button
                          onClick={() => onNav("search")}
                          className="px-4 py-2.5 rounded-2xl bg-white/12 border border-white/20 text-white text-xs font-bold hover:bg-white/22 transition-all cursor-pointer backdrop-blur-sm"
                        >
                          Browse All
                        </button>
                      </div>
                      {/* Slide dots */}
                      <div className="flex items-center gap-1.5">
                        {HERO_BANNERS.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveBanner(idx)}
                            className={`rounded-full transition-all duration-300 ${idx === activeBanner ? "w-7 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/50"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: decorative emoji stack — hidden on mobile */}
                  <div className="hidden sm:flex flex-col items-center justify-center pr-12 pl-4 gap-3 relative">
                    {/* Outer glow ring */}
                    <div className="absolute w-32 h-32 rounded-full bg-white/8 blur-lg" />
                    {/* Main icon card */}
                    <div className="relative w-24 h-24 rounded-[24px] bg-white/15 border border-white/25 flex items-center justify-center text-[3.5rem] shadow-2xl backdrop-blur-md z-10 hover:scale-105 transition-transform duration-300">
                      {i === 0 ? "🛒" : i === 1 ? "🥦" : "🥛"}
                    </div>
                    {/* Top-right floating pill */}
                    <div className="absolute top-5 -right-1 bg-white/25 border border-white/35 rounded-full px-2.5 py-1 text-[10px] font-black text-white shadow-lg backdrop-blur-sm z-20 whitespace-nowrap">
                      {i === 0 ? "🏷 20% OFF" : i === 1 ? "⚡ 20 min" : "✅ Fresh"}
                    </div>
                    {/* Bottom-left floating pill */}
                    <div className="absolute bottom-5 -left-2 bg-white/25 border border-white/35 rounded-full px-2.5 py-1 text-[10px] font-black text-white shadow-lg backdrop-blur-sm z-20 whitespace-nowrap">
                      {i === 0 ? "📍 Near You" : i === 1 ? "🌿 Organic" : "🏪 New Shop"}
                    </div>
                  </div>
                </div>

                {/* Bottom shimmer line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Blinkit / Amazon Style Marketplace Categories ────────── */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
                <span>Shop by Category</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">13 Categories</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Explore fresh groceries, daily essentials, electronics & fashion</p>
            </div>
          </div>
          <button onClick={() => onNav("search")} className="flex items-center gap-1 text-xs text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
            All Categories <ChevronRight size={13} />
          </button>
        </div>

        {/* Visual Category Tiles Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
          {[
            { id: "grocery", label: "Grocery & Food", emoji: "🛒", tag: "Daily Essentials", iconBg: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30", badge: "Up to 30% OFF", badgeCls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
            { id: "dairy", label: "Dairy & Bakery", emoji: "🥛", tag: "Fresh Daily", iconBg: "bg-teal-500/15 text-teal-400 border border-teal-500/30", badge: "Fresh Daily", badgeCls: "bg-teal-500/15 text-teal-400 border-teal-500/30" },
            { id: "vegetables", label: "Fresh Greens", emoji: "🥦", tag: "Farm Fresh", iconBg: "bg-green-500/15 text-green-400 border border-green-500/30", badge: "100% Fresh", badgeCls: "bg-green-500/15 text-green-400 border-green-500/30" },
            { id: "electronics", label: "Electronics", emoji: "💻", tag: "Smart Gadgets", iconBg: "bg-blue-500/15 text-blue-400 border border-blue-500/30", badge: "Up to 50% OFF", badgeCls: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
            { id: "beauty", label: "Beauty & Care", emoji: "✨", tag: "Top Brands", iconBg: "bg-rose-500/15 text-rose-400 border border-rose-500/30", badge: "Min 25% OFF", badgeCls: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
            { id: "women-fashion", label: "Women's Wear", emoji: "👗", tag: "Trending", iconBg: "bg-pink-500/15 text-pink-400 border border-pink-500/30", badge: "Up to 40% OFF", badgeCls: "bg-pink-500/15 text-pink-400 border-pink-500/30" },
            { id: "men-fashion", label: "Men's Wear", emoji: "👔", tag: "Hot Deals", iconBg: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30", badge: "Style Hub", badgeCls: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30" },
            { id: "kids", label: "Kids & Toys", emoji: "🧸", tag: "Fun & Play", iconBg: "bg-amber-500/15 text-amber-400 border border-amber-500/30", badge: "Best Sellers", badgeCls: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
            { id: "home-kitchen", label: "Home & Kitchen", emoji: "🏠", tag: "Living Decor", iconBg: "bg-orange-500/15 text-orange-400 border border-orange-500/30", badge: "Up to 35% OFF", badgeCls: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
            { id: "gifts", label: "Gifts & Hampers", emoji: "🎁", tag: "Special Sets", iconBg: "bg-purple-500/15 text-purple-400 border border-purple-500/30", badge: "Curated", badgeCls: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
            { id: "girls-fashion", label: "Girls Fashion", emoji: "🎀", tag: "New Styles", iconBg: "bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/30", badge: "New Arrival", badgeCls: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30" },
            { id: "boys-fashion", label: "Boys Fashion", emoji: "🧢", tag: "Cool Apparel", iconBg: "bg-sky-500/15 text-sky-400 border border-sky-500/30", badge: "Trending", badgeCls: "bg-sky-500/15 text-sky-400 border-sky-500/30" },
            { id: "all", label: "All Categories", emoji: "⚡", tag: "Explore All", iconBg: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30", badge: "1000+ Items", badgeCls: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === "all") {
                  onNav("search");
                } else {
                  onNav("search", { category: cat.id });
                }
              }}
              className="flex flex-col items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group text-center cursor-pointer gd-tap min-h-[125px]"
            >
              {/* Category Squircle Icon */}
              <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${cat.iconBg} flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <span>{cat.emoji}</span>
              </div>

              {/* Category Title */}
              <span className="text-xs font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 mt-2 leading-tight">
                {cat.label}
              </span>

              {/* Offer Micro-Pill */}
              <span className={`mt-1.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border ${cat.badgeCls} truncate max-w-full`}>
                {cat.badge}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Nearby Local Shops ───────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-cyan-400" />
            <div>
              <h3 className="font-extrabold text-sm text-slate-100">Nearby Local Stores & Outlets</h3>
              <p className="text-[11px] text-slate-400">Direct from Jaipur neighborhood sellers</p>
            </div>
          </div>
          <button onClick={() => onNav("shops")} className="flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
            See all <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {MOCK_SHOPS.slice(0, 8).map((shop) => (
            <div key={shop.id} className="relative">
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

      {/* ── 1. Electronics & Gadgets Shelf ──────────── */}
      <section className="p-4 rounded-3xl bg-slate-900/60 border border-blue-500/20 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Laptop size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Electronics & Gadgets</h3>
              <p className="text-[11px] text-slate-400">Keyboards, Smart Watches, Earbuds, Power Banks & Lights</p>
            </div>
          </div>
          <button
            onClick={() => onNav("search", { category: "electronics" })}
            className="flex items-center gap-1 text-xs text-blue-400 font-bold hover:text-blue-300 transition-colors"
          >
            Explore All <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {electronicsProducts.map((product) => (
            <ProductCard key={product.id} product={product} onNav={onNav} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* ── 2. Kids, Toys & School Essentials Shelf ─── */}
      <section className="p-4 rounded-3xl bg-slate-900/60 border border-amber-500/20 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Baby size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Kids, Toys & School Gear</h3>
              <p className="text-[11px] text-slate-400">RC Cars, Building Blocks, Dolls, School Bags & Games</p>
            </div>
          </div>
          <button
            onClick={() => onNav("search", { category: "kids" })}
            className="flex items-center gap-1 text-xs text-amber-400 font-bold hover:text-amber-300 transition-colors"
          >
            Explore All <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {kidsProducts.map((product) => (
            <ProductCard key={product.id} product={product} onNav={onNav} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* ── 3. Gifts & Celebration Hampers Shelf ────── */}
      <section className="p-4 rounded-3xl bg-slate-900/60 border border-purple-500/20 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Gift size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Gifts, Surprises & Hampers</h3>
              <p className="text-[11px] text-slate-400">Chocolate Hampers, Teddy Bears, Custom Mugs & Watches</p>
            </div>
          </div>
          <button
            onClick={() => onNav("search", { category: "gifts" })}
            className="flex items-center gap-1 text-xs text-purple-400 font-bold hover:text-purple-300 transition-colors"
          >
            Explore All <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {giftsProducts.map((product) => (
            <ProductCard key={product.id} product={product} onNav={onNav} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* ── 4. Fashion & Style Showcase ─────────────── */}
      <section className="p-4 rounded-3xl bg-slate-900/60 border border-pink-500/20 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Shirt size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Fashion & Lifestyle</h3>
              <p className="text-[11px] text-slate-400">Women Sarees & Handbags, Men Shirts & Wallets, Kids Wear</p>
            </div>
          </div>
          <button
            onClick={() => onNav("search", { category: "women-fashion" })}
            className="flex items-center gap-1 text-xs text-pink-400 font-bold hover:text-pink-300 transition-colors"
          >
            Explore All <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {fashionProducts.map((product) => (
            <ProductCard key={product.id} product={product} onNav={onNav} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* ── 5. Grocery & Daily Essentials Shelf ─────── */}
      <section className="p-4 rounded-3xl bg-slate-900/60 border border-emerald-500/20 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShoppingBag size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Grocery & Kitchen Staples</h3>
              <p className="text-[11px] text-slate-400">Toor Dal, Basmati Rice, Sunflower Oil, Spices & Atta</p>
            </div>
          </div>
          <button
            onClick={() => onNav("search", { category: "grocery" })}
            className="flex items-center gap-1 text-xs text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
          >
            Explore All <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {groceryProducts.map((product) => (
            <ProductCard key={product.id} product={product} onNav={onNav} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* ── 6. Home & Kitchen Shelf ─────────────────── */}
      <section className="p-4 rounded-3xl bg-slate-900/60 border border-orange-500/20 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <HomeIcon size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Home, Kitchen & Living</h3>
              <p className="text-[11px] text-slate-400">Cookware Sets, Water Bottles, Dinner Sets & Bedsheets</p>
            </div>
          </div>
          <button
            onClick={() => onNav("search", { category: "home-kitchen" })}
            className="flex items-center gap-1 text-xs text-orange-400 font-bold hover:text-orange-300 transition-colors"
          >
            Explore All <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {homeKitchenProducts.map((product) => (
            <ProductCard key={product.id} product={product} onNav={onNav} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* ── 7. Beauty & Grooming Shelf ──────────────── */}
      <section className="p-4 rounded-3xl bg-slate-900/60 border border-rose-500/20 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Beauty & Personal Care</h3>
              <p className="text-[11px] text-slate-400">Vitamin C Serum, Shampoos, Lipsticks, Perfumes & Face Washes</p>
            </div>
          </div>
          <button
            onClick={() => onNav("search", { category: "beauty" })}
            className="flex items-center gap-1 text-xs text-rose-400 font-bold hover:text-rose-300 transition-colors"
          >
            Explore All <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {beautyProducts.map((product) => (
            <ProductCard key={product.id} product={product} onNav={onNav} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* ── Offers Banner ──────────────────────────── */}
      <section>
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-md hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400">
              <Tag size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-black text-slate-100 flex items-center gap-2">
                <span>Weekend Marketplace Mega Sale</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold">20% OFF</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">Use coupon code <span className="text-cyan-400 font-mono font-bold">SAVE20</span> for 20% discount up to ₹100 on all orders</div>
            </div>
            <button
              onClick={() => onNav("coupons")}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all flex-shrink-0 cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              Claim Offer
            </button>
          </div>
        </div>
      </section>

      {/* ── Buy Again ──────────────────────────────── */}
      {recentOrders.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <RotateCcw size={14} />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-100">Buy Again</h3>
                <p className="text-[11px] text-slate-400">Quickly reorder from your recent purchases</p>
              </div>
            </div>
            <button onClick={() => onNav("orders")} className="flex items-center gap-1 text-xs text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
              Past Orders <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {recentOrders.slice(0, 3).flatMap((order) =>
              order.items.slice(0, 2).map((item) => {
                const matchedProduct = MOCK_PRODUCTS.find(
                  (p) => p.id === item.productId || p.productId === item.productId || p.name.toLowerCase() === item.name.toLowerCase()
                ) || item;
                const productToUse = {
                  ...matchedProduct,
                  id: matchedProduct.id || item.productId || item.id,
                  name: item.name || matchedProduct.name,
                  price: item.price || matchedProduct.price,
                  unit: item.unit || matchedProduct.unit || "1 unit",
                  image: matchedProduct.image || item.image,
                  category: matchedProduct.category || "Grocery & Food",
                  subcategory: matchedProduct.subcategory || "Daily Essentials",
                };

                return (
                  <div
                    key={`${order.id}-${item.productId || item.id}`}
                    onClick={() => onNav("product-detail", { productId: productToUse.id })}
                    className="w-full rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col group gd-tap cursor-pointer select-none overflow-hidden"
                  >
                    {/* Square Product Image */}
                    <div className="w-full aspect-square bg-slate-950 overflow-hidden">
                      <ProductImage
                        src={productToUse.image}
                        alt={productToUse.name}
                        category={productToUse.category}
                        subcategory={productToUse.subcategory}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="px-2.5 pt-2 pb-1 flex-1">
                      <div className="text-[11px] font-bold text-slate-100 line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
                        {productToUse.name}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{productToUse.unit}</div>
                      <div className="text-xs font-black text-white mt-1">{inr(productToUse.price)}</div>
                    </div>

                    {/* Reorder Button */}
                    <div className="px-2.5 pb-2.5 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(productToUse);
                        }}
                        className="w-full py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-98"
                      >
                        <RotateCcw size={10} /> Reorder
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}

      {/* ── Trust & Quality Features Banner ────────────────────────────── */}
      <section className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
          <div className="flex items-center gap-3.5 sm:justify-center px-2 py-1">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 shadow-sm">
              <Zap size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-100">Superfast 15–30 Mins</div>
              <div className="text-[11px] text-slate-400">Direct doorstep delivery from local shops</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5 sm:justify-center px-2 py-1 pt-3 sm:pt-1">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-sm">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="text-xs font-black text-slate-100">100% Verified Stores</div>
              <div className="text-[11px] text-slate-400">Authentic local vendors & fresh stock</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5 sm:justify-center px-2 py-1 pt-3 sm:pt-1">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-sm">
              <Tag size={22} />
            </div>
            <div>
              <div className="text-xs font-black text-slate-100">Best Neighborhood Prices</div>
              <div className="text-[11px] text-slate-400">Direct mandi & wholesale fair rates</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
