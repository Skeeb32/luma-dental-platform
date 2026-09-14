export type Metric = {
  label: string;
  value: string;
  detail: string;
};

export type Capability = {
  title: string;
  description: string;
  bullets: string[];
};

export type Endpoint = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  summary: string;
  domain: string;
};

export type WebhookEvent = {
  name: string;
  description: string;
  retryPolicy: string;
};

export type TemplateCard = {
  category: string;
  title: string;
  copy: string;
  performance: string;
};

export type SchemaEntity = {
  name: string;
  columns: string[];
};

export const platformMetrics: Metric[] = [
  {
    label: "Multi-tenant scale target",
    value: "1M+ msgs/day",
    detail: "Queue-first architecture with provider failover and delivery state fan-out."
  },
  {
    label: "Supported channels",
    value: "SMS, MMS, Web Chat",
    detail: "Shared inbox, rep-assigned lines, landline text enablement, and missed-call automations."
  },
  {
    label: "Revenue surfaces",
    value: "Payments + Reviews",
    detail: "Stripe payment links, review routing, attribution, and conversion analytics."
  },
  {
    label: "Expansion surface",
    value: "API + Extension + Mobile",
    detail: "Public REST API, Chrome extension shell, mobile app structure, and webhook simulator."
  }
];

export const coreCapabilities: Capability[] = [
  {
    title: "Unified Inbox and Number Ops",
    description:
      "A single operating layer for text-enabled landlines, VoIP numbers, local reps, and shared support queues.",
    bullets: [
      "Thread ownership, routing rules, collision detection, and SLA timers",
      "Missed-call to text fallback and number-level automation policies",
      "Team, location, and rep assignment with role-aware permissions"
    ]
  },
  {
    title: "Marketing Engine",
    description:
      "Broadcasting designed for modern SMS marketing with compliance, segmentation, and attribution built in.",
    bullets: [
      "Segment by tags, groups, lifecycle stage, click activity, and purchase history",
      "A/B test message copy and MMS creative from the template library",
      "Track CTR, reply rate, conversion rate, and revenue per campaign"
    ]
  },
  {
    title: "Automation and AI",
    description:
      "Automation builder with high-intent scoring, smart send windows, and AI-assisted message generation.",
    bullets: [
      "Trigger workflows from inbound messages, payments, reviews, and CRM sync events",
      "Smart follow-ups for non-responders and dynamic branching by sentiment",
      "AI reply suggestions, lead scoring, and best-send-time recommendations"
    ]
  },
  {
    title: "Open Platform",
    description:
      "Designed as infrastructure, not just an app, with APIs, webhooks, CRM sync, and embedded extension flows.",
    bullets: [
      "REST API under /api/v1 with OAuth2, API key auth, and audit trails",
      "Native Salesforce, HubSpot, Zapier, and webhook-friendly event contracts",
      "Chrome extension and embeddable website widget for no-code texting"
    ]
  }
];

export const architectureLayers: Capability[] = [
  {
    title: "Experience Layer",
    description: "Next.js operator console, embeddable chat widget, Chrome extension, and mobile clients.",
    bullets: [
      "Shared design language for inbox, campaigns, reviews, payments, and analytics",
      "Real-time sync over websockets and notification fan-out",
      "Offline-friendly mobile architecture with local cache replay"
    ]
  },
  {
    title: "Application Layer",
    description: "Tenant-aware services for messaging, contacts, campaigns, automation, reviews, and payments.",
    bullets: [
      "NestJS-ready module boundaries with REST controllers and policy guards",
      "Workflow engine for drip sequences, retries, and event orchestration",
      "Analytics aggregation and attribution service for message-to-revenue reporting"
    ]
  },
  {
    title: "Data and Delivery Layer",
    description: "PostgreSQL, Redis, Kafka/RabbitMQ, S3, and provider abstraction for Twilio/Bandwidth.",
    bullets: [
      "Outbox pattern, idempotency keys, and provider health routing",
      "Short-link tracking, media storage, and webhook delivery ledger",
      "Partitionable event stream for campaign analytics and inbox updates"
    ]
  }
];

export const apiEndpoints: Endpoint[] = [
  { method: "POST", path: "/api/v1/messages/send", summary: "Send transactional SMS or MMS.", domain: "Messaging" },
  { method: "POST", path: "/api/v1/messages/smart-send", summary: "AI-assisted send with send-time guidance.", domain: "Messaging" },
  { method: "GET", path: "/api/v1/conversations", summary: "List shared inbox threads with assignee state.", domain: "Inbox" },
  { method: "GET", path: "/api/v1/contacts", summary: "List contacts with custom fields and CRM sync hints.", domain: "Contacts" },
  { method: "POST", path: "/api/v1/contacts", summary: "Create or upsert a contact.", domain: "Contacts" },
  { method: "GET", path: "/api/v1/contacts/segments", summary: "Resolve smart segments for campaigns.", domain: "Contacts" },
  { method: "POST", path: "/api/v1/campaigns/send", summary: "Launch a scheduled or immediate SMS blast.", domain: "Campaigns" },
  { method: "GET", path: "/api/v1/campaigns/analytics", summary: "Return CTR, reply, revenue, and conversion metrics.", domain: "Campaigns" },
  { method: "GET", path: "/api/v1/templates", summary: "Browse template library with win-rate metadata.", domain: "Templates" },
  { method: "POST", path: "/api/v1/templates/:id/ab-test", summary: "Launch A/B test for copy variants.", domain: "Templates" },
  { method: "GET", path: "/api/v1/automations", summary: "List workflow automations and trigger conditions.", domain: "Automation" },
  { method: "GET", path: "/api/v1/payments", summary: "View payment requests and settlement state.", domain: "Payments" },
  { method: "GET", path: "/api/v1/reviews", summary: "Inspect review campaign status and sentiment routing.", domain: "Reviews" },
  { method: "POST", path: "/api/v1/media/upload", summary: "Generate upload contract for MMS media.", domain: "Media" },
  { method: "GET", path: "/api/v1/webhooks", summary: "List webhook subscriptions and retry posture.", domain: "Platform" },
  { method: "POST", path: "/api/v1/webhooks", summary: "Register webhook endpoint with signing secret.", domain: "Platform" }
];

export const webhookEvents: WebhookEvent[] = [
  { name: "message.sent", description: "Outbound message accepted into the delivery pipeline.", retryPolicy: "Retry for 24h with exponential backoff." },
  { name: "message.delivered", description: "Carrier/provider confirmed successful delivery.", retryPolicy: "Retry for 12h on 5xx responses." },
  { name: "message.failed", description: "Delivery permanently failed or exceeded retry policy.", retryPolicy: "Retry for 6h, then alert tenant ops channel." },
  { name: "message.received", description: "Inbound SMS/MMS arrived and thread state updated.", retryPolicy: "Retry for 24h because downstream automations may depend on it." },
  { name: "contact.created", description: "Contact record created through widget, API, import, or sync.", retryPolicy: "Retry for 24h." },
  { name: "payment.paid", description: "Stripe payment link completed from SMS session.", retryPolicy: "Retry for 72h to protect revenue hooks." },
  { name: "review.submitted", description: "Customer completed public review flow.", retryPolicy: "Retry for 24h." },
  { name: "link.clicked", description: "Tracked short link resolved and attribution recorded.", retryPolicy: "Retry for 12h." },
  { name: "campaign.completed", description: "Campaign fan-out finished and analytics snapshot generated.", retryPolicy: "Retry for 24h." }
];

export const templateLibrary: TemplateCard[] = [
  {
    category: "Promotions",
    title: "Weekend flash sale",
    copy: "Hi [Name], our [Product] promo ends tonight. Grab it here: [Link] Reply STOP to opt out.",
    performance: "18.4% click rate"
  },
  {
    category: "Product Launches",
    title: "VIP launch early access",
    copy: "You are first in line for [Product]. Reserve your spot here: [Link]",
    performance: "11.9% purchase conversion"
  },
  {
    category: "Re-engagement",
    title: "Cold lead reactivation",
    copy: "Still interested in [Product]? We saved a custom offer for you: [Link]",
    performance: "22.7% reply rate"
  },
  {
    category: "Events and Registration",
    title: "Event RSVP drive",
    copy: "Registration is open for [Event]. Save your seat now: [Link]",
    performance: "31.2% registration CTR"
  },
  {
    category: "Upsells and Cross-sells",
    title: "Post-purchase add-on",
    copy: "Thanks for choosing us, [Name]. Add [Product] today and save 15%: [Link]",
    performance: "$7.82 revenue per recipient"
  },
  {
    category: "Keyword Opt-ins",
    title: "Instant keyword response",
    copy: "Thanks for texting [Keyword]. Here is your instant access link: [Link]",
    performance: "94% delivery rate"
  }
];

export const schemaEntities: SchemaEntity[] = [
  {
    name: "tenants",
    columns: ["id UUID PK", "name", "plan", "timezone", "billing_customer_id", "created_at"]
  },
  {
    name: "phone_numbers",
    columns: ["id UUID PK", "tenant_id FK", "e164", "provider", "number_type", "assigned_team_id", "text_enabled"]
  },
  {
    name: "contacts",
    columns: ["id UUID PK", "tenant_id FK", "phone", "first_name", "last_name", "tags JSONB", "custom_fields JSONB", "crm_external_id"]
  },
  {
    name: "conversations",
    columns: ["id UUID PK", "tenant_id FK", "contact_id FK", "phone_number_id FK", "status", "assigned_user_id", "last_message_at"]
  },
  {
    name: "messages",
    columns: ["id UUID PK", "tenant_id FK", "conversation_id FK", "direction", "body", "media JSONB", "provider_status", "campaign_id", "sent_at"]
  },
  {
    name: "campaigns",
    columns: ["id UUID PK", "tenant_id FK", "name", "segment_id", "template_id", "status", "scheduled_at", "analytics JSONB"]
  },
  {
    name: "automations",
    columns: ["id UUID PK", "tenant_id FK", "name", "trigger_type", "definition JSONB", "status", "version"]
  },
  {
    name: "payment_requests",
    columns: ["id UUID PK", "tenant_id FK", "contact_id FK", "stripe_payment_link_id", "amount_cents", "status", "paid_at"]
  }
];

export const deliveryStreams = [
  "Inbound webhook intake -> normalize provider payload -> persist message -> publish event -> update inbox websocket room.",
  "Outbound campaign request -> segment expansion -> queue batches -> provider adapter send -> status callbacks -> analytics rollup.",
  "Review flow -> post-transaction trigger -> branch promoter/detractor path -> public review redirect or private recovery form.",
  "Payment flow -> generate Stripe payment link -> send via SMS -> consume Stripe webhook -> attribute revenue to conversation and campaign."
];

export const deliverables = [
  "Frontend dashboard rebuilt as a premium SaaS operating console in Next.js.",
  "REST API starter routes under /api/v1 with representative payloads for core domains.",
  "Docs bundle with architecture, API reference, and PostgreSQL schema.",
  "Chrome extension scaffold for click-to-text on arbitrary CRM pages.",
  "Mobile app structure brief for iOS and Android real-time inbox experience.",
  "Webhook simulator endpoint plus sample campaigns and templates."
];
