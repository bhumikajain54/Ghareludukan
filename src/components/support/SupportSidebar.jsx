import React, { useState } from "react";
import {
  LayoutDashboard,
  LifeBuoy,
  AlertOctagon,
  BarChart2,
  LogOut,
  X,
  Sparkles,
  Headphones,
  Home,
  User,
  Settings,
} from "lucide-react";

export default function SupportSidebar({
  view = "dashboard",
  onNav,
  openTickets = 0,
  onLogout,
  isOpen = false,
  onClose,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = React.useRef(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 120);
  };

  const navGroups = [
    {
      group: "HELPDESK QUEUE",
      items: [
        { id: "dashboard", label: "Overview Dashboard", icon: LayoutDashboard },
        { id: "tickets", label: "Tickets Master Queue", icon: LifeBuoy, badge: openTickets },
        { id: "escalations", label: "Priority Escalation Desk", icon: AlertOctagon },
      ],
    },
    {
      group: "REPORTS & SLA",
      items: [
        { id: "reports", label: "SLA & CSAT Reports", icon: BarChart2 },
      ],
    },
    {
      group: "SYSTEM",
      items: [
        { id: "profile", label: "Support Profile", icon: User },
        { id: "settings", label: "Helpdesk Settings", icon: Settings },
      ],
    },
  ];

  const renderSidebar = (isExpanded) => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 select-none overflow-hidden">
      {/* Brand Header */}
      <div className="flex items-center px-4 py-3.5 border-b border-slate-800 h-16 shrink-0 overflow-hidden">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-950/60 shrink-0">
          <Headphones size={20} className="text-white" />
        </div>
        
        <div
          className={`min-w-0 transition-all duration-250 ease-in-out overflow-hidden flex flex-col justify-center ${
            isExpanded ? "opacity-100 max-w-[180px] ml-3" : "opacity-0 max-w-0 ml-0 pointer-events-none"
          }`}
        >
          <div className="text-sm font-black text-white tracking-wide truncate">
            GHARELUDUKAN
          </div>
          <div className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest flex items-center gap-1 font-bold truncate">
            <Sparkles size={9} /> Support Portal
          </div>
        </div>

        {isExpanded && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto lg:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4 scrollbar-none">
        {navGroups.map((group, gIdx) => (
          <div key={group.group} className="space-y-1">
            {/* Section Heading or Divider */}
            {isExpanded ? (
              <div className="px-3 mb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate transition-opacity duration-200 opacity-100">
                {group.group}
              </div>
            ) : (
              gIdx > 0 && <div className="my-2 border-t border-slate-800/80 mx-2" />
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = view === item.id;
                const badge = item.badge > 0 ? item.badge : null;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onNav(item.id);
                      onClose?.();
                    }}
                    title={!isExpanded ? item.label : undefined}
                    className={`w-full flex items-center h-11 px-3.5 rounded-xl text-xs font-semibold transition-all duration-150 group relative cursor-pointer overflow-hidden ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 font-bold"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    }`}
                  >
                    {/* Fixed Icon Container */}
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <Icon
                        size={18}
                        className={`transition-colors ${
                          isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-400"
                        }`}
                      />
                    </div>

                    {/* Smooth Text Expand/Collapse */}
                    <span
                      className={`truncate text-left transition-all duration-200 ease-in-out whitespace-nowrap ${
                        isExpanded
                          ? "opacity-100 max-w-[150px] ml-3"
                          : "opacity-0 max-w-0 ml-0 overflow-hidden pointer-events-none"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Numeric Badge (Expanded) */}
                    {badge && (
                      <span
                        className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-500 text-white min-w-[18px] text-center transition-all duration-200 ${
                          isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none hidden"
                        }`}
                      >
                        {badge > 99 ? "99+" : badge}
                      </span>
                    )}

                    {/* Dot Badge (Collapsed) */}
                    {badge && !isExpanded && (
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-400 rounded-full border-2 border-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout Footer */}
      <div className="border-t border-slate-800 p-2.5 shrink-0 overflow-hidden">
        <button
          type="button"
          onClick={() => onNav("_logout")}
          className="w-full flex items-center h-11 px-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20 hover:text-red-300 font-bold text-xs transition-all duration-150 cursor-pointer shadow-xs overflow-hidden"
          title="Logout"
          aria-label="Logout"
        >
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <LogOut size={18} />
          </div>

          <span
            className={`truncate transition-all duration-200 ease-in-out whitespace-nowrap ${
              isExpanded
                ? "opacity-100 max-w-[140px] ml-3"
                : "opacity-0 max-w-0 ml-0 overflow-hidden pointer-events-none"
            }`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar with Smooth Width Transition */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`hidden lg:flex flex-col shrink-0 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 overflow-hidden transition-[width] duration-250 ease-in-out z-40 ${
          isHovered ? "w-64" : "w-[72px]"
        }`}
      >
        {renderSidebar(isHovered)}
      </aside>

      {/* Mobile Overlay Sidebar */}
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

// ─── Mobile Bottom Navigation ────────────────
export function SupportBottomNav({ view, onNav, openTickets = 0 }) {
  const items = [
    { id: "dashboard", label: "Dashboard", Icon: Home },
    { id: "tickets", label: "Tickets", Icon: LifeBuoy, badge: openTickets },
    { id: "escalations", label: "Escalate", Icon: AlertOctagon },
    { id: "reports", label: "Reports", Icon: BarChart2 },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-2 py-2 safe-area-bottom">
      {items.map(({ id, label, Icon, badge }) => {
        const active = view === id;
        return (
          <button
            key={id}
            onClick={() => onNav(id)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl min-w-[56px] relative transition-all ${
              active ? "text-indigo-400 font-bold" : "text-slate-500"
            }`}
          >
            {badge > 0 && (
              <span className="absolute top-0 right-1 text-[9px] font-bold w-4 h-4 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                {badge > 9 ? "9+" : badge}
              </span>
            )}
            <Icon size={20} />
            <span className="text-[9px] font-semibold">{label}</span>
            {active && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
