import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import useCartStore from '../../stores/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    // If product has sizes or colors, should open modal
    // For demo, we'll just add with first size/color
    const item = {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      salePrice: product.salePrice,
      size: product.sizes?.[0],
      color: product.colors?.[0],
    };
    
    addItem(item);
    toast.success('Đã thêm vào giỏ hàng!');
  };

  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  return (
    <Link 
      to={`/products/${product.slug}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <Badge variant="new">Mới</Badge>}
          {hasDiscount && <Badge variant="sale">Sale</Badge>}
          {product.isBestSeller && <Badge variant="best-seller">Bán chạy</Badge>}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="shadow-lg"
          >
            <ShoppingCart size={16} className="mr-1" />
            Thêm
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-blue-600">
            {formatCurrency(displayPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>

        {product.shortDescription && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.shortDescription}
          </p>
        )}
      </div>
    </Link>
  );
}
