import React, { useState, useEffect } from "react";
import SupportHeader from "./SupportHeader";
import SupportSidebar, { SupportBottomNav } from "./SupportSidebar";
import SupportDashboard from "./dashboard/SupportDashboard";
import SupportTickets from "./tickets/SupportTickets";
import SupportTicketDetail from "./tickets/SupportTicketDetail";
import SupportEscalations from "./escalations/SupportEscalations";
import SupportReports from "./reports/SupportReports";
import SupportProfile from "./profile/SupportProfile";
import SupportSettings from "./profile/SupportSettings";
import { MOCK_SUPPORT_TICKETS } from "./SupportConstants";

export default function SupportApp({
  user,
  onLogout,
  darkMode = false,
  onToggleTheme,
}) {
  const [view, setView] = useState(() => {
    try {
      return localStorage.getItem("ghareludukan_support_view") || "dashboard";
    } catch {
      return "dashboard";
    }
  });

  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem("ghareludukan_support_tickets");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return MOCK_SUPPORT_TICKETS;
  });

  const [selectedTicketId, setSelectedTicketId] = useState(() => {
    try {
      return localStorage.getItem("ghareludukan_support_selected_ticket") || null;
    } catch {
      return null;
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_support_view", view);
    } catch {}
  }, [view]);

  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_support_tickets", JSON.stringify(tickets));
    } catch {}
  }, [tickets]);

  useEffect(() => {
    try {
      if (selectedTicketId) {
        localStorage.setItem("ghareludukan_support_selected_ticket", selectedTicketId);
      } else {
        localStorage.removeItem("ghareludukan_support_selected_ticket");
      }
    } catch {}
  }, [selectedTicketId]);

  const navigate = (targetView) => {
    if (targetView === "_logout") {
      onLogout?.();
      return;
    }
    setView(targetView);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateStatus = (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
  };

  const handleAddReply = (ticketId, text) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const newMsg = {
          id: `msg-${Date.now()}`,
          sender: user?.name || "Support Lead",
          role: "SUPPORT",
          text,
          time: "Just now",
        };
        return {
          ...t,
          messages: [...(t.messages || []), newMsg],
        };
      })
    );
  };

  const openTicketsCount = tickets.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS").length;

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return (
          <SupportDashboard
            onNav={navigate}
            onSelectTicket={(id) => {
              setSelectedTicketId(id);
              navigate("ticket-detail");
            }}
          />
        );
      case "tickets":
        return (
          <SupportTickets
            tickets={tickets}
            onNav={navigate}
            onSelectTicket={(id) => {
              setSelectedTicketId(id);
              navigate("ticket-detail");
            }}
          />
        );
      case "ticket-detail":
        return (
          <SupportTicketDetail
            ticketId={selectedTicketId}
            tickets={tickets}
            onUpdateStatus={handleUpdateStatus}
            onAddReply={handleAddReply}
            onBack={() => navigate("tickets")}
          />
        );
      case "escalations":
        return (
          <SupportEscalations
            onNav={navigate}
            onSelectTicket={(id) => {
              setSelectedTicketId(id);
              navigate("ticket-detail");
            }}
          />
        );
      case "reports":
        return <SupportReports onNav={navigate} />;
      case "profile":
        return <SupportProfile user={user} onNav={navigate} />;
      case "settings":
        return <SupportSettings onNav={navigate} />;
      default:
        return (
          <SupportDashboard
            onNav={navigate}
            onSelectTicket={(id) => {
              setSelectedTicketId(id);
              navigate("ticket-detail");
            }}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      <SupportSidebar
        view={view}
        onNav={navigate}
        openTickets={openTicketsCount}
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <SupportHeader
          onNav={navigate}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          darkMode={darkMode}
          onToggleTheme={onToggleTheme}
          supportName={user?.name || "Neha Rathore (Support Lead)"}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-8">
            {renderView()}
          </div>
        </main>

        <SupportBottomNav
          view={view}
          onNav={navigate}
          openTickets={openTicketsCount}
        />
      </div>
    </div>
  );
}
