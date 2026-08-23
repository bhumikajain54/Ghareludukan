import React, { useState } from "react";
import {
  ShoppingBag,
  Laptop,
  Shirt,
  Sparkles,
  Gift,
  Home,
  Heart,
  Baby,
  Smile,
  Package,
  UtensilsCrossed,
} from "lucide-react";

// Category-specific placeholder icons and color gradients
const CATEGORY_FALLBACK_CONFIG = {
  "Grocery": { icon: ShoppingBag, color: "from-emerald-950/70 to-emerald-900/40 text-emerald-400 border-emerald-800/50", emoji: "🛒" },
  "Grocery & Food": { icon: ShoppingBag, color: "from-emerald-950/70 to-emerald-900/40 text-emerald-400 border-emerald-800/50", emoji: "🛒" },
  "Electronics": { icon: Laptop, color: "from-cyan-950/70 to-cyan-900/40 text-cyan-400 border-cyan-800/50", emoji: "💻" },
  "Electronics & Gadgets": { icon: Laptop, color: "from-cyan-950/70 to-cyan-900/40 text-cyan-400 border-cyan-800/50", emoji: "💻" },
  "Kids": { icon: Baby, color: "from-amber-950/70 to-amber-900/40 text-amber-400 border-amber-800/50", emoji: "🧸" },
  "Kids Products": { icon: Baby, color: "from-amber-950/70 to-amber-900/40 text-amber-400 border-amber-800/50", emoji: "🧸" },
  "Gifts": { icon: Gift, color: "from-purple-950/70 to-purple-900/40 text-purple-400 border-purple-800/50", emoji: "🎁" },
  "Fashion": { icon: Shirt, color: "from-rose-950/70 to-rose-900/40 text-rose-400 border-rose-800/50", emoji: "👗" },
  "Fashion - Women": { icon: Shirt, color: "from-pink-950/70 to-pink-900/40 text-pink-400 border-pink-800/50", emoji: "👗" },
  "Fashion - Men": { icon: Shirt, color: "from-blue-950/70 to-blue-900/40 text-blue-400 border-blue-800/50", emoji: "👔" },
  "Fashion - Girls": { icon: Sparkles, color: "from-fuchsia-950/70 to-fuchsia-900/40 text-fuchsia-400 border-fuchsia-800/50", emoji: "🎀" },
  "Fashion - Boys": { icon: Smile, color: "from-sky-950/70 to-sky-900/40 text-sky-400 border-sky-800/50", emoji: "🧢" },
  "Home & Kitchen": { icon: Home, color: "from-orange-950/70 to-orange-900/40 text-orange-400 border-orange-800/50", emoji: "🏠" },
  "Beauty": { icon: Sparkles, color: "from-rose-950/70 to-rose-900/40 text-rose-400 border-rose-800/50", emoji: "✨" },
  "Beauty & Personal Care": { icon: Sparkles, color: "from-rose-950/70 to-rose-900/40 text-rose-400 border-rose-800/50", emoji: "✨" },
  "Dairy": { icon: ShoppingBag, color: "from-sky-950/70 to-sky-900/40 text-sky-400 border-sky-800/50", emoji: "🥛" },
  "Vegetables": { icon: UtensilsCrossed, color: "from-green-950/70 to-green-900/40 text-green-400 border-green-800/50", emoji: "🥦" },
  "Bakery": { icon: ShoppingBag, color: "from-amber-950/70 to-amber-900/40 text-amber-400 border-amber-800/50", emoji: "🍞" },
};

export default function ProductImage({
  src,
  alt = "Product Image",
  category = "Grocery",
  subcategory = "",
  className = "w-full h-full object-cover",
  containerClassName = "",
  fit = "cover", // 'cover' or 'contain'
  loading = "lazy",
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fallback = CATEGORY_FALLBACK_CONFIG[category] ||
    CATEGORY_FALLBACK_CONFIG["Grocery"] || {
      icon: Package,
      color: "from-slate-900 to-slate-800 text-slate-400 border-slate-700",
      emoji: "📦",
    };

  const FallbackIcon = fallback.icon;

  if (!src || error) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br ${fallback.color} flex flex-col items-center justify-center p-3 text-center border relative overflow-hidden select-none ${containerClassName}`}
      >
        <div className="w-10 h-10 rounded-xl bg-slate-900/70 border border-white/10 flex items-center justify-center shadow-md mb-1.5 backdrop-blur-xs">
          <FallbackIcon size={20} />
        </div>
        <span className="text-[11px] font-bold text-slate-200 line-clamp-1 leading-tight max-w-full px-1">
          {alt || "Product"}
        </span>
        <span className="text-[9px] font-medium text-slate-400 mt-0.5 tracking-wider uppercase">
          {subcategory || category}
        </span>
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative overflow-hidden flex items-center justify-center bg-slate-900 ${containerClassName}`}>
      {/* Loading Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
          <span className="text-xl opacity-40">{fallback.emoji}</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`${className} ${fit === "contain" ? "object-contain p-2" : "object-cover"} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      />
    </div>
  );
}
