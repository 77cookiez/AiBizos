import { prisma } from '@/lib/prisma';

export async function publishEvent(tenantId: string, type: string, payload: unknown, actor: unknown) {
  return prisma.coreEvent.create({ data: { tenantId, type, payload: payload as object, actor: actor as object } });
}
