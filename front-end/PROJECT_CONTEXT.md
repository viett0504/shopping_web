# PROJECT_CONTEXT.md — Sports Store MVP

## 0. Mục đích file này

File này dùng để đưa cho AI Agent / Coding Agent / Design Agent đọc trước khi triển khai dự án.

Dự án là **website bán đồ thể thao MVP đơn giản** dành cho khách hàng sinh viên.  
Yêu cầu quan trọng nhất: **giữ hệ thống đơn giản, dễ code, dễ demo, dễ mở rộng về sau**.

Agent cần tuân thủ đúng bối cảnh, workflow, hành vi người dùng, cấu trúc Frontend, Backend, UI và business rules trong tài liệu này.

---

# 1. Tổng quan dự án

## 1.1 Tên dự án

```text
Sports Store MVP
Website bán đồ thể thao MVP
```

## 1.2 Mục tiêu

Xây dựng một website bán đồ thể thao đơn giản gồm:

### Public website

Khách hàng có thể:

- Xem trang chủ.
- Xem danh sách sản phẩm.
- Xem chi tiết sản phẩm.
- Thêm sản phẩm vào giỏ hàng.
- Xem giỏ hàng.
- Checkout.
- Tạo đơn hàng.
- Nhận mã đơn hàng sau khi đặt thành công.

### Admin website

Admin có thể:

- Đăng nhập admin.
- Xem dashboard.
- Quản lý sản phẩm.
- Quản lý danh mục.
- Quản lý đơn hàng.
- Cập nhật trạng thái đơn hàng.

---

# 2. Nguyên tắc MVP

## 2.1 Làm trong MVP

```text
- Trang chủ
- Trang danh sách sản phẩm
- Trang chi tiết sản phẩm
- Giỏ hàng
- Checkout
- Trang đặt hàng thành công
- Admin login
- Admin dashboard
- Admin quản lý sản phẩm
- Admin quản lý danh mục
- Admin quản lý đơn hàng
- Responsive mobile cho public site
```

## 2.2 Không làm trong MVP

```text
- Không đăng ký customer
- Không đăng nhập customer
- Không tài khoản khách hàng
- Không thanh toán online
- Không tích hợp đơn vị vận chuyển
- Không mã giảm giá
- Không đánh giá sản phẩm
- Không bình luận sản phẩm
- Không phân quyền nhiều role
- Không quản lý kho chi tiết theo từng size/màu
- Không chat realtime
- Không app mobile
```

## 2.3 Lý do

Khách hàng là sinh viên, yêu cầu đơn giản.  
Do đó không xây dựng hệ thống e-commerce quá phức tạp như Shopee.  
MVP chỉ cần đủ luồng:

```text
Xem sản phẩm → Thêm giỏ hàng → Checkout → Tạo đơn
Admin → Quản lý sản phẩm/danh mục/đơn hàng
```

---

# 3. Vai trò người dùng

## 3.1 Guest / Customer chưa đăng nhập

Trong MVP, khách mua hàng **không cần đăng nhập**.

Guest được phép:

```text
- Xem trang chủ
- Xem danh sách sản phẩm
- Xem chi tiết sản phẩm
- Tìm kiếm sản phẩm
- Lọc sản phẩm
- Thêm sản phẩm vào giỏ hàng
- Xem giỏ hàng
- Checkout
- Tạo đơn hàng
```

Guest không được phép:

```text
- Truy cập admin
- Quản lý sản phẩm
- Quản lý danh mục
- Quản lý đơn hàng
```

## 3.2 Admin

Admin được phép:

```text
- Đăng nhập bằng email/password
- Sau login tự động redirect vào /admin
- Quản lý sản phẩm
- Quản lý danh mục
- Quản lý đơn hàng
- Cập nhật trạng thái đơn hàng
```

Admin không đi theo flow mua hàng.

Nếu admin đã login và vào public site thì vẫn có thể xem, nhưng các chức năng chính của admin nằm trong `/admin`.

---

# 4. Workflow tổng thể

## 4.1 Guest shopping workflow

```text
Guest vào website
→ Xem trang chủ
→ Xem danh sách sản phẩm
→ Xem chi tiết sản phẩm
→ Chọn size/màu/số lượng nếu có
→ Thêm vào giỏ hàng
→ Vào giỏ hàng
→ Checkout
→ Nhập thông tin nhận hàng
→ Chọn phương thức thanh toán
→ Đặt hàng
→ Nhận mã đơn hàng
```

## 4.2 Cart workflow

```text
Cart lưu ở localStorage hoặc cart store phía frontend.
Không yêu cầu đăng nhập.
```

Mỗi item trong cart gồm:

```ts
type CartItem = {
  productId: number;
  slug: string;
  name: string;
  imageUrl?: string;
  price: number;
  salePrice?: number | null;
  quantity: number;
  size?: string;
  color?: string;
};
```

Nếu thêm sản phẩm đã tồn tại cùng:

```text
productId + size + color
```

thì tăng quantity.

Nếu cùng productId nhưng khác size/màu thì tạo cart item riêng.

## 4.3 Checkout workflow

```text
Guest/Customer vào /checkout
→ Nếu cart rỗng thì redirect /cart
→ Nhập thông tin nhận hàng
→ Validate form
→ Gửi POST /orders
→ Backend tạo order + order_items
→ Frontend xóa cart
→ Redirect /order-success/:orderCode
```

## 4.4 Admin login workflow

```text
Admin vào /admin/login
→ Nhập email/password
→ Gửi POST /auth/admin/login
→ Backend xác thực
→ Trả accessToken + admin info
→ Frontend lưu token/admin
→ Redirect /admin
```

Nếu chưa login mà vào `/admin/*`:

```text
Redirect /admin/login
```

Nếu token sai/hết hạn:

```text
Xóa token
Redirect /admin/login
```

---

# 5. Frontend

## 5.1 Tech stack Frontend

```text
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Zod
- Zustand hoặc Context API
```

Khuyến nghị:

```text
- Zustand cho cart store và admin auth store
- React Hook Form + Zod cho form checkout và admin forms
- Axios instance cho API service
```

## 5.2 Cấu trúc thư mục Frontend

```text
src/
  assets/
  components/
    common/
      Button.tsx
      Input.tsx
      Select.tsx
      Badge.tsx
      EmptyState.tsx
      LoadingSkeleton.tsx
      ConfirmDialog.tsx
    layout/
      PublicLayout.tsx
      Header.tsx
      PromotionBar.tsx
      MobileMenu.tsx
      Footer.tsx
    product/
      ProductCard.tsx
      CategoryCard.tsx
      CollectionBanner.tsx
      QuickAddModal.tsx
    cart/
      CartItemRow.tsx
      OrderSummary.tsx
    admin/
      AdminSidebar.tsx
      AdminHeader.tsx
      AdminTable.tsx
      StatusBadge.tsx
  pages/
    public/
      HomePage.tsx
      ProductListPage.tsx
      ProductDetailPage.tsx
      CartPage.tsx
      CheckoutPage.tsx
      OrderSuccessPage.tsx
    admin/
      AdminLoginPage.tsx
      AdminDashboardPage.tsx
      AdminProductsPage.tsx
      AdminProductFormPage.tsx
      AdminCategoriesPage.tsx
      AdminOrdersPage.tsx
      AdminOrderDetailPage.tsx
  layouts/
    AdminLayout.tsx
  routes/
    AppRoutes.tsx
    AdminProtectedRoute.tsx
  services/
    api.ts
    productService.ts
    categoryService.ts
    orderService.ts
    adminAuthService.ts
    adminProductService.ts
    adminCategoryService.ts
    adminOrderService.ts
    dashboardService.ts
  stores/
    cartStore.ts
    adminAuthStore.ts
  hooks/
  types/
    product.ts
    category.ts
    order.ts
    admin.ts
  utils/
    formatCurrency.ts
    slugify.ts
    storage.ts
```

---

# 6. Frontend Routes

## 6.1 Public routes

```text
/
Trang chủ

/products
Danh sách sản phẩm

/products/:slug
Chi tiết sản phẩm

/cart
Giỏ hàng

/checkout
Checkout

/order-success/:orderCode
Đặt hàng thành công
```

Public routes **không yêu cầu đăng nhập**.

## 6.2 Admin routes

```text
/admin/login
Đăng nhập admin

/admin
Dashboard admin

/admin/products
Quản lý sản phẩm

/admin/products/new
Thêm sản phẩm

/admin/products/:id/edit
Sửa sản phẩm

/admin/categories
Quản lý danh mục

/admin/orders
Quản lý đơn hàng

/admin/orders/:id
Chi tiết đơn hàng
```

Admin routes, trừ `/admin/login`, yêu cầu admin token.

---

# 7. Chi tiết từng trang Public để AI Design hiểu

## 7.1 Home Page — `/`

### Mục tiêu

Trang chủ giới thiệu shop, tạo cảm giác thể thao, trẻ trung, kéo người dùng vào sản phẩm.

### Thành phần

```text
1. Top promotion bar
- Text ví dụ:
  "Miễn phí vận chuyển cho đơn từ 200K"
  "Ưu đãi sinh viên - Giảm đến 50% sản phẩm thể thao"

2. Header
- Logo shop
- Menu chính:
  + Hàng mới
  + Nam
  + Nữ
  + Giày
  + Phụ kiện
  + Sale
- Search icon hoặc search input
- Cart icon có badge số lượng sản phẩm
- Mobile hamburger menu

3. Hero banner
- Ảnh thể thao năng động
- Headline:
  "Nâng cấp phong cách thể thao của bạn"
- Sub text:
  "Đồ thể thao trẻ trung, năng động, giá tốt cho sinh viên"
- CTA:
  "Mua ngay"
  "Xem sản phẩm"

4. Category section
- Card danh mục:
  + Giày thể thao
  + Áo thể thao
  + Quần thể thao
  + Phụ kiện
  + Gym/Fitness
  + Chạy bộ
  + Bóng đá
  + Cầu lông

5. Collection banner section
- Grid banner:
  + Đồ chạy bộ
  + Đồ tập gym
  + Đồ bóng đá
  + Phụ kiện thể thao

6. Featured products
- Tiêu đề: "Sản phẩm nổi bật"
- Product grid
- Mỗi ProductCard có:
  + Ảnh
  + Badge New/Sale/Bán chạy
  + Tên sản phẩm
  + Giá
  + Giá sale nếu có
  + Nút thêm nhanh vào giỏ
  + Nút xem chi tiết

7. New products
- Tiêu đề: "Hàng mới về"
- Hiển thị 8 sản phẩm mới
- Nút "Xem thêm"

8. Benefits section
- Giao hàng nhanh
- Đổi trả dễ dàng
- Giá sinh viên
- Thanh toán khi nhận hàng

9. Footer
- Logo + mô tả shop
- Danh mục sản phẩm
- Chính sách
- Liên hệ
- Social links
```

### Behavior

```text
- Click logo về /
- Click danh mục chuyển /products?categoryId=...
- Click sản phẩm chuyển /products/:slug
- Click Add to Cart:
  + Nếu sản phẩm không có size/màu: thêm ngay vào cart
  + Nếu sản phẩm có size/màu: mở QuickAddModal
- Cart badge cập nhật theo cart store/localStorage
```

---

## 7.2 Product List Page — `/products`

### Mục tiêu

Hiển thị danh sách sản phẩm, cho phép tìm kiếm/lọc/sắp xếp.

### Thành phần

```text
1. Header + promotion bar

2. Breadcrumb
- Trang chủ / Sản phẩm

3. Page title
- "Tất cả sản phẩm"
- Nếu lọc theo danh mục thì hiển thị tên danh mục

4. Top filter bar
- Search input: "Tìm sản phẩm..."
- Sort select:
  + Mới nhất
  + Giá tăng dần
  + Giá giảm dần
  + Bán chạy
- Mobile filter button

5. Sidebar filter desktop
- Danh mục
- Khoảng giá
- Size
- Màu sắc
- Trạng thái:
  + Còn hàng
  + Đang sale

6. Product grid
- Desktop: 4 cột
- Tablet: 3 cột
- Mobile: 2 cột
- ProductCard:
  + Ảnh
  + Badge
  + Tên
  + Giá
  + Giá sale
  + Danh mục
  + Quick add button
  + View detail button

7. Empty state
- "Không tìm thấy sản phẩm phù hợp"
- Nút "Xóa bộ lọc"

8. Pagination
```

### Behavior

```text
- Filter cập nhật query params.
- Search debounce.
- Add to cart không yêu cầu login.
- Sản phẩm hết hàng thì disable nút thêm giỏ.
- Nếu cần size/màu thì mở QuickAddModal.
```

---

## 7.3 Product Detail Page — `/products/:slug`

### Mục tiêu

Cho khách xem chi tiết và thêm sản phẩm vào giỏ.

### Thành phần

```text
1. Header + promotion bar

2. Breadcrumb
- Trang chủ / Danh mục / Tên sản phẩm

3. Product detail section
Desktop:
- Gallery trái
- Info phải

Mobile:
- Gallery trên
- Info dưới

4. Gallery
- Ảnh chính
- Thumbnail ảnh phụ
- MVP có thể dùng 1 ảnh nhưng layout vẫn sẵn sàng cho nhiều ảnh

5. Product info
- Badge New/Sale/Bán chạy
- Tên sản phẩm
- Giá gốc
- Giá sale
- Mô tả ngắn
- Tình trạng còn hàng/hết hàng
- Size selector
- Color selector
- Quantity selector
- Nút "Thêm vào giỏ hàng"
- Nút "Mua ngay"

6. Policy box
- Đổi trả trong 7 ngày
- Giao hàng toàn quốc
- Thanh toán khi nhận hàng
- Hỗ trợ qua Zalo/Facebook

7. Product description
- Mô tả chi tiết
- Chất liệu
- Hướng dẫn bảo quản
- Phù hợp môn thể thao nào

8. Related products
- Sản phẩm cùng danh mục
```

### Behavior

```text
- Add to Cart:
  + Validate size nếu có.
  + Validate color nếu có.
  + Validate quantity > 0.
  + Thêm vào cart.
  + Toast "Đã thêm sản phẩm vào giỏ hàng".
- Buy Now:
  + Thêm vào cart.
  + Redirect /checkout.
```

---

## 7.4 Cart Page — `/cart`

### Mục tiêu

Cho khách kiểm tra giỏ hàng trước checkout.

### Thành phần

```text
1. Header

2. Page title
- "Giỏ hàng của bạn"

3. Cart item list
Mỗi item có:
- Ảnh sản phẩm
- Tên sản phẩm
- Size
- Màu
- Giá
- Số lượng
- Nút tăng/giảm
- Thành tiền
- Nút xóa

4. Cart summary
- Tạm tính
- Phí vận chuyển:
  + "Sẽ được xác nhận sau"
  hoặc
  + "Miễn phí"
- Tổng tiền
- Nút "Tiến hành thanh toán"

5. Continue shopping
- Nút "Tiếp tục mua sắm"

6. Empty cart state
- Icon giỏ hàng trống
- Text:
  "Giỏ hàng của bạn đang trống"
- Nút:
  "Mua sắm ngay"
```

### Behavior

```text
- Không yêu cầu đăng nhập.
- Cart lưu localStorage.
- Tăng/giảm số lượng cập nhật tổng.
- Quantity = 0 thì xóa item.
- Checkout:
  + Nếu cart rỗng: báo lỗi.
  + Nếu có hàng: redirect /checkout.
```

---

## 7.5 Checkout Page — `/checkout`

### Mục tiêu

Khách nhập thông tin nhận hàng và tạo đơn. Không yêu cầu đăng nhập.

### Thành phần

```text
1. Header đơn giản
- Logo
- Link quay lại giỏ hàng

2. Layout
Desktop:
- Trái: Form thông tin khách
- Phải: Order summary

Mobile:
- 1 cột
- Summary có thể nằm trên hoặc dưới form

3. Customer form
- Họ tên người nhận
- Số điện thoại
- Email, không bắt buộc
- Tỉnh/thành phố
- Quận/huyện
- Địa chỉ chi tiết
- Ghi chú đơn hàng

4. Payment method
- COD: Thanh toán khi nhận hàng
- Bank transfer: Chuyển khoản thủ công

5. Bank transfer note
Nếu chọn chuyển khoản:
- Hiển thị note:
  "Sau khi đặt hàng, shop sẽ liên hệ xác nhận và gửi thông tin chuyển khoản nếu cần."

6. Order summary
- Danh sách sản phẩm
- Size/màu/số lượng
- Tạm tính
- Phí ship
- Tổng tiền
- Nút "Đặt hàng"

7. Validation message
- Họ tên bắt buộc
- Số điện thoại bắt buộc
- Địa chỉ bắt buộc
- Số điện thoại sai định dạng thì báo lỗi
```

### Behavior

```text
- Không yêu cầu đăng nhập.
- Nếu cart rỗng redirect /cart.
- Bấm đặt hàng:
  + Validate form.
  + POST /orders.
  + Nếu thành công:
    - Xóa cart.
    - Redirect /order-success/:orderCode.
```

---

## 7.6 Order Success Page — `/order-success/:orderCode`

### Thành phần

```text
1. Success icon
2. Tiêu đề:
- "Đặt hàng thành công!"

3. Mã đơn hàng
- Ví dụ: DH202605030001

4. Thông báo
- "Cảm ơn bạn đã đặt hàng. Shop sẽ liên hệ xác nhận đơn trong thời gian sớm nhất."

5. Tóm tắt đơn hàng nếu backend trả về
- Tên khách
- Số điện thoại
- Tổng tiền
- Phương thức thanh toán

6. CTA
- "Tiếp tục mua sắm"
- "Về trang chủ"
```

---

# 8. Chi tiết từng trang Admin để AI Design hiểu

## 8.1 Admin Login Page — `/admin/login`

### Thành phần

```text
1. Logo shop
2. Tiêu đề:
- "Đăng nhập quản trị"

3. Form:
- Email
- Password
- Nút đăng nhập

4. Error message:
- Sai email hoặc mật khẩu
- Tài khoản không có quyền admin

5. Link về trang chủ
```

### Behavior

```text
- Gửi POST /auth/admin/login.
- Login thành công:
  + Lưu accessToken.
  + Lưu admin info.
  + Redirect /admin.
- Login thất bại:
  + Hiển thị lỗi.
```

---

## 8.2 Admin Layout — `/admin/*`

### Thành phần

```text
1. Sidebar
- Logo
- Dashboard
- Sản phẩm
- Danh mục
- Đơn hàng
- Đăng xuất

2. Header admin
- Tên trang hiện tại
- Admin name/email
- Logout button

3. Main content
- Render từng page

4. Responsive
- Ưu tiên desktop
- Mobile có thể dùng drawer, không được vỡ layout
```

---

## 8.3 Admin Dashboard Page — `/admin`

### Thành phần

```text
1. Page title
- "Dashboard"

2. Statistic cards
- Tổng sản phẩm
- Tổng danh mục
- Tổng đơn hàng
- Đơn chờ xác nhận
- Doanh thu tạm tính

3. Recent orders table
- Mã đơn
- Khách hàng
- Số điện thoại
- Tổng tiền
- Trạng thái
- Ngày tạo
- Nút xem

4. Quick actions
- Thêm sản phẩm
- Xem đơn hàng mới
```

---

## 8.4 Admin Products Page — `/admin/products`

### Thành phần

```text
1. Page title
- "Quản lý sản phẩm"

2. Toolbar
- Search input
- Filter danh mục
- Filter trạng thái
- Nút "Thêm sản phẩm"

3. Product table
Cột:
- Ảnh
- Tên sản phẩm
- Danh mục
- Giá
- Giá sale
- Tồn kho
- Trạng thái
- Ngày tạo
- Hành động

4. Row actions
- Sửa
- Xóa
- Bật/tắt trạng thái

5. Empty state
- "Chưa có sản phẩm nào"

6. Pagination
```

---

## 8.5 Admin Product Form Page — `/admin/products/new`, `/admin/products/:id/edit`

### Thành phần

```text
1. Page title
- "Thêm sản phẩm"
- "Sửa sản phẩm"

2. Form fields
- Tên sản phẩm
- Slug, có thể tự generate từ tên
- Danh mục
- Giá
- Giá sale
- Ảnh sản phẩm
- Mô tả ngắn
- Mô tả chi tiết
- Size
- Màu
- Số lượng tồn kho
- Trạng thái
- Sản phẩm nổi bật
- Hàng mới
- Bán chạy

3. Size input
- Có thể nhập dạng comma:
  "S, M, L, XL"

4. Color input
- Có thể nhập dạng comma:
  "Đen, Trắng, Đỏ"

5. Buttons
- Lưu
- Hủy
```

---

## 8.6 Admin Categories Page — `/admin/categories`

### Thành phần

```text
1. Page title
- "Quản lý danh mục"

2. Toolbar
- Search input
- Nút "Thêm danh mục"

3. Category table
Cột:
- Ảnh
- Tên danh mục
- Slug
- Mô tả
- Trạng thái
- Hành động

4. Form modal hoặc page riêng
Fields:
- Tên danh mục
- Slug
- Mô tả
- Ảnh đại diện
- Trạng thái active/inactive

5. Actions
- Sửa
- Xóa
- Bật/tắt trạng thái
```

---

## 8.7 Admin Orders Page — `/admin/orders`

### Thành phần

```text
1. Page title
- "Quản lý đơn hàng"

2. Toolbar
- Search mã đơn / tên khách / số điện thoại
- Filter trạng thái
- Filter phương thức thanh toán
- Filter ngày tạo

3. Order table
Cột:
- Mã đơn
- Khách hàng
- Số điện thoại
- Tổng tiền
- Phương thức thanh toán
- Trạng thái
- Ngày tạo
- Hành động

4. Status badge
- pending: Chờ xác nhận
- confirmed: Đã xác nhận
- shipping: Đang giao
- completed: Hoàn thành
- cancelled: Đã hủy

5. Actions
- Xem chi tiết
- Cập nhật nhanh trạng thái nếu cần
```

---

## 8.8 Admin Order Detail Page — `/admin/orders/:id`

### Thành phần

```text
1. Page title
- "Chi tiết đơn hàng #DH..."

2. Customer info card
- Họ tên
- Số điện thoại
- Email
- Địa chỉ
- Ghi chú

3. Order info card
- Mã đơn
- Ngày tạo
- Phương thức thanh toán
- Trạng thái hiện tại
- Tổng tiền

4. Order items table
Cột:
- Ảnh
- Tên sản phẩm
- Size
- Màu
- Giá
- Số lượng
- Thành tiền

5. Update status section
- Select trạng thái:
  + Chờ xác nhận
  + Đã xác nhận
  + Đang giao
  + Hoàn thành
  + Đã hủy
- Nút "Cập nhật trạng thái"

6. Back button
- Quay lại danh sách đơn hàng
```

---

# 9. Backend

## 9.1 Tech stack Backend

```text
- NestJS hoặc ExpressJS
- PostgreSQL hoặc MySQL
- Prisma hoặc TypeORM
- JWT Auth cho admin
- Bcrypt hash password
- Class-validator hoặc Zod cho validation
```

Khuyến nghị dùng:

```text
NestJS + Prisma + PostgreSQL
```

Hoặc nếu muốn nhanh:

```text
ExpressJS + Prisma + PostgreSQL
```

## 9.2 Backend modules

```text
auth
admins/users
categories
products
orders
dashboard
```

---

# 10. Database Design

## 10.1 users

Dùng cho admin.

```text
id
name
email
passwordHash
role
isActive
createdAt
updatedAt
```

Role MVP:

```text
admin
```

Không cần customer account.

---

## 10.2 categories

```text
id
name
slug
description
imageUrl
status
createdAt
updatedAt
```

Status:

```text
active
inactive
```

---

## 10.3 products

```text
id
categoryId
name
slug
price
salePrice
imageUrl
shortDescription
description
sizes
colors
stockQuantity
status
isFeatured
isNew
isBestSeller
createdAt
updatedAt
```

Status:

```text
active
inactive
out_of_stock
```

Ghi chú:

```text
sizes và colors có thể lưu JSON array.
Ví dụ:
sizes = ["S", "M", "L", "XL"]
colors = ["Đen", "Trắng", "Đỏ"]
```

---

## 10.4 orders

```text
id
orderCode
customerName
customerPhone
customerEmail
shippingAddress
province
district
note
totalAmount
paymentMethod
orderStatus
createdAt
updatedAt
```

Payment method:

```text
cod
bank_transfer
```

Order status:

```text
pending
confirmed
shipping
completed
cancelled
```

---

## 10.5 order_items

```text
id
orderId
productId
productName
productImage
price
quantity
size
color
totalPrice
createdAt
```

Quan trọng:

```text
productName, productImage, price phải lưu trực tiếp vào order_items.
Không chỉ join từ products.
Lý do: nếu sau này sản phẩm đổi tên/đổi giá thì đơn cũ vẫn giữ đúng dữ liệu tại thời điểm đặt hàng.
```

---

# 11. Backend API

## 11.1 Auth API

### POST `/auth/admin/login`

Body:

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "accessToken": "jwt_token",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@gmail.com",
    "role": "admin"
  }
}
```

### GET `/auth/me`

Dùng token admin để lấy thông tin admin hiện tại.

---

## 11.2 Public Categories API

### GET `/categories`

Chỉ trả danh mục active.

Response:

```json
{
  "items": [
    {
      "id": 1,
      "name": "Giày thể thao",
      "slug": "giay-the-thao",
      "imageUrl": "...",
      "status": "active"
    }
  ]
}
```

---

## 11.3 Public Products API

### GET `/products`

Query:

```text
search
categoryId
minPrice
maxPrice
size
color
status
sort
page
limit
```

Sort:

```text
newest
price_asc
price_desc
best_seller
```

### GET `/products/:slug`

Trả chi tiết sản phẩm active.

---

## 11.4 Public Orders API

### POST `/orders`

Không yêu cầu đăng nhập.

Body:

```json
{
  "customerName": "Nguyễn Văn A",
  "customerPhone": "0987654321",
  "customerEmail": "a@gmail.com",
  "province": "Hà Nội",
  "district": "Đống Đa",
  "shippingAddress": "Số 1 Nguyễn Trãi",
  "note": "Giao giờ hành chính",
  "paymentMethod": "cod",
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "size": "M",
      "color": "Đen"
    }
  ]
}
```

Backend xử lý:

```text
- Validate customerName, phone, address.
- Validate items không rỗng.
- Validate product tồn tại và active.
- Validate quantity > 0.
- Tính giá từ database, không tin price từ frontend.
- Tạo orderCode.
- Tính totalAmount.
- Tạo order.
- Tạo order_items.
- Trừ stockQuantity nếu muốn quản lý tồn kho cơ bản.
- Trả về orderCode.
```

Response:

```json
{
  "success": true,
  "orderCode": "DH202605030001",
  "orderId": 1
}
```

### GET `/orders/:orderCode`

Optional cho trang order success nếu muốn lấy lại thông tin đơn.

---

## 11.5 Admin Products API

Tất cả API dưới đây yêu cầu admin JWT.

```text
GET /admin/products
POST /admin/products
GET /admin/products/:id
PATCH /admin/products/:id
DELETE /admin/products/:id
```

Create/update product body:

```json
{
  "categoryId": 1,
  "name": "Áo thể thao nam",
  "slug": "ao-the-thao-nam",
  "price": 199000,
  "salePrice": 159000,
  "imageUrl": "...",
  "shortDescription": "Áo thể thao thoáng mát",
  "description": "Mô tả chi tiết...",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Đen", "Trắng"],
  "stockQuantity": 100,
  "status": "active",
  "isFeatured": true,
  "isNew": true,
  "isBestSeller": false
}
```

---

## 11.6 Admin Categories API

Yêu cầu admin JWT.

```text
GET /admin/categories
POST /admin/categories
GET /admin/categories/:id
PATCH /admin/categories/:id
DELETE /admin/categories/:id
```

---

## 11.7 Admin Orders API

Yêu cầu admin JWT.

```text
GET /admin/orders
GET /admin/orders/:id
PATCH /admin/orders/:id/status
```

Query cho list orders:

```text
search
orderStatus
paymentMethod
dateFrom
dateTo
page
limit
```

Update status body:

```json
{
  "orderStatus": "confirmed"
}
```

---

## 11.8 Admin Dashboard API

### GET `/admin/dashboard/stats`

Response:

```json
{
  "totalProducts": 120,
  "totalCategories": 8,
  "totalOrders": 56,
  "pendingOrders": 10,
  "estimatedRevenue": 12500000
}
```

### GET `/admin/dashboard/recent-orders`

Trả danh sách đơn hàng mới nhất.

---

# 12. Backend Business Rules

## 12.1 Product rules

```text
- Product slug phải unique.
- Product chỉ hiển thị public nếu status = active.
- Nếu stockQuantity <= 0 thì có thể set status = out_of_stock.
- Public không được xem product inactive.
- Giá hiển thị public dùng salePrice nếu salePrice tồn tại và nhỏ hơn price.
```

## 12.2 Order rules

```text
- Order tạo từ guest, không cần customerId.
- Order mặc định orderStatus = pending.
- Backend tự tính totalAmount từ product price/salePrice hiện tại.
- Không nhận totalAmount từ frontend làm nguồn tin chính.
- Nếu salePrice tồn tại và nhỏ hơn price thì dùng salePrice.
- Nếu stockQuantity không đủ thì báo lỗi.
- Khi tạo order_items, lưu snapshot productName, productImage, price.
```

## 12.3 Admin auth rules

```text
- Chỉ admin được vào admin API.
- Nếu token thiếu hoặc sai thì trả 401.
- Nếu không phải admin thì trả 403.
- Password phải hash bằng bcrypt.
```

---

# 13. UI / UX Style Guide

## 13.1 Tham khảo tinh thần

Thiết kế tham khảo tinh thần các website e-commerce thời trang/thể thao hiện đại như Coolmate:

```text
- Header nhiều danh mục rõ ràng
- Có thanh thông báo khuyến mãi/freeship
- Có hero/banner lớn
- Có collection banner
- Có product card rõ ràng
- Có badge New/Sale/Bán chạy
- Có nút thêm nhanh vào giỏ
- Có footer chính sách/liên hệ/hỗ trợ
```

Không copy y nguyên thương hiệu, màu sắc, hình ảnh hoặc nội dung của Coolmate.

## 13.2 Tone & style

```text
- Sporty
- Modern
- Clean
- Youthful
- Energetic
- Mobile-first
- Dễ dùng cho sinh viên
```

## 13.3 Colors

```text
Primary:
- Xanh dương thể thao hoặc cam năng lượng

Background:
- Trắng hoặc xám rất nhạt

Text:
- Đen hoặc xám đậm

CTA:
- Màu nổi bật, dễ bấm

Success:
- Xanh lá

Warning:
- Cam/vàng

Error:
- Đỏ
```

## 13.4 Typography

```text
- Font sans-serif hiện đại
- Heading đậm, rõ
- Body text dễ đọc
- Giá sản phẩm phải nổi bật
```

## 13.5 Components cần có

```text
- Button primary
- Button secondary
- Input
- Select
- Badge
- ProductCard
- CategoryCard
- CollectionBanner
- QuickAddModal
- CartItem
- OrderSummary
- CheckoutForm
- AdminSidebar
- AdminHeader
- DataTable
- StatusBadge
- EmptyState
- LoadingSkeleton
- Toast
- ConfirmDialog
```

## 13.6 Responsive rules

```text
- Public site mobile-first.
- Mobile header có hamburger menu.
- Product grid:
  + Mobile: 2 cột
  + Tablet: 3 cột
  + Desktop: 4 cột
- Checkout:
  + Mobile: 1 cột
  + Desktop: form trái, summary phải
- Admin ưu tiên desktop/laptop.
- Admin mobile không cần tối ưu quá sâu nhưng không được vỡ layout.
```

---

# 14. State Management

## 14.1 Cart Store

Cart lưu localStorage.

State:

```ts
type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, size?: string, color?: string) => void;
  increaseQuantity: (productId: number, size?: string, color?: string) => void;
  decreaseQuantity: (productId: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
  getTotalAmount: () => number;
};
```

Rules:

```text
- Cùng productId + size + color thì tăng quantity.
- Khác size/color thì là item riêng.
- Cart tự hydrate từ localStorage khi app load.
```

## 14.2 Admin Auth Store

State:

```ts
type AdminAuthState = {
  accessToken: string | null;
  admin: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};
```

Rules:

```text
- Token lưu localStorage.
- Axios interceptor tự gắn Authorization Bearer token cho admin API.
- Logout xóa token/admin và redirect /admin/login.
```

---

# 15. Validation

## 15.1 Checkout validation

```text
customerName:
- required
- max 100 chars

customerPhone:
- required
- validate số điện thoại Việt Nam cơ bản

customerEmail:
- optional
- nếu nhập phải đúng email

province:
- required

district:
- required

shippingAddress:
- required
- max 255 chars

paymentMethod:
- required
- cod hoặc bank_transfer

items:
- không rỗng
```

## 15.2 Product validation

```text
name:
- required

slug:
- required
- unique

categoryId:
- required

price:
- required
- >= 0

salePrice:
- optional
- >= 0
- nếu có thì nên nhỏ hơn price

stockQuantity:
- required
- >= 0

status:
- active/inactive/out_of_stock
```

## 15.3 Category validation

```text
name:
- required

slug:
- required
- unique

status:
- active/inactive
```

---

# 16. Error / Empty / Loading States

## 16.1 Public

```text
- Product list loading: dùng skeleton card.
- Product list empty: hiển thị EmptyState.
- Product detail not found: hiển thị trang 404 hoặc message.
- Cart empty: hiển thị empty cart state.
- Checkout validation error: hiển thị dưới input.
- Order create failed: toast lỗi.
```

## 16.2 Admin

```text
- Table loading: skeleton hoặc spinner.
- Table empty: empty state.
- Form submit error: toast lỗi + message field nếu có.
- Delete confirm: dùng confirm dialog.
- Unauthorized: redirect /admin/login.
```

---

# 17. Prompt ngắn cho Coding Agent

```text
Bạn là senior fullstack developer. Hãy đọc file PROJECT_CONTEXT.md trước khi code.

Xây dựng website bán đồ thể thao MVP.

Flow quan trọng:
- Guest không cần đăng nhập vẫn xem sản phẩm, thêm giỏ hàng, checkout và tạo đơn.
- Cart lưu localStorage.
- Không có customer login/register.
- Chỉ admin cần login.
- Admin login thành công redirect /admin.
- /admin/* cần admin token.

Frontend:
- React + TypeScript + Vite + Tailwind CSS
- React Router
- Axios
- React Hook Form + Zod
- Zustand hoặc Context API
- Code sạch, chia components/pages/layouts/services/stores/types/utils.

Backend:
- NestJS hoặc ExpressJS
- PostgreSQL hoặc MySQL
- Prisma hoặc TypeORM
- JWT admin auth
- Bcrypt password

Public pages:
- HomePage
- ProductListPage
- ProductDetailPage
- CartPage
- CheckoutPage
- OrderSuccessPage

Admin pages:
- AdminLoginPage
- AdminLayout
- AdminDashboardPage
- AdminProductsPage
- AdminProductFormPage
- AdminCategoriesPage
- AdminOrdersPage
- AdminOrderDetailPage

Không làm:
- Customer account
- Payment online
- Shipping integration
- Coupon
- Reviews
- Multi-role permission
```

---

# 18. Checklist hoàn thành MVP

## Public

```text
[ ] Trang chủ hiển thị đúng layout.
[ ] Danh mục hiển thị được.
[ ] Sản phẩm nổi bật hiển thị được.
[ ] Trang sản phẩm có search/filter/sort.
[ ] Trang chi tiết sản phẩm hiển thị đầy đủ.
[ ] Add to cart hoạt động không cần login.
[ ] Cart lưu localStorage.
[ ] Tăng/giảm/xóa item trong cart hoạt động.
[ ] Checkout validate form.
[ ] Tạo đơn hàng thành công.
[ ] Xóa cart sau khi đặt hàng.
[ ] Hiển thị order success với orderCode.
[ ] Responsive mobile ổn.
```

## Admin

```text
[ ] Admin login hoạt động.
[ ] Token lưu đúng.
[ ] Route /admin/* được bảo vệ.
[ ] Dashboard hiển thị stats.
[ ] CRUD sản phẩm hoạt động.
[ ] CRUD danh mục hoạt động.
[ ] Danh sách đơn hàng hiển thị.
[ ] Chi tiết đơn hàng hiển thị.
[ ] Cập nhật trạng thái đơn hàng hoạt động.
[ ] Logout hoạt động.
```

## Backend

```text
[ ] Public products API hoạt động.
[ ] Public categories API hoạt động.
[ ] Public create order API hoạt động.
[ ] Admin auth API hoạt động.
[ ] Admin products API hoạt động.
[ ] Admin categories API hoạt động.
[ ] Admin orders API hoạt động.
[ ] Validate dữ liệu đầy đủ.
[ ] Backend tự tính totalAmount.
[ ] Order_items lưu snapshot product info.
```

---

# 19. Ghi chú quan trọng cho Agent

```text
- Ưu tiên hoàn thành flow chính trước, không sa đà tính năng phụ.
- Không bắt khách đăng nhập khi mua hàng.
- Không tạo customer auth trong MVP.
- Không làm thanh toán online.
- Không copy y nguyên Coolmate.
- Chỉ lấy cảm hứng về cách tổ chức layout e-commerce.
- Code phải dễ mở rộng nếu sau này thêm customer account, payment online, shipping, coupon.
```
