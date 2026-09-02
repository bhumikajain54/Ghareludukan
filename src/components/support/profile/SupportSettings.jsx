import React, { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Bell,
  Clock,
  Sliders,
  CheckCircle2,
  Save,
  AlertTriangle,
  LifeBuoy,
  Zap,
  RotateCcw,
  MessageSquare,
} from "lucide-react";

export default function SupportSettings() {
  const [activeTab, setActiveTab] = useState("sla"); // 'sla' | 'routing' | 'notifs' | 'csat'
  const [saved, setSaved] = useState(false);

  // Settings State
  const [l1SlaMins, setL1SlaMins] = useState("15");
  const [l2SlaMins, setL2SlaMins] = useState("45");
  const [autoReassignOverdue, setAutoReassignOverdue] = useState(true);

  const [autoAssignRoundRobin, setAutoAssignRoundRobin] = useState(true);
  const [prioritizeHighValueOrders, setPrioritizeHighValueOrders] = useState(true);
  const [maxTicketsPerAgent, setMaxTicketsPerAgent] = useState("8");

  const [urgentEscalationPush, setUrgentEscalationPush] = useState(true);
  const [emailDailySummary, setEmailDailySummary] = useState(true);

  const [surveyAfterResolve, setSurveyAfterResolve] = useState(true);
  const [flagLowCsat, setFlagLowCsat] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Settings size={24} className="text-indigo-400" />
            <span>Helpdesk Operations & SLA Settings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure ticket SLA targets, round-robin auto-assignment rules, CSAT survey automation, and escalation triggers.
          </p>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold animate-fade-in self-start sm:self-auto">
            <CheckCircle2 size={14} />
            <span>Settings Saved</span>
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: "sla", label: "Resolution SLAs & Targets", icon: Clock },
          { id: "routing", label: "Ticket Routing & Dispatch", icon: Sliders },
          { id: "notifs", label: "Alerts & Notifications", icon: Bell },
          { id: "csat", label: "CSAT & Feedback Automation", icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-6">
        {activeTab === "sla" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Clock size={16} className="text-indigo-400" />
                <span>Ticket Resolution Time Targets (SLA)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Target response and resolution limits for L1 (Customer/Rider Chat) and L2 (Dispute/Refunds).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="font-bold text-slate-200 block">L1 First Response Target (Minutes)</label>
                <p className="text-[11px] text-slate-500">Maximum allowed wait time for first live agent response.</p>
                <input
                  type="number"
                  value={l1SlaMins}
                  onChange={(e) => setL1SlaMins(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="font-bold text-slate-200 block">L2 Escalation Resolution Target (Minutes)</label>
                <p className="text-[11px] text-slate-500">Maximum turnaround for merchant/refund dispute investigations.</p>
                <input
                  type="number"
                  value={l2SlaMins}
                  onChange={(e) => setL2SlaMins(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
            </div>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer text-xs">
              <div>
                <span className="font-bold text-slate-200 block">Auto-Reassign Overdue SLA Tickets</span>
                <span className="text-[11px] text-slate-500">Automatically transfer unaddressed tickets exceeding 15 mins to standby queue</span>
              </div>
              <input
                type="checkbox"
                checked={autoReassignOverdue}
                onChange={(e) => setAutoReassignOverdue(e.target.checked)}
                className="w-4 h-4 rounded-sm accent-indigo-500 cursor-pointer"
              />
            </label>
          </div>
        )}

        {activeTab === "routing" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Sliders size={16} className="text-indigo-400" />
                <span>Ticket Assignment & Load Balancing</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automated workload distribution across available support officers.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Round-Robin Auto Assignment</span>
                  <span className="text-[11px] text-slate-500">Evenly allocate newly arrived customer tickets across all online agents</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoAssignRoundRobin}
                  onChange={(e) => setAutoAssignRoundRobin(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-indigo-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Prioritize High-Value / Express Orders</span>
                  <span className="text-[11px] text-slate-500">Bump tickets for active live deliveries and express cart value (&gt;₹1,000) to top</span>
                </div>
                <input
                  type="checkbox"
                  checked={prioritizeHighValueOrders}
                  onChange={(e) => setPrioritizeHighValueOrders(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-indigo-500 cursor-pointer"
                />
              </label>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="font-bold text-slate-200 block">Max Concurrent Active Tickets Per Agent</label>
                <p className="text-[11px] text-slate-500">Upper cap on simultaneously assigned open tickets per officer.</p>
                <input
                  type="number"
                  value={maxTicketsPerAgent}
                  onChange={(e) => setMaxTicketsPerAgent(e.target.value)}
                  className="w-full sm:w-48 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifs" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Bell size={16} className="text-indigo-400" />
                <span>Helpdesk Alerts & Notification Channels</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure real-time push and email channels for urgent customer escalations.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Instant Push Notifications for Urgent Escalations</span>
                  <span className="text-[11px] text-slate-500">Play audio chime and show browser notification on priority ticket creation</span>
                </div>
                <input
                  type="checkbox"
                  checked={urgentEscalationPush}
                  onChange={(e) => setUrgentEscalationPush(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-indigo-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Daily Shift SLA & CSAT Summary Digest</span>
                  <span className="text-[11px] text-slate-500">Send end-of-shift metrics report to team lead email</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailDailySummary}
                  onChange={(e) => setEmailDailySummary(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-indigo-500 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === "csat" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
                <MessageSquare size={16} className="text-indigo-400" />
                <span>CSAT Survey & Quality Assurance Automation</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically gather feedback from buyers and sellers after issue resolution.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Auto-Dispatch CSAT Survey Upon Resolution</span>
                  <span className="text-[11px] text-slate-500">Prompt customer for 1-5 star rating and comment when ticket is marked RESOLVED</span>
                </div>
                <input
                  type="checkbox"
                  checked={surveyAfterResolve}
                  onChange={(e) => setSurveyAfterResolve(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-indigo-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Flag Low CSAT (&lt;3 Stars) for Quality Audit</span>
                  <span className="text-[11px] text-slate-500">Automatically forward poor customer ratings to the Lead escalation review queue</span>
                </div>
                <input
                  type="checkbox"
                  checked={flagLowCsat}
                  onChange={(e) => setFlagLowCsat(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-indigo-500 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Save size={14} />
            <span>Save Helpdesk Configuration</span>
          </button>
        </div>
      </div>
    </div>
  );
}
