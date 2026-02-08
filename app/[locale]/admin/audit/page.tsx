import { prisma } from '@/lib/prisma';

export default async function AuditPage() {
  const logs = await prisma.coreAuditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  return <div className="space-y-2">{logs.map((l) => <div key={l.id}>{l.action} · {l.entity}</div>)}</div>;
}
