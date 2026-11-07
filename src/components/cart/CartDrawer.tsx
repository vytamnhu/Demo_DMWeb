import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  Tag, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    freeShippingRemaining, 
    freeShippingThreshold, 
    shippingFee, 
    discountAmount, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    finalTotal, 
    setIsCheckoutOpen,
    setIsComboBuilderOpen 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code.trim()) return;
    applyCoupon(code);
    setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-stone-200/80 animate-slideLeft">
        
        {/* Clean Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#163824] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#163824]">
                Giỏ Hàng Của Bạn
              </h3>
              <p className="text-[11px] text-stone-500">
                {cart.reduce((s, i) => s + i.quantity, 0)} sản phẩm đã chọn
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-stone-200/70 text-xs text-stone-700">
          <div className="flex items-center justify-between font-medium mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#1E7547]" />
              {freeShippingRemaining > 0 ? (
                <span>Mua thêm <strong className="text-[#163824]">{freeShippingRemaining.toLocaleString('vi-VN')}₫</strong> để được Freeship</span>
              ) : (
                <span className="text-[#1E7547] font-semibold">Đơn hàng đủ điều kiện Miễn phí vận chuyển</span>
              )}
            </span>
            <span className="text-[11px] font-bold text-[#1E7547]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#1E7547] h-full transition-all duration-300 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="px-6 py-4 flex-1 overflow-y-auto divide-y divide-stone-100">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] flex items-center justify-center mx-auto border border-stone-200/80 text-stone-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#163824]">Giỏ hàng đang trống</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
                  Khám phá các dòng bánh hạt hoặc tự phối hộp Combo Mix Vị theo sở thích của bạn.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsComboBuilderOpen(true);
                }}
                className="bg-[#163824] text-white px-5 py-2.5 rounded-full font-semibold text-xs hover:bg-[#1E7547] transition-colors cursor-pointer"
              >
                Phối Combo Mix Vị (-25%)
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-3.5 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-bold text-xs sm:text-sm text-[#163824] truncate">{item.name}</h5>
                  </div>
                  {item.variantDescription && (
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{item.variantDescription}</p>
                  )}
                  <div className="text-xs font-bold text-[#1E7547] mt-1">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center border border-stone-200 rounded-full p-0.5 bg-[#FAF8F5]">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full hover:bg-white text-xs font-bold text-stone-600 flex items-center justify-center cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-[#163824]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full hover:bg-white text-xs font-bold text-stone-600 flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                    title="Xóa món này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Voucher Input & Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-stone-200/80 bg-[#FAF8F5] space-y-4">
            
            {/* Quick Coupon Chips */}
            <div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {[
                  { code: 'SOWELLHEALTH', label: 'SOWELLHEALTH (-15%)' },
                  { code: 'FREESHIP', label: 'FREESHIP (-25K)' },
                  { code: 'COMBOVEGAN', label: 'COMBOVEGAN (-30K)' }
                ].map((c) => (
                  <button
                    key={c.code}
                    onClick={() => handleApplyCoupon(c.code)}
                    className="text-[10px] bg-white hover:bg-[#EEF6F0] text-[#163824] border border-stone-200/90 px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer"
                  >
                    + {c.label}
                  </button>
                ))}
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#EEF6F0] border border-[#1E7547]/30 px-3 py-2 rounded-xl text-xs">
                  <span className="font-bold text-[#163824] flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#1E7547]" />
                    Đã áp dụng: {appliedCoupon}
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-rose-600 font-semibold cursor-pointer"
                  >
                    Bỏ mã
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập mã ưu đãi..."
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-white text-xs px-3.5 py-2 rounded-full border border-stone-200/90 focus:outline-none focus:border-[#1E7547] uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    className="bg-stone-200 hover:bg-stone-300 text-[#163824] px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Áp dụng
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/70 pt-3">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span className="font-semibold text-stone-800">{cartSubtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#1E7547] font-semibold">
                  <span>Giảm giá:</span>
                  <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Phí giao hàng:</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-[#1E7547]">Miễn phí</strong>
                  ) : (
                    <span>{shippingFee.toLocaleString('vi-VN')}₫</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-baseline text-sm font-bold text-[#163824] pt-2 border-t border-stone-200/70">
                <span>Tổng cộng:</span>
                <span className="text-xl font-extrabold">{finalTotal.toLocaleString('vi-VN')}₫</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#163824] hover:bg-[#1E7547] text-white py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Tiến hành thanh toán</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E7547]" />
              <span>Đổi trả miễn phí trong 7 ngày</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
