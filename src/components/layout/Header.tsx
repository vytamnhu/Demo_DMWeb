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
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#EAE5DA] shadow-2xs">
      {/* Top Bar: Clean Announcement */}
      <div className="bg-[#153E26] text-white text-xs py-2 px-4 border-b border-[#1A4B2F]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-[#E59828] text-white text-[10px] font-bold px-1.5 py-0.2 rounded uppercase shrink-0">
              ƯU ĐÃI
            </span>
            <span className="text-emerald-100 font-medium truncate text-[11px] sm:text-xs">
              Miễn phí vận chuyển toàn quốc cho đơn từ 299K • Tặng bình thủy tinh cho thành viên mới
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-emerald-200 text-xs shrink-0">
            <button 
              onClick={() => {
                setActiveAccountTab('tracking');
                setIsUserAccountOpen(true);
              }}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#E59828]" />
              <span>Tra cứu vận đơn</span>
            </button>
            <span>•</span>
            <span>Hotline: <strong className="text-white font-semibold">1900 6828</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-6">
          
          {/* 1. Left: Brand Logo (Always shrink-0 to prevent collision) */}
          <div className="flex items-center shrink-0">
            <a href="#" className="flex items-center gap-3 group">
              {/* Clean Postage Stamp Badge (Square crop, perfectly centered) */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-[#1E7547] flex items-center justify-center shrink-0 border border-[#165a36] shadow-xs group-hover:scale-104 transition-transform">
                <img 
                  src="/assets/images/sowell-stamp-badge.png" 
                  alt="SOWELL Logo" 
                  className="w-[185%] h-[185%] max-w-none object-cover object-center"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Brand Lettering */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-2xl text-[#153E26] tracking-tight group-hover:text-[#1E7547] transition-colors leading-none">
                    Sowell
                  </span>
                  <span className="bg-[#EBF7EE] text-[#1E7547] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#CDEED5] leading-none">
                    ORGANIC
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-[#8B7355] tracking-wider uppercase mt-1 leading-none">
                  Gieo hạt xanh, vị ngon lành
                </span>
              </div>
            </a>
          </div>

          {/* 2. Center: Streamlined Desktop Navigation Links (whitespace-nowrap & never wrapping) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold text-zinc-700 shrink-0">
            <a 
              href="#" 
              className="text-[#1E7547] border-b-2 border-[#1E7547] pb-1 transition-colors whitespace-nowrap"
            >
              Trang Chủ
            </a>
            
            <button 
              onClick={onNavigateToCatalog} 
              className="hover:text-[#1E7547] transition-colors cursor-pointer whitespace-nowrap"
            >
              Sản Phẩm
            </button>

            {/* Custom Combo Builder Pill */}
            <button 
              onClick={() => setIsComboBuilderOpen(true)}
              className="text-[#1E7547] bg-[#EBF7EE] hover:bg-[#DDF3E3] px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 border border-[#BDE8C7] cursor-pointer group whitespace-nowrap shadow-2xs"
            >
              <Box className="w-3.5 h-3.5 text-[#1E7547] group-hover:rotate-12 transition-transform" />
              <span>Tự Phối Combo</span>
              <span className="bg-[#E59828] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-none">
                -18%
              </span>
            </button>

            <button 
              onClick={onNavigateToStory}
              className="hover:text-[#1E7547] transition-colors cursor-pointer whitespace-nowrap"
            >
              Câu Chuyện Nông Trại
            </button>

            <button 
              onClick={onNavigateToBlog}
              className="hover:text-[#1E7547] transition-colors cursor-pointer whitespace-nowrap"
            >
              Cẩm Nang Calo
            </button>
          </nav>

          {/* 3. Right: Action Controls (Search, AI Assistant, Wishlist, Account, Cart) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* AI Advisor Button - Prominent, elegant and never collides with text links */}
            <button 
              onClick={() => setIsAIChatOpen(true)}
              className="hidden sm:flex items-center gap-1.5 bg-[#FEF4E5] hover:bg-[#FDE7C4] text-[#8B5000] border border-[#FCD34D] px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer group shadow-2xs shrink-0"
              title="Trợ lý AI tư vấn calo & bánh phù hợp"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D97706] group-hover:scale-110 transition-transform" />
              <span>AI Tư Vấn Calo</span>
              <span className="bg-[#1E7547] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full leading-none">
                AI ✨
              </span>
            </button>

            {/* Responsive Search Input */}
            <div className="relative hidden md:block w-36 lg:w-44 xl:w-52">
              <input
                type="text"
                placeholder="Tìm bánh, calo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#FAF8F5] text-xs rounded-full pl-8 pr-4 py-2 border border-zinc-200 focus:bg-white focus:border-[#1E7547] focus:outline-none focus:w-56 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />

              {/* Autocomplete Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full right-0 w-72 mt-2 bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden z-50 animate-fadeIn">
                  <div className="p-2 border-b border-zinc-100 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Sản phẩm phù hợp ({searchResults.length})
                  </div>
                  <div className="divide-y divide-zinc-100 max-h-60 overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onMouseDown={() => handleSelectSearchResult(product)}
                        className="p-2.5 flex items-center gap-3 hover:bg-[#F9F7F2] cursor-pointer transition-colors"
                      >
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-10 h-10 object-cover rounded-lg shrink-0 border border-zinc-100" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-zinc-900 truncate">{product.name}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                            <span className="font-bold text-[#1E7547]">{product.price.toLocaleString('vi-VN')}₫</span>
                            <span className="text-zinc-500">• {product.nutrition.calories} kcal</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button 
              onClick={() => {
                setActiveAccountTab('wishlist');
                setIsUserAccountOpen(true);
              }}
              className="p-2 text-zinc-600 hover:text-[#1E7547] hover:bg-zinc-100 rounded-full transition-colors relative cursor-pointer shrink-0"
              title="Danh sách yêu thích"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#E59828] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
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
              className="p-2 text-zinc-600 hover:text-[#1E7547] hover:bg-zinc-100 rounded-full transition-colors cursor-pointer shrink-0"
              title="Tài khoản & Đơn hàng"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-[#1E7547] hover:bg-[#165a36] text-white px-3 sm:px-3.5 py-2 rounded-full font-bold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer shrink-0"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#E59828] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-semibold hidden xl:inline">
                {cartSubtotal > 0 ? `${cartSubtotal.toLocaleString('vi-VN')}₫` : 'Giỏ Hàng'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 hover:bg-zinc-100 rounded-xl cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-100 space-y-2 animate-fadeIn">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Tìm bánh, calo, vị hạt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF8F5] text-xs rounded-xl px-4 py-2.5 border border-zinc-200 focus:outline-none"
              />
            </div>
            <a 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-bold text-xs text-[#1E7547] bg-[#EBF7EE]"
            >
              Trang Chủ
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToCatalog();
              }}
              className="w-full text-left px-3 py-2 rounded-xl font-medium text-xs text-zinc-800 hover:bg-zinc-50"
            >
              Bộ Sưu Tập Bánh
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsComboBuilderOpen(true);
              }}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-xs text-[#1E7547] bg-[#EBF7EE] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Box className="w-4 h-4 text-[#1E7547]" />
                Tùy Chỉnh Combo Hộp Bánh
              </span>
              <span className="bg-[#E59828] text-white text-[9px] px-2 py-0.5 rounded-full font-black">ƯU ĐÃI 18%</span>
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAIChatOpen(true);
              }}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-xs text-[#8B5000] bg-[#FEF4E5] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                Trợ Lý AI Tính Calo SOWELL
              </span>
              <span className="bg-[#1E7547] text-white text-[9px] px-2 py-0.5 rounded-full font-black">AI ✨</span>
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToStory();
              }}
              className="w-full text-left px-3 py-2 rounded-xl font-medium text-xs text-zinc-800 hover:bg-zinc-50"
            >
              Chuyện Nông Trại Hạt Mộc
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToBlog();
              }}
              className="w-full text-left px-3 py-2 rounded-xl font-medium text-xs text-zinc-800 hover:bg-zinc-50"
            >
              Cẩm Nang Calo & Dinh Dưỡng
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
