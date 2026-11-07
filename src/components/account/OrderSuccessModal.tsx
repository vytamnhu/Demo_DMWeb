import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Package, Truck, ArrowRight, Printer } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { 
    isOrderSuccessOpen, 
    setIsOrderSuccessOpen, 
    lastOrder, 
    setIsUserAccountOpen, 
    setActiveAccountTab 
  } = useStore();

  if (!isOrderSuccessOpen || !lastOrder) return null;

  const handleTrackOrder = () => {
    setIsOrderSuccessOpen(false);
    setActiveAccountTab('tracking');
    setIsUserAccountOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#E8E2D5] text-center space-y-5 my-auto animate-scaleUp">
        
        <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#1E7547] flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E7547] bg-[#EBF7EE] px-3 py-1 rounded-full">
            Đặt Hàng Thành Công
          </span>
          <h3 className="font-bold text-xl sm:text-2xl text-zinc-900 mt-2">
            Cảm Ơn Bạn Đã Chọn SOWELL!
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Đơn hàng <strong>#{lastOrder.orderNumber}</strong> của bạn đã được chuyển đến xưởng nướng mộc mẻ mới.
          </p>
        </div>

        {/* Invoice Summary Box */}
        <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E8E2D5] text-left text-xs space-y-2">
          <div className="flex justify-between pb-2 border-b border-zinc-200">
            <span className="text-zinc-500">Mã vận đơn:</span>
            <strong className="font-mono text-[#1E7547]">{lastOrder.trackingCode}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Người nhận:</span>
            <strong>{lastOrder.shippingAddress.fullName} ({lastOrder.shippingAddress.phone})</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Địa chỉ:</span>
            <span className="text-right truncate max-w-xs">{lastOrder.shippingAddress.address}, {lastOrder.shippingAddress.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Phương thức:</span>
            <strong className="uppercase">{lastOrder.paymentMethod}</strong>
          </div>
          <div className="flex justify-between pt-2 border-t border-zinc-200 text-sm font-black text-[#1C2D20]">
            <span>Tổng thanh toán:</span>
            <span className="text-[#1E7547]">{lastOrder.total.toLocaleString('vi-VN')}₫</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleTrackOrder}
            className="w-full bg-[#1E7547] hover:bg-[#165a36] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Theo Dõi Vận Đơn Trực Tiếp</span>
          </button>

          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 py-3 rounded-xl font-bold text-xs transition-colors"
          >
            Tiếp Tục Khám Phá Sản Phẩm
          </button>
        </div>

      </div>
    </div>
  );
};

