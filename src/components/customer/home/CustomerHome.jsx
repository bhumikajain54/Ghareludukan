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
      className="flex-shrink-0 w-56 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all group gd-tap text-left shadow-lg"
    >
      {/* Shop Image Container */}
      <div className="h-32 w-full bg-slate-800 relative overflow-hidden">
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

export function ProductCard({ product, onNav, onAddToCart }) {
  const hasDiscount = product.discount > 0;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onNav("product-detail", { productId: product.id })}
      className="flex-shrink-0 w-44 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all group gd-tap text-left cursor-pointer select-none shadow-lg flex flex-col justify-between"
    >
      {/* Product Image Container */}
      <div className="h-36 w-full bg-slate-950 relative overflow-hidden flex items-center justify-center">
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

      <div className="p-3 space-y-1 flex-1 flex flex-col justify-between">
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
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          {HERO_BANNERS.map((b, i) => (
            <div
              key={b.id}
              className={`transition-all duration-500 ${i === activeBanner ? "block" : "hidden"}`}
            >
              <div className={`bg-gradient-to-br ${b.accent} p-6 sm:p-8 min-h-[160px] flex flex-col justify-between relative`}>
                <span className={`self-start px-2.5 py-1 rounded-lg border text-[10px] font-bold tracking-wider uppercase ${b.badgeColor}`}>
                  {b.tag}
                </span>
                <div className="mt-3 space-y-1.5 max-w-lg">
                  <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">{b.title}</h2>
                  <p className="text-xs sm:text-sm text-slate-300">{b.subtitle}</p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => onNav("search")}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 cursor-pointer"
                  >
                    {b.cta} <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={() => onNav("search", { category: "electronics" })}
                    className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Explore Gadgets 📱
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Dots */}
          <div className="flex items-center justify-center gap-1.5 pb-3 bg-slate-950/60">
            {HERO_BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBanner(i)}
                className={`rounded-full transition-all ${i === activeBanner ? "w-5 h-1.5 bg-cyan-400" : "w-1.5 h-1.5 bg-slate-600"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Marketplace Category Navigation ────────── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
              <span>Explore Marketplace</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">9+ Categories</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Electronics, Kids, Gifts, Fashion, Groceries, Home Living & more</p>
          </div>
          <button onClick={() => onNav("search")} className="flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
            All Products <ChevronRight size={13} />
          </button>
        </div>

        {/* Main Category Horizontal Chips */}
        <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === "all") {
                  onNav("search");
                } else {
                  onNav("search", { category: cat.id });
                }
              }}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border text-left transition-all gd-tap shadow-md hover:scale-103 ${
                selectedHomeCat === cat.id
                  ? "bg-cyan-500/20 border-cyan-500/60 text-cyan-300 ring-2 ring-cyan-500/20"
                  : cat.color
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span className="text-xs font-bold whitespace-nowrap">{cat.label}</span>
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
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
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
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
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
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
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
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
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
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
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
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
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
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
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
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
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
                  className="flex-shrink-0 flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all w-52 gd-tap cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <ShoppingBag size={18} className="text-slate-500" />
                  </div>
                  <div className="min-w-0 text-left">
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
          <div key={label} className="flex flex-col items-center gap-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center">
            <Icon size={20} className={color} />
            <div className="text-xs font-bold text-white mt-0.5">{label}</div>
            <div className="text-[10px] text-slate-500">{sub}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
