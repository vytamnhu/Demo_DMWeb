import { Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Thanh Thảo',
    userRole: 'Tín đồ Eat Clean & Yoga (Hà Nội)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '3 ngày trước',
    comment: 'Bánh vị Socola Hạnh Nhân đỉnh chóp luôn mọi người ơi! Ngọt rất thanh mộc, hoàn toàn không bị gắt đường hoá học như các loại bánh siêu thị. Mình dùng tính năng Tự phối Hộp 12 thanh, vừa tiết kiệm 18% vừa chọn được đúng các vị mình thích không có đậu phộng. Đóng gói hộp giấy bảo vệ môi trường cực sang!',
    verifiedPurchase: true,
    helpfulCount: 42,
    images: [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: 'rev-2',
    userName: 'Minh Quân',
    userRole: 'Kỹ sư phần mềm & Hội viên Gym (TP.HCM)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 tuần trước',
    comment: 'Con bot AI tư vấn dinh dưỡng của SOWELL tính TDEE chuẩn thật sự. Nó tính ra mức thâm hụt calo của mình và khuyên dùng thanh Bơ Đậu Phộng trước khi đi tập. Ăn vào tập cực sung, không bị cồn cào bụng. Đã đặt định kỳ 2 hộp mỗi tháng rồi.',
    verifiedPurchase: true,
    helpfulCount: 38
  },
  {
    id: 'rev-3',
    userName: 'Bác sĩ Phương Mai',
    userRole: 'Khoa Nội tiết - Mẹ bầu 28 tuần',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2 tuần trước',
    comment: 'Là bác sĩ và đang mang thai bé thứ 2, mình rất khắt khe về bảng thành phần thực phẩm. SOWELL làm mình yên tâm vì công khai 100% Nutrition Facts chi tiết, hạt óc chó và yến mạch nướng nhiệt thấp bảo toàn vi chất. Vị chuối sấy dẻo ngọt tự nhiên cực dễ ăn.',
    verifiedPurchase: true,
    helpfulCount: 65,
    images: [
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: 'rev-4',
    userName: 'Đăng Khoa',
    userRole: 'Runner Marathon',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 tháng trước',
    comment: 'Chạy dài 21km cuối tuần lúc nào cũng phải nhét 2 thanh SOWELL Macca vào đai chạy. Bánh nhỏ gọn, xé vỏ ăn ngay không dính tay, giải phóng năng lượng bền bỉ chứ không bị tụt dốc đường huyết.',
    verifiedPurchase: true,
    helpfulCount: 29
  }
];

