import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { NutritionFactsTable } from '../ui/NutritionFactsTable';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  Star,
  Share2
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist,
    setIsCartOpen,
    showToast 
  } = useStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'nutrition' | 'ingredients' | 'reviews'>('nutrition');

  if (!selectedProduct) return null;

  const isWished = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Đã sao chép liên kết', 'Chia sẻ sản phẩm này cho bạn bè cùng sống khỏe nhé!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-stone-200/80 my-auto animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 relative">
              <img
                src={selectedProduct.images[activeImageIdx] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="bg-white/95 backdrop-blur-md text-[#163824] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs">
                  {selectedProduct.nutrition.calories} kcal / khẩu phần
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-2">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIdx === idx ? 'border-[#163824]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Usage Notes */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/60 space-y-2 text-xs text-stone-600">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#1E7547] shrink-0 mt-0.5" />
                <span><strong className="text-stone-800">Thời điểm dùng:</strong> {selectedProduct.bestTime}</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1E7547] shrink-0 mt-0.5" />
                <span><strong className="text-stone-800">Hương vị:</strong> {selectedProduct.flavorProfile}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              {/* Dietary Tags */}
              <p className="text-xs font-semibold text-[#1E7547] mb-1.5">
                {selectedProduct.dietaryTags.join(' • ')}
              </p>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#163824] leading-snug pr-8">
                {selectedProduct.name}
              </h2>

              {/* Rating & Sold count */}
              <div className="flex items-center gap-3 mt-2.5 pb-3 border-b border-stone-100 text-xs text-stone-500">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-stone-800 ml-1">{selectedProduct.rating}</span>
                </div>
                <span>•</span>
                <span>{selectedProduct.reviewCount} đánh giá</span>
                <span>•</span>
                <span>Đã bán {selectedProduct.soldCount}</span>
              </div>

              {/* Price */}
              <div className="my-4 flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#163824]">
                  {selectedProduct.price.toLocaleString('vi-VN')}₫
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {selectedProduct.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                )}
                <span className="text-xs text-stone-500">
                  ({selectedProduct.nutrition.servingSize})
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Tabs */}
              <div className="mt-5 border-t border-stone-100 pt-3">
                <div className="flex gap-4 border-b border-stone-200/80 pb-2">
                  {[
                    { id: 'nutrition', label: 'Bảng Nutrition Facts' },
                    { id: 'ingredients', label: 'Thành phần & Dị ứng' },
                    { id: 'reviews', label: `Đánh giá (${selectedProduct.reviewCount})` }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id as any)}
                      className={`text-xs font-bold pb-1.5 transition-colors border-b-2 -mb-2.5 cursor-pointer ${
                        activeTab === t.id
                          ? 'border-[#163824] text-[#163824]'
                          : 'border-transparent text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="mt-4 max-h-56 overflow-y-auto pr-1">
                  {activeTab === 'nutrition' && (
                    <NutritionFactsTable 
                      nutrition={selectedProduct.nutrition} 
                      productName={selectedProduct.name} 
                    />
                  )}

                  {activeTab === 'ingredients' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <h4 className="font-bold text-stone-800 mb-1.5">Nguyên liệu thành phần:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-stone-600">
                          {selectedProduct.ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80">
                        <h4 className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Lưu ý dị ứng:
                        </h4>
                        <p className="text-amber-800">
                          Sản phẩm có chứa: <strong>{selectedProduct.allergens.join(', ')}</strong>.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200/60">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-800">Nguyễn Lan Anh</span>
                          <span className="text-amber-400">★★★★★</span>
                        </div>
                        <p className="text-stone-600 mt-1">
                          "Bánh giòn bùi, vị ngọt dịu tự nhiên chứ không bị gắt. Dùng làm bữa phụ rất nhẹ bụng."
                        </p>
                      </div>

                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200/60">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-800">HLV Tuấn Hưng</span>
                          <span className="text-amber-400">★★★★★</span>
                        </div>
                        <p className="text-stone-600 mt-1">
                          "Bảng dinh dưỡng rõ ràng từng gam, rất tiện để kiểm soát lượng calo nạp vào hàng ngày."
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
              <div className="flex items-center justify-between gap-4">
                
                {/* Quantity selector */}
                <div className="flex items-center border border-stone-200 rounded-full p-1 bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full hover:bg-white font-bold text-stone-700 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-[#163824]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full hover:bg-white font-bold text-stone-700 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                      isWished ? 'bg-rose-50 text-rose-500 border-rose-200' : 'text-stone-500 border-stone-200 hover:bg-stone-50'
                    }`}
                    title="Yêu thích"
                  >
                    <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full border border-stone-200 text-stone-500 hover:bg-stone-50 transition-colors cursor-pointer"
                    title="Chia sẻ"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-[#EEF6F0] hover:bg-[#E0F0E4] text-[#163824] py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#1E7547]" />
                  <span>Thêm vào giỏ</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-[#163824] hover:bg-[#1E7547] text-white py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <span>Mua ngay • {(selectedProduct.price * quantity).toLocaleString('vi-VN')}₫</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
