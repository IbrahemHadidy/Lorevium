import { ProtectedRoute } from "@/components/access/protected-route";
import { Role } from "@/lib/enums/role";

export default function SuperAdminLayout ({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requiredRoles={[Role.SUPER_ADMIN]}>{children}</ProtectedRoute>
}