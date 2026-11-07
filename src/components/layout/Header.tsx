import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Sparkles,
  Box,
  Truck
} from 'lucide-react';

interface HeaderProps {
  onNavigateToCatalog: () => void;
  onNavigateToStory: () => void;
  onNavigateToBlog: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateToCatalog,
  onNavigateToStory,
  onNavigateToBlog
}) => {
  const {
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    setIsUserAccountOpen,
    setActiveAccountTab,
    setIsAIChatOpen,
    setIsComboBuilderOpen,
    setSelectedProduct,
    products
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = searchQuery.trim() === ''
    ? []
    : products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.dietaryTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 5);

  const handleSelectSearchResult = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/70">
      {/* Subtle Top Bar */}
      <div className="bg-[#163824] text-emerald-50/90 text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="truncate font-medium">
            Miễn phí vận chuyển đơn từ 299K • Nướng mộc tươi mới mỗi ngày
          </p>

          <div className="hidden md:flex items-center gap-5 text-emerald-100/80 shrink-0">
            <button
              onClick={() => {
                setActiveAccountTab('tracking');
                setIsUserAccountOpen(true);
              }}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Tra cứu đơn hàng</span>
            </button>
            <span className="text-emerald-700">|</span>
            <span>Hotline: <strong className="text-white font-semibold">1900 6828</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">

          {/* 1. Brand Logo */}
          <div className="flex items-center shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-[#1E7547] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <img
                  src="/assets/images/sowell-stamp-badge.png"
                  alt="SOWELL Logo"
                  className="w-[180%] h-[180%] max-w-none object-cover object-center"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl text-[#163824] tracking-tight leading-none">
                  Sowell
                </span>
                <span className="text-[10px] font-medium text-stone-500 tracking-wide mt-0.5 leading-none">
                  Healthy Craft Bakery
                </span>
              </div>
            </a>
          </div>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-semibold text-stone-600 shrink-0">
            <a
              href="#"
              className="text-[#163824] hover:text-[#1E7547] transition-colors whitespace-nowrap"
            >
              Trang chủ
            </a>

            <button
              onClick={onNavigateToCatalog}
              className="hover:text-[#1E7547] transition-colors cursor-pointer whitespace-nowrap"
            >
              Sản phẩm
            </button>

            <button
              onClick={() => setIsComboBuilderOpen(true)}
              className="hover:text-[#1E7547] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Combo Mix Vị</span>
              <span className="bg-[#EEF6F0] text-[#1E7547] text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">
                -25%
              </span>
            </button>

            <button
              onClick={onNavigateToStory}
              className="hover:text-[#1E7547] transition-colors cursor-pointer whitespace-nowrap"
            >
              Câu chuyện
            </button>

            <button
              onClick={onNavigateToBlog}
              className="hover:text-[#1E7547] transition-colors cursor-pointer whitespace-nowrap"
            >
              Cẩm nang
            </button>
          </nav>

          {/* 3. Right Controls */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Clean Search Input */}
            <div className="relative hidden md:block w-40 lg:w-48">
              <input
                type="text"
                placeholder="Tìm bánh, calo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 180)}
                className="w-full bg-stone-100/80 text-xs rounded-full pl-8 pr-3.5 py-2 border border-transparent focus:bg-white focus:border-[#1E7547]/40 focus:outline-none transition-all placeholder:text-stone-400"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />

              {/* Autocomplete Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full right-0 w-72 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200/80 overflow-hidden z-50 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-stone-100 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                    Gợi ý sản phẩm ({searchResults.length})
                  </div>
                  <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onMouseDown={() => handleSelectSearchResult(product)}
                        className="p-2.5 flex items-center gap-3 hover:bg-stone-50 cursor-pointer transition-colors"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-stone-800 truncate">{product.name}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                            <span className="font-bold text-[#1E7547]">{product.price.toLocaleString('vi-VN')}₫</span>
                            <span className="text-stone-400">• {product.nutrition.calories} kcal</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Subtle AI Advisor Button */}
            <button
              onClick={() => setIsAIChatOpen(true)}
              className="hidden sm:flex items-center gap-1.5 bg-[#EEF6F0] hover:bg-[#E0F0E4] text-[#163824] px-3 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer shrink-0"
              title="Trợ lý AI tư vấn calo & bánh phù hợp"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1E7547]" />
              <span>Tư vấn AI</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                setActiveAccountTab('wishlist');
                setIsUserAccountOpen(true);
              }}
              className="p-2 text-stone-600 hover:text-[#1E7547] hover:bg-stone-100 rounded-full transition-colors relative cursor-pointer shrink-0"
              title="Danh sách yêu thích"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#1E7547] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account Button */}
            <button
              onClick={() => {
                setActiveAccountTab('orders');
                setIsUserAccountOpen(true);
              }}
              className="p-2 text-stone-600 hover:text-[#1E7547] hover:bg-stone-100 rounded-full transition-colors cursor-pointer shrink-0"
              title="Tài khoản & Đơn hàng"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#163824] hover:bg-[#1E7547] text-white px-3.5 py-2 rounded-full font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <div className="relative flex items-center">
                <ShoppingBag className="w-3.5 h-3.5" />
                {cartCount > 0 && (
                  <span className="ml-1.5 bg-white text-[#163824] text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline">
                {cartSubtotal > 0 ? `${cartSubtotal.toLocaleString('vi-VN')}₫` : 'Giỏ hàng'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-xl cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-100 space-y-1.5 animate-fadeIn">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Tìm bánh, calo, vị hạt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#1E7547]"
              />
            </div>
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl font-semibold text-xs text-[#163824] bg-stone-100/70"
            >
              Trang chủ
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToCatalog();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-xs text-stone-700 hover:bg-stone-50"
            >
              Sản phẩm
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsComboBuilderOpen(true);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-semibold text-xs text-[#1E7547] bg-[#EEF6F0] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Box className="w-4 h-4" />
                Tự phối hộp bánh
              </span>
              <span className="text-[10px] font-bold">-18%</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAIChatOpen(true);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-semibold text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#1E7547]" />
              <span>Trợ lý AI tư vấn dinh dưỡng</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToStory();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-xs text-stone-700 hover:bg-stone-50"
            >
              Câu chuyện nông trại
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToBlog();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-xs text-stone-700 hover:bg-stone-50"
            >
              Cẩm nang dinh dưỡng
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
