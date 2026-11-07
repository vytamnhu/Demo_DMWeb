import React from 'react';

export const FarmStorySection: React.FC = () => {
  return (
    <section id="story-section" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Clean Visual Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
                  alt="Nông trại yến mạch"
                  className="rounded-2xl object-cover h-48 sm:h-60 w-full"
                />
                <div className="bg-white p-5 rounded-2xl border border-stone-200/70">
                  <span className="text-2xl font-extrabold text-[#163824]">100%</span>
                  <p className="text-xs text-stone-500 mt-1">Yến mạch nguyên cám nhập khẩu từ Úc & Hạt Macca Tây Nguyên</p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="bg-[#163824] text-white p-5 rounded-2xl">
                  <span className="text-2xl font-extrabold">120°C</span>
                  <p className="text-xs text-emerald-100/80 mt-1">Công nghệ nướng sấy chậm giúp giữ trọn vi chất tự nhiên</p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
                  alt="Hạt dinh dưỡng nướng mộc"
                  className="rounded-2xl object-cover h-48 sm:h-60 w-full"
                />
              </div>
            </div>
          </div>

          {/* Right: The Brand Narrative */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E7547]">
              Hành trình hạt xanh
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163824] leading-tight">
              Khởi đầu từ mong muốn: <br />
              <span className="text-[#1E7547]">Bánh lành mạnh phải thực sự ngon</span>
            </h2>

            <p className="text-stone-600 text-sm leading-relaxed">
              SOWELL ra đời để mang lại trải nghiệm dinh dưỡng cân bằng: kết hợp hạt Macca Đắk Lắk béo bùi, hạt điều Bình Phước tuyển chọn với yến mạch Úc nguyên cám và vị ngọt thanh dịu từ mật hoa dừa tự nhiên.
            </p>

            {/* Clean 3-Step Process */}
            <div className="space-y-4 pt-2">
              {[
                {
                  step: '01',
                  title: 'Tuyển chọn hạt mộc loại 1',
                  desc: 'Chỉ 15% mẻ hạt đạt kích thước tiêu chuẩn và vượt qua kiểm định chất lượng.'
                },
                {
                  step: '02',
                  title: 'Phối trộn mật hoa dừa Low GI',
                  desc: 'Vị ngọt thanh dịu tự nhiên, giàu khoáng chất và không làm tăng vọt đường huyết.'
                },
                {
                  step: '03',
                  title: 'Nướng nhiệt chậm & đóng gói chuẩn',
                  desc: 'Giữ độ giòn rụm tự nhiên mà không cần sử dụng chất bảo quản nhân tạo.'
                }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3.5">
                  <span className="text-xs font-bold text-[#1E7547] bg-[#EEF6F0] px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-[#163824]">{item.title}</h4>
                    <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
