# 🏪 Ghareludukan (घरेलूदुकान)
> **Your Gully, Your Dukan, Online** — Hyperlocal neighborhood commerce platform bridging local brick-and-mortar stores with neighborhood shoppers.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 Overview

**Ghareludukan** is a modern hyperlocal retail and commerce web platform engineered for instant neighborhood shopping and digital store empowerment. Unlike conventional grocery delivery apps, Ghareludukan connects customers directly to all local gully shops across diverse categories — including **Party Gifts & Toys**, **Daily Essentials & Crockery**, **Bakery & Sweets**, and **Local Pharmacy & Healthcare**.

---

## ✨ Key Highlights & Features

### 🛍️ Customer Portal
- **Hyperlocal Shop Discovery**: Explore nearby verified stores with ratings, distance indicators, and live store status (Open / Closed).
- **Multi-Category Product Catalog**: Browse items with rich detail modal views, unit selectors, quantity steppers, and stock indicators.
- **Dynamic Cart & Checkout**: Quick checkout with delivery slot selection, UPI / Cash on Delivery payment options, and promo coupon discounts.
- **Real-Time Order Tracking**: Multi-step dynamic visual tracker with live status updates (*Placed* ➔ *Accepted* ➔ *Preparing* ➔ *Packed* ➔ *Ready* ➔ *Delivered*).
- **Khata Bill Paper**: Itemized digital ledger receipts reflecting physical local shop bills.
- **Customer Profile & Activity Hub**: Manage saved addresses, digital wallet balance, coupons, notifications, and customer support.

### 🏬 Seller / Shop Owner Dashboard
- **Live Orders Lifecycle Pipeline**: Full order processing pipeline with instant accept/reject, preparation time buffers, and status transitions.
- **Inventory & Catalog Management**: Real-time product inventory control, stock toggling, pricing, and category tagging.
- **Financial Settlements & Reports**: 15-day batch settlement management, live payout transactions, and downloadable GST invoices.
- **Analytics & Performance Insights**: Sales volume, revenue breakdowns, top-selling products, and repeat customer retention graphs powered by **Recharts**.
- **Customer Engagement & Reviews**: Moderation of customer feedback and direct buyer engagement.
- **Store Controls & Settings**: Prep buffer configurations, audio order alerts, WhatsApp receipts, and UPI payout configurations.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 (Vite Bundler) |
| **Styling & Design System** | Tailwind CSS with responsive layout tokens |
| **Icons** | Lucide React |
| **Charts & Data Visualization** | Recharts |
| **Animations & Effects** | Framer Motion & Canvas Confetti |
| **State & Persistence** | Unified React State with `localStorage` persistence |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bhumikajain54/Ghareludukan.git
   cd Ghareludukan
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173` to launch the application.

---

## 📁 Project Structure

```text
Ghareludukan/
├── public/                     # Static assets & public resources
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication & login flow (Customer & Seller)
│   │   ├── common/            # Shared components (Footer, modals, toasts)
│   │   ├── customer/          # Customer portal
│   │   │   ├── cart/          # Shopping cart & checkout
│   │   │   ├── home/          # Discovery feed & banner carousels
│   │   │   ├── notifications/ # Dynamic read/unread notification center
│   │   │   ├── orders/        # Order history & live order tracker
│   │   │   ├── products/      # Product detail views & quick add
│   │   │   ├── profile/       # Profile, addresses, wallet & coupons
│   │   │   ├── search/        # Live search & category filters
│   │   │   └── shops/         # Shop profiles & categorized inventory
│   │   └── seller/            # Merchant / Shop Owner dashboard
│   │       ├── analytics/     # Sales metrics & business reports
│   │       ├── customers/     # Customer CRM & repeat buyer insights
│   │       ├── dashboard/     # Quick metrics & live order queue
│   │       ├── inventory/     # Stock & catalog management
│   │       ├── orders/        # Order fulfillment & detail views
│   │       ├── profile/       # Shop settings & store hours
│   │       ├── reviews/       # Customer ratings & reviews
│   │       └── settlements/   # Payouts, invoices & transactions
│   ├── data/                  # Master data models & mock database
│   ├── App.jsx                # Root app & master state coordination
│   ├── index.css              # Global styles & design system tokens
│   └── main.jsx               # Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🎨 Theme & Accessibility
- **Dual Theme Engine**: Supports comprehensive **Light Mode** and **Dark Mode** with optimized contrast tokens.
- **Responsive Layout**: Optimized for mobile, tablet, and high-resolution desktop viewports.

---

## 👩‍💻 Author & Credits

- **Designed & Developed by**: [Bhumika Jain](https://github.com/bhumikajain54)
- **Organization**: Yovexa Solutions

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.