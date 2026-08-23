// ─────────────────────────────────────────────────────────────
// Ghareludukan API-Ready Service Layer
// Clean service boundaries with simulated async responses
// ─────────────────────────────────────────────────────────────

import {
  MOCK_ORDERS,
  MOCK_SHOPS,
  MOCK_CATEGORIES,
  MOCK_PRODUCTS,
  MOCK_CUSTOMER_NOTIFICATIONS,
  MOCK_SELLER_NOTIFICATIONS,
  MOCK_DELIVERY_RIDER,
  MOCK_DELIVERY_JOBS,
  MOCK_DELIVERY_EARNINGS,
  MOCK_DELIVERY_NOTIFICATIONS,
  MOCK_ADMIN_METRICS,
  MOCK_PENDING_SHOPS,
  MOCK_APPROVED_SHOPS,
  MOCK_PENDING_DELIVERY_PARTNERS,
  MOCK_FRAUD_ALERTS,
  MOCK_AUDIT_LOGS,
  MOCK_ADMIN_REPORTS,
  MOCK_ADMIN_NOTIFICATIONS,
  MOCK_SUPPORT_TICKETS,
  MOCK_SUPPORT_METRICS,
} from "../data";

// Helper delay to mimic async network response
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async sendOtp(phone) {
    await delay(200);
    return { success: true, message: "OTP sent to " + phone };
  },
  async verifyOtp(phone, otp, role = "customer") {
    await delay(200);
    if (otp === "1234") {
      const user = {
        id: `usr_${Date.now()}`,
        phone,
        role,
        name: role === "seller" ? "Rajesh Agarwal" : role === "delivery" ? "Vikram Singh" : role === "admin" ? "Sanjay Saxena (Admin)" : role === "support" ? "Neha Rathore (Support)" : "Bhumika Jain",
      };
      return { success: true, user };
    }
    throw new Error("Invalid OTP code");
  },
  getCurrentUser() {
    try {
      const saved = localStorage.getItem("ghareludukan_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },
};

export const customerService = {
  async getShops() {
    await delay();
    return MOCK_SHOPS;
  },
  async getProducts() {
    await delay();
    return MOCK_PRODUCTS;
  },
  async getCategories() {
    await delay();
    return MOCK_CATEGORIES;
  },
};

export const sellerService = {
  async getShopDetails(shopId = "sh1") {
    await delay();
    return MOCK_SHOPS.find((s) => s.id === shopId) || MOCK_SHOPS[0];
  },
  async updateInventory(productId, updates) {
    await delay();
    return { success: true, productId, updates };
  },
};

export const deliveryService = {
  async getProfile() {
    await delay();
    return MOCK_DELIVERY_RIDER;
  },
  async getJobs() {
    await delay();
    return MOCK_DELIVERY_JOBS;
  },
  async acceptJob(jobId) {
    await delay();
    return { success: true, jobId, status: "ACCEPTED" };
  },
  async arriveAtShop(jobId) {
    await delay();
    return { success: true, jobId, status: "ARRIVED_SHOP" };
  },
  async confirmPickup(jobId) {
    await delay();
    return { success: true, jobId, status: "PICKED_UP" };
  },
  async verifyDropOtp(jobId, otp) {
    await delay();
    if (otp === "1234" || otp.length === 4) {
      return { success: true, jobId, status: "DELIVERED" };
    }
    throw new Error("Incorrect delivery OTP");
  },
  async reportDeliveryFailure(jobId, reason) {
    await delay();
    return { success: true, jobId, status: "FAILED", reason };
  },
  async getEarnings() {
    await delay();
    return MOCK_DELIVERY_EARNINGS;
  },
  async getNotifications() {
    await delay();
    return MOCK_DELIVERY_NOTIFICATIONS;
  },
};

export const adminService = {
  async getMetrics() {
    await delay();
    return MOCK_ADMIN_METRICS;
  },
  async getPendingShops() {
    await delay();
    return MOCK_PENDING_SHOPS;
  },
  async getApprovedShops() {
    await delay();
    return MOCK_APPROVED_SHOPS;
  },
  async approveShop(shopId, reason = "Approved by Admin") {
    await delay();
    return { success: true, shopId, status: "APPROVED", reason };
  },
  async rejectShop(shopId, reason) {
    await delay();
    return { success: true, shopId, status: "REJECTED", reason };
  },
  async requestShopCorrection(shopId, note) {
    await delay();
    return { success: true, shopId, status: "CORRECTION_REQUIRED", note };
  },
  async suspendShop(shopId, reason) {
    await delay();
    return { success: true, shopId, status: "SUSPENDED", reason };
  },
  async getPendingDeliveryPartners() {
    await delay();
    return MOCK_PENDING_DELIVERY_PARTNERS;
  },
  async approveDeliveryPartner(partnerId, reason = "Approved") {
    await delay();
    return { success: true, partnerId, status: "APPROVED", reason };
  },
  async getFraudAlerts() {
    await delay();
    return MOCK_FRAUD_ALERTS;
  },
  async getAuditLogs() {
    await delay();
    return MOCK_AUDIT_LOGS;
  },
  async getReports() {
    await delay();
    return MOCK_ADMIN_REPORTS;
  },
  async getNotifications() {
    await delay();
    return MOCK_ADMIN_NOTIFICATIONS;
  },
};

export const supportService = {
  async getTickets() {
    await delay();
    return MOCK_SUPPORT_TICKETS;
  },
  async getMetrics() {
    await delay();
    return MOCK_SUPPORT_METRICS;
  },
  async replyTicket(ticketId, message) {
    await delay();
    return { success: true, ticketId, message };
  },
  async updateTicketStatus(ticketId, newStatus) {
    await delay();
    return { success: true, ticketId, newStatus };
  },
};

export const orderService = {
  async getOrders() {
    await delay();
    return MOCK_ORDERS;
  },
  async createOrder(orderData) {
    await delay();
    return { success: true, order: orderData };
  },
};

export const paymentService = {
  async verifyPayment(paymentDetails) {
    await delay(300);
    return { success: true, txId: `TXN_${Date.now()}` };
  },
};

export const notificationService = {
  async getNotificationsByRole(role) {
    await delay();
    switch (role) {
      case "seller": return MOCK_SELLER_NOTIFICATIONS;
      case "delivery": return MOCK_DELIVERY_NOTIFICATIONS;
      case "admin": return MOCK_ADMIN_NOTIFICATIONS;
      default: return MOCK_CUSTOMER_NOTIFICATIONS;
    }
  },
};

export const locationService = {
  async getCoordinates(address) {
    await delay();
    return { lat: 26.9124, lng: 75.7873, city: "Jaipur" };
  },
};

export const auditService = {
  async logEvent(eventData) {
    console.info("[AUDIT_LOG_EVENT]", eventData);
    return { success: true, logId: `AUD-${Date.now()}` };
  },
};
