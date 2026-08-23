import React, { useState } from "react";
import {
  Heart, ShoppingBag, Store, Trash2, ArrowRight, Star,
  Clock, ShieldCheck, MapPin,
} from "lucide-react";
import {
  MOCK_WISHLIST_PRODUCTS,
  MOCK_SAVED_SHOPS,
  inr,
} from "../CustomerConstants";
import ProductImage from "../../common/ProductImage";

export default function CustomerWishlist({ onNav, onAddToCart }) {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState(MOCK_WISHLIST_PRODUCTS);
  const [shops, setShops] = useState(MOCK_SAVED_SHOPS);

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const removeShop = (id) => {
    setShops((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="gd-rise space-y-5 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">Wishlist & Saved</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Your saved local goods and neighborhood favorites
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
            activeTab === "products"
              ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
              : "seller-tab-inactive bg-slate-900 border-slate-800 text-slate-400"
          }`}
        >
          <ShoppingBag size={15} />
          <span>Saved Products ({products.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("shops")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
            activeTab === "shops"
              ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
              : "seller-tab-inactive bg-slate-900 border-slate-800 text-slate-400"
          }`}
        >
          <Store size={15} />
          <span>Saved Shops ({shops.length})</span>
        </button>
      </div>

      {/* Notice info */}
      <div className="text-[11px] text-slate-500 bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
        <span>
          Note: Wishlisted items reflect real-time pricing and stock from local
          sellers, but inventory is reserved only upon placing an order.
        </span>
      </div>

      {/* Product List */}
      {activeTab === "products" && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
              <Heart size={36} className="text-slate-600 mx-auto" />
              <div className="text-base font-bold text-slate-300">
                Your wishlist is empty
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore thousands of fresh grocery, bakery, and daily utility
                items from nearby shops and save them here.
              </p>
              <button
                onClick={() => onNav("home")}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-white font-bold text-xs hover:bg-cyan-400 transition-all"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-16 h-16 rounded-xl bg-slate-950 flex items-center justify-center flex-shrink-0 overflow-hidden relative border border-slate-800">
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          category={product.category}
                          subcategory={product.subcategory}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div>
                      <div className="text-xs text-cyan-400 font-mono font-semibold">
                        {product.shopName}
                      </div>
                      <h3 className="text-sm font-bold text-slate-100 line-clamp-1 mt-0.5">
                        {product.name}
                      </h3>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {product.unit}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-white">
                        {inr(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-slate-500 line-through">
                          {inr(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-800/80 flex gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={!product.available}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        product.available
                          ? "bg-cyan-500 text-white hover:bg-cyan-400 shadow-md shadow-cyan-950"
                          : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      {product.available ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button
                      onClick={() =>
                        onNav("product-detail", { productId: product.id })
                      }
                      className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Saved Shops */}
      {activeTab === "shops" && (
        <>
          {shops.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
              <Store size={36} className="text-slate-600 mx-auto" />
              <div className="text-base font-bold text-slate-300">
                No saved shops yet
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Follow your favorite neighborhood general stores, dairies, and
                bakeries for quick one-tap shopping.
              </p>
              <button
                onClick={() => onNav("home")}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-white font-bold text-xs hover:bg-cyan-400 transition-all"
              >
                Find Nearby Stores
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {shops.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 font-extrabold text-base flex-shrink-0 overflow-hidden relative">
                        {shop.logo || shop.image ? (
                          <img src={shop.logo || shop.image} alt={shop.name} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <span>{shop.name[0]}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-slate-100">
                            {shop.name}
                          </h3>
                          {shop.verified && (
                            <ShieldCheck size={14} className="text-cyan-400" />
                          )}
                        </div>
                        <div className="text-xs text-slate-400">
                          {shop.category} · {shop.distance}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeShop(shop.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Remove shop"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 mt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="text-amber-400 fill-amber-400"
                      />
                      <span className="font-bold text-slate-200">
                        {shop.rating}
                      </span>
                      <span className="text-slate-500">
                        ({shop.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Clock size={12} />
                      <span>{shop.deliveryEta}</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      onNav("shop-detail", { shopId: shop.id })
                    }
                    className="w-full mt-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-400 hover:text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-700/60"
                  >
                    <span>Visit Storefront</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
