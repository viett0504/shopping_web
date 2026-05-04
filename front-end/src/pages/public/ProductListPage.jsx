import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import ProductCard from '../../components/product/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import Select from '../../components/common/Select';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Search } from 'lucide-react';

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const currentPage = Number(searchParams.get('page')) || 1;
  const categoryId = searchParams.get('categoryId');
  const sort = searchParams.get('sort') || 'newest';

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [searchParams]);

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
        search: searchParams.get('search'),
        categoryId: searchParams.get('categoryId'),
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

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput) {
      newParams.set('search', searchInput);
    } else {
      newParams.delete('search');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', e.target.value);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleCategoryChange = (catId) => {
    const newParams = new URLSearchParams(searchParams);
    if (catId) {
      newParams.set('categoryId', catId);
    } else {
      newParams.delete('categoryId');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  const selectedCategory = categories.find(c => c.id === Number(categoryId));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
        <span className="mx-2">/</span>
        <span>Sản phẩm</span>
        {selectedCategory && (
          <>
            <span className="mx-2">/</span>
            <span>{selectedCategory.name}</span>
          </>
        )}
      </nav>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">
        {selectedCategory ? selectedCategory.name : 'Tất cả sản phẩm'}
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <Input
            placeholder="Tìm sản phẩm..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search size={20} />
          </Button>
        </form>

        {/* Sort */}
        <Select
          value={sort}
          onChange={handleSortChange}
          options={[
            { value: 'newest', label: 'Mới nhất' },
            { value: 'price_asc', label: 'Giá tăng dần' },
            { value: 'price_desc', label: 'Giá giảm dần' },
            { value: 'best_seller', label: 'Bán chạy' },
          ]}
          className="w-full md:w-48"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3">Danh mục</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`block w-full text-left px-3 py-2 rounded ${
                  !categoryId ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                Tất cả
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    categoryId === cat.id.toString() ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {(searchParams.toString()) && (
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Xóa bộ lọc
            </Button>
          )}
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <LoadingSkeleton key={i} className="h-80" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="Không tìm thấy sản phẩm"
              description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
              action={
                <Button onClick={clearFilters}>
                  Xóa bộ lọc
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
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
  );
}
