import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { NutritionFactsTable } from '../ui/NutritionFactsTable';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Clock, 
  Flame, 
  ShieldCheck, 
  Check, 
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-[#E8E2D5] my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-zinc-100 text-zinc-600 transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8">
          
          {/* Left Column: Image Gallery & Badges */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-zinc-200 relative group">
              <img
                src={selectedProduct.images[activeImageIdx] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="bg-[#1E7547] text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs">
                  🔥 {selectedProduct.nutrition.calories} kcal
                </span>
                <span className="bg-[#E59828] text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs">
                  {selectedProduct.nutrition.totalSugars}g Đường / khẩu phần
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
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx ? 'border-[#1E7547] scale-105' : 'border-zinc-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick badges under image */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EFEAE0] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-700">
                <Clock className="w-4 h-4 text-[#1E7547] shrink-0" />
                <span><strong>Thời điểm dùng tối ưu:</strong> {selectedProduct.bestTime}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700">
                <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
                <span><strong>Hương vị:</strong> {selectedProduct.flavorProfile}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {selectedProduct.dietaryTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-bold text-[#1E7547] bg-[#EBF7EE] px-2.5 py-0.5 rounded-full border border-[#BCE8C6]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-tight">
                {selectedProduct.name}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-500 mt-1 italic">
                {selectedProduct.tagline}
              </p>

              {/* Rating & Sold count */}
              <div className="flex items-center gap-3 mt-3 pb-3 border-b border-zinc-100 text-xs">
                <div className="flex items-center text-[#F59E0B]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="font-bold text-zinc-800 ml-1.5">{selectedProduct.rating}</span>
                </div>
                <span className="text-zinc-300">|</span>
                <span className="text-zinc-500">{selectedProduct.reviewCount} đánh giá</span>
                <span className="text-zinc-300">|</span>
                <span className="text-zinc-500">Đã bán {selectedProduct.soldCount}</span>
              </div>

              {/* Price */}
              <div className="my-4 flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#1E7547]">
                  {selectedProduct.price.toLocaleString('vi-VN')}₫
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    {selectedProduct.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                )}
                <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                  / Khẩu phần {selectedProduct.nutrition.servingSize}
                </span>
              </div>

              {/* Story / Description snippet */}
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Tabs for Nutrition, Ingredients, Reviews */}
              <div className="mt-5 border-t border-zinc-100 pt-3">
                <div className="flex gap-2 border-b border-zinc-200 pb-2">
                  <button
                    onClick={() => setActiveTab('nutrition')}
                    className={`text-xs font-bold pb-1 transition-colors border-b-2 -mb-2.5 ${
                      activeTab === 'nutrition'
                        ? 'border-[#1E7547] text-[#1E7547]'
                        : 'border-transparent text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    Bảng Nutrition Facts
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`text-xs font-bold pb-1 transition-colors border-b-2 -mb-2.5 ${
                      activeTab === 'ingredients'
                        ? 'border-[#1E7547] text-[#1E7547]'
                        : 'border-transparent text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    Thành phần & Dị ứng
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`text-xs font-bold pb-1 transition-colors border-b-2 -mb-2.5 ${
                      activeTab === 'reviews'
                        ? 'border-[#1E7547] text-[#1E7547]'
                        : 'border-transparent text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    Đánh giá ({selectedProduct.reviewCount})
                  </button>
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
                        <h4 className="font-bold text-zinc-800 mb-1.5">🌱 Nguyên liệu thành phần:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
                          {selectedProduct.ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                        <h4 className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Cảnh báo dị ứng:
                        </h4>
                        <p className="text-amber-800">
                          Sản phẩm có chứa: <strong className="font-bold">{selectedProduct.allergens.join(', ')}</strong>.
                          Không sử dụng nếu quý khách có cơ địa mẫn cảm với các thành phần trên.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-zinc-200">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-800">Khách hàng Nguyễn Lan Anh</span>
                          <span className="text-[#F59E0B]">★★★★★</span>
                        </div>
                        <p className="text-zinc-600 mt-1 italic">
                          "Bánh ăn rất giòn và bùi, vị ngọt thanh tự nhiên từ mật dừa chứ không bị gắt. Ăn trước giờ tập yoga rất nhẹ bụng!"
                        </p>
                      </div>

                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-zinc-200">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-800">Huấn luyện viên Tuấn Hưng</span>
                          <span className="text-[#F59E0B]">★★★★★</span>
                        </div>
                        <p className="text-zinc-600 mt-1 italic">
                          "Bảng macro cực chuẩn cho dân gym. Tính toán calo minh bạch rõ ràng từng gam."
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Quantity + Add + Buy Now */}
            <div className="mt-6 pt-4 border-t border-zinc-100 space-y-3">
              <div className="flex items-center justify-between gap-4">
                
                {/* Quantity selector */}
                <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 hover:bg-zinc-200 font-bold text-zinc-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-black text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 hover:bg-zinc-200 font-bold text-zinc-700 transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isWished ? 'bg-rose-50 text-rose-500 border-rose-200' : 'text-zinc-500 border-zinc-200 hover:bg-zinc-50'
                    }`}
                    title="Yêu thích"
                  >
                    <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors"
                    title="Chia sẻ"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-[#EBF7EE] hover:bg-[#D8F3DF] text-[#1E7547] border border-[#BCE8C6] py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm Vào Giỏ</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-[#1E7547] hover:bg-[#165a36] text-white py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>Mua Ngay ({(selectedProduct.price * quantity).toLocaleString('vi-VN')}₫)</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

