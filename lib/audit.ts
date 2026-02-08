import { prisma } from '@/lib/prisma';

export async function writeAudit(params: {
  tenantId: string;
  actorUserId?: string;
  action: string;
  entity: string;
  before?: unknown;
  after?: unknown;
  meta?: unknown;
}) {
  return prisma.coreAuditLog.create({ data: params });
}
