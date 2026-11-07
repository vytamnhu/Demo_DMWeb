import React from 'react';
import { REVIEWS } from '../../data/reviewsData';
import { CheckCircle2, Star } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1E7547]">
            Đánh giá thực tế
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163824] mt-1">
            Khách Hàng Nói Gì Về SOWELL?
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            Đồng hành cùng hơn 8.500+ khách hàng theo đuổi lối sống Eat Clean, tập luyện thể thao và chăm sóc sức khỏe gia đình.
          </p>
        </div>

        {/* Clean Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200/60 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-stone-300'}`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* User Footer */}
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.userName}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-xs text-[#163824] truncate">{rev.userName}</h4>
                    {rev.verifiedPurchase && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7547] shrink-0" />
                    )}
                  </div>
                  {rev.userRole && (
                    <p className="text-[11px] text-stone-400 truncate">{rev.userRole}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
