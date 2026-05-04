import { useAdminAuthStore } from '../../stores/adminAuthStore';
import { User } from 'lucide-react';

export default function AdminHeader() {
  const admin = useAdminAuthStore((state) => state.admin);

  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản trị
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-700">
            <User size={20} />
            <span className="font-medium">{admin?.email || 'Admin'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
