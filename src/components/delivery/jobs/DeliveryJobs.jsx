import React, { useState } from "react";
import {
  Bike,
  MapPin,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Search,
} from "lucide-react";

export default function DeliveryJobs({
  jobs = [],
  onSelectJob,
  onNav,
}) {
  const [tab, setTab] = useState("all"); // 'all' | 'available' | 'active' | 'completed'
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((job) => {
    if (tab === "available" && job.status !== "AVAILABLE") return false;
    if (
      tab === "active" &&
      !["ACCEPTED", "ARRIVED_SHOP", "PICKED_UP", "OUT_FOR_DELIVERY"].includes(job.status)
    )
      return false;
    if (tab === "completed" && !["DELIVERED", "FAILED", "RETURNED"].includes(job.status))
      return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        job.id.toLowerCase().includes(q) ||
        job.orderId.toLowerCase().includes(q) ||
        job.shop?.name?.toLowerCase().includes(q) ||
        job.customer?.name?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "AVAILABLE":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">READY TO ACCEPT</span>;
      case "ACCEPTED":
      case "ARRIVED_SHOP":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">PICKUP IN PROGRESS</span>;
      case "PICKED_UP":
      case "OUT_FOR_DELIVERY":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-sky-500/15 border border-sky-500/30 text-sky-400">OUT FOR DELIVERY</span>;
      case "DELIVERED":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">DELIVERED</span>;
      case "FAILED":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/10 border border-rose-500/30 text-rose-400">FAILED / RETURNED</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-800 text-slate-400">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Bike size={24} className="text-cyan-400" />
            <span>Delivery Jobs Pool</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Accept and fulfill orders from local neighborhood shops.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start">
          {[
            { id: "all", label: "All Jobs" },
            { id: "available", label: "Available" },
            { id: "active", label: "Active Duty" },
            { id: "completed", label: "Past Trips" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tab === t.id
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Job ID, Order ID, Shop or Customer Name..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:border-cyan-400 font-medium"
        />
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-3">
          <Bike size={36} className="mx-auto text-slate-400" />
          <p className="text-sm font-bold text-slate-200">No matching jobs found</p>
          <p className="text-xs text-slate-400 font-medium">Try changing your tab filter or search keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => {
                onSelectJob(job.id);
                onNav("job-detail");
              }}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all cursor-pointer shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">{job.id}</span>
                    <span className="text-[11px] text-slate-400 font-medium">({job.orderId})</span>
                  </div>
                  {getStatusBadge(job.status)}
                </div>

                {/* Distance & Payout Bar */}
                <div className="mt-3 p-3 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-200">
                    <span className="font-bold">{job.distanceKm} km</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300">~{job.estimatedMinutes} mins</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-cyan-400">₹{job.totalPayout}</span>
                    {job.tip > 0 && <span className="text-[10px] text-amber-400 ml-1.5">(incl. ₹{job.tip} tip)</span>}
                  </div>
                </div>

                {/* Route */}
                <div className="mt-3.5 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-200">{job.shop?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs">{job.shop?.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-200">{job.customer?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs">{job.customer?.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">{job.itemsCount || job.items?.length || 2} items</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>View Details</span>
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
