  import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuthStore } from '../../stores/adminAuthStore';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    } else {
      // Redirect to profile page for login
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return null;
}
