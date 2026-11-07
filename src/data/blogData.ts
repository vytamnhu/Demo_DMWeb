export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Cách tính Calo bữa phụ chuẩn Khoa học: Đừng để ăn vặt phá hỏng công sức tập luyện!',
    slug: 'cach-tinh-calo-bua-phu-chuan-khoa-hoc',
    excerpt: 'Nhiều người tập luyện chăm chỉ nhưng mãi không giảm được mỡ chỉ vì chọn sai bữa phụ 15:00 chiều. Đọc ngay nguyên tắc chọn thanh ngũ cốc thông minh.',
    category: 'Kiến Thức Dinh Dưỡng',
    readTime: '4 phút đọc',
    publishDate: '15/10/2026',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'BS. Lê Minh Trí',
      role: 'Chuyên gia Dinh dưỡng Thể thao',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `Bữa phụ lành mạnh không đơn thuần là chống đói, mà là chìa khóa duy trì tốc độ trao đổi chất ổn định suốt cả ngày...`
  },
  {
    id: 'post-2',
    title: '5 Lý do Hạt Dinh Dưỡng nướng mộc vượt trội hơn hạt rang muối chiên dầu công nghiệp',
    slug: '5-ly-do-hat-dinh-duong-nuong-moc-vuot-troi',
    excerpt: 'Tại SOWELL, chúng tôi nướng chậm ở nhiệt độ thấp 120°C để bảo toàn các liên kết axit béo Omega-3 và vitamin E nhạy cảm với nhiệt.',
    category: 'Chuyện Nông Sản SOWELL',
    readTime: '5 phút đọc',
    publishDate: '02/10/2026',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Nguyễn Thu Hà',
      role: 'R&D Trưởng SOWELL Food',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    content: `Quá trình chiên dầu ở nhiệt độ cao trên 180°C làm biến tính chất béo có lợi thành chất béo chuyển hóa (trans fat)...`
  },
  {
    id: 'post-3',
    title: 'Thực đơn Eat Clean cho dân văn phòng bận rộn: 7 Ngày nhẹ bụng, tràn năng lượng',
    slug: 'thuc-don-eat-clean-van-phong-7-ngay',
    excerpt: 'Chỉ mất chưa đầy 3 phút mỗi sáng với thanh ngũ cốc và hộp sữa chua chua không đường, bạn đã có bữa ăn đủ vi chất khởi đầu ngày mới.',
    category: 'Gợi Ý Thực Đơn',
    readTime: '6 phút đọc',
    publishDate: '24/09/2026',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Trần Hoàng Yến',
      role: 'Huấn luyện viên Sức khỏe',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    content: `Áp lực công việc văn phòng và việc ngồi 8 tiếng một ngày khiến cơ thể dễ tích mỡ bụng dưới...`
  }
];

