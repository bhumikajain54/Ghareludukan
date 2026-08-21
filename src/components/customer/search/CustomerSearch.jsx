import React, { useState, useRef, useEffect } from "react";
import {
  Search, X, SlidersHorizontal, Star, Clock, MapPin,
  ShoppingBag, Store, ChevronDown, ShieldCheck, Flame,
} from "lucide-react";
import { MOCK_PRODUCTS, MOCK_SHOPS, CATEGORIES, inr } from "../CustomerConstants";

const RECENT_SEARCHES = ["Toor Dal", "Fresh Milk", "Tomatoes", "Basmati Rice"];

const SORT_OPTIONS = [
  { id: "relevance", label: "Relevance" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
  { id: "rating", label: "Rating" },
  { id: "delivery", label: "Delivery Time" },
];

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1">
      <Star size={11} className="text-amber-400 fill-amber-400" />
      <span className="text-xs font-bold text-amber-400">{rating}</span>
    </span>
  );
}

export default function CustomerSearch({ onNav, onAddToCart }) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("products");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    const q = query.toLowerCase();
    const matchQuery = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.shopName.toLowerCase().includes(q);
    const matchCat = !selectedCategory || p.category.toLowerCase() === selectedCategory;
    const matchStock = !inStockOnly || p.available;
    return matchQuery && matchCat && matchStock;
  }).sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const filteredShops = MOCK_SHOPS.filter((s) => {
    const q = query.toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
  });

  const isEmpty = query.length > 0 && filteredProducts.length === 0 && filteredShops.length === 0;

  return (
    <div className="gd-rise space-y-4">
      {/* ── Search Bar ─────────────────────────────── */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 focus-within:border-cyan-500/60 transition-all shadow-lg">
          <Search size={16} className="text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, shops…"
            className="flex-1 bg-transparent text-slate-100 text-sm placeholder-slate-500 outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-500 hover:text-slate-300 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-3 rounded-2xl border transition-all ${showFilters ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-slate-900 border-slate-700 text-slate-400"}`}
        >
          <SlidersHorizontal size={17} />
        </button>
      </div>

      {/* ── Filters Panel ──────────────────────────── */}
      {showFilters && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          {/* Sort */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Sort By</div>
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    sortBy === opt.id
                      ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          {/* Category */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</div>
            <div className="flex flex-wrap gap-2">
              {["", ...["Grocery","Vegetables","Dairy","Bakery","Electronics"]].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c.toLowerCase())}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedCategory === c.toLowerCase()
                      ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {c || "All"}
                </button>
              ))}
            </div>
          </div>
          {/* In Stock */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${inStockOnly ? "bg-cyan-500" : "bg-slate-700"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${inStockOnly ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm font-semibold text-slate-300">In Stock Only</span>
          </label>
        </div>
      )}

      {/* ── Recent / Popular (when no query) ────────── */}
      {!query && (
        <div className="space-y-4">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Recent Searches</div>
            <div className="flex flex-wrap gap-2">
              {RECENT_SEARCHES.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
                >
                  <Search size={11} className="text-slate-500" />
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <Flame size={13} className="text-orange-400" />
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trending</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Fresh Milk", "Toor Dal", "Tomatoes", "Rice", "Oil", "Paneer"].map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold hover:bg-orange-500/20 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tabs (when query) ──────────────────────── */}
      {query && (
        <>
          <div className="flex gap-1.5">
            {["products", "shops"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all capitalize ${
                  activeTab === tab
                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                    : "seller-tab-inactive bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                {tab} {tab === "products" ? `(${filteredProducts.length})` : `(${filteredShops.length})`}
              </button>
            ))}
          </div>

          {/* Empty State */}
          {isEmpty && (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                <Search size={24} className="text-slate-600" />
              </div>
              <div className="text-slate-400 font-semibold">No results for "{query}"</div>
              <p className="text-xs text-slate-600">Try a different keyword or remove filters</p>
            </div>
          )}

          {/* Products Results */}
          {activeTab === "products" && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
              {filteredProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onNav("product-detail", { productId: p.id })}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all gd-tap text-left cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <ShoppingBag size={22} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-100 truncate">{p.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{p.shopName} · {p.unit}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={p.rating} />
                      <span className="text-[10px] text-slate-500">·</span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1"><Clock size={10}/> {p.deliveryEta}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-black text-white">{inr(p.price)}</div>
                    {p.discount > 0 && (
                      <div className="text-[10px] text-emerald-400 font-bold">{p.discount}% off</div>
                    )}
                    {!p.available && <div className="text-[10px] text-red-400 font-semibold mt-1">Out of stock</div>}
                    {p.available && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
                        className="mt-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold hover:bg-cyan-500/25 transition-colors cursor-pointer"
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Shop Results */}
          {activeTab === "shops" && filteredShops.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
              {filteredShops.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onNav("shop-detail", { shopId: s.id })}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all gd-tap text-left"
                >
                  <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <Store size={24} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-100 truncate">{s.name}</span>
                      {s.verified && <ShieldCheck size={12} className="text-cyan-400 flex-shrink-0" />}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.category}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={s.rating} />
                      <span className="text-[10px] text-slate-500">·</span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1"><MapPin size={10}/> {s.distance}</span>
                      <span className="text-[10px] text-slate-500">·</span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1"><Clock size={10}/> {s.deliveryEta}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.isOpen ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-700/50 text-slate-500"}`}>
                      {s.isOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
