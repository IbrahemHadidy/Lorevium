import { StoreProvider } from '@/components/providers/store-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { routing } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils/cn';
import '@/styles/globals.css';
import { hasLocale, NextIntlClientProvider, type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { Cairo, IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Open_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';

const ibm = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});
const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['700'],
  display: 'swap',
});
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300'],
  display: 'swap',
});
const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400'],
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(ibmArabic.className, openSans.className, ibm.className, cairo.className)}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <StoreProvider>
              <Toaster dir={dir} richColors />
              <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
            </StoreProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
