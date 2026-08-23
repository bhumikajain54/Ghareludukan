import React, { useState } from "react";
import { ArrowLeft, Send, CheckCircle2, AlertOctagon, Phone, Mail, User, ShieldCheck } from "lucide-react";

export default function SupportTicketDetail({
  ticketId,
  tickets = [],
  onUpdateStatus,
  onAddReply,
  onBack,
}) {
  const ticket = tickets.find((t) => t.id === ticketId) || tickets[0];
  const [replyText, setReplyText] = useState("");

  if (!ticket) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p>Ticket not found</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-800 rounded-xl text-xs">
          Return to Queue
        </button>
      </div>
    );
  }

  const handleSend = () => {
    if (!replyText.trim()) return;
    onAddReply?.(ticket.id, replyText);
    setReplyText("");
  };

  return (
    <div className="space-y-6 gd-rise w-full pb-12">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Tickets</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-400">{ticket.ticketNumber}</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            {ticket.status}
          </span>
        </div>
      </div>

      {/* Ticket Main Info */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-black text-white">{ticket.subject}</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Category: <span className="text-indigo-400 font-bold">{ticket.category}</span> • Priority: <span className="text-amber-400 font-bold">{ticket.priority}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateStatus?.(ticket.id, "RESOLVED")}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              Mark Resolved
            </button>
            <button
              onClick={() => onUpdateStatus?.(ticket.id, "ESCALATED")}
              className="px-3 py-2 rounded-xl bg-rose-600/20 border border-rose-500/30 text-rose-300 font-bold text-xs cursor-pointer"
            >
              Escalate to L3
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <User size={13} className="text-indigo-400" />
            <span>{ticket.userName} ({ticket.userType})</span>
          </div>
          {ticket.userPhone && (
            <div className="flex items-center gap-1.5 text-slate-300">
              <Phone size={13} className="text-indigo-400" />
              <span>{ticket.userPhone}</span>
            </div>
          )}
          {ticket.orderId && (
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="font-bold text-slate-400">Order:</span>
              <span className="font-mono text-cyan-400 font-bold">{ticket.orderId}</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-black text-white">Conversation History</h2>

        <div className="space-y-3">
          {ticket.messages?.map((msg) => {
            const isSupport = msg.role === "SUPPORT" || msg.role === "SYSTEM";
            return (
              <div
                key={msg.id}
                className={`p-4 rounded-2xl max-w-xl ${
                  isSupport
                    ? "ml-auto bg-indigo-950/40 border border-indigo-500/30 text-indigo-100"
                    : "mr-auto bg-slate-800 border border-slate-700/80 text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className={isSupport ? "text-indigo-300" : "text-slate-300"}>{msg.sender}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                </div>
                <p className="text-xs leading-relaxed">{msg.text}</p>
              </div>
            );
          })}
        </div>

        {/* Reply Box */}
        <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type customer reply or internal note..."
            className="flex-1 p-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-400 font-medium"
          />
          <button
            type="button"
            onClick={handleSend}
            className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-md shadow-indigo-600/30 transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
