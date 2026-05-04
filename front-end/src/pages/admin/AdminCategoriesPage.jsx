import { useEffect, useState } from 'react';
import { adminCategoryService } from '../../services/adminCategoryService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await adminCategoryService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Không thể tải danh sách danh mục');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
      return;
    }

    try {
      await adminCategoryService.deleteCategory(id);
      toast.success('Đã xóa danh mục');
      loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Không thể xóa danh mục');
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
          <h2 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h2>
          <p className="text-gray-600">Danh sách tất cả danh mục sản phẩm</p>
        </div>
        <Button>
          <Plus size={20} className="mr-2" />
          Thêm danh mục
        </Button>
      </div>

      {/* Categories Table */}
      {categories.length === 0 ? (
        <EmptyState
          icon="📁"
          title="Chưa có danh mục"
          description="Thêm danh mục đầu tiên cho cửa hàng"
          action={<Button>Thêm danh mục</Button>}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mô tả
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
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {category.description || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={category.status === 'active' ? 'success' : 'error'}>
                        {category.status === 'active' ? 'Hoạt động' : 'Ẩn'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
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
