import React, { useState } from "react";
import {
  Plus, X, Send, Paperclip, ChevronRight, Headphones,
  Clock, CheckCircle2,
} from "lucide-react";
import { MOCK_TICKETS, PRIORITY_COLOR, TICKET_STATUS_COLOR } from "../SellerConstants";

const CATEGORIES = [
  "Order Issue", "Payment Issue", "Refund", "Return",
  "Delivery", "Account", "Product", "Technical",
];

function TicketThread({ ticket, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(ticket.messages || []);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { from: "seller", text: message, time: "Just now" }]);
    setMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl gd-rise">
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-slate-800">
          <div className="min-w-0">
            <div className="font-bold text-slate-100 text-sm truncate">{ticket.issue}</div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="font-mono text-[10px] text-slate-600">{ticket.id}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLOR[ticket.priority]}`}>
                {ticket.priority}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TICKET_STATUS_COLOR[ticket.status]}`}>
                {ticket.status}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-500 flex-shrink-0 ml-3">
            <X size={16} />
          </button>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.from === "seller" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                m.from === "seller" ? "bg-indigo-600/20 border border-indigo-500/30" : "bg-slate-700 border border-slate-600"
              }`}>
                <span className="text-xs font-bold text-indigo-400">{m.from === "seller" ? "R" : "S"}</span>
              </div>
              <div className={`flex-1 ${m.from === "seller" ? "items-end" : "items-start"} flex flex-col`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
                  m.from === "seller"
                    ? "bg-indigo-600/20 border border-indigo-500/20 text-slate-200 rounded-tr-sm"
                    : "bg-slate-800 border border-slate-700 text-slate-300 rounded-tl-sm"
                }`}>
                  {m.text}
                </div>
                <div className="text-[10px] text-slate-600 mt-1 px-1">{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        {ticket.status !== "RESOLVED" && ticket.status !== "CLOSED" && (
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-end gap-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message…"
                rows={2}
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />
              <button onClick={handleSend} disabled={!message.trim()}
                className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 transition-colors flex-shrink-0">
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateTicketModal({ onClose, onSave }) {
  const [form, setForm] = useState({ category: "", issue: "", priority: "NORMAL", message: "" });
  const set = (f) => (v) => setForm((p) => ({ ...p, [f]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl gd-rise">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="font-bold text-slate-100">Create Support Ticket</div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-500"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category *</label>
            <select value={form.category} onChange={(e) => set("category")(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Issue Summary *</label>
            <input value={form.issue} onChange={(e) => set("issue")(e.target.value)} placeholder="Brief description of the issue"
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</label>
            <div className="flex gap-2">
              {["LOW", "NORMAL", "HIGH", "CRITICAL"].map((p) => (
                <button key={p} onClick={() => set("priority")(p)}
                  className={`flex-1 py-2 rounded-xl border text-[10px] font-bold transition-all ${
                    form.priority === p ? PRIORITY_COLOR[p] + " border-current" : "bg-slate-800 border-slate-700 text-slate-600"
                  }`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
            <textarea value={form.message} onChange={(e) => set("message")(e.target.value)}
              placeholder="Describe your issue in detail…" rows={3}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none transition-colors" />
          </div>
        </div>
        <div className="px-5 pb-5 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-colors">Cancel</button>
          <button onClick={() => form.category && form.issue && onSave(form)}
            disabled={!form.category || !form.issue}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 disabled:opacity-40 transition-colors">
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SellerSupport() {
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = (form) => {
    const newTicket = {
      id: `TKT-${1046 + tickets.length}`,
      issue: form.issue,
      category: form.category,
      priority: form.priority,
      status: "OPEN",
      created: "Today",
      updated: "Just now",
      messages: form.message ? [{ from: "seller", text: form.message, time: "Just now" }] : [],
    };
    setTickets((p) => [newTicket, ...p]);
    setShowCreate(false);
  };

  return (
    <div className="space-y-5 gd-rise">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Seller Support</h1>
          <p className="text-sm text-slate-500 mt-0.5">Get help with orders, payments, refunds and more.</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors">
          <Plus size={15} /> New Ticket
        </button>
      </div>

      {/* Categories Quick Reference */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setShowCreate(true)}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:bg-indigo-600/5 text-xs font-semibold text-slate-500 hover:text-indigo-400 transition-all text-left">
            {cat}
          </button>
        ))}
      </div>

      {/* Tickets */}
      {tickets.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl text-slate-600">
          <Headphones size={40} className="mx-auto mb-4 opacity-30" />
          <div className="text-sm font-bold">No support tickets</div>
          <div className="text-xs mt-1">Create a ticket if you need help.</div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {tickets.map((ticket, i) => (
            <button key={ticket.id} onClick={() => setSelectedTicket(ticket)}
              className={`w-full text-left flex items-start gap-4 px-5 py-4 hover:bg-slate-800/50 transition-colors ticket-row-hover ${
                i < tickets.length - 1 ? "border-b border-slate-800/60" : ""
              }`}>
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Headphones size={16} className="text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-mono text-[10px] font-bold text-slate-600">{ticket.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLOR[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TICKET_STATUS_COLOR[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-200 truncate">{ticket.issue}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {ticket.category} · Updated {ticket.updated}
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-600 flex-shrink-0 mt-2" />
            </button>
          ))}
        </div>
      )}

      {selectedTicket && (
        <TicketThread ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}
      {showCreate && (
        <CreateTicketModal onClose={() => setShowCreate(false)} onSave={handleCreate} />
      )}
    </div>
  );
}
