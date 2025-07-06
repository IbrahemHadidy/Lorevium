'use client';

import { useAppSelector } from '@/lib/store';
import type { Role } from '@/lib/enums/role';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProtectedComponentProps {
  children: React.ReactNode;
  requiredRoles?: Role[];
}

export function ProtectedComponent({ children, requiredRoles }: ProtectedComponentProps) {
  const { user, isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
            <span className="text-muted-foreground text-sm">Loading...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
