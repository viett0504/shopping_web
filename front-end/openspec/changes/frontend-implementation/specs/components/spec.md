## ADDED Requirements

### Requirement: Shared components provide reusable UI elements
The system SHALL provide reusable Button, Input, Select, Badge, EmptyState, LoadingSkeleton, Toast, and ConfirmDialog components.

#### Scenario: Button component renders with variants
- **WHEN** Button component is used with variant prop (primary, secondary, outline, ghost)
- **THEN** system renders button with appropriate styling

#### Scenario: Input component handles validation states
- **WHEN** Input component receives error prop
- **THEN** system displays input with error styling and error message

#### Scenario: Badge component displays status
- **WHEN** Badge component is used with variant (new, sale, best-seller, status)
- **THEN** system renders badge with appropriate color and text

#### Scenario: EmptyState component displays when no data
- **WHEN** EmptyState component is rendered with icon, message, and action button
- **THEN** system displays centered empty state UI

### Requirement: Layout components provide consistent page structure
The system SHALL provide Header, Footer, PromotionBar, MobileMenu, AdminSidebar, and AdminHeader components.

#### Scenario: Header displays navigation and cart badge
- **WHEN** Header component is rendered
- **THEN** system displays logo, navigation menu, search icon, cart icon with badge count

#### Scenario: Header opens mobile menu
- **WHEN** user clicks hamburger menu on mobile
- **THEN** system opens MobileMenu drawer with navigation links

#### Scenario: Footer displays site information
- **WHEN** Footer component is rendered
- **THEN** system displays logo, description, category links, policy links, contact info, and social links

#### Scenario: AdminSidebar displays admin navigation
- **WHEN** AdminSidebar component is rendered
- **THEN** system displays logo, navigation links (Dashboard, Sản phẩm, Danh mục, Đơn hàng), and logout button

### Requirement: Product components display product information
The system SHALL provide ProductCard, CategoryCard, CollectionBanner, and QuickAddModal components.

#### Scenario: ProductCard displays product with badges
- **WHEN** ProductCard component is rendered with product data
- **THEN** system displays image, badges (new/sale/best-seller), name, price, sale price, category, quick add button, and view detail button

#### Scenario: ProductCard opens QuickAddModal for products with variants
- **WHEN** user clicks quick add button on product with sizes/colors
- **THEN** system opens QuickAddModal with size/color selectors

#### Scenario: CategoryCard navigates to filtered products
- **WHEN** user clicks CategoryCard
- **THEN** system navigates to products page with category filter

### Requirement: Cart components display cart information
The system SHALL provide CartItemRow and OrderSummary components.

#### Scenario: CartItemRow displays item with quantity controls
- **WHEN** CartItemRow component is rendered with cart item
- **THEN** system displays image, name, size, color, price, quantity controls (-, +), subtotal, and remove button

#### Scenario: OrderSummary displays cart totals
- **WHEN** OrderSummary component is rendered with cart items
- **THEN** system displays subtotal, shipping note, total, and checkout button

### Requirement: Admin components provide admin-specific UI
The system SHALL provide AdminTable and StatusBadge components.

#### Scenario: AdminTable displays data with pagination
- **WHEN** AdminTable component is rendered with data and columns config
- **THEN** system displays table with headers, rows, action buttons, and pagination controls

#### Scenario: StatusBadge displays order status
- **WHEN** StatusBadge component is rendered with status (pending, confirmed, shipping, completed, cancelled)
- **THEN** system displays badge with appropriate color and Vietnamese label
