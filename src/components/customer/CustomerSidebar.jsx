import React, { useState } from "react";
import {
  Home, Search, Store, ShoppingCart, Heart, ShoppingBag,
  Wallet, Tag, User, MapPin, Bell, Headphones, Settings,
  LogOut, ChevronRight, X, Sparkles,
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
  const [isHovered, setIsHovered] = useState(false);
  const [collapsed, setCollapsed] = useState({});

  const toggleGroup = (g) => setCollapsed((p) => ({ ...p, [g]: !p[g] }));

  const renderSidebar = (isExpanded) => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 select-none">
      {/* Brand Header */}
      <div
        className={`flex items-center gap-3 py-4 border-b border-slate-800 h-16 ${
          isExpanded ? "px-4" : "px-3 justify-center"
        }`}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-950/60 flex-shrink-0">
          <Store size={20} className="text-white" />
        </div>
        {isExpanded && (
          <div className="min-w-0 flex-1 animate-in fade-in duration-200">
            <div className="text-sm font-extrabold text-white tracking-wide truncate">
              GHARELUDUKAN
            </div>
            <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1 font-bold truncate">
              <Sparkles size={10} /> Hyperlocal Customer
            </div>
          </div>
        )}
        {isExpanded && (
          <button
            onClick={onClose}
            className="ml-auto lg:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4 scrollbar-none">
        {CUSTOMER_NAV.map((group, gIdx) => (
          <div key={group.group}>
            {isExpanded ? (
              <button
                onClick={() => toggleGroup(group.group)}
                className="w-full flex items-center gap-1.5 px-2 mb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-400 transition-colors cursor-pointer"
              >
                <span className="flex-1 text-left truncate">{group.group}</span>
                <ChevronRight
                  size={12}
                  className={`transition-transform duration-200 ${
                    collapsed[group.group] ? "" : "rotate-90"
                  }`}
                />
              </button>
            ) : (
              gIdx > 0 && <div className="my-2 border-t border-slate-800/80 mx-1.5" />
            )}

            {(!collapsed[group.group] || !isExpanded) && (
              <div className="space-y-1">
                {group.items.map((item) => {
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
                      key={item.id}
                      onClick={() => {
                        onNav(item.id);
                        onClose?.();
                      }}
                      title={!isExpanded ? item.label : undefined}
                      className={`w-full flex items-center rounded-xl text-sm font-medium transition-all duration-150 group relative cursor-pointer ${
                        isExpanded
                          ? "gap-3 px-3 py-2.5"
                          : "justify-center p-2.5 h-11"
                      } ${
                        isActive
                          ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 font-bold"
                          : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`flex-shrink-0 ${
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-cyan-400"
                        }`}
                      />
                      {isExpanded && (
                        <span className="flex-1 text-left truncate animate-in fade-in duration-150">
                          {item.label}
                        </span>
                      )}
                      {badge && isExpanded && (
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
                      {badge && !isExpanded && (
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-cyan-400 rounded-full border-2 border-slate-900" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Footer: Icon on collapsed, full button on hover/expanded */}
      <div className="border-t border-slate-800 p-2.5">
        {isExpanded ? (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20 hover:text-red-300 font-bold text-xs transition-all cursor-pointer shadow-xs animate-in fade-in duration-150"
            title="Logout"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={onLogout}
              className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all flex items-center justify-center cursor-pointer shadow-xs"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar with Hover Expansion */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`hidden lg:flex flex-col flex-shrink-0 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 overflow-hidden transition-all duration-300 ease-in-out z-40 ${
          isHovered ? "w-64" : "w-[72px]"
        }`}
      >
        {renderSidebar(isHovered)}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="relative z-10 flex flex-col w-72 bg-slate-900 h-full overflow-hidden shadow-2xl">
            {renderSidebar(true)}
          </aside>
        </div>
      )}
    </>
  );
}
