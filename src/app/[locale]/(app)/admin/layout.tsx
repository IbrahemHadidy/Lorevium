import { ProtectedRoute } from "@/components/access/protected-route";
import { Role } from "@/lib/enums/role";

export default function AdminLayout ({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requiredRoles={[Role.ADMIN]}>{children}</ProtectedRoute>
}