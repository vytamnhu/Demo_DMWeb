import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';
import { Box, ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedSectionProps {
  onViewAllCatalog: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ onViewAllCatalog }) => {
  const { products, setIsComboBuilderOpen } = useStore();

  // Top 4 curated best-sellers for clean presentation without visual clutter
  const featuredProducts = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#EAE5DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Clean Typography & Hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E7547] bg-[#EBF7EE] px-3 py-1 rounded-full border border-[#BCE8C6]">
              Bộ Sưu Tập Nổi Bật
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153E26] mt-2">
              Bộ 4 Vị Bánh Bán Chạy Nhất SOWELL
            </h2>
            <p className="text-zinc-600 text-sm mt-1 max-w-xl">
              Nướng mộc tươi mới mỗi ngày. Giòn rụm từ 100% hạt tự nhiên tuyển chọn, 0% đường tinh luyện.
            </p>
          </div>

          <button
            onClick={onViewAllCatalog}
            className="self-start md:self-auto text-xs font-bold text-[#1E7547] hover:text-[#165a36] bg-[#EBF7EE] hover:bg-[#dcf4e2] px-4 py-2.5 rounded-xl border border-[#BCE8C6] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <span>Xem toàn bộ 8 sản phẩm & bộ lọc calo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Clean Curated Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Elegant Callout for Custom Combo Builder (Feature #2) */}
        <div className="mt-14 bg-gradient-to-r from-[#173E26] via-[#1E7547] to-[#17462B] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-md">
          {/* Subtle Decorative Backdrop */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-[#E59828] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>TÍNH NĂNG TỰ PHỐI COMBO THEO YÊU CẦU</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Tự Thiết Kế Hộp Bánh Dinh Dưỡng Cho Riêng Bạn
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm max-w-xl leading-relaxed">
                Tự do mix các vị bánh bạn yêu thích (Hộp 6, 12 hoặc 24 thanh). 
                Hệ thống tự động sàng lọc dị ứng và giảm ngay tới <strong>18% - 25%</strong> kèm thiệp viết tay theo yêu cầu!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => setIsComboBuilderOpen(true)}
                className="bg-[#E59828] hover:bg-[#d08316] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Box className="w-4 h-4" />
                <span>Bắt Đầu Phối Hộp (-18%)</span>
              </button>
              <button
                onClick={onViewAllCatalog}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Xem danh mục lọc calo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
