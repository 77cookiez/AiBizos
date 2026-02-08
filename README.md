# AiBizos – AI Business OS Core

Next.js 14 + TypeScript + Tailwind + Prisma + NextAuth + next-intl core for multi-tenant AI-first operations.

## Setup
1. `cp .env.example .env`
2. Set `DATABASE_URL` and `NEXTAUTH_SECRET`
3. `npm install`
4. `npx prisma migrate dev`
5. `npm run prisma:seed`
6. `npm run dev`

## Brand assets
Copy the provided PNG assets into `assets/brand/` with exact filenames. Copy `assets/brand/favicon.png` to `public/favicon.png`.

## Add a module app
1. Create `/modules/<appId>/manifest.ts`.
2. Add app metadata (`id, routes, permissions, events, aiActions`).
3. Seed into `core_apps_registry`.
4. App appears in marketplace and tenant install table `core_tenant_apps`.

## Permissions
- Global catalog in `core_permissions`.
- Tenant roles in `core_roles` + `core_role_permissions`.
- Membership role assignment in `core_membership_roles`.
- Enforce with `requireTenantContext` + `requirePermission`.

## Events + audit
- Publish events with `publishEvent(tenantId, type, payload, actor)` => persists `core_events`.
- Write audit logs with `writeAudit(...)` => persists `core_audit_logs`.
- Every human/AI action should call audit writer.

## AI actions
Flow:
1. Prompt
2. Plan (`parsePromptToActions` deterministic fallback)
3. Dry-run preview (stored in AI run plan/toolCalls)
4. Confirm
5. Execute (`executeAiRun`) with audit entry

Demo actions:
- tenant setting draft
- invite draft
- install app draft
- invoice draft (never finalized)

## Security notes
- Tenant-owned tables include `tenantId` with composite indexes.
- Invitation token hashes only (`sha256`) in storage.
- Invitations support pending/accepted/revoked/expired with expiry index.
