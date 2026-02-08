import { hash } from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { builtinApps } from '../lib/apps';

async function main() {
  const passwordHash = await hash('Password123!', 10);
  const user = await prisma.coreUser.upsert({
    where: { email: 'demo@aibizos.com' },
    update: {},
    create: { email: 'demo@aibizos.com', name: 'Demo User', passwordHash, preferences: { create: { locale: 'en', timezone: 'Asia/Riyadh' } } }
  });

  const t1 = await prisma.coreTenant.create({ data: { name: 'AiBizos Labs' } });
  const t2 = await prisma.coreTenant.create({ data: { name: 'Northwind MENA' } });

  const permissions = [
    'tenant.manage', 'users.invite', 'roles.manage', 'apps.manage', 'apps.view.crm', 'apps.view.invoicing', 'audit.view', 'events.view', 'ai.use'
  ];

  for (const key of permissions) {
    await prisma.corePermission.upsert({ where: { key }, update: {}, create: { key, description: key } });
  }

  for (const tenant of [t1, t2]) {
    const membership = await prisma.coreMembership.create({ data: { tenantId: tenant.id, userId: user.id, status: 'active' } });
    for (const roleName of ['Owner', 'Admin', 'Member', 'Viewer']) {
      const role = await prisma.coreRole.create({ data: { tenantId: tenant.id, name: roleName } });
      const rolePermissions = roleName === 'Viewer' ? ['audit.view', 'events.view'] : permissions;
      for (const key of rolePermissions) {
        const permission = await prisma.corePermission.findUniqueOrThrow({ where: { key } });
        await prisma.coreRolePermission.create({ data: { roleId: role.id, permissionId: permission.id } });
      }
      if (roleName === 'Owner') await prisma.coreMembershipRole.create({ data: { membershipId: membership.id, roleId: role.id } });
    }
  }

  for (const app of builtinApps) {
    await prisma.coreAppRegistry.upsert({ where: { id: app.id }, update: { manifest: app as unknown as object }, create: { id: app.id, manifest: app as unknown as object } });
  }
}

main().finally(async () => prisma.$disconnect());
