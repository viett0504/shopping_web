import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../common/Button';

export default function OrderSummary({ subtotal, onCheckout, checkoutLabel = 'Tiến hành thanh toán' }) {
  const shipping = 0; // Free shipping for demo
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Tạm tính</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className="font-medium text-green-600">Miễn phí</span>
        </div>
        
        <div className="border-t pt-3 flex justify-between">
          <span className="text-lg font-semibold">Tổng cộng</span>
          <span className="text-lg font-bold text-blue-600">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <Button
        onClick={onCheckout}
        className="w-full"
        size="lg"
      >
        {checkoutLabel}
      </Button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Miễn phí vận chuyển cho đơn từ 200.000đ
      </p>
    </div>
  );
}
