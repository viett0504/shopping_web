## ADDED Requirements

### Requirement: HomePage displays hero banner and product sections
The HomePage SHALL display a hero banner, category cards, collection banners, featured products, and new products sections following the design mockup.

#### Scenario: User visits homepage
- **WHEN** user navigates to `/`
- **THEN** system displays promotion bar, header with navigation, hero banner, category section, collection banners, featured products grid, new products grid, benefits section, and footer

#### Scenario: User clicks category card
- **WHEN** user clicks on a category card
- **THEN** system navigates to `/products?categoryId={id}` with filtered products

#### Scenario: User clicks product card
- **WHEN** user clicks on a product card
- **THEN** system navigates to `/products/{slug}` product detail page

#### Scenario: User adds product to cart from homepage
- **WHEN** user clicks "Add to Cart" button on a product card
- **THEN** system adds product to cart and updates cart badge count

### Requirement: ProductListPage displays filterable product grid
The ProductListPage SHALL display a grid of products with search, filter, and sort capabilities.

#### Scenario: User views all products
- **WHEN** user navigates to `/products`
- **THEN** system displays breadcrumb, page title "Tất cả sản phẩm", filter sidebar, product grid (4 columns desktop, 3 tablet, 2 mobile), and pagination

#### Scenario: User searches for products
- **WHEN** user types in search input
- **THEN** system filters products by name with debounce (300ms)

#### Scenario: User filters by category
- **WHEN** user selects a category from sidebar
- **THEN** system updates URL query params and displays filtered products

#### Scenario: User sorts products
- **WHEN** user selects sort option (newest, price_asc, price_desc, best_seller)
- **THEN** system re-orders product grid accordingly

#### Scenario: No products found
- **WHEN** filters result in zero products
- **THEN** system displays empty state with "Không tìm thấy sản phẩm phù hợp" and "Xóa bộ lọc" button

### Requirement: ProductDetailPage displays product information and purchase options
The ProductDetailPage SHALL display product details, images, size/color selectors, quantity input, and add to cart functionality.

#### Scenario: User views product detail
- **WHEN** user navigates to `/products/{slug}`
- **THEN** system displays breadcrumb, product gallery, product info (name, price, sale price, badges, description), size selector, color selector, quantity selector, "Thêm vào giỏ hàng" button, "Mua ngay" button, policy box, product description section, and related products

#### Scenario: User adds product to cart
- **WHEN** user selects size/color (if applicable), quantity, and clicks "Thêm vào giỏ hàng"
- **THEN** system validates selections, adds to cart, shows toast "Đã thêm sản phẩm vào giỏ hàng"

#### Scenario: User clicks buy now
- **WHEN** user clicks "Mua ngay" button
- **THEN** system adds product to cart and redirects to `/checkout`

#### Scenario: Product not found
- **WHEN** user navigates to invalid product slug
- **THEN** system displays 404 message or redirects to products page

### Requirement: CartPage displays cart items and allows modifications
The CartPage SHALL display all cart items with ability to update quantity or remove items.

#### Scenario: User views cart with items
- **WHEN** user navigates to `/cart` with items in cart
- **THEN** system displays page title "Giỏ hàng của bạn", cart item list (image, name, size, color, price, quantity controls, subtotal, remove button), cart summary (subtotal, shipping note, total), and "Tiến hành thanh toán" button

#### Scenario: User increases item quantity
- **WHEN** user clicks increase button on cart item
- **THEN** system increments quantity and updates subtotal and total

#### Scenario: User decreases item quantity
- **WHEN** user clicks decrease button on cart item
- **THEN** system decrements quantity, updates totals, and removes item if quantity reaches 0

#### Scenario: User removes item
- **WHEN** user clicks remove button
- **THEN** system removes item from cart and updates totals

#### Scenario: User views empty cart
- **WHEN** user navigates to `/cart` with no items
- **THEN** system displays empty state with icon, "Giỏ hàng của bạn đang trống" message, and "Mua sắm ngay" button

#### Scenario: User proceeds to checkout
- **WHEN** user clicks "Tiến hành thanh toán" with items in cart
- **THEN** system navigates to `/checkout`

### Requirement: CheckoutPage collects customer information and creates order
The CheckoutPage SHALL display order summary and customer information form with validation.

#### Scenario: User views checkout page
- **WHEN** user navigates to `/checkout` with items in cart
- **THEN** system displays simplified header, customer form (name, phone, email, province, district, address, note), payment method selection (COD/Bank Transfer), order summary, and "Đặt hàng" button

#### Scenario: User submits valid order
- **WHEN** user fills all required fields correctly and clicks "Đặt hàng"
- **THEN** system validates form, creates order via API, clears cart, and redirects to `/order-success/{orderCode}`

#### Scenario: User submits invalid form
- **WHEN** user clicks "Đặt hàng" with missing or invalid fields
- **THEN** system displays validation errors below respective fields

#### Scenario: User accesses checkout with empty cart
- **WHEN** user navigates to `/checkout` with empty cart
- **THEN** system redirects to `/cart`

### Requirement: OrderSuccessPage displays order confirmation
The OrderSuccessPage SHALL display order confirmation with order code and summary.

#### Scenario: User views order success
- **WHEN** user navigates to `/order-success/{orderCode}` after successful order
- **THEN** system displays success icon, "Đặt hàng thành công!" title, order code, confirmation message, order summary (customer name, phone, total, payment method), "Tiếp tục mua sắm" button, and "Về trang chủ" button

#### Scenario: User continues shopping
- **WHEN** user clicks "Tiếp tục mua sắm"
- **THEN** system navigates to `/products`

#### Scenario: User returns to homepage
- **WHEN** user clicks "Về trang chủ"
- **THEN** system navigates to `/`
