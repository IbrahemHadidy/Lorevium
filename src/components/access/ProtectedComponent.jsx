import { useSelector } from 'react-redux';

export function ProtectedComponent({ children, requiredRoles }) {
  const { user } = useSelector((state) => state.auth);

  if (!user || (requiredRoles && !requiredRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
