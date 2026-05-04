# 🏃‍♂️ SportStore - Front-end

Cửa hàng đồ thể thao trực tuyến dành cho sinh viên.

## 📋 Yêu cầu hệ thống

Trước khi bắt đầu, đảm bảo máy tính của bạn đã cài đặt:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (đi kèm với Node.js)
- **Git** ([Download](https://git-scm.com/))

Kiểm tra version:
```bash
node --version
npm --version
git --version
```

## 🚀 Hướng dẫn cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd <project-folder>/front-end
```

### 2. Cài đặt dependencies

```bash
npm install
```

⏱️ Quá trình này mất khoảng 2-3 phút.

### 3. Chạy development server

```bash
npm run dev
```

✅ Server sẽ chạy tại: **http://localhost:5173/**

## 📦 Scripts có sẵn

```bash
# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Chạy ESLint
npm run lint
```

## 🔐 Tài khoản demo

### 👤 User thường:
- **Email:** user@gmail.com
- **Password:** user123
- **Chức năng:** Xem sản phẩm, thêm giỏ hàng, đặt hàng

### 👨‍💼 Admin:
- **Email:** admin@gmail.com
- **Password:** 123456
- **Chức năng:** Quản lý sản phẩm, danh mục, đơn hàng

## 🗂️ Cấu trúc thư mục

```
front-end/
├── public/              # Static files
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/         # Images, fonts
│   ├── components/     # React components
│   │   ├── admin/     # Admin components
│   │   ├── cart/      # Cart components
│   │   ├── common/    # Reusable components
│   │   ├── layout/    # Layout components
│   │   └── product/   # Product components
│   ├── hooks/         # Custom React hooks
│   ├── layouts/       # Page layouts
│   ├── pages/         # Page components
│   │   ├── admin/    # Admin pages
│   │   └── public/   # Public pages
│   ├── routes/        # Route configuration
│   ├── services/      # API services (mock data)
│   ├── stores/        # Zustand stores
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Root component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Tech Stack

### Core:
- **React 19** - UI Framework
- **Vite 8** - Build tool & Dev server
- **React Router v7** - Routing

### Styling:
- **Tailwind CSS v3** - Utility-first CSS
- **Lucide React** - Icon library

### State Management:
- **Zustand** - Lightweight state management
- **Zustand Persist** - LocalStorage persistence

### Form & Validation:
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### HTTP & Notifications:
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

### Utilities:
- **clsx** - Conditional classNames
- **tailwind-merge** - Merge Tailwind classes
- **class-variance-authority** - Component variants

## 🌐 Các trang chính

### Public (Khách hàng):
- `/` - Trang chủ
- `/products` - Danh sách sản phẩm
- `/products/:slug` - Chi tiết sản phẩm
- `/cart` - Giỏ hàng
- `/checkout` - Thanh toán
- `/order-success/:orderCode` - Đặt hàng thành công
- `/profile` - Trang cá nhân / Đăng nhập

### Admin (Quản trị):
- `/admin/login` - Đăng nhập admin (redirect to /profile)
- `/admin/dashboard` - Dashboard
- `/admin/products` - Quản lý sản phẩm
- `/admin/products/new` - Thêm sản phẩm
- `/admin/products/:id/edit` - Sửa sản phẩm
- `/admin/categories` - Quản lý danh mục
- `/admin/orders` - Quản lý đơn hàng
- `/admin/orders/:id` - Chi tiết đơn hàng

## 📊 Mock Data

Hiện tại ứng dụng sử dụng **mock data** (không cần backend):

- **8 sản phẩm** mẫu
- **4 danh mục** (Giày, Áo, Quần, Phụ kiện)
- **1 đơn hàng** mẫu
- **2 tài khoản** (user + admin)

File mock data: `src/services/mockData.js`

## 🔧 Cấu hình

### Environment Variables (Optional)

Tạo file `.env` trong thư mục `front-end/`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Nếu không có file `.env`, app sẽ dùng mock data.

### Tailwind CSS

Cấu hình trong `tailwind.config.js`. Custom colors, spacing, etc.

### Vite

Cấu hình trong `vite.config.js`. Proxy, plugins, etc.

## 🐛 Troubleshooting

### Lỗi: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: Port 5173 đã được sử dụng
```bash
# Thay đổi port trong vite.config.js
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Lỗi: Tailwind CSS không hoạt động
```bash
# Xóa cache Vite
rm -rf node_modules/.vite
npm run dev
```

### Màn hình trắng khi chạy
1. Kiểm tra console browser (F12)
2. Đảm bảo đã chạy `npm install`
3. Hard refresh: Ctrl+Shift+R (Windows) hoặc Cmd+Shift+R (Mac)

## 📱 Responsive Design

Website được thiết kế responsive cho:

- 📱 **Mobile:** < 768px
- 💻 **Tablet:** 768px - 1024px
- 🖥️ **Desktop:** > 1024px

## 🎯 Features

### Public Features:
- ✅ Xem danh sách sản phẩm với filter & sort
- ✅ Tìm kiếm sản phẩm
- ✅ Xem chi tiết sản phẩm
- ✅ Thêm vào giỏ hàng
- ✅ Quản lý giỏ hàng (thêm, xóa, cập nhật số lượng)
- ✅ Checkout với form validation
- ✅ Đăng ký / Đăng nhập
- ✅ Xem và chỉnh sửa profile

### Admin Features:
- ✅ Dashboard với thống kê
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý danh mục (CRUD)
- ✅ Quản lý đơn hàng
- ✅ Cập nhật trạng thái đơn hàng
- ✅ Protected routes

## 🔒 Authentication

- **User auth:** Lưu trong localStorage với key `user-storage`
- **Admin auth:** Lưu trong localStorage với key `admin-auth-storage`
- **Auto-login:** Tự động đăng nhập khi refresh page
- **Protected routes:** Admin routes yêu cầu đăng nhập

## 🚧 Known Issues

1. **Mock data:** Dữ liệu sẽ reset khi refresh page (trừ cart & auth)
2. **Image upload:** Chưa có tính năng upload ảnh, dùng URL
3. **Payment:** Chưa tích hợp payment gateway thật
4. **Email:** Chưa có tính năng gửi email

## 📝 Development Notes

### Code Style:
- **ESLint:** Đã cấu hình với React rules
- **Prettier:** Khuyến khích cài extension
- **Naming:** camelCase cho variables, PascalCase cho components

### Git Workflow:
```bash
# Tạo branch mới
git checkout -b feature/ten-tinh-nang

# Commit changes
git add .
git commit -m "feat: mô tả ngắn gọn"

# Push lên remote
git push origin feature/ten-tinh-nang

# Tạo Pull Request trên GitHub/GitLab
```

### Commit Convention:
- `feat:` - Tính năng mới
- `fix:` - Sửa bug
- `docs:` - Cập nhật documentation
- `style:` - Format code, không ảnh hưởng logic
- `refactor:` - Refactor code
- `test:` - Thêm tests
- `chore:` - Cập nhật dependencies, config

## 🤝 Contributing

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📞 Support

Nếu gặp vấn đề, hãy:
1. Kiểm tra phần **Troubleshooting** ở trên
2. Tìm trong **Issues** trên GitHub
3. Tạo **Issue** mới với mô tả chi tiết

## 📚 Tài liệu tham khảo

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🚀**

Được tạo với ❤️ bởi SportStore Team
