'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Role } from '@/lib/enums/role';
import { useRouter } from '@/lib/i18n/navigation';
import { useAppSelector } from '@/lib/store';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect } from 'react';

interface PublicAuthRouteProps {
  children: ReactNode;
}

export function PublicAuthRoute({ children }: PublicAuthRouteProps) {
  const t = useTranslations('Layout.ProtectedRoute');
  const router = useRouter();
  const { user, isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isInitialized) return;

    if (user) {
      if (user.role === Role.SUPER_ADMIN) {
        router.push('/super-admin');
      } else if (user.role === Role.ADMIN) {
        router.push('/admin');
      } else {
        router.push('/lessons');
      }
    }
  }, [isInitialized, user, router]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
            <span className="text-muted-foreground text-sm">{t('loading')}</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
            <span className="text-muted-foreground text-sm">{t('redirecting')}</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
