import { prisma } from '@/lib/prisma';

export default async function EventsPage() {
  const events = await prisma.coreEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  return <div className="space-y-2">{events.map((e) => <div key={e.id}>{e.type}</div>)}</div>;
}
