import React, { useState } from "react";
import { Bike, ShieldCheck, Phone, ArrowRight, AlertCircle, KeyRound } from "lucide-react";

export default function DeliveryAuthCard({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone"); // 'phone' | 'otp'
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      setError("Enter a valid 10-digit registered rider mobile number");
      return;
    }
    setError("");
    setStep("otp");
  };

  const handleVerify = () => {
    if (otp !== "1234") {
      setError("Incorrect rider code — use 1234 (demo)");
      return;
    }
    setError("");
    onLogin({
      phone: `+91 ${phone}`,
      role: "delivery",
      name: "Vikram Singh",
    });
  };

  return (
    <div className="space-y-4">
      {/* Brand Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-black shadow-md shadow-cyan-600/30">
          <Bike size={20} />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">
            Delivery Partner Portal
          </h2>
          <div className="flex items-center gap-1 text-[11px] text-cyan-600 font-bold">
            <ShieldCheck size={12} />
            <span>Rider Gateway & Duty Access</span>
          </div>
        </div>
      </div>

      {step === "phone" ? (
        <div className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Registered Rider Mobile
            </label>
            <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all shadow-xs">
              <span className="flex items-center gap-1 px-3 bg-slate-50 text-slate-700 font-mono text-xs sm:text-sm font-bold border-r border-slate-200 select-none">
                <Phone size={13} className="text-cyan-600" />
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                  if (error) setError("");
                }}
                placeholder="Enter rider mobile number"
                className="w-full px-3.5 py-2.5 sm:py-3 outline-none font-mono text-xs sm:text-sm text-slate-900 placeholder-slate-400 font-medium bg-transparent tracking-wider"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Demo Rider: <span className="font-mono text-cyan-600 font-bold">9829011223</span>
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all border-0"
          >
            <span>Send Rider OTP</span>
            <ArrowRight size={15} />
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-900">
            OTP sent to <span className="font-bold font-mono">+91 {phone}</span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Enter 4-Digit Verification Code
            </label>
            <input
              type="text"
              maxLength={4}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ""));
                if (error) setError("");
              }}
              placeholder="1234"
              className="w-full text-center px-4 py-3 rounded-xl border border-slate-200 font-mono text-xl tracking-[0.5em] font-bold text-slate-900 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleVerify}
            className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all border-0"
          >
            <span>Verify & Start Shift</span>
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={() => {
              setStep("phone");
              setOtp("");
              setError("");
            }}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-700 font-bold"
          >
            Change Mobile Number
          </button>
        </div>
      )}
    </div>
  );
}
