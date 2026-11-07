import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../../data/blogData';
import { BookOpen, Clock, Calendar, ArrowRight, X } from 'lucide-react';

export const NutritionBlog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog-section" className="py-16 sm:py-20 bg-white border-b border-[#EAE5DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E7547] bg-[#EBF7EE] px-3 py-1 rounded-full border border-[#BCE8C6]">
              Kho Tri Thức Eat Clean
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153E26] mt-2">
              Cẩm Nang Dinh Dưỡng & Vóc Dáng
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-1.5 max-w-xl">
              Bài viết chuyên sâu từ các chuyên gia dinh dưỡng thể thao và bác sĩ nội tiết.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2D5] overflow-hidden hover:border-[#1E7547] hover:shadow-xl transition-all cursor-pointer flex flex-col group"
            >
              <div className="aspect-16/9 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1E7547] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#1C2D20] text-base group-hover:text-[#1E7547] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-zinc-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E8E2D5] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#1C2D20]">{post.author.name}</p>
                      <p className="text-[10px] text-zinc-500">{post.author.role}</p>
                    </div>
                  </div>

                  <span className="text-[#1E7547] group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-[#1E7547] bg-[#EBF7EE] px-3 py-1 rounded-full">
              {selectedPost.category}
            </span>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-3">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-zinc-500 mt-3 pb-4 border-b border-zinc-200">
              <img
                src={selectedPost.author.avatar}
                alt={selectedPost.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <span className="font-bold text-zinc-800">{selectedPost.author.name}</span>
                <span className="mx-2">•</span>
                <span>{selectedPost.publishDate}</span>
                <span className="mx-2">•</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </div>

            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-64 object-cover rounded-2xl my-6"
            />

            <div className="prose prose-sm max-w-none text-zinc-700 space-y-4 text-sm leading-relaxed">
              <p className="font-medium text-base text-zinc-900 italic">
                "{selectedPost.excerpt}"
              </p>
              <p>
                Bữa phụ chiều (khoảng 15:00 - 16:00) là thời điểm lượng glycogen trong cơ thể bắt đầu sụt giảm, 
                dẫn đến hiện tượng uể oải, buồn ngủ và thèm đồ ngọt. Khi bạn nạp những món ăn vặt chứa đường tinh luyện 
                (như trà sữa, bánh ngọt công nghiệp), lượng đường huyết sẽ vọt lên rất nhanh, khiến tuyến tụy tiết ồ ạt Insulin để hạ đường. 
                Hậu quả là sau đó 30 phút bạn lại đói cồn cào và toàn bộ lượng calo dư thừa chuyển hóa thành mỡ nội tạng.
              </p>
              <h4 className="font-bold text-lg text-[#1C2D20]">Nguyên Tắc Chọn Bánh Ngũ Cốc Bữa Phụ:</h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Calo kiểm soát:</strong> Từ 130 - 180 kcal mỗi khẩu phần.</li>
                <li><strong>Đường bổ sung = 0g:</strong> Vị ngọt chỉ nên đến từ mật hoa dừa tự nhiên hoặc cỏ ngọt.</li>
                <li><strong>Chất xơ hòa tan {'>'} 4g:</strong> Giúp làm chậm quá trình hấp thu đường vào máu, tạo cảm giác no lâu.</li>
                <li><strong>Đạm thực vật {'>'} 6g:</strong> Giúp nuôi dưỡng cơ bắp và đốt mỡ thụ động.</li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-200 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-[#1E7547] text-white px-5 py-2.5 rounded-xl font-bold text-xs"
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

