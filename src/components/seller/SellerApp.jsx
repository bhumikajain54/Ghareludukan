import React, { useState, useEffect } from "react";
import SellerSidebar, { SellerBottomNav } from "./SellerSidebar";
import SellerHeader from "./SellerHeader";

import SellerDashboard from "./dashboard/SellerDashboard";
import SellerOrders from "./orders/SellerOrders";
import SellerOrderDetail from "./orders/SellerOrderDetail";
import SellerProducts from "./products/SellerProducts";
import SellerAddProduct from "./products/SellerAddProduct";
import SellerInventory from "./inventory/SellerInventory";
import SellerOffers from "./offers/SellerOffers";
import SellerCustomers from "./customers/SellerCustomers";
import SellerAnalytics from "./analytics/SellerAnalytics";
import SellerReports from "./analytics/SellerReports";
import SellerSettlements from "./settlements/SellerSettlements";
import SellerTransactions from "./settlements/SellerTransactions";
import SellerInvoices from "./settlements/SellerInvoices";
import SellerReviews from "./reviews/SellerReviews";
import SellerNotifications from "./notifications/SellerNotifications";
import SellerSupport from "./support/SellerSupport";
import SellerProfile from "./profile/SellerProfile";
import SellerSettings from "./profile/SellerSettings";
import { MOCK_SELLER_NOTIFICATIONS, MOCK_NOTIFICATIONS, MOCK_ORDERS } from "./SellerConstants";

export default function SellerApp({
  user,
  orders = MOCK_ORDERS,
  onUpdateOrderStatus,
  onLogout,
  darkMode = false,
  onToggleTheme,
}) {
  const [view, setView] = useState(() => {
    try {
      return localStorage.getItem("ghareludukan_seller_view") || "dashboard";
    } catch (e) {
      return "dashboard";
    }
  });
  const [prevView, setPrevView] = useState(null);
  
  const [shopOnline, setShopOnline] = useState(() => {
    try {
      const saved = localStorage.getItem("ghareludukan_seller_shop_online");
      return saved !== null ? saved === "true" : true;
    } catch (e) {
      return true;
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Single Source of Truth for Seller Notifications with persistence
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("ghareludukan_seller_notifications");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load seller notifications:", e);
    }
    return MOCK_SELLER_NOTIFICATIONS || MOCK_NOTIFICATIONS;
  });

  // Sync notifications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_seller_notifications", JSON.stringify(notifications));
    } catch (e) {
      console.error("Failed to persist seller notifications:", e);
    }
  }, [notifications]);

  // Sync view to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_seller_view", view);
    } catch (e) {
      console.error("Failed to persist seller view:", e);
    }
  }, [view]);

  // Sync shopOnline to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_seller_shop_online", shopOnline ? "true" : "false");
    } catch (e) {
      console.error("Failed to persist shop online status:", e);
    }
  }, [shopOnline]);

  const [openOrderId, setOpenOrderId] = useState(() => {
    try {
      return localStorage.getItem("ghareludukan_seller_order_id") || null;
    } catch (e) {
      return null;
    }
  });

  const [editProductId, setEditProductId] = useState(() => {
    try {
      return localStorage.getItem("ghareludukan_seller_edit_product_id") || null;
    } catch (e) {
      return null;
    }
  });

  // Sync order/product selections
  useEffect(() => {
    try {
      if (openOrderId) {
        localStorage.setItem("ghareludukan_seller_order_id", openOrderId);
      } else {
        localStorage.removeItem("ghareludukan_seller_order_id");
      }
    } catch (e) {}
  }, [openOrderId]);

  useEffect(() => {
    try {
      if (editProductId) {
        localStorage.setItem("ghareludukan_seller_edit_product_id", editProductId);
      } else {
        localStorage.removeItem("ghareludukan_seller_edit_product_id");
      }
    } catch (e) {}
  }, [editProductId]);

  // Derived Dynamic Counters
  const unreadNotifs = notifications.filter((n) => !n.isRead && n.unread !== false).length;
  const newOrdersCount = orders.filter((o) => o.status === "PLACED" || o.status === "NEW").length;

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true, unread: false } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true, unread: false }))
    );
  };

  const navigate = (targetView) => {
    if (targetView === "_logout") {
      onLogout?.();
      return;
    }
    // Mobile "more" tab → go to offers
    if (targetView === "more") {
      setView("offers");
      return;
    }
    setPrevView(view);
    setView(targetView);
    // Close mobile sidebar
    setIsSidebarOpen(false);
  };

  const openOrder = (id) => {
    setOpenOrderId(id);
    setView("order-detail");
  };

  const openAddProduct = () => {
    setEditProductId(null);
    setView("add-product");
  };

  const openEditProduct = (id) => {
    setEditProductId(id);
    setView("add-product");
  };

  const goBack = () => {
    if (prevView) {
      setView(prevView);
      setPrevView(null);
    } else {
      setView("dashboard");
    }
  };

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return (
          <SellerDashboard
            orders={orders}
            onUpdateOrderStatus={onUpdateOrderStatus}
            onNav={navigate}
            onOpenOrder={openOrder}
          />
        );
      case "orders":
        return (
          <SellerOrders
            orders={orders}
            onUpdateOrderStatus={onUpdateOrderStatus}
            onOpenOrder={openOrder}
          />
        );
      case "order-detail":
        return (
          <SellerOrderDetail
            orders={orders}
            orderId={openOrderId}
            onUpdateOrderStatus={onUpdateOrderStatus}
            onBack={() => setView("orders")}
          />
        );
      case "products":
        return (
          <SellerProducts
            onAddProduct={openAddProduct}
            onEditProduct={openEditProduct}
          />
        );
      case "add-product":
        return (
          <SellerAddProduct
            onBack={() => setView("products")}
            editProduct={editProductId ? { id: editProductId } : null}
          />
        );
      case "inventory":
        return <SellerInventory />;
      case "offers":
        return <SellerOffers />;
      case "customers":
        return <SellerCustomers />;
      case "analytics":
        return <SellerAnalytics onNav={navigate} />;
      case "reports":
        return <SellerReports onNav={navigate} />;
      case "settlements":
        return <SellerSettlements onNav={navigate} />;
      case "transactions":
        return <SellerTransactions onNav={navigate} />;
      case "invoices":
        return <SellerInvoices onNav={navigate} />;
      case "reviews":
        return <SellerReviews onNav={navigate} />;
      case "notifications":
        return (
          <SellerNotifications
            notifications={notifications}
            unreadCount={unreadNotifs}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllRead={handleMarkAllRead}
            onNav={navigate}
          />
        );
      case "support":
        return <SellerSupport onNav={navigate} />;
      case "shop-profile":
        return (
          <SellerProfile
            shopOnline={shopOnline}
            onToggleShop={setShopOnline}
            onNav={navigate}
          />
        );
      case "settings":
        return <SellerSettings onNav={navigate} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-slate-600 gd-rise">
            <div className="text-sm font-bold">Page not found</div>
            <button
              onClick={() => navigate("dashboard")}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-sm font-semibold hover:bg-slate-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <SellerSidebar
        view={view}
        onNav={navigate}
        pendingOrders={newOrdersCount}
        unreadNotifs={unreadNotifs}
        onLogout={onLogout}
        shopOnline={shopOnline}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <SellerHeader
          shopOnline={shopOnline}
          onToggleShop={() => setShopOnline((p) => !p)}
          unreadNotifs={unreadNotifs}
          onNav={navigate}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          darkMode={darkMode}
          onToggleTheme={onToggleTheme}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-8">
            {renderView()}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <SellerBottomNav
          view={view}
          onNav={navigate}
          pendingOrders={newOrdersCount}
        />
      </div>
    </div>
  );
}
