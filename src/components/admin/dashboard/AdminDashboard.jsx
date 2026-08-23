import React from "react";
import {
  Store,
  Bike,
  ShieldAlert,
  FileText,
  TrendingUp,
  Clock,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Users,
  ShoppingBag,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MOCK_ADMIN_METRICS, MOCK_ADMIN_REPORTS } from "../AdminConstants";

export default function AdminDashboard({
  metrics = MOCK_ADMIN_METRICS,
  onNav,
  onSelectShop,
  pendingShops = [],
}) {
  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Top Banner */}
      <div className="welcome-banner p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                JAIPUR CLUSTER ACTIVE
              </span>
              <span className="text-xs text-slate-400">All systems operational</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Platform Governance & Operations Desk
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Monitor shop registrations, delivery partner vetting, fraud mitigation, and audit integrity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNav("shop-approvals")}
              className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs cursor-pointer shadow-md shadow-cyan-600/30 transition-all flex items-center gap-1.5"
            >
              <span>Review Shops ({metrics.pendingShopApprovals || 0})</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 4 Core KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold">Total Verified Shops</span>
              <Store size={16} className="text-cyan-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-white mt-1">{metrics.approvedShops}</p>
            <p className="text-[10px] text-amber-400 font-semibold mt-0.5">
              +{metrics.pendingShopApprovals} pending review
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold">Active Riders</span>
              <Bike size={16} className="text-cyan-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-white mt-1">{metrics.activeDeliveryPartners}</p>
            <p className="text-[10px] text-cyan-400 font-semibold mt-0.5">
              +{metrics.pendingDeliveryApprovals} KYC pending
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold">Platform GMV (Today)</span>
              <TrendingUp size={16} className="text-indigo-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-white mt-1">₹{metrics.platformGmvToday?.toLocaleString()}</p>
            <p className="text-[10px] text-indigo-400 font-semibold mt-0.5">312 orders fulfilled</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold">Fraud / Risk Alerts</span>
              <ShieldAlert size={16} className="text-rose-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-rose-400 mt-1">{metrics.fraudAlertsCount}</p>
            <p className="text-[10px] text-rose-400 font-semibold mt-0.5">Urgent investigation needed</p>
          </div>
        </div>
      </div>

      {/* Chart & Quick Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GMV Growth Chart */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white">Monthly Platform GMV Growth</h3>
              <p className="text-[11px] text-slate-400">Jaipur Hyperlocal Marketplace Expansion</p>
            </div>
            <span className="text-xs font-black text-cyan-400">+145% Q3 Growth</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ADMIN_REPORTS.monthlyGrowth}>
                <defs>
                  <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `₹${v / 100000}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: 12, fontSize: 12 }}
                  formatter={(val) => [`₹${val.toLocaleString()}`, "GMV"]}
                />
                <Area type="monotone" dataKey="gmv" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#gmvGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Action Desk */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Clock size={16} className="text-amber-400" />
              <span>Immediate Approval Queue</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Pending statutory document checks</p>

            <div className="space-y-2.5 mt-4">
              {pendingShops.slice(0, 3).map((shop) => (
                <div
                  key={shop.id}
                  onClick={() => {
                    onSelectShop(shop.id);
                    onNav("shop-review");
                  }}
                  className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-cyan-400/50 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white truncate max-w-[150px]">{shop.shopName}</p>
                    <p className="text-[10px] text-slate-400">{shop.ownerName} • {shop.category}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    REVIEW
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNav("shop-approvals")}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-400 transition-colors"
          >
            View Full Onboarding Queue ({pendingShops.length})
          </button>
        </div>
      </div>
    </div>
  );
}
