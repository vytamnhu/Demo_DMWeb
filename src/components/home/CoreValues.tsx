import React from 'react';
import { Sprout, HeartPulse, Sparkles, Scale } from 'lucide-react';

export const CoreValues: React.FC = () => {
  const values = [
    {
      icon: <Sprout className="w-5 h-5 text-[#1E7547]" />,
      title: '85% Hạt Tuyển Chọn',
      desc: 'Yến mạch nguyên cám Úc, Macca Đắk Lắk và Hạnh nhân Mỹ loại 1. Không dùng hạt vụn độn bột.'
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-[#1E7547]" />,
      title: 'Ngọt Dịu Tự Nhiên',
      desc: 'Sử dụng mật hoa dừa tự nhiên và cỏ ngọt Stevia (Low GI = 35), không đường tinh luyện.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#1E7547]" />,
      title: 'Nướng Mộc Nhiệt Thấp',
      desc: 'Sấy nướng chậm ở 120°C giúp bảo toàn enzyme và chất béo tốt Omega-3, 0g Trans Fat.'
    },
    {
      icon: <Scale className="w-5 h-5 text-[#1E7547]" />,
      title: 'Minh Bạch Dinh Dưỡng',
      desc: 'Công bố rõ ràng bảng Nutrition Facts và cảnh báo dị ứng trên từng khẩu phần ăn.'
    }
  ];

  const comparison = [
    {
      feature: 'Chất tạo ngọt',
      sowell: 'Mật hoa dừa tự nhiên Low GI & Cỏ ngọt Stevia',
      market: '30% – 45% Đường tinh luyện & Siro fructose'
    },
    {
      feature: 'Phương pháp chế biến',
      sowell: 'Nướng mộc nhiệt chậm 120°C giữ trọn dưỡng chất',
      market: 'Chiên dầu nhiệt độ cao >180°C dễ sinh Trans fat'
    },
    {
      feature: 'Tỷ lệ hạt dinh dưỡng',
      sowell: '85% Hạt nguyên bản (Macca, Hạnh nhân, Óc chó)',
      market: 'Chủ yếu độn bột nở công nghiệp, tỷ lệ hạt thấp'
    },
    {
      feature: 'Minh bạch Calo & Dị ứng',
      sowell: 'Công bố rõ ràng từng gam Đạm, Xơ, Đường & Dị ứng',
      market: 'Thông tin chung chung, calo rỗng cao (>250 kcal)'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1E7547]">
            Giá trị cốt lõi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163824] mt-1">
            Tiêu Chuẩn Khác Biệt Của SOWELL
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            Thực phẩm lành mạnh phải vừa bổ dưỡng cho cơ thể, vừa ngon miệng để bạn tận hưởng mỗi ngày.
          </p>
        </div>

        {/* 4 Clean Value Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <div 
              key={idx}
              className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200/60"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EEF6F0] flex items-center justify-center mb-4">
                {v.icon}
              </div>

              <h3 className="text-base font-bold text-[#163824] mb-1.5">
                {v.title}
              </h3>

              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Clean, Compact Comparison Table */}
        <div className="max-w-4xl mx-auto bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-stone-200/60">
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#163824]">
              So Sánh Minh Bạch: Bánh SOWELL & Snack Thông Thường
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-stone-200/80 text-stone-400">
                  <th className="py-3 px-4 font-semibold uppercase text-[11px]">Tiêu chí</th>
                  <th className="py-3 px-4 font-bold text-[#163824] bg-[#EEF6F0] rounded-t-xl">
                    Bánh Dinh Dưỡng SOWELL
                  </th>
                  <th className="py-3 px-4 font-medium text-stone-500">
                    Snack Công Nghiệp Thường
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/60">
                {comparison.map((row, i) => (
                  <tr key={i}>
                    <td className="py-3.5 px-4 font-semibold text-[#163824] whitespace-nowrap">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#163824] bg-[#EEF6F0]/50">
                      <span className="text-[#1E7547] font-bold mr-1.5">✓</span>
                      {row.sowell}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">
                      <span className="text-stone-400 mr-1.5">–</span>
                      {row.market}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
