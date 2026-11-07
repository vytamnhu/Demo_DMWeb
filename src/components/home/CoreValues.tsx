import React from 'react';
import { Sprout, HeartPulse, Sparkles, Scale } from 'lucide-react';

export const CoreValues: React.FC = () => {
  const values = [
    {
      icon: <Sprout className="w-5 h-5 text-[#1E7547]" />,
      title: '100% Hạt Tuyển Chọn',
      desc: 'Yến mạch Úc nguyên cám, Macca Đắk Lắk, Hạnh nhân Mỹ tuyển chọn loại 1. Không dùng hạt vụn rẻ tiền.',
      metric: '85% Hạt Nguyên Bản'
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-[#D97706]" />,
      title: '0% Đường Tinh Luyện',
      desc: 'Vị ngọt thanh từ mật hoa dừa tự nhiên và cỏ ngọt Stevia. Chỉ số Low GI = 35 cực kỳ an toàn cho người tiểu đường.',
      metric: 'Low GI = 35'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#1E7547]" />,
      title: 'Nướng Mộc 120°C',
      desc: 'Công nghệ sấy nướng nhiệt thấp bảo toàn trọn vẹn enzyme vi sinh và liên kết Omega-3 quý giá, không chiên dầu.',
      metric: '0g Trans Fat'
    },
    {
      icon: <Scale className="w-5 h-5 text-[#D97706]" />,
      title: 'Calo Kiểm Soát Chuẩn',
      desc: 'Mỗi thanh bánh được cân đối từ 135 - 172 kcal, giàu đạm và xơ no lâu, hỗ trợ kiểm soát vóc dáng hoàn hảo.',
      metric: '135 - 172 kcal'
    }
  ];

  const comparison = [
    {
      feature: 'Đường & chất tạo ngọt',
      sowell: '0% Đường tinh luyện (Mật dừa nước Low GI & Cỏ ngọt Stevia)',
      market: 'Chứa 30% - 45% Đường tinh luyện & Siro bắp cao fructose'
    },
    {
      feature: 'Phương pháp chế biến',
      sowell: 'Nướng mộc nhiệt chậm 120°C giữ trọn vi chất và enzyme',
      market: 'Chiên dầu nhiệt độ cao >180°C sinh chất béo chuyển hóa (Trans fat)'
    },
    {
      feature: 'Tỷ lệ hạt dinh dưỡng',
      sowell: '85% Hạt thượng hạng nguyên bản (Macca, Hạnh nhân, Óc chó)',
      market: 'Chủ yếu độn yến mạch vụn và bột nở công nghiệp, hạt rất ít'
    },
    {
      feature: 'Chất bảo quản & Phụ gia',
      sowell: '100% Không phụ gia nhân tạo, đóng màng nhôm bảo quản tự nhiên',
      market: 'Sử dụng chất chống mốc, hương liệu tổng hợp và chất điều vị'
    },
    {
      feature: 'Minh bạch Dinh Dưỡng',
      sowell: 'In rõ bảng Nutrition Facts chuẩn FDA, calo khẩu phần từ 135 kcal',
      market: 'Calo rỗng cao (>250 kcal/thanh), dễ gây tích mỡ nội tạng'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#EAE5DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E7547] bg-[#EBF7EE] px-3 py-1 rounded-full border border-[#BCE8C6]">
            CAM KẾT CHẤT LƯỢNG
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153E26] mt-2">
            Vì Sao Bạn Nên Chọn Bánh Ngũ Cốc SOWELL?
          </h2>
          <p className="text-zinc-600 text-sm mt-1">
            Thực phẩm lành mạnh phải vừa bổ dưỡng cho cơ thể, vừa ngon miệng để bạn tận hưởng mỗi ngày.
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <div 
              key={idx}
              className="bg-[#FAF8F5] rounded-2xl p-5 border border-zinc-200/80 hover:border-[#1E7547] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shadow-xs">
                    {v.icon}
                  </div>
                  <span className="text-[11px] font-bold font-mono text-[#1E7547] bg-[#EBF7EE] px-2 py-0.5 rounded border border-[#CDEED5]">
                    {v.metric}
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-900 mb-1.5">
                  {v.title}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 font-medium">Tiêu chuẩn SOWELL</span>
                <span className="text-[#1E7547] font-bold">✓ Đạt chuẩn</span>
              </div>
            </div>
          ))}
        </div>

        {/* CLEAN COMPARISON TABLE */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider bg-[#FEF4E5] px-2.5 py-0.5 rounded-full border border-[#FCD34D]">
              So Sánh Minh Bạch
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1.5">
              Sự Khác Biệt Giữa Bánh SOWELL & Bánh Thị Trường
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="py-2.5 px-3 font-semibold text-zinc-500 uppercase text-[10px]">Tiêu chí</th>
                  <th className="py-2.5 px-3 font-bold text-[#1E7547] bg-[#EBF7EE] rounded-t-xl text-xs">
                    ✨ Bánh Ngũ Cốc SOWELL
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-zinc-500 text-xs">
                    Bánh Snack Công Nghiệp Thường
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {comparison.map((row, i) => (
                  <tr key={i} className="hover:bg-white/50 transition-colors">
                    <td className="py-3 px-3 font-bold text-zinc-900 text-xs whitespace-nowrap">
                      {row.feature}
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#1E7547] bg-[#EBF7EE]/40">
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#1E7547] font-bold">✓</span>
                        <span>{row.sowell}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-zinc-500">
                      <div className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">✕</span>
                        <span>{row.market}</span>
                      </div>
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
