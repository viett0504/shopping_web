## Why

Dự án Sports Store MVP cần một giao diện frontend hoàn chỉnh để khách hàng có thể xem sản phẩm, thêm vào giỏ hàng, đặt hàng, và để admin quản lý sản phẩm/danh mục/đơn hàng. Hiện tại chỉ có file design mockup (PNG) trong `src/assets/design/` nhưng chưa có code implementation. Cần xây dựng toàn bộ frontend với React + TypeScript + Vite + Tailwind CSS để đưa design thành ứng dụng web hoạt động được.

## What Changes

- Xây dựng toàn bộ cấu trúc thư mục frontend theo chuẩn: components, pages, layouts, routes, services, stores, types, utils
- Implement 6 trang public: HomePage, ProductListPage, ProductDetailPage, CartPage, CheckoutPage, OrderSuccessPage
- Implement 7 trang admin: AdminLoginPage, AdminDashboardPage, AdminProductsPage, AdminProductFormPage, AdminCategoriesPage, AdminOrdersPage, AdminOrderDetailPage
- Tạo 20+ reusable components: Header, Footer, ProductCard, Button, Input, Select, Badge, AdminSidebar, DataTable, v.v.
- Setup routing với React Router (public routes + protected admin routes)
- Setup state management với Zustand (cart store + admin auth store)
- Setup form validation với React Hook Form + Zod
- Setup API services layer (mock data ban đầu, chuẩn bị cho backend integration)
- Implement responsive design (mobile-first cho public, desktop-first cho admin)
- Implement cart functionality với localStorage persistence
- Implement admin authentication flow với JWT token

## Capabilities

### New Capabilities

- `public-pages`: Tất cả các trang public (home, products, product-detail, cart, checkout, order-success) với layout, navigation, và user interactions
- `admin-pages`: Tất cả các trang admin (login, dashboard, products, categories, orders) với admin layout, sidebar navigation, và CRUD operations
- `shared-components`: Các reusable components dùng chung (Button, Input, Select, Badge, EmptyState, LoadingSkeleton, Toast, ConfirmDialog)
- `layout-components`: Layout components (Header, Footer, PromotionBar, MobileMenu, AdminSidebar, AdminHeader)
- `product-components`: Product-specific components (ProductCard, CategoryCard, CollectionBanner, QuickAddModal)
- `cart-components`: Cart-specific components (CartItemRow, OrderSummary)
- `admin-components`: Admin-specific components (AdminTable, StatusBadge)
- `routing`: React Router setup với public routes và protected admin routes
- `cart-management`: Cart state management với Zustand, localStorage persistence, add/remove/update operations
- `admin-auth`: Admin authentication state management với Zustand, JWT token handling, login/logout flow
- `form-validation`: Form validation setup với React Hook Form + Zod cho checkout và admin forms
- `api-services`: API service layer với Axios, mock data, chuẩn bị cho backend integration
- `type-definitions`: TypeScript type definitions cho Product, Category, Order, Admin, Cart
- `utilities`: Utility functions (formatCurrency, slugify, storage helpers)

### Modified Capabilities

<!-- Không có capabilities hiện tại cần modify vì đây là implementation mới từ đầu -->

## Impact

**Affected Code:**
- Toàn bộ thư mục `src/` sẽ được tổ chức lại với cấu trúc mới
- File `src/App.jsx` sẽ được chuyển sang TypeScript và tích hợp routing
- File `src/main.jsx` sẽ được chuyển sang TypeScript
- Các file CSS hiện tại có thể được thay thế bằng Tailwind utilities

**Dependencies:**
- Cần cài đặt: react-router-dom, zustand, react-hook-form, zod, axios, @hookform/resolvers
- Tailwind CSS đã có sẵn (cần verify config)
- TypeScript đã có sẵn (cần verify tsconfig)

**Systems:**
- Frontend hoàn toàn độc lập, không phụ thuộc backend trong giai đoạn đầu
- Sử dụng mock data để demo
- API services được thiết kế sẵn interface để dễ dàng thay mock data bằng real API calls sau này

**Breaking Changes:**
- **BREAKING**: Cấu trúc thư mục hiện tại sẽ thay đổi hoàn toàn
- **BREAKING**: App.jsx và main.jsx sẽ được viết lại bằng TypeScript
