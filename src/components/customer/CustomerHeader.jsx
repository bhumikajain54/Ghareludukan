import React, { useState } from "react";
import {
  Search, ShoppingCart, Bell, User, ChevronDown,
  Menu, X, Store, LogOut, Power, Heart, Package, Mic, Sun, Moon,
} from "lucide-react";

export default function CustomerHeader({
  cartCount = 0,
  unreadNotifs = 0,
  onNav,
  onOpenSidebar,
  userName = "Bhumika Jain",
  location = "Sector 7, Jaipur",
  darkMode = false,
  onToggleTheme,
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 px-4 lg:px-6">
      {/* Top Row */}
      <div className="flex items-center justify-between gap-3 h-14">
        {/* Mobile Hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <div className="lg:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Store size={14} className="text-white" />
            </div>
            <span className="text-xs font-black text-slate-100 tracking-wider">CUSTOMER</span>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center gap-3 flex-1 max-w-2xl mx-6">
          <button
            onClick={() => onNav("search")}
            className="flex-1 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:border-cyan-500/40 hover:text-slate-300 transition-all text-sm cursor-pointer"
          >
            <Search size={15} />
            <span>Search products, shops…</span>
            <Mic size={14} className="ml-auto text-slate-600" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search */}
          <button
            onClick={() => onNav("search")}
            className="lg:hidden p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
            aria-label="Search"
          >
            <Search size={17} />
          </button>

          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer flex items-center justify-center"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-cyan-400" />}
            </button>
          )}

          {/* Notification Bell */}
          <button
            onClick={() => onNav("notifications")}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 relative transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={17} />
            {unreadNotifs > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                {unreadNotifs > 99 ? "99+" : unreadNotifs}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => onNav("cart")}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 relative transition-all cursor-pointer"
            aria-label="Cart"
          >
            <ShoppingCart size={17} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md shadow-cyan-900/50">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu((p) => !p)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:border-slate-600 text-slate-200 transition-all cursor-pointer"
            >
              <div className="w-6 h-6 rounded-lg bg-cyan-600/30 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-extrabold text-xs">
                {userName?.[0] || "U"}
              </div>
              <span className="hidden sm:block text-sm font-bold text-slate-100 truncate max-w-[100px]">
                {userName}
              </span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="user-dropdown-menu absolute right-0 top-full mt-2 w-52 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="p-3 border-b border-slate-800">
                  <div className="text-sm font-bold text-slate-100">{userName}</div>
                  <div className="text-xs text-slate-400 mt-0.5">Customer Account</div>
                </div>
                {[
                  { label: "My Profile", id: "profile" },
                  { label: "Settings", id: "settings" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onNav(item.id); setShowProfileMenu(false); }}
                    className="user-dropdown-item w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-slate-800">
                  <button
                    onClick={() => { setShowProfileMenu(false); onNav("_logout"); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <Power size={14} />
                    Logout
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
