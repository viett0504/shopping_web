# DESIGN.md — Quy tắc Agent phải tuân thủ theo thiết kế trong `src/assets/design`

## 0. Mục đích file này

File này là tài liệu bắt buộc dành cho AI Agent / Coding Agent khi triển khai giao diện Frontend.

Dự án đã có sẵn các file thiết kế được đặt trong:

```text
src/assets/design/
├── home.png              # Trang chủ
├── product.png           # Danh sách sản phẩm
├── detail_product.png    # Chi tiết sản phẩm
├── cart.png              # Giỏ hàng
├── checkout.png          # Thanh toán
├── checkout_success.png  # Đặt hàng thành công
├── order_detail.png      # Chi tiết đơn hàng
├── contact.png           # Liên hệ
├── login.png             # Đăng nhập
├── sign_up.png           # Đăng ký
├── admin_dashboard.png   # Admin Dashboard
├── admin_product.png     # Admin Quản lý sản phẩm
├── admin_category.png    # Admin Quản lý danh mục
└── admin_order.png       # Admin Quản lý đơn hàng
```

## 1. Nguyên tắc bắt buộc

### 1.1. Tuân thủ thiết kế 100%

- **BẮT BUỘC**: Xem kỹ file thiết kế trước khi code
- **BẮT BUỘC**: Bám sát layout, màu sắc, font size, spacing, border radius trong thiết kế
- **KHÔNG ĐƯỢC**: Tự ý thay đổi UI nếu thiết kế đã rõ ràng
- **NẾU THIẾU**: Nếu thiết kế thiếu màn hình hoặc state, tạo bổ sung theo đúng style hiện có

### 1.2. Responsive Design

- **Desktop First**: Thiết kế chính cho desktop (≥1024px)
- **Tablet**: Tự điều chỉnh hợp lý (768px - 1023px)
- **Mobile**: Tự điều chỉnh hợp lý (≤767px)
- Ưu tiên mobile-first cho public pages

### 1.3. Component Reusability

- Tách component tái sử dụng từ các element lặp lại
- Đặt tên component rõ ràng, dễ hiểu
- Các component như ProductCard, Button, Input, Header, Footer phải tách riêng

## 2. Design System

### 2.1. Màu sắc (Colors)

```css
/* Primary Colors */
--primary-blue: #2563eb;      /* Blue 600 */
--primary-blue-dark: #1e40af; /* Blue 700 */
--primary-blue-light: #3b82f6; /* Blue 500 */

/* Secondary Colors */
--secondary-gray: #6b7280;    /* Gray 500 */
--secondary-gray-dark: #374151; /* Gray 700 */
--secondary-gray-light: #9ca3af; /* Gray 400 */

/* Status Colors */
--success: #10b981;  /* Green 500 */
--warning: #f59e0b;  /* Amber 500 */
--error: #ef4444;    /* Red 500 */
--info: #3b82f6;     /* Blue 500 */

/* Background Colors */
--bg-white: #ffffff;
--bg-gray-50: #f9fafb;
--bg-gray-100: #f3f4f6;
--bg-gray-900: #111827;

/* Text Colors */
--text-primary: #111827;   /* Gray 900 */
--text-secondary: #6b7280; /* Gray 500 */
--text-white: #ffffff;
```

### 2.2. Typography

```css
/* Font Family */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 2.3. Spacing

```css
/* Spacing Scale (Tailwind) */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### 2.4. Border Radius

```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-full: 9999px;  /* Full rounded */
```

### 2.5. Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## 3. Component Guidelines

### 3.1. Header

**Cấu trúc:**
- Logo (trái)
- Menu chính (giữa): Trang chủ, Sản phẩm, Liên hệ
- Actions (phải): Tìm kiếm, Giỏ hàng, Tài khoản

**Styling:**
- Background: white
- Shadow: sm
- Sticky top
- Height: ~64px
- Active menu: border-bottom + màu primary

### 3.2. Footer

**Cấu trúc:**
- 4 cột: Giới thiệu, Danh mục, Chính sách, Liên hệ
- Social media icons
- Copyright

**Styling:**
- Background: gray-900
- Text: gray-300
- Padding: py-12

### 3.3. Button

**Variants:**
- Primary: bg-blue-600, text-white
- Secondary: bg-gray-200, text-gray-900
- Outline: border-gray-300, text-gray-700
- Ghost: transparent, text-gray-700

**Sizes:**
- sm: px-3 py-1.5, text-sm
- md: px-4 py-2, text-base
- lg: px-6 py-3, text-lg

### 3.4. Input

**Styling:**
- Border: border-gray-300
- Focus: ring-2 ring-blue-500
- Error: border-red-500
- Padding: px-3 py-2
- Rounded: rounded-lg

### 3.5. ProductCard

**Cấu trúc:**
- Image (aspect-square)
- Badges (new, sale, best-seller)
- Name
- Price (sale price + original price)
- Add to cart button

**Styling:**
- Background: white
- Border: border-gray-200
- Hover: shadow-md
- Rounded: rounded-lg

### 3.6. Badge

**Variants:**
- new: bg-green-100, text-green-800
- sale: bg-red-100, text-red-800
- best-seller: bg-yellow-100, text-yellow-800
- status: dynamic based on order status

## 4. Page-Specific Guidelines

### 4.1. HomePage

**Sections:**
1. Hero Banner (full-width, gradient background)
2. Categories Grid (4 columns)
3. Featured Products (4 columns)
4. New Products (4 columns)
5. Benefits Section (4 columns)

### 4.2. ProductListPage

**Layout:**
- Sidebar filters (left, 25%)
- Product grid (right, 75%, 4 columns)
- Pagination (bottom)

**Features:**
- Search bar
- Sort dropdown
- Category filter
- Price range filter

### 4.3. ProductDetailPage

**Layout:**
- Product images (left, 50%)
- Product info (right, 50%)
- Description (full-width)
- Related products (4 columns)

**Features:**
- Size selector
- Color selector
- Quantity selector
- Add to cart / Buy now

### 4.4. CartPage

**Layout:**
- Cart items list (left, 66%)
- Order summary (right, 33%)

**Features:**
- Update quantity
- Remove item
- Empty state

### 4.5. CheckoutPage

**Layout:**
- Customer form (left, 66%)
- Order summary (right, 33%)

**Features:**
- Form validation
- Payment method selection
- Order summary

## 5. Coding Standards

### 5.1. CSS/Styling

- **Ưu tiên**: Tailwind utility classes
- **Tránh**: Custom CSS nếu có thể
- **Responsive**: Mobile-first approach
- **Naming**: BEM convention nếu cần custom CSS

### 5.2. Component Structure

```jsx
// Good structure
export default function ComponentName() {
  // 1. Hooks
  const [state, setState] = useState();
  
  // 2. Effects
  useEffect(() => {}, []);
  
  // 3. Handlers
  const handleClick = () => {};
  
  // 4. Render helpers
  const renderItem = () => {};
  
  // 5. Return JSX
  return (
    <div className="...">
      {/* Content */}
    </div>
  );
}
```

### 5.3. Props & Types

- Sử dụng PropTypes hoặc TypeScript
- Destructure props
- Default props khi cần

### 5.4. State Management

- Local state: useState
- Global state: Zustand
- Form state: React Hook Form

## 6. Checklist trước khi commit

- [ ] Đã xem kỹ file thiết kế
- [ ] Layout khớp với thiết kế
- [ ] Màu sắc đúng
- [ ] Font size đúng
- [ ] Spacing đúng
- [ ] Border radius đúng
- [ ] Shadow đúng
- [ ] Responsive trên mobile
- [ ] Hover states hoạt động
- [ ] Active states hoạt động
- [ ] Loading states có
- [ ] Empty states có
- [ ] Error states có
- [ ] Component tái sử dụng được tách riêng
- [ ] Code sạch, dễ đọc
- [ ] Không có console.log
- [ ] Không có unused imports

## 7. Lưu ý quan trọng

1. **Luôn xem thiết kế trước khi code**
2. **Không tự ý thay đổi UI**
3. **Hỏi nếu thiết kế không rõ**
4. **Test responsive trên nhiều màn hình**
5. **Test trên nhiều trình duyệt**
6. **Optimize performance (lazy load images, code splitting)**
7. **Accessibility (ARIA labels, keyboard navigation)**

---

**Cập nhật lần cuối**: 2024
**Người tạo**: SportStore Team
