import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Bike,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Navigation,
  CheckSquare,
  Square,
  KeyRound,
  RotateCcw,
} from "lucide-react";

export default function DeliveryJobDetail({
  jobId,
  jobs = [],
  onUpdateJobStatus,
  onBack,
  onNav,
}) {
  const job = jobs.find((j) => j.id === jobId) || jobs[0];

  const [checklist, setChecklist] = useState({});
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [failureReason, setFailureReason] = useState("");
  const [showFailureModal, setShowFailureModal] = useState(false);

  if (!job) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Job not found</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-800 rounded-xl text-xs">
          Go Back
        </button>
      </div>
    );
  }

  const toggleCheck = (index) => {
    setChecklist((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleVerifyOtp = () => {
    if (enteredOtp !== job.otp && enteredOtp !== "1234") {
      setOtpError("Incorrect OTP! Customer's 4-digit OTP is required (or 1234).");
      return;
    }
    setOtpError("");
    onUpdateJobStatus(job.id, "DELIVERED");
  };

  const handleFailDelivery = () => {
    if (!failureReason.trim()) return;
    onUpdateJobStatus(job.id, "FAILED", { failureReason });
    setShowFailureModal(false);
  };

  return (
    <div className="space-y-6 gd-rise w-full pb-12">
      {/* Top Back & Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Jobs</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-white">{job.id}</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            {job.status}
          </span>
        </div>
      </div>

      {/* Progress Steps Indicator */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800">
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: "Accept", done: ["ACCEPTED", "ARRIVED_SHOP", "PICKED_UP", "OUT_FOR_DELIVERY", "DELIVERED"].includes(job.status) },
            { label: "At Shop", done: ["ARRIVED_SHOP", "PICKED_UP", "OUT_FOR_DELIVERY", "DELIVERED"].includes(job.status) },
            { label: "Picked Up", done: ["PICKED_UP", "OUT_FOR_DELIVERY", "DELIVERED"].includes(job.status) },
            { label: "Delivered", done: ["DELIVERED"].includes(job.status) },
          ].map((step, idx) => (
            <div key={idx} className="space-y-1">
              <div
                className={`h-1.5 rounded-full ${
                  step.done ? "bg-cyan-500 shadow-xs shadow-cyan-500/50" : "bg-slate-800"
                }`}
              />
              <span className={`text-[10px] font-bold ${step.done ? "text-cyan-400" : "text-slate-400"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Payout & Timing Summary Card */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-400">Total Guaranteed Payout</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400">₹{job.totalPayout}</span>
            {job.tip > 0 && <span className="text-xs text-amber-400 font-semibold">(includes ₹{job.tip} tip)</span>}
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-bold text-slate-400">Est. Travel</span>
          <p className="text-sm font-black text-white">{job.distanceKm} km (~{job.estimatedMinutes} mins)</p>
        </div>
      </div>

      {/* 1. Shop Pickup Card */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400">PICKUP LOCATION</h3>
              <p className="text-sm font-black text-white">{job.shop?.name}</p>
            </div>
          </div>
          {job.shop?.phone && (
            <a
              href={`tel:${job.shop.phone}`}
              className="p-2 rounded-xl bg-slate-800 text-indigo-400 hover:bg-slate-700 transition-colors"
            >
              <Phone size={15} />
            </a>
          )}
        </div>
        <p className="text-xs text-slate-300 pl-9">{job.shop?.address}</p>

        {/* Action Button for Shop */}
        {job.status === "ACCEPTED" && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onUpdateJobStatus(job.id, "ARRIVED_SHOP")}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs cursor-pointer shadow-md shadow-indigo-600/30 transition-all"
            >
              I Have Arrived at Shop
            </button>
          </div>
        )}
      </div>

      {/* 2. Order Items & Checklist */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 flex items-center gap-2">
          <Receipt size={14} className="text-cyan-400" />
          <span>ORDER ITEMS CHECKLIST ({job.items?.length || 2})</span>
        </h3>

        <div className="space-y-2">
          {job.items?.map((item, idx) => {
            const checked = !!checklist[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  checked
                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                    : "bg-slate-800 border-slate-700/80 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  {checked ? (
                    <CheckSquare size={18} className="text-cyan-400" />
                  ) : (
                    <Square size={18} className="text-slate-500" />
                  )}
                  <div>
                    <p className="text-xs font-bold">{item.name}</p>
                    <p className="text-[10px] text-slate-400">{item.qty} × {item.unit || "unit"}</p>
                  </div>
                </div>
                <span className="text-xs font-black">₹{item.price * item.qty}</span>
              </div>
            );
          })}
        </div>

        {/* Pickup ready confirm */}
        {job.status === "ARRIVED_SHOP" && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onUpdateJobStatus(job.id, "PICKED_UP")}
              className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs cursor-pointer shadow-md shadow-cyan-600/30 transition-all"
            >
              Verify & Confirm Pickup from Shop
            </button>
          </div>
        )}
      </div>

      {/* 3. Customer Delivery Drop */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400">CUSTOMER DROP</h3>
              <p className="text-sm font-black text-white">{job.customer?.name}</p>
            </div>
          </div>
          {job.customer?.phone && (
            <a
              href={`tel:${job.customer.phone}`}
              className="p-2 rounded-xl bg-slate-800 text-cyan-400 hover:bg-slate-700 transition-colors"
            >
              <Phone size={15} />
            </a>
          )}
        </div>
        <p className="text-xs text-slate-300 pl-9">{job.customer?.address}</p>

        {job.customer?.deliveryNotes && (
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
            <span className="font-bold">Customer Note:</span> {job.customer.deliveryNotes}
          </div>
        )}

        {/* Action Button for Out for Delivery / Complete */}
        {job.status === "PICKED_UP" && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onUpdateJobStatus(job.id, "OUT_FOR_DELIVERY")}
              className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs cursor-pointer shadow-md shadow-cyan-600/30 transition-all"
            >
              Start Driving to Customer Location
            </button>
          </div>
        )}

        {/* OTP Input during OUT_FOR_DELIVERY */}
        {job.status === "OUT_FOR_DELIVERY" && (
          <div className="pt-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <KeyRound size={14} className="text-cyan-400" />
                <span>Enter Customer Delivery OTP</span>
              </span>
              <span className="text-[10px] text-slate-300 font-bold bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">Demo Code: {job.otp || "1234"}</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength={4}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="4-digit OTP"
                className="w-36 text-center tracking-widest text-lg font-black py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-500 focus:outline-hidden"
              />

              <button
                type="button"
                onClick={handleVerifyOtp}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs cursor-pointer shadow-md shadow-cyan-500/20"
              >
                Verify & Complete Delivery
              </button>
            </div>

            {otpError && <p className="text-xs text-rose-400 font-semibold">{otpError}</p>}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowFailureModal(true)}
                className="text-xs font-bold text-rose-400 hover:text-rose-300 cursor-pointer"
              >
                Report Delivery Issue / Unreachable
              </button>
            </div>
          </div>
        )}

        {/* Delivered banner */}
        {job.status === "DELIVERED" && (
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-center space-y-1">
            <CheckCircle2 size={24} className="mx-auto" />
            <p className="text-sm font-black">Trip Successfully Delivered!</p>
            <p className="text-xs text-slate-400">₹{job.totalPayout} credited to your rider wallet.</p>
          </div>
        )}

        {/* Failed Banner */}
        {job.status === "FAILED" && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 space-y-1 text-center">
            <AlertTriangle size={24} className="mx-auto" />
            <p className="text-sm font-black">Delivery Failed / Returned to Shop</p>
            <p className="text-xs text-slate-400">{job.failureReason || "Customer unreachable."}</p>
          </div>
        )}
      </div>

      {/* Accept Job button if AVAILABLE */}
      {job.status === "AVAILABLE" && (
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onUpdateJobStatus(job.id, "ACCEPTED")}
            className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm cursor-pointer shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
          >
            <Bike size={18} />
            <span>ACCEPT THIS DELIVERY JOB (₹{job.totalPayout})</span>
          </button>
        </div>
      )}

      {/* Delivery Failure Modal */}
      {showFailureModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <AlertTriangle size={18} className="text-rose-400" />
              <span>Report Delivery Failure</span>
            </h3>

            <p className="text-xs text-slate-400">
              Please specify the exact reason why the order cannot be dropped. You will be routed to return the package to the merchant shop.
            </p>

            <select
              value={failureReason}
              onChange={(e) => setFailureReason(e.target.value)}
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-rose-500"
            >
              <option value="">-- Select Failure Reason --</option>
              <option value="Customer unreachable after 3 calls">Customer unreachable after 3 calls</option>
              <option value="Customer refused package">Customer refused package</option>
              <option value="Incorrect address / location unserviceable">Incorrect address / location unserviceable</option>
              <option value="Door locked / nobody at home">Door locked / nobody at home</option>
            </select>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFailureModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!failureReason}
                onClick={handleFailDelivery}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white disabled:opacity-50 cursor-pointer"
              >
                Confirm & Return to Shop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
