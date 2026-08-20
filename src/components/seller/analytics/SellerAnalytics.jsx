import React, { useState } from "react";
import {
  TrendingUp, ShoppingCart, Users, RotateCcw, Star,
  IndianRupee, Package, AlertTriangle, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { ANALYTICS_WEEKLY, TOP_PRODUCTS, inr } from "../SellerConstants";

const PERIODS = ["Today", "This Week", "This Month", "Last Month", "Custom"];

function MetricCard({ label, value, change, positive, icon: Icon, color }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-bold ${positive ? "text-emerald-400" : "text-red-400"}`}>
            {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {change}
          </div>
        )}
      </div>
      <div className="font-mono text-2xl font-extrabold text-slate-100 mb-0.5">{value}</div>
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</div>
    </div>
  );
}

function BarChart({ data, valueKey, color }) {
  const max = Math.max(...data.map((d) => d[valueKey]));
  return (
    <div className="flex items-end gap-2 h-24 mt-3">
      {data.map((d) => (
        <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-md transition-all" style={{
            height: `${(d[valueKey] / max) * 100}%`,
            backgroundColor: color || "#6366f1",
            opacity: 0.8,
          }} />
          <span className="text-[9px] text-slate-600 font-mono">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <div className="w-1 h-4 bg-indigo-500 rounded-full" />
        {title}
      </div>
      {children}
    </div>
  );
}

export default function SellerAnalytics({ onNav }) {
  const [period, setPeriod] = useState("This Week");

  return (
    <div className="space-y-8 gd-rise">
      {/* Header + Period Selector */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">Detailed performance metrics for your shop.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNav?.("reports")}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            Export Reports
          </button>
          <div className="flex gap-1.5 flex-wrap">
            {PERIODS.map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${period === p ? "bg-indigo-600 text-white" : "seller-tab-inactive bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Section */}
      <Section title="Sales">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <MetricCard label="Gross Revenue" value={inr(105450)} change="↑12%" positive icon={TrendingUp} color="bg-emerald-500/10 text-emerald-400" />
          <MetricCard label="Net Revenue" value={inr(97200)} change="↑9%" positive icon={IndianRupee} color="bg-indigo-500/10 text-indigo-400" />
          <MetricCard label="Total Orders" value="145" change="↑18%" positive icon={ShoppingCart} color="bg-amber-500/10 text-amber-400" />
          <MetricCard label="Avg Order Value" value={inr(727)} change="↓3%" positive={false} icon={TrendingUp} color="bg-cyan-500/10 text-cyan-400" />
        </div>
        {/* Revenue Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Daily Revenue (₹)</div>
          <BarChart data={ANALYTICS_WEEKLY} valueKey="revenue" color="#6366f1" />
        </div>
      </Section>

      {/* Products Section */}
      <Section title="Products">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Products */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Top Selling Products</div>
            <div className="space-y-3">
              {TOP_PRODUCTS.map((p, i) => {
                const pct = Math.round((p.unitsSold / TOP_PRODUCTS[0].unitsSold) * 100);
                return (
                  <div key={p.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600 font-mono font-bold w-4">{i + 1}</span>
                        <span className="text-slate-300 font-semibold">{p.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">{p.unitsSold} sold</span>
                        <span className="font-mono font-bold text-slate-200">{inr(p.revenue)}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Stock Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Stock Summary</div>
            <div className="space-y-3">
              {[
                { label: "In Stock Products", value: 5, icon: Package, color: "text-emerald-400 bg-emerald-500/10" },
                { label: "Low Stock", value: 3, icon: AlertTriangle, color: "text-amber-400 bg-amber-500/10" },
                { label: "Out of Stock", value: 1, icon: AlertTriangle, color: "text-red-400 bg-red-500/10" },
                { label: "Slow Moving (30d)", value: 2, icon: ArrowDownRight, color: "text-slate-400 bg-slate-500/10" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}><Icon size={14} /></div>
                    <span className="text-sm text-slate-400">{label}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-200">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Customers Section */}
      <Section title="Customers">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <MetricCard label="New Customers" value="18" change="↑22%" positive icon={Users} color="bg-sky-500/10 text-sky-400" />
          <MetricCard label="Repeat Customers" value="42" change="↑8%" positive icon={RotateCcw} color="bg-violet-500/10 text-violet-400" />
          <MetricCard label="Returning Rate" value="70%" change="↑5%" positive icon={TrendingUp} color="bg-emerald-500/10 text-emerald-400" />
        </div>
      </Section>

      {/* Orders Breakdown */}
      <Section title="Order Breakdown">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Completed", value: 128, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
            { label: "Cancelled", value: 8, color: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
            { label: "Rejected", value: 5, color: "bg-red-500/10 text-red-400 border-red-500/20" },
            { label: "Returned", value: 4, color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
          ].map(({ label, value, color }) => (
            <div key={label} className={`bg-slate-900 border rounded-2xl p-5 ${color.split(" ")[2]}`}>
              <div className={`font-mono text-3xl font-extrabold mb-1 ${color.split(" ")[1]}`}>{value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Ratings Section */}
      <Section title="Ratings & Reviews">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-5">
              <div className="text-center">
                <div className="font-mono text-4xl font-extrabold text-amber-400">4.5</div>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={13} className={s <= 4 ? "fill-amber-400 text-amber-400" : "text-slate-700"} />
                  ))}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">84 reviews</div>
              </div>
              <div className="flex-1 space-y-1.5">
                {[[5, 62], [4, 18], [3, 8], [2, 4], [1, 12]].map(([stars, pct]) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-600 w-2 font-mono">{stars}</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-600 w-6 text-right font-mono">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Recent Reviews</div>
            <div className="space-y-2.5">
              {[
                { name: "Rahul Sharma", rating: 5, text: "Very fresh product and delivered quickly!" },
                { name: "Sunita Joshi", rating: 5, text: "Raj Traders is my go-to shop. Always on time!" },
                { name: "Deepak Malhotra", rating: 3, text: "Oil was fine but took a bit longer." },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-indigo-400">{r.name[0]}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-300">{r.name}</div>
                    <div className="flex gap-0.5 my-0.5">
                      {[1,2,3,4,5].map((s) => <Star key={s} size={10} className={s <= r.rating ? "fill-amber-400 text-amber-400" : "text-slate-700"} />)}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{r.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Financial Section */}
      <Section title="Financial Summary">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="space-y-3">
            {[
              { label: "Gross Order Value", value: inr(105450), cls: "text-slate-200" },
              { label: "Platform Commission (6%)", value: `−${inr(6327)}`, cls: "text-red-400" },
              { label: "Taxes (GST)", value: `−${inr(3820)}`, cls: "text-red-400" },
              { label: "Refunds & Adjustments", value: `−${inr(920)}`, cls: "text-red-400" },
            ].map(({ label, value, cls }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-slate-800">
                <span className="text-sm text-slate-400">{label}</span>
                <span className={`font-mono font-bold text-sm ${cls}`}>{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <span className="text-base font-extrabold text-slate-100">Net Seller Settlement</span>
              <span className="font-mono font-extrabold text-xl text-emerald-400">{inr(94383)}</span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
