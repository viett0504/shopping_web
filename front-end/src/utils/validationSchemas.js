import { z } from 'zod';

export const checkoutSchema = z.object({
  customerName: z.string().min(1, 'Họ tên là bắt buộc').max(100, 'Họ tên quá dài'),
  customerPhone: z.string()
    .min(1, 'Số điện thoại là bắt buộc')
    .regex(/^0\d{9}$/, 'Số điện thoại không hợp lệ (phải có 10 số và bắt đầu bằng 0)'),
  customerEmail: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  province: z.string().min(1, 'Tỉnh/thành phố là bắt buộc'),
  district: z.string().min(1, 'Quận/huyện là bắt buộc'),
  shippingAddress: z.string().min(1, 'Địa chỉ là bắt buộc').max(255, 'Địa chỉ quá dài'),
  note: z.string().max(500, 'Ghi chú quá dài').optional(),
  paymentMethod: z.enum(['cod', 'bank_transfer'], {
    errorMap: () => ({ message: 'Vui lòng chọn phương thức thanh toán' }),
  }),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  slug: z.string().min(1, 'Slug là bắt buộc'),
  categoryId: z.coerce.number().min(1, 'Danh mục là bắt buộc'),
  price: z.coerce.number().min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  salePrice: z.coerce.number().min(0, 'Giá sale phải lớn hơn hoặc bằng 0').optional().nullable().or(z.literal('')),
  imageUrl: z.string().url('URL ảnh không hợp lệ'),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  sizes: z.string().optional(),
  colors: z.string().optional(),
  stockQuantity: z.coerce.number().min(0, 'Số lượng phải lớn hơn hoặc bằng 0'),
  status: z.enum(['active', 'inactive', 'out_of_stock']),
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1, 'Tên danh mục là bắt buộc'),
  slug: z.string().min(1, 'Slug là bắt buộc'),
  description: z.string().optional(),
  imageUrl: z.string().url('URL ảnh không hợp lệ').optional(),
  status: z.enum(['active', 'inactive']),
});
