import { Link } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import CartItemRow from '../../components/cart/CartItemRow';
import OrderSummary from '../../components/cart/OrderSummary';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';

export default function CartPage() {
  const { items, getTotalAmount } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <EmptyState
          icon="🛒"
          title="Giỏ hàng trống"
          description="Bạn chưa có sản phẩm nào trong giỏ hàng"
          action={
            <Link to="/products">
              <Button size="lg">Mua sắm ngay</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
        <span className="mx-2">/</span>
        <span>Giỏ hàng</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-sm">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          {/* Continue Shopping */}
          <Link to="/products">
            <Button variant="outline" className="w-full md:w-auto">
              ← Tiếp tục mua sắm
            </Button>
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
