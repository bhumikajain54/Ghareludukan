import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Search, X, SlidersHorizontal, Star, Clock, MapPin,
  ShoppingBag, Store, ChevronDown, ShieldCheck, Flame, Tag,
  Filter, Check, RotateCcw,
} from "lucide-react";
import {
  MOCK_PRODUCTS,
  MOCK_SHOPS,
  CATEGORIES,
  PRODUCT_CATEGORIES,
  SUBCATEGORIES_MAP,
  inr,
} from "../CustomerConstants";
import ProductImage from "../../common/ProductImage";

const RECENT_SEARCHES = [
  "Toor Dal",
  "Wireless Keyboard",
  "Smart Watch",
  "Basmati Rice",
  "Gift Hamper",
  "Handbag",
  "Remote Control Car",
];

const POPULAR_TRENDING = [
  "Keyboard",
  "Rice",
  "Watch",
  "Purse",
  "Gift",
  "Sunflower Oil",
  "Serum",
  "Saree",
  "Earbuds",
  "Cookware",
];

const SORT_OPTIONS = [
  { id: "relevance", label: "Relevance" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
  { id: "discount", label: "Biggest Discount" },
];

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1">
      <Star size={11} className="text-amber-400 fill-amber-400" />
      <span className="text-xs font-bold text-amber-400">{rating}</span>
    </span>
  );
}

// Category ID to Category Name mapper for robust matching
const CAT_ID_TO_NAME = {
  all: "",
  grocery: "Grocery & Food",
  electronics: "Electronics & Gadgets",
  kids: "Kids Products",
  gifts: "Gifts",
  "women-fashion": "Fashion - Women",
  "men-fashion": "Fashion - Men",
  "girls-fashion": "Fashion - Girls",
  "boys-fashion": "Fashion - Boys",
  "home-kitchen": "Home & Kitchen",
  beauty: "Beauty & Personal Care",
  dairy: "Dairy",
  vegetables: "Vegetables",
  bakery: "Bakery",
};

export default function CustomerSearch({
  initialCategory = "",
  initialSubcategory = "",
  initialQuery = "",
  onNav,
  onAddToCart,
}) {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("products");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  // Normalize initial category (could be id e.g. "electronics" or name "Electronics & Gadgets")
  const resolveCategoryName = (cat) => {
    if (!cat) return "";
    if (CAT_ID_TO_NAME[cat.toLowerCase()]) return CAT_ID_TO_NAME[cat.toLowerCase()];
    const match = PRODUCT_CATEGORIES.find(
      (c) => c.toLowerCase() === cat.toLowerCase()
    );
    return match || cat;
  };

  const [selectedCategory, setSelectedCategory] = useState(() =>
    resolveCategoryName(initialCategory)
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialSubcategory || ""
  );
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");

  const inputRef = useRef(null);

  // Keep state updated if initial props change
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(resolveCategoryName(initialCategory));
    }
    if (initialSubcategory) {
      setSelectedSubcategory(initialSubcategory);
    }
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialCategory, initialSubcategory, initialQuery]);

  useEffect(() => {
    if (!initialCategory && !initialQuery) {
      inputRef.current?.focus();
    }
  }, [initialCategory, initialQuery]);

  // Extract available subcategories based on current selected category
  const availableSubcategories = useMemo(() => {
    if (!selectedCategory) return [];
    return SUBCATEGORIES_MAP[selectedCategory] || [];
  }, [selectedCategory]);

  // Extract available brands for the selected category
  const availableBrands = useMemo(() => {
    const relevantProducts = selectedCategory
      ? MOCK_PRODUCTS.filter((p) => p.category === selectedCategory)
      : MOCK_PRODUCTS;
    const brands = new Set(
      relevantProducts.map((p) => p.brand).filter(Boolean)
    );
    return Array.from(brands).sort();
  }, [selectedCategory]);

  // Filter products across all required fields: name, category, subcategory, brand, shopName, tags, description
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.shopName && p.shopName.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)));

      const matchCat =
        !selectedCategory ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchSubcat =
        !selectedSubcategory ||
        selectedSubcategory === "All" ||
        (p.subcategory &&
          p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase());

      const matchBrand =
        !selectedBrand ||
        (p.brand && p.brand.toLowerCase() === selectedBrand.toLowerCase());

      const matchStock = !inStockOnly || p.available;

      return matchQuery && matchCat && matchSubcat && matchBrand && matchStock;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount") return (b.discount || 0) - (a.discount || 0);
      return 0; // relevance
    });
  }, [
    query,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    inStockOnly,
    sortBy,
  ]);

  const filteredShops = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_SHOPS.filter((s) => {
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.tags && s.tags.some((t) => t.toLowerCase().includes(q)));

      const matchCat =
        !selectedCategory ||
        s.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchQuery && matchCat;
    });
  }, [query, selectedCategory]);

  const activeFiltersCount = [
    Boolean(selectedCategory),
    Boolean(selectedSubcategory && selectedSubcategory !== "All"),
    Boolean(selectedBrand),
    inStockOnly,
    sortBy !== "relevance",
  ].filter(Boolean).length;

  const handleClearAllFilters = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedBrand("");
    setInStockOnly(false);
    setSortBy("relevance");
  };

  const isEmpty =
    (query.length > 0 || selectedCategory) &&
    filteredProducts.length === 0 &&
    filteredShops.length === 0;

  return (
    <div className="gd-rise space-y-4 pb-8">
      {/* ── Search Header & Bar ─────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 focus-within:border-cyan-500/60 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all shadow-lg">
            <Search size={16} className="text-slate-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, gadgets, grocery, gifts, fashion…"
              className="flex-1 bg-transparent text-slate-100 text-sm placeholder-slate-500 outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-slate-500 hover:text-slate-300 transition-colors p-1"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-2xl border transition-all flex items-center gap-1.5 shadow-md relative ${
              showFilters || activeFiltersCount > 0
                ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                : "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            <SlidersHorizontal size={17} />
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Category Horizontal Quick Filter Bar */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
          <button
            onClick={() => {
              setSelectedCategory("");
              setSelectedSubcategory("");
              setSelectedBrand("");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              !selectedCategory
                ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            ⚡ All ({MOCK_PRODUCTS.length})
          </button>
          {PRODUCT_CATEGORIES.filter((c) => c !== "Other").map((catName) => {
            const isSelected = selectedCategory.toLowerCase() === catName.toLowerCase();
            return (
              <button
                key={catName}
                onClick={() => {
                  if (isSelected) {
                    setSelectedCategory("");
                    setSelectedSubcategory("");
                  } else {
                    setSelectedCategory(catName);
                    setSelectedSubcategory("");
                  }
                  setSelectedBrand("");
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 shadow-sm ${
                  isSelected
                    ? "bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold shadow-cyan-500/20"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <span>{catName}</span>
              </button>
            );
          })}
        </div>

        {/* Subcategory Pills (when a Category is selected) */}
        {selectedCategory && availableSubcategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 bg-slate-900/50 p-2 rounded-2xl border border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1 flex-shrink-0">
              Subcategories:
            </span>
            {availableSubcategories.map((sub) => {
              const isSubActive =
                selectedSubcategory === sub ||
                (!selectedSubcategory && sub === "All");
              return (
                <button
                  key={sub}
                  onClick={() =>
                    setSelectedSubcategory(sub === "All" ? "" : sub)
                  }
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSubActive
                      ? "bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold"
                      : "bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Active Filter Badges Strip ──────────────── */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-xs bg-slate-900/40 p-2 rounded-xl border border-slate-800">
          <span className="text-slate-500 font-semibold text-[11px]">Applied Filters:</span>
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-medium">
              Category: {selectedCategory}
              <button onClick={() => { setSelectedCategory(""); setSelectedSubcategory(""); }}>
                <X size={12} className="hover:text-white" />
              </button>
            </span>
          )}
          {selectedSubcategory && selectedSubcategory !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 font-medium">
              Subcategory: {selectedSubcategory}
              <button onClick={() => setSelectedSubcategory("")}>
                <X size={12} className="hover:text-white" />
              </button>
            </span>
          )}
          {selectedBrand && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-pink-500/15 border border-pink-500/40 text-pink-300 font-medium">
              Brand: {selectedBrand}
              <button onClick={() => setSelectedBrand("")}>
                <X size={12} className="hover:text-white" />
              </button>
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-medium">
              In Stock Only
              <button onClick={() => setInStockOnly(false)}>
                <X size={12} className="hover:text-white" />
              </button>
            </span>
          )}
          {sortBy !== "relevance" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 font-medium">
              Sort: {SORT_OPTIONS.find((s) => s.id === sortBy)?.label}
              <button onClick={() => setSortBy("relevance")}>
                <X size={12} className="hover:text-white" />
              </button>
            </span>
          )}
          <button
            onClick={handleClearAllFilters}
            className="text-xs text-rose-400 hover:text-rose-300 font-bold ml-auto flex items-center gap-1"
          >
            <RotateCcw size={11} /> Clear All
          </button>
        </div>
      )}

      {/* ── Collapsible Filters Drawer ──────────────── */}
      {showFilters && (
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          {/* Sort Options */}
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

          {/* Brand Filter */}
          {availableBrands.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Brand</div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto scrollbar-none">
                <button
                  onClick={() => setSelectedBrand("")}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                    !selectedBrand
                      ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  All Brands
                </button>
                {availableBrands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(selectedBrand === b ? "" : b)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                      selectedBrand === b
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* In Stock Toggle */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${
                  inStockOnly ? "bg-cyan-500" : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    inStockOnly ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </div>
              <span className="text-sm font-semibold text-slate-300">In Stock Only</span>
            </label>

            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ── Recent / Popular Searches (when no search query or active filter) ── */}
      {!query && !selectedCategory && (
        <div className="space-y-5 p-4 rounded-3xl bg-slate-900/40 border border-slate-800">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Recent Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {RECENT_SEARCHES.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400 transition-all cursor-pointer"
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
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Trending Categories & Keywords
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TRENDING.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold hover:bg-orange-500/20 transition-all cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Results Header & Tabs ──────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1.5">
            {["products", "shops"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all capitalize cursor-pointer ${
                  activeTab === tab
                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                    : "seller-tab-inactive bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                {tab === "products"
                  ? `Products (${filteredProducts.length})`
                  : `Shops (${filteredShops.length})`}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-semibold">
            {filteredProducts.length} items found
          </div>
        </div>

        {/* Empty State */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-slate-900/30 rounded-3xl border border-slate-800 p-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Search size={24} className="text-slate-600" />
            </div>
            <div className="text-slate-300 font-bold text-base">
              No matching products or shops found
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              We couldn't find anything matching your query or selected filters. Try broadening your keywords or removing category filters.
            </p>
            <button
              onClick={handleClearAllFilters}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all cursor-pointer"
            >
              Reset Filters & View All
            </button>
          </div>
        )}

        {/* Products Grid / List Results */}
        {activeTab === "products" && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => onNav("product-detail", { productId: p.id })}
                className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all gd-tap text-left cursor-pointer select-none shadow-md group"
              >
                {/* Product Thumbnail with ProductImage */}
                <div className="w-20 h-20 rounded-xl bg-slate-950 flex items-center justify-center flex-shrink-0 overflow-hidden relative border border-slate-800">
                  <ProductImage
                    src={p.image}
                    alt={p.name}
                    category={p.category}
                    subcategory={p.subcategory}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {p.discount > 0 && (
                    <span className="absolute top-1 left-1 px-1 py-0.5 rounded bg-emerald-500 text-white text-[8px] font-black z-10">
                      -{p.discount}%
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-100 truncate group-hover:text-cyan-300 transition-colors">
                    {p.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 truncate font-medium">
                    {p.brand ? `${p.brand} · ` : ""}{p.subcategory || p.category} · {p.unit}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    Sold by {p.shopName}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <StarRating rating={p.rating} />
                    <span className="text-[10px] text-slate-500">·</span>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <Clock size={10} /> {p.deliveryEta}
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 space-y-1">
                  <div className="text-base font-black text-white">{inr(p.price)}</div>
                  {p.discount > 0 && (
                    <div className="text-[10px] text-slate-500 line-through">
                      {inr(p.originalPrice)}
                    </div>
                  )}
                  {!p.available ? (
                    <div className="text-[10px] text-red-400 font-semibold">
                      Out of stock
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p);
                      }}
                      className="mt-1 px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 transition-all active:scale-95 cursor-pointer"
                    >
                      + Add
                    </button>
                  )}
                </div>
              </div>
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
                className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all gd-tap text-left shadow-md cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden relative border border-slate-700">
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <Store size={24} className="text-slate-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-100 truncate">{s.name}</span>
                    {s.verified && <ShieldCheck size={13} className="text-cyan-400 flex-shrink-0" />}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.category}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={s.rating} />
                    <span className="text-[10px] text-slate-500">·</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <MapPin size={10} /> {s.distance}
                    </span>
                    <span className="text-[10px] text-slate-500">·</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <Clock size={10} /> {s.deliveryEta}
                    </span>
                  </div>
                  {s.offer && (
                    <div className="text-[10px] font-semibold text-cyan-400 mt-1 truncate">
                      {s.offer}
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      s.isOpen
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : "bg-slate-700/50 text-slate-500 border-slate-700"
                    }`}
                  >
                    {s.isOpen ? "Open" : "Closed"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
