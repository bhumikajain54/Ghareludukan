import React, { useState } from "react";
import { Bike, ShieldCheck, CheckCircle2, XCircle, FileText, Phone, Mail } from "lucide-react";
import { MOCK_PENDING_DELIVERY_PARTNERS } from "../AdminConstants";

export default function AdminDeliveryApprovals({
  pendingRiders = MOCK_PENDING_DELIVERY_PARTNERS,
  onApproveRider,
  onRejectRider,
}) {
  const [selectedRider, setSelectedRider] = useState(null);
  const [reason, setReason] = useState("");
  const [actionType, setActionType] = useState(null); // 'approve' | 'reject'

  const handleConfirm = () => {
    if (!selectedRider || !actionType) return;
    if (actionType === "approve") {
      onApproveRider?.(selectedRider.id, reason || "Background & Driving License verified.");
    } else {
      if (!reason.trim()) return;
      onRejectRider?.(selectedRider.id, reason);
    }
    setActionType(null);
    setSelectedRider(null);
    setReason("");
  };

  return (
    <div className="space-y-6 gd-rise w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Bike size={24} className="text-cyan-400" />
          <span>Delivery Partner Onboarding & KYC Desk</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Verify commercial driving licenses, vehicle registration certificates (RC), and police background checks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pendingRiders.map((rider) => (
          <div
            key={rider.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                    {rider.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{rider.name}</h3>
                    <p className="text-[11px] text-slate-400">{rider.zone}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  PENDING KYC
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Vehicle:</span>
                  <span className="font-bold text-slate-200">{rider.vehicleType} ({rider.vehicleNumber})</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Driving License:</span>
                  <span className="font-mono text-slate-200">{rider.drivingLicense}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Background Check:</span>
                  <span className="text-cyan-400 font-bold">✓ {rider.backgroundCheckStatus}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedRider(rider);
                  setActionType("reject");
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-600/15 border border-rose-500/30 text-rose-400 hover:bg-rose-600/25 text-xs font-bold transition-all cursor-pointer"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRider(rider);
                  setActionType("approve");
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
              >
                Verify & Approve Rider
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {actionType && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-white">
              {actionType === "approve" ? "Approve Delivery Partner" : "Reject Partner Application"}
            </h3>
            <p className="text-xs text-slate-400">
              Please enter an audit note for {selectedRider?.name}.
            </p>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter remarks..."
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setActionType(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300">
                Cancel
              </button>
              <button onClick={handleConfirm} className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white">
                Submit Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
