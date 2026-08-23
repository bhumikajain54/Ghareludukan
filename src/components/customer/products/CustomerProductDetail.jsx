import React, { useState } from "react";
import {
  ArrowLeft, Star, ShoppingBag, Heart, Share2, ShieldCheck,
  Clock, Store, Plus, Minus, AlertTriangle, CheckCircle2,
  ChevronRight, Tag,
} from "lucide-react";
import { MOCK_PRODUCTS, inr } from "../CustomerConstants";
import ProductImage from "../../common/ProductImage";

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
  { name: "Rahul S.", rating: 5, text: "Excellent quality! Authentic and exactly as described.", verified: true, date: "Aug 18" },
  { name: "Sunita J.", rating: 4, text: "Good product, delivered promptly in perfect condition. Will order again.", verified: true, date: "Aug 12" },
];

export default function CustomerProductDetail({ productId, onNav, onAddToCart }) {
  const product = MOCK_PRODUCTS.find((p) => p.id === productId) || MOCK_PRODUCTS[0];
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory)
  ).slice(0, 6);

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
    <div className="gd-rise space-y-5 w-full pb-8">
      {/* ── Top Bar ─────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNav("home")}
          className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-slate-500 font-medium truncate">
            {product.category} &gt; {product.subcategory || "General"}
          </div>
          <h1 className="text-sm font-bold text-white truncate">{product.name}</h1>
        </div>
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-all cursor-pointer shadow-md"
        >
          <Heart size={16} className={wishlisted ? "text-red-400 fill-red-400" : ""} />
        </button>
        <button className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer shadow-md">
          <Share2 size={16} />
        </button>
      </div>

      {/* ── Product Image Showcase ─────────────────── */}
      <div className="relative rounded-3xl bg-slate-950 border border-slate-800 h-72 sm:h-96 flex items-center justify-center overflow-hidden shadow-2xl">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          subcategory={product.subcategory}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

        {product.discount > 0 && (
          <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-black shadow-lg z-10 flex items-center gap-1">
            <Tag size={12} /> -{product.discount}% OFF
          </span>
        )}

        <span className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-xs border border-slate-700/60 text-slate-200 text-xs font-semibold z-10">
          {product.brand || product.category}
        </span>
      </div>

      {/* ── Product Info Block ──────────────────────── */}
      <div className="space-y-3.5 bg-slate-900/40 p-4 rounded-3xl border border-slate-800">
        <div>
          {product.brand && (
            <div className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 mb-1">
              {product.brand}
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{product.name}</h2>
          <div className="text-sm text-slate-400 mt-1 font-medium">Unit: {product.unit}</div>
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

        <div className="text-[11px] text-slate-500">Inclusive of all taxes &amp; standard GST</div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} count={product.reviewCount} />
          <span className="text-slate-600">·</span>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck size={13} /> Genuine &amp; Verified Product
          </span>
        </div>

        {/* Stock Status */}
        <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border ${stockStatus.bg}`}>
          <stockStatus.icon size={15} className={stockStatus.color} />
          <span className={`text-xs font-bold ${stockStatus.color}`}>{stockStatus.label}</span>
          {product.lowStock && <span className="text-xs text-slate-400">— Only a few units left in stock!</span>}
        </div>

        {/* Shop & Delivery Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => onNav("shop-detail", { shopId: product.shopId })}
            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all text-left shadow-sm cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Store size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Sold by</div>
              <div className="text-xs font-bold text-slate-100 truncate">{product.shopName}</div>
            </div>
            <ChevronRight size={14} className="text-slate-500 flex-shrink-0 ml-auto" />
          </button>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Clock size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Express Delivery</div>
              <div className="text-xs font-bold text-emerald-400">{product.deliveryEta}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Qty + Add to Cart ───────────────────────── */}
      {product.available && (
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center gap-1 px-1.5 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <span className="w-9 text-center text-sm font-black text-white">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(10, q + 1))}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 transition-all gd-tap cursor-pointer ${
              added
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/40"
                : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20"
            }`}
          >
            {added ? (
              <>
                <CheckCircle2 size={16} /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Add to Cart — {inr(product.price * qty)}
              </>
            )}
          </button>
        </div>
      )}

      {/* Buy Now Button */}
      {product.available && (
        <button
          onClick={() => {
            onAddToCart({ ...product, qty });
            onNav("cart");
          }}
          className="w-full py-3 rounded-2xl text-sm font-black bg-slate-900 border border-cyan-500/50 text-cyan-400 hover:bg-slate-800 transition-all gd-tap cursor-pointer shadow-md"
        >
          Buy Now (Direct Checkout)
        </button>
      )}

      {/* ── Description ─────────────────────────────── */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-md">
        <div className="text-sm font-bold text-slate-200 uppercase tracking-wider">Product Description</div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{product.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {product.tags?.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-medium text-slate-400 border border-slate-700">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Reviews ─────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100">Customer Reviews</h3>
          <button className="text-xs text-cyan-400 font-semibold flex items-center gap-1 cursor-pointer">
            See all <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-2.5">
          {MOCK_REVIEWS.map((r, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-300">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{r.name}</div>
                    {r.verified && (
                      <div className="flex items-center gap-1">
                        <ShieldCheck size={10} className="text-emerald-400" />
                        <span className="text-[10px] text-emerald-400 font-semibold">Verified Buyer</span>
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
              <p className="text-xs text-slate-300 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Related Products ─────────────────────────── */}
      {relatedProducts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-100">Similar Products in {product.category}</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
            {relatedProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => onNav("product-detail", { productId: p.id })}
                className="flex-shrink-0 w-40 p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all text-left group cursor-pointer shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-28 rounded-xl bg-slate-950 flex items-center justify-center mb-2 overflow-hidden relative border border-slate-800">
                    <ProductImage
                      src={p.image}
                      alt={p.name}
                      category={p.category}
                      subcategory={p.subcategory}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="text-xs font-bold text-slate-200 line-clamp-2 leading-tight">{p.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{p.unit}</div>
                </div>
                <div className="text-sm font-black text-white mt-2">{inr(p.price)}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
