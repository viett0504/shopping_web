import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import useCartStore from '../../stores/cartStore';
import toast from 'react-hot-toast';

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const addItem = useCartStore((state) => state.addItem);

  const currentPage = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || 'newest';

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [searchParams, selectedCategories, priceRange]);

  const loadCategories = async () => {
    try {
      const cats = await categoryService.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = {
        categoryId: selectedCategories.length > 0 ? selectedCategories[0] : null,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sort: searchParams.get('sort') || 'newest',
        page: currentPage,
        limit: 12,
      };
      const response = await productService.getProducts(params);
      setProducts(response.items);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', e.target.value);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleCategoryToggle = (catId) => {
    setSelectedCategories(prev => {
      if (prev.includes(catId)) {
        return prev.filter(id => id !== catId);
      } else {
        return [catId]; // Only one category at a time
      }
    });
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (product) => {
    const defaultSize = product.sizes?.[0] || '';
    const defaultColor = product.colors?.[0] || '';
    
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.imageUrl,
      price: product.salePrice || product.price,
      size: defaultSize,
      color: defaultColor,
      quantity: 1,
    });
    
    toast.success('Đã thêm vào giỏ hàng!');
  };

  const calculateDiscount = (price, salePrice) => {
    if (!salePrice) return 0;
    return Math.round(((price - salePrice) / price) * 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium">Tất cả sản phẩm</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-4">Danh mục</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryToggle(cat.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700 group-hover:text-blue-600">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-4">Mức giá</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">0đ</span>
                  <span className="text-gray-600">5,000,000đ</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="text-center text-sm font-medium text-gray-900">
                  {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Tất cả sản phẩm</h1>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={handleSortChange}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="newest">Sắp xếp: Mới nhất</option>
                  <option value="price_asc">Sắp xếp: Giá tăng dần</option>
                  <option value="price_desc">Sắp xếp: Giá giảm dần</option>
                  <option value="best_seller">Sắp xếp: Bán chạy</option>
                </select>
                <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none text-gray-600" />
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <LoadingSkeleton key={i} className="h-96 rounded-lg" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="Không tìm thấy sản phẩm"
                description="Thử thay đổi bộ lọc"
              />
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => {
                    const discount = calculateDiscount(product.price, product.salePrice);
                    
                    return (
                      <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                        {/* Product Image */}
                        <Link to={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && (
                              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded">
                                NEW
                              </span>
                            )}
                            {discount > 0 && (
                              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded">
                                -{discount}% SALE
                              </span>
                            )}
                          </div>
                        </Link>

                        {/* Product Info */}
                        <div className="p-4">
                          <Link to={`/products/${product.slug}`}>
                            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          
                          {/* Price */}
                          <div className="mb-3">
                            {product.salePrice ? (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-blue-600">
                                  {formatCurrency(product.salePrice)}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                  {formatCurrency(product.price)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-gray-900">
                                {formatCurrency(product.price)}
                              </span>
                            )}
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleQuickAdd(product);
                            }}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <ShoppingCart size={18} />
                            <span>Thêm nhanh</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Trước
                    </Button>
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? 'primary' : 'outline'}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Sau
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
