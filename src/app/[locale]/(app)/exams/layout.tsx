import { ProtectedRoute } from '@/components/access/protected-route';
import { Role } from '@/lib/enums/role';

export default function ExamsLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requiredRoles={[Role.ADMIN, Role.USER]}>{children}</ProtectedRoute>;
}
