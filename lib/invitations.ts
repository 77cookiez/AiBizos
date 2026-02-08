import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export function createInviteToken() {
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  return { token, tokenHash };
}

export function buildInviteMessage(link: string, tenantName: string) {
  return `You've been invited to join ${tenantName} on AiBizos. Open this secure invite: ${link}`;
}

export async function expireStaleInvites() {
  await prisma.coreInvitation.updateMany({
    where: { status: 'pending', expiresAt: { lt: new Date() } },
    data: { status: 'expired' }
  });
}
