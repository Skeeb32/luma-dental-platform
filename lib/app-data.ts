import { BarChart3, Bot, CreditCard, Inbox, Layers3, MessageSquareText, Star, Users, Webhook } from "lucide-react";

export type AppNavItem = {
  href: string;
  label: string;
  icon: typeof Inbox;
  badge?: string;
};

export const appNav: AppNavItem[] = [
  { href: "/overview", label: "Overview", icon: Layers3 },
  { href: "/inbox", label: "Inbox", icon: Inbox, badge: "12" },
  { href: "/campaigns", label: "Campaigns", icon: MessageSquareText },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/automations", label: "Automations", icon: Bot },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/reviews", label: "Reviews", icon: Star },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/developers", label: "Developers", icon: Webhook }
];

export const overviewStats = [
  { label: "Outbound today", value: "42,180", change: "+18%" },
  { label: "Inbox response rate", value: "89.4%", change: "+4.2%" },
  { label: "SMS-attributed revenue", value: "$184,320", change: "+11.7%" },
  { label: "Review conversion", value: "32.1%", change: "+7.4%" }
];

export const inboxThreads = [
  {
    id: "CNV-2101",
    name: "Avery Johnson",
    phone: "+1 (574) 555-0101",
    preview: "Can you text me the payment link?",
    time: "2m ago",
    assignee: "Morgan",
    status: "Open",
    unread: 1
  },
  {
    id: "CNV-2102",
    name: "Jordan Lee",
    phone: "+1 (574) 555-0102",
    preview: "Need to reschedule for tomorrow morning.",
    time: "8m ago",
    assignee: "Team Inbox",
    status: "Waiting",
    unread: 2
  },
  {
    id: "CNV-2103",
    name: "Sam Patel",
    phone: "+1 (574) 555-0103",
    preview: "Please send the quote and financing options.",
    time: "23m ago",
    assignee: "Danielle",
    status: "Priority",
    unread: 0
  },
  {
    id: "CNV-2104",
    name: "Olivia Chen",
    phone: "+1 (574) 555-0104",
    preview: "We got the review link, thanks.",
    time: "44m ago",
    assignee: "Reviews Bot",
    status: "Resolved",
    unread: 0
  }
];

export const threadMessages = [
  { sender: "Avery", body: "Can you text me the payment link?", time: "12:28 PM", inbound: true },
  { sender: "Morgan", body: "Absolutely. I can send it now and stay with you here if you need anything.", time: "12:29 PM", inbound: false },
  { sender: "System", body: "Payment link generated: https://pulse.link/pay/acme-901", time: "12:29 PM", inbound: false },
  { sender: "Avery", body: "Perfect. Paying now.", time: "12:30 PM", inbound: true }
];

export const campaigns = [
  { name: "Spring tune-up promo", audience: "12,640", scheduled: "Today 4:45 PM", status: "Scheduled", revenue: "$38,220" },
  { name: "Past-buyer upsell", audience: "4,811", scheduled: "Tomorrow 11:00 AM", status: "Draft", revenue: "$0" },
  { name: "Cold lead win-back", audience: "7,035", scheduled: "Fri 1:30 PM", status: "Running", revenue: "$22,840" }
];

export const templates = [
  { name: "Flash sale", category: "Promotions", winRate: "18.4% CTR", mms: "Enabled" },
  { name: "VIP launch", category: "Product Launches", winRate: "11.9% CVR", mms: "Optional" },
  { name: "Reactivation", category: "Re-engagement", winRate: "22.7% reply", mms: "Disabled" }
];

export const contacts = [
  { name: "Avery Johnson", segment: "VIP Buyer", source: "Web Chat", lastSeen: "2m ago", value: "$2,490" },
  { name: "Jordan Lee", segment: "Cold Lead", source: "Salesforce", lastSeen: "8m ago", value: "$0" },
  { name: "Sam Patel", segment: "Open Quote", source: "HubSpot", lastSeen: "23m ago", value: "$850" },
  { name: "Olivia Chen", segment: "Promoter", source: "Review Flow", lastSeen: "44m ago", value: "$410" },
  { name: "Noah Garcia", segment: "Past Buyer", source: "Import", lastSeen: "1h ago", value: "$1,230" }
];

export const automations = [
  { name: "Missed call auto-text", trigger: "call.missed", action: "Send callback text", status: "Active" },
  { name: "Payment reminder", trigger: "invoice.unpaid.24h", action: "Text payment link", status: "Active" },
  { name: "Review routing", trigger: "job.completed", action: "Promoter/detractor branch", status: "Active" },
  { name: "Non-responder follow-up", trigger: "campaign.no-reply.48h", action: "AI follow-up", status: "Draft" }
];

export const payments = [
  { customer: "Avery Johnson", amount: "$1,299.00", method: "Stripe Link", status: "Paid", sent: "12:29 PM" },
  { customer: "Sam Patel", amount: "$249.00", method: "Stripe Link", status: "Pending", sent: "11:14 AM" },
  { customer: "Noah Garcia", amount: "$89.00", method: "Stripe Link", status: "Expired", sent: "Yesterday" }
];

export const reviews = [
  { customer: "Olivia Chen", destination: "Google", score: "5/5", status: "Published" },
  { customer: "Jordan Lee", destination: "Private Recovery", score: "2/5", status: "Needs follow-up" },
  { customer: "Sam Patel", destination: "Facebook", score: "4/5", status: "Queued" }
];

export const analyticsCards = [
  { label: "Click-through rate", value: "19.6%", note: "Best-performing on MMS campaigns" },
  { label: "Reply rate", value: "12.8%", note: "Smart-send outperformed standard sends" },
  { label: "Revenue / recipient", value: "$3.82", note: "Up 9% from last month" },
  { label: "Opt-out rate", value: "0.41%", note: "Within target compliance range" }
];

export const developerResources = [
  { title: "REST API", text: "Versioned under /api/v1 with API key and OAuth2 support.", href: "/api/v1" },
  { title: "Webhook simulator", text: "Trigger sample message or payment events locally.", href: "/api/webhook-simulator" },
  { title: "OpenAPI spec", text: "Reference the platform contract in docs/openapi.yaml.", href: "/developers" }
];
