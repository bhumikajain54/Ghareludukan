import React, { useState, useEffect } from "react";
import Auth from "./components/auth/Auth";
import SellerApp from "./components/seller/SellerApp";
import CustomerApp from "./components/customer/CustomerApp";
import DeliveryApp from "./components/delivery/DeliveryApp";
import AdminApp from "./components/admin/AdminApp";
import SupportApp from "./components/support/SupportApp";

import { MOCK_ORDERS } from "./data/mockData";

export function App() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("ghareludukan_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Failed to load user from storage:", e);
      return null;
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("ghareludukan_darkmode") === "true";
    } catch (e) {
      return false;
    }
  });


  // Single Source of Truth for Orders across Customer & Seller Portals
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("ghareludukan_orders");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load orders from storage:", e);
    }
    return MOCK_ORDERS;
  });

  // URL Query Param Role Detection (?role=admin | delivery | support | seller | customer)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlRole = params.get("role");
      if (urlRole) {
        const normalized = urlRole.toLowerCase();
        const roleMap = {
          customer: { phone: "+91 98765 43210", role: "customer", name: "Bhumika Jain" },
          seller: { phone: "+91 98291 44556", role: "seller", name: "Rajesh Agarwal" },
          delivery: { phone: "+91 98290 11223", role: "delivery", name: "Vikram Singh" },
          admin: { phone: "+91 98290 00001", role: "admin", name: "Sanjay Saxena (Admin)" },
          support: { phone: "+91 98290 00002", role: "support", name: "Neha Rathore (Support Lead)" },
        };
        if (roleMap[normalized]) {
          localStorage.setItem("ghareludukan_user", JSON.stringify(roleMap[normalized]));
          setUser(roleMap[normalized]);
        }
      }
    } catch (e) {
      console.error("URL role parse error:", e);
    }
  }, []);

  // Sync master orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_orders", JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to persist orders:", e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_darkmode", darkMode ? "true" : "false");
    } catch (e) {
      console.error("Failed to persist theme:", e);
    }
    if (!darkMode) {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [darkMode]);

  const handleLogin = (userData) => {
    try {
      localStorage.setItem("ghareludukan_user", JSON.stringify(userData));
    } catch (e) {
      console.error("Failed to persist user session:", e);
    }
    setUser(userData);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("ghareludukan_user");
      localStorage.removeItem("ghareludukan_seller_view");
      localStorage.removeItem("ghareludukan_customer_view");
      localStorage.removeItem("ghareludukan_delivery_view");
      localStorage.removeItem("ghareludukan_admin_view");
      localStorage.removeItem("ghareludukan_support_view");
      localStorage.removeItem("ghareludukan_customer_shop_id");
      localStorage.removeItem("ghareludukan_customer_product_id");
      localStorage.removeItem("ghareludukan_customer_order_id");
      localStorage.removeItem("ghareludukan_seller_order_id");
      localStorage.removeItem("ghareludukan_seller_edit_product_id");
    } catch (e) {
      console.error("Failed to clear user session:", e);
    }
    setUser(null);
  };

  const handleUpdateOrderStatus = (orderId, newStatus, extraData = {}) => {
    const timeStamp = "Just now";
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const updatedTimeline = order.timeline
          ? order.timeline.map((step) => {
              if (step.status === newStatus) {
                return { ...step, done: true, time: timeStamp };
              }
              return step;
            })
          : [];

        const updatedHistory = [
          ...(order.history || []),
          { status: newStatus, time: timeStamp, ...extraData },
        ];

        return {
          ...order,
          status: newStatus,
          timeline: updatedTimeline,
          history: updatedHistory,
          ...(newStatus === "DELIVERED" ? { canReturn: true, canReview: true, canCancel: false } : {}),
          ...(newStatus === "CANCELLED" || newStatus === "REJECTED"
            ? {
                canCancel: false,
                paymentStatus: order.paymentStatus === "PAID" ? "REFUNDED" : "CANCELLED",
                ...extraData,
              }
            : {}),
          ...extraData,
        };
      })
    );
  };

  const handlePlaceOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const renderRolePortal = () => {
    if (!user) {
      return <Auth onLogin={handleLogin} />;
    }

    // Role 2: Seller Dashboard / Merchant Portal
    if (user.role === "seller") {
      return (
        <SellerApp
          user={user}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />
      );
    }

    // Role 3: Delivery Partner Portal
    if (user.role === "delivery") {
      return (
        <DeliveryApp
          user={user}
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />
      );
    }

    // Role 4: Platform Admin Portal
    if (user.role === "admin") {
      return (
        <AdminApp
          user={user}
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />
      );
    }

    // Role 5: Customer & Merchant Support Desk
    if (user.role === "support") {
      return (
        <SupportApp
          user={user}
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />
      );
    }

    // Role 1: Customer Hyperlocal Marketplace Portal (Default)
    return (
      <CustomerApp
        user={user}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onPlaceOrder={handlePlaceOrder}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />
    );
  };

  return (
    <div className="relative">
      {renderRolePortal()}
    </div>
  );
}

export default App;
