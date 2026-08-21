import React, { useState } from "react";
import { ArrowLeft, Upload, Plus, Minus, CheckCircle2, AlertCircle } from "lucide-react";
import { PRODUCT_CATEGORIES, inr } from "../SellerConstants";

function Field({ label, hint, children, required }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-slate-600">{hint}</p>}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text", min, className = "" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      min={min}
      className={`w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors ${className}`}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
    />
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest pb-1 border-b border-slate-800">{title}</div>
      {children}
    </div>
  );
}

export default function SellerAddProduct({ onBack, editProduct = null }) {
  const isEdit = !!editProduct;

  const [form, setForm] = useState({
    name: editProduct?.name || "",
    description: editProduct?.description || "",
    category: editProduct?.category || "",
    subcategory: editProduct?.subcategory || "",
    price: editProduct?.price || "",
    discount: editProduct?.discount || "",
    gst: editProduct?.gst || "0",
    stock: editProduct?.stock || "",
    lowStockThreshold: editProduct?.lowStockThreshold || "10",
    sku: editProduct?.sku || "",
    barcode: "",
    status: editProduct?.status || "ACTIVE",
    // Variants
    variants: [],
  });

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const finalPrice = () => {
    const p = parseFloat(form.price) || 0;
    const d = parseFloat(form.discount) || 0;
    const g = parseFloat(form.gst) || 0;
    const base = Math.max(0, p - d);
    return base + Math.round(base * g / 100);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required.";
    if (!form.category) e.category = "Category is required.";
    if (!form.price || parseFloat(form.price) < 0) e.price = "Price must be a positive number.";
    if (form.discount && parseFloat(form.discount) < 0) e.discount = "Discount cannot be negative.";
    if (!form.stock || parseFloat(form.stock) < 0) e.stock = "Stock cannot be negative.";
    return e;
  };

  const handlePublish = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSaved(true);
    setTimeout(() => { setSaved(false); onBack?.(); }, 1500);
  };

  const handleSaveDraft = () => {
    setErrors({});
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const set = (field) => (val) => setForm((f) => ({ ...f, [field]: val }));

  return (
    <div className="space-y-5 gd-rise w-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">{isEdit ? "Edit Product" : "Add New Product"}</h1>
          <p className="text-sm text-slate-500 mt-0.5">Fill in the details below to {isEdit ? "update your" : "list a new"} product.</p>
        </div>
      </div>

      {/* Image Upload */}
      <Section title="Product Image">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-2xl bg-slate-800 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-600 cursor-pointer hover:border-indigo-500 hover:text-indigo-400 transition-colors group">
            <Upload size={22} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold mt-1">Upload</span>
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            <div className="font-semibold text-slate-500 mb-1">Upload product image</div>
            Supported: JPG, PNG, WEBP<br />Max size: 2MB<br />Recommended: 800×800px
          </div>
        </div>
      </Section>

      {/* Product Info */}
      <Section title="Product Information">
        <Field label="Product Name" required>
          <Input value={form.name} onChange={set("name")} placeholder="e.g. Toor Dal 1kg" />
          {errors.name && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
        </Field>
        <Field label="Description" hint="Brief description of the product for customer display.">
          <Textarea value={form.description} onChange={set("description")} placeholder="Describe the product, brand, quality, etc." />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category" required>
            <select value={form.category} onChange={(e) => set("category")(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
              <option value="">Select category</option>
              {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.category}</p>}
          </Field>
          <Field label="Subcategory" hint="Optional">
            <Input value={form.subcategory} onChange={set("subcategory")} placeholder="e.g. Pulses" />
          </Field>
        </div>
      </Section>

      {/* Pricing */}
      <Section title="Pricing">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label="Selling Price (₹)" required>
            <Input value={form.price} onChange={set("price")} type="number" min="0" placeholder="0.00" />
            {errors.price && <p className="text-xs text-red-400 mt-1">{errors.price}</p>}
          </Field>
          <Field label="Discount (₹)" hint="Per unit">
            <Input value={form.discount} onChange={set("discount")} type="number" min="0" placeholder="0.00" />
            {errors.discount && <p className="text-xs text-red-400 mt-1">{errors.discount}</p>}
          </Field>
          <Field label="GST (%)">
            <select value={form.gst} onChange={(e) => set("gst")(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors">
              {["0","5","12","18","28"].map((g) => <option key={g} value={g}>{g}%</option>)}
            </select>
          </Field>
          <Field label="Final Price (₹)">
            <div className="px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm font-mono font-bold text-emerald-400">
              {inr(finalPrice())}
            </div>
          </Field>
        </div>
      </Section>

      {/* Inventory */}
      <Section title="Inventory">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Current Stock" required>
            <Input value={form.stock} onChange={set("stock")} type="number" min="0" placeholder="0" />
            {errors.stock && <p className="text-xs text-red-400 mt-1">{errors.stock}</p>}
          </Field>
          <Field label="Low Stock Threshold" hint="Alert when stock drops below this">
            <Input value={form.lowStockThreshold} onChange={set("lowStockThreshold")} type="number" min="0" placeholder="10" />
          </Field>
          <Field label="SKU / Product Code" hint="Your internal reference">
            <Input value={form.sku} onChange={set("sku")} placeholder="e.g. SKU-001" />
          </Field>
        </div>
        <Field label="Barcode (Optional)" hint="Scan or type product barcode">
          <Input value={form.barcode} onChange={set("barcode")} placeholder="Enter or scan barcode" />
        </Field>
      </Section>

      {/* Variants */}
      <Section title="Variants (Optional)">
        <div className="text-xs text-slate-500 mb-3">Add size, weight, color or pack variations if applicable.</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Size", placeholder: "e.g. 500g, 1kg" },
            { label: "Weight", placeholder: "e.g. 200g" },
            { label: "Color", placeholder: "e.g. Red" },
            { label: "Pack Size", placeholder: "e.g. Pack of 6" },
          ].map(({ label, placeholder }) => (
            <div key={label} className="space-y-1">
              <div className="text-[10px] font-bold text-slate-500">{label}</div>
              <input placeholder={placeholder} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
            </div>
          ))}
        </div>
      </Section>

      {/* Publish Toggle */}
      <Section title="Product Status">
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700">
          <div>
            <div className="text-sm font-bold text-slate-200">Publish Product</div>
            <div className="text-xs text-slate-500 mt-0.5">
              {form.status === "ACTIVE" ? "Visible to customers in your store." : "Hidden from customers. Save as draft."}
            </div>
          </div>
          <button
            onClick={() => set("status")(form.status === "ACTIVE" ? "DRAFT" : "ACTIVE")}
            className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ${form.status === "ACTIVE" ? "bg-indigo-600" : "bg-slate-700"}`}
          >
            <span className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${form.status === "ACTIVE" ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      </Section>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2 pb-20 lg:pb-4">
        <button onClick={handleSaveDraft} className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm font-bold hover:bg-slate-800 transition-colors">
          Save Draft
        </button>
        <button onClick={handlePublish} className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors shadow-lg shadow-indigo-900/30">
          {isEdit ? "Update Product" : "Publish Product"}
        </button>
      </div>

      {/* Success Toast */}
      {saved && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl gd-rise">
          <CheckCircle2 size={16} className="text-emerald-400" />
          Product saved successfully
        </div>
      )}
    </div>
  );
}
