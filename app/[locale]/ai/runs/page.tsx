import { prisma } from '@/lib/prisma';

export default async function AiRunsPage() {
  const runs = await prisma.coreAiRun.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  return <div className="space-y-2">{runs.map((r) => <div key={r.id}>{r.prompt} · {r.status}</div>)}</div>;
}
