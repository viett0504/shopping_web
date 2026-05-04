import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../../services/dashboardService';
import { formatCurrency } from '../../utils/formatCurrency';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import { Package, FolderOpen, ShoppingBag, Clock, DollarSign } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, ordersData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentOrders(5),
      ]);
      setStats(statsData);
      setRecentOrders(ordersData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton className="h-32" />
        <LoadingSkeleton className="h-64" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Tổng sản phẩm',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      label: 'Danh mục',
      value: stats?.totalCategories || 0,
      icon: FolderOpen,
      color: 'bg-green-500',
    },
    {
      label: 'Đơn hàng',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'bg-purple-500',
    },
    {
      label: 'Chờ xử lý',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'bg-orange-500',
    },
    {
      label: 'Doanh thu',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: 'bg-pink-500',
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      pending: { variant: 'warning', label: 'Chờ xử lý' },
      confirmed: { variant: 'info', label: 'Đã xác nhận' },
      shipping: { variant: 'info', label: 'Đang giao' },
      delivered: { variant: 'success', label: 'Đã giao' },
      cancelled: { variant: 'error', label: 'Đã hủy' },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Tổng quan hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Đơn hàng gần đây</h3>
          <Link to="/admin/orders">
            <Button variant="outline" size="sm">
              Xem tất cả
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Mã đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ngày đặt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-blue-600">{order.orderCode}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-gray-600">{order.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/admin/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        Xem
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/products/new" className="block">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <Package size={32} className="text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Thêm sản phẩm mới</h3>
            <p className="text-gray-600 text-sm">Tạo sản phẩm mới cho cửa hàng</p>
          </div>
        </Link>
        <Link to="/admin/orders?status=pending" className="block">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <Clock size={32} className="text-orange-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Đơn hàng chờ xử lý</h3>
            <p className="text-gray-600 text-sm">Xem và xử lý đơn hàng mới</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
