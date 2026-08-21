import React, { useState } from "react";
import {
  Headphones, Plus, MessageSquare, Clock, CheckCircle2,
  ChevronRight, Send, ArrowLeft, ShieldAlert,
} from "lucide-react";
import {
  MOCK_TICKETS,
  TICKET_STATUS_COLOR,
  PRIORITY_COLOR,
} from "../CustomerConstants";

export default function CustomerSupport({ onNav }) {
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("Order");
  const [newOrderId, setNewOrderId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [replyText, setReplyText] = useState("");

  const activeTicket = tickets.find((t) => t.id === selectedTicketId);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newSubject || !newMessage) return;

    const newTkt = {
      id: `TKT-C${Math.floor(100 + Math.random() * 900)}`,
      subject: newSubject,
      category: newCategory,
      relatedOrder: newOrderId || "N/A",
      priority: "NORMAL",
      status: "OPEN",
      created: "Today, Just now",
      updated: "Just now",
      messages: [
        {
          from: "customer",
          text: newMessage,
          time: "Just now",
        },
        {
          from: "support",
          text: "Thank you for reaching out to Ghareludukan Support. An agent will review your issue shortly.",
          time: "Just now",
        },
      ],
    };

    setTickets([newTkt, ...tickets]);
    setShowNewModal(false);
    setNewSubject("");
    setNewMessage("");
    setNewOrderId("");
    setSelectedTicketId(newTkt.id);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !activeTicket) return;

    const updated = {
      ...activeTicket,
      updated: "Just now",
      messages: [
        ...activeTicket.messages,
        {
          from: "customer",
          text: replyText.trim(),
          time: "Just now",
        },
      ],
    };

    setTickets(tickets.map((t) => (t.id === activeTicket.id ? updated : t)));
    setReplyText("");
  };

  return (
    <div className="gd-rise space-y-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">Support Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Resolve issues regarding orders, delivery, refunds & shops
          </p>
        </div>
        {!selectedTicketId && (
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-950 transition-all gd-tap"
          >
            <Plus size={15} />
            <span>Raise Ticket</span>
          </button>
        )}
      </div>

      {/* Ticket Detail Thread View */}
      {activeTicket ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedTicketId(null)}
            className="text-xs text-cyan-400 font-bold hover:underline flex items-center gap-1"
          >
            <ArrowLeft size={13} />
            <span>Back to all tickets</span>
          </button>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {activeTicket.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                      TICKET_STATUS_COLOR[activeTicket.status]
                    }`}
                  >
                    {activeTicket.status}
                  </span>
                </div>
                <h2 className="text-base font-bold text-white mt-1">
                  {activeTicket.subject}
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Category: {activeTicket.category} · Related:{" "}
                  {activeTicket.relatedOrder}
                </div>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Created: {activeTicket.created}
              </div>
            </div>

            {/* Conversation list */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {activeTicket.messages.map((msg, i) => {
                const isCust = msg.from === "customer";
                return (
                  <div
                    key={i}
                    className={`flex ${isCust ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3.5 space-y-1 ${
                        isCust
                          ? "bg-cyan-600/20 border border-cyan-500/40 text-slate-100 rounded-tr-none"
                          : "bg-slate-800 border border-slate-700/60 text-slate-200 rounded-tl-none"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 text-[10px] text-slate-400 font-bold">
                        <span>
                          {isCust ? "You" : "Ghareludukan Support Agent"}
                        </span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="text-xs leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Input */}
            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendReply()}
                placeholder="Type your message to support..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500/50"
              />
              <button
                onClick={handleSendReply}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 text-white font-bold text-xs hover:bg-cyan-400 flex items-center gap-1.5 transition-all shadow-md shadow-cyan-950"
              >
                <Send size={13} />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Ticket List */
        <div className="space-y-3">
          {tickets.map((tkt) => (
            <button
              key={tkt.id}
              onClick={() => setSelectedTicketId(tkt.id)}
              className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all text-left flex items-center justify-between gap-3 group gd-tap"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {tkt.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                      TICKET_STATUS_COLOR[tkt.status]
                    }`}
                  >
                    {tkt.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {tkt.category}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100 truncate">
                  {tkt.subject}
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {tkt.messages[tkt.messages.length - 1]?.text}
                </div>
              </div>
              <ChevronRight
                size={17}
                className="text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0"
              />
            </button>
          ))}
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowNewModal(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white">
                Raise Support Request
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none"
                >
                  <option value="Order">Order Issue</option>
                  <option value="Delivery">Delivery Partner Delay</option>
                  <option value="Refund">Refund / Payment</option>
                  <option value="Product">Quality / Damaged Product</option>
                  <option value="Other">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  Subject / Summary
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Order arrived with missing item"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  Related Order ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. GLD20512"
                  value={newOrderId}
                  onChange={(e) => setNewOrderId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  Describe the issue
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide all details so our team can assist swiftly..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold shadow-md shadow-cyan-950 transition-all"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
