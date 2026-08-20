import {
  Clock, Check, Package, PackageCheck, Truck, CheckCircle2, PackageX, X, Circle
} from "lucide-react";


export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600;700&display=swap');`;

export const TORN_EDGE = "polygon(0% 2%,4% 0%,8% 2%,12% 0%,16% 2%,20% 0%,24% 2%,28% 0%,32% 2%,36% 0%,40% 2%,44% 0%,48% 2%,52% 0%,56% 2%,60% 0%,64% 2%,68% 0%,72% 2%,76% 0%,80% 2%,84% 0%,88% 2%,92% 0%,96% 2%,100% 0%,100% 98%,96% 100%,92% 98%,88% 100%,84% 98%,80% 100%,76% 98%,72% 100%,68% 98%,64% 100%,60% 98%,56% 100%,52% 98%,48% 100%,44% 98%,40% 100%,36% 98%,32% 100%,28% 98%,24% 100%,20% 98%,16% 100%,12% 98%,8% 100%,4% 98%,0% 100%)";

export const CATEGORIES = ["All", "Grocery", "Dairy", "Vegetables", "Bakery", "Pharmacy", "Stationery"];

export const SHOPS = [
  {
    id: "sh1", name: "Ramji Kirana Store", category: "Grocery", rating: 4.6,
    etaMins: 18, distanceKm: 0.6, tagline: "Everyday rations, honest weight",
    products: [
      { id: "p1", name: "Toor Dal", unit: "1 kg", price: 148, stock: 24, category: "Grocery" },
      { id: "p2", name: "Basmati Rice", unit: "5 kg", price: 520, stock: 12, category: "Grocery" },
      { id: "p3", name: "Sunflower Oil", unit: "1 L", price: 165, stock: 30, category: "Grocery" },
      { id: "p4", name: "Turmeric Powder", unit: "200 g", price: 42, stock: 40, category: "Grocery" },
      { id: "p5", name: "Sugar", unit: "1 kg", price: 46, stock: 3, category: "Grocery" },
      { id: "p6", name: "Parle-G Biscuits", unit: "pack", price: 10, stock: 100, category: "Grocery" },
    ],
  },
  {
    id: "sh2", name: "Shree Dairy Corner", category: "Dairy", rating: 4.8,
    etaMins: 12, distanceKm: 0.3, tagline: "Fresh milk, twice a day",
    products: [
      { id: "p7", name: "Amul Toned Milk", unit: "500 ml", price: 27, stock: 50, category: "Dairy" },
      { id: "p8", name: "Curd", unit: "400 g", price: 35, stock: 20, category: "Dairy" },
      { id: "p9", name: "Paneer", unit: "200 g", price: 90, stock: 15, category: "Dairy" },
      { id: "p10", name: "Butter", unit: "100 g", price: 55, stock: 18, category: "Dairy" },
      { id: "p11", name: "Farm Eggs", unit: "6 pcs", price: 42, stock: 0, category: "Dairy" },
    ],
  },
  {
    id: "sh3", name: "Fresh Bhaji Mandi", category: "Vegetables", rating: 4.4,
    etaMins: 25, distanceKm: 1.1, tagline: "Farm to your kitchen, same day",
    products: [
      { id: "p12", name: "Onions", unit: "1 kg", price: 34, stock: 60, category: "Vegetables" },
      { id: "p13", name: "Tomatoes", unit: "1 kg", price: 28, stock: 45, category: "Vegetables" },
      { id: "p14", name: "Potatoes", unit: "1 kg", price: 24, stock: 70, category: "Vegetables" },
      { id: "p15", name: "Coriander Bunch", unit: "1 bunch", price: 12, stock: 25, category: "Vegetables" },
    ],
  },
  {
    id: "sh4", name: "Golden Crust Bakery", category: "Bakery", rating: 4.7,
    etaMins: 22, distanceKm: 0.9, tagline: "Baked fresh every morning",
    products: [
      { id: "p16", name: "Britannia Bread", unit: "400 g", price: 45, stock: 22, category: "Bakery" },
      { id: "p17", name: "Rusk", unit: "pack", price: 38, stock: 30, category: "Bakery" },
      { id: "p18", name: "Cream Buns", unit: "4 pcs", price: 60, stock: 10, category: "Bakery" },
    ],
  },
  {
    id: "sh5", name: "Sanjeevani Medical", category: "Pharmacy", rating: 4.9,
    etaMins: 15, distanceKm: 0.4, tagline: "Licensed pharmacist on call",
    products: [
      { id: "p19", name: "Paracetamol Strip", unit: "10 tabs", price: 22, stock: 80, category: "Pharmacy" },
      { id: "p20", name: "ORS Sachets", unit: "5 pcs", price: 45, stock: 40, category: "Pharmacy" },
      { id: "p21", name: "Antiseptic Liquid", unit: "100 ml", price: 65, stock: 18, category: "Pharmacy" },
    ],
  },
];

export const STATUS_FLOW = ["PENDING", "ACCEPTED", "PREPARING", "PACKED", "OUT_FOR_DELIVERY", "DELIVERED"];

export const STATUS_LABEL = {
  PENDING: "Order placed", ACCEPTED: "Accepted by shop", PREPARING: "Being prepared",
  PACKED: "Packed & ready", OUT_FOR_DELIVERY: "Out for delivery", DELIVERED: "Delivered",
  REJECTED: "Rejected by shop", CANCELLED: "Cancelled",
};

export const STATUS_ICON = {
  PENDING: Clock, ACCEPTED: Check, PREPARING: Package, PACKED: PackageCheck,
  OUT_FOR_DELIVERY: Truck, DELIVERED: CheckCircle2, REJECTED: PackageX, CANCELLED: X,
};

export const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
export const nowStamp = () => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
