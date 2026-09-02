import React, { useState, useEffect } from "react";
import DeliveryHeader from "./DeliveryHeader";
import DeliverySidebar, { DeliveryBottomNav } from "./DeliverySidebar";
import DeliveryDashboard from "./dashboard/DeliveryDashboard";
import DeliveryJobs from "./jobs/DeliveryJobs";
import DeliveryJobDetail from "./jobs/DeliveryJobDetail";
import DeliveryEarnings from "./earnings/DeliveryEarnings";
import DeliveryPerformance from "./earnings/DeliveryPerformance";
import DeliveryNotifications from "./notifications/DeliveryNotifications";
import DeliveryProfile from "./profile/DeliveryProfile";
import DeliverySettings from "./profile/DeliverySettings";
import DeliverySupport from "./support/DeliverySupport";
import {
  MOCK_DELIVERY_RIDER,
  MOCK_DELIVERY_JOBS,
  MOCK_DELIVERY_NOTIFICATIONS,
} from "./DeliveryConstants";

export default function DeliveryApp({
  user,
  onLogout,
  darkMode = false,
  onToggleTheme,
}) {
  const [view, setView] = useState(() => {
    try {
      return localStorage.getItem("ghareludukan_delivery_view") || "dashboard";
    } catch {
      return "dashboard";
    }
  });

  const [dutyOnline, setDutyOnline] = useState(() => {
    try {
      const saved = localStorage.getItem("ghareludukan_delivery_duty");
      return saved !== null ? saved === "true" : true;
    } catch {
      return true;
    }
  });

  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem("ghareludukan_delivery_jobs");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return MOCK_DELIVERY_JOBS;
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("ghareludukan_delivery_notifications");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return MOCK_DELIVERY_NOTIFICATIONS;
  });

  const [selectedJobId, setSelectedJobId] = useState(() => {
    try {
      return localStorage.getItem("ghareludukan_delivery_job_id") || null;
    } catch {
      return null;
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_delivery_view", view);
    } catch {}
  }, [view]);

  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_delivery_duty", dutyOnline ? "true" : "false");
    } catch {}
  }, [dutyOnline]);

  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_delivery_jobs", JSON.stringify(jobs));
    } catch {}
  }, [jobs]);

  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_delivery_notifications", JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  useEffect(() => {
    try {
      if (selectedJobId) {
        localStorage.setItem("ghareludukan_delivery_job_id", selectedJobId);
      } else {
        localStorage.removeItem("ghareludukan_delivery_job_id");
      }
    } catch {}
  }, [selectedJobId]);

  const unreadNotifs = notifications.filter((n) => !n.isRead).length;
  const availableJobsCount = jobs.filter((j) => j.status === "AVAILABLE").length;

  const navigate = (targetView) => {
    if (targetView === "_logout") {
      onLogout?.();
      return;
    }
    setView(targetView);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateJobStatus = (jobId, newStatus, extraData = {}) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== jobId) return j;
        return {
          ...j,
          status: newStatus,
          ...extraData,
        };
      })
    );
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return (
          <DeliveryDashboard
            rider={MOCK_DELIVERY_RIDER}
            jobs={jobs}
            dutyOnline={dutyOnline}
            onToggleDuty={() => setDutyOnline(!dutyOnline)}
            onNav={navigate}
            onSelectJob={(id) => {
              setSelectedJobId(id);
              navigate("job-detail");
            }}
          />
        );
      case "jobs":
        return (
          <DeliveryJobs
            jobs={jobs}
            onNav={navigate}
            onSelectJob={(id) => {
              setSelectedJobId(id);
              navigate("job-detail");
            }}
          />
        );
      case "job-detail":
        return (
          <DeliveryJobDetail
            jobId={selectedJobId}
            jobs={jobs}
            onUpdateJobStatus={handleUpdateJobStatus}
            onBack={() => navigate("jobs")}
            onNav={navigate}
          />
        );
      case "earnings":
        return <DeliveryEarnings onNav={navigate} />;
      case "performance":
        return <DeliveryPerformance rider={MOCK_DELIVERY_RIDER} onNav={navigate} />;
      case "notifications":
        return (
          <DeliveryNotifications
            notifications={notifications}
            unreadCount={unreadNotifs}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllRead={handleMarkAllRead}
            onNav={navigate}
          />
        );
      case "profile":
        return <DeliveryProfile rider={MOCK_DELIVERY_RIDER} onNav={navigate} />;
      case "settings":
        return <DeliverySettings rider={MOCK_DELIVERY_RIDER} onNav={navigate} />;
      case "support":
        return <DeliverySupport onNav={navigate} />;
      default:
        return (
          <DeliveryDashboard
            rider={MOCK_DELIVERY_RIDER}
            jobs={jobs}
            dutyOnline={dutyOnline}
            onToggleDuty={() => setDutyOnline(!dutyOnline)}
            onNav={navigate}
            onSelectJob={(id) => {
              setSelectedJobId(id);
              navigate("job-detail");
            }}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar for Desktop & Drawer for Mobile */}
      <DeliverySidebar
        view={view}
        onNav={navigate}
        unreadNotifs={unreadNotifs}
        availableJobs={availableJobsCount}
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        riderName={MOCK_DELIVERY_RIDER.name}
        dutyOnline={dutyOnline}
      />

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DeliveryHeader
          dutyOnline={dutyOnline}
          onToggleDuty={() => setDutyOnline(!dutyOnline)}
          unreadNotifs={unreadNotifs}
          onNav={navigate}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          darkMode={darkMode}
          onToggleTheme={onToggleTheme}
          riderName={MOCK_DELIVERY_RIDER.name}
          rating={MOCK_DELIVERY_RIDER.rating}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-8">
            {renderView()}
          </div>
        </main>

        {/* Mobile Bottom Bar */}
        <DeliveryBottomNav
          view={view}
          onNav={navigate}
          availableJobs={availableJobsCount}
        />
      </div>
    </div>
  );
}
