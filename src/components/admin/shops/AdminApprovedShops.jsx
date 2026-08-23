import React, { useState } from "react";
import { Store, Search, ShieldCheck, AlertTriangle, XCircle, MoreVertical } from "lucide-react";
import { MOCK_APPROVED_SHOPS } from "../AdminConstants";

export default function AdminApprovedShops({ shops = MOCK_APPROVED_SHOPS, onNav }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = shops.filter((s) => {
    if (filter === "approved" && s.status !== "APPROVED") return false;
    if (filter === "investigation" && s.status !== "UNDER_INVESTIGATION") return false;
    if (filter === "suspended" && s.status !== "SUSPENDED") return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        s.shopName.toLowerCase().includes(q) ||
        s.ownerName.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 gd-rise w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Store size={24} className="text-cyan-400" />
            <span>Registered Merchants Directory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Active, suspended, and restricted seller stores on the platform.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start">
          {[
            { id: "all", label: "All Shops" },
            { id: "approved", label: "Active Approved" },
            { id: "investigation", label: "Under Watch" },
            { id: "suspended", label: "Suspended" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === f.id
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search merchant name, owner, category..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:border-cyan-400 font-medium"
        />
      </div>

      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-black text-slate-300 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-4">Merchant Shop</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Orders</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {filtered.map((shop) => (
                <tr key={shop.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white">{shop.shopName}</p>
                    <p className="text-[11px] text-slate-400">{shop.ownerName} • {shop.phone}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{shop.category}</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">★ {shop.rating} ({shop.reviewsCount})</td>
                  <td className="py-3.5 px-4 text-slate-200 font-mono font-bold">{shop.totalOrders}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        shop.status === "APPROVED"
                          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          : shop.status === "UNDER_INVESTIGATION"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {shop.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onNav("fraud-investigation")}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 transition-colors cursor-pointer"
                    >
                      Audit View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
