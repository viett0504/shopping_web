## 1. Project Setup & Dependencies

- [ ] 1.1 Install required dependencies (react-router-dom, zustand, react-hook-form, zod, @hookform/resolvers, axios, class-variance-authority, clsx)
- [ ] 1.2 Verify Tailwind CSS configuration and add custom colors if needed
- [ ] 1.3 Update tsconfig.json for path aliases (@/ for src/)
- [ ] 1.4 Create folder structure (components, pages, layouts, routes, services, stores, types, utils)

## 2. TypeScript Type Definitions

- [ ] 2.1 Create types/product.ts with Product, ProductQueryParams, ProductListResponse interfaces
- [ ] 2.2 Create types/category.ts with Category interface
- [ ] 2.3 Create types/order.ts with Order, OrderItem, CreateOrderRequest interfaces
- [ ] 2.4 Create types/admin.ts with AdminUser, AdminLoginRequest, AdminLoginResponse interfaces
- [ ] 2.5 Create types/cart.ts with CartItem, CartState interfaces
- [ ] 2.6 Create types/common.ts with ApiResponse, PaginationParams, etc.

## 3. Utility Functions

- [ ] 3.1 Create utils/formatCurrency.ts for Vietnamese currency formatting
- [ ] 3.2 Create utils/slugify.ts for Vietnamese text to URL slug conversion
- [ ] 3.3 Create utils/storage.ts for localStorage helpers with error handling
- [ ] 3.4 Create utils/cn.ts for className merging (clsx + tailwind-merge)
- [ ] 3.5 Create utils/delay.ts for mock API delay simulation

## 4. API Services Layer

- [ ] 4.1 Create services/api.ts with Axios instance and interceptors
- [ ] 4.2 Create mock data in services/mockData.ts (products, categories, orders)
- [ ] 4.3 Create services/productService.ts with mock implementations
- [ ] 4.4 Create services/categoryService.ts with mock implementations
- [ ] 4.5 Create services/orderService.ts with mock implementations
- [ ] 4.6 Create services/adminAuthService.ts with mock implementations
- [ ] 4.7 Create services/adminProductService.ts with mock implementations
- [ ] 4.8 Create services/adminCategoryService.ts with mock implementations
- [ ] 4.9 Create services/adminOrderService.ts with mock implementations
- [ ] 4.10 Create services/dashboardService.ts with mock implementations

## 5. State Management - Zustand Stores

- [ ] 5.1 Create stores/cartStore.ts with cart state, actions, and localStorage persistence
- [ ] 5.2 Implement addItem logic (merge same product+size+color or create new item)
- [ ] 5.3 Implement removeItem, updateQuantity, clearCart actions
- [ ] 5.4 Implement getTotalQuantity and getTotalAmount selectors
- [ ] 5.5 Create stores/adminAuthStore.ts with auth state, login, logout, and localStorage persistence
- [ ] 5.6 Test cart store persistence on page reload
- [ ] 5.7 Test admin auth store persistence on page reload

## 6. Shared Components - Basic UI Elements

- [ ] 6.1 Create components/common/Button.tsx with variants (primary, secondary, outline, ghost) using CVA
- [ ] 6.2 Create components/common/Input.tsx with error state and label
- [ ] 6.3 Create components/common/Select.tsx with error state and label
- [ ] 6.4 Create components/common/Badge.tsx with variants (new, sale, best-seller, status)
- [ ] 6.5 Create components/common/EmptyState.tsx with icon, message, and action button
- [ ] 6.6 Create components/common/LoadingSkeleton.tsx for loading states
- [ ] 6.7 Create components/common/Toast.tsx or integrate react-hot-toast
- [ ] 6.8 Create components/common/ConfirmDialog.tsx for delete confirmations

## 7. Layout Components - Public

- [ ] 7.1 Create components/layout/PromotionBar.tsx with promotional message
- [ ] 7.2 Create components/layout/Header.tsx with logo, navigation, search, cart badge
- [ ] 7.3 Create components/layout/MobileMenu.tsx drawer with navigation links
- [ ] 7.4 Create components/layout/Footer.tsx with links and social icons
- [ ] 7.5 Create layouts/PublicLayout.tsx wrapping PromotionBar, Header, Outlet, Footer
- [ ] 7.6 Connect cart badge to cartStore total quantity

## 8. Layout Components - Admin

- [ ] 8.1 Create components/admin/AdminSidebar.tsx with navigation links and logout
- [ ] 8.2 Create components/admin/AdminHeader.tsx with page title and admin info
- [ ] 8.3 Create layouts/AdminLayout.tsx with AdminSidebar, AdminHeader, and Outlet
- [ ] 8.4 Style admin layout for desktop-first responsive design

## 9. Product Components

- [ ] 9.1 Create components/product/ProductCard.tsx with image, badges, name, price, actions
- [ ] 9.2 Create components/product/CategoryCard.tsx with image and name
- [ ] 9.3 Create components/product/CollectionBanner.tsx with image and CTA
- [ ] 9.4 Create components/product/QuickAddModal.tsx with size/color selectors
- [ ] 9.5 Implement add to cart logic in ProductCard (direct add or open modal)

## 10. Cart Components

- [ ] 10.1 Create components/cart/CartItemRow.tsx with image, info, quantity controls, remove button
- [ ] 10.2 Create components/cart/OrderSummary.tsx with subtotal, shipping, total, checkout button
- [ ] 10.3 Connect CartItemRow to cartStore actions (updateQuantity, removeItem)

## 11. Admin Components

- [ ] 11.1 Create components/admin/AdminTable.tsx generic table with columns config and pagination
- [ ] 11.2 Create components/admin/StatusBadge.tsx for order status display
- [ ] 11.3 Add action buttons (edit, delete) to AdminTable rows

## 12. Routing Setup

- [ ] 12.1 Create routes/AdminProtectedRoute.tsx checking adminAuthStore.isAuthenticated
- [ ] 12.2 Create routes/AppRoutes.tsx with all public and admin routes
- [ ] 12.3 Configure nested routes for admin pages under AdminLayout
- [ ] 12.4 Test route protection (redirect to /admin/login when not authenticated)
- [ ] 12.5 Update App.tsx to use BrowserRouter and AppRoutes

## 13. Form Validation Setup

- [ ] 13.1 Create validation schemas in utils/validationSchemas.ts using Zod
- [ ] 13.2 Create checkoutSchema with customerName, phone, email, address validation
- [ ] 13.3 Create productSchema for admin product form validation
- [ ] 13.4 Create categorySchema for admin category form validation

## 14. Public Pages - HomePage

- [ ] 14.1 Create pages/public/HomePage.tsx with all sections structure
- [ ] 14.2 Implement hero banner section with CTA buttons
- [ ] 14.3 Implement category cards section (grid of CategoryCard)
- [ ] 14.4 Implement collection banners section (grid of CollectionBanner)
- [ ] 14.5 Implement featured products section (grid of ProductCard with isFeatured filter)
- [ ] 14.6 Implement new products section (grid of ProductCard with isNew filter)
- [ ] 14.7 Implement benefits section with icons and text
- [ ] 14.8 Connect to productService and categoryService for data
- [ ] 14.9 Add loading and error states

## 15. Public Pages - ProductListPage

- [ ] 15.1 Create pages/public/ProductListPage.tsx with layout structure
- [ ] 15.2 Implement breadcrumb navigation
- [ ] 15.3 Implement search input with debounce (300ms)
- [ ] 15.4 Implement sort select (newest, price_asc, price_desc, best_seller)
- [ ] 15.5 Implement filter sidebar (category, price range, size, color, status)
- [ ] 15.6 Implement product grid (4 cols desktop, 3 tablet, 2 mobile)
- [ ] 15.7 Implement pagination controls
- [ ] 15.8 Implement empty state when no products found
- [ ] 15.9 Connect to productService.getProducts with query params
- [ ] 15.10 Update URL query params when filters change
- [ ] 15.11 Add loading skeleton for product grid

## 16. Public Pages - ProductDetailPage

- [ ] 16.1 Create pages/public/ProductDetailPage.tsx with layout structure
- [ ] 16.2 Implement breadcrumb navigation with category and product name
- [ ] 16.3 Implement product gallery (main image + thumbnails)
- [ ] 16.4 Implement product info section (name, price, badges, description)
- [ ] 16.5 Implement size selector (if product has sizes)
- [ ] 16.6 Implement color selector (if product has colors)
- [ ] 16.7 Implement quantity selector with +/- buttons
- [ ] 16.8 Implement "Thêm vào giỏ hàng" button with validation
- [ ] 16.9 Implement "Mua ngay" button (add to cart + redirect to checkout)
- [ ] 16.10 Implement policy box section
- [ ] 16.11 Implement product description section
- [ ] 16.12 Implement related products section (same category)
- [ ] 16.13 Connect to productService.getProductBySlug
- [ ] 16.14 Handle product not found (404 or redirect)
- [ ] 16.15 Show toast notification on successful add to cart

## 17. Public Pages - CartPage

- [ ] 17.1 Create pages/public/CartPage.tsx with layout structure
- [ ] 17.2 Implement cart items list using CartItemRow components
- [ ] 17.3 Implement OrderSummary component on the side
- [ ] 17.4 Implement empty cart state with "Mua sắm ngay" button
- [ ] 17.5 Implement "Tiếp tục mua sắm" button
- [ ] 17.6 Implement "Tiến hành thanh toán" button (navigate to /checkout)
- [ ] 17.7 Connect to cartStore for cart items and actions
- [ ] 17.8 Test quantity update and item removal

## 18. Public Pages - CheckoutPage

- [ ] 18.1 Create pages/public/CheckoutPage.tsx with layout structure
- [ ] 18.2 Implement simplified header (logo + back to cart link)
- [ ] 18.3 Implement customer information form using React Hook Form
- [ ] 18.4 Add form fields (name, phone, email, province, district, address, note)
- [ ] 18.5 Implement payment method selection (COD / Bank Transfer)
- [ ] 18.6 Show bank transfer note when bank_transfer is selected
- [ ] 18.7 Implement OrderSummary on the side showing cart items
- [ ] 18.8 Integrate Zod validation schema with React Hook Form
- [ ] 18.9 Implement form submission handler
- [ ] 18.10 Call orderService.createOrder on submit
- [ ] 18.11 Clear cart on successful order creation
- [ ] 18.12 Redirect to /order-success/:orderCode on success
- [ ] 18.13 Redirect to /cart if cart is empty
- [ ] 18.14 Show error toast on order creation failure

## 19. Public Pages - OrderSuccessPage

- [ ] 19.1 Create pages/public/OrderSuccessPage.tsx with layout structure
- [ ] 19.2 Implement success icon and "Đặt hàng thành công!" title
- [ ] 19.3 Display order code from URL params
- [ ] 19.4 Display confirmation message
- [ ] 19.5 Optionally fetch and display order summary (customer, total, payment method)
- [ ] 19.6 Implement "Tiếp tục mua sắm" button (navigate to /products)
- [ ] 19.7 Implement "Về trang chủ" button (navigate to /)

## 20. Admin Pages - AdminLoginPage

- [ ] 20.1 Create pages/admin/AdminLoginPage.tsx with centered form layout
- [ ] 20.2 Implement logo and "Đăng nhập quản trị" title
- [ ] 20.3 Implement email and password inputs using React Hook Form
- [ ] 20.4 Implement "Đăng nhập" button
- [ ] 20.5 Implement form validation (required fields, email format)
- [ ] 20.6 Connect to adminAuthStore.login action
- [ ] 20.7 Redirect to /admin on successful login
- [ ] 20.8 Display error message on login failure
- [ ] 20.9 Add "Về trang chủ" link

## 21. Admin Pages - AdminDashboardPage

- [ ] 21.1 Create pages/admin/AdminDashboardPage.tsx with layout structure
- [ ] 21.2 Implement statistics cards section (total products, categories, orders, pending orders, revenue)
- [ ] 21.3 Implement recent orders table using AdminTable component
- [ ] 21.4 Implement quick action buttons (add product, view new orders)
- [ ] 21.5 Connect to dashboardService.getStats
- [ ] 21.6 Connect to dashboardService.getRecentOrders
- [ ] 21.7 Add loading states for stats and table

## 22. Admin Pages - AdminProductsPage

- [ ] 22.1 Create pages/admin/AdminProductsPage.tsx with layout structure
- [ ] 22.2 Implement toolbar (search input, category filter, status filter, "Thêm sản phẩm" button)
- [ ] 22.3 Implement products table using AdminTable component
- [ ] 22.4 Configure table columns (image, name, category, price, sale price, stock, status, date, actions)
- [ ] 22.5 Implement search functionality
- [ ] 22.6 Implement filter functionality
- [ ] 22.7 Implement pagination
- [ ] 22.8 Implement edit button (navigate to /admin/products/:id/edit)
- [ ] 22.9 Implement delete button with confirmation dialog
- [ ] 22.10 Implement status toggle button
- [ ] 22.11 Connect to adminProductService.getProducts
- [ ] 22.12 Connect to adminProductService.deleteProduct
- [ ] 22.13 Connect to adminProductService.updateProductStatus
- [ ] 22.14 Add empty state when no products
- [ ] 22.15 Add loading skeleton for table

## 23. Admin Pages - AdminProductFormPage

- [ ] 23.1 Create pages/admin/AdminProductFormPage.tsx with form layout
- [ ] 23.2 Detect mode (new vs edit) from URL params
- [ ] 23.3 Implement form using React Hook Form with all product fields
- [ ] 23.4 Add fields: name, slug, category, price, sale price, image URL, short description, description
- [ ] 23.5 Add fields: sizes (comma-separated), colors (comma-separated), stock quantity
- [ ] 23.6 Add checkboxes: status, featured, new, best seller
- [ ] 23.7 Implement slug auto-generation from name
- [ ] 23.8 Integrate Zod validation schema
- [ ] 23.9 Load existing product data in edit mode
- [ ] 23.10 Implement "Lưu" button handler
- [ ] 23.11 Call adminProductService.createProduct or updateProduct
- [ ] 23.12 Redirect to /admin/products on success
- [ ] 23.13 Implement "Hủy" button (navigate back)
- [ ] 23.14 Show error toast on save failure

## 24. Admin Pages - AdminCategoriesPage

- [ ] 24.1 Create pages/admin/AdminCategoriesPage.tsx with layout structure
- [ ] 24.2 Implement toolbar (search input, "Thêm danh mục" button)
- [ ] 24.3 Implement categories table using AdminTable component
- [ ] 24.4 Configure table columns (image, name, slug, description, status, actions)
- [ ] 24.5 Implement "Thêm danh mục" button (open modal or navigate to form)
- [ ] 24.6 Implement category form modal or separate page
- [ ] 24.7 Add form fields: name, slug, description, image URL, status
- [ ] 24.8 Implement edit button
- [ ] 24.9 Implement delete button with confirmation
- [ ] 24.10 Connect to adminCategoryService.getCategories
- [ ] 24.11 Connect to adminCategoryService.createCategory
- [ ] 24.12 Connect to adminCategoryService.updateCategory
- [ ] 24.13 Connect to adminCategoryService.deleteCategory

## 25. Admin Pages - AdminOrdersPage

- [ ] 25.1 Create pages/admin/AdminOrdersPage.tsx with layout structure
- [ ] 25.2 Implement toolbar (search input, status filter, payment method filter, date filter)
- [ ] 25.3 Implement orders table using AdminTable component
- [ ] 25.4 Configure table columns (order code, customer, phone, total, payment method, status badge, date, actions)
- [ ] 25.5 Implement search functionality (order code, customer name, phone)
- [ ] 25.6 Implement status filter dropdown
- [ ] 25.7 Implement payment method filter dropdown
- [ ] 25.8 Implement date range filter
- [ ] 25.9 Implement view button (navigate to /admin/orders/:id)
- [ ] 25.10 Connect to adminOrderService.getOrders with filters
- [ ] 25.11 Add loading skeleton for table

## 26. Admin Pages - AdminOrderDetailPage

- [ ] 26.1 Create pages/admin/AdminOrderDetailPage.tsx with layout structure
- [ ] 26.2 Implement page title with order code
- [ ] 26.3 Implement customer info card (name, phone, email, address, note)
- [ ] 26.4 Implement order info card (order code, date, payment method, status, total)
- [ ] 26.5 Implement order items table (image, product name, size, color, price, quantity, subtotal)
- [ ] 26.6 Implement update status section (status select, "Cập nhật trạng thái" button)
- [ ] 26.7 Implement back button (navigate to /admin/orders)
- [ ] 26.8 Connect to adminOrderService.getOrderById
- [ ] 26.9 Connect to adminOrderService.updateOrderStatus
- [ ] 26.10 Show success toast on status update
- [ ] 26.11 Add loading state while fetching order

## 27. Responsive Design & Mobile Optimization

- [ ] 27.1 Test HomePage on mobile (hamburger menu, stacked sections)
- [ ] 27.2 Test ProductListPage on mobile (2-column grid, mobile filters)
- [ ] 27.3 Test ProductDetailPage on mobile (stacked layout)
- [ ] 27.4 Test CartPage on mobile (stacked cart items and summary)
- [ ] 27.5 Test CheckoutPage on mobile (stacked form and summary)
- [ ] 27.6 Test admin pages on tablet (ensure no layout breaks)
- [ ] 27.7 Fix any responsive issues found

## 28. Polish & Final Testing

- [ ] 28.1 Add loading states to all async operations
- [ ] 28.2 Add error handling and error messages to all API calls
- [ ] 28.3 Test complete shopping flow (browse → add to cart → checkout → order success)
- [ ] 28.4 Test complete admin flow (login → dashboard → manage products/categories/orders)
- [ ] 28.5 Test cart persistence (add items, reload page, verify items still there)
- [ ] 28.6 Test admin auth persistence (login, reload page, verify still logged in)
- [ ] 28.7 Test admin logout (verify token cleared and redirected to login)
- [ ] 28.8 Test protected routes (try accessing /admin without login)
- [ ] 28.9 Cross-browser testing (Chrome, Safari, Firefox)
- [ ] 28.10 Accessibility check (keyboard navigation, focus states, ARIA labels)
- [ ] 28.11 Performance check (Lighthouse score, bundle size)
- [ ] 28.12 Code cleanup (remove console.logs, unused imports, commented code)
- [ ] 28.13 Add README.md with setup instructions and project structure
- [ ] 28.14 Document any design decisions or deviations from mockups
