## Context

Dự án Sports Store MVP cần frontend implementation hoàn chỉnh dựa trên design mockups có sẵn trong `src/assets/design/`. Hiện tại project đã setup sẵn React + TypeScript + Vite + Tailwind CSS nhưng chưa có cấu trúc thư mục và components. 

**Current State:**
- Có 14 file design mockup (PNG) cho public pages và admin pages
- Có PROJECT_CONTEXT.md định nghĩa rõ requirements và business rules
- Đã setup Vite + React + TypeScript + Tailwind CSS
- Chưa có folder structure, components, pages, routing, state management

**Constraints:**
- MVP scope: không làm customer authentication, payment online, shipping integration
- Guest checkout: khách không cần đăng nhập để mua hàng
- Cart persistence: phải lưu localStorage
- Admin only authentication: chỉ admin cần login với JWT
- Mobile-first cho public pages, desktop-first cho admin pages
- Phải bám sát design mockups về màu sắc, layout, spacing

**Stakeholders:**
- Frontend developers implementing the UI
- Backend team (sẽ integrate API sau, hiện dùng mock data)
- Product owner (cần demo MVP nhanh)

## Goals / Non-Goals

**Goals:**
- Xây dựng cấu trúc thư mục frontend chuẩn, dễ maintain và scale
- Implement đầy đủ 6 public pages và 7 admin pages theo design mockups
- Tạo 20+ reusable components với TypeScript types rõ ràng
- Setup routing với React Router (public + protected admin routes)
- Setup state management với Zustand (cart + admin auth)
- Setup form validation với React Hook Form + Zod
- Implement cart functionality với localStorage persistence
- Implement admin authentication flow với JWT token
- Chuẩn bị API service layer để dễ dàng integrate backend sau
- Responsive design (mobile-first public, desktop-first admin)
- Code quality cao: clean code, type-safe, reusable, testable

**Non-Goals:**
- Backend API implementation (sẽ dùng mock data)
- Customer authentication system (MVP không có)
- Payment gateway integration (MVP không có)
- Real-time features (websocket, notifications)
- Advanced animations/transitions (giữ đơn giản)
- Unit tests (có thể thêm sau, focus vào implementation trước)
- Internationalization (chỉ tiếng Việt)
- SEO optimization (có thể thêm sau)

## Decisions

### Decision 1: Folder Structure - Feature-based Organization

**Choice:** Organize by feature type (components, pages, services, stores) rather than by domain (products, orders, cart).

**Rationale:**
- Dễ tìm file: developers biết ngay component nằm ở `components/`, page nằm ở `pages/`
- Phù hợp với MVP size: chưa đủ lớn để cần domain-driven structure
- Dễ onboard: junior developers quen với structure này
- Dễ refactor sau: nếu project lớn hơn có thể chuyển sang domain-based

**Alternatives Considered:**
- Domain-based (products/, orders/, cart/): tốt cho large apps nhưng overkill cho MVP
- Flat structure: quá messy khi có 50+ files

**Structure:**
```
src/
  assets/          # Images, icons, design mockups
  components/      # Reusable components
    common/        # Button, Input, Select, Badge, etc.
    layout/        # Header, Footer, AdminSidebar, etc.
    product/       # ProductCard, CategoryCard, etc.
    cart/          # CartItemRow, OrderSummary
    admin/         # AdminTable, StatusBadge
  pages/           # Page components
    public/        # HomePage, ProductListPage, etc.
    admin/         # AdminDashboardPage, AdminProductsPage, etc.
  layouts/         # Layout wrappers
    PublicLayout.tsx
    AdminLayout.tsx
  routes/          # Routing configuration
    AppRoutes.tsx
    AdminProtectedRoute.tsx
  services/        # API services
    api.ts         # Axios instance
    productService.ts
    orderService.ts
    etc.
  stores/          # Zustand stores
    cartStore.ts
    adminAuthStore.ts
  types/           # TypeScript types
    product.ts
    order.ts
    etc.
  utils/           # Utility functions
    formatCurrency.ts
    slugify.ts
    storage.ts
  App.tsx
  main.tsx
```

### Decision 2: State Management - Zustand over Context API

**Choice:** Use Zustand for cart and admin auth state management.

**Rationale:**
- Simpler API than Redux: less boilerplate, easier to learn
- Better than Context API: no unnecessary re-renders, better performance
- Built-in persistence: easy localStorage integration with `persist` middleware
- TypeScript support: excellent type inference
- Small bundle size: ~1KB gzipped
- Perfect for MVP: simple enough but powerful enough to scale

**Alternatives Considered:**
- Context API: causes re-render issues, harder to optimize
- Redux Toolkit: overkill for MVP, more boilerplate
- Jotai/Recoil: less mature, smaller community

**Store Structure:**
```typescript
// cartStore.ts
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, size?: string, color?: string) => void;
  updateQuantity: (productId: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
  getTotalAmount: () => number;
}

// adminAuthStore.ts
interface AdminAuthState {
  accessToken: string | null;
  admin: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

### Decision 3: Form Validation - React Hook Form + Zod

**Choice:** Use React Hook Form with Zod schema validation.

**Rationale:**
- React Hook Form: best performance (uncontrolled inputs), minimal re-renders
- Zod: type-safe schema validation, great TypeScript integration
- @hookform/resolvers: seamless integration between RHF and Zod
- Declarative validation: schemas are reusable and testable
- Better UX: field-level validation, async validation support

**Alternatives Considered:**
- Formik: more re-renders, heavier bundle
- Manual validation: error-prone, hard to maintain
- Yup: less type-safe than Zod

**Example Usage:**
```typescript
const checkoutSchema = z.object({
  customerName: z.string().min(1, "Họ tên là bắt buộc").max(100),
  customerPhone: z.string().regex(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
  customerEmail: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  province: z.string().min(1, "Tỉnh/thành phố là bắt buộc"),
  district: z.string().min(1, "Quận/huyện là bắt buộc"),
  shippingAddress: z.string().min(1, "Địa chỉ là bắt buộc").max(255),
  paymentMethod: z.enum(["cod", "bank_transfer"]),
});
```

### Decision 4: Routing - React Router v6 with Protected Routes

**Choice:** Use React Router v6 with custom ProtectedRoute component for admin routes.

**Rationale:**
- Industry standard: most popular React routing library
- v6 improvements: better TypeScript support, simpler API
- Nested routes: perfect for admin layout with sidebar
- Protected routes pattern: clean separation of public/admin routes

**Route Structure:**
```typescript
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<PublicLayout />}>
    <Route index element={<HomePage />} />
    <Route path="products" element={<ProductListPage />} />
    <Route path="products/:slug" element={<ProductDetailPage />} />
    <Route path="cart" element={<CartPage />} />
    <Route path="checkout" element={<CheckoutPage />} />
    <Route path="order-success/:orderCode" element={<OrderSuccessPage />} />
  </Route>

  {/* Admin Routes */}
  <Route path="/admin/login" element={<AdminLoginPage />} />
  <Route path="/admin" element={<AdminProtectedRoute />}>
    <Route element={<AdminLayout />}>
      <Route index element={<AdminDashboardPage />} />
      <Route path="products" element={<AdminProductsPage />} />
      <Route path="products/new" element={<AdminProductFormPage />} />
      <Route path="products/:id/edit" element={<AdminProductFormPage />} />
      <Route path="categories" element={<AdminCategoriesPage />} />
      <Route path="orders" element={<AdminOrdersPage />} />
      <Route path="orders/:id" element={<AdminOrderDetailPage />} />
    </Route>
  </Route>
</Routes>
```

### Decision 5: API Layer - Service Pattern with Mock Data

**Choice:** Create service layer with Axios, initially returning mock data, designed for easy backend integration.

**Rationale:**
- Separation of concerns: pages/components don't know about API details
- Easy to mock: can develop frontend without backend
- Easy to integrate: just replace mock logic with real API calls
- Centralized error handling: Axios interceptors
- Type-safe: services return typed data

**Service Structure:**
```typescript
// api.ts - Axios instance with interceptors
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
});

// Request interceptor: add auth token
api.interceptors.request.use((config) => {
  const token = useAdminAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAdminAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

// productService.ts - Mock implementation
export const productService = {
  async getProducts(params: ProductQueryParams): Promise<ProductListResponse> {
    // TODO: Replace with real API call
    // return api.get('/products', { params }).then(res => res.data);
    
    // Mock implementation
    await delay(500);
    return {
      items: mockProducts.filter(/* apply filters */),
      total: mockProducts.length,
      page: params.page || 1,
      limit: params.limit || 12,
    };
  },
  
  async getProductBySlug(slug: string): Promise<Product> {
    // TODO: Replace with real API call
    // return api.get(`/products/${slug}`).then(res => res.data);
    
    await delay(300);
    const product = mockProducts.find(p => p.slug === slug);
    if (!product) throw new Error('Product not found');
    return product;
  },
};
```

### Decision 6: Component Design - Composition over Configuration

**Choice:** Design components with composition pattern (children, slots) rather than heavy configuration props.

**Rationale:**
- More flexible: easier to customize without prop explosion
- Better TypeScript: less complex prop types
- React philosophy: composition is idiomatic
- Easier to maintain: less conditional logic in components

**Example:**
```typescript
// Good: Composition
<Card>
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
    <Badge variant="sale">Sale</Badge>
  </CardHeader>
  <CardBody>
    <img src={imageUrl} alt={name} />
  </CardBody>
  <CardFooter>
    <Button>Add to Cart</Button>
  </CardFooter>
</Card>

// Avoid: Heavy configuration
<Card
  title="Product Name"
  badge={{ text: "Sale", variant: "sale" }}
  image={imageUrl}
  actions={[{ label: "Add to Cart", onClick: handleAdd }]}
/>
```

### Decision 7: Styling - Tailwind Utility-First with Component Variants

**Choice:** Use Tailwind CSS utility classes with component variant patterns (using clsx/cn helper).

**Rationale:**
- Utility-first: faster development, no CSS file switching
- Design system consistency: use Tailwind's spacing/color scale
- Component variants: clean API for component variations
- No CSS conflicts: utility classes are scoped
- Purge unused CSS: small production bundle

**Variant Pattern:**
```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-11 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: React.FC<ButtonProps> = ({ variant, size, className, ...props }) => {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
};
```

### Decision 8: TypeScript - Strict Mode with Explicit Types

**Choice:** Enable TypeScript strict mode and use explicit types for all props, state, and API responses.

**Rationale:**
- Catch errors early: strict mode prevents common bugs
- Better IDE support: autocomplete, refactoring
- Self-documenting: types serve as inline documentation
- Easier refactoring: compiler catches breaking changes

**Type Organization:**
```typescript
// types/product.ts
export interface Product {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  imageUrl: string;
  shortDescription?: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  stockQuantity: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductQueryParams {
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  status?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'best_seller';
  page?: number;
  limit?: number;
}

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}
```

## Risks / Trade-offs

### Risk 1: Mock Data Divergence from Real API
**Risk:** Mock data structure might not match real backend API when integrated.

**Mitigation:**
- Define TypeScript interfaces based on PROJECT_CONTEXT.md API specs
- Review types with backend team before implementation
- Use same field names and data types as backend schema
- Document any assumptions in service files
- Plan integration testing phase when backend is ready

### Risk 2: localStorage Size Limits
**Risk:** Cart data in localStorage might hit 5-10MB browser limit if users add many items.

**Mitigation:**
- Unlikely for MVP: typical cart has 5-10 items, each ~1KB = 10KB total
- Monitor cart size in development
- If needed: implement cart item limit (e.g., max 50 items)
- Future: move cart to backend when customer accounts are added

### Risk 3: Design Mockup Ambiguities
**Risk:** PNG mockups might not show all states (loading, error, empty, mobile) or interactive behaviors.

**Mitigation:**
- Follow PROJECT_CONTEXT.md for missing states
- Use consistent patterns across similar components
- Document design decisions in code comments
- Get stakeholder feedback early on ambiguous cases

### Risk 4: Performance with Large Product Lists
**Risk:** Rendering 100+ products without pagination/virtualization might be slow.

**Mitigation:**
- Implement pagination from start (12 products per page)
- Use React.memo for ProductCard to prevent unnecessary re-renders
- Lazy load images with loading="lazy" attribute
- Future: add virtual scrolling if needed

### Risk 5: Admin Auth Token Expiration Handling
**Risk:** JWT tokens expire but we don't have refresh token mechanism in MVP.

**Mitigation:**
- Set reasonable token expiration (e.g., 24 hours)
- Axios interceptor catches 401 and redirects to login
- Admin sees clear message: "Phiên đăng nhập đã hết hạn"
- Future: implement refresh token when backend supports it

### Risk 6: Mobile Responsive Design Without Mobile Mockups
**Risk:** Design mockups might only show desktop, requiring mobile design decisions.

**Mitigation:**
- Follow mobile-first Tailwind approach
- Use standard responsive patterns (hamburger menu, stacked layout)
- Test on real devices early
- Reference PROJECT_CONTEXT.md responsive rules
- Get stakeholder approval on mobile design

## Migration Plan

### Phase 1: Setup & Infrastructure (Day 1)
1. Install dependencies: `npm install react-router-dom zustand react-hook-form zod @hookform/resolvers axios class-variance-authority clsx`
2. Setup folder structure: create all folders in `src/`
3. Setup TypeScript types: create all type definition files
4. Setup utilities: formatCurrency, slugify, storage helpers
5. Setup Axios instance with interceptors
6. Verify Tailwind config and add custom colors if needed

### Phase 2: Core Components (Day 2-3)
1. Create shared components: Button, Input, Select, Badge, EmptyState, LoadingSkeleton
2. Create layout components: Header, Footer, PromotionBar, MobileMenu
3. Create admin layout components: AdminSidebar, AdminHeader
4. Test components in isolation (Storybook optional)

### Phase 3: State Management & Routing (Day 3)
1. Implement cartStore with localStorage persistence
2. Implement adminAuthStore with localStorage persistence
3. Setup React Router with routes configuration
4. Implement AdminProtectedRoute component
5. Create PublicLayout and AdminLayout wrappers

### Phase 4: Public Pages (Day 4-6)
1. Create mock data for products, categories
2. Implement API services with mock implementations
3. Implement HomePage with all sections
4. Implement ProductListPage with filters
5. Implement ProductDetailPage
6. Implement CartPage
7. Implement CheckoutPage with form validation
8. Implement OrderSuccessPage
9. Test complete shopping flow

### Phase 5: Admin Pages (Day 7-9)
1. Create mock data for orders, admin users
2. Implement admin API services
3. Implement AdminLoginPage
4. Implement AdminDashboardPage
5. Implement AdminProductsPage with table
6. Implement AdminProductFormPage
7. Implement AdminCategoriesPage
8. Implement AdminOrdersPage
9. Implement AdminOrderDetailPage
10. Test complete admin flow

### Phase 6: Polish & Testing (Day 10)
1. Responsive testing on mobile/tablet
2. Cross-browser testing (Chrome, Safari, Firefox)
3. Fix bugs and edge cases
4. Performance optimization (lazy loading, code splitting)
5. Accessibility check (keyboard navigation, ARIA labels)
6. Code review and refactoring

### Rollback Strategy
- Git branches: work on feature branch, merge to main when stable
- If critical bug: revert commit and fix in new branch
- No database migrations: frontend-only changes are safe to rollback

### Backend Integration Plan (Future)
1. Update `VITE_API_BASE_URL` environment variable
2. Replace mock implementations in service files with real API calls
3. Test each endpoint integration
4. Handle API-specific error responses
5. Update types if API response structure differs

## Open Questions

1. **Design System Colors:** Should we extract Tailwind colors to match exact brand colors from mockups? Need hex codes from designer.

2. **Image Hosting:** Where will product images be hosted? CDN? S3? For now using placeholder URLs.

3. **Admin Permissions:** MVP has single admin role, but should we design for future role-based permissions (super admin, staff)?

4. **Error Tracking:** Should we integrate Sentry or similar for production error tracking?

5. **Analytics:** Should we add Google Analytics or similar tracking from start?

6. **Toast Notifications:** Which toast library to use? react-hot-toast vs sonner vs custom?

7. **Date Formatting:** Should we use date-fns or dayjs for date formatting? Or native Intl?

8. **Loading States:** Should we use skeleton loaders everywhere or simple spinners for MVP?

**Decisions Needed Before Implementation:**
- Confirm exact brand colors (primary, secondary, accent)
- Confirm toast notification library choice
- Confirm if we need analytics integration from start
