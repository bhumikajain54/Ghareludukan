import React, { useState } from "react";
import {
  TrendingUp, ShoppingCart, Clock, AlertTriangle,
  IndianRupee, Wallet, Plus, Eye, RefreshCw, Tag, ArrowRight,
  Check, X, Package, PackageCheck,
} from "lucide-react";
import {
  MOCK_ORDERS, ORDER_STATUS_COLOR, ORDER_STATUS_LABEL,
  ANALYTICS_WEEKLY, TOP_PRODUCTS, inr,
} from "../SellerConstants";

// ─── KPI Card ────────────────────────────────
function KpiCard({ label, value, sub, icon: Icon, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 w-full"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        <ArrowRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors mt-1" />
      </div>
      <div className="font-mono text-2xl font-extrabold text-slate-100 mb-0.5">{value}</div>
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</div>
      {sub && <div className="text-[11px] text-slate-600 mt-1">{sub}</div>}
    </button>
  );
}

// ─── Revenue SVG Chart ───────────────────────
function RevenueChart({ data }) {
  const maxRev = Math.max(...data.map((d) => d.revenue));
  const W = 580, H = 120, pad = 40;
  const xStep = (W - pad * 2) / (data.length - 1);
  const points = data.map((d, i) => ({
    x: pad + i * xStep,
    y: H - pad / 2 - ((d.revenue / maxRev) * (H - pad)),
    ...d,
  }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `M${points[0].x},${H - pad / 2} ` +
    points.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${points[points.length - 1].x},${H - pad / 2} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#chartGrad)" />
      <polyline points={polyline} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#6366f1" stroke="#1e1b4b" strokeWidth="2" />
          <text x={p.x} y={H - 4} textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="IBM Plex Mono, monospace">
            {p.day}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── Order Card (Dashboard) ───────────────────
function DashOrderCard({ order, onAction, onView }) {
  const statusCls = ORDER_STATUS_COLOR[order.status] || "bg-slate-500/15 text-slate-400";
  const isPaid = order.paymentStatus === "PAID";

  return (
    <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-mono text-xs font-bold text-indigo-400">#{order.id}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusCls}`}>
            {ORDER_STATUS_LABEL[order.status]}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPaid ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
            {order.paymentStatus}
          </span>
        </div>
        <div className="text-sm font-semibold text-slate-200 truncate">{order.customer}</div>
        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
          <span>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
          <span className="font-mono font-bold text-slate-300">{inr(order.total)}</span>
          <span>{order.time}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {(order.status === "NEW" || order.status === "PLACED") && (
          <>
            <button
              onClick={() => onAction(order.id, "ACCEPTED")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Check size={13} /> Accept
            </button>
            <button
              onClick={() => onAction(order.id, "REJECT_PROMPT")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-red-500/50 hover:text-red-400 text-slate-400 text-xs font-bold transition-colors"
            >
              <X size={13} /> Reject
            </button>
          </>
        )}
        {order.status === "ACCEPTED" && (
          <button onClick={() => onAction(order.id, "PREPARING")} className="px-3 py-2 rounded-xl bg-amber-600/20 border border-amber-500/40 text-amber-400 text-xs font-bold hover:bg-amber-600/30 transition-colors">
            Start Preparing
          </button>
        )}
        {order.status === "PREPARING" && (
          <button onClick={() => onAction(order.id, "PACKED")} className="px-3 py-2 rounded-xl bg-violet-600/20 border border-violet-500/40 text-violet-400 text-xs font-bold hover:bg-violet-600/30 transition-colors">
            Mark Packed
          </button>
        )}
        {order.status === "PACKED" && (
          <button onClick={() => onAction(order.id, "READY")} className="px-3 py-2 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 text-xs font-bold hover:bg-cyan-600/30 transition-colors">
            Mark Ready
          </button>
        )}
        <button onClick={() => onView(order.id)} className="p-2 rounded-xl hover:bg-slate-700 text-slate-500 hover:text-slate-300 transition-colors">
          <Eye size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Reject Modal ────────────────────────────
const REJECT_REASONS = ["Out of Stock", "Shop Closed", "Delivery Not Available", "Incorrect Order", "Other"];

function RejectModal({ onConfirm, onClose }) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl gd-rise">
        <div className="text-base font-bold text-slate-100 mb-1">Reject this order?</div>
        <div className="text-xs text-slate-500 mb-4">Please select a reason before rejecting.</div>
        <div className="space-y-2 mb-5">
          {REJECT_REASONS.map((r) => (
            <button
              key={r}
              onClick={() => setReason(r)}
              className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                reason === r
                  ? "bg-red-500/15 border-red-500/40 text-red-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => reason && onConfirm(reason)}
            disabled={!reason}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold disabled:opacity-40 hover:bg-red-500 transition-colors"
          >
            Reject Order
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────
export default function SellerDashboard({ orders = [], onUpdateOrderStatus, onNav, onOpenOrder }) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [chartPeriod, setChartPeriod] = useState("7 Days");
  const [rejectTarget, setRejectTarget] = useState(null);

  const todayOrders = orders.filter((o) => o.date === "Today");
  const pendingCount = orders.filter((o) => ["NEW", "PLACED", "ACCEPTED", "PREPARING"].includes(o.status)).length;
  const todayRevenue = todayOrders.filter((o) => o.paymentStatus === "PAID").reduce((s, o) => s + o.total, 0);
  const lowStock = 12; // From inventory mock

  const TABS = ["ALL", "NEW", "ACCEPTED", "PREPARING", "PACKED", "READY", "DELIVERED", "REJECTED", "CANCELLED"];

  const filteredOrders = activeTab === "ALL"
    ? orders.filter((o) => o.date === "Today")
    : orders.filter((o) => (activeTab === "NEW" ? o.status === "NEW" || o.status === "PLACED" : o.status === activeTab));

  const handleAction = (orderId, nextStatus) => {
    if (nextStatus === "REJECT_PROMPT") {
      setRejectTarget(orderId);
      return;
    }
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, nextStatus);
    }
  };

  const handleReject = (reason) => {
    if (!rejectTarget) return;
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(rejectTarget, "REJECTED", { rejectReason: reason });
    }
    setRejectTarget(null);
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="space-y-6 gd-rise">
      {/* Greeting */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">{greeting}, Raj Traders 👋</h1>
          <p className="text-sm text-slate-500 mt-1">Here's what's happening with your shop today.</p>
        </div>
        <button onClick={() => onNav("orders")} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors shadow-lg shadow-indigo-900/30">
          <ShoppingCart size={15} />
          View Orders
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard
          label="Today's Orders" value="24" sub="↑ 4 from yesterday"
          icon={ShoppingCart} color="bg-indigo-500/15 text-indigo-400"
          onClick={() => onNav("orders")}
        />
        <KpiCard
          label="Today's Revenue" value={inr(18450)} sub="Net ₹17,200"
          icon={TrendingUp} color="bg-emerald-500/15 text-emerald-400"
          onClick={() => onNav("analytics")}
        />
        <KpiCard
          label="Pending Orders" value={pendingCount} sub="Needs attention"
          icon={Clock} color="bg-amber-500/15 text-amber-400"
          onClick={() => onNav("orders")}
        />
        <KpiCard
          label="Low Stock" value={`${lowStock} Products`} sub="Restock needed"
          icon={AlertTriangle} color="bg-red-500/15 text-red-400"
          onClick={() => onNav("inventory")}
        />
        <KpiCard
          label="Avg Order Value" value={inr(769)} sub="This week"
          icon={IndianRupee} color="bg-cyan-500/15 text-cyan-400"
          onClick={() => onNav("analytics")}
        />
        <KpiCard
          label="Settlement Due" value={inr(24800)} sub="Processing"
          icon={Wallet} color="bg-violet-500/15 text-violet-400"
          onClick={() => onNav("settlements")}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Quick Actions</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {[
            { label: "Add Product", icon: Plus, id: "add-product", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
            { label: "View Orders", icon: ShoppingCart, id: "orders", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
            { label: "Update Inventory", icon: RefreshCw, id: "inventory", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
            { label: "Create Offer", icon: Tag, id: "offers", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
            { label: "View Settlement", icon: Wallet, id: "settlements", color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
          ].map(({ label, icon: Icon, id, color }) => (
            <button
              key={id}
              onClick={() => onNav(id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-bold transition-all hover:scale-[1.02] ${color}`}
            >
              <Icon size={16} />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders + Chart – two column on large */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Orders Today */}
        <div className="xl:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <div className="font-bold text-slate-100">Orders Today</div>
            <button onClick={() => onNav("orders")} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
              View All <ArrowRight size={12} />
            </button>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 px-4 py-3 overflow-x-auto scrollbar-none">
            {TABS.slice(0, 7).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  activeTab === t
                    ? "bg-indigo-600 text-white"
                    : "seller-tab-inactive bg-slate-800 text-slate-500 hover:text-slate-300"
                }`}
              >
                {t === "ALL" ? "All" : ORDER_STATUS_LABEL[t]}
              </button>
            ))}
          </div>
          <div className="px-4 pb-4 space-y-3 max-h-[420px] overflow-y-auto scrollbar-none">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-10 text-slate-600">
                <ShoppingCart size={32} className="mx-auto mb-3 opacity-40" />
                <div className="text-sm font-semibold">No orders here</div>
                <div className="text-xs mt-1">Orders will appear as they come in.</div>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <DashOrderCard
                  key={order.id}
                  order={order}
                  onAction={handleAction}
                  onView={(id) => onOpenOrder(id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Analytics Panel */}
        <div className="xl:col-span-2 space-y-4">
          {/* Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="font-bold text-slate-100 text-sm">Sales Overview</div>
              <div className="flex gap-1">
                {["7 Days", "30 Days"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                      chartPeriod === p ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-2xl font-extrabold font-mono text-slate-100 mb-1">{inr(105450)}</div>
            <div className="text-xs text-slate-500 mb-3">Total revenue this week</div>
            <RevenueChart data={ANALYTICS_WEEKLY} />
          </div>

          {/* Top Products */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="font-bold text-slate-100 text-sm">Top Products</div>
              <button onClick={() => onNav("analytics")} className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-0.5">
                Full Report <ArrowRight size={10} />
              </button>
            </div>
            <div className="space-y-2.5">
              {TOP_PRODUCTS.slice(0, 4).map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold text-slate-600 w-4 text-right">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-300 truncate">{p.name}</div>
                    <div className="text-[10px] text-slate-600">{p.unitsSold} sold</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300">{inr(p.revenue)}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    p.stock <= 5 ? "bg-red-500/15 text-red-400" : p.stock <= 15 ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"
                  }`}>
                    {p.stock}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {rejectTarget && (
        <RejectModal onConfirm={handleReject} onClose={() => setRejectTarget(null)} />
      )}
    </div>
  );
}
