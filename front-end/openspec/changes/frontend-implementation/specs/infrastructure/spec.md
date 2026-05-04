## ADDED Requirements

### Requirement: Routing system provides navigation and route protection
The system SHALL use React Router for navigation with public and protected admin routes.

#### Scenario: Public routes are accessible without authentication
- **WHEN** user navigates to public routes (/, /products, /products/:slug, /cart, /checkout, /order-success/:orderCode)
- **THEN** system renders respective pages without authentication check

#### Scenario: Admin routes require authentication
- **WHEN** unauthenticated user navigates to admin routes (/admin/*)
- **THEN** system redirects to `/admin/login`

#### Scenario: Authenticated admin accesses admin routes
- **WHEN** authenticated admin navigates to admin routes
- **THEN** system renders respective admin pages with AdminLayout

#### Scenario: Admin login redirects to dashboard
- **WHEN** admin successfully logs in
- **THEN** system redirects to `/admin`

### Requirement: Cart management persists cart state across sessions
The system SHALL use Zustand store with localStorage persistence for cart management.

#### Scenario: Cart state persists on page reload
- **WHEN** user adds items to cart and reloads page
- **THEN** system restores cart items from localStorage

#### Scenario: Adding same product with same variants increases quantity
- **WHEN** user adds product with same productId, size, and color
- **THEN** system increments quantity of existing cart item

#### Scenario: Adding same product with different variants creates new item
- **WHEN** user adds product with same productId but different size or color
- **THEN** system creates new cart item

#### Scenario: Cart badge displays total quantity
- **WHEN** cart items change
- **THEN** system updates cart badge with total quantity across all items

#### Scenario: Clearing cart removes all items
- **WHEN** order is successfully created
- **THEN** system clears all cart items and updates localStorage

### Requirement: Admin authentication manages admin session
The system SHALL use Zustand store with localStorage persistence for admin authentication.

#### Scenario: Admin token persists on page reload
- **WHEN** admin logs in and reloads page
- **THEN** system restores accessToken and admin info from localStorage

#### Scenario: API requests include admin token
- **WHEN** admin makes API request to protected endpoint
- **THEN** system includes Authorization Bearer token in request headers

#### Scenario: Logout clears admin session
- **WHEN** admin clicks logout
- **THEN** system clears accessToken and admin info from localStorage and redirects to `/admin/login`

#### Scenario: Expired token redirects to login
- **WHEN** API returns 401 Unauthorized
- **THEN** system clears admin session and redirects to `/admin/login`

### Requirement: Form validation ensures data quality
The system SHALL use React Hook Form with Zod schemas for form validation.

#### Scenario: Checkout form validates required fields
- **WHEN** user submits checkout form with missing required fields
- **THEN** system displays validation errors for customerName, customerPhone, province, district, shippingAddress

#### Scenario: Checkout form validates phone format
- **WHEN** user enters invalid phone number format
- **THEN** system displays error "Số điện thoại không hợp lệ"

#### Scenario: Admin product form validates required fields
- **WHEN** admin submits product form with missing required fields
- **THEN** system displays validation errors for name, slug, categoryId, price, stockQuantity

#### Scenario: Admin product form validates price values
- **WHEN** admin enters negative price or sale price
- **THEN** system displays error "Giá phải lớn hơn hoặc bằng 0"

### Requirement: API services provide data access layer
The system SHALL provide API service layer with Axios for backend communication.

#### Scenario: API service uses mock data initially
- **WHEN** API service methods are called without backend
- **THEN** system returns mock data with realistic structure and delays

#### Scenario: API service handles errors gracefully
- **WHEN** API request fails
- **THEN** system catches error and returns structured error response

#### Scenario: API service supports easy backend integration
- **WHEN** backend is ready
- **THEN** developer can replace mock implementations with real API calls by updating base URL and removing mock logic

### Requirement: Type definitions ensure type safety
The system SHALL provide TypeScript interfaces for all data models.

#### Scenario: Product type includes all required fields
- **WHEN** Product type is used
- **THEN** system enforces id, categoryId, name, slug, price, imageUrl, status, and optional fields (salePrice, sizes, colors, etc.)

#### Scenario: Order type includes customer and items
- **WHEN** Order type is used
- **THEN** system enforces orderCode, customerName, customerPhone, shippingAddress, totalAmount, paymentMethod, orderStatus, and items array

#### Scenario: CartItem type includes product snapshot
- **WHEN** CartItem type is used
- **THEN** system enforces productId, slug, name, price, quantity, and optional size/color

### Requirement: Utility functions provide common operations
The system SHALL provide utility functions for currency formatting, slugification, and storage operations.

#### Scenario: formatCurrency formats Vietnamese currency
- **WHEN** formatCurrency is called with number
- **THEN** system returns formatted string with thousand separators and "đ" suffix (e.g., "199.000đ")

#### Scenario: slugify converts Vietnamese text to URL-safe slug
- **WHEN** slugify is called with Vietnamese text
- **THEN** system returns lowercase slug with hyphens, removing diacritics (e.g., "Áo thể thao" → "ao-the-thao")

#### Scenario: Storage helpers handle localStorage operations
- **WHEN** storage helpers are used
- **THEN** system safely reads/writes JSON to localStorage with error handling
