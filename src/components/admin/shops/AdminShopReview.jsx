import React, { useState } from "react";
import {
  ArrowLeft,
  Store,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Building,
  CreditCard,
  History,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function AdminShopReview({
  shopId,
  pendingShops = [],
  onApprove,
  onReject,
  onRequestCorrection,
  onSuspend,
  onBack,
}) {
  const shop = pendingShops.find((s) => s.id === shopId) || pendingShops[0];

  const [reason, setReason] = useState("");
  const [activeModal, setActiveModal] = useState(null); // 'approve' | 'reject' | 'correction' | 'suspend' | null
  const [docStatuses, setDocStatuses] = useState({
    gst: "VERIFIED",
    fssai: "VERIFIED",
    cheque: "VERIFIED",
    photo: "VERIFIED",
  });

  if (!shop) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p>Shop application not found</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-800 rounded-xl text-xs">
          Return to Queue
        </button>
      </div>
    );
  }

  const handleAction = () => {
    if (!activeModal) return;

    if (activeModal === "approve") {
      onApprove(shop.id, reason || "Statutory documents and storefront verified.");
    } else if (activeModal === "reject") {
      if (!reason.trim()) return;
      onReject(shop.id, reason);
    } else if (activeModal === "correction") {
      if (!reason.trim()) return;
      onRequestCorrection(shop.id, reason);
    } else if (activeModal === "suspend") {
      if (!reason.trim()) return;
      onSuspend(shop.id, reason);
    }

    setActiveModal(null);
    setReason("");
    onBack();
  };

  return (
    <div className="space-y-6 gd-rise w-full pb-12">
      {/* Back & Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Approvals Queue</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-400">APP-ID: {shop.id}</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            {shop.status}
          </span>
        </div>
      </div>

      {/* Main Info Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-black text-2xl border border-cyan-500/20">
              <Store size={28} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">{shop.shopName}</h1>
              <p className="text-xs text-slate-400">
                Proprietor: <span className="text-slate-200 font-bold">{shop.ownerName}</span> • Category: <span className="text-cyan-400 font-bold">{shop.category}</span>
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700/80 text-right text-xs">
            <span className="text-slate-400 block">Applied Date</span>
            <span className="font-bold text-white">{shop.appliedDate}</span>
          </div>
        </div>

        {/* Contact & Location Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Phone size={14} className="text-cyan-400" />
            <span>{shop.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Mail size={14} className="text-cyan-400" />
            <span>{shop.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin size={14} className="text-cyan-400" />
            <span className="truncate">{shop.address}</span>
          </div>
        </div>
      </div>

      {/* Statutory Documents & Review Grid */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <ShieldCheck size={18} className="text-cyan-400" />
          <span>Statutory Compliance Documents</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* GST */}
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">GSTIN Registration</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                VALID FORMAT
              </span>
            </div>
            <p className="font-mono text-sm font-bold text-white">{shop.gstin}</p>
            <p className="text-[11px] text-slate-400">Verified against National GST Portal</p>
          </div>

          {/* FSSAI */}
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">FSSAI Food License</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                ACTIVE
              </span>
            </div>
            <p className="font-mono text-sm font-bold text-white">{shop.fssai}</p>
            <p className="text-[11px] text-slate-400">Food Safety and Standards Authority of India</p>
          </div>

          {/* Bank Account */}
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Settlement Bank Account</span>
              <CreditCard size={14} className="text-cyan-400" />
            </div>
            <p className="text-xs font-bold text-white">{shop.bankDetails?.bankName}</p>
            <p className="font-mono text-[11px] text-slate-400">
              A/c: {shop.bankDetails?.accountNumber} • IFSC: {shop.bankDetails?.ifsc}
            </p>
          </div>

          {/* Storefront Photo */}
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Physical Storefront Board</span>
              <ExternalLink size={14} className="text-cyan-400" />
            </div>
            <p className="text-xs text-slate-400">Physical signage matching business name</p>
            <span className="text-[10px] text-cyan-400 font-bold block">✓ GPS geotagged photo verified</span>
          </div>
        </div>
      </div>

      {/* Decision Buttons */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveModal("approve")}
            className="px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs cursor-pointer shadow-lg shadow-cyan-600/30 transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 size={16} />
            <span>APPROVE MERCHANT</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal("correction")}
            className="px-4 py-3 rounded-2xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <AlertTriangle size={16} />
            <span>Request Clarification / Resubmission</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setActiveModal("reject")}
          className="px-4 py-3 rounded-2xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-bold text-xs border border-rose-500/30 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <XCircle size={16} />
          <span>Reject Application</span>
        </button>
      </div>

      {/* Action Confirmation Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-white">
              {activeModal === "approve"
                ? "Approve & Onboard Merchant"
                : activeModal === "reject"
                ? "Reject Merchant Onboarding"
                : "Request Document Clarification"}
            </h3>

            <p className="text-xs text-slate-400">
              {activeModal === "approve"
                ? `Are you sure you want to approve "${shop.shopName}"? They will immediately receive access to their merchant portal to upload catalogs.`
                : `Please provide clear feedback to the merchant proprietor (${shop.ownerName}) for statutory compliance audit logs:`}
            </p>

            {activeModal !== "approve" && (
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="State the exact statutory deficiency (e.g. FSSAI registration certificate blurred, GSTIN trade name mismatch)..."
                className="w-full h-24 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:border-cyan-500 resize-none font-medium"
              />
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  setReason("");
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={activeModal !== "approve" && !reason.trim()}
                onClick={handleAction}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white disabled:opacity-50 cursor-pointer ${
                  activeModal === "approve"
                    ? "bg-cyan-600 hover:bg-cyan-500"
                    : activeModal === "reject"
                    ? "bg-rose-600 hover:bg-rose-500"
                    : "bg-amber-600 hover:bg-amber-500"
                }`}
              >
                Confirm & Log Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
