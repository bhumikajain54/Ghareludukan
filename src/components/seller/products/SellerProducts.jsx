import React, { useState } from "react";
import {
  Search, Plus, Filter, Edit3, Copy, Archive, RefreshCw,
  Package, MoreVertical, ChevronDown,
} from "lucide-react";
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES, inr } from "../SellerConstants";

const TABS = ["All Products", "Active", "Low Stock", "Out of Stock", "Archived"];

function StockBadge({ product }) {
  if (product.status === "ARCHIVED") return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-500 border border-slate-500/20">Archived</span>;
  if (product.stock === 0) return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">Out of Stock</span>;
  if (product.stock <= product.lowStockThreshold) return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">Low Stock</span>;
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">In Stock</span>;
}

function ProductRowMenu({ onEdit, onDuplicate, onArchive }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-slate-300 transition-colors">
        <MoreVertical size={14} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-20">
          {[
            { label: "Edit", icon: Edit3, action: onEdit },
            { label: "Duplicate", icon: Copy, action: onDuplicate },
            { label: "Archive", icon: Archive, action: onArchive },
          ].map(({ label, icon: Icon, action }) => (
            <button key={label} onClick={() => { action?.(); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SellerProducts({ onAddProduct, onEditProduct }) {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [activeTab, setActiveTab] = useState("All Products");
  const [searchQ, setSearchQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const getFiltered = () => {
    return products.filter((p) => {
      const matchSearch = !searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.sku.toLowerCase().includes(searchQ.toLowerCase());
      const matchCat = categoryFilter === "All" || p.category === categoryFilter;
      const matchTab =
        activeTab === "All Products" ? p.status !== "ARCHIVED" :
        activeTab === "Active" ? p.status === "ACTIVE" && p.stock > 0 :
        activeTab === "Low Stock" ? p.stock > 0 && p.stock <= p.lowStockThreshold :
        activeTab === "Out of Stock" ? p.stock === 0 :
        activeTab === "Archived" ? p.status === "ARCHIVED" : true;
      return matchSearch && matchCat && matchTab;
    });
  };

  const tabCount = (tab) => products.filter((p) => {
    if (tab === "All Products") return p.status !== "ARCHIVED";
    if (tab === "Active") return p.status === "ACTIVE" && p.stock > 0;
    if (tab === "Low Stock") return p.stock > 0 && p.stock <= p.lowStockThreshold;
    if (tab === "Out of Stock") return p.stock === 0;
    if (tab === "Archived") return p.status === "ARCHIVED";
    return false;
  }).length;

  const handleArchive = (id) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, status: "ARCHIVED" } : p));
  };

  const handleDuplicate = (id) => {
    const src = products.find((p) => p.id === id);
    if (!src) return;
    setProducts((prev) => [...prev, { ...src, id: `sp${Date.now()}`, name: `${src.name} (Copy)`, sku: `${src.sku}-COPY` }]);
  };

  const filtered = getFiltered();

  return (
    <div className="space-y-5 gd-rise">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Products</h1>
          <p className="text-sm text-slate-500 mt-0.5">{products.filter((p) => p.status !== "ARCHIVED").length} active products</p>
        </div>
        <button onClick={onAddProduct}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors shadow-lg shadow-indigo-900/30">
          <Plus size={15} /> Add Product
        </button>
      </div>

      {/* Filters Row */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Search products or SKU…"
            className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <div className="relative">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 pr-8 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
            <option value="All">All Categories</option>
            {PRODUCT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
                : "seller-tab-inactive bg-slate-800 border border-slate-700 text-slate-500 hover:text-slate-300"
            }`}>
            {tab}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab ? "bg-white/20 text-white" : "bg-slate-700 text-slate-400"}`}>
              {tabCount(tab)}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden ticket-table-container">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-600">
            <Package size={40} className="mx-auto mb-4 opacity-30" />
            <div className="text-sm font-bold">No products found</div>
            <div className="text-xs mt-1 mb-4">Try changing the filter or add a new product.</div>
            <button onClick={onAddProduct} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-colors">
              + Add Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 ticket-table-header">
                  {["Product", "Category", "Price", "Discount", "GST", "Stock", "Status", "Updated", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors group ticket-row-hover">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                          <Package size={16} className="text-slate-500" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-200 truncate">{product.name}</div>
                          <div className="text-[10px] text-slate-600 font-mono">{product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-400 whitespace-nowrap">{product.category}</td>
                    <td className="px-4 py-3.5 font-mono text-sm text-slate-300 whitespace-nowrap">{inr(product.price)}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-400 whitespace-nowrap">
                      {product.discount > 0 ? <span className="text-emerald-400 font-bold">−{inr(product.discount)}</span> : <span className="text-slate-600">—</span>}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-400 whitespace-nowrap">{product.gst}%</td>
                    <td className="px-4 py-3.5">
                      <span className={`font-mono text-sm font-bold ${product.stock === 0 ? "text-red-400" : product.stock <= product.lowStockThreshold ? "text-amber-400" : "text-slate-300"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3.5"><StockBadge product={product} /></td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{product.updatedAt}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEditProduct?.(product.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-indigo-400 transition-colors">
                          <Edit3 size={13} />
                        </button>
                        <ProductRowMenu
                          onEdit={() => onEditProduct?.(product.id)}
                          onDuplicate={() => handleDuplicate(product.id)}
                          onArchive={() => handleArchive(product.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
