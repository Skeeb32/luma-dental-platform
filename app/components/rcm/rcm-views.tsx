"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Copy,
  Download,
  Filter,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  X
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import {
  agingData,
  allocationClaims,
  chartData,
  claims,
  marketplaceProducts,
  marketOrders,
  paymentBatches,
  tasks,
  type Claim,
  type ClaimStatus
} from "@/lib/rcm-data";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const statusCopy: Record<ClaimStatus, string> = {
  SUBMITTED: "Submitted",
  IN_REVIEW: "In review",
  PENDING: "Pending",
  DENIED: "Denied",
  PAID: "Paid",
  FOLLOW_UP_REQUIRED: "Follow up",
  CLOSED: "Closed"
};

function StatusBadge({ status }: { status: ClaimStatus }) {
  return <span className={`status-badge status-${status.toLowerCase().replaceAll("_", "-")}`}>{statusCopy[status]}</span>;
}

function MiniAvatar({ initials, muted = false }: { initials: string; muted?: boolean }) {
  return <span className={`avatar ${muted ? "avatar-muted" : ""}`}>{initials}</span>;
}

function MetricCard({ label, value, note, direction = "up", tone = "teal" }: { label: string; value: string; note: string; direction?: "up" | "down"; tone?: "teal" | "amber" | "navy" }) {
  const Direction = direction === "up" ? ArrowUpRight : ArrowDownRight;
  return (
    <article className="metric-card">
      <div className="metric-card-top">
        <span>{label}</span>
        <span className={`metric-icon metric-icon-${tone}`}><Direction size={16} /></span>
      </div>
      <p>{value}</p>
      <small className={direction === "up" ? "positive" : "neutral"}>{note}</small>
    </article>
  );
}

export function OverviewPage() {
  const [range, setRange] = useState("Last 30 days");
  const [showRanges, setShowRanges] = useState(false);

  return (
    <div className="space-y-6">
      <section className="page-toolbar">
        <div>
          <p className="section-kicker">Revenue performance</p>
          <h2>Good morning, Elena.</h2>
          <p>Here&apos;s how Lakeview Dental is moving revenue today.</p>
        </div>
        <div className="relative">
          <button type="button" className="filter-button" onClick={() => setShowRanges((current) => !current)}>
            <span className="range-dot" />{range}<ChevronDown size={16} />
          </button>
          {showRanges ? (
            <div className="range-menu">
              {["Today", "Last 7 days", "Last 30 days", "Last 90 days", "Custom range"].map((option) => (
                <button key={option} type="button" onClick={() => { setRange(option); setShowRanges(false); }}>{option}{option === range ? <Check size={15} /> : null}</button>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard label="Outstanding claims" value="$48,430" note="8.2% lower than last period" />
        <MetricCard label="Needs follow up" value="14 claims" note="4 due today" tone="amber" direction="down" />
        <MetricCard label="Payments received" value="$31,280" note="12.4% above target" tone="navy" />
        <MetricCard label="Unreconciled payments" value="$5,740" note="3 deposits need review" tone="amber" direction="down" />
      </section>

      <section className="overview-grid">
        <article className="panel revenue-panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Collections</p>
              <h3>Revenue collected</h3>
            </div>
            <button type="button" className="text-button">View report <ArrowRight size={15} /></button>
          </div>
          <div className="chart-summary">
            <strong>$94,620</strong>
            <span className="positive"><TrendingUp size={14} /> 11.8% vs. previous period</span>
          </div>
          <div className="revenue-chart" aria-label="Collections chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 12, right: 8, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="collectionsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f9f91" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0f9f91" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e7eeed" strokeDasharray="3 3" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#7e908e", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#7e908e", fontSize: 11 }} tickFormatter={(value) => `$${value}k`} />
                <Tooltip formatter={(value: number) => [`$${value}k`, "Collected"]} contentStyle={{ borderRadius: 12, border: "1px solid #dce7e4", boxShadow: "0 10px 24px rgba(22, 57, 54, .12)" }} />
                <Area type="monotone" dataKey="collected" stroke="#0f9f91" strokeWidth={2.5} fill="url(#collectionsFill)" />
                <Area type="monotone" dataKey="submitted" stroke="#94a9a5" strokeWidth={1.5} strokeDasharray="4 4" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend"><span><i className="legend-teal" />Collected</span><span><i className="legend-gray" />Claims submitted</span></div>
        </article>

        <article className="panel attention-panel">
          <div className="panel-heading">
            <div><p className="section-kicker">Priority work</p><h3>Requires attention</h3></div>
            <span className="attention-count">14</span>
          </div>
          <div className="attention-list">
            {claims.filter((claim) => claim.status === "FOLLOW_UP_REQUIRED" || claim.status === "DENIED").slice(0, 3).map((claim) => (
              <Link href={`/claims/${claim.id}`} className="attention-row" key={claim.id}>
                <MiniAvatar initials={claim.initials} />
                <div><strong>{claim.patient}</strong><span>{claim.id} · {money(claim.outstanding)}</span></div>
                <StatusBadge status={claim.status} />
              </Link>
            ))}
          </div>
          <Link href="/claims?status=FOLLOW_UP_REQUIRED" className="full-width-link">View all claims needing action <ArrowRight size={16} /></Link>
        </article>
      </section>

      <section className="insights-grid">
        <article className="panel"><div className="panel-heading"><div><p className="section-kicker">A/R health</p><h3>Claims aging</h3></div><span className="muted-label">$48,430 open</span></div>
          <div className="aging-list">{agingData.map((item) => <div className="aging-row" key={item.label}><span>{item.label}</span><div className="aging-bar"><i className={item.tone} style={{ width: item.width }} /></div><strong>{item.value}</strong><small>{item.count}</small></div>)}</div>
          <Link href="/analytics" className="full-width-link">Open aging report <ArrowRight size={16} /></Link>
        </article>
        <article className="panel assistant-preview"><div className="assistant-orb"><Sparkles size={19} /></div><div><p className="section-kicker">RCM assistant</p><h3>Find your next best action</h3></div>
          <p>Three claims are approaching payer follow-up thresholds. Review the recommended outreach before they age further.</p>
          <Link href="/claims/CLM-10482" className="ai-button"><Bot size={16} /> Review recommendations <ArrowRight size={16} /></Link>
        </article>
      </section>
    </div>
  );
}

type SortField = "patient" | "outstanding" | "age" | "submitted";

export function ClaimsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | ClaimStatus>("ALL");
  const [sort, setSort] = useState<SortField>("age");
  const [descending, setDescending] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [bulkMessage, setBulkMessage] = useState("");

  const filtered = useMemo(() => claims.filter((claim) => {
    const haystack = `${claim.id} ${claim.patient} ${claim.payer} ${claim.procedure}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (status === "ALL" || claim.status === status);
  }).sort((a, b) => {
    const values: Record<SortField, [string | number, string | number]> = { patient: [a.patient, b.patient], outstanding: [a.outstanding, b.outstanding], age: [a.age, b.age], submitted: [a.submitted, b.submitted] };
    const [first, second] = values[sort];
    const result = typeof first === "number" && typeof second === "number" ? first - second : String(first).localeCompare(String(second));
    return descending ? -result : result;
  }), [query, status, sort, descending]);

  function selectAll() { setSelected(selected.length === filtered.length ? [] : filtered.map((claim) => claim.id)); }
  function select(id: string) { setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); }
  function sortBy(field: SortField) { if (sort === field) setDescending((current) => !current); else { setSort(field); setDescending(true); } }

  return <div className="space-y-5">
    <section className="page-toolbar claims-toolbar"><div><p className="section-kicker">Revenue cycle</p><h2>Claims</h2><p>Track status, resolve exceptions, and keep your team moving.</p></div><div className="toolbar-actions"><button className="secondary-button" type="button"><Download size={16} /> Export</button><button className="primary-button" type="button"><Plus size={17} /> New claim</button></div></section>
    <section className="claims-summary"><div><span>Open A/R</span><strong>$48,430</strong></div><div><span>Average claim age</span><strong>26 days</strong></div><div><span>Claims at risk</span><strong className="warning-text">12</strong></div><div><span>Clean claim rate</span><strong>94.2%</strong></div></section>
    <section className="panel claims-table-panel">
      <div className="table-controls"><label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patient, claim ID, or payer" /></label><div className="filter-group"><Filter size={16} /><select aria-label="Filter claims by status" value={status} onChange={(event) => setStatus(event.target.value as "ALL" | ClaimStatus)}><option value="ALL">All statuses</option>{Object.entries(statusCopy).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><button type="button" className="secondary-button"><ChevronDown size={16} /> More filters</button></div>
      {bulkMessage ? <div className="bulk-toast"><CheckCircle2 size={16} />{bulkMessage}<button onClick={() => setBulkMessage("")} aria-label="Dismiss"><X size={15} /></button></div> : null}
      {selected.length ? <div className="bulk-bar"><strong>{selected.length} selected</strong><button onClick={() => setBulkMessage(`Follow-up tasks created for ${selected.length} claim${selected.length > 1 ? "s" : ""}.`)}><Send size={15} /> Create follow-up</button><button onClick={() => setSelected([])}>Clear selection</button></div> : null}
      <div className="table-scroll"><table className="claims-table"><thead><tr><th><input aria-label="Select all claims" checked={filtered.length > 0 && selected.length === filtered.length} onChange={selectAll} type="checkbox" /></th><th>Claim</th><th><button onClick={() => sortBy("patient")}>Patient <SortArrow active={sort === "patient"} descending={descending} /></button></th><th>Payer</th><th>Service date</th><th><button onClick={() => sortBy("outstanding")}>Outstanding <SortArrow active={sort === "outstanding"} descending={descending} /></button></th><th>Status</th><th><button onClick={() => sortBy("age")}>Age <SortArrow active={sort === "age"} descending={descending} /></button></th><th>Assignee</th><th /></tr></thead><tbody>{filtered.map((claim) => <ClaimRow claim={claim} key={claim.id} selected={selected.includes(claim.id)} onSelect={() => select(claim.id)} />)}</tbody></table></div>
      {filtered.length === 0 ? <div className="empty-state"><AlertCircle size={20} /><strong>No claims match those filters</strong><p>Try a different search or clear the selected status.</p><button type="button" className="text-button" onClick={() => { setQuery(""); setStatus("ALL"); }}>Clear filters</button></div> : <footer className="table-footer"><span>Showing <strong>{filtered.length}</strong> of 142 claims</span><div><button aria-label="Previous page" type="button" disabled><ChevronLeft size={16} /></button><span className="page-current">1</span><button aria-label="Next page" type="button"><ChevronRight size={16} /></button></div></footer>}
    </section>
  </div>;
}

function SortArrow({ active, descending }: { active: boolean; descending: boolean }) { return <span className={active ? "sort-active" : ""}>{descending ? "↓" : "↑"}</span>; }

function ClaimRow({ claim, selected, onSelect }: { claim: Claim; selected: boolean; onSelect: () => void }) {
  return <tr className={selected ? "row-selected" : ""}><td><input aria-label={`Select ${claim.id}`} type="checkbox" checked={selected} onChange={onSelect} /></td><td><Link href={`/claims/${claim.id}`} className="claim-id">{claim.id}</Link><span className="claim-procedure">{claim.procedure}</span></td><td><Link href={`/claims/${claim.id}`} className="patient-cell"><MiniAvatar initials={claim.initials} /><span>{claim.patient}</span></Link></td><td><span className="payer-cell"><i>{claim.payerMark}</i>{claim.payer}</span></td><td>{claim.dateOfService}</td><td><strong>{money(claim.outstanding)}</strong><span className="paid-subtext">of {money(claim.billed)}</span></td><td><StatusBadge status={claim.status} /></td><td><span className={claim.age > 30 ? "age-risk" : ""}>{claim.age}d</span><span className="paid-subtext">{claim.followUp}</span></td><td><span className="assignee-chip"><MiniAvatar initials={claim.assignee.split(" ").map((part) => part[0]).join("")} muted />{claim.assignee}</span></td><td><Link aria-label={`View ${claim.id}`} href={`/claims/${claim.id}`} className="row-action"><MoreHorizontal size={19} /></Link></td></tr>;
}

export function ClaimDetailPage({ claimId }: { claimId: string }) {
  const claim = claims.find((item) => item.id === claimId) ?? claims[0];
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([{ text: "Payer portal shows the claim was received and is pending a clinical review.", author: "Elena Martinez", time: "Today · 9:18 AM" }]);
  const [generated, setGenerated] = useState(false);
  const [message, setMessage] = useState("Hello, I’m following up on claim CLM-10482 for Maya Thompson, date of service September 3. Could you confirm its current processing status and let us know whether any additional information is needed?");
  const [copied, setCopied] = useState(false);

  function addNote() { if (!note.trim()) return; setNotes((current) => [{ text: note.trim(), author: "Elena Martinez", time: "Just now" }, ...current]); setNote(""); }

  return <div className="space-y-5">
    <div className="detail-breadcrumb"><Link href="/claims">Claims</Link><ChevronRight size={14} /><span>{claim.id}</span></div>
    <section className="detail-header"><div className="patient-head"><MiniAvatar initials={claim.initials} /><div><div className="flex-line"><h2>{claim.patient}</h2><StatusBadge status={claim.status} /></div><p>{claim.id} · {claim.procedure} · Date of service {claim.dateOfService}</p></div></div><div className="header-actions"><button type="button" className="secondary-button"><MoreHorizontal size={18} /> Actions</button><button type="button" className="primary-button"><Send size={16} /> Start follow-up</button></div></section>
    <section className="detail-layout">
      <main className="space-y-5"><article className="panel detail-amount-panel"><div><span>Outstanding balance</span><strong>{money(claim.outstanding)}</strong><p>of {money(claim.billed)} billed</p></div><div className="amount-stat"><span>Amount paid</span><strong>{money(claim.paid)}</strong><p>0 payments posted</p></div><div className="amount-stat"><span>Claim age</span><strong>{claim.age} days</strong><p>Submitted {claim.submitted}</p></div><div className="amount-stat"><span>Last activity</span><strong>Today</strong><p>Note added at 9:18 AM</p></div></article>
        <article className="panel"><div className="panel-heading"><div><p className="section-kicker">Claim history</p><h3>Timeline</h3></div><button type="button" className="text-button">View all activity <ArrowRight size={15} /></button></div><div className="timeline"><TimelineItem title="Follow-up required" description="The claim has been unpaid for 38 days. A payer call is recommended." time="Today · 8:00 AM" active /><TimelineItem title="Note added" description="Payer portal shows the claim was received and is pending a clinical review." time="Today · 9:18 AM" /><TimelineItem title="Claim submitted" description="Electronic claim accepted by Delta Dental clearinghouse." time="Aug 04 · 2:32 PM" /><TimelineItem title="Encounter finalized" description="Crown restoration for tooth #19 posted from practice management system." time="Aug 03 · 4:11 PM" /></div></article>
        <article className="panel"><div className="panel-heading"><div><p className="section-kicker">Internal collaboration</p><h3>Notes</h3></div><span className="muted-label">{notes.length} notes</span></div><div className="notes-list">{notes.map((item, index) => <div className="note-item" key={`${item.time}-${index}`}><MiniAvatar initials="EM" muted /><div><strong>{item.author}</strong><span>{item.time}</span><p>{item.text}</p></div></div>)}</div><div className="note-compose"><textarea aria-label="Add an internal note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add an internal note for the billing team…" /><button disabled={!note.trim()} onClick={addNote} type="button" className="primary-button">Add note</button></div></article>
      </main>
      <aside className="space-y-5"><article className="ai-card"><div className="ai-title"><span><Sparkles size={17} /></span><div><p>AI follow-up recommendation</p><small><i /> 92% confidence</small></div></div><h3>Contact Delta Dental for a status update.</h3><p>This claim has been unpaid for 38 days with no payment or denial on file. It is past Lakeview&apos;s 30-day follow-up policy.</p><div className="ai-reason"><span>Why now</span><p>Claims for this payer typically adjudicate in 19–28 days.</p></div><button type="button" className="ai-button" onClick={() => setGenerated(true)}><Sparkles size={16} /> Generate follow-up</button></article>
        {generated ? <article className="panel generated-message"><div className="panel-heading"><div><p className="section-kicker">Draft ready to review</p><h3>Suggested payer message</h3></div><button onClick={() => { navigator.clipboard?.writeText(message); setCopied(true); }} className="icon-text-button" type="button"><Copy size={15} /> {copied ? "Copied" : "Copy"}</button></div><textarea value={message} onChange={(event) => setMessage(event.target.value)} /><button type="button" className="primary-button full-button"><Check size={16} /> Mark follow-up complete</button></article> : null}
        <article className="panel compact-details"><p className="section-kicker">Claim details</p><div><span>Insurance</span><strong>{claim.payer}</strong></div><div><span>Subscriber ID</span><strong>DD-4529-816</strong></div><div><span>Assigned to</span><strong>{claim.assignee}</strong></div><div><span>Practice</span><strong>Lakeview Dental</strong></div></article>
      </aside>
    </section>
  </div>;
}

function TimelineItem({ title, description, time, active = false }: { title: string; description: string; time: string; active?: boolean }) { return <div className={`timeline-item ${active ? "timeline-active" : ""}`}><i>{active ? <AlertCircle size={15} /> : null}</i><div><div><strong>{title}</strong><span>{time}</span></div><p>{description}</p></div></div>; }

export function PaymentsPage() {
  const batch = paymentBatches[0];
  const [allocations, setAllocations] = useState<Record<string, string>>({ "CLM-10482": "1200", "CLM-10454": "750", "CLM-10437": "500" });
  const [reconciled, setReconciled] = useState(false);
  const applied = Object.values(allocations).reduce((total, amount) => total + (Number(amount) || 0), 0);
  const remaining = batch.amount - applied;
  const valid = remaining === 0 && allocationClaims.every((claim) => (Number(allocations[claim.id]) || 0) <= claim.balance);

  return <div className="space-y-5"><section className="page-toolbar claims-toolbar"><div><p className="section-kicker">Payment posting</p><h2>Payments</h2><p>Post payer remittances and reconcile every dollar to a claim.</p></div><div className="toolbar-actions"><button className="secondary-button" type="button"><Download size={16} /> Export deposits</button><button className="primary-button" type="button"><Plus size={17} /> Record payment</button></div></section>
    <section className="payments-layout"><article className="panel payment-list"><div className="panel-heading"><div><p className="section-kicker">Incoming remittances</p><h3>Payment batches</h3></div><button type="button" className="filter-button"><Filter size={15} /> All status</button></div>{paymentBatches.map((item, index) => <button type="button" className={`payment-row ${index === 0 ? "payment-selected" : ""}`} key={item.id}><span className="payment-symbol">$</span><div><strong>{item.payer}</strong><span>{item.id} · {item.received}</span></div><div><b>{money(item.amount)}</b><small className={item.status === "RECONCILED" ? "status-paid" : "status-pending"}>{item.status === "RECONCILED" ? "Reconciled" : item.status === "PARTIALLY_POSTED" ? "Partially posted" : "Needs review"}</small></div></button>)}</article>
      <article className="panel reconciliation-panel"><div className="panel-heading"><div><p className="section-kicker">Reconcile deposit</p><h3>{batch.payer} · {batch.id}</h3><span className="muted-label">Received today at 9:42 AM</span></div><StatusBadge status="FOLLOW_UP_REQUIRED" /></div><div className="deposit-summary"><div><span>Deposit total</span><strong>{money(batch.amount)}</strong></div><div><span>Applied</span><strong>{money(applied)}</strong></div><div className={remaining === 0 ? "balance-clear" : "balance-left"}><span>Unapplied</span><strong>{money(remaining)}</strong></div></div><div className="allocation-head"><div><span>Claim</span><span>Open balance</span><span>Apply amount</span></div></div><div className="allocation-list">{allocationClaims.map((claim) => { const allocated = Number(allocations[claim.id]) || 0; const exceeds = allocated > claim.balance; return <div className="allocation-row" key={claim.id}><div><strong>{claim.patient}</strong><span>{claim.id} · {claim.procedure}</span></div><span>{money(claim.balance)}</span><label className={exceeds ? "amount-input amount-invalid" : "amount-input"}><span>$</span><input aria-label={`Allocation for ${claim.id}`} min="0" max={claim.balance} type="number" value={allocations[claim.id] ?? ""} onChange={(event) => setAllocations((current) => ({ ...current, [claim.id]: event.target.value }))} /></label></div>; })}</div>{remaining < 0 ? <p className="allocation-error"><AlertCircle size={15} /> Allocation exceeds the deposit by {money(Math.abs(remaining))}.</p> : null}{allocationClaims.some((claim) => (Number(allocations[claim.id]) || 0) > claim.balance) ? <p className="allocation-error"><AlertCircle size={15} /> An allocation cannot exceed its claim balance.</p> : null}<div className="reconcile-footer"><p>{valid ? <><CheckCircle2 size={16} /> This deposit is fully allocated and ready to reconcile.</> : "Allocate the full deposit to continue."}</p><button type="button" disabled={!valid || reconciled} onClick={() => setReconciled(true)} className="primary-button">{reconciled ? <><Check size={16} /> Reconciled</> : "Post & reconcile payment"}</button></div></article></section>
  </div>;
}

export function TasksPage() {
  const [complete, setComplete] = useState<string[]>([]);
  return <div className="space-y-5"><section className="page-toolbar claims-toolbar"><div><p className="section-kicker">Team operations</p><h2>Work queue</h2><p>Focus the billing team on the actions that protect this week&apos;s revenue.</p></div><button type="button" className="primary-button"><Plus size={17} /> Create task</button></section><section className="task-grid"><article className="panel task-panel"><div className="panel-heading"><div><p className="section-kicker">My priorities</p><h3>Next up</h3></div><span className="attention-count">{tasks.length}</span></div><div className="task-list">{tasks.map((task) => <button type="button" key={task.id} onClick={() => setComplete((current) => current.includes(task.id) ? current.filter((id) => id !== task.id) : [...current, task.id])} className={`task-row ${complete.includes(task.id) ? "task-complete" : ""}`}><span className="task-check">{complete.includes(task.id) ? <Check size={14} /> : null}</span><div><strong>{task.title}</strong><span>{task.meta}</span></div><div><b className={task.priority === "High" ? "priority-high" : "priority-medium"}>{task.priority}</b><small>{task.due}</small></div></button>)}</div></article><article className="panel"><p className="section-kicker">Today&apos;s focus</p><h3>Protect $5,740 in payer payments</h3><p className="panel-copy">Three remittances need an allocation before the end-of-day reconciliation cutoff.</p><Link href="/payments" className="ai-button"><ClipboardCheck size={16} /> Reconcile payments <ArrowRight size={16} /></Link></article></section></div>;
}

export function MarketplacePage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const itemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const total = marketplaceProducts.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0);
  return <div className="marketplace"><header className="market-header"><Link href="/overview" className="market-logo"><span>ld</span><div>Lakeview Dental<small>Supply</small></div></Link><nav><a href="#shop">Shop</a><a href="#orders">Orders</a><a href="#favorites">Lists</a></nav><div><button type="button" className="market-search"><Search size={17} /> Search supplies</button><button type="button" className="market-cart">Cart <b>{itemCount}</b></button></div></header><main><section className="market-hero"><div><p>One marketplace. Better practice economics.</p><h1>Stock your day<br />without slowing it down.</h1><span>Contract pricing from the brands your team already trusts.</span><a href="#shop">Shop essentials <ArrowRight size={16} /></a></div><div className="market-hero-art"><div className="hero-box box-one">Lakeview<br />Dental</div><div className="hero-box box-two">✓</div><div className="hero-note">Free delivery<br /><strong>on orders $250+</strong></div></div></section><section id="shop" className="market-content"><div className="market-section-head"><div><p>Practice essentials</p><h2>Reorder what keeps your rooms moving.</h2></div><button type="button">Browse all supplies <ArrowRight size={16} /></button></div><div className="product-grid">{marketplaceProducts.map((product) => <article className="product-card" key={product.id}><div className={`product-art ${product.hue}`}><span>{product.icon}</span><small>{product.vendor}</small></div><p className="product-tag">{product.tag}</p><h3>{product.name}</h3><span>{product.detail}</span><div><strong>${product.price.toFixed(2)}</strong><button type="button" onClick={() => setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }))}>{cart[product.id] ? <><Check size={15} /> Added</> : <><Plus size={15} /> Add</>}</button></div></article>)}</div></section><section id="orders" className="market-bottom"><div><p>Order tracking</p><h2>What&apos;s on the way</h2>{marketOrders.map((order) => <div className="order-line" key={order.id}><span className={order.status === "In transit" ? "order-status transit" : "order-status"}>{order.status === "In transit" ? "↗" : "✓"}</span><div><strong>{order.id} <em>{order.status}</em></strong><span>{order.items} items · {order.eta}</span></div><b>{order.total}</b><ChevronRight size={18} /></div>)}</div><aside><p>Current cart</p><h2>{itemCount ? `${itemCount} item${itemCount > 1 ? "s" : ""} ready` : "Your cart is ready"}</h2><span>{itemCount ? `$${total.toFixed(2)} before tax and delivery` : "Save a list for recurring room setup."}</span><button type="button" disabled={!itemCount}>Review order <ArrowRight size={16} /></button></aside></section></main></div>;
}
