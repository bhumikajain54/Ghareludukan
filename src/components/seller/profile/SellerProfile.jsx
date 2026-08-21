import React, { useState } from "react";
import {
  Store, MapPin, Clock, ShieldCheck, Bell, Lock,
  User, Camera, ChevronRight, Save, CheckCircle2,
  Eye, EyeOff, Smartphone,
} from "lucide-react";

const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "shop", label: "Shop", icon: Store },
  { id: "business", label: "Business", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "shop-status", label: "Shop Status", icon: Clock },
];

function SettingRow({ label, sub, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-800 last:border-0">
      <div className="min-w-0">
        <div className="text-sm font-semibold text-slate-200">{label}</div>
        {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ value, onChange, label }) {
  return (
    <button
      onClick={() => onChange(!value)}
      aria-label={label}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ${value ? "bg-indigo-600" : "bg-slate-700"}`}
    >
      <span className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${value ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function AccountTab() {
  const [name, setName] = useState("Raj Kumar");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("raj@rajtraders.com");
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-5">
      {/* Profile Photo */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <span className="text-2xl font-extrabold text-indigo-400">R</span>
          </div>
          <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-slate-900">
            <Camera size={11} className="text-white" />
          </button>
        </div>
        <div>
          <div className="text-sm font-bold text-slate-200">{name}</div>
          <div className="text-xs text-slate-500">Seller Profile Photo</div>
          <button className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold mt-1">Change Photo</button>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        {[
          { label: "Owner Name", value: name, onChange: setName },
          { label: "Mobile Number", value: phone, onChange: setPhone, type: "tel" },
          { label: "Email Address", value: email, onChange: setEmail, type: "email" },
        ].map(({ label, value, onChange, type = "text" }) => (
          <div key={label} className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
            <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
        ))}
      </div>

      <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors">
        <Save size={14} />
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

function ShopTab() {
  const [shopName, setShopName] = useState("Raj Traders");
  const [desc, setDesc] = useState("Premium quality groceries and daily essentials at your doorstep.");
  const [minOrder, setMinOrder] = useState("100");
  const [prepTime, setPrepTime] = useState("15");
  const [deliveryAvail, setDeliveryAvail] = useState(true);

  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [workingDays, setWorkingDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);

  const toggleDay = (d) => setWorkingDays((p) => p.includes(d) ? p.filter((x) => x !== d) : [...p, d]);

  return (
    <div className="space-y-5">
      {[
        { label: "Shop Name", value: shopName, onChange: setShopName },
      ].map(({ label, value, onChange }) => (
        <div key={label} className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
          <input value={value} onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
      ))}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={2}
          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none" />
      </div>

      {/* Operating Hours */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Working Days</label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {DAYS.map((d) => (
            <button key={d} onClick={() => toggleDay(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                workingDays.includes(d) ? "bg-indigo-600 text-white" : "bg-slate-800 border border-slate-700 text-slate-500"
              }`}>{d}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[["Opening Time", "08:00"], ["Closing Time", "22:00"]].map(([label, def]) => (
          <div key={label} className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
            <input type="time" defaultValue={def}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-0">
        <SettingRow label="Delivery Available" sub="Enable home delivery for orders">
          <Toggle value={deliveryAvail} onChange={setDeliveryAvail} />
        </SettingRow>
        <SettingRow label="Min Order Amount (₹)" sub="Customers cannot order below this">
          <input value={minOrder} onChange={(e) => setMinOrder(e.target.value)} type="number" min="0"
            className="w-20 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 font-mono text-right focus:outline-none focus:border-indigo-500 transition-colors" />
        </SettingRow>
        <SettingRow label="Preparation Time (min)" sub="Time to prepare order before pickup/delivery">
          <input value={prepTime} onChange={(e) => setPrepTime(e.target.value)} type="number" min="5"
            className="w-20 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 font-mono text-right focus:outline-none focus:border-indigo-500 transition-colors" />
        </SettingRow>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [settings, setSettings] = useState({
    newOrder: true,
    orderUpdate: true,
    payment: true,
    settlement: true,
    lowStock: true,
    promotional: false,
    sms: true,
    email: false,
    push: true,
  });

  const toggle = (k) => setSettings((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-0">
      {[
        { key: "newOrder", label: "New Order Alerts", sub: "Notify when a new order is placed" },
        { key: "orderUpdate", label: "Order Status Updates", sub: "Accepted, preparing, ready alerts" },
        { key: "payment", label: "Payment Notifications", sub: "UPI/COD payment confirmations" },
        { key: "settlement", label: "Settlement Alerts", sub: "Settlement processed notifications" },
        { key: "lowStock", label: "Low Stock Alerts", sub: "When products fall below threshold" },
        { key: "promotional", label: "Promotional Updates", sub: "Platform offers and news" },
        { key: "sms", label: "SMS Notifications", sub: "Text messages for critical alerts" },
        { key: "email", label: "Email Notifications", sub: "Summary emails" },
        { key: "push", label: "Push Notifications", sub: "App push notifications" },
      ].map(({ key, label, sub }) => (
        <SettingRow key={key} label={label} sub={sub}>
          <Toggle value={settings[key]} onChange={() => toggle(key)} />
        </SettingRow>
      ))}
    </div>
  );
}

function SecurityTab() {
  const [showPw, setShowPw] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Change Password</div>
        {[
          { label: "Current Password", val: currentPw, set: setCurrentPw },
          { label: "New Password", val: newPw, set: setNewPw },
        ].map(({ label, val, set }) => (
          <div key={label} className="relative">
            <input type={showPw ? "text" : "password"} value={val} onChange={(e) => set(e.target.value)}
              placeholder={label}
              className="w-full px-4 py-2.5 pr-12 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        ))}
        <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors">
          Update Password
        </button>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <SettingRow label="OTP Verification" sub="Use OTP for login instead of password">
          <Toggle value={true} onChange={() => {}} />
        </SettingRow>
        <SettingRow label="Active Sessions" sub="Manage devices logged into your account">
          <button className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
            View <ChevronRight size={12} />
          </button>
        </SettingRow>
      </div>
    </div>
  );
}

function ShopStatusTab({ shopOnline, onToggleShop }) {
  const STATUS_OPTIONS = [
    { id: "open", label: "Open", sub: "Accepting orders normally", color: "emerald" },
    { id: "closed", label: "Closed", sub: "Not accepting orders", color: "red" },
    { id: "temp-unavail", label: "Temporarily Unavailable", sub: "Back soon — paused for today", color: "amber" },
  ];
  const [currentStatus, setCurrentStatus] = useState("open");

  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Shop Status</div>
      {STATUS_OPTIONS.map(({ id, label, sub, color }) => (
        <button key={id} onClick={() => { setCurrentStatus(id); if (id === "open") onToggleShop?.(true); else onToggleShop?.(false); }}
          className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border transition-all ${
            currentStatus === id
              ? `bg-${color}-600/10 border-${color}-500/40`
              : "bg-slate-900 border-slate-800 hover:border-slate-700"
          }`}>
          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
            currentStatus === id
              ? color === "emerald" ? "bg-emerald-400" : color === "red" ? "bg-red-400" : "bg-amber-400"
              : "bg-slate-700"
          }`} />
          <div>
            <div className={`text-sm font-bold ${currentStatus === id ? "text-slate-100" : "text-slate-400"}`}>{label}</div>
            <div className="text-xs text-slate-500">{sub}</div>
          </div>
          {currentStatus === id && (
            <CheckCircle2 size={16} className="ml-auto text-indigo-400" />
          )}
        </button>
      ))}
    </div>
  );
}

export default function SellerProfile({ shopOnline, onToggleShop, onNav }) {
  const [activeTab, setActiveTab] = useState("shop");
  const [saved, setSaved] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "account": return <AccountTab />;
      case "shop": return <ShopTab />;
      case "business": return (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <ShieldCheck size={18} className="text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-100">GST Registered</div>
                <div className="text-xs text-emerald-400 font-semibold">Verified ✓</div>
              </div>
            </div>
            {[
              { label: "GSTIN", value: "27ABCDE1234F1Z5" },
              { label: "Business Name", value: "Raj Traders Pvt." },
              { label: "PAN", value: "ABCDE1234F" },
              { label: "Account Status", value: "Approved & Active" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">
                <span className="text-xs text-slate-500">{label}</span>
                <span className="text-sm font-mono font-semibold text-slate-300">{value}</span>
              </div>
            ))}
          </div>
        </div>
      );
      case "notifications": return <NotificationsTab />;
      case "security": return <SecurityTab />;
      case "shop-status": return <ShopStatusTab shopOnline={shopOnline} onToggleShop={onToggleShop} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-5 gd-rise w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Shop Profile</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage your store details, timings, and storefront appearance.</p>
        </div>
        <button
          onClick={() => onNav?.("settings")}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer"
        >
          Account Settings
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Tab Sidebar */}
        <div className="lg:w-52 flex-shrink-0">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors border-b border-slate-800/60 last:border-0 ${
                  activeTab === id
                    ? "bg-indigo-600/10 text-indigo-400 border-l-2 border-l-indigo-500"
                    : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                }`}>
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-w-0">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
