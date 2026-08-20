import React, { useState, useEffect } from "react";
import CustomerSidebar from "./CustomerSidebar";
import CustomerHeader from "./CustomerHeader";
import CustomerBottomNav from "./CustomerBottomNav";

import CustomerHome from "./home/CustomerHome";
import CustomerSearch from "./search/CustomerSearch";
import CustomerShopDetail from "./shops/CustomerShopDetail";
import CustomerProductDetail from "./products/CustomerProductDetail";
import CustomerCart from "./cart/CustomerCart";
import CustomerCheckout from "./checkout/CustomerCheckout";
import CustomerOrders from "./orders/CustomerOrders";
import CustomerOrderDetail from "./orders/CustomerOrderDetail";
import CustomerWishlist from "./wishlist/CustomerWishlist";
import CustomerProfile from "./profile/CustomerProfile";
import CustomerAddressBook from "./profile/CustomerAddressBook";
import CustomerSettings from "./profile/CustomerSettings";
import CustomerWallet from "./profile/CustomerWallet";
import CustomerCoupons from "./profile/CustomerCoupons";
import CustomerNotifications from "./notifications/CustomerNotifications";
import CustomerSupport from "./support/CustomerSupport";
import CustomerTracking from "./tracking/CustomerTracking";

import {
  INITIAL_CART,
  MOCK_NOTIFICATIONS,
  MOCK_CUSTOMER_NOTIFICATIONS,
  MOCK_ORDERS,
} from "./CustomerConstants";

export default function CustomerApp({
  user,
  orders = MOCK_ORDERS,
  onUpdateOrderStatus,
  onPlaceOrder,
  onLogout,
  darkMode = false,
  onToggleTheme,
}) {
  const [view, setView] = useState("home");
  const [prevView, setPrevView] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cart, setCart] = useState(INITIAL_CART);
  
  // Single Source of Truth for Dynamic Notifications with persistence
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("ghareludukan_customer_notifications");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load notifications from storage:", e);
    }
    return MOCK_CUSTOMER_NOTIFICATIONS || MOCK_NOTIFICATIONS;
  });

  // Sync notifications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "ghareludukan_customer_notifications",
        JSON.stringify(notifications)
      );
    } catch (e) {
      console.error("Failed to persist notifications:", e);
    }
  }, [notifications]);

  // Active view payload states
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Derived Dynamic Counts
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const unreadNotifs = notifications.filter(
    (n) => !n.isRead && n.unread !== false
  ).length;
  const activeOrders = orders.filter((o) =>
    [
      "PLACED",
      "NEW",
      "ACCEPTED",
      "PREPARING",
      "PACKED",
      "READY",
      "OUT_FOR_DELIVERY",
    ].includes(o.status)
  ).length;

  // Centralized Notification Handlers
  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, isRead: true, unread: false } : n
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true, unread: false }))
    );
  };

  const handleAddNotification = (newNotif) => {
    setNotifications((prev) => [
      {
        id: `notification-${Date.now()}`,
        time: "Just now",
        timestamp: "Just now",
        isRead: false,
        unread: true,
        ...newNotif,
      },
      ...prev,
    ]);
  };

  const navigate = (targetView, params = {}) => {
    if (targetView === "_logout") {
      onLogout?.();
      return;
    }

    if (params.shopId) setSelectedShopId(params.shopId);
    if (params.productId) setSelectedProductId(params.productId);
    if (params.orderId) setSelectedOrderId(params.orderId);

    setPrevView(view);
    setView(targetView);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === (product.productId || product.id)
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === existing.productId
            ? { ...item, qty: item.qty + (product.qty || 1) }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id || product.productId,
          name: product.name,
          shopName: product.shopName,
          shopId: product.shopId,
          price: product.price,
          qty: product.qty || 1,
          unit: product.unit,
          available: true,
        },
      ];
    });
  };

  const handleQtyChange = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleMoveToWishlist = (productId) => {
    handleRemoveCartItem(productId);
    navigate("wishlist");
  };

  const handleOrderPlaced = (newOrderId) => {
    const placedOrder = {
      id: newOrderId,
      shopId: "sh1",
      shopName: "Raj Traders",
      items: [...cart],
      subtotal: cart.reduce((s, i) => s + i.price * i.qty, 0),
      discount: 0,
      deliveryFee: 0,
      tax: 20,
      total: cart.reduce((s, i) => s + i.price * i.qty, 0) + 20,
      payment: "UPI",
      paymentStatus: "PAID",
      status: "PLACED",
      placedAt: "Just now",
      deliveryEta: "20–25 min",
      address: {
        recipient: user?.name || "Bhumika Jain",
        line1: "Sector 7",
        line2: "Jaipur",
        city: "Jaipur",
        pincode: "302017",
      },
      timeline: [
        { status: "PLACED", label: "Order Placed", time: "Just now", done: true },
        { status: "ACCEPTED", label: "Accepted by Shop", time: "", done: false },
        { status: "PREPARING", label: "Being Prepared", time: "", done: false },
        { status: "OUT_FOR_DELIVERY", label: "Out for Delivery", time: "", done: false },
        { status: "DELIVERED", label: "Delivered", time: "", done: false },
      ],
      canCancel: true,
      canReturn: false,
      canReview: false,
    };

    if (onPlaceOrder) {
      onPlaceOrder(placedOrder);
    }
    setCart([]);
    handleAddNotification({
      title: `Order Placed Successfully! 🎉`,
      message: `Your order #${newOrderId} from Raj Traders has been received.`,
      body: `Your order #${newOrderId} from Raj Traders has been received.`,
      type: "order",
      link: "orders",
    });
  };

  const renderView = () => {
    switch (view) {
      case "home":
        return (
          <CustomerHome
            onNav={navigate}
            onAddToCart={handleAddToCart}
            recentOrders={orders}
          />
        );

      case "search":
      case "categories":
        return (
          <CustomerSearch
            onNav={navigate}
            onAddToCart={handleAddToCart}
          />
        );

      case "shop-detail":
      case "shops":
        return (
          <CustomerShopDetail
            shopId={selectedShopId}
            onNav={navigate}
            onAddToCart={handleAddToCart}
          />
        );

      case "product-detail":
        return (
          <CustomerProductDetail
            productId={selectedProductId}
            onNav={navigate}
            onAddToCart={handleAddToCart}
          />
        );

      case "cart":
        return (
          <CustomerCart
            cart={cart}
            onNav={navigate}
            onQtyChange={handleQtyChange}
            onRemove={handleRemoveCartItem}
            onMoveToWishlist={handleMoveToWishlist}
          />
        );

      case "checkout":
        return (
          <CustomerCheckout
            onNav={navigate}
            onOrderPlaced={handleOrderPlaced}
          />
        );

      case "orders":
        return <CustomerOrders orders={orders} onNav={navigate} />;

      case "order-detail":
      case "order-confirm":
        return (
          <CustomerOrderDetail
            orders={orders}
            orderId={selectedOrderId}
            onUpdateOrderStatus={onUpdateOrderStatus}
            onNav={navigate}
          />
        );

      case "order-tracking":
        return (
          <CustomerTracking
            orders={orders}
            orderId={selectedOrderId}
            onNav={navigate}
          />
        );

      case "wishlist":
      case "saved-shops":
        return (
          <CustomerWishlist
            onNav={navigate}
            onAddToCart={handleAddToCart}
          />
        );

      case "profile":
        return (
          <CustomerProfile
            user={user}
            onNav={navigate}
            onLogout={onLogout}
          />
        );

      case "addresses":
      case "location":
      case "add-address":
        return <CustomerAddressBook onNav={navigate} />;

      case "settings":
        return (
          <CustomerSettings
            onNav={navigate}
            onLogout={onLogout}
          />
        );

      case "wallet":
        return <CustomerWallet onNav={navigate} />;

      case "coupons":
        return <CustomerCoupons onNav={navigate} />;

      case "notifications":
        return (
          <CustomerNotifications
            notifications={notifications}
            unreadCount={unreadNotifs}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllRead={handleMarkAllRead}
            onNav={navigate}
          />
        );

      case "support":
        return <CustomerSupport onNav={navigate} />;

      default:
        return (
          <CustomerHome
            onNav={navigate}
            onAddToCart={handleAddToCart}
            recentOrders={orders}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden selection:bg-cyan-500 selection:text-white">
      {/* Sidebar (Desktop & Mobile drawer) */}
      <CustomerSidebar
        view={view}
        onNav={navigate}
        cartCount={cartCount}
        unreadNotifs={unreadNotifs}
        activeOrders={activeOrders}
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userName={user?.name || "Bhumika Jain"}
        userPhone={user?.phone || "+91 98765 43210"}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <CustomerHeader
          cartCount={cartCount}
          unreadNotifs={unreadNotifs}
          onNav={navigate}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          userName={user?.name || "Bhumika Jain"}
          location="Sector 7, Jaipur"
          darkMode={darkMode}
          onToggleTheme={onToggleTheme}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-28 lg:pb-8">
            {renderView()}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <CustomerBottomNav
          view={view}
          onNav={navigate}
          cartCount={cartCount}
        />
      </div>
    </div>
  );
}
