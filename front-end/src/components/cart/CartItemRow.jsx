import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import useCartStore from '../../stores/cartStore';
import Button from '../common/Button';

export default function CartItemRow({ item }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCartStore();

  const displayPrice = item.salePrice || item.price;
  const subtotal = displayPrice * item.quantity;

  const handleIncrease = () => {
    increaseQuantity(item.productId, item.size, item.color);
  };

  const handleDecrease = () => {
    decreaseQuantity(item.productId, item.size, item.color);
  };

  const handleRemove = () => {
    removeItem(item.productId, item.size, item.color);
  };

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Image */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
        
        <div className="text-sm text-gray-600 space-y-1">
          {item.size && <p>Size: {item.size}</p>}
          {item.color && <p>Màu: {item.color}</p>}
          <p className="font-semibold text-blue-600">
            {formatCurrency(displayPrice)}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border rounded">
            <button
              onClick={handleDecrease}
              className="p-2 hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 border-x">{item.quantity}</span>
            <button
              onClick={handleIncrease}
              className="p-2 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 size={16} className="mr-1" />
            Xóa
          </Button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="font-bold text-lg text-gray-900">
          {formatCurrency(subtotal)}
        </p>
      </div>
    </div>
  );
}
