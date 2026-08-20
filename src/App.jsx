import React, { useState, useEffect } from "react";
import Auth from "./components/auth/Auth";
import SellerApp from "./components/seller/SellerApp";
import CustomerApp from "./components/customer/CustomerApp";

import { MOCK_ORDERS } from "./data/mockData";

export function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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

  // Sync master orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ghareludukan_orders", JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to persist orders:", e);
    }
  }, [orders]);

  useEffect(() => {
    if (!darkMode) {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [darkMode]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
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

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  // Seller Dashboard / Merchant Portal
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

  // Customer Hyperlocal Marketplace Portal
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
}

export default App;
