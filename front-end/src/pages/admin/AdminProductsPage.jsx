import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminProductService } from '../../services/adminProductService';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await adminProductService.getProducts({ limit: 100 });
      setProducts(response.items || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Không thể tải danh sách sản phẩm');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      return;
    }

    try {
      await adminProductService.deleteProduct(id);
      toast.success('Đã xóa sản phẩm');
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Không thể xóa sản phẩm');
    }
  };

  if (loading) {
    return <LoadingSkeleton className="h-96" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h2>
          <p className="text-gray-600">Danh sách tất cả sản phẩm</p>
        </div>
        <Link to="/admin/products/new">
          <Button>
            <Plus size={20} className="mr-2" />
            Thêm sản phẩm
          </Button>
        </Link>
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <EmptyState
          icon="📦"
          title="Chưa có sản phẩm"
          description="Thêm sản phẩm đầu tiên cho cửa hàng"
          action={
            <Link to="/admin/products/new">
              <Button>Thêm sản phẩm</Button>
            </Link>
          }
        />
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tồn kho
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <div className="flex gap-1 mt-1">
                            {product.isNew && <Badge variant="new">Mới</Badge>}
                            {product.isBestSeller && <Badge variant="best-seller">Hot</Badge>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.categoryName || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">
                          {formatCurrency(product.salePrice || product.price)}
                        </p>
                        {product.salePrice && (
                          <p className="text-sm text-gray-400 line-through">
                            {formatCurrency(product.price)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {product.stockQuantity}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={product.status === 'active' ? 'success' : 'error'}>
                        {product.status === 'active' ? 'Hoạt động' : 'Ẩn'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link to={`/admin/products/${product.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit size={16} />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
