import React, { useState } from "react";
import {
  FileText, Download, Printer, Eye, CheckCircle2,
  Calendar, ShieldCheck, IndianRupee, ArrowLeft, Search,
} from "lucide-react";
import { inr } from "../SellerConstants";

export default function SellerInvoices({ onNav }) {
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [previewInvoice, setPreviewInvoice] = useState(null);

  const invoices = [
    {
      id: "INV-2026-08-01",
      title: "Platform Service Commission Invoice",
      period: "Aug 01 – Aug 15, 2026",
      grossSales: 41250,
      commission: 2062.50,
      gstAmount: 371.25,
      totalDeduction: 2433.75,
      status: "PAID",
      issuedOn: "Aug 16, 2026",
      invoiceType: "GST Commission",
    },
    {
      id: "INV-2026-07-02",
      title: "Monthly Merchant Platform Fee Invoice",
      period: "Jul 16 – Jul 31, 2026",
      grossSales: 89400,
      commission: 4470.00,
      gstAmount: 804.60,
      totalDeduction: 5274.60,
      status: "PAID",
      issuedOn: "Aug 01, 2026",
      invoiceType: "GST Commission",
    },
    {
      id: "INV-2026-07-01",
      title: "Monthly Merchant Platform Fee Invoice",
      period: "Jul 01 – Jul 15, 2026",
      grossSales: 76200,
      commission: 3810.00,
      gstAmount: 685.80,
      totalDeduction: 4495.80,
      status: "PAID",
      issuedOn: "Jul 16, 2026",
      invoiceType: "GST Commission",
    },
    {
      id: "INV-2026-06-02",
      title: "Monthly Merchant Platform Fee Invoice",
      period: "Jun 16 – Jun 30, 2026",
      grossSales: 68100,
      commission: 3405.00,
      gstAmount: 612.90,
      totalDeduction: 4017.90,
      status: "PAID",
      issuedOn: "Jul 01, 2026",
      invoiceType: "GST Commission",
    },
  ];

  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">GST & Tax Invoices</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Download GST-compliant tax invoices, commission statements & B2B records
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNav?.("settlements")}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            Settlements Overview
          </button>
          <button
            onClick={() => alert("Downloading all invoices in ZIP bundle...")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950/40 cursor-pointer"
          >
            <Download size={14} />
            <span>Download All (PDF)</span>
          </button>
        </div>
      </div>

      {/* GST Compliance Card */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Registered GSTIN: 08AABCR1234F1Z9</div>
            <div className="text-xs text-slate-400">Raj Traders · Ward 14, Mansarovar, Jaipur</div>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
          <CheckCircle2 size={13} /> GST Active & Validated
        </span>
      </div>

      {/* Invoice List */}
      <div className="space-y-3.5">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md ticket-row-hover"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-white">{inv.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                    {inv.invoiceType}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-300 mt-1">{inv.title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Period: {inv.period} · Issued: {inv.issuedOn}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Gross Order Value</div>
                <div className="font-mono font-extrabold text-sm text-slate-200">{inr(inv.grossSales)}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Platform Fee + 18% GST</div>
                <div className="font-mono font-extrabold text-sm text-indigo-400">{inr(inv.totalDeduction)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Printing Invoice ${inv.id}...`)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Print Invoice"
                >
                  <Printer size={15} />
                </button>
                <button
                  onClick={() => alert(`Downloading ${inv.id}.pdf...`)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Download size={13} />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
