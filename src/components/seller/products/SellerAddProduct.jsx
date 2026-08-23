import React, { useState } from "react";
import { ArrowLeft, Upload, Plus, Minus, CheckCircle2, AlertCircle, Image as ImageIcon, Link2 } from "lucide-react";
import { PRODUCT_CATEGORIES, SUBCATEGORIES_MAP, inr } from "../SellerConstants";
import ProductImage from "../../common/ProductImage";

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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest pb-1 border-b border-slate-800">{title}</div>
      {children}
    </div>
  );
}

export default function SellerAddProduct({ onBack, editProduct = null }) {
  const isEdit = !!editProduct;

  const [form, setForm] = useState({
    name: editProduct?.name || "",
    brand: editProduct?.brand || "",
    description: editProduct?.description || "",
    category: editProduct?.category || "",
    subcategory: editProduct?.subcategory || "",
    unit: editProduct?.unit || "1 pc",
    image: editProduct?.image || "",
    price: editProduct?.price || "",
    discount: editProduct?.discount || "",
    gst: editProduct?.gst || "0",
    stock: editProduct?.stock || "",
    lowStockThreshold: editProduct?.lowStockThreshold || "10",
    sku: editProduct?.sku || `SKU-${Date.now().toString().slice(-4)}`,
    barcode: "",
    status: editProduct?.status || "ACTIVE",
    variants: [],
  });

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const availableSubcategories = form.category && SUBCATEGORIES_MAP[form.category]
    ? SUBCATEGORIES_MAP[form.category].filter((s) => s !== "All")
    : [];

  const finalPrice = () => {
    const p = parseFloat(form.price) || 0;
    const d = parseFloat(form.discount) || 0;
    const g = parseFloat(form.gst) || 0;
    const base = Math.max(0, p - d);
    return base + Math.round((base * g) / 100);
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
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onBack?.();
    }, 1500);
  };

  const handleSaveDraft = () => {
    setErrors({});
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const set = (field) => (val) => setForm((f) => ({ ...f, [field]: val }));

  return (
    <div className="space-y-5 gd-rise w-full pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">{isEdit ? "Edit Product" : "Add New Product"}</h1>
          <p className="text-sm text-slate-500 mt-0.5">List products across all marketplace categories with exact product image.</p>
        </div>
      </div>

      {/* Image Section */}
      <Section title="Product Image & Preview">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-32 h-32 rounded-2xl bg-slate-950 border-2 border-slate-700 overflow-hidden flex items-center justify-center flex-shrink-0 relative shadow-inner">
            {form.image ? (
              <ProductImage
                src={form.image}
                alt={form.name || "Product preview"}
                category={form.category}
                subcategory={form.subcategory}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-3 text-center text-slate-600">
                <ImageIcon size={28} className="mb-1" />
                <span className="text-[10px] font-bold">No Image</span>
              </div>
            )}
          </div>

          <div className="flex-1 w-full space-y-3">
            <Field label="Product Image URL" hint="Provide a valid direct image URL (e.g. Unsplash, CDN, or uploaded image)">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Link2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => set("image")(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                {form.image && (
                  <button
                    onClick={() => set("image")("")}
                    className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-xs font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </Field>
            <div className="text-[11px] text-slate-500">
              ⚡ Supported: JPG, PNG, WEBP. The image will be tied directly to this product's stable ID.
            </div>
          </div>
        </div>
      </Section>

      {/* Product Info */}
      <Section title="Product Information">
        <Field label="Product Name" required>
          <Input value={form.name} onChange={set("name")} placeholder="e.g. Toor Dal 1kg or Wireless Optical Mouse" />
          {errors.name && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Brand / Manufacturer" hint="e.g. Tata Sampann, Logitech, Prestige, Puma">
            <Input value={form.brand} onChange={set("brand")} placeholder="e.g. Tata Sampann" />
          </Field>
          <Field label="Packaging Unit" hint="e.g. 1 kg, 500 ml, 1 pc, Pack of 3">
            <Input value={form.unit} onChange={set("unit")} placeholder="e.g. 1 kg" />
          </Field>
        </div>

        <Field label="Description" hint="Detailed description of the product, key features, and warranty if applicable.">
          <Textarea value={form.description} onChange={set("description")} placeholder="Describe the quality, authenticity, specifications, etc." />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Category" required>
            <select
              value={form.category}
              onChange={(e) => {
                set("category")(e.target.value);
                set("subcategory")("");
              }}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="">Select Marketplace Category</option>
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.category}</p>}
          </Field>

          <Field label="Subcategory" hint="Select or type a subcategory">
            {availableSubcategories.length > 0 ? (
              <select
                value={form.subcategory}
                onChange={(e) => set("subcategory")(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="">Select Subcategory</option>
                {availableSubcategories.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            ) : (
              <Input value={form.subcategory} onChange={set("subcategory")} placeholder="e.g. Pulses, Keyboards, Sarees" />
            )}
          </Field>
        </div>
      </Section>

      {/* Pricing */}
      <Section title="Pricing & Taxes">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label="Selling Price (₹)" required>
            <Input value={form.price} onChange={set("price")} type="number" min="0" placeholder="0.00" />
            {errors.price && <p className="text-xs text-red-400 mt-1">{errors.price}</p>}
          </Field>
          <Field label="Discount (₹)" hint="Per unit deduction">
            <Input value={form.discount} onChange={set("discount")} type="number" min="0" placeholder="0.00" />
            {errors.discount && <p className="text-xs text-red-400 mt-1">{errors.discount}</p>}
          </Field>
          <Field label="GST (%)">
            <select
              value={form.gst}
              onChange={(e) => set("gst")(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {["0", "5", "12", "18", "28"].map((g) => (
                <option key={g} value={g}>{g}%</option>
              ))}
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
      <Section title="Inventory & Stock">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Current Stock" required>
            <Input value={form.stock} onChange={set("stock")} type="number" min="0" placeholder="0" />
            {errors.stock && <p className="text-xs text-red-400 mt-1">{errors.stock}</p>}
          </Field>
          <Field label="Low Stock Threshold" hint="Alert when inventory drops below this">
            <Input value={form.lowStockThreshold} onChange={set("lowStockThreshold")} type="number" min="0" placeholder="10" />
          </Field>
          <Field label="SKU Code" hint="Unique internal identifier">
            <Input value={form.sku} onChange={set("sku")} placeholder="e.g. SKU-ELEC-101" />
          </Field>
        </div>
      </Section>

      {/* Publish Toggle */}
      <Section title="Product Status">
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 border border-slate-700">
          <div>
            <div className="text-sm font-bold text-slate-200">Publish Product</div>
            <div className="text-xs text-slate-500 mt-0.5">
              {form.status === "ACTIVE" ? "Visible to customers immediately in your store catalog." : "Hidden from customers. Saved as draft."}
            </div>
          </div>
          <button
            onClick={() => set("status")(form.status === "ACTIVE" ? "DRAFT" : "ACTIVE")}
            className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 cursor-pointer ${
              form.status === "ACTIVE" ? "bg-indigo-600" : "bg-slate-700"
            }`}
          >
            <span
              className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                form.status === "ACTIVE" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </Section>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSaveDraft}
          className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm font-bold hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Save Draft
        </button>
        <button
          onClick={handlePublish}
          className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors shadow-lg shadow-indigo-900/30 cursor-pointer"
        >
          {isEdit ? "Update Product" : "Publish to Marketplace"}
        </button>
      </div>

      {/* Success Toast */}
      {saved && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl gd-rise">
          <CheckCircle2 size={16} className="text-emerald-400" />
          Product saved successfully!
        </div>
      )}
    </div>
  );
}
