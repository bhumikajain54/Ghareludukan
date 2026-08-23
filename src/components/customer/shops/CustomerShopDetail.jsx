import React, { useState, useMemo } from "react";
import {
  ArrowLeft, Star, MapPin, Clock, ShieldCheck, Tag, Phone,
  ShoppingBag, Heart, ChevronRight, CheckCircle2, XCircle, Share2,
  Search, LayoutGrid, Rows3, Flame, Sparkles,
} from "lucide-react";
import { MOCK_SHOPS, MOCK_PRODUCTS, inr } from "../CustomerConstants";
import ProductImage from "../../common/ProductImage";

function StarRating({ rating, count }) {
  return (
    <span className="flex items-center gap-1">
      <Star size={13} className="text-amber-400 fill-amber-400" />
      <span className="text-sm font-bold text-amber-400">{rating}</span>
      {count && <span className="text-xs text-slate-500">({count} reviews)</span>}
    </span>
  );
}

function ProductCard({ product, onNav, onAddToCart }) {
  const hasDiscount = product.discount > 0;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onNav("product-detail", { productId: product.id })}
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all group gd-tap text-left cursor-pointer select-none shadow-lg flex flex-col justify-between"
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
            <span className="flex items-center gap-1">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-amber-400">{product.rating}</span>
            </span>
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

export default function CustomerShopDetail({ shopId, onNav, onAddToCart }) {
  const shop = MOCK_SHOPS.find((s) => s.id === shopId) || MOCK_SHOPS[0];
  const products = useMemo(() => MOCK_PRODUCTS.filter((p) => p.shopId === shop.id), [shop.id]);
  const [saved, setSaved] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("shelves"); // 'shelves' or 'grid'

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((p) => p.subcategory).filter(Boolean))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "all" || p.subcategory === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery = !q || p.name.toLowerCase().includes(q) || (p.brand && p.brand.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [products, activeCategory, searchQuery]);

  // Group products by subcategory or category for shelves view
  const groupedProducts = useMemo(() => {
    const map = {};
    filteredProducts.forEach((p) => {
      const key = p.subcategory || p.category || "Featured Items";
      if (!map[key]) map[key] = [];
      map[key].push(p);
    });
    return map;
  }, [filteredProducts]);

  const mockReviews = [
    { name: "Rahul S.", rating: 5, text: "Very fresh products and fast delivery. Highly recommended!", verified: true, date: "Aug 18" },
    { name: "Priya G.", rating: 4, text: "Good quality. Packaging was secure and delivered on time.", verified: true, date: "Aug 14" },
    { name: "Amit K.", rating: 5, text: "Reliable shop with fair prices and authentic items.", verified: true, date: "Aug 09" },
  ];

  return (
    <div className="gd-rise space-y-6 pb-12">
      {/* ── Top Navigation Bar ──────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNav("home")}
          className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-extrabold text-white truncate flex items-center gap-2">
            <span>{shop.name}</span>
            {shop.verified && <ShieldCheck size={14} className="text-cyan-400 flex-shrink-0" />}
          </h1>
          <div className="text-xs text-slate-400 truncate">{shop.category} · {shop.distance} away</div>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-all cursor-pointer shadow-md"
        >
          <Heart size={16} className={saved ? "text-red-400 fill-red-400" : ""} />
        </button>
        <button className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer shadow-md">
          <Share2 size={16} />
        </button>
      </div>

      {/* ── Shop Banner Card ────────────────────────── */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        {/* Banner image */}
        <div className="h-44 sm:h-56 bg-slate-800 relative overflow-hidden">
          {shop.image ? (
            <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-cyan-500/10 flex items-center justify-center">
              <span className="text-4xl font-black text-cyan-400">{shop.name[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          {shop.offer && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-cyan-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
              {shop.offer}
            </span>
          )}
        </div>

        {/* Info row */}
        <div className="p-4 sm:p-5 space-y-3.5">
          <div className="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{shop.name}</h2>
                {shop.verified && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30">
                    <ShieldCheck size={11} className="text-cyan-400" />
                    <span className="text-[10px] font-bold text-cyan-400">Verified Seller</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-slate-400 mt-1">{shop.category} · {shop.address}</div>
            </div>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${
                shop.isOpen
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                  : "bg-slate-700/50 text-slate-400 border-slate-700"
              }`}
            >
              {shop.isOpen ? "● Open Now" : "● Closed"}
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap text-xs text-slate-300">
            <StarRating rating={shop.rating} count={shop.reviewCount} />
            <span>·</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin size={13} className="text-cyan-400" />
              <span>{shop.distance}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Clock size={13} />
              <span>{shop.deliveryEta} Express Delivery</span>
            </div>
          </div>

          {/* Serviceability Banner */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300">
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span>Delivery available to your address in Sector 7, Jaipur (Delivers within {shop.serviceRadius})</span>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ───────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 focus-within:border-cyan-500/60 transition-all shadow-md">
            <Search size={15} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search products in ${shop.name}…`}
              className="flex-1 bg-transparent text-slate-100 text-xs sm:text-sm placeholder-slate-500 outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-slate-500 hover:text-slate-300 text-xs">
                Clear
              </button>
            )}
          </div>

          {/* View Mode Toggle (Shelves vs Grid) */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-2xl p-1 shadow-md">
            <button
              onClick={() => setViewMode("shelves")}
              title="Shelves Carousel View"
              className={`p-2 rounded-xl transition-all ${
                viewMode === "shelves"
                  ? "bg-cyan-500/20 text-cyan-400 font-bold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Rows3 size={16} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Grid Cards View"
              className={`p-2 rounded-xl transition-all ${
                viewMode === "grid"
                  ? "bg-cyan-500/20 text-cyan-400 font-bold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {categories.map((cat) => {
            const isCatActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold border capitalize transition-all cursor-pointer shadow-sm ${
                  isCatActive
                    ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/20 font-extrabold"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                {cat === "all" ? `All Products (${products.length})` : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Products Display (Shelves or Grid) ──────── */}
      {filteredProducts.length === 0 ? (
        <div className="py-14 text-center text-slate-500 bg-slate-900/30 rounded-3xl border border-slate-800 p-6 space-y-2">
          <ShoppingBag size={28} className="mx-auto text-slate-600 mb-2" />
          <div className="text-slate-300 font-bold text-sm">No products found</div>
          <p className="text-xs text-slate-500">Try searching for a different keyword or switch categories.</p>
        </div>
      ) : viewMode === "shelves" && activeCategory === "all" && !searchQuery ? (
        /* Categorized Shelves View (Same as Customer Home) */
        <div className="space-y-6">
          {Object.entries(groupedProducts).map(([groupTitle, groupItems]) => (
            <section
              key={groupTitle}
              className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-3.5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">{groupTitle}</h3>
                    <p className="text-[10px] text-slate-400">{groupItems.length} items available</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveCategory(groupTitle)}
                  className="flex items-center gap-1 text-xs text-cyan-400 font-bold hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  View All <ChevronRight size={13} />
                </button>
              </div>

              {/* Horizontal Scroll Carousel */}
              <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
                {groupItems.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-44">
                    <ProductCard product={product} onNav={onNav} onAddToCart={onAddToCart} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* Responsive Product Grid View */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onNav={onNav} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}

      {/* ── Customer Reviews ─────────────────────────── */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span>Customer Reviews</span>
              <span className="text-xs text-amber-400 font-bold">★ {shop.rating}</span>
            </h3>
            <p className="text-[11px] text-slate-500">Based on {shop.reviewCount || "120+"} verified customer reviews</p>
          </div>
          <button className="text-xs text-cyan-400 font-semibold flex items-center gap-1 hover:text-cyan-300 transition-colors cursor-pointer">
            All reviews <ChevronRight size={12} />
          </button>
        </div>

        <div className="space-y-2.5">
          {mockReviews.map((r, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-300">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{r.name}</div>
                    {r.verified && (
                      <div className="flex items-center gap-1">
                        <ShieldCheck size={9} className="text-emerald-400" />
                        <span className="text-[9px] text-emerald-400 font-semibold">Verified Buyer</span>
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
              <p className="text-xs text-slate-300 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
