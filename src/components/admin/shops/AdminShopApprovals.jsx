import React, { useState } from "react";
import {
  Store,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Filter,
  Search,
  FileText,
  ShieldCheck,
} from "lucide-react";

export default function AdminShopApprovals({
  pendingShops = [],
  onSelectShop,
  onNav,
}) {
  const [filter, setFilter] = useState("all"); // 'all' | 'pending' | 'correction'
  const [search, setSearch] = useState("");

  const filtered = pendingShops.filter((shop) => {
    if (filter === "pending" && shop.status !== "PENDING_VERIFICATION") return false;
    if (filter === "correction" && shop.status !== "CORRECTION_REQUIRED") return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        shop.shopName.toLowerCase().includes(q) ||
        shop.ownerName.toLowerCase().includes(q) ||
        shop.category.toLowerCase().includes(q) ||
        shop.gstin?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Store size={24} className="text-cyan-400" />
            <span>Shop Onboarding & Approval Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Review merchant documents (GST, FSSAI, Bank Cheque, Storefront) before granting live marketplace access.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start">
          {[
            { id: "all", label: "All Submissions" },
            { id: "pending", label: "Pending Review" },
            { id: "correction", label: "Needs Correction" },
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

      {/* Search Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Shop Name, Owner, Category, GSTIN..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:border-cyan-400 font-medium"
        />
      </div>

      {/* Queue List */}
      {filtered.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
          <Store size={36} className="mx-auto text-slate-400" />
          <p className="text-sm font-bold text-slate-200">No applications matching current filters</p>
          <p className="text-xs text-slate-400 font-medium">All merchant submissions have been processed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((shop) => (
            <div
              key={shop.id}
              onClick={() => {
                onSelectShop(shop.id);
                onNav("shop-review");
              }}
              className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all cursor-pointer shadow-md flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {shop.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-black ${
                      shop.status === "CORRECTION_REQUIRED"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    }`}
                  >
                    {shop.status === "CORRECTION_REQUIRED" ? "CORRECTION SENT" : "PENDING"}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {shop.shopName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Prop: {shop.ownerName}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>GSTIN:</span>
                    <span className="font-mono text-slate-200">{shop.gstin}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>FSSAI:</span>
                    <span className="font-mono text-slate-200">{shop.fssai}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Applied:</span>
                    <span className="text-slate-300">{shop.appliedDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">{shop.documents?.length || 5} Documents</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Start Audit Review</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
