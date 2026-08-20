import React, { useState } from "react";
import { Users, Search, ArrowRight, ShoppingCart, IndianRupee, Clock } from "lucide-react";
import { MOCK_CUSTOMERS, inr } from "../SellerConstants";

function CustomerDetail({ customer, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl gd-rise">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="font-bold text-slate-100">Customer Details</div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-500">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-extrabold text-indigo-400">{customer.name[0]}</span>
            </div>
            <div>
              <div className="font-bold text-slate-100">{customer.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{customer.phone}</div>
              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 ${customer.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-500/15 text-slate-500"}`}>
                {customer.status}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Orders", value: customer.orders, icon: ShoppingCart },
              { label: "Total Spent", value: inr(customer.totalSpent), icon: IndianRupee },
              { label: "Avg Order Value", value: inr(customer.aov), icon: ArrowRight },
              { label: "Last Order", value: customer.lastOrder, icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{label}</div>
                <div className="text-sm font-bold text-slate-200 mt-1">{value}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Recent Purchases</div>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">Toor Dal 1kg · ₹148 · Today</div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">Basmati Rice 5kg · ₹490 · Yesterday</div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">Sunflower Oil 1L · ₹165 · 3 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SellerCustomers() {
  const [searchQ, setSearchQ] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = MOCK_CUSTOMERS.filter((c) =>
    !searchQ || c.name.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div className="space-y-5 gd-rise">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Customers</h1>
          <p className="text-sm text-slate-500 mt-0.5">{MOCK_CUSTOMERS.length} customers who ordered from your shop.</p>
        </div>
        <div className="relative max-w-xs flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Search customers…"
            className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden ticket-table-container">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 ticket-table-header">
                {["Customer", "Orders", "Total Spent", "Last Order", "Avg Order Value", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors cursor-pointer ticket-row-hover" onClick={() => setSelected(c)}>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-indigo-400">{c.name[0]}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-200">{c.name}</div>
                        <div className="text-[10px] text-slate-600">{c.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-sm text-slate-300">{c.orders}</td>
                  <td className="px-4 py-3.5 font-mono text-sm font-bold text-slate-200">{inr(c.totalSpent)}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-400">{c.lastOrder}</td>
                  <td className="px-4 py-3.5 font-mono text-sm text-slate-300">{inr(c.aov)}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-500/15 text-slate-500"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button onClick={(e) => { e.stopPropagation(); setSelected(c); }} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((c) => (
          <button key={c.id} onClick={() => setSelected(c)} className="w-full text-left bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center">
                <span className="text-sm font-bold text-indigo-400">{c.name[0]}</span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-200">{c.name}</div>
                <div className="text-xs text-slate-500">{c.phone}</div>
              </div>
              <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-500/15 text-slate-500"}`}>
                {c.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[["Orders", c.orders], ["Spent", inr(c.totalSpent)], ["AOV", inr(c.aov)]].map(([l, v]) => (
                <div key={l} className="p-2 rounded-xl bg-slate-800/60">
                  <div className="text-[10px] text-slate-600">{l}</div>
                  <div className="text-xs font-bold text-slate-300 font-mono">{v}</div>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl text-slate-600">
          <Users size={40} className="mx-auto mb-4 opacity-30" />
          <div className="text-sm font-bold">No customers found</div>
        </div>
      )}

      {selected && <CustomerDetail customer={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
