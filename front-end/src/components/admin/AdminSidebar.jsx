import { Link, useLocation } from 'react-router-dom';
import { useAdminAuthStore } from '../../stores/adminAuthStore';
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingBag,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/products', label: 'Sản phẩm', icon: Package },
  { path: '/admin/categories', label: 'Danh mục', icon: FolderOpen },
  { path: '/admin/orders', label: 'Đơn hàng', icon: ShoppingBag },
];

export default function AdminSidebar() {
  const location = useLocation();
  const logout = useAdminAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/admin/dashboard" className="text-2xl font-bold">
          SportStore
        </Link>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                           (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 w-full transition-colors"
        >
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
