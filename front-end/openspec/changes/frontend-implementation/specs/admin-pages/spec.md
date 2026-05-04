## ADDED Requirements

### Requirement: AdminLoginPage authenticates admin users
The AdminLoginPage SHALL provide email/password login form for admin authentication.

#### Scenario: Admin logs in successfully
- **WHEN** admin enters valid email and password and clicks "Đăng nhập"
- **THEN** system calls POST `/auth/admin/login`, stores accessToken and admin info, and redirects to `/admin`

#### Scenario: Admin enters invalid credentials
- **WHEN** admin enters invalid email or password
- **THEN** system displays error message "Sai email hoặc mật khẩu"

#### Scenario: Non-admin user attempts login
- **WHEN** user without admin role attempts login
- **THEN** system displays error message "Tài khoản không có quyền admin"

### Requirement: AdminDashboardPage displays statistics and recent orders
The AdminDashboardPage SHALL display key statistics cards and recent orders table.

#### Scenario: Admin views dashboard
- **WHEN** admin navigates to `/admin`
- **THEN** system displays page title "Dashboard", statistic cards (total products, total categories, total orders, pending orders, estimated revenue), recent orders table (order code, customer, phone, total, status, date, view button), and quick action buttons

#### Scenario: Admin views order from dashboard
- **WHEN** admin clicks view button on order row
- **THEN** system navigates to `/admin/orders/{id}`

### Requirement: AdminProductsPage displays and manages products
The AdminProductsPage SHALL display products table with search, filter, and CRUD operations.

#### Scenario: Admin views products list
- **WHEN** admin navigates to `/admin/products`
- **THEN** system displays page title "Quản lý sản phẩm", toolbar (search input, category filter, status filter, "Thêm sản phẩm" button), products table (image, name, category, price, sale price, stock, status, created date, actions), and pagination

#### Scenario: Admin searches products
- **WHEN** admin types in search input
- **THEN** system filters products by name

#### Scenario: Admin adds new product
- **WHEN** admin clicks "Thêm sản phẩm" button
- **THEN** system navigates to `/admin/products/new`

#### Scenario: Admin edits product
- **WHEN** admin clicks edit button on product row
- **THEN** system navigates to `/admin/products/{id}/edit`

#### Scenario: Admin deletes product
- **WHEN** admin clicks delete button and confirms
- **THEN** system deletes product and refreshes list

#### Scenario: Admin toggles product status
- **WHEN** admin clicks status toggle button
- **THEN** system updates product status (active/inactive) and refreshes list

#### Scenario: No products found
- **WHEN** products list is empty
- **THEN** system displays empty state "Chưa có sản phẩm nào"

### Requirement: AdminProductFormPage creates and updates products
The AdminProductFormPage SHALL provide form for creating/editing products with validation.

#### Scenario: Admin creates new product
- **WHEN** admin navigates to `/admin/products/new`
- **THEN** system displays page title "Thêm sản phẩm", form fields (name, slug, category, price, sale price, image URL, short description, description, sizes, colors, stock quantity, status, featured, new, best seller), "Lưu" button, and "Hủy" button

#### Scenario: Admin saves new product
- **WHEN** admin fills form and clicks "Lưu"
- **THEN** system validates form, creates product via API, and redirects to `/admin/products`

#### Scenario: Admin edits existing product
- **WHEN** admin navigates to `/admin/products/{id}/edit`
- **THEN** system loads product data, displays page title "Sửa sản phẩm", and pre-fills form

#### Scenario: Admin updates product
- **WHEN** admin modifies form and clicks "Lưu"
- **THEN** system validates form, updates product via API, and redirects to `/admin/products`

#### Scenario: Admin cancels form
- **WHEN** admin clicks "Hủy" button
- **THEN** system navigates back to `/admin/products` without saving

### Requirement: AdminCategoriesPage displays and manages categories
The AdminCategoriesPage SHALL display categories table with CRUD operations.

#### Scenario: Admin views categories list
- **WHEN** admin navigates to `/admin/categories`
- **THEN** system displays page title "Quản lý danh mục", toolbar (search input, "Thêm danh mục" button), categories table (image, name, slug, description, status, actions)

#### Scenario: Admin adds new category
- **WHEN** admin clicks "Thêm danh mục" button
- **THEN** system opens modal or navigates to form page with fields (name, slug, description, image URL, status)

#### Scenario: Admin saves new category
- **WHEN** admin fills form and saves
- **THEN** system creates category via API and refreshes list

#### Scenario: Admin edits category
- **WHEN** admin clicks edit button on category row
- **THEN** system opens modal or form with pre-filled data

#### Scenario: Admin deletes category
- **WHEN** admin clicks delete button and confirms
- **THEN** system deletes category and refreshes list

### Requirement: AdminOrdersPage displays and filters orders
The AdminOrdersPage SHALL display orders table with search and filter capabilities.

#### Scenario: Admin views orders list
- **WHEN** admin navigates to `/admin/orders`
- **THEN** system displays page title "Quản lý đơn hàng", toolbar (search input, status filter, payment method filter, date filter), orders table (order code, customer, phone, total, payment method, status badge, created date, actions)

#### Scenario: Admin searches orders
- **WHEN** admin types in search input
- **THEN** system filters orders by order code, customer name, or phone number

#### Scenario: Admin filters by status
- **WHEN** admin selects status filter (pending, confirmed, shipping, completed, cancelled)
- **THEN** system displays orders matching selected status

#### Scenario: Admin views order detail
- **WHEN** admin clicks view button on order row
- **THEN** system navigates to `/admin/orders/{id}`

### Requirement: AdminOrderDetailPage displays order information and allows status updates
The AdminOrderDetailPage SHALL display complete order information and provide status update functionality.

#### Scenario: Admin views order detail
- **WHEN** admin navigates to `/admin/orders/{id}`
- **THEN** system displays page title "Chi tiết đơn hàng #{orderCode}", customer info card (name, phone, email, address, note), order info card (order code, created date, payment method, current status, total), order items table (image, product name, size, color, price, quantity, subtotal), update status section (status select, "Cập nhật trạng thái" button), and back button

#### Scenario: Admin updates order status
- **WHEN** admin selects new status and clicks "Cập nhật trạng thái"
- **THEN** system updates order status via API and refreshes page

#### Scenario: Admin returns to orders list
- **WHEN** admin clicks back button
- **THEN** system navigates to `/admin/orders`
