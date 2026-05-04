import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { adminOrderService } from '../../services/adminOrderService';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Select from '../../components/common/Select';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import toast from 'react-hot-toast';
import { Eye } from 'lucide-react';

export default function AdminOrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusFilter = searchParams.get('status') || '';

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const params = statusFilter ? { status: statusFilter } : {};
      const data = await adminOrderService.getOrders(params);
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ status: value });
    } else {
      setSearchParams({});
    }
  };

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

  if (loading) {
    return <LoadingSkeleton className="h-96" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h2>
          <p className="text-gray-600">Danh sách tất cả đơn hàng</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-4">
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            options={[
              { value: '', label: 'Tất cả trạng thái' },
              { value: 'pending', label: 'Chờ xử lý' },
              { value: 'confirmed', label: 'Đã xác nhận' },
              { value: 'shipping', label: 'Đang giao' },
              { value: 'delivered', label: 'Đã giao' },
              { value: 'cancelled', label: 'Đã hủy' },
            ]}
            className="w-64"
          />
        </div>
      </div>

      {/* Orders Table */}
      {orders.length === 0 ? (
        <EmptyState
          icon="📦"
          title="Chưa có đơn hàng"
          description="Chưa có đơn hàng nào trong hệ thống"
        />
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                    Số điện thoại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Thanh toán
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
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-blue-600">{order.orderCode}</span>
                    </td>
                    <td className="px-6 py-4">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {order.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản'}
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
                          <Eye size={16} className="mr-1" />
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
      )}
    </div>
  );
}
