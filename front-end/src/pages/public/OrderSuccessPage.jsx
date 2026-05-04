import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';

export default function OrderSuccessPage() {
  const { orderCode } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderCode]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const orderData = await orderService.getOrderByCode(orderCode);
      setOrder(orderData);
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <LoadingSkeleton className="h-96 max-w-2xl mx-auto" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Đặt hàng thành công!
        </h1>
        <p className="text-gray-600 mb-8">
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.
        </p>

        {/* Order Info */}
        {order && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-left">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold mb-2">Thông tin đơn hàng</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã đơn hàng:</span>
                  <span className="font-medium">{order.orderCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày đặt:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức thanh toán:</span>
                  <span>
                    {order.paymentMethod === 'cod'
                      ? 'Thanh toán khi nhận hàng'
                      : 'Chuyển khoản ngân hàng'}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h3 className="font-semibold mb-2">Thông tin người nhận</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{order.customerName}</p>
                <p>{order.phone}</p>
                {order.email && <p>{order.email}</p>}
                <p>{order.address}</p>
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h3 className="font-semibold mb-3">Sản phẩm đã đặt</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.productName}</p>
                      <p className="text-xs text-gray-600">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' • '}
                        {item.color && `Màu: ${item.color}`}
                      </p>
                      <p className="text-sm">
                        {formatCurrency(item.price)} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-blue-600">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button size="lg" variant="primary" className="w-full sm:w-auto">
              Tiếp tục mua sắm
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Về trang chủ
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-left">
          <p className="font-medium mb-2">📦 Thông tin giao hàng:</p>
          <ul className="space-y-1 text-gray-600">
            <li>• Đơn hàng sẽ được xử lý trong vòng 24h</li>
            <li>• Thời gian giao hàng: 2-5 ngày làm việc</li>
            <li>• Miễn phí vận chuyển cho đơn hàng từ 200.000đ</li>
            <li>• Hỗ trợ đổi trả trong vòng 7 ngày</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
