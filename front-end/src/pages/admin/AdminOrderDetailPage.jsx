import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminOrderService } from '../../services/adminOrderService';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Select from '../../components/common/Select';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await adminOrderService.getOrderById(id);
      setOrder(data);
      setNewStatus(data.status);
    } catch (error) {
      console.error('Error loading order:', error);
      toast.error('Không thể tải thông tin đơn hàng');
      navigate('/admin/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (newStatus === order.status) {
      toast.error('Vui lòng chọn trạng thái mới');
      return;
    }

    try {
      setUpdating(true);
      await adminOrderService.updateOrderStatus(id, newStatus);
      toast.success('Đã cập nhật trạng thái đơn hàng');
      loadOrder();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Không thể cập nhật trạng thái');
    } finally {
      setUpdating(false);
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

  if (!order) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/orders">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-1" />
              Quay lại
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Đơn hàng #{order.orderCode}
            </h2>
            <p className="text-gray-600">
              Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>
        {getStatusBadge(order.status)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Thông tin khách hàng</h3>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="w-32 text-gray-600">Họ tên:</span>
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">Số điện thoại:</span>
                <span className="font-medium">{order.phone}</span>
              </div>
              {order.email && (
                <div className="flex">
                  <span className="w-32 text-gray-600">Email:</span>
                  <span className="font-medium">{order.email}</span>
                </div>
              )}
              <div className="flex">
                <span className="w-32 text-gray-600">Địa chỉ:</span>
                <span className="font-medium">{order.address}</span>
              </div>
              {order.note && (
                <div className="flex">
                  <span className="w-32 text-gray-600">Ghi chú:</span>
                  <span className="font-medium">{order.note}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Sản phẩm đã đặt</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-600">
                      {item.size && `Size: ${item.size}`}
                      {item.size && item.color && ' • '}
                      {item.color && `Màu: ${item.color}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(item.price)} x {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary & Status Update */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Mã đơn:</span>
                <span className="font-medium">{order.orderCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thanh toán:</span>
                <span className="font-medium">
                  {order.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trạng thái:</span>
                {getStatusBadge(order.status)}
              </div>
              <div className="flex justify-between pt-3 border-t text-lg font-bold">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Update Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Cập nhật trạng thái</h3>
            <div className="space-y-4">
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                options={[
                  { value: 'pending', label: 'Chờ xử lý' },
                  { value: 'confirmed', label: 'Đã xác nhận' },
                  { value: 'shipping', label: 'Đang giao' },
                  { value: 'delivered', label: 'Đã giao' },
                  { value: 'cancelled', label: 'Đã hủy' },
                ]}
              />
              <Button
                onClick={handleUpdateStatus}
                className="w-full"
                disabled={updating || newStatus === order.status}
              >
                {updating ? 'Đang cập nhật...' : 'Cập nhật trạng thái'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
