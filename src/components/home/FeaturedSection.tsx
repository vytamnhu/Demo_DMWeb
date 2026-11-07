import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Box, ArrowRight, Check } from 'lucide-react';

interface FeaturedSectionProps {
  onViewAllCatalog: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = () => {
  const { setIsComboBuilderOpen } = useStore();

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#163824] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#1E7547]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-emerald-200 bg-white/10 px-3 py-1 rounded-full">
                COMBO Mix Vị Tự Chọn
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                Tự chọn vị bánh yêu thích trong cùng một hộp Combo
              </h2>

              <p className="text-emerald-100/80 text-sm leading-relaxed max-w-xl">
                Tự do phối các vị thanh hạt vào hộp 6, 12 hoặc 24 thanh theo khẩu vị riêng. Có sẵn bộ lọc dị ứng trực tiếp và tặng kèm thiệp viết tay miễn phí.
              </p>

              <div className="flex flex-wrap gap-4 pt-1 text-xs text-emerald-100">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-300" />
                  Mix tự do từng vị bánh
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-300" />
                  Lọc nhanh dị ứng & chế độ ăn
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-300" />
                  Miễn phí thiệp quà tặng
                </span>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => setIsComboBuilderOpen(true)}
                  className="bg-white hover:bg-stone-100 text-[#163824] px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Box className="w-4 h-4 text-[#1E7547]" />
                  <span>Chọn vị Combo ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: 3 Clean Box Tier Cards */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              {[
                { size: 6, label: 'Hộp Trải Nghiệm', discount: '-10%' },
                { size: 12, label: 'Hộp Tiết Kiệm', discount: '-18%', highlight: true },
                { size: 24, label: 'Hộp Gia Đình', discount: '-25%' },
              ].map((tier) => (
                <div
                  key={tier.size}
                  onClick={() => setIsComboBuilderOpen(true)}
                  className={`p-4 rounded-2xl border text-center cursor-pointer transition-all flex flex-col justify-between ${
                    tier.highlight
                      ? 'bg-white text-[#163824] border-white shadow-lg scale-102'
                      : 'bg-white/8 text-white border-white/15 hover:bg-white/15'
                  }`}
                >
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                    tier.highlight ? 'text-[#1E7547]' : 'text-emerald-200'
                  }`}>
                    {tier.label}
                  </span>
                  <div className="my-3">
                    <span className="text-2xl sm:text-3xl font-extrabold">{tier.size}</span>
                    <span className="text-xs block opacity-75">thanh bánh</span>
                  </div>
                  <span className={`text-xs font-bold py-1 px-2 rounded-full ${
                    tier.highlight
                      ? 'bg-[#EEF6F0] text-[#1E7547]'
                      : 'bg-white/15 text-white'
                  }`}>
                    Ưu đãi {tier.discount}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
