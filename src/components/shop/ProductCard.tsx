import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Plus, Eye, Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, isInWishlist, toggleWishlist } = useStore();
  const isWished = isInWishlist(product.id);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden hover:border-[#1E7547] hover:shadow-lg transition-all duration-250 flex flex-col group relative">
      
      {/* Product Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#FAF8F5]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.isBestseller && (
            <span className="bg-[#1E7547] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-xs uppercase">
              Bán chạy
            </span>
          )}
          <span className="bg-white/95 backdrop-blur-md text-zinc-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs border border-zinc-200 flex items-center gap-1">
            <Flame className="w-3 h-3 text-[#D97706]" />
            <span>{product.nutrition.calories} kcal</span>
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 cursor-pointer shadow-xs ${
            isWished 
              ? 'bg-rose-50 text-rose-500 scale-105 border border-rose-200' 
              : 'bg-white/80 text-zinc-400 hover:text-rose-500 hover:bg-white'
          }`}
          title={isWished ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWished ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedProduct(product)}
            className="bg-white hover:bg-zinc-50 text-zinc-900 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md transition-transform cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#1E7547]" />
            <span>Nutrition Facts</span>
          </button>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-1.5">
            {product.dietaryTags.slice(0, 2).map((tag, i) => (
              <span 
                key={i} 
                className="text-[10px] font-medium text-[#1E7547] bg-[#EBF7EE] px-1.5 py-0.2 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-zinc-900 text-sm leading-snug group-hover:text-[#1E7547] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
            {product.tagline}
          </p>

          {/* Clean Macro Row */}
          <div className="mt-2.5 py-1.5 px-2 bg-[#FAF8F5] rounded-lg border border-zinc-100 text-[11px] text-zinc-600 flex items-center justify-between">
            <span>Đạm: <strong className="text-zinc-900">{product.nutrition.protein}g</strong></span>
            <span>•</span>
            <span>Xơ: <strong className="text-[#1E7547]">{product.nutrition.dietaryFiber}g</strong></span>
            <span>•</span>
            <span>Đường: <strong className="text-zinc-900">{product.nutrition.totalSugars}g</strong></span>
          </div>
        </div>

        {/* Bottom Price & Add to Cart */}
        <div className="mt-3.5 pt-2.5 border-t border-zinc-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#1E7547] font-mono">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="text-[9px] font-bold text-rose-600">
                Tiết kiệm {discountPercent}%
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-[#1E7547] hover:bg-[#165a36] text-white p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0"
            title="Thêm vào giỏ hàng"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
