import { prisma } from '@/lib/prisma';

export default async function UsersAdminPage() {
  const memberships = await prisma.coreMembership.findMany({ include: { user: true, tenant: true } });
  return <div className="space-y-2">{memberships.map((m) => <div key={m.id}>{m.user.email} - {m.tenant.name}</div>)}</div>;
}
