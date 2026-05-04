import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">SportStore</h3>
            <p className="text-sm mb-4">
              Cửa hàng đồ thể thao chất lượng cao với giá tốt nhất dành cho sinh viên. 
              Chúng tôi cam kết mang đến sản phẩm chính hãng, giá cả hợp lý.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Danh mục sản phẩm</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/products?categoryId=1" className="hover:text-white transition-colors">
                  Giày thể thao
                </Link>
              </li>
              <li>
                <Link to="/products?categoryId=2" className="hover:text-white transition-colors">
                  Áo thể thao
                </Link>
              </li>
              <li>
                <Link to="/products?categoryId=3" className="hover:text-white transition-colors">
                  Quần thể thao
                </Link>
              </li>
              <li>
                <Link to="/products?categoryId=4" className="hover:text-white transition-colors">
                  Phụ kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold mb-4">Chính sách & Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách vận chuyển
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="text-white font-semibold mb-4">Liên hệ với chúng tôi</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>
                  Số 123, Đường ABC, Quận XYZ<br />
                  Hà Nội, Việt Nam
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                <span>Hotline: 1900-xxxx (8:00 - 22:00)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                <span>support@sportstore.vn</span>
              </li>
            </ul>
            
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-xs mb-2 text-white font-medium">Đăng ký nhận tin khuyến mãi</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  className="flex-1 px-3 py-2 bg-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">
              <p className="text-white font-medium mb-2">Phương thức thanh toán</p>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-gray-800 rounded text-xs">COD</div>
                <div className="px-3 py-1 bg-gray-800 rounded text-xs">Chuyển khoản</div>
                <div className="px-3 py-1 bg-gray-800 rounded text-xs">Ví điện tử</div>
              </div>
            </div>
            <div className="text-sm text-center">
              <p>&copy; 2024 SportStore. All rights reserved.</p>
              <p className="text-xs text-gray-500 mt-1">
                Thiết kế bởi SportStore Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
