import { PublicAuthRoute } from '@/components/access/public-auth-route';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicAuthRoute>
      <div className="grid min-h-svh lg:grid-cols-2">{children}</div>
    </PublicAuthRoute>
  );
}
