'use client';

import type { Role } from '@/lib/enums/role';
import { useAppSelector } from '@/lib/store';

interface ProtectedComponentProps {
  children: React.ReactNode;
  requiredRoles?: Role[];
}

export function ProtectedComponent({ children, requiredRoles }: ProtectedComponentProps) {
  const { user, isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized || !user || (requiredRoles && !requiredRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
