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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="/src/assets/logo_with_name.png" 
              alt="SportStore" 
              className="h-16"
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Trang chủ
            </Link>
            <Link 
              to="/products" 
              className={`font-medium transition-colors ${
                isActive('/products') || isActive('/cart') || isActive('/checkout')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Sản phẩm
            </Link>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Liên hệ
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Search Icon */}
            <button 
              className="p-2 text-gray-700 hover:text-blue-600 rounded-lg transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search size={20} />
            </button>
            
            {/* Cart Icon with Badge */}
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-blue-600 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold text-[10px] px-1">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* User Icon */}
            <Link
              to="/profile"
              className="p-2 text-gray-700 hover:text-blue-600 rounded-lg transition-colors"
              aria-label="Tài khoản"
            >
              <User size={20} />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg ml-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-1">
              <Link 
                to="/" 
                className={`font-medium py-3 px-4 rounded-lg transition-all ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-blue-600 bg-blue-50'
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
                    ? 'text-blue-600 bg-blue-50'
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
