import { prisma } from '@/lib/prisma';

export default async function AppsPage() {
  const apps = await prisma.coreAppRegistry.findMany();
  return <div className="space-y-4">{apps.map((app) => <div key={app.id} className="rounded border border-slate-700 p-3">{app.id}</div>)}</div>;
}
