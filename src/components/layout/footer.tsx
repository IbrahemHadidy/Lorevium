import { getTranslations } from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations('Layout.Footer');

  return (
    <footer className="text-muted-foreground relative z-50 w-full max-w-[1550px] border-t p-4 text-center text-sm">
      <p>
        © {new Date().getFullYear()} {t('copyright')}
      </p>
    </footer>
  );
}
