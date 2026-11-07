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
  ShieldCheck,
  Sparkles
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#E8E2D5] animate-slideLeft">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF7EE] text-[#1E7547] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-900">
                Giỏ Hàng Dinh Dưỡng
              </h3>
              <p className="text-[11px] text-zinc-500">
                {cart.reduce((s, i) => s + i.quantity, 0)} sản phẩm nướng mộc
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-zinc-200 text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-3.5 bg-[#EBF7EE] border-b border-[#CDEED5] text-xs text-[#1E7547]">
          <div className="flex items-center justify-between font-bold mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              {freeShippingRemaining > 0 ? (
                <span>Mua thêm <strong className="text-[#D97706] font-mono">{freeShippingRemaining.toLocaleString('vi-VN')}₫</strong> để được FREESHIP!</span>
              ) : (
                <span>🎉 Chúc mừng! Bạn được Miễn Phí Vận Chuyển toàn quốc!</span>
              )}
            </span>
            <span className="font-mono font-black">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-[#CDEED5] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#1E7547] h-full transition-all duration-300 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="p-5 flex-1 overflow-y-auto divide-y divide-zinc-100">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center text-3xl mx-auto border border-zinc-200">
                🛒
              </div>
              <h4 className="font-bold text-zinc-900">Giỏ hàng của bạn đang trống</h4>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Hãy chọn các thanh bánh ngũ cốc giàu dinh dưỡng để bắt đầu lối sống lành mạnh nhé!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsComboBuilderOpen(true);
                }}
                className="bg-[#1E7547] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md hover:bg-[#165a36] transition-colors cursor-pointer"
              >
                Tự Phối Combo Hộp Bánh (-18%)
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-zinc-200"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-xs sm:text-sm text-zinc-900 truncate">{item.name}</h5>
                  {item.variantDescription && (
                    <p className="text-[11px] text-zinc-500 truncate">{item.variantDescription}</p>
                  )}
                  {item.isCustomCombo && (
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded mt-0.5 inline-block uppercase">
                      Hộp Custom
                    </span>
                  )}
                  <div className="text-xs font-black text-[#1E7547] font-mono mt-1">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-[#FAF8F5]">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-1 hover:bg-zinc-200 text-xs font-bold text-zinc-700 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2.5 py-1 text-xs font-bold font-mono">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-1 hover:bg-zinc-200 text-xs font-bold text-zinc-700 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
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
          <div className="p-5 border-t border-zinc-200 bg-[#FAF8F5] space-y-4">
            
            {/* Quick Coupon Chips */}
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Mã giảm giá có sẵn:</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {[
                  { code: 'SOWELLHEALTH', label: 'SOWELLHEALTH (-15%)' },
                  { code: 'FREESHIP', label: 'FREESHIP (-25K)' },
                  { code: 'COMBOVEGAN', label: 'COMBOVEGAN (-30K)' }
                ].map((c) => (
                  <button
                    key={c.code}
                    onClick={() => handleApplyCoupon(c.code)}
                    className="text-[10px] font-mono bg-white hover:bg-emerald-50 text-[#1E7547] border border-[#BCE8C6] px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer"
                  >
                    + {c.label}
                  </button>
                ))}
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs">
                  <span className="font-bold text-[#1E7547] flex items-center gap-1.5 font-mono">
                    <Tag className="w-3.5 h-3.5" />
                    {appliedCoupon}
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-600 font-bold hover:underline cursor-pointer"
                  >
                    Gỡ bỏ
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập mã ưu đãi..."
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-white text-xs px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#1E7547] uppercase font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    className="bg-[#1E7547] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#165a36] transition-colors cursor-pointer"
                  >
                    Áp dụng
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-600 border-t border-zinc-200 pt-3">
              <div className="flex justify-between">
                <span>Tạm tính hàng:</span>
                <span className="font-semibold text-zinc-800 font-mono">{cartSubtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>Giảm giá khuyến mãi:</span>
                  <span className="font-mono">-{discountAmount.toLocaleString('vi-VN')}₫</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Phí giao hàng:</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-[#1E7547]">MIỄN PHÍ</strong>
                  ) : (
                    <span className="font-mono">{shippingFee.toLocaleString('vi-VN')}₫</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-black text-[#1C2D20] pt-2 border-t border-zinc-200">
                <span>Tổng thanh toán:</span>
                <span className="text-[#1E7547] text-xl font-mono">{finalTotal.toLocaleString('vi-VN')}₫</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#1E7547] hover:bg-[#165a36] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#1E7547]/20 transition-all cursor-pointer"
            >
              <span>Tiến Hành Đặt Hàng ({finalTotal.toLocaleString('vi-VN')}₫)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E7547]" />
              <span>Bảo mật mã hóa SSL 256-bit • Đổi trả miễn phí 7 ngày</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
