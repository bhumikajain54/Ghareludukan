import React, { useState } from "react";
import {
  LayoutDashboard, ShoppingCart, Package, Warehouse, Users,
  Tag, BarChart3, FileBarChart, Wallet, ArrowLeftRight,
  Receipt, Bell, Headphones, Store, Settings, LogOut,
  ChevronRight, Menu, X, Home, MoreHorizontal,
} from "lucide-react";
import { SELLER_NAV } from "./SellerConstants";

const ICON_MAP = {
  LayoutDashboard, ShoppingCart, Package, Warehouse, Users,
  Tag, BarChart3, FileBarChart, Wallet, ArrowLeftRight,
  Receipt, Bell, Headphones, Store, Settings,
};

export default function SellerSidebar({
  view, onNav, pendingOrders, unreadNotifs, onLogout, shopOnline,
  isOpen, onClose,
}) {
  const [collapsed, setCollapsed] = useState({});

  const toggleGroup = (g) => setCollapsed((p) => ({ ...p, [g]: !p[g] }));

  const NavItem = ({ item }) => {
    const Icon = ICON_MAP[item.icon] || Package;
    const isActive = view === item.id;
    const badge =
      item.badge === "pending" && pendingOrders > 0 ? pendingOrders
      : item.id === "notifications" && unreadNotifs > 0 ? unreadNotifs
      : null;
    return (
      <button
        onClick={() => { onNav(item.id); onClose?.(); }}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative
          ${isActive
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          }`}
      >
        <Icon size={17} className={isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"} />
        <span className="flex-1 text-left truncate">{item.label}</span>
        {badge && (
          <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white min-w-[18px] text-center">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </button>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <Store size={18} className="text-white" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-extrabold text-white tracking-wide truncate">GHARELUDUKAN</div>
          <div className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest">Seller Portal</div>
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
        {SELLER_NAV.map((group) => (
          <div key={group.group}>
            <button
              onClick={() => toggleGroup(group.group)}
              className="w-full flex items-center gap-1.5 px-1 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-400 transition-colors"
            >
              <span className="flex-1 text-left">{group.group}</span>
              <ChevronRight
                size={12}
                className={`transition-transform duration-200 ${collapsed[group.group] ? "" : "rotate-90"}`}
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

      {/* Seller Profile & Logout Combined Footer */}
      <div className="border-t border-slate-800 p-3">
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600/80 transition-all">
          <div
            onClick={() => {
              onNav("shop-profile");
              onClose?.();
            }}
            className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600/30 transition-colors">
              <span className="text-sm font-extrabold text-indigo-400">R</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-100 truncate group-hover:text-indigo-400 transition-colors">
                Raj Traders
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${shopOnline ? "bg-emerald-400" : "bg-slate-500"}`} />
                <span className={`text-[10px] font-semibold truncate ${shopOnline ? "text-emerald-400" : "text-slate-500"}`}>
                  {shopOnline ? "Online" : "Offline"} · Verified
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

      {/* Mobile Overlay Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <aside className="relative z-10 flex flex-col w-72 bg-slate-900 h-full overflow-hidden shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

// ─── Mobile Bottom Navigation ────────────────
export function SellerBottomNav({ view, onNav, pendingOrders }) {
  const items = [
    { id: "dashboard", label: "Home", Icon: Home },
    { id: "orders", label: "Orders", Icon: ShoppingCart, badge: pendingOrders },
    { id: "products", label: "Products", Icon: Package },
    { id: "inventory", label: "Inventory", Icon: Warehouse },
    { id: "more", label: "More", Icon: MoreHorizontal },
  ];
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-2 py-2 safe-area-bottom">
      {items.map(({ id, label, Icon, badge }) => {
        const active = view === id || (id === "more" && !["dashboard","orders","products","inventory"].includes(view));
        return (
          <button
            key={id}
            onClick={() => onNav(id)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl min-w-[56px] relative transition-all
              ${active ? "text-indigo-400" : "text-slate-500"}`}
          >
            {badge > 0 && (
              <span className="absolute top-0 right-1 text-[9px] font-bold w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center">
                {badge > 9 ? "9+" : badge}
              </span>
            )}
            <Icon size={20} />
            <span className="text-[9px] font-semibold">{label}</span>
            {active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full" />}
          </button>
        );
      })}
    </nav>
  );
}
