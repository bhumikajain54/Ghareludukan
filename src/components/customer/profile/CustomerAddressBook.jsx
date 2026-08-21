import React, { useState } from "react";
import {
  MapPin, Plus, Trash2, Edit3, CheckCircle2, Home,
  Briefcase, Building, ArrowLeft, ShieldCheck,
} from "lucide-react";
import { MOCK_ADDRESSES } from "../CustomerConstants";

export default function CustomerAddressBook({ onNav }) {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: "Home",
    recipient: "Bhumika Jain",
    phone: "+91 98765 43210",
    line1: "",
    line2: "",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302017",
    landmark: "",
    isDefault: false,
  });

  const setDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.line1 || !newAddr.pincode) return;

    const created = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0 ? true : newAddr.isDefault,
    };

    if (created.isDefault) {
      setAddresses([
        created,
        ...addresses.map((a) => ({ ...a, isDefault: false })),
      ]);
    } else {
      setAddresses([...addresses, created]);
    }

    setShowAddModal(false);
    setNewAddr({
      label: "Home",
      recipient: "Bhumika Jain",
      phone: "+91 98765 43210",
      line1: "",
      line2: "",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302017",
      landmark: "",
      isDefault: false,
    });
  };

  return (
    <div className="gd-rise space-y-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">Saved Addresses</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your delivery locations, home, and workplace addresses
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-950 transition-all cursor-pointer"
        >
          <Plus size={15} />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-5 rounded-3xl bg-slate-900 border transition-all ${
              addr.isDefault
                ? "border-cyan-500/50 shadow-xl shadow-cyan-950/30"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                  {addr.label === "Work" ? <Briefcase size={14} /> : <Home size={14} />}
                </span>
                <span className="text-sm font-extrabold text-white">{addr.label}</span>
                {addr.isDefault && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 flex items-center gap-1">
                    <CheckCircle2 size={10} /> Default Delivery Address
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!addr.isDefault && (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-xs text-slate-400 hover:text-cyan-400 font-bold transition-colors cursor-pointer"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Delete address"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <div className="mt-3 space-y-1 text-xs text-slate-300 font-medium leading-relaxed pl-10">
              <div className="font-bold text-white">
                {addr.recipient} · <span className="text-slate-400 font-normal">{addr.phone}</span>
              </div>
              <div className="text-slate-400">
                {addr.line1}, {addr.line2}
              </div>
              <div className="text-slate-400">
                {addr.city}, {addr.state} – <strong className="text-slate-200">{addr.pincode}</strong>
              </div>
              {addr.landmark && (
                <div className="text-[11px] text-slate-500">
                  Landmark: {addr.landmark}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative z-10 w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white">Add Delivery Address</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-3.5">
              <div className="flex gap-2">
                {["Home", "Work", "Other"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setNewAddr({ ...newAddr, label: tag })}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      newAddr.label === tag
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                        : "bg-slate-800 border-slate-700 text-slate-400"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={newAddr.recipient}
                    onChange={(e) => setNewAddr({ ...newAddr, recipient: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Flat / House / Building No.</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 402, Block B, Krishna Heights"
                  value={newAddr.line1}
                  onChange={(e) => setNewAddr({ ...newAddr, line1: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Area / Street / Locality</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near City Park, Sector 7"
                  value={newAddr.line2}
                  onChange={(e) => setNewAddr({ ...newAddr, line2: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Opposite Metro Pillar 42"
                  value={newAddr.landmark}
                  onChange={(e) => setNewAddr({ ...newAddr, landmark: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="makeDefault"
                  checked={newAddr.isDefault}
                  onChange={(e) => setNewAddr({ ...newAddr, isDefault: e.target.checked })}
                  className="rounded accent-cyan-500 cursor-pointer"
                />
                <label htmlFor="makeDefault" className="text-xs text-slate-300 cursor-pointer">
                  Make this my default delivery address
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-extrabold shadow-lg shadow-cyan-950 transition-all cursor-pointer"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
