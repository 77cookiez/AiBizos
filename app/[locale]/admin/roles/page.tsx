import { prisma } from '@/lib/prisma';

export default async function RolesPage() {
  const roles = await prisma.coreRole.findMany({ include: { permissions: { include: { permission: true } } } });
  return <div className="space-y-2">{roles.map((r) => <div key={r.id}>{r.name}: {r.permissions.map((p) => p.permission.key).join(', ')}</div>)}</div>;
}
