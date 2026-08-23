import React from "react";
import {
  Bike,
  Wallet,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  ArrowRight,
  TrendingUp,
  Zap,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function DeliveryDashboard({
  rider,
  jobs = [],
  dutyOnline = true,
  onToggleDuty,
  onNav,
  onSelectJob,
}) {
  const activeJob = jobs.find(
    (j) => j.status === "ACCEPTED" || j.status === "ARRIVED_SHOP" || j.status === "PICKED_UP" || j.status === "OUT_FOR_DELIVERY"
  );
  const availablePool = jobs.filter((j) => j.status === "AVAILABLE");

  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Top Banner / Duty Controller */}
      <div className="welcome-banner p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                ZONE 1 JAIPUR
              </span>
              <span className="text-xs text-slate-400">Rain surge active (+₹20)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Namaste, {rider?.name?.split(" ")[0] || "Vikram"}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {dutyOnline
                ? "You are online and ready to receive hyperlocal delivery jobs."
                : "You are currently offline. Turn on duty to start receiving jobs."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleDuty}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-lg flex items-center gap-2 ${
                dutyOnline
                  ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              <Zap size={16} />
              <span>{dutyOnline ? "GO OFFLINE" : "GO ONLINE"}</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-800 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold">Today's Earnings</span>
              <Wallet size={15} className="text-cyan-400" />
            </div>
            <p className="text-lg sm:text-2xl font-black text-white mt-1">₹485</p>
            <p className="text-[10px] text-cyan-400 font-semibold mt-0.5">8 completed trips</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-800 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold">Hours Online</span>
              <Clock size={15} className="text-cyan-400" />
            </div>
            <p className="text-lg sm:text-2xl font-black text-white mt-1">5h 40m</p>
            <p className="text-[10px] text-cyan-400 font-semibold mt-0.5">Target: 6 hours</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-800 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold">Rating</span>
              <TrendingUp size={15} className="text-amber-400" />
            </div>
            <p className="text-lg sm:text-2xl font-black text-white mt-1">★ 4.88</p>
            <p className="text-[10px] text-amber-400 font-semibold mt-0.5">Top 5% rider</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-800 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold">On-Time Rate</span>
              <CheckCircle2 size={15} className="text-indigo-400" />
            </div>
            <p className="text-lg sm:text-2xl font-black text-white mt-1">96.2%</p>
            <p className="text-[10px] text-indigo-400 font-semibold mt-0.5">100% bonus qualified</p>
          </div>
        </div>
      </div>

      {/* Active Trip Banner if any */}
      {activeJob && (
        <div className="p-5 rounded-3xl bg-slate-900 border-2 border-indigo-500/40 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider">
                Ongoing Delivery Assignment
              </span>
            </div>
            <span className="text-xs font-black text-white bg-indigo-500/20 px-2.5 py-1 rounded-xl border border-indigo-500/30">
              Payout: ₹{activeJob.totalPayout}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <MapPin size={14} className="text-indigo-400" />
                <span>PICKUP: {activeJob.shop?.name}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{activeJob.shop?.address}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <MapPin size={14} className="text-cyan-400" />
                <span>DROP: {activeJob.customer?.name}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{activeJob.customer?.address}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <button
              type="button"
              onClick={() => {
                onSelectJob(activeJob.id);
                onNav("job-detail");
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-indigo-600/30"
            >
              <span>Continue Delivery Workflow</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Available Jobs Pool Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Bike size={20} className="text-cyan-400" />
              <span>Available Jobs Nearby ({availablePool.length})</span>
            </h2>
            <p className="text-xs text-slate-400">Tap on a job to review pickup & drop details</p>
          </div>

          <button
            type="button"
            onClick={() => onNav("jobs")}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {availablePool.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 text-center space-y-2">
            <Bike size={32} className="mx-auto text-slate-600" />
            <p className="text-sm font-bold text-slate-300">No jobs in your immediate radius right now</p>
            <p className="text-xs text-slate-500">Stay online. New orders from nearby shops pop up automatically.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePool.map((job) => (
              <div
                key={job.id}
                onClick={() => {
                  onSelectJob(job.id);
                  onNav("job-detail");
                }}
                className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all cursor-pointer shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {job.type} • {job.distanceKm} km
                  </span>
                  <div className="text-right">
                    <span className="text-base font-black text-cyan-400">₹{job.totalPayout}</span>
                    {job.tip > 0 && (
                      <span className="text-[10px] text-amber-400 block font-semibold">+₹{job.tip} Tip</span>
                    )}
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-200">{job.shop?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs">{job.shop?.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-200">{job.customer?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs">{job.customer?.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">{job.itemsCount} items ({job.totalWeightKg} kg)</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Accept Job <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
