import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Box, ArrowRight, ShoppingBag, Star } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCatalog }) => {
  const { setIsComboBuilderOpen, addToCart, setSelectedProduct, products } = useStore();
  const heroProduct = products.find(p => p.id === 'sowell-biscotti-3-flavors') || products[0];

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] py-12 lg:py-20 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clean Editorial Typography */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Minimal Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-[#EEF6F0] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1E7547]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E7547]" />
              <span>Bánh Hạt Dinh Dưỡng Nướng Mộc SOWELL</span>
            </div>

            {/* Clean Two-Tone Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#163824] tracking-tight leading-[1.15]">
              Giòn rụm tự nhiên, <br />
              <span className="text-[#1E7547]">minh bạch từng calo.</span>
            </h1>

            {/* Calm, Readable Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Từ Biscotti nguyên cám nướng hai lần, Bánh ngói hạnh nhân lát mỏng đến Thanh hạt ngũ cốc mật hoa dừa. Công bố rõ ràng bảng dinh dưỡng và thành phần dị ứng trên từng khẩu phần.
            </p>

            {/* Streamlined Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={onExploreCatalog}
                className="bg-[#163824] hover:bg-[#1E7547] text-white px-6 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer group"
              >
                <span>Khám phá sản phẩm</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setIsComboBuilderOpen(true)}
                className="bg-white hover:bg-stone-50 text-[#163824] border border-stone-300/90 px-5 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Box className="w-4 h-4 text-[#1E7547]" />
                <span>Combo Mix Vị Tự Chọn</span>
                <span className="text-xs font-bold text-[#1E7547] bg-[#EEF6F0] px-2 py-0.5 rounded-full">
                  -25%
                </span>
              </button>
            </div>

            {/* Borderless Minimal Metrics Strip */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#163824]">85%</p>
                <p className="text-xs text-stone-500 mt-0.5">Hạt nguyên bản tuyển chọn</p>
              </div>
              <div className="border-l border-stone-200/80 pl-6">
                <p className="text-xl sm:text-2xl font-extrabold text-[#163824]">Low GI</p>
                <p className="text-xs text-stone-500 mt-0.5">Ngọt dịu mật hoa dừa</p>
              </div>
              <div className="border-l border-stone-200/80 pl-6">
                <p className="text-xl sm:text-2xl font-extrabold text-[#163824]">100%</p>
                <p className="text-xs text-stone-500 mt-0.5">Minh bạch nhãn dinh dưỡng</p>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Featured Product Card */}
          <div className="lg:col-span-5">
            <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-[0_12px_40px_-12px_rgba(22,56,36,0.08)] border border-stone-200/70">
              
              {/* Product Image */}
              <div 
                onClick={() => setSelectedProduct(heroProduct)}
                className="relative rounded-2xl overflow-hidden aspect-4/3 group bg-stone-100 cursor-pointer"
              >
                <img 
                  src={heroProduct.images[0]} 
                  alt={heroProduct.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 backdrop-blur-md text-[#163824] text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
                    {heroProduct.nutrition.calories} kcal / 50g
                  </span>
                </div>
              </div>

              {/* Clean Product Summary */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Original • Choco • Matcha</span>
                  <span className="flex items-center gap-1 text-stone-700 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {heroProduct.rating} ({heroProduct.reviewCount})
                  </span>
                </div>

                <h3 
                  onClick={() => setSelectedProduct(heroProduct)}
                  className="font-bold text-[#163824] text-lg leading-snug hover:text-[#1E7547] transition-colors cursor-pointer"
                >
                  {heroProduct.name}
                </h3>

                {/* Subtle Macro Pills */}
                <div className="flex items-center gap-2 text-xs text-stone-600 pt-0.5">
                  <span className="bg-stone-100 px-2.5 py-1 rounded-lg">Đạm {heroProduct.nutrition.protein}g</span>
                  <span className="bg-stone-100 px-2.5 py-1 rounded-lg">Xơ {heroProduct.nutrition.dietaryFiber}g</span>
                  <span className="bg-stone-100 px-2.5 py-1 rounded-lg">Carbs {heroProduct.nutrition.totalCarbs}g</span>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#163824]">
                      {heroProduct.price.toLocaleString('vi-VN')}₫
                    </span>
                    {heroProduct.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        {heroProduct.originalPrice.toLocaleString('vi-VN')}₫
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(heroProduct, 1)}
                    className="bg-[#163824] hover:bg-[#1E7547] text-white px-4 py-2.5 rounded-full font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Thêm vào giỏ</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
