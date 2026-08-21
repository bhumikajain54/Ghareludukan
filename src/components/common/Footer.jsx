import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/90 bg-white/80 backdrop-blur-md py-3 sm:py-3.5 text-center text-xs text-slate-500 w-full mt-auto app-footer shrink-0">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <p className="text-xs">© 2026 GHARELUDUKAN (Yovexa Solutions). All rights reserved.</p>
        <p className="text-[11px] text-slate-500 font-semibold">Designed by Bhumika Jain</p>
      </div>
    </footer>
  );
}
