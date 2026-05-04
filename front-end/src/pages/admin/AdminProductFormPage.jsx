import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminProductService } from '../../services/adminProductService';
import { adminCategoryService } from '../../services/adminCategoryService';
import { productSchema } from '../../utils/validationSchemas';
import { slugify } from '../../utils/slugify';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function AdminProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: 'active',
      isFeatured: false,
      isNew: false,
      isBestSeller: false,
    },
  });

  const watchName = watch('name');

  useEffect(() => {
    loadCategories();
    if (isEditMode) {
      loadProduct();
    }
  }, [id]);

  useEffect(() => {
    if (watchName && !isEditMode) {
      setValue('slug', slugify(watchName));
    }
  }, [watchName, isEditMode]);

  const loadCategories = async () => {
    try {
      const cats = await adminCategoryService.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await adminProductService.getProductById(id);
      Object.keys(product).forEach((key) => {
        setValue(key, product[key]);
      });
      if (product.sizes) {
        setValue('sizes', product.sizes.join(', '));
      }
      if (product.colors) {
        setValue('colors', product.colors.join(', '));
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Không thể tải thông tin sản phẩm');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const productData = {
        ...data,
        sizes: data.sizes ? data.sizes.split(',').map((s) => s.trim()) : [],
        colors: data.colors ? data.colors.split(',').map((c) => c.trim()) : [],
        price: Number(data.price),
        salePrice: data.salePrice ? Number(data.salePrice) : null,
        stockQuantity: Number(data.stockQuantity),
        categoryId: Number(data.categoryId),
      };

      if (isEditMode) {
        await adminProductService.updateProduct(id, productData);
        toast.success('Đã cập nhật sản phẩm');
      } else {
        await adminProductService.createProduct(productData);
        toast.success('Đã thêm sản phẩm mới');
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Không thể lưu sản phẩm');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton className="h-96" />;
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Tên sản phẩm *"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="Slug *"
            {...register('slug')}
            error={errors.slug?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Danh mục *"
            {...register('categoryId')}
            error={errors.categoryId?.message}
            options={[
              { value: '', label: 'Chọn danh mục' },
              ...categories.map((cat) => ({
                value: cat.id.toString(),
                label: cat.name,
              })),
            ]}
          />
          <Select
            label="Trạng thái *"
            {...register('status')}
            error={errors.status?.message}
            options={[
              { value: 'active', label: 'Hoạt động' },
              { value: 'inactive', label: 'Ẩn' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Giá gốc *"
            type="number"
            {...register('price')}
            error={errors.price?.message}
          />
          <Input
            label="Giá khuyến mãi"
            type="number"
            {...register('salePrice')}
            error={errors.salePrice?.message}
          />
          <Input
            label="Số lượng *"
            type="number"
            {...register('stockQuantity')}
            error={errors.stockQuantity?.message}
          />
        </div>

        <Input
          label="URL hình ảnh *"
          {...register('imageUrl')}
          error={errors.imageUrl?.message}
        />

        <Input
          label="Mô tả ngắn *"
          {...register('shortDescription')}
          error={errors.shortDescription?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả chi tiết *
          </label>
          <textarea
            {...register('description')}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Sizes (phân cách bằng dấu phẩy)"
            {...register('sizes')}
            placeholder="S, M, L, XL"
          />
          <Input
            label="Màu sắc (phân cách bằng dấu phẩy)"
            {...register('colors')}
            placeholder="Đen, Trắng, Xanh"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('isFeatured')} className="rounded" />
            <span className="text-sm">Sản phẩm nổi bật</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('isNew')} className="rounded" />
            <span className="text-sm">Hàng mới</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('isBestSeller')} className="rounded" />
            <span className="text-sm">Bán chạy</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Đang lưu...' : 'Lưu sản phẩm'}
          </Button>
          <Link to="/admin/products">
            <Button type="button" variant="outline">
              Hủy
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
