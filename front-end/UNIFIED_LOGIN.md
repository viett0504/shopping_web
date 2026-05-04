# 🔐 Trang Đăng Nhập Thống Nhất

## ✨ Tính năng mới

Giờ đây chỉ có **MỘT trang đăng nhập duy nhất** tại `/profile` cho cả User và Admin!

### 🎯 Cách hoạt động:

Khi đăng nhập, hệ thống tự động phân biệt:

#### 👤 Tài khoản User thường:
- **Email:** `user@gmail.com`
- **Password:** `user123`
- **Kết quả:** Ở lại trang profile, hiển thị thông tin cá nhân

#### 👨‍💼 Tài khoản Admin:
- **Email:** `admin@gmail.com`
- **Password:** `123456`
- **Kết quả:** Tự động chuyển đến `/admin/dashboard`

## 🚀 Cách sử dụng

### Đăng nhập User:
1. Truy cập: `http://localhost:5173/profile`
2. Nhập email: `user@gmail.com`
3. Nhập password: `user123`
4. Click "Đăng nhập"
5. ✅ Hiển thị trang profile với thông tin cá nhân

### Đăng nhập Admin:
1. Truy cập: `http://localhost:5173/profile`
2. Nhập email: `admin@gmail.com`
3. Nhập password: `123456`
4. Click "Đăng nhập"
5. ✅ Tự động chuyển đến admin dashboard

### Truy cập Admin trực tiếp:
- URL: `http://localhost:5173/admin/login`
- Tự động redirect đến `/profile` để đăng nhập
- Sau khi đăng nhập thành công → Chuyển đến dashboard

## 📱 Giao diện

### Trang đăng nhập hiển thị:
- Icon user trong vòng tròn xanh
- Form đăng nhập với email và password
- **2 box thông tin tài khoản demo:**
  - 👤 Box xanh: Tài khoản User
  - 👨‍💼 Box cam: Tài khoản Admin (có ghi chú sẽ chuyển đến trang quản trị)

## 🔄 Luồng hoạt động

```
┌─────────────────────────────────────────────────┐
│         Truy cập /profile hoặc /admin/login     │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
         ┌────────────────────┐
         │  Trang đăng nhập   │
         │    (/profile)      │
         └────────┬───────────┘
                  │
                  ▼
         ┌────────────────────┐
         │  Nhập email/pass   │
         └────────┬───────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
┌──────────────┐    ┌──────────────┐
│ Admin email? │    │ User email?  │
│ admin@...    │    │ user@...     │
└──────┬───────┘    └──────┬───────┘
       │                   │
       ▼                   ▼
┌──────────────┐    ┌──────────────┐
│   Redirect   │    │   Stay at    │
│  to /admin/  │    │   /profile   │
│  dashboard   │    │   (logged)   │
└──────────────┘    └──────────────┘
```

## 🛠️ Thay đổi kỹ thuật

### Files đã cập nhật:

1. **ProfilePage.jsx**
   - Thêm logic phân biệt admin/user
   - Import `adminAuthService` và `useAdminAuthStore`
   - Kiểm tra email để quyết định login type
   - Hiển thị 2 box tài khoản demo

2. **AdminLoginPage.jsx**
   - Đơn giản hóa thành redirect component
   - Nếu đã đăng nhập → Dashboard
   - Nếu chưa → Redirect đến `/profile`

### Logic đăng nhập:

```javascript
if (email === 'admin@gmail.com' && password === '123456') {
  // Admin login
  await adminLogin(email, password);
  navigate('/admin/dashboard');
} else {
  // User login
  const userData = await authService.login(email, password);
  login(userData);
  // Stay at profile page
}
```

## 🎨 UI Updates

### Tài khoản demo hiển thị:

**Box 1 - User (màu xanh):**
```
👤 Tài khoản User:
Email: user@gmail.com
Password: user123
```

**Box 2 - Admin (màu cam):**
```
👨‍💼 Tài khoản Admin:
Email: admin@gmail.com
Password: 123456
* Đăng nhập admin sẽ chuyển đến trang quản trị
```

## ✅ Lợi ích

1. **Đơn giản hơn:** Chỉ một trang đăng nhập duy nhất
2. **UX tốt hơn:** Tự động phân biệt và chuyển hướng
3. **Dễ maintain:** Không cần maintain 2 form riêng
4. **Rõ ràng:** Hiển thị cả 2 loại tài khoản demo

## 🔒 Bảo mật

- Admin được phân biệt bằng email cụ thể
- Mỗi loại tài khoản có store riêng
- Token được lưu riêng biệt
- Protected routes vẫn hoạt động bình thường

## 📝 Lưu ý

- Đây là **demo implementation**
- Trong production, nên:
  - Kiểm tra role từ backend
  - Không hardcode email admin
  - Sử dụng JWT với role claims
  - Implement proper RBAC

---

## 🎉 Thử ngay!

1. Mở: `http://localhost:5173/profile`
2. Thử đăng nhập với cả 2 tài khoản
3. Xem sự khác biệt!

**Happy Coding! 🚀**
