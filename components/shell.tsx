import Link from 'next/link';
import { ReactNode } from 'react';
import { BrandAsset } from './brand-asset';

export function AppShell({ children, locale }: { children: ReactNode; locale: string }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid grid-cols-[240px_1fr]">
        <aside className="border-e border-slate-700 p-4">
          <BrandAsset variant="logo-light" alt="AiBizos" className="mb-8 h-auto w-36" />
          <nav className="space-y-2 text-sm">
            <Link href={`/${locale}`}>Dashboard</Link><br />
            <Link href={`/${locale}/apps`}>Apps</Link><br />
            <Link href={`/${locale}/settings`}>Settings</Link><br />
            <Link href={`/${locale}/admin/users`}>Users</Link><br />
            <Link href={`/${locale}/admin/roles`}>Roles</Link><br />
            <Link href={`/${locale}/admin/audit`}>Audit</Link><br />
            <Link href={`/${locale}/admin/events`}>Events</Link><br />
            <Link href={`/${locale}/ai/runs`}>AI Runs</Link>
          </nav>
        </aside>
        <main>
          <header className="flex items-center justify-between border-b border-slate-700 p-4">
            <input className="w-full max-w-2xl rounded-md bg-slate-800 px-3 py-2" placeholder="Ask AI: plan then preview then confirm" />
            <div className="ms-4 text-xs text-muted">Company | Locale | Profile</div>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
