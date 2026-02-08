import { prisma } from '@/lib/prisma';

export async function requireTenantContext(userId: string, tenantId: string) {
  const membership = await prisma.coreMembership.findUnique({
    where: { tenantId_userId: { tenantId, userId } },
    include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } }
  });
  if (!membership || membership.status !== 'active') throw new Error('Unauthorized tenant access');
  const permissions = membership.roles.flatMap((r) => r.role.permissions.map((p) => p.permission.key));
  return { membership, permissions };
}

export function requirePermission(granted: string[], needed: string) {
  if (!granted.includes(needed)) throw new Error(`Missing permission: ${needed}`);
}
