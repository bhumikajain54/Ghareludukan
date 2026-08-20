import React, { useState } from "react";
import {
  Package, AlertTriangle, Warehouse, CheckCircle2,
  Plus, Minus, RefreshCw, Search, X, History,
} from "lucide-react";
import { MOCK_PRODUCTS, MOCK_STOCK_HISTORY, inr } from "../SellerConstants";

function StockBadge({ product }) {
  if (product.stock === 0) return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">Out of Stock</span>;
  if (product.stock <= product.lowStockThreshold) return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">Low Stock</span>;
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">In Stock</span>;
}

function StockDrawer({ product, onClose, onAdjust }) {
  const [change, setChange] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("add"); // add | remove | set
  const history = MOCK_STOCK_HISTORY[product.id] || [];

  const REASONS = ["Restock", "Sold Manually", "Damaged / Expired", "Return", "Correction", "Other"];

  const handleConfirm = () => {
    if (!change || !reason) return;
    const delta = type === "add" ? +parseInt(change)
      : type === "remove" ? -parseInt(change)
      : parseInt(change) - product.stock;
    onAdjust(product.id, delta, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl gd-rise">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div>
            <div className="font-bold text-slate-100">{product.name}</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">{product.sku}</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Current Stock */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <div className="text-sm text-slate-400">Current Stock</div>
            <div className="flex items-center gap-3">
              <span className={`font-mono text-3xl font-extrabold ${product.stock === 0 ? "text-red-400" : product.stock <= product.lowStockThreshold ? "text-amber-400" : "text-emerald-400"}`}>
                {product.stock}
              </span>
              <StockBadge product={product} />
            </div>
          </div>

          {/* Adjustment Type */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Adjustment Type</div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "add", label: "Add Stock", icon: Plus, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                { id: "remove", label: "Remove Stock", icon: Minus, color: "text-red-400 bg-red-500/10 border-red-500/20" },
                { id: "set", label: "Set Exact", icon: RefreshCw, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
              ].map(({ id, label, icon: Icon, color }) => (
                <button key={id} onClick={() => setType(id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all ${
                    type === id ? color : "bg-slate-800 border-slate-700 text-slate-500"
                  }`}>
                  <Icon size={16} />
                  <span className="text-center leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {type === "set" ? "New Stock Quantity" : "Quantity"}
            </div>
            <input
              type="number"
              min="0"
              value={change}
              onChange={(e) => setChange(e.target.value)}
              placeholder={type === "set" ? `Current: ${product.stock}` : "0"}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-lg font-mono font-bold text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {change && type !== "set" && (
              <div className="mt-2 text-xs text-slate-500">
                New stock: <span className="font-bold text-slate-300 font-mono">
                  {Math.max(0, product.stock + (type === "add" ? +parseInt(change) : -parseInt(change)))}
                </span>
              </div>
            )}
          </div>

          {/* Reason */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Reason <span className="text-red-400">*</span></div>
            <div className="grid grid-cols-2 gap-2">
              {REASONS.map((r) => (
                <button key={r} onClick={() => setReason(r)}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold text-left transition-all ${
                    reason === r ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300" : "bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600"
                  }`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Stock History */}
          {history.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <History size={12} /> Stock History
              </div>
              <div className="space-y-2">
                {history.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs">
                    <div className={`font-mono font-bold ${h.change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {h.change > 0 ? "+" : ""}{h.change}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-slate-400 font-semibold">{h.reason}</div>
                      <div className="text-slate-600 truncate">{h.by} · {h.date}</div>
                    </div>
                    <div className="font-mono text-slate-400 flex-shrink-0">{h.prev}→{h.next}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <div className="p-5 border-t border-slate-800">
          <button
            onClick={handleConfirm}
            disabled={!change || !reason}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm disabled:opacity-40 transition-colors"
          >
            Confirm Stock Adjustment
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SellerInventory() {
  const [products, setProducts] = useState(MOCK_PRODUCTS.filter((p) => p.status !== "ARCHIVED"));
  const [searchQ, setSearchQ] = useState("");
  const [drawerProduct, setDrawerProduct] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(null), 2000); };

  const handleAdjust = (id, delta, reason) => {
    setProducts((prev) => prev.map((p) =>
      p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
    ));
    showToast("Stock updated successfully");
  };

  const filtered = products.filter((p) =>
    !searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.sku.toLowerCase().includes(searchQ.toLowerCase())
  );

  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.stock > p.lowStockThreshold).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  return (
    <div className="space-y-5 gd-rise">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Inventory</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage stock levels across all your products.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-colors">
            <RefreshCw size={14} /> Bulk Import
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Products", value: totalProducts, icon: Package, color: "text-indigo-400 bg-indigo-500/10" },
          { label: "In Stock", value: inStockCount, icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10" },
          { label: "Low Stock", value: lowStockCount, icon: AlertTriangle, color: "text-amber-400 bg-amber-500/10" },
          { label: "Out of Stock", value: outOfStockCount, icon: X, color: "text-red-400 bg-red-500/10" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <div className="font-mono text-xl font-extrabold text-slate-100">{value}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Search product or SKU…"
          className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden ticket-table-container">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 ticket-table-header">
                {["Product", "SKU", "Available Stock", "Reserved", "Low Stock Limit", "Status", "Last Updated", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors ticket-row-hover">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                        <Package size={14} className="text-slate-500" />
                      </div>
                      <div className="text-sm font-semibold text-slate-200 truncate max-w-[160px]">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500">{product.sku}</td>
                  <td className="px-4 py-3.5">
                    <span className={`font-mono text-sm font-bold ${product.stock === 0 ? "text-red-400" : product.stock <= product.lowStockThreshold ? "text-amber-400" : "text-emerald-400"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-sm text-slate-500">0</td>
                  <td className="px-4 py-3.5 font-mono text-sm text-slate-500">{product.lowStockThreshold}</td>
                  <td className="px-4 py-3.5"><StockBadge product={product} /></td>
                  <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{product.updatedAt}</td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => setDrawerProduct(product)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 text-xs font-bold hover:bg-indigo-600/25 transition-colors"
                    >
                      <RefreshCw size={12} /> Adjust
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {drawerProduct && (
        <StockDrawer
          product={drawerProduct}
          onClose={() => setDrawerProduct(null)}
          onAdjust={handleAdjust}
        />
      )}

      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl gd-rise">
          <CheckCircle2 size={16} className="text-emerald-400" />
          {toastMsg}
        </div>
      )}
    </div>
  );
}
