"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, HelpCircle, Menu, Plus, Search } from "lucide-react";

import { rcmNav } from "@/lib/rcm-data";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isClaimDetail = pathname.startsWith("/claims/");

  return <div className="rcm-app"><aside className="rcm-sidebar"><Link href="/overview" className="brand-lockup" aria-label="Luma RCM home"><span className="brand-mark"><i /><i /><i /></span><span>Luma <small>RCM</small></span></Link><div className="practice-switcher"><span className="practice-logo">L</span><div><strong>Lakeview Dental</strong><small>3 locations</small></div><ChevronDown size={15} /></div><nav className="rcm-nav" aria-label="Primary navigation"><p>Workspace</p>{rcmNav.map((item) => { const Icon = item.icon; const active = item.href === "/claims" ? pathname === "/claims" || isClaimDetail : pathname === item.href; return <Link key={item.href} href={item.href} className={active ? "nav-active" : ""}><Icon size={18} /><span>{item.label}</span>{item.badge ? <b>{item.badge}</b> : null}</Link>; })}</nav><div className="sidebar-foot"><Link href="/settings"><HelpCircle size={17} /> Help center</Link><button type="button" className="profile-row"><span className="avatar">EM</span><span><strong>Elena Martinez</strong><small>Practice manager</small></span><ChevronDown size={15} /></button></div></aside><main className="rcm-main"><header className="rcm-topbar"><button type="button" className="mobile-menu" aria-label="Open menu"><Menu size={19} /></button><label className="top-search"><Search size={17} /><input placeholder="Search claims, patients, or payments" aria-label="Global search" /><span>⌘ K</span></label><div className="topbar-actions"><button type="button" aria-label="Notifications" className="notification-button"><Bell size={18} /><i /></button><button type="button" className="quick-add"><Plus size={16} /> New <ChevronDown size={15} /></button></div></header><div className="rcm-page">{children}</div></main></div>;
}
