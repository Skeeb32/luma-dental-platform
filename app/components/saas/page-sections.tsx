import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, CreditCard, MessageSquare, Sparkles, Star, Zap } from "lucide-react";

import {
  analyticsCards,
  automations,
  campaigns,
  contacts,
  developerResources,
  inboxThreads,
  overviewStats,
  payments,
  reviews,
  templates,
  threadMessages
} from "@/lib/app-data";

export function OverviewPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <article key={stat.label} className="card">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p>
            <p className="mt-2 text-sm text-emerald-300">{stat.change} this week</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Live Operations</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Today&apos;s messaging cockpit</h2>
            </div>
            <button type="button" className="ghost-button">View queues</button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Inbound queue", "18 waiting", "3 SLA risks"],
              ["Campaign engine", "2 running", "1 scheduled for 4:45 PM"],
              ["Payments", "6 pending", "$1,637 awaiting payment"],
              ["Reviews", "14 sent", "4 public posts today"]
            ].map(([title, value, note]) => (
              <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">{title}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                <p className="mt-2 text-sm text-slate-300">{note}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="flex items-center gap-3">
            <div className="icon-wrap">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="eyebrow">AI Recommendations</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">High-impact actions</h2>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {[
              "Move the Spring tune-up promo to 4:45 PM local for a predicted +7% click lift.",
              "Send payment reminders to 6 open invoices with the 'friendly close' template.",
              "Route 2 detractor review responses to Morgan before public escalation.",
              "Launch a reactivation campaign to 7035 cold leads using MMS creative."
            ].map((item) => (
              <div key={item} className="list-row rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
                <ArrowRight className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                <span className="text-sm leading-6 text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export function InboxPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
      <article className="card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Shared Inbox</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Active conversations</h2>
          </div>
          <button type="button" className="ghost-button">Bulk assign</button>
        </div>

        <div className="mt-5 space-y-3">
          {inboxThreads.map((thread) => (
            <button
              key={thread.id}
              type="button"
              className="w-full rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-[var(--accent)]/40 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white">{thread.name}</p>
                    {thread.unread ? <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-slate-950">{thread.unread}</span> : null}
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{thread.phone}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{thread.time}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{thread.preview}</p>
              <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-slate-500">
                <span>{thread.assignee}</span>
                <span>{thread.status}</span>
              </div>
            </button>
          ))}
        </div>
      </article>

      <article className="card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Conversation</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Avery Johnson</h2>
          </div>
          <div className="flex gap-3">
            <button type="button" className="ghost-button">Assign</button>
            <button type="button" className="ghost-button">Request review</button>
            <button type="button" className="primary-button">
              <CreditCard className="h-4 w-4" />
              Send payment link
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {threadMessages.map((message) => (
            <div key={`${message.sender}-${message.time}`} className={`flex ${message.inbound ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[75%] rounded-[24px] px-4 py-3 ${message.inbound ? "bg-white/[0.06] text-slate-200" : "bg-[var(--accent)] text-slate-950"}`}>
                <p className="text-xs uppercase tracking-[0.16em] opacity-70">{message.sender} • {message.time}</p>
                <p className="mt-2 text-sm leading-6">{message.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
          <textarea
            className="min-h-[120px] w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            placeholder="Reply to Avery..."
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-3">
              <button type="button" className="ghost-button">Insert template</button>
              <button type="button" className="ghost-button">Use AI suggestion</button>
            </div>
            <button type="button" className="primary-button">
              <MessageSquare className="h-4 w-4" />
              Send message
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export function CampaignsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <article className="card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Campaigns</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Scheduled and active sends</h2>
          </div>
          <div className="flex gap-3">
            <button type="button" className="ghost-button">Audience builder</button>
            <button type="button" className="primary-button">Create campaign</button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10">
          <div className="grid grid-cols-4 gap-4 bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-400">
            <span>Name</span>
            <span>Audience</span>
            <span>Schedule</span>
            <span>Status</span>
          </div>
          {campaigns.map((campaign) => (
            <div key={campaign.name} className="grid grid-cols-4 gap-4 border-t border-white/10 px-4 py-4 text-sm">
              <div>
                <p className="font-medium text-white">{campaign.name}</p>
                <p className="mt-1 text-slate-400">{campaign.revenue} revenue</p>
              </div>
              <span className="text-slate-300">{campaign.audience}</span>
              <span className="text-slate-300">{campaign.scheduled}</span>
              <span className="text-slate-300">{campaign.status}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <span>Showing 3 of 42 campaigns</span>
          <div className="flex gap-2">
            <button type="button" className="ghost-button">Previous</button>
            <button type="button" className="ghost-button">Next</button>
          </div>
        </div>
      </article>

      <article className="card">
        <p className="eyebrow">Template Library</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Top-performing message blocks</h2>
        <div className="mt-6 space-y-3">
          {templates.map((template) => (
            <div key={template.name} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-white">{template.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{template.category}</p>
                </div>
                <span className="rounded-full bg-white/8 px-3 py-1 text-xs text-slate-300">{template.mms}</span>
              </div>
              <p className="mt-3 text-sm text-[var(--accent-2)]">{template.winRate}</p>
              <div className="mt-4 flex gap-3">
                <button type="button" className="ghost-button">Edit</button>
                <button type="button" className="ghost-button">A/B test</button>
                <button type="button" className="primary-button">Use template</button>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

export function ContactsPage() {
  return (
    <article className="card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Contacts</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Audience, segments, and CRM-ready records</h2>
        </div>
        <div className="flex gap-3">
          <button type="button" className="ghost-button">Import CSV</button>
          <button type="button" className="ghost-button">Sync Salesforce</button>
          <button type="button" className="primary-button">New contact</button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10">
        <div className="grid grid-cols-5 gap-4 bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span>Name</span>
          <span>Segment</span>
          <span>Source</span>
          <span>Last seen</span>
          <span>Value</span>
        </div>
        {contacts.map((contact) => (
          <div key={contact.name} className="grid grid-cols-5 gap-4 border-t border-white/10 px-4 py-4 text-sm">
            <span className="font-medium text-white">{contact.name}</span>
            <span className="text-slate-300">{contact.segment}</span>
            <span className="text-slate-300">{contact.source}</span>
            <span className="text-slate-300">{contact.lastSeen}</span>
            <span className="text-slate-300">{contact.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>Page 1 of 8</span>
        <div className="flex gap-2">
          <button type="button" className="ghost-button">Previous</button>
          <button type="button" className="ghost-button">Next</button>
        </div>
      </div>
    </article>
  );
}

export function AutomationsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {automations.map((automation) => (
        <article key={automation.name} className="card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Workflow</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{automation.name}</h2>
            </div>
            <span className="rounded-full bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300">
              {automation.status}
            </span>
          </div>
          <div className="mt-6 grid gap-3">
            <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Trigger</p>
              <p className="mt-2 font-mono text-sm text-white">{automation.trigger}</p>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Action</p>
              <p className="mt-2 text-sm text-slate-300">{automation.action}</p>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button type="button" className="ghost-button">Edit flow</button>
            <button type="button" className="ghost-button">View logs</button>
            <button type="button" className="primary-button">Duplicate</button>
          </div>
        </article>
      ))}
    </div>
  );
}

export function PaymentsPage() {
  return (
    <article className="card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Payments</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Send links, collect payment, track revenue</h2>
        </div>
        <div className="flex gap-3">
          <button type="button" className="ghost-button">Remind pending</button>
          <button type="button" className="primary-button">Request payment</button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {payments.map((payment) => (
          <div key={payment.customer} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
            <p className="font-medium text-white">{payment.customer}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{payment.amount}</p>
            <p className="mt-2 text-sm text-slate-400">{payment.method}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-300">{payment.sent}</span>
              <span className="text-[var(--accent-2)]">{payment.status}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export function ReviewsPage() {
  const routingCards: Array<{ title: string; description: string; Icon: LucideIcon }> = [
    { title: "Promoters", description: "Sent to Google and Facebook review pages", Icon: CheckCircle2 },
    { title: "Neutral customers", description: "Requested private feedback before public ask", Icon: Clock3 },
    { title: "Detractors", description: "Escalated to service recovery workflow", Icon: Zap }
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <article className="card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Reviews</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Public wins and private recovery</h2>
          </div>
          <button type="button" className="primary-button">Launch review campaign</button>
        </div>
        <div className="mt-6 space-y-3">
          {reviews.map((review) => (
            <div key={review.customer} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-white">{review.customer}</p>
                <span className="rounded-full bg-white/8 px-3 py-1 text-xs text-slate-300">{review.status}</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{review.destination}</p>
              <p className="mt-3 text-lg text-[var(--accent)]">{review.score}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="card">
        <p className="eyebrow">Smart Routing</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Review automation outcomes</h2>
        <div className="mt-6 grid gap-4">
          {routingCards.map(({ title, description, Icon }) => (
            <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3 text-white">
                <div className="icon-wrap">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="font-medium">{title}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {analyticsCards.map((card) => (
          <article key={card.label} className="card">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{card.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{card.value}</p>
            <p className="mt-3 text-sm text-slate-300">{card.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="card">
          <p className="eyebrow">Leaderboard</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Top templates this month</h2>
          <div className="mt-6 space-y-3">
            {templates.map((template, index) => (
              <div key={template.name} className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-sm text-white">{index + 1}</span>
                  <div>
                    <p className="font-medium text-white">{template.name}</p>
                    <p className="text-sm text-slate-400">{template.category}</p>
                  </div>
                </div>
                <span className="text-[var(--accent-2)]">{template.winRate}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <p className="eyebrow">Attribution</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">SMS-driven revenue moments</h2>
          <div className="mt-6 space-y-3">
            {[
              "Spring tune-up promo generated $38,220 from 1,124 clicks.",
              "Payment reminders recovered $4,870 from six open invoices.",
              "Review requests drove 14 public ratings and 3 follow-up jobs.",
              "Smart-send transactional flows converted 12% better than manual sends."
            ].map((item) => (
              <div key={item} className="list-row rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
                <ArrowRight className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                <span className="text-sm leading-6 text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export function DevelopersPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {developerResources.map((resource) => (
        <article key={resource.title} className="card">
          <p className="eyebrow">Developer Surface</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{resource.title}</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">{resource.text}</p>
          <Link href={resource.href} className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--accent-2)]">
            Open resource
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      ))}
    </div>
  );
}
