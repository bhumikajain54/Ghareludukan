import React, { useState } from "react";
import { ShoppingBag, Search, Eye, Filter, ArrowRight } from "lucide-react";
import { MOCK_ORDERS } from "../../../data/mockData";

export default function AdminOrders({ orders = MOCK_ORDERS, onNav }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.shopName?.toLowerCase().includes(q) ||
        o.address?.recipient?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 gd-rise w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShoppingBag size={24} className="text-cyan-400" />
            <span>Platform-Wide Orders Ledger</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time live monitoring of hyperlocal orders across all registered merchants.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID, Shop Name, Customer..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:border-cyan-400 font-medium"
          />
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-black text-slate-300 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Shop</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">{order.id}</td>
                  <td className="py-3.5 px-4 text-slate-200 font-bold">{order.shopName || "Local Store"}</td>
                  <td className="py-3.5 px-4 text-slate-300">{order.address?.recipient || "Customer"}</td>
                  <td className="py-3.5 px-4 font-black text-cyan-400">₹{order.total}</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-800 border border-slate-700">
                      {order.payment || "UPI"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        order.status === "DELIVERED"
                          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          : order.status === "CANCELLED" || order.status === "REJECTED"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      }`}
                    >
                      {order.status}
                    </span>
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
