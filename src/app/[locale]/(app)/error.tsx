'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/lib/i18n/navigation';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardContent className="flex flex-col items-center gap-6 p-6">
          <AlertTriangle className="text-destructive h-16 w-16" />
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
          <div className="mt-4 flex w-full flex-col gap-2">
            <Button onClick={() => reset()} className="w-full">
              {t('tryAgain')}
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">{t('backHome')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
