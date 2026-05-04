import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCartStore } from '../../stores/cartStore';
import { orderService } from '../../services/orderService';
import { checkoutSchema } from '../../utils/validationSchemas';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalAmount, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const orderData = {
        customerName: data.customerName,
        phone: data.phone,
        email: data.email,
        address: `${data.address}, ${data.district}, ${data.province}`,
        note: data.note || '',
        paymentMethod,
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.name,
          size: item.size,
          color: item.color,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const order = await orderService.createOrder(orderData);
      clearCart();
      toast.success('Đặt hàng thành công!');
      navigate(`/order-success/${order.orderCode}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Đặt hàng thất bại. Vui lòng thử lại!');
    } finally {
      setSubmitting(false);
    }
  };

  const shippingFee = getTotalAmount() >= 200000 ? 0 : 30000;
  const total = getTotalAmount() + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simplified Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            SportStore
          </Link>
          <Link to="/cart" className="text-sm text-gray-600 hover:text-blue-600">
            ← Quay lại giỏ hàng
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Thanh toán</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
                <div className="space-y-4">
                  <Input
                    label="Họ và tên *"
                    {...register('customerName')}
                    error={errors.customerName?.message}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Số điện thoại *"
                      {...register('phone')}
                      error={errors.phone?.message}
                    />
                    <Input
                      label="Email"
                      type="email"
                      {...register('email')}
                      error={errors.email?.message}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Tỉnh/Thành phố *"
                      {...register('province')}
                      error={errors.province?.message}
                    />
                    <Input
                      label="Quận/Huyện *"
                      {...register('district')}
                      error={errors.district?.message}
                    />
                  </div>
                  <Input
                    label="Địa chỉ cụ thể *"
                    {...register('address')}
                    error={errors.address?.message}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ghi chú
                    </label>
                    <textarea
                      {...register('note')}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
                <div className="space-y-3">
                  <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
                      <div className="text-sm text-gray-600">
                        Thanh toán bằng tiền mặt khi nhận hàng
                      </div>
                    </div>
                  </label>
                  <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium">Chuyển khoản ngân hàng</div>
                      <div className="text-sm text-gray-600">
                        Chuyển khoản trước, giao hàng sau khi xác nhận
                      </div>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'bank_transfer' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Thông tin chuyển khoản:</p>
                    <p className="text-sm">Ngân hàng: Vietcombank</p>
                    <p className="text-sm">Số tài khoản: 1234567890</p>
                    <p className="text-sm">Chủ tài khoản: SPORT STORE</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Nội dung: [Họ tên] [Số điện thoại]
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Đơn hàng</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-600">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && ' • '}
                          {item.color && `Màu: ${item.color}`}
                        </p>
                        <p className="text-sm">
                          {formatCurrency(item.price)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tạm tính:</span>
                    <span>{formatCurrency(getTotalAmount())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Phí vận chuyển:</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        formatCurrency(shippingFee)
                      )}
                    </span>
                  </div>
                  {getTotalAmount() < 200000 && (
                    <p className="text-xs text-gray-600">
                      Mua thêm {formatCurrency(200000 - getTotalAmount())} để được miễn phí vận chuyển
                    </p>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">{formatCurrency(total)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6"
                  size="lg"
                  disabled={submitting}
                >
                  {submitting ? 'Đang xử lý...' : 'Đặt hàng'}
                </Button>

                <p className="text-xs text-gray-600 text-center mt-4">
                  Bằng việc đặt hàng, bạn đồng ý với{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Điều khoản sử dụng
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
