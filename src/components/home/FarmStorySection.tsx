import React from 'react';
import { Sprout } from 'lucide-react';

export const FarmStorySection: React.FC = () => {
  return (
    <section id="story-section" className="py-16 sm:py-20 bg-[#F6F3EB] border-b border-[#E5DFD3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
                  alt="Nông trại yến mạch"
                  className="rounded-2xl shadow-sm object-cover h-44 sm:h-56 w-full"
                />
                <div className="bg-[#1E7547] text-white p-4 rounded-2xl shadow-sm">
                  <span className="text-2xl font-bold font-mono">100%</span>
                  <p className="text-xs text-emerald-100 font-medium mt-0.5">Yến mạch nguyên cám nhập khẩu chính ngạch từ Úc</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="bg-[#E59828] text-white p-4 rounded-2xl shadow-sm">
                  <span className="text-2xl font-bold font-mono">120°C</span>
                  <p className="text-xs text-amber-100 font-medium mt-0.5">Công nghệ nướng sấy chậm bảo toàn vi chất</p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
                  alt="Hạt dinh dưỡng nướng mộc"
                  className="rounded-2xl shadow-sm object-cover h-44 sm:h-56 w-full"
                />
              </div>
            </div>

            {/* Clean badge */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3.5 py-2 rounded-full border border-[#1E7547] shadow-lg flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#1E7547]" />
              <span className="text-xs font-bold text-zinc-900">
                Từ Nông Trại Đến Bàn Ăn
              </span>
            </div>
          </div>

          {/* Right: The Brand Narrative */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#FEF4E5] px-3 py-1 rounded-full border border-[#FCD34D]">
              Hành Trình Hạt Xanh
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153E26] leading-tight">
              Khởi Đầu Từ Mong Muốn: <br />
              <span className="text-[#1E7547]">"Bánh healthy phải thực sự ngon miệng"</span>
            </h2>

            <p className="text-zinc-600 text-sm leading-relaxed">
              Thị trường đầy ắp các loại thanh năng lượng nhập khẩu khô khốc hoặc những gói bánh ngũ cốc chứa tới 40% đường tinh luyện ẩn giấu.
            </p>

            <p className="text-zinc-600 text-sm leading-relaxed">
              <strong className="text-zinc-900 font-semibold">SOWELL</strong> ra đời để mang lại trải nghiệm dinh dưỡng hoàn toàn khác: 
              chúng tôi kết hợp hạt Macca Đắk Lắk béo bùi, hạt điều Bình Phước tuyển chọn với yến mạch Úc nguyên cám 
              và vị ngọt mát lành từ <strong>mật hoa dừa nước tự nhiên</strong>. 
              Không đường hóa học, không phẩm màu, không chất bảo quản.
            </p>

            {/* 3 Step Timeline */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EBF7EE] text-[#1E7547] flex items-center justify-center shrink-0 font-bold text-xs">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-zinc-900">Tuyển chọn hạt mộc loại 1</h4>
                  <p className="text-xs text-zinc-500">Chỉ 15% mẻ hạt đạt kích thước tiêu chuẩn, kiểm định aflatoxin.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#FEF4E5] text-[#D97706] flex items-center justify-center shrink-0 font-bold text-xs">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-zinc-900">Phối trộn mật dừa Low GI</h4>
                  <p className="text-xs text-zinc-500">Vị ngọt thanh dịu từ mật hoa dừa tự nhiên, giàu khoáng chất Kali.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EBF7EE] text-[#1E7547] flex items-center justify-center shrink-0 font-bold text-xs">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-zinc-900">Nướng nhiệt chậm & Đóng màng nhôm</h4>
                  <p className="text-xs text-zinc-500">Giữ giòn tự nhiên 6 tháng mà không cần chất bảo quản nhân tạo.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
