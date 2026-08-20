import React, { useState } from "react";
import {
  ArrowLeft, Home, ClipboardList, ShoppingCart, User, Circle, Store, MapPin, Search, LogOut, ShieldCheck,
  LayoutGrid, ShoppingBag, Truck, Star, Heart, Bell, Settings, HelpCircle, ChevronDown, ChevronRight, Check, X, Moon, Sun, Package
} from "lucide-react";
import { FONT_IMPORT, TORN_EDGE, STATUS_LABEL, STATUS_ICON, inr } from "./constants";
// Updated HMR exports


export function GlobalStyle() {
  return (
    <style>{`
      ${FONT_IMPORT}
      .gd-root { font-family: 'Inter', sans-serif; }
      .gd-display { font-family: 'Archivo Black', sans-serif; letter-spacing: 0.01em; }
      .gd-mono { font-family: 'IBM Plex Mono', monospace; }
      .gd-scroll::-webkit-scrollbar { display: none; }
      .gd-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      .gd-tap { transition: transform .15s cubic-bezier(0.4, 0, 0.2, 1), opacity .15s ease; }
      .gd-tap:active { transform: scale(0.97); opacity: 0.9; }
      @keyframes gd-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      .gd-rise { animation: gd-rise .35s ease-out both; }
    `}</style>
  );
}

export function Sidebar({ view, setView, isSeller, wishlistCount, pendingDeliveriesCount, unreadNotificationsCount, isMobileOpen, onCloseMobile, onLogout }) {
  const customerSections = [
    {
      title: "OVERVIEW",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
        { id: "home", label: "Shop Now", icon: ShoppingBag },
      ],
    },
    {
      title: "MY WORKSPACE",
      items: [
        { id: "orders", label: "Orders", icon: ClipboardList },
        { id: "deliveries", label: "Deliveries", icon: Truck, badge: pendingDeliveriesCount },
        { id: "reviews", label: "Reviews", icon: Star },
        { id: "wishlist", label: "Wishlist", icon: Heart, badge: wishlistCount },
        { id: "notifications", label: "Notifications", icon: Bell, badge: unreadNotificationsCount },
        { id: "addresses", label: "Addresses", icon: MapPin },
      ],
    },
    {
      title: "ACCOUNT",
      items: [
        { id: "profile", label: "My Profile", icon: User },
        { id: "settings", label: "Account Settings", icon: Settings },
        { id: "support", label: "Support", icon: HelpCircle },
      ],
    },
  ];

  const sellerSections = [
    {
      title: "MERCHANT CONSOLE",
      items: [
        { id: "orders", label: "Orders & Dispatches", icon: ClipboardList },
        { id: "products", label: "Product Catalogue", icon: Store },
        { id: "profile", label: "Shop Settings", icon: Settings },
      ],
    },
  ];

  const sections = isSeller ? sellerSections : customerSections;

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:static top-0 bottom-0 left-0 z-50
        w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between
        transition-transform duration-300 ease-in-out shrink-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-5 space-y-6 overflow-y-auto gd-scroll flex-1">
          {/* Brand header in sidebar */}
          <div className="flex items-center justify-between">
            <div 
              onClick={() => { setView(isSeller ? "orders" : "dashboard"); if(onCloseMobile) onCloseMobile(); }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-400/50 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-950/40">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="gd-display text-cyan-300 font-black text-base">G</span>
                </div>
              </div>
              <div>
                <span className="gd-display text-white text-base tracking-wider group-hover:text-cyan-400 transition-colors">GHARELUDUKAN</span>
                <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  {isSeller ? "Merchant Admin" : "Customer Hub"}
                </div>
              </div>
            </div>

            {isMobileOpen && (
              <button onClick={onCloseMobile} className="lg:hidden text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            )}
          </div>

          {/* Navigation Groups */}
          <div className="space-y-6 pt-2">
            {sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-[11px] font-bold font-mono text-slate-500 tracking-wider px-3">
                  {sec.title}
                </div>
                <div className="space-y-1">
                  {sec.items.map(({ id, label, icon: Icon, badge }) => {
                    const isActive = view === id;
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          setView(id);
                          if (onCloseMobile) onCloseMobile();
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "sidebar-nav-active bg-slate-900 border-l-4 border-cyan-400 text-cyan-300 font-extrabold shadow-md shadow-cyan-950/40"
                            : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={17} className={isActive ? "text-cyan-400" : "text-slate-400"} />
                          <span>{label}</span>
                        </div>

                        {!!badge && badge > 0 && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive ? "bg-cyan-950 border border-cyan-400/50 text-cyan-300 font-extrabold" : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          }`}>
                            {badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer Logout Button */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 sidebar-footer">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2.5 px-3 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all font-semibold text-xs cursor-pointer group logout-btn"
            title="Logout Account"
          >
            <LogOut size={16} className="text-rose-400 group-hover:scale-110 transition-transform" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export function WebHeader({
  user,
  view,
  setView,
  cartCount,
  wishlistCount,
  unreadNotificationsCount,
  onLogout,
  onToggleSidebar,
  query,
  setQuery,
  darkMode = true,
  onToggleTheme,
  shops = [],
  onOpenShop,
  onOpenProduct
}) {
  const isSeller = user?.role === "seller";
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const q = (query || "").trim().toLowerCase();

  const matchingShops = q
    ? shops.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          (s.tagline && s.tagline.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchingProducts = q
    ? shops
        .flatMap((s) =>
          (s.products || []).map((p) => ({
            ...p,
            shopId: s.id,
            shopName: s.name,
          }))
        )
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.category && p.category.toLowerCase().includes(q))
        )
        .slice(0, 6)
    : [];

  const hasResults = matchingShops.length > 0 || matchingProducts.length > 0;

  const handleSelectShop = (shopId) => {
    setIsSearchFocused(false);
    if (onOpenShop) {
      onOpenShop(shopId);
    } else {
      setView("home");
    }
  };

  const handleSelectProduct = (shopId, productId) => {
    setIsSearchFocused(false);
    if (onOpenProduct) {
      onOpenProduct(shopId, productId);
    } else {
      setView("home");
    }
  };

  const handleViewAllResults = () => {
    setIsSearchFocused(false);
    setView("home");
  };

  return (
    <header className="w-full bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        
        {/* Left Section: Mobile Sidebar Toggle & Greeting */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer shrink-0"
            title="Toggle Menu"
          >
            <LayoutGrid size={20} />
          </button>

          {/* Greeting message */}
          <div className="hidden lg:block shrink-0">
            <span className="text-[11px] text-slate-400">{getGreeting()},</span>
            <div className="text-xs font-bold text-white leading-tight">
              {user?.name || (isSeller ? "Merchant Partner" : "Hyperlocal Shopper")}
            </div>
          </div>

          {/* Global Quick Search Bar */}
          {!isSeller && setQuery && (
            <div className="relative flex-1 max-w-sm md:max-w-md ml-1 sm:ml-3">
              <div className="relative flex items-center">
                <Search size={15} className="absolute left-3 text-cyan-400 pointer-events-none z-10" />
                <input
                  type="text"
                  value={query || ""}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleViewAllResults();
                    }
                  }}
                  placeholder="Search shops or products (e.g. Atta, Milk, Dal)..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400/80 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 shadow-inner outline-none transition-all"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setIsSearchFocused(false);
                    }}
                    className="absolute right-2 p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Live Instant Search Dropdown Popup */}
              {isSearchFocused && q.length > 0 && (
                <div className="search-dropdown-menu absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 gd-rise text-xs max-h-[75vh] overflow-y-auto">
                  {hasResults ? (
                    <div className="p-2 space-y-3">
                      {/* Matching Shops */}
                      {matchingShops.length > 0 && (
                        <div>
                          <div className="px-3 py-1 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Store size={12} /> Matching Shops ({matchingShops.length})
                          </div>
                          <div className="mt-1 space-y-1">
                            {matchingShops.map((s) => (
                              <div
                                key={s.id}
                                onClick={() => handleSelectShop(s.id)}
                                className="search-dropdown-item px-3 py-2 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors group"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-slate-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-xs">
                                    {s.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                                      {s.name}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                      {s.category} · {s.tagline}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                                    {s.etaMins} mins
                                  </span>
                                  <ChevronRight size={14} className="text-slate-500 group-hover:text-cyan-400" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Matching Products */}
                      {matchingProducts.length > 0 && (
                        <div className="pt-2 border-t border-slate-800">
                          <div className="px-3 py-1 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Package size={12} /> Matching Products ({matchingProducts.length})
                          </div>
                          <div className="mt-1 space-y-1">
                            {matchingProducts.map((p) => (
                              <div
                                key={`${p.shopId}-${p.id}`}
                                onClick={() => handleSelectProduct(p.shopId, p.id)}
                                className="search-dropdown-item px-3 py-2 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors group"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px]">
                                    {p.unit || "Item"}
                                  </div>
                                  <div>
                                    <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                                      {p.name}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                      Available at <span className="text-slate-300 font-semibold">{p.shopName}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-cyan-300 text-xs">
                                    ₹{p.price}
                                  </span>
                                  <ChevronRight size={14} className="text-slate-500 group-hover:text-cyan-400" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* View All Results */}
                      <button
                        onClick={handleViewAllResults}
                        className="w-full mt-2 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Search size={13} /> View all matching results on Home feed
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-400">
                      <Search size={24} className="mx-auto text-slate-600 mb-2" />
                      <div className="font-bold text-white text-xs">No shops or products found</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Try searching for "Atta", "Milk", "Grocery", or "Paneer"
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section: Badges & Profile Dropdown */}
        <div className="flex items-center gap-3">
          {/* Theme Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-violet-400 hover:border-violet-500/50 hover:bg-slate-800 transition-all cursor-pointer"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={17} className="text-violet-300" /> : <Moon size={17} className="text-violet-400" />}
          </button>

          {!isSeller && (
            <>
              {/* Wishlist Button */}
              <button
                onClick={() => setView("wishlist")}
                className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-rose-400 relative transition-colors cursor-pointer"
                title="Wishlist"
              >
                <Heart size={17} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Notifications Button */}
              <button
                onClick={() => setView("notifications")}
                className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-violet-400 relative transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell size={17} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setView("cart")}
                className="px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-300 hover:bg-violet-500/20 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Shopping Cart"
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-extrabold ml-1">
                    {cartCount}
                  </span>
                )}
              </button>
            </>
          )}

          {/* Profile Dropdown Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-cyan-400/50 text-cyan-300 font-bold flex items-center justify-center text-xs shadow-inner">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
              <div className="hidden md:flex flex-col text-left pr-1">
                <span className="text-xs font-bold text-white truncate max-w-[100px]">{user?.phone}</span>
                <span className="text-[10px] text-cyan-400 font-mono">Online</span>
              </div>
              <ChevronDown size={14} className="text-slate-400 pr-1" />
            </button>

            {/* Profile Dropdown Popup Menu */}
            {profileOpen && (
              <div 
                onClick={() => setProfileOpen(false)}
                className="user-dropdown-menu absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 gd-rise space-y-1"
              >
                <div className="px-4 py-2 border-b border-slate-800">
                  <div className="text-xs font-bold text-white">{user?.name || "Customer Account"}</div>
                  <div className="text-[10px] text-slate-400 font-mono">+91 {user?.phone}</div>
                </div>

                <button
                  onClick={() => setView("profile")}
                  className="user-dropdown-item w-full px-4 py-2 text-left text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                >
                  <User size={14} className="text-cyan-400" /> My Profile
                </button>

                <button
                  onClick={() => setView("settings")}
                  className="user-dropdown-item w-full px-4 py-2 text-left text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                >
                  <Settings size={14} className="text-cyan-400" /> Account Settings
                </button>

                <button
                  onClick={() => setView("support")}
                  className="user-dropdown-item w-full px-4 py-2 text-left text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                >
                  <HelpCircle size={14} className="text-cyan-400" /> Support
                </button>

                <div className="pt-1 border-t border-slate-800">
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function TopBrand({ subtitle }) {
  return (
    <div className="bg-slate-900 border-b border-slate-800 px-5 py-4 rounded-2xl mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-cyan-400/40 text-cyan-300 flex items-center justify-center gd-display text-base font-bold shadow-md shadow-cyan-950/40">
          G
        </div>
        <div>
          <div className="gd-display text-white text-lg leading-none tracking-wide">GHARELUDUKAN</div>
          {subtitle && <div className="gd-mono text-xs mt-1 text-cyan-400">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}

export function StatusPill({ status }) {
  const Icon = STATUS_ICON[status] || Circle;
  const bad = status === "REJECTED" || status === "CANCELLED";
  const done = status === "DELIVERED";
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
      bad
        ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
        : done
        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
        : "bg-sky-500/10 border-sky-500/30 text-sky-400"
    }`}>
      <Icon size={13} /> {STATUS_LABEL[status]}
    </span>
  );
}

/* signature element: torn-edge khata bill */
export function KhataBill({ order, compact }) {
  return (
    <div 
      className="gd-rise bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl p-6 shadow-xl relative overflow-hidden"
      style={{ clipPath: TORN_EDGE }}
    >
      <div className="flex items-center justify-between border-b border-dashed border-slate-700/80 pb-3 mb-4">
        <div>
          <div className="gd-display text-sm text-violet-400 tracking-wider">KHATA BILL</div>
          <div className="gd-mono text-xs text-slate-400">Order #{order.id}</div>
        </div>
        <StatusPill status={order.status} />
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((it) => (
          <div key={it.productId} className="flex justify-between gd-mono text-xs">
            <span className="text-slate-200">{it.name} <span className="text-slate-400">×{it.qty}</span></span>
            <span className="font-semibold text-slate-300">{inr(it.price * it.qty)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-slate-700/80 pt-3 space-y-1.5">
        <div className="flex justify-between gd-mono text-xs text-slate-400">
          <span>Subtotal</span><span>{inr(order.subtotal)}</span>
        </div>
        <div className="flex justify-between gd-mono text-xs text-slate-400">
          <span>Delivery Fee</span><span>{order.deliveryFee === 0 ? "FREE" : inr(order.deliveryFee)}</span>
        </div>
        <div className="flex justify-between gd-mono text-sm font-bold pt-2 border-t border-slate-800 text-white">
          <span>TOTAL PAYABLE</span><span className="text-cyan-400 font-extrabold">{inr(order.total)}</span>
        </div>
      </div>

      {!compact && (
        <div className="mt-4 pt-3 border-t border-dashed border-slate-700/80 text-[11px] gd-mono text-slate-400">
          Paid via <span className="text-violet-400 font-semibold">{order.payment}</span> · Deliver to {order.address}
        </div>
      )}
    </div>
  );
}

export function BottomNav({ active, onNav, cartCount }) {
  const items = [
    { id: "dashboard", icon: LayoutGrid, label: "Dashboard" },
    { id: "home", icon: ShoppingBag, label: "Shops" },
    { id: "orders", icon: ClipboardList, label: "Orders" },
    { id: "cart", icon: ShoppingCart, label: "Cart", badge: cartCount },
    { id: "profile", icon: User, label: "Profile" },
  ];
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 backdrop-blur-lg flex justify-around items-center py-2 px-2 z-40">
      {items.map(({ id, icon: Icon, label, badge }) => (
        <button key={id} onClick={() => onNav(id)} className="gd-tap flex flex-col items-center gap-0.5 px-3 py-1 relative cursor-pointer">
          <div className="relative">
            <Icon size={20} className={active === id ? "text-violet-400" : "text-slate-400"} />
            {!!badge && (
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {badge}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-medium ${active === id ? "text-violet-400 font-bold" : "text-slate-400"}`}>{label}</span>
        </button>
      ))}
    </div>
  );
}

export function Header({ title, onBack, right }) {
  return (
    <div className="flex items-center justify-between py-3 mb-6 border-b border-slate-800/80">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="gd-tap w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center border border-slate-700 text-white cursor-pointer">
            <ArrowLeft size={18} />
          </button>
        )}
        <div className="gd-display text-white text-xl">{title}</div>
      </div>
      {right}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, sub }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center gap-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
      <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-cyan-400/40 text-cyan-400 flex items-center justify-center shadow-inner">
        <Icon size={26} />
      </div>
      <div className="font-bold text-base text-white">{title}</div>
      {sub && <div className="text-xs text-slate-400 max-w-sm">{sub}</div>}
    </div>
  );
}
