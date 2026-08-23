import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar, { AdminBottomNav } from "./AdminSidebar";
import AdminDashboard from "./dashboard/AdminDashboard";
import AdminShopApprovals from "./shops/AdminShopApprovals";
import AdminShopReview from "./shops/AdminShopReview";
import AdminApprovedShops from "./shops/AdminApprovedShops";
import AdminDeliveryApprovals from "./delivery/AdminDeliveryApprovals";
import AdminFraudDashboard from "./fraud/AdminFraudDashboard";
import AdminAuditLogs from "./audit/AdminAuditLogs";
import AdminReports from "./reports/AdminReports";
import AdminOrders from "./orders/AdminOrders";
import AdminSettlements from "./settlements/AdminSettlements";
import AdminNotifications from "./notifications/AdminNotifications";
import AdminSettings from "./profile/AdminSettings";
import {
  MOCK_ADMIN_METRICS,
  MOCK_PENDING_SHOPS,
  MOCK_APPROVED_SHOPS,
  MOCK_PENDING_DELIVERY_PARTNERS,
  MOCK_FRAUD_ALERTS,
  MOCK_AUDIT_LOGS,
  MOCK_ADMIN_NOTIFICATIONS,
} from "./AdminConstants";

export default function AdminApp({
  user,
  onLogout,
  darkMode = false,
  onToggleTheme,
}) {
  const [view, setView] = useState(() => {
    try {
      return localStorage.getItem("ghareludukan_admin_view") || "dashboard";
    } catch {
      return "dashboard";
    }
  });

  const [pendingShops, setPendingShops] = useState(() => {
    try {
      const saved = localStorage.getItem("ghareludukan_admin_pending_shops");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return MOCK_PENDING_SHOPS;
  });

  const [approvedShops, setApprovedShops] = useState(() => {
    try {
      const saved = localStorage.getItem("ghareludukan_admin_approved_shops");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return MOCK_APPROVED_SHOPS;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem("ghareludukan_admin_audit_logs");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return MOCK_AUDIT_LOGS;
  });

  const [selectedShopId, setSelectedShopId] = useState(() => {
    try {
      return localStorage.getItem("ghareludukan_admin_selected_shop") || null;
    } catch {
      return null;
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_admin_view", view);
    } catch {}
  }, [view]);

  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_admin_pending_shops", JSON.stringify(pendingShops));
    } catch {}
  }, [pendingShops]);

  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_admin_approved_shops", JSON.stringify(approvedShops));
    } catch {}
  }, [approvedShops]);

  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_admin_audit_logs", JSON.stringify(auditLogs));
    } catch {}
  }, [auditLogs]);

  useEffect(() => {
    try {
      if (selectedShopId) {
        localStorage.setItem("ghareludukan_admin_selected_shop", selectedShopId);
      } else {
        localStorage.removeItem("ghareludukan_admin_selected_shop");
      }
    } catch {}
  }, [selectedShopId]);

  const navigate = (targetView) => {
    if (targetView === "_logout") {
      onLogout?.();
      return;
    }
    setView(targetView);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addAuditEntry = (action, objectType, objectId, objectName, prevStatus, newStatus, reason) => {
    const newEntry = {
      id: `AUD-${Date.now()}`,
      timestamp: "Just now",
      actor: user?.name || "Admin (Compliance Lead)",
      role: "ADMIN",
      action,
      objectType,
      objectId,
      objectName,
      previousStatus: prevStatus,
      newStatus,
      reason,
      ipAddress: "103.21.144.18",
      correlationId: `CORR-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const handleApproveShop = (shopId, reason) => {
    const shop = pendingShops.find((s) => s.id === shopId);
    if (!shop) return;

    setPendingShops((prev) => prev.filter((s) => s.id !== shopId));
    setApprovedShops((prev) => [
      {
        id: shop.id,
        shopName: shop.shopName,
        ownerName: shop.ownerName,
        phone: shop.phone,
        category: shop.category,
        rating: 5.0,
        reviewsCount: 0,
        activeProductsCount: 10,
        totalOrders: 0,
        status: "APPROVED",
        operatingStatus: "ONLINE",
        approvedDate: "Today",
        address: shop.address,
      },
      ...prev,
    ]);

    addAuditEntry(
      "SHOP_VERIFICATION_APPROVED",
      "SHOP",
      shop.id,
      shop.shopName,
      shop.status,
      "APPROVED",
      reason
    );
  };

  const handleRejectShop = (shopId, reason) => {
    const shop = pendingShops.find((s) => s.id === shopId);
    if (!shop) return;

    setPendingShops((prev) => prev.filter((s) => s.id !== shopId));
    addAuditEntry(
      "SHOP_VERIFICATION_REJECTED",
      "SHOP",
      shop.id,
      shop.shopName,
      shop.status,
      "REJECTED",
      reason
    );
  };

  const handleRequestCorrection = (shopId, note) => {
    const shop = pendingShops.find((s) => s.id === shopId);
    if (!shop) return;

    setPendingShops((prev) =>
      prev.map((s) => (s.id === shopId ? { ...s, status: "CORRECTION_REQUIRED", correctionNote: note } : s))
    );

    addAuditEntry(
      "SHOP_CORRECTION_REQUESTED",
      "SHOP",
      shop.id,
      shop.shopName,
      shop.status,
      "CORRECTION_REQUIRED",
      note
    );
  };

  const handleSuspendShop = (shopId, reason) => {
    const shop = approvedShops.find((s) => s.id === shopId) || pendingShops.find((s) => s.id === shopId);
    if (!shop) return;

    setApprovedShops((prev) =>
      prev.map((s) => (s.id === shopId ? { ...s, status: "SUSPENDED" } : s))
    );

    addAuditEntry(
      "SHOP_SUSPENDED",
      "SHOP",
      shop.id,
      shop.shopName,
      shop.status,
      "SUSPENDED",
      reason
    );
  };

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return (
          <AdminDashboard
            metrics={{
              ...MOCK_ADMIN_METRICS,
              pendingShopApprovals: pendingShops.length,
              approvedShops: approvedShops.length,
            }}
            pendingShops={pendingShops}
            onNav={navigate}
            onSelectShop={(id) => {
              setSelectedShopId(id);
              navigate("shop-review");
            }}
          />
        );
      case "shop-approvals":
        return (
          <AdminShopApprovals
            pendingShops={pendingShops}
            onNav={navigate}
            onSelectShop={(id) => {
              setSelectedShopId(id);
              navigate("shop-review");
            }}
          />
        );
      case "shop-review":
        return (
          <AdminShopReview
            shopId={selectedShopId}
            pendingShops={pendingShops}
            onApprove={handleApproveShop}
            onReject={handleRejectShop}
            onRequestCorrection={handleRequestCorrection}
            onSuspend={handleSuspendShop}
            onBack={() => navigate("shop-approvals")}
          />
        );
      case "approved-shops":
        return <AdminApprovedShops shops={approvedShops} onNav={navigate} />;
      case "delivery-approvals":
        return <AdminDeliveryApprovals onNav={navigate} />;
      case "fraud-investigation":
        return <AdminFraudDashboard onNav={navigate} />;
      case "audit-logs":
        return <AdminAuditLogs logs={auditLogs} onNav={navigate} />;
      case "reports":
        return <AdminReports onNav={navigate} />;
      case "orders":
        return <AdminOrders onNav={navigate} />;
      case "settlements":
        return <AdminSettlements onNav={navigate} />;
      case "notifications":
        return <AdminNotifications onNav={navigate} />;
      case "settings":
        return <AdminSettings onNav={navigate} />;
      default:
        return (
          <AdminDashboard
            metrics={MOCK_ADMIN_METRICS}
            pendingShops={pendingShops}
            onNav={navigate}
            onSelectShop={(id) => {
              setSelectedShopId(id);
              navigate("shop-review");
            }}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      <AdminSidebar
        view={view}
        onNav={navigate}
        metrics={{
          pendingShopApprovals: pendingShops.length,
          pendingDeliveryApprovals: 2,
          fraudAlertsCount: 3,
        }}
        unreadNotifs={3}
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader
          unreadNotifs={3}
          onNav={navigate}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          darkMode={darkMode}
          onToggleTheme={onToggleTheme}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-8">
            {renderView()}
          </div>
        </main>

        <AdminBottomNav
          view={view}
          onNav={navigate}
          pendingCount={pendingShops.length}
        />
      </div>
    </div>
  );
}
