import {
  Activity,
  BarChart3,
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
  Package,
  ReceiptText,
  Settings,
  Users
} from "lucide-react";

export type ClaimStatus =
  | "SUBMITTED"
  | "IN_REVIEW"
  | "PENDING"
  | "DENIED"
  | "PAID"
  | "FOLLOW_UP_REQUIRED"
  | "CLOSED";

export type Claim = {
  id: string;
  patient: string;
  initials: string;
  payer: string;
  payerMark: string;
  procedure: string;
  dateOfService: string;
  billed: number;
  paid: number;
  outstanding: number;
  status: ClaimStatus;
  submitted: string;
  followUp: string;
  assignee: string;
  age: number;
};

export const rcmNav = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/claims", label: "Claims", icon: ReceiptText, badge: "14" },
  { href: "/payments", label: "Payments", icon: CreditCard, badge: "3" },
  { href: "/tasks", label: "Work queue", icon: ClipboardCheck, badge: "8" },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/marketplace", label: "Supply marketplace", icon: Package },
  { href: "/team", label: "Practice & team", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings }
];

export const claims: Claim[] = [
  { id: "CLM-10482", patient: "Maya Thompson", initials: "MT", payer: "Delta Dental", payerMark: "D", procedure: "Crown · #19", dateOfService: "Sep 03, 2026", billed: 1480, paid: 0, outstanding: 1480, status: "FOLLOW_UP_REQUIRED", submitted: "Aug 04", followUp: "Today", assignee: "E. Martinez", age: 38 },
  { id: "CLM-10479", patient: "Victor Alvarez", initials: "VA", payer: "Cigna Dental", payerMark: "C", procedure: "Periodontal scaling", dateOfService: "Aug 28, 2026", billed: 932, paid: 466, outstanding: 466, status: "PENDING", submitted: "Aug 30", followUp: "Sep 16", assignee: "S. Park", age: 12 },
  { id: "CLM-10473", patient: "Nora Whitaker", initials: "NW", payer: "Aetna", payerMark: "A", procedure: "Composite fillings", dateOfService: "Aug 21, 2026", billed: 760, paid: 0, outstanding: 760, status: "DENIED", submitted: "Aug 22", followUp: "Overdue", assignee: "E. Martinez", age: 19 },
  { id: "CLM-10470", patient: "Jonah Brooks", initials: "JB", payer: "MetLife", payerMark: "M", procedure: "Comprehensive exam", dateOfService: "Aug 19, 2026", billed: 248, paid: 248, outstanding: 0, status: "PAID", submitted: "Aug 20", followUp: "—", assignee: "S. Park", age: 22 },
  { id: "CLM-10466", patient: "Priya Desai", initials: "PD", payer: "Guardian", payerMark: "G", procedure: "Root canal · #30", dateOfService: "Aug 15, 2026", billed: 1665, paid: 0, outstanding: 1665, status: "IN_REVIEW", submitted: "Aug 16", followUp: "Sep 14", assignee: "J. Lewis", age: 26 },
  { id: "CLM-10461", patient: "Caleb Morgan", initials: "CM", payer: "Humana", payerMark: "H", procedure: "Night guard", dateOfService: "Aug 11, 2026", billed: 520, paid: 0, outstanding: 520, status: "SUBMITTED", submitted: "Aug 12", followUp: "Sep 18", assignee: "J. Lewis", age: 30 },
  { id: "CLM-10454", patient: "Isla Bennett", initials: "IB", payer: "Delta Dental", payerMark: "D", procedure: "Implant restoration", dateOfService: "Aug 03, 2026", billed: 2240, paid: 0, outstanding: 2240, status: "FOLLOW_UP_REQUIRED", submitted: "Aug 05", followUp: "Today", assignee: "E. Martinez", age: 37 },
  { id: "CLM-10451", patient: "Owen Fitzgerald", initials: "OF", payer: "Cigna Dental", payerMark: "C", procedure: "Extraction", dateOfService: "Jul 29, 2026", billed: 390, paid: 0, outstanding: 390, status: "CLOSED", submitted: "Jul 30", followUp: "—", assignee: "S. Park", age: 43 }
];

export const chartData = [
  { date: "Aug 13", collected: 12.4, submitted: 18.2 },
  { date: "Aug 20", collected: 18.1, submitted: 16.5 },
  { date: "Aug 27", collected: 14.6, submitted: 21.1 },
  { date: "Sep 03", collected: 22.9, submitted: 20.2 },
  { date: "Sep 10", collected: 19.8, submitted: 23.7 }
];

export const agingData = [
  { label: "0–30 days", value: "$24,980", count: 42, width: "82%", tone: "bg-emerald-500" },
  { label: "31–60 days", value: "$13,420", count: 19, width: "47%", tone: "bg-amber-400" },
  { label: "61–90 days", value: "$6,840", count: 8, width: "25%", tone: "bg-orange-500" },
  { label: "90+ days", value: "$3,190", count: 4, width: "12%", tone: "bg-rose-500" }
];

export const paymentBatches = [
  { id: "EFT-99271", payer: "Delta Dental", received: "Today · 9:42 AM", amount: 2450, status: "RECONCILIATION_REQUIRED", claims: 3 },
  { id: "EFT-99268", payer: "Cigna Dental", received: "Yesterday · 3:11 PM", amount: 1885, status: "PARTIALLY_POSTED", claims: 4 },
  { id: "EFT-99263", payer: "Guardian", received: "Sep 09 · 11:06 AM", amount: 4120, status: "RECONCILED", claims: 7 }
];

export const allocationClaims = [
  { id: "CLM-10482", patient: "Maya Thompson", procedure: "Crown · #19", balance: 1480 },
  { id: "CLM-10454", patient: "Isla Bennett", procedure: "Implant restoration", balance: 2240 },
  { id: "CLM-10437", patient: "Arielle Chen", procedure: "Periodontal scaling", balance: 500 }
];

export const tasks = [
  { id: "TSK-491", title: "Call Delta Dental on CLM-10482", meta: "Maya Thompson · $1,480", due: "Due today", priority: "High", owner: "Elena" },
  { id: "TSK-488", title: "Submit requested X-rays", meta: "Priya Desai · CLM-10466", due: "Due today", priority: "High", owner: "Jordan" },
  { id: "TSK-486", title: "Review Cigna EOB variance", meta: "Victor Alvarez · $466", due: "Tomorrow", priority: "Medium", owner: "Sam" },
  { id: "TSK-481", title: "Appeal coordination-of-benefits denial", meta: "Nora Whitaker · $760", due: "Sep 15", priority: "Medium", owner: "Elena" }
];

export const marketplaceProducts = [
  { id: "prd-1", name: "Nitrile exam gloves", detail: "Powder-free · Ocean blue · 100 / box", price: 13.8, vendor: "Medline Dental", tag: "Contract price", hue: "bg-cyan-100", icon: "✦" },
  { id: "prd-2", name: "Prophy paste variety pack", detail: "Fine grit · 200 cups", price: 38.5, vendor: "Young Dental", tag: "In stock", hue: "bg-amber-100", icon: "●" },
  { id: "prd-3", name: "Universal composite kit", detail: "A2 / A3 shades · 20 syringes", price: 229, vendor: "3M Oral Care", tag: "18% below list", hue: "bg-violet-100", icon: "▰" },
  { id: "prd-4", name: "Sterilization pouch", detail: "Self-seal · 3.5 × 10 in · 200 / box", price: 25.25, vendor: "Crosstex", tag: "Autoship eligible", hue: "bg-rose-100", icon: "◇" }
];

export const marketOrders = [
  { id: "ORD-20841", status: "In transit", eta: "Arrives Sep 13", total: "$486.22", items: 8 },
  { id: "ORD-20794", status: "Delivered", eta: "Delivered Sep 08", total: "$194.65", items: 4 }
];
