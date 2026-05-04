import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { useCartStore } from '../../stores/cartStore';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ProductCard from '../../components/product/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import { formatCurrency } from '../../utils/formatCurrency';
import toast from 'react-hot-toast';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const prod = await productService.getProductBySlug(slug);
      if (!prod) {
        navigate('/products');
        return;
      }
      setProduct(prod);
      setMainImage(prod.imageUrl);

      // Set default selections
      if (prod.sizes && prod.sizes.length > 0) {
        setSelectedSize(prod.sizes[0]);
      }
      if (prod.colors && prod.colors.length > 0) {
        setSelectedColor(prod.colors[0]);
      }

      // Load related products
      if (prod.categoryId) {
        const related = await productService.getProductsByCategory(prod.categoryId, 4);
        setRelatedProducts(related.filter((p) => p.id !== prod.id));
      }
    } catch (error) {
      console.error('Error loading product:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Vui lòng chọn size');
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error('Vui lòng chọn màu');
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      imageUrl: product.imageUrl,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    toast.success('Đã thêm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSkeleton className="h-96" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-blue-600">Sản phẩm</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnail images would go here if we had multiple images */}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex gap-2 mb-3">
            {product.isNew && <Badge variant="new">Mới</Badge>}
            {hasDiscount && <Badge variant="sale">Giảm giá</Badge>}
            {product.isBestSeller && <Badge variant="best-seller">Bán chạy</Badge>}
          </div>

          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-blue-600">
              {formatCurrency(displayPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xl text-gray-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{product.shortDescription}</p>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Kích thước: <span className="text-blue-600">{selectedSize}</span>
              </label>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Màu sắc: <span className="text-blue-600">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedColor === color
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Số lượng:</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus size={20} />
                </button>
                <span className="px-6 py-2 font-medium">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity >= product.stockQuantity}
                >
                  <Plus size={20} />
                </button>
              </div>
              <span className="text-sm text-gray-600">
                {product.stockQuantity} sản phẩm có sẵn
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={handleAddToCart}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <ShoppingCart size={20} className="mr-2" />
              Thêm vào giỏ
            </Button>
            <Button onClick={handleBuyNow} size="lg" className="flex-1">
              Mua ngay
            </Button>
          </div>

          {/* Policy Box */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Miễn phí vận chuyển cho đơn hàng từ 200.000đ</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Đổi trả miễn phí trong vòng 7 ngày</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Thanh toán khi nhận hàng (COD)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Bảo hành chính hãng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
        <h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2>
        <div className="prose max-w-none text-gray-600">
          {product.description}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
