import React, { useState } from "react";
import {
  FileSpreadsheet, Download, Calendar, ArrowRight,
  BarChart3, TrendingUp, Package, Users, IndianRupee,
  CheckCircle2, Clock, Filter,
} from "lucide-react";
import { inr } from "../SellerConstants";

export default function SellerReports({ onNav }) {
  const [selectedFormat, setSelectedFormat] = useState("CSV");
  const [dateRange, setDateRange] = useState("THIS_MONTH");

  const reportTemplates = [
    {
      id: "sales-summary",
      title: "Consolidated Sales & Revenue Report",
      desc: "Daily breakdown of completed orders, gross revenue, net payout, and discount absorptions.",
      frequency: "Daily / Weekly / Monthly",
      icon: TrendingUp,
      badge: "Financial",
    },
    {
      id: "tax-gst",
      title: "GST Tax Breakdown & HSN Summary",
      desc: "HSN-wise sales tax report with 0%, 5%, 12%, 18% GST splits for monthly GSTR-1 and GSTR-3B filings.",
      frequency: "Monthly",
      icon: IndianRupee,
      badge: "Taxation",
    },
    {
      id: "product-velocity",
      title: "Product Performance & Stock Velocity Report",
      desc: "SKU sales frequency, out-of-stock incidences, average order values, and inventory turns.",
      frequency: "Weekly",
      icon: Package,
      badge: "Inventory",
    },
    {
      id: "customer-retention",
      title: "Neighborhood Customer Insights Report",
      desc: "Repeat purchase rates, high-value local shoppers, zip code delivery density, and average basket sizes.",
      frequency: "Monthly",
      icon: Users,
      badge: "Customer",
    },
    {
      id: "settlements-audit",
      title: "Bank Settlement Reconciliation Statement",
      desc: "Full audit trail of all NEFT batch credits, deduction reasons, dispute adjustments, and bank UTR numbers.",
      frequency: "Weekly / Monthly",
      icon: FileSpreadsheet,
      badge: "Audit",
    },
  ];

  return (
    <div className="space-y-6 gd-rise max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Business Reports & Exports</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Generate and export custom sales, GST, inventory velocity, and accounting spreadsheets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNav?.("analytics")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            <BarChart3 size={14} />
            <span>Interactive Analytics</span>
          </button>
        </div>
      </div>

      {/* Quick Generator Box */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
            Quick Report Generator
          </h2>
          <span className="text-xs text-slate-400">Ready for instant download</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-400 font-bold block mb-1.5">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
            >
              <option value="TODAY">Today (Aug 20, 2026)</option>
              <option value="THIS_WEEK">This Week (Aug 15 – Aug 21)</option>
              <option value="THIS_MONTH">This Month (August 2026)</option>
              <option value="LAST_MONTH">Last Month (July 2026)</option>
              <option value="Q2_2026">Q2 2026 (Apr – Jun)</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-bold block mb-1.5">File Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
            >
              <option value="CSV">CSV (Excel Compatible)</option>
              <option value="XLSX">Microsoft Excel (.xlsx)</option>
              <option value="PDF">PDF Summary Statement</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => alert(`Generating and downloading ${dateRange} report in ${selectedFormat} format...`)}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950/40 cursor-pointer h-9"
            >
              <Download size={14} />
              <span>Download Master Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Available Report Catalog */}
      <div className="space-y-3.5">
        <h3 className="text-sm font-bold text-slate-300">Standard Reports Catalog</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTemplates.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between gap-4 shadow-md group ticket-row-hover"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Cadence: {item.frequency}
                  </span>
                  <button
                    onClick={() => alert(`Exporting ${item.title} (${selectedFormat})...`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download size={12} />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
