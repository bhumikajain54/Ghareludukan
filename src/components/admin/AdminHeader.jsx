import React, { useState, useRef } from "react";
import { Bell, Menu, Power, ShieldCheck, Sun, Moon } from "lucide-react";

export default function AdminHeader({
  unreadNotifs = 0,
  onNav,
  onOpenSidebar,
  darkMode = false,
  onToggleTheme,
  adminName = "Sanjay Saxena",
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setShowProfileMenu(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowProfileMenu(false);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3 px-4 lg:px-6 h-14">
      {/* Mobile: Hamburger & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center shadow-md shadow-cyan-600/30">
            <ShieldCheck size={14} className="text-white" />
          </div>
          <span className="text-xs font-black text-slate-100 tracking-wider">ADMIN</span>
        </div>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-2.5">
        {/* Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-bold text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Audit Authority Active</span>
        </div>

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

        {/* Notification Bell with Badge */}
        <button
          onClick={() => onNav("notifications")}
          className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 relative transition-all cursor-pointer flex items-center justify-center"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={17} />
          {unreadNotifs > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
              {unreadNotifs > 99 ? "99+" : unreadNotifs}
            </span>
          )}
        </button>

        {/* Admin Profile Dropdown Pill */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={() => setShowProfileMenu((p) => !p)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:border-slate-600 text-slate-200 transition-all cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-cyan-600/30 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-extrabold text-xs">
              {adminName.charAt(0)}
            </div>
            <span className="hidden sm:block text-sm font-bold text-slate-100 truncate max-w-[130px]">
              {adminName}
            </span>
          </button>

          {showProfileMenu && (
            <div className="user-dropdown-menu absolute right-0 top-full mt-2 w-52 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="p-3 border-b border-slate-800">
                <div className="text-sm font-bold text-slate-100">{adminName}</div>
                <div className="text-xs text-slate-400 mt-0.5">Platform Admin · Compliance Lead</div>
              </div>
              {[
                { label: "Overview Dashboard", id: "dashboard" },
                { label: "Platform Rules & KYC", id: "settings" },
                { label: "Immutable Audit Logs", id: "audit-logs" },
                { label: "GMV & SLA Reports", id: "reports" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNav(item.id);
                    setShowProfileMenu(false);
                  }}
                  className="user-dropdown-item w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-slate-800">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNav("_logout");
                  }}
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
    </header>
  );
}
