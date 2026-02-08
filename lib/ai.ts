import { prisma } from '@/lib/prisma';
import { writeAudit } from '@/lib/audit';

type DraftAction =
  | { type: 'setting_draft'; key: string; value: string }
  | { type: 'invite_draft'; email: string }
  | { type: 'install_app_draft'; appId: string }
  | { type: 'invoice_draft'; customer: string; amount: number };

export function parsePromptToActions(prompt: string): DraftAction[] {
  const text = prompt.toLowerCase();
  if (text.includes('invite') && text.includes('@')) {
    const email = prompt.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? 'teammate@example.com';
    return [{ type: 'invite_draft', email }];
  }
  if (text.includes('install') && text.includes('crm')) return [{ type: 'install_app_draft', appId: 'crm' }];
  if (text.includes('invoice')) return [{ type: 'invoice_draft', customer: 'Demo Customer', amount: 1000 }];
  return [{ type: 'setting_draft', key: 'general.note', value: prompt }];
}

export async function planAiRun(tenantId: string, actorUserId: string, prompt: string) {
  const actions = parsePromptToActions(prompt);
  return prisma.coreAiRun.create({
    data: { tenantId, actorUserId, prompt, plan: actions as unknown as object, status: 'preview_ready', toolCalls: [] }
  });
}

export async function executeAiRun(runId: string) {
  const run = await prisma.coreAiRun.findUniqueOrThrow({ where: { id: runId } });
  await prisma.coreAiRun.update({ where: { id: runId }, data: { status: 'executed', toolCalls: run.plan } });
  await writeAudit({
    tenantId: run.tenantId,
    actorUserId: run.actorUserId,
    action: 'ai.execute',
    entity: 'core_ai_runs',
    after: { runId, plan: run.plan }
  });
}
