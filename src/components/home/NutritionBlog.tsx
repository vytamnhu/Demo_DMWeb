import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../../data/blogData';
import { Clock, ArrowRight, X } from 'lucide-react';

export const NutritionBlog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog-section" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E7547]">
              Góc Dinh Dưỡng
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163824] mt-1">
              Cẩm Nang Calo & Lối Sống Lành Mạnh
            </h2>
          </div>
          <p className="text-stone-500 text-sm max-w-md">
            Kiến thức chọn bữa phụ thông minh, kiểm soát chỉ số đường huyết (GI) và cân bằng năng lượng mỗi ngày.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="card-clean overflow-hidden cursor-pointer flex flex-col group"
            >
              <div className="aspect-16/10 overflow-hidden relative bg-stone-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#163824] text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-2">
                    <span>{post.publishDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#163824] text-base group-hover:text-[#1E7547] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#1E7547]">
                  <span>Đọc bài viết</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-scaleUp">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold text-[#1E7547] bg-[#EEF6F0] px-3 py-1 rounded-full">
              {selectedPost.category}
            </span>

            <h2 className="text-xl sm:text-2xl font-bold text-[#163824] mt-3">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-stone-500 mt-3 pb-4 border-b border-stone-100">
              <img
                src={selectedPost.author.avatar}
                alt={selectedPost.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <span className="font-semibold text-stone-800">{selectedPost.author.name}</span>
                <span className="mx-2">•</span>
                <span>{selectedPost.publishDate}</span>
                <span className="mx-2">•</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </div>

            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-60 object-cover rounded-2xl my-5"
            />

            <div className="prose prose-sm max-w-none text-stone-600 space-y-4 text-sm leading-relaxed">
              <p className="font-medium text-stone-800 italic">
                "{selectedPost.excerpt}"
              </p>
              <p>
                Bữa phụ chiều (khoảng 15:00 - 16:00) là thời điểm lượng glycogen trong cơ thể bắt đầu sụt giảm, 
                dẫn đến hiện tượng uể oải, buồn ngủ và thèm đồ ngọt. Khi bạn nạp những món ăn vặt chứa đường tinh luyện, 
                lượng đường huyết sẽ tăng nhanh khiến cơ thể dễ tích tụ mỡ thừa và mau đói trở lại.
              </p>
              <h4 className="font-bold text-base text-[#163824]">Nguyên tắc chọn bánh ngũ cốc bữa phụ:</h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Calo kiểm soát:</strong> Từ 100 – 180 kcal mỗi khẩu phần.</li>
                <li><strong>Ít đường tinh luyện:</strong> Ưu tiên vị ngọt tự nhiên từ hạt, mật hoa dừa hoặc cỏ ngọt.</li>
                <li><strong>Giàu chất xơ & đạm thực vật:</strong> Giúp no lâu và duy trì sự tập trung bền bỉ.</li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-[#163824] text-white px-5 py-2.5 rounded-full font-semibold text-xs cursor-pointer"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
