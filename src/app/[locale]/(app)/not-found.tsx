import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/lib/i18n/navigation';
import { Ban } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardContent className="flex flex-col items-center gap-6 p-6">
          <Ban className="text-destructive h-16 w-16" />
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
          <Button asChild className="mt-4">
            <Link href="/">{t('backHome')}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
