import { AppShell } from "@/app/components/saas/app-shell";
import { ClaimDetailPage } from "@/app/components/rcm/rcm-views";

export default async function Page({ params }: { params: Promise<{ claimId: string }> }) {
  const { claimId } = await params;
  return <AppShell><ClaimDetailPage claimId={claimId} /></AppShell>;
}
