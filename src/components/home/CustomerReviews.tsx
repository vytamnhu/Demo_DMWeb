import React from 'react';
import { REVIEWS } from '../../data/reviewsData';
import { CheckCircle2, ThumbsUp, Star } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#EAE5DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E7547] bg-[#EBF7EE] px-3 py-1 rounded-full border border-[#BCE8C6]">
            Đánh Giá Thực Tế
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153E26] mt-2">
            Hơn 10.000+ Khách Hàng Đã Tin Dùng SOWELL
          </h2>
          <p className="text-zinc-600 text-sm mt-1">
            Từ gymer, người theo đuổi lối sống Eat Clean, đến các mẹ bầu và nhân viên văn phòng.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8E2D5] flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* User info & Stars */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={rev.avatar}
                    alt={rev.userName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-[#1C2D20]">{rev.userName}</h4>
                      {rev.verifiedPurchase && (
                        <span title="Đã mua hàng">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7547]" />
                        </span>
                      )}
                    </div>
                    {rev.userRole && (
                      <p className="text-[11px] text-zinc-500">{rev.userRole}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#F59E0B] text-xs mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current text-[#F59E0B]' : 'text-zinc-300'}`}
                    />
                  ))}
                  <span className="text-[11px] text-zinc-400 ml-1.5">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {rev.images && rev.images.length > 0 && (
                  <div className="mt-3 flex gap-2">
                    {rev.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Đánh giá thực tế"
                        className="w-14 h-14 rounded-lg object-cover border border-zinc-200"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500">
                <span className="text-[#1E7547] font-semibold">Đã xác thực đơn hàng ✓</span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <ThumbsUp className="w-3 h-3" />
                  {rev.helpfulCount}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
