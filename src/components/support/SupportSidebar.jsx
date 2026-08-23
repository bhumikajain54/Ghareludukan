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
  ];

  const renderSidebar = (isExpanded) => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 select-none">
      {/* Brand Header */}
      <div
        className={`flex items-center gap-3 py-4 border-b border-slate-800 h-16 ${
          isExpanded ? "px-4" : "px-3 justify-center"
        }`}
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-950/60 flex-shrink-0">
          <Headphones size={20} className="text-white" />
        </div>
        {isExpanded && (
          <div className="min-w-0 flex-1 animate-in fade-in duration-200">
            <div className="text-sm font-extrabold text-white tracking-wide truncate">
              GHARELUDUKAN
            </div>
            <div className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest flex items-center gap-1 font-bold truncate">
              <Sparkles size={10} /> Support Portal
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
        {navGroups.map((group, gIdx) => (
          <div key={group.group}>
            {isExpanded ? (
              <div className="px-2 mb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {group.group}
              </div>
            ) : (
              gIdx > 0 && <div className="my-2 border-t border-slate-800/80 mx-1.5" />
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = view === item.id;
                const badge = item.badge > 0 ? item.badge : null;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNav(item.id);
                      onClose?.();
                    }}
                    title={!isExpanded ? item.label : undefined}
                    className={`w-full flex items-center rounded-xl text-sm font-medium transition-all duration-150 group relative cursor-pointer ${
                      isExpanded ? "gap-3 px-3 py-2.5" : "justify-center p-2.5 h-11"
                    } ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 font-bold"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`flex-shrink-0 ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-400"
                      }`}
                    />
                    {isExpanded && (
                      <span className="flex-1 text-left truncate animate-in fade-in duration-150">
                        {item.label}
                      </span>
                    )}
                    {badge && isExpanded && (
                      <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-500 text-white min-w-[18px] text-center">
                        {badge > 99 ? "99+" : badge}
                      </span>
                    )}
                    {badge && !isExpanded && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-indigo-400 rounded-full border-2 border-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout Footer */}
      <div className="border-t border-slate-800 p-2.5">
        {isExpanded ? (
          <button
            onClick={() => onNav("_logout")}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20 hover:text-red-300 font-bold text-xs transition-all cursor-pointer shadow-xs animate-in fade-in duration-150"
            title="Logout"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => onNav("_logout")}
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
