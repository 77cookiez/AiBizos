import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const tenants = await prisma.coreTenant.count();
  const users = await prisma.coreUser.count();
  const invites = await prisma.coreInvitation.count({ where: { status: 'pending' } });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card label="Tenants" value={tenants} />
      <Card label="Users" value={users} />
      <Card label="Pending Invites" value={invites} />
    </div>
  );
}

function Card({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg border border-slate-700 bg-slate-900 p-4"><p className="text-muted">{label}</p><p className="text-2xl">{value}</p></div>;
}
