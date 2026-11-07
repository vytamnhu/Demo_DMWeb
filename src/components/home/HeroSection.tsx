import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Box, ArrowRight, ShieldCheck, Flame, Leaf, ShoppingBag, Star } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCatalog }) => {
  const { setIsAIChatOpen, setIsComboBuilderOpen, addToCart, products } = useStore();
  const heroProduct = products.find(p => p.id === 'sowell-biscotti-3-flavors') || products[0];

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-[#EAE5DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Typography & Clean CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean Tag */}
            <div className="inline-flex items-center gap-2 bg-[#EBF7EE] border border-[#BCE8C6] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1E7547]">
              <span className="w-2 h-2 rounded-full bg-[#1E7547]" />
              <span>SOWELL • Biscotti & Bánh Ngói Hạnh Nhân</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173824] tracking-tight leading-[1.2]">
              Biscotti & Bánh Ngói <br />
              <span className="text-[#1E7547]">Hạnh Nhân SOWELL,</span>{' '}
              <span className="text-[#D97706]">Giòn Rụm Tự Nhiên.</span>
            </h1>

            {/* Sub-paragraph */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl font-normal">
              SOWELL mang đến món ăn nhẹ lành mạnh: <strong className="text-zinc-900 font-semibold">Biscotti (3 vị: Original, Choco, Matcha)</strong> giòn chắc hợp nhúng cà phê/sữa và <strong className="text-zinc-900 font-semibold">Bánh ngói hạnh nhân</strong> giòn rụm mỏng thơm bơ. Số liệu dinh dưỡng và thành phần minh bạch dựa trên nhãn sản phẩm.
            </p>

            {/* 3 Core Highlights (Clean & Spacious) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EBF7EE] text-[#1E7547] flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">Biscotti (3 Vị)</p>
                  <p className="text-[11px] text-zinc-500">175 kcal / 50g (nhãn)</p>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FEF4E5] text-[#D97706] flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">Bánh Ngói Almond</p>
                  <p className="text-[11px] text-zinc-500">98 kcal / 20g (1 túi 2 bánh)</p>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1E7547] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">Chuẩn Nhãn Bao Bì</p>
                  <p className="text-[11px] text-zinc-500">Rõ ràng dị ứng & WHO</p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setIsComboBuilderOpen(true)}
                className="bg-[#1E7547] hover:bg-[#165a36] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <Box className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
                <span>Tự Phối Combo Hộp Bánh</span>
                <span className="bg-[#E59828] text-white text-[10px] font-black px-1.5 py-0.2 rounded ml-1">
                  -18%
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setIsAIChatOpen(true)}
                className="bg-[#FEF4E5] hover:bg-[#FDE68A] text-[#8B5000] border border-[#FCD34D] px-5 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span>Trợ Lý Tư Vấn Bánh</span>
              </button>

              <button
                onClick={onExploreCatalog}
                className="text-zinc-700 hover:text-[#1E7547] font-semibold text-sm px-4 py-3 text-center transition-colors cursor-pointer"
              >
                Xem tất cả bánh →
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-1 flex items-center gap-3 text-xs text-zinc-500">
              <div className="flex -space-x-2">
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" />
              </div>
              <div className="flex items-center gap-1.5 text-zinc-700 font-medium">
                <span className="text-[#F59E0B] font-bold">★★★★★ 4.9/5.0</span>
                <span>• Hơn 8.500+ khách hàng tin dùng</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Premium Product Card Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Product Showcase Card */}
              <div className="bg-white p-5 rounded-3xl shadow-xl border border-zinc-200/90 relative">
                
                {/* Hero Product Photo with Floating Pills */}
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 group bg-[#FAF8F5]">
                  <img 
                    src={heroProduct.images[0]} 
                    alt={heroProduct.name} 
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    <span className="bg-[#1E7547] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                      Sản phẩm SOWELL
                    </span>
                    <span className="bg-white/95 backdrop-blur-md text-zinc-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs border border-zinc-200 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#D97706]" />
                      <span>{heroProduct.nutrition.calories} kcal • {heroProduct.nutrition.servingSize.split('(')[0]}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#1E7547] text-[10px] font-bold px-2 py-0.5 rounded border border-[#BCE8C6]">
                    HSD 3 Tháng
                  </div>
                </div>

                {/* Card Info */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#1E7547] bg-[#EBF7EE] px-2 py-0.5 rounded">
                      Original • Choco • Matcha
                    </span>
                    <div className="flex items-center text-amber-500 text-xs gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-zinc-800">4.9</span>
                      <span className="text-zinc-400 text-[11px]">(420)</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-zinc-900 text-base leading-snug">
                    {heroProduct.name}
                  </h3>

                  {/* Clean Macro Row */}
                  <div className="py-2 px-3 bg-[#FAF8F5] rounded-xl border border-zinc-100 text-xs text-zinc-600 flex items-center justify-between">
                    <span>Đạm: <strong className="text-zinc-900 font-bold">{heroProduct.nutrition.protein}g</strong></span>
                    <span>•</span>
                    <span>Carbs: <strong className="text-[#1E7547] font-bold">{heroProduct.nutrition.totalCarbs}g</strong></span>
                    <span>•</span>
                    <span>Đường: <strong className="text-zinc-900 font-bold">{heroProduct.nutrition.totalSugars}g</strong></span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#1E7547] font-mono">
                          {heroProduct.price.toLocaleString('vi-VN')}₫
                        </span>
                        {heroProduct.originalPrice && (
                          <span className="text-xs text-zinc-400 line-through">
                            {heroProduct.originalPrice.toLocaleString('vi-VN')}₫
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        Đóng gói túi 100g & 250g
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(heroProduct, 1)}
                      className="bg-[#1E7547] hover:bg-[#165a36] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Thêm Giỏ Hàng</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Floating AI Callout Pill */}
              <div 
                onClick={() => setIsAIChatOpen(true)}
                className="absolute -bottom-5 -left-4 sm:-left-6 bg-white p-3 rounded-2xl shadow-lg border border-zinc-200/90 flex items-center gap-3 cursor-pointer hover:border-[#1E7547] transition-all hover:scale-102"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FEF4E5] border border-[#FCD34D] flex items-center justify-center text-lg shrink-0">
                  🍪
                </div>
                <div className="pr-2">
                  <p className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider">Trợ Lý Tư Vấn SOWELL</p>
                  <p className="text-xs font-bold text-zinc-800">"Hỏi về thành phần, calo & dị ứng" →</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
