import React, { useState, useMemo } from "react";
import {
  Store, MapPin, Star, Clock, ShieldCheck, Tag, ArrowRight,
  Search, ArrowLeft, Heart, Sparkles, Filter, ChevronRight,
  ShoppingBag, CheckCircle2, Phone,
} from "lucide-react";
import { MOCK_SHOPS, MOCK_PRODUCTS, CATEGORIES, inr } from "../CustomerConstants";
import ProductImage from "../../common/ProductImage";

export default function CustomerShops({ onNav, onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterType, setFilterType] = useState("all"); // 'all', 'open', 'top-rated', 'nearest'
  const [savedShops, setSavedShops] = useState(new Set());

  const toggleSave = (shopId, e) => {
    e.stopPropagation();
    setSavedShops((prev) => {
      const next = new Set(prev);
      next.has(shopId) ? next.delete(shopId) : next.add(shopId);
      return next;
    });
  };

  const categories = [
    { id: "all", label: "All Shops", emoji: "🏪" },
    { id: "grocery", label: "Grocery & Food", emoji: "🛒" },
    { id: "electronics", label: "Electronics", emoji: "💻" },
    { id: "kids", label: "Kids & Toys", emoji: "🧸" },
    { id: "gifts", label: "Gifts & Hampers", emoji: "🎁" },
    { id: "fashion", label: "Women Fashion", emoji: "👗" },
    { id: "home", label: "Home & Living", emoji: "🏠" },
    { id: "beauty", label: "Beauty Care", emoji: "✨" },
  ];

  // Filtered shops based on search, category and filters
  const filteredShops = useMemo(() => {
    return MOCK_SHOPS.filter((shop) => {
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        shop.name.toLowerCase().includes(q) ||
        shop.category.toLowerCase().includes(q) ||
        (shop.ownerName && shop.ownerName.toLowerCase().includes(q)) ||
        (shop.tags && shop.tags.some((t) => t.toLowerCase().includes(q))) ||
        (shop.address && shop.address.toLowerCase().includes(q));

      let matchCategory = true;
      if (selectedCategory === "grocery") {
        matchCategory = ["Grocery & Food", "Grocery", "Vegetables", "Dairy", "Bakery"].includes(shop.category);
      } else if (selectedCategory === "electronics") {
        matchCategory = shop.category.toLowerCase().includes("electronic");
      } else if (selectedCategory === "kids") {
        matchCategory = shop.category.toLowerCase().includes("kid") || shop.category.toLowerCase().includes("toy");
      } else if (selectedCategory === "gifts") {
        matchCategory = shop.category.toLowerCase().includes("gift");
      } else if (selectedCategory === "fashion") {
        matchCategory = shop.category.toLowerCase().includes("fashion");
      } else if (selectedCategory === "home") {
        matchCategory = shop.category.toLowerCase().includes("home") || shop.category.toLowerCase().includes("kitchen");
      } else if (selectedCategory === "beauty") {
        matchCategory = shop.category.toLowerCase().includes("beauty");
      }

      let matchFilter = true;
      if (filterType === "open") {
        matchFilter = shop.isOpen === true;
      } else if (filterType === "top-rated") {
        matchFilter = shop.rating >= 4.8;
      } else if (filterType === "nearest") {
        const distNum = parseFloat(shop.distance);
        matchFilter = !isNaN(distNum) && distNum <= 1.5;
      }

      return matchSearch && matchCategory && matchFilter;
    });
  }, [searchQuery, selectedCategory, filterType]);

  return (
    <div className="space-y-6 gd-rise pb-12">
      {/* ── Page Header ────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNav("home")}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer shadow-md flex-shrink-0"
            title="Back to Home"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>Nearby Local Stores & Outlets</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                {filteredShops.length} Stores
              </span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <MapPin size={12} className="text-cyan-400" />
              <span>Delivering in <strong>Jaipur Neighborhood</strong> · 15–45 min Doorstep Delivery</span>
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stores or items..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500/50 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Category Filters Pills ─────────────────── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
              selectedCategory === cat.id
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* ── Quick Filter Tabs ───────────────────────── */}
      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          {[
            { id: "all", label: "All Outlets" },
            { id: "open", label: "🟢 Open Now" },
            { id: "top-rated", label: "⭐ Top Rated (4.8+)" },
            { id: "nearest", label: "⚡ Nearest (< 1.5 km)" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterType === f.id
                  ? "bg-slate-800 text-cyan-400 border border-cyan-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          Showing {filteredShops.length} of {MOCK_SHOPS.length} stores
        </span>
      </div>

      {/* ── Shop Cards List / Grid ──────────────────── */}
      {filteredShops.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl mx-auto text-slate-400">
            🏪
          </div>
          <h3 className="text-base font-bold text-white">No shops found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or selecting another category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setFilterType("all");
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredShops.map((shop) => {
            const shopProducts = MOCK_PRODUCTS.filter((p) => p.shopId === shop.id).slice(0, 4);
            const isSaved = savedShops.has(shop.id);

            return (
              <div
                key={shop.id}
                onClick={() => onNav("shop-detail", { shopId: shop.id })}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Shop Banner Image Header */}
                  <div className="h-44 w-full bg-slate-800 relative overflow-hidden">
                    {shop.image ? (
                      <img
                        src={shop.image}
                        alt={shop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-850 flex items-center justify-center">
                        <Store size={36} className="text-slate-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                    {/* Top offer badge */}
                    {shop.offer && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-lg">
                        {shop.offer}
                      </span>
                    )}

                    {/* Bookmark Heart Button */}
                    <button
                      onClick={(e) => toggleSave(shop.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/70 border border-slate-700/60 backdrop-blur-sm flex items-center justify-center hover:bg-slate-800 transition-all"
                    >
                      <Heart
                        size={14}
                        className={isSaved ? "text-red-400 fill-red-400" : "text-slate-300"}
                      />
                    </button>

                    {/* Shop Meta Overlay at bottom of banner */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-sm text-[11px] font-bold text-amber-400 flex items-center gap-1 shadow-md">
                          <Star size={11} className="fill-amber-400 text-amber-400" />
                          <span>{shop.rating}</span>
                          <span className="text-slate-400 font-normal">({shop.reviewCount || 100}+)</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-sm text-[11px] font-semibold text-slate-300 flex items-center gap-1 shadow-md">
                          <MapPin size={11} className="text-cyan-400" />
                          <span>{shop.distance}</span>
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-950/90 border border-emerald-700/80 backdrop-blur-sm text-[11px] font-bold text-emerald-400 flex items-center gap-1 shadow-md">
                        <Clock size={11} />
                        <span>{shop.deliveryEta}</span>
                      </span>
                    </div>
                  </div>

                  {/* Shop Details */}
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-extrabold text-base text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                          <span className="truncate">{shop.name}</span>
                          {shop.verified && <ShieldCheck size={15} className="text-cyan-400 flex-shrink-0" />}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 whitespace-nowrap">
                          {shop.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {shop.address || "Jaipur Local Market"}
                      </p>
                    </div>

                    {/* Popular Tags Pills */}
                    {shop.tags && shop.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {shop.tags.slice(0, 4).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/40"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Shop Products Preview Grid (4 items) */}
                    {shopProducts.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80">
                        <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center justify-between">
                          <span>Top Items from Store:</span>
                          <span className="text-cyan-400 text-[10px] font-semibold">View Catalog</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {shopProducts.map((p) => (
                            <div
                              key={p.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                onNav("product-detail", { productId: p.id });
                              }}
                              className="rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/50 p-1.5 text-center flex flex-col justify-between transition-all group/item cursor-pointer"
                              title={p.name}
                            >
                              <div className="w-full aspect-square rounded-lg bg-slate-900 overflow-hidden mb-1 flex items-center justify-center">
                                <ProductImage
                                  src={p.image}
                                  alt={p.name}
                                  category={p.category}
                                  subcategory={p.subcategory}
                                  className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="text-[10px] font-bold text-slate-200 truncate group-hover/item:text-cyan-400">
                                {p.name}
                              </div>
                              <div className="text-[10px] font-extrabold text-cyan-400 mt-0.5">
                                {inr(p.price)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visit Store Action CTA Footer */}
                <div className="p-4 pt-2">
                  <button
                    onClick={() => onNav("shop-detail", { shopId: shop.id })}
                    className="w-full py-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-sm group-hover:bg-cyan-500 group-hover:text-slate-950"
                  >
                    <span>Visit Store & View All Products</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
