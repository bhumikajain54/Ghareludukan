import React, { useState } from "react";
import AuthBrandHeader from "./AuthBrandHeader";
import PhoneStep from "./PhoneStep";
import OtpStep from "./OtpStep";
import DeliveryAuthCard from "./DeliveryAuthCard";
import AdminAuthCard from "./AdminAuthCard";
import SupportAuthCard from "./SupportAuthCard";
import Footer from "../common/Footer";
import { Store, ShieldCheck, Zap, Receipt, MapPin, Gift, ShoppingBag, Pill, Cake } from "lucide-react";

export const REGISTERED_USERS = {
  "9829000001": { phone: "+91 98290 00001", role: "admin", name: "Sanjay Saxena (Admin)" },
  "9829000002": { phone: "+91 98290 00002", role: "support", name: "Neha Rathore (Support Lead)" },
  "9829011223": { phone: "+91 98290 11223", role: "delivery", name: "Vikram Singh" },
  "9829144556": { phone: "+91 98291 44556", role: "seller", name: "Rajesh Agarwal", shopName: "Raj Traders" },
  "9876543210": { phone: "+91 98765 43210", role: "customer", name: "Bhumika Jain" },
};

export default function Auth({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone"); // 'phone' | 'otp'
  const [error, setError] = useState("");

  const [activePortal] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const p = params.get("portal") || params.get("gateway");
      if (p) return p.toLowerCase();
    } catch {}
    return "public";
  });

  const handleSendOtp = () => {
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setStep("otp");
  };

  const handleVerify = () => {
    if (otp !== "1234") {
      setError("Incorrect code — try 1234 (demo)");
      return;
    }
    setError("");

    const digitsOnly = phone.replace(/\D/g, "");
    // Resolve user from registry or default to customer
    const registered = REGISTERED_USERS[digitsOnly] || {
      phone: `+91 ${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`,
      role: "customer",
      name: "Bhumika Jain",
    };

    if (onLogin) {
      onLogin(registered);
    }
  };

  const handleChangePhone = () => {
    setOtp("");
    setError("");
    setStep("phone");
  };

  return (
    <div className="gd-root min-h-screen lg:h-screen lg:max-h-screen w-full bg-gradient-to-br from-slate-50 via-sky-50/50 to-indigo-50/30 text-slate-800 flex flex-col justify-between relative overflow-y-auto lg:overflow-hidden">
      {/* Background Decorative Soft Luminous Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-200/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-200/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-100/40 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-4 lg:py-2 z-10 w-full max-w-6xl mx-auto my-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Ghareludukan Store Platform Feature Showcase */}
          <div className="lg:col-span-6 hidden lg:flex flex-col space-y-3.5 xl:space-y-5 pr-2 xl:pr-6">
            {/* Top Glowing Glass Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-cyan-200/90 text-cyan-900 text-[11px] xl:text-xs font-bold w-fit shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <MapPin size={12} className="text-cyan-600" />
              <span>All Gully Shops & Every Product Delivered</span>
            </div>

            {/* Hero Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Every Local Shop in Your Gully,{" "}
                <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                  Directly Online
                </span>.
              </h1>

              <p className="text-xs xl:text-sm text-slate-600 font-medium leading-relaxed max-w-lg">
                Not just grocery — order party gifts, crockery, wall clocks, daily utilities, fresh dairy, or stationery from your favorite nearby local stores when you're busy or away.
              </p>
            </div>

            {/* Product Categories Pill Strip */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-[11px] font-bold shadow-2xs">
                <Gift size={12} className="text-purple-600" /> Party Gifts & Toys
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-bold shadow-2xs">
                <ShoppingBag size={12} className="text-blue-600" /> Daily Essentials & Crockery
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-[11px] font-bold shadow-2xs">
                <Cake size={12} className="text-cyan-600" /> Bakery & Sweets
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-[11px] font-bold shadow-2xs">
                <Pill size={12} className="text-indigo-600" /> Pharmacy & Healthcare
              </span>
            </div>

            {/* Feature Showcase Grid (Modern Horizontal Card Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
              {/* Item 1: 15-Min Delivery */}
              <div className="flex items-start gap-3 p-2.5 xl:p-3 rounded-xl xl:rounded-2xl bg-white/80 border border-slate-200/80 hover:border-cyan-400/50 hover:bg-white hover:shadow-md transition-all duration-200 group">
                <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-lg xl:rounded-xl bg-cyan-50 border border-cyan-200/80 text-cyan-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <Zap size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs xl:text-sm font-bold text-slate-900 leading-tight">15-Minute Local Delivery</h3>
                  <p className="text-[11px] xl:text-xs text-slate-500 font-medium leading-snug mt-0.5">Instant dispatch from neighbourhood stores to your home.</p>
                </div>
              </div>

              {/* Item 2: Khata Bill Paper */}
              <div className="flex items-start gap-3 p-2.5 xl:p-3 rounded-xl xl:rounded-2xl bg-white/80 border border-slate-200/80 hover:border-sky-400/50 hover:bg-white hover:shadow-md transition-all duration-200 group">
                <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-lg xl:rounded-xl bg-sky-50 border border-sky-200/80 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <Receipt size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs xl:text-sm font-bold text-slate-900 leading-tight">Original Shop Parchi</h3>
                  <p className="text-[11px] xl:text-xs text-slate-500 font-medium leading-snug mt-0.5">Transparent billing with authentic physical merchant receipts.</p>
                </div>
              </div>

              {/* Item 3: Merchant & Buyer */}
              <div className="flex items-start gap-3 p-2.5 xl:p-3 rounded-xl xl:rounded-2xl bg-white/80 border border-slate-200/80 hover:border-indigo-400/50 hover:bg-white hover:shadow-md transition-all duration-200 group">
                <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-lg xl:rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <Store size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs xl:text-sm font-bold text-slate-900 leading-tight">Merchant & Buyer</h3>
                  <p className="text-[11px] xl:text-xs text-slate-500 font-medium leading-snug mt-0.5">Unified access for local sellers and neighborhood buyers.</p>
                </div>
              </div>

              {/* Item 4: Every Product Included */}
              <div className="flex items-start gap-3 p-2.5 xl:p-3 rounded-xl xl:rounded-2xl bg-white/80 border border-slate-200/80 hover:border-purple-400/50 hover:bg-white hover:shadow-md transition-all duration-200 group">
                <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-lg xl:rounded-xl bg-purple-50 border border-purple-200/80 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <ShieldCheck size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs xl:text-sm font-bold text-slate-900 leading-tight">Every Product Included</h3>
                  <p className="text-[11px] xl:text-xs text-slate-500 font-medium leading-snug mt-0.5">From gifts to groceries — all items from gully stores.</p>
                </div>
              </div>
            </div>

            {/* Bottom Trust Indicators */}
            <div className="flex items-center gap-5 pt-1.5 text-[11px] xl:text-xs text-slate-500 font-semibold border-t border-slate-200/80">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-xs" />
                Live in Your Neighborhood
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-xs" />
                Direct Shop-to-Door Delivery
              </span>
            </div>
          </div>

          {/* Right Column: Prominent, Clean Light Login Card */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-md p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 relative gd-rise">
              {activePortal === "delivery" ? (
                <DeliveryAuthCard onLogin={onLogin} />
              ) : activePortal === "admin" ? (
                <AdminAuthCard onLogin={onLogin} />
              ) : activePortal === "support" ? (
                <SupportAuthCard onLogin={onLogin} />
              ) : (
                <>
                  <AuthBrandHeader />
                  {step === "phone" ? (
                    <PhoneStep
                      phone={phone}
                      onPhoneChange={(val) => {
                        setPhone(val);
                        if (error) setError("");
                      }}
                      onSendOtp={handleSendOtp}
                      error={error}
                    />
                  ) : (
                    <OtpStep
                      phone={phone}
                      otp={otp}
                      onOtpChange={(val) => {
                        setOtp(val);
                        if (error) setError("");
                      }}
                      onVerify={handleVerify}
                      onChangePhone={handleChangePhone}
                      error={error}
                    />
                  )}
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
