import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Banknote, 
  Building2, 
  Copy,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    finalTotal, 
    placeOrder, 
    user,
    showToast 
  } = useStore();

  // Form State
  const [fullName, setFullName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [email, setEmail] = useState(user.email || '');
  const [city, setCity] = useState('TP. Hồ Chí Minh');
  const [district, setDistrict] = useState('Quận Bình Thạnh');
  const [ward, setWard] = useState('Phường 22');
  const [address, setAddress] = useState('Tòa Landmark 81, 720A Điện Biên Phủ');
  const [notes, setNotes] = useState('');
  
  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'vnpay' | 'bank_transfer' | 'cod'>('momo');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast('Đã sao chép', `Đã chép ${label} vào bộ nhớ tạm`, 'info');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ nhận hàng.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      placeOrder({
        fullName,
        phone,
        email,
        address,
        city,
        district,
        ward,
        paymentMethod,
        notes
      });
    }, 1100);
  };

  const transferSyntax = `SOWELL ${phone.slice(-4) || 'DH89'}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-[#E8E2D5] flex flex-col my-auto animate-scaleUp">
        
        {/* Header */}
        <div className="bg-[#153E26] text-white p-5 sm:p-6 relative shadow-md">
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 text-2xl shrink-0">
              📦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg sm:text-xl">
                  Thanh Toán Đơn Hàng SOWELL
                </h3>
                <span className="bg-[#E59828] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  <span>Bảo Mật SSL</span>
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Mã hóa bảo mật thanh toán • Giao hàng tận tay toàn quốc
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-8 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Shipping Address & Payment Selection */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Thông Tin Nhận Hàng */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E2D5] shadow-xs space-y-4">
                <h4 className="font-bold text-sm text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
                  <Truck className="w-4 h-4 text-[#1E7547]" />
                  <span>1. Địa Chỉ Nhận Hàng</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Họ và tên người nhận *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="VD: Nguyễn Phương Anh"
                      className="w-full bg-[#FAF8F5] text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#1E7547]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="VD: 0988 123 456"
                      className="w-full bg-[#FAF8F5] text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#1E7547] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Email nhận hóa đơn điện tử</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="VD: phuonganh@gmail.com"
                    className="w-full bg-[#FAF8F5] text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#1E7547]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-700 mb-1">Tỉnh / Thành phố</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FAF8F5] text-xs px-2.5 py-2 rounded-xl border border-zinc-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-700 mb-1">Quận / Huyện</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-[#FAF8F5] text-xs px-2.5 py-2 rounded-xl border border-zinc-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-700 mb-1">Phường / Xã</label>
                    <input
                      type="text"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full bg-[#FAF8F5] text-xs px-2.5 py-2 rounded-xl border border-zinc-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Địa chỉ chi tiết (Số nhà, tên đường, tòa nhà) *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, ngõ/ngách, tên đường..."
                    className="w-full bg-[#FAF8F5] text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#1E7547]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Ghi chú giao hàng (nếu có)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Giao giờ hành chính, gọi trước khi đến..."
                    className="w-full bg-[#FAF8F5] text-xs px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#1E7547]"
                  />
                </div>
              </div>

              {/* 2. Phương Thức Thanh Toán Đa Kênh */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E2D5] shadow-xs space-y-4">
                <h4 className="font-bold text-sm text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
                  <CreditCard className="w-4 h-4 text-[#1E7547]" />
                  <span>2. Phương Thức Thanh Toán Đa Kênh</span>
                </h4>

                <div className="space-y-2.5">
                  {/* MoMo */}
                  <label 
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'momo' ? 'border-[#A50064] bg-pink-50/50 shadow-xs' : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'momo'}
                        onChange={() => setPaymentMethod('momo')}
                        className="accent-[#A50064]"
                      />
                      <div className="w-8 h-8 rounded-xl bg-[#A50064] text-white flex items-center justify-center font-black text-xs shrink-0">
                        M
                      </div>
                      <div>
                        <p className="font-bold text-xs text-zinc-900">Ví MoMo</p>
                        <p className="text-[11px] text-zinc-500">Quét mã QR qua ứng dụng MoMo siêu tốc</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-pink-100 text-[#A50064] font-black px-2 py-0.5 rounded-md uppercase">
                      Khuyên Dùng
                    </span>
                  </label>

                  {/* VNPay */}
                  <label 
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'vnpay' ? 'border-[#005BAA] bg-blue-50/50 shadow-xs' : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'vnpay'}
                        onChange={() => setPaymentMethod('vnpay')}
                        className="accent-[#005BAA]"
                      />
                      <div className="w-8 h-8 rounded-xl bg-[#005BAA] text-white flex items-center justify-center font-black text-xs shrink-0">
                        V
                      </div>
                      <div>
                        <p className="font-bold text-xs text-zinc-900">Cổng VNPay QR</p>
                        <p className="text-[11px] text-zinc-500">Hỗ trợ hơn 40 ngân hàng & ví điện tử tại Việt Nam</p>
                      </div>
                    </div>
                  </label>

                  {/* VietQR / Chuyển khoản ngân hàng */}
                  <label 
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'bank_transfer' ? 'border-[#1E7547] bg-[#EBF7EE] shadow-xs' : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="accent-[#1E7547]"
                      />
                      <div className="w-8 h-8 rounded-xl bg-[#1E7547] text-white flex items-center justify-center font-black text-xs shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-zinc-900">Chuyển khoản Ngân Hàng (VietQR)</p>
                        <p className="text-[11px] text-zinc-500">Mã QR tự động điền số tiền và nội dung chuyển khoản</p>
                      </div>
                    </div>
                  </label>

                  {/* COD */}
                  <label 
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-[#D97706] bg-amber-50/50 shadow-xs' : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#D97706]"
                      />
                      <div className="w-8 h-8 rounded-xl bg-[#D97706] text-white flex items-center justify-center font-black text-xs shrink-0">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-zinc-900">Thanh toán khi nhận hàng (COD)</p>
                        <p className="text-[11px] text-zinc-500">Kiểm tra bánh giòn ngon trước khi thanh toán cho shipper</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* VietQR Generator Preview */}
                {paymentMethod === 'bank_transfer' && (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center gap-4 text-xs animate-fadeIn">
                    <div className="bg-white p-2.5 rounded-xl shadow-xs border border-zinc-200 text-center shrink-0">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=SOWELL-VIETQR-${finalTotal}`}
                        alt="VietQR Demo"
                        className="w-24 h-24 mx-auto"
                      />
                      <span className="text-[9px] font-bold text-zinc-400 block mt-1">Quét mã VietQR</span>
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <p className="font-bold text-emerald-950">Thông tin chuyển khoản Ngân Hàng Vietcombank:</p>
                      
                      <div className="flex items-center justify-between bg-white px-2.5 py-1 rounded-lg border border-emerald-100">
                        <span className="text-zinc-600">STK: <strong className="font-mono text-zinc-900">1028 9988 8888</strong></span>
                        <button 
                          type="button" 
                          onClick={() => handleCopy('102899888888', 'Số tài khoản')}
                          className="text-[#1E7547] hover:underline flex items-center gap-1 font-bold text-[10px]"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Chép</span>
                        </button>
                      </div>

                      <p className="text-zinc-700">Chủ TK: <strong className="text-zinc-900">CONG TY TNHH SOWELL HEALTH FOOD</strong></p>

                      <div className="flex items-center justify-between bg-white px-2.5 py-1 rounded-lg border border-emerald-100">
                        <span className="text-zinc-600">Cú pháp: <strong className="font-mono text-[#1E7547]">{transferSyntax}</strong></span>
                        <button 
                          type="button" 
                          onClick={() => handleCopy(transferSyntax, 'Cú pháp')}
                          className="text-[#1E7547] hover:underline flex items-center gap-1 font-bold text-[10px]"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Chép</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary & Placement */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E2D5] shadow-xs space-y-4">
                <h4 className="font-bold text-sm text-zinc-900 pb-2 border-b border-zinc-100 flex items-center justify-between">
                  <span>Tóm Tắt Đơn Hàng</span>
                  <span className="text-xs font-semibold text-zinc-500 font-mono">{cart.length} món</span>
                </h4>

                <div className="max-h-60 overflow-y-auto divide-y divide-zinc-100 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center gap-3 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-zinc-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-zinc-900 truncate">{item.name}</p>
                        <p className="text-[11px] text-zinc-500 font-mono">SL: {item.quantity} x {item.price.toLocaleString('vi-VN')}₫</p>
                      </div>
                      <span className="font-bold text-[#1E7547] font-mono">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-zinc-100 space-y-2 text-xs text-zinc-600">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="font-semibold text-zinc-800 font-mono">{cartSubtotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-rose-600 font-bold">
                      <span>Giảm giá khuyến mãi:</span>
                      <span className="font-mono">-{discountAmount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{shippingFee === 0 ? <strong className="text-[#1E7547]">Miễn phí</strong> : <span className="font-mono">{shippingFee.toLocaleString('vi-VN')}₫</span>}</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-200 flex justify-between items-baseline text-sm font-black text-[#1C2D20]">
                    <span>Tổng cộng:</span>
                    <span className="text-2xl font-black text-[#1E7547] font-mono">
                      {finalTotal.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#1E7547] hover:bg-[#165a36] text-white py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#1E7547]/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang xử lý đơn hàng...</span>
                    </span>
                  ) : (
                    <span>Xác Nhận Đặt Hàng ({finalTotal.toLocaleString('vi-VN')}₫)</span>
                  )}
                </button>

                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl text-[11px] text-zinc-500 border border-zinc-200 space-y-1">
                  <p className="flex items-center gap-1 font-semibold text-[#1E7547]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Cam kết độc quyền từ SOWELL:</span>
                  </p>
                  <p>• Bánh nướng mộc mẻ mới hàng ngày, đóng màng nhôm giữ giòn.</p>
                  <p>• Đổi trả 1-1 miễn phí nếu bánh bị bể vỡ hoặc không giòn bùi.</p>
                </div>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
