import React, { useState } from "react";
import {
  Home, Search, Store, ShoppingCart, Heart, ShoppingBag,
  Wallet, Tag, User, MapPin, Bell, Headphones, Settings,
  LogOut, ChevronRight, X, Sparkles, ShieldCheck,
} from "lucide-react";
import { CUSTOMER_NAV } from "./CustomerConstants";

const ICON_MAP = {
  Home,
  Search,
  Store,
  ShoppingCart,
  Heart,
  ShoppingBag,
  Wallet,
  Tag,
  User,
  MapPin,
  Bell,
  Headphones,
  Settings,
};

export default function CustomerSidebar({
  view,
  onNav,
  cartCount = 0,
  unreadNotifs = 0,
  activeOrders = 0,
  onLogout,
  isOpen,
  onClose,
  userName = "Bhumika Jain",
  userPhone = "+91 98765 43210",
}) {
  const [collapsed, setCollapsed] = useState({});

  const toggleGroup = (g) => setCollapsed((p) => ({ ...p, [g]: !p[g] }));

  const NavItem = ({ item }) => {
    const Icon = ICON_MAP[item.icon] || Home;
    const isActive = view === item.id;
    const badge =
      item.badge === "cart" && cartCount > 0
        ? cartCount
        : item.badge === "notifications" && unreadNotifs > 0
        ? unreadNotifs
        : null;

    return (
      <button
        onClick={() => {
          onNav(item.id);
          onClose?.();
        }}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative ${
          isActive
            ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 font-bold"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
        }`}
      >
        <Icon
          size={17}
          className={
            isActive
              ? "text-white"
              : "text-slate-500 group-hover:text-cyan-400"
          }
        />
        <span className="flex-1 text-left truncate">{item.label}</span>
        {badge && (
          <span
            className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
              item.badge === "cart"
                ? "bg-cyan-500 text-white"
                : item.badge === "activeOrders"
                ? "bg-amber-500 text-slate-950 font-black"
                : "bg-red-500 text-white"
            }`}
          >
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </button>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-950/60 flex-shrink-0">
          <Store size={18} className="text-white" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-extrabold text-white tracking-wide truncate">
            GHARELUDUKAN
          </div>
          <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1 font-bold">
            <Sparkles size={10} /> Hyperlocal Customer
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-auto lg:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-500"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5 scrollbar-none">
        {CUSTOMER_NAV.map((group) => (
          <div key={group.group}>
            <button
              onClick={() => toggleGroup(group.group)}
              className="w-full flex items-center gap-1.5 px-1 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-400 transition-colors"
            >
              <span className="flex-1 text-left">{group.group}</span>
              <ChevronRight
                size={12}
                className={`transition-transform duration-200 ${
                  collapsed[group.group] ? "" : "rotate-90"
                }`}
              />
            </button>
            {!collapsed[group.group] && (
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Customer Profile & Logout Combined Footer */}
      <div className="border-t border-slate-800 p-3">
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600/80 transition-all">
          <div
            onClick={() => {
              onNav("profile");
              onClose?.();
            }}
            className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-cyan-400 font-extrabold text-sm group-hover:bg-cyan-600/30 transition-colors">
              {userName[0] || "C"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-100 truncate group-hover:text-cyan-400 transition-colors">
                {userName}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-[10px] font-semibold text-emerald-400 truncate">
                  Level 1 Verified
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="logout-btn p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all flex items-center justify-center flex-shrink-0 cursor-pointer"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="relative z-10 flex flex-col w-72 bg-slate-900 h-full overflow-hidden shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
