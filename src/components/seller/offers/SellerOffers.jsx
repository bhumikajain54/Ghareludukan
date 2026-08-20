import React, { useState } from "react";
import {
  Plus, Tag, CheckCircle2, Clock, Archive, Users,
  X, Calendar, IndianRupee, Percent,
} from "lucide-react";
import { MOCK_OFFERS, PRODUCT_CATEGORIES, inr } from "../SellerConstants";

function OfferStatusBadge({ status }) {
  const map = {
    ACTIVE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    SCHEDULED: "bg-sky-500/15 text-sky-400 border-sky-500/20",
    EXPIRED: "bg-slate-500/15 text-slate-500 border-slate-500/20",
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${map[status] || ""}`}>{status}</span>;
}

function OfferCard({ offer, onToggle }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
            <Tag size={18} className="text-indigo-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100">{offer.name}</div>
            <div className="text-xs text-slate-500 mt-0.5">
              {offer.type === "PERCENTAGE" ? `${offer.value}% OFF` : `${inr(offer.value)} OFF`}
              {" · "}Min order {inr(offer.minOrder)}
            </div>
          </div>
        </div>
        <OfferStatusBadge status={offer.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Valid Until", value: offer.endDate, icon: Calendar },
          { label: "Max Discount", value: inr(offer.maxDiscount), icon: IndianRupee },
          { label: "Uses", value: `${offer.uses} / ${offer.usageLimit}`, icon: Users },
          { label: "Eligibility", value: offer.eligibility, icon: CheckCircle2 },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-start gap-2">
            <Icon size={12} className="text-slate-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-600 font-semibold uppercase tracking-wide">{label}</div>
              <div className="text-xs text-slate-300 font-medium">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[10px] text-slate-600 mb-1.5">
          <span>Usage</span>
          <span>{Math.round((offer.uses / offer.usageLimit) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all"
            style={{ width: `${Math.min(100, (offer.uses / offer.usageLimit) * 100)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex-1 py-2 rounded-xl border border-slate-700 text-slate-400 text-xs font-semibold hover:bg-slate-800 transition-colors">
          Edit
        </button>
        {offer.status !== "EXPIRED" && (
          <button
            onClick={() => onToggle(offer.id)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
              offer.status === "ACTIVE"
                ? "bg-slate-800 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/30"
                : "bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/25"
            }`}
          >
            {offer.status === "ACTIVE" ? "Pause" : "Activate"}
          </button>
        )}
      </div>
    </div>
  );
}

function CreateOfferModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "", type: "PERCENTAGE", value: "", minOrder: "",
    maxDiscount: "", startDate: "", endDate: "", usageLimit: "", eligibility: "All Customers",
  });

  const set = (f) => (v) => setForm((p) => ({ ...p, [f]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl gd-rise max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="font-bold text-slate-100">Create New Offer</div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-500"><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Offer Name *</label>
            <input value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="e.g. Weekend Flash Sale"
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Discount Type</label>
              <div className="flex gap-2">
                {[["PERCENTAGE", "%", Percent], ["FIXED", "₹", IndianRupee]].map(([t, sym, Icon]) => (
                  <button key={t} onClick={() => set("type")(t)}
                    className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border text-xs font-bold transition-all ${
                      form.type === t ? "bg-indigo-600 border-indigo-600 text-white" : "bg-slate-800 border-slate-700 text-slate-400"
                    }`}>
                    <Icon size={12} /> {sym}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Discount Value {form.type === "PERCENTAGE" ? "(%)" : "(₹)"}
              </label>
              <input type="number" min="0" value={form.value} onChange={(e) => set("value")(e.target.value)}
                placeholder={form.type === "PERCENTAGE" ? "e.g. 20" : "e.g. 50"}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Min Order (₹)", field: "minOrder", placeholder: "e.g. 200" },
              { label: "Max Discount (₹)", field: "maxDiscount", placeholder: "e.g. 100" },
              { label: "Usage Limit", field: "usageLimit", placeholder: "e.g. 500" },
              { label: "Eligibility", field: "eligibility", type: "select" },
            ].map(({ label, field, placeholder, type: ftype }) => (
              <div key={field} className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
                {ftype === "select" ? (
                  <select value={form[field]} onChange={(e) => set(field)(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors">
                    <option>All Customers</option>
                    <option>New Customers</option>
                    <option>Returning Customers</option>
                  </select>
                ) : (
                  <input type="number" min="0" value={form[field]} onChange={(e) => set(field)(e.target.value)} placeholder={placeholder}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[["startDate", "Start Date"], ["endDate", "End Date"]].map(([field, label]) => (
              <div key={field} className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
                <input type="date" value={form[field]} onChange={(e) => set(field)(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-slate-800 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-colors">Cancel</button>
          <button onClick={() => onSave(form)} className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors">Create Offer</button>
        </div>
      </div>
    </div>
  );
}

export default function SellerOffers() {
  const [offers, setOffers] = useState(MOCK_OFFERS);
  const [showCreate, setShowCreate] = useState(false);

  const active = offers.filter((o) => o.status === "ACTIVE").length;
  const scheduled = offers.filter((o) => o.status === "SCHEDULED").length;
  const expired = offers.filter((o) => o.status === "EXPIRED").length;
  const totalUses = offers.reduce((s, o) => s + o.uses, 0);

  const handleToggle = (id) => {
    setOffers((prev) => prev.map((o) =>
      o.id === id ? { ...o, status: o.status === "ACTIVE" ? "SCHEDULED" : "ACTIVE" } : o
    ));
  };

  const handleSave = (form) => {
    setOffers((prev) => [...prev, {
      id: `of${Date.now()}`, name: form.name, type: form.type, value: +form.value,
      minOrder: +form.minOrder, maxDiscount: +form.maxDiscount,
      startDate: form.startDate, endDate: form.endDate,
      uses: 0, usageLimit: +form.usageLimit, eligibility: form.eligibility,
      status: "ACTIVE", products: [], categories: [],
    }]);
    setShowCreate(false);
  };

  return (
    <div className="space-y-5 gd-rise">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Offers & Coupons</h1>
          <p className="text-sm text-slate-500 mt-0.5">Create and manage discount offers for your shop.</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors shadow-lg shadow-indigo-900/30">
          <Plus size={15} /> Create Offer
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Active Offers", value: active, icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10" },
          { label: "Scheduled", value: scheduled, icon: Clock, color: "text-sky-400 bg-sky-500/10" },
          { label: "Expired", value: expired, icon: Archive, color: "text-slate-400 bg-slate-500/10" },
          { label: "Total Redemptions", value: totalUses, icon: Users, color: "text-indigo-400 bg-indigo-500/10" },
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

      {/* Offer Cards Grid */}
      {offers.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl text-slate-600">
          <Tag size={40} className="mx-auto mb-4 opacity-30" />
          <div className="text-sm font-bold">No offers yet</div>
          <div className="text-xs mt-1 mb-4">Create your first discount offer to attract customers.</div>
          <button onClick={() => setShowCreate(true)} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-colors">
            + Create Offer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer) => <OfferCard key={offer.id} offer={offer} onToggle={handleToggle} />)}
        </div>
      )}

      {showCreate && <CreateOfferModal onClose={() => setShowCreate(false)} onSave={handleSave} />}
    </div>
  );
}
