import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AppShell } from '@/components/shell';

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const messages = await getMessages();
  const dir = params.locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <NextIntlClientProvider messages={messages} locale={params.locale}>
      <div dir={dir}>
        <AppShell locale={params.locale}>{children}</AppShell>
      </div>
    </NextIntlClientProvider>
  );
}
