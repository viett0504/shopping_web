import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import useCartStore from '../../stores/cartStore';
import { useState } from 'react';

export default function Header() {
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Promotion Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-2 text-center">
          <p className="text-sm font-medium">
            🎉 Miễn phí vận chuyển cho đơn từ 200K - Ưu đãi sinh viên giảm đến 50%
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-gray-900">SportStore</div>
              <div className="text-xs text-gray-500">Đồ thể thao sinh viên</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link 
              to="/" 
              className={`font-medium transition-all pb-1 border-b-2 ${
                isActive('/') && location.pathname === '/'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-300'
              }`}
            >
              Trang chủ
            </Link>
            <Link 
              to="/products" 
              className={`font-medium transition-all pb-1 border-b-2 ${
                isActive('/products') || isActive('/cart') || isActive('/checkout')
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-300'
              }`}
            >
              Sản phẩm
            </Link>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-all pb-1 border-b-2 border-transparent hover:border-blue-300"
            >
              Liên hệ
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search Icon */}
            <button 
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              aria-label="Tìm kiếm"
            >
              <Search size={20} />
            </button>
            
            {/* Cart Icon */}
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              <ShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* User Icon */}
            <button 
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              aria-label="Tài khoản"
            >
              <User size={20} />
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 animate-fadeIn">
            <nav className="flex flex-col space-y-1">
              <Link 
                to="/" 
                className={`font-medium py-3 px-4 rounded-lg transition-all ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link 
                to="/products" 
                className={`font-medium py-3 px-4 rounded-lg transition-all ${
                  isActive('/products') || isActive('/cart') || isActive('/checkout')
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sản phẩm
              </Link>
              <a 
                href="#contact" 
                className="text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Liên hệ
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
