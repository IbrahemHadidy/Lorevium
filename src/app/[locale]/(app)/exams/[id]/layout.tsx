import { ProtectedRoute } from '@/components/access/protected-route';
import { Role } from '@/lib/enums/role';

export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requiredRoles={[Role.USER]}>{children}</ProtectedRoute>;
}
