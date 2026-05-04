import { Navigate } from 'react-router-dom';
import { useAdminAuthStore } from '../stores/adminAuthStore';

export default function AdminProtectedRoute({ children }) {
  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
