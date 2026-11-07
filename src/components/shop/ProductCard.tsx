import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Plus, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, isInWishlist, toggleWishlist } = useStore();
  const isWished = isInWishlist(product.id);

  return (
    <div className="card-clean overflow-hidden flex flex-col group relative">
      
      {/* Product Image */}
      <div 
        onClick={() => setSelectedProduct(product)}
        className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top-Left Minimal Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="bg-white/95 backdrop-blur-md text-[#163824] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-2xs">
            {product.nutrition.calories} kcal
          </span>
          {product.isBestseller && (
            <span className="bg-[#163824]/90 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
              Bán chạy
            </span>
          )}
        </div>

        {/* Top-Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 cursor-pointer ${
            isWished 
              ? 'bg-rose-50 text-rose-500' 
              : 'bg-white/85 text-stone-400 hover:text-rose-500 hover:bg-white'
          }`}
          title={isWished ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWished ? 'fill-current' : ''}`} />
        </button>

        {/* Subtle Quick View Overlay */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 backdrop-blur-md text-[#163824] text-xs font-semibold px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-sm transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#1E7547]" />
            <span>Bảng dinh dưỡng</span>
          </span>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtle Dietary Text */}
          <p className="text-[11px] font-semibold text-[#1E7547] tracking-wide mb-1">
            {product.dietaryTags.slice(0, 2).join(' • ')}
          </p>

          {/* Product Name */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-[#163824] text-[15px] leading-snug group-hover:text-[#1E7547] transition-colors cursor-pointer line-clamp-2 min-h-[2.6rem]"
          >
            {product.name}
          </h3>

          {/* Clean Macro Strip */}
          <div className="mt-3 py-1.5 px-3 bg-[#FAF8F5] rounded-xl text-[11px] text-stone-500 flex items-center justify-between">
            <span>Đạm <strong className="text-stone-800 font-semibold">{product.nutrition.protein}g</strong></span>
            <span className="text-stone-300">•</span>
            <span>Xơ <strong className="text-stone-800 font-semibold">{product.nutrition.dietaryFiber}g</strong></span>
            <span className="text-stone-300">•</span>
            <span>Đường <strong className="text-stone-800 font-semibold">{product.nutrition.totalSugars}g</strong></span>
          </div>
        </div>

        {/* Bottom Price & Add Button */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[#163824]">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {product.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-[#EEF6F0] hover:bg-[#163824] text-[#163824] hover:text-white px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            title="Thêm vào giỏ hàng"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm</span>
          </button>
        </div>

      </div>

    </div>
  );
};
