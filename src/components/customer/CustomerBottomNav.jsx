import React from "react";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: Home },
  { id: "search", label: "Search", Icon: Search },
  { id: "orders", label: "Orders", Icon: ShoppingBag },
  { id: "wishlist", label: "Wishlist", Icon: Heart },
  { id: "profile", label: "Profile", Icon: User },
];

export default function CustomerBottomNav({ view, onNav, cartCount = 0 }) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-2 py-2 safe-area-bottom">
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const active = view === id;
        return (
          <button
            key={id}
            onClick={() => onNav(id)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl min-w-[56px] relative transition-all
              ${active ? "text-cyan-400" : "text-slate-500"}`}
          >
            <Icon size={20} />
            <span className="text-[9px] font-semibold">{label}</span>
            {active && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
