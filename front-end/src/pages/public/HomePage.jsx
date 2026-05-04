import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import ProductCard from '../../components/product/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import Button from '../../components/common/Button';
import { ArrowRight, Truck, RefreshCw, Shield, CreditCard } from 'lucide-react';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [featured, newProds, cats] = await Promise.all([
        productService.getFeaturedProducts(8),
        productService.getNewProducts(8),
        categoryService.getCategories(),
      ]);
      setFeaturedProducts(featured);
      setNewProducts(newProds);
      setCategories(cats);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSkeleton className="h-96 mb-8 rounded-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <LoadingSkeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              🎉 Ưu đãi đặc biệt cho sinh viên
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Nâng cấp phong cách<br />
              thể thao của bạn
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Đồ thể thao chất lượng cao, giá tốt nhất dành cho sinh viên
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 shadow-lg">
                  Mua sắm ngay
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/products?sort=best_seller">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10">
                  Sản phẩm bán chạy
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Danh mục sản phẩm
          </h2>
          <p className="text-gray-600 text-lg">
            Khám phá bộ sưu tập đa dạng của chúng tôi
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?categoryId=${category.id}`}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm">Xem ngay →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Sản phẩm nổi bật
              </h2>
              <p className="text-gray-600">Những sản phẩm được yêu thích nhất</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="hidden md:flex items-center gap-2">
                Xem tất cả
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/products">
              <Button variant="outline" className="w-full">
                Xem tất cả sản phẩm
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Hàng mới về
            </h2>
            <p className="text-gray-600">Cập nhật xu hướng mới nhất</p>
          </div>
          <Link to="/products?sort=newest">
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              Xem thêm
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8 md:hidden">
          <Link to="/products?sort=newest">
            <Button variant="outline" className="w-full">
              Xem thêm hàng mới
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn SportStore?
            </h2>
            <p className="text-gray-600 text-lg">
              Cam kết mang đến trải nghiệm mua sắm tốt nhất
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Giao hàng nhanh</h3>
              <p className="text-gray-600 text-sm">Miễn phí vận chuyển cho đơn từ 200K</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw size={32} className="text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Đổi trả dễ dàng</h3>
              <p className="text-gray-600 text-sm">Đổi trả miễn phí trong vòng 7 ngày</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Hàng chính hãng</h3>
              <p className="text-gray-600 text-sm">100% sản phẩm chính hãng, bảo hành đầy đủ</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={32} className="text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Thanh toán COD</h3>
              <p className="text-gray-600 text-sm">Nhận hàng mới thanh toán, an toàn tiện lợi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn sàng nâng cấp phong cách?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Khám phá hàng trăm sản phẩm thể thao chất lượng cao
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg">
              Khám phá ngay
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
