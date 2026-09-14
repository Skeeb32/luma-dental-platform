import { apiEndpoints, schemaEntities, templateLibrary, webhookEvents } from "@/lib/platform-data";

export const mockTenant = {
  id: "tenant_acme_001",
  name: "Acme Home Services",
  plan: "growth",
  timezone: "America/Indiana/Indianapolis"
};

export const mockContacts = [
  {
    id: "ct_001",
    firstName: "Avery",
    lastName: "Johnson",
    phone: "+15745550101",
    tags: ["vip", "past-buyer"],
    customFields: { location: "South Bend", lifetime_value: 2490 },
    source: "web-chat-widget"
  },
  {
    id: "ct_002",
    firstName: "Jordan",
    lastName: "Lee",
    phone: "+15745550102",
    tags: ["cold-lead", "roofing"],
    customFields: { location: "Elkhart", interest: "annual plan" },
    source: "salesforce"
  }
];

export const mockConversations = [
  {
    id: "cnv_001",
    contactId: "ct_001",
    channel: "sms",
    phoneNumber: "+15745550001",
    assignee: "rep_morgan",
    unreadCount: 1,
    lastMessagePreview: "Can I pay by text?",
    lastMessageAt: "2026-04-08T12:30:00.000Z"
  },
  {
    id: "cnv_002",
    contactId: "ct_002",
    channel: "sms",
    phoneNumber: "+15745550002",
    assignee: "team_success",
    unreadCount: 0,
    lastMessagePreview: "Send me pricing options.",
    lastMessageAt: "2026-04-08T11:05:00.000Z"
  }
];

export const mockCampaignAnalytics = {
  campaignId: "cmp_042",
  sent: 48210,
  delivered: 47391,
  clicked: 9268,
  replied: 6024,
  converted: 1132,
  revenue: 184320,
  clickThroughRate: 19.6,
  replyRate: 12.8,
  conversionRate: 2.3
};

export const mockSegments = [
  { id: "seg_001", name: "Engaged last 30 days", audienceSize: 12640 },
  { id: "seg_002", name: "Past buyers > $1k", audienceSize: 4811 },
  { id: "seg_003", name: "Cold leads needing follow-up", audienceSize: 7035 }
];

export function baseResponse(data: unknown) {
  return {
    tenant: mockTenant,
    generatedAt: "2026-04-08T13:00:00.000Z",
    data
  };
}

export function getApiIndex() {
  return baseResponse({
    version: "v1",
    auth: ["x-api-key", "OAuth2"],
    endpoints: apiEndpoints
  });
}

export function getTemplates() {
  return baseResponse(templateLibrary.map((template, index) => ({ id: `tpl_${index + 1}`, ...template })));
}

export function getWebhooks() {
  return baseResponse({
    signingAlgorithm: "HMAC-SHA256",
    events: webhookEvents
  });
}

export function getSchemaSnapshot() {
  return baseResponse(schemaEntities);
}
