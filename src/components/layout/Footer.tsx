import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Sprout, 
  ShieldCheck, 
  Award, 
  Send, 
  Phone, 
  Mail, 
  MapPin
} from 'lucide-react';

interface FooterProps {
  onNavigateToCatalog: () => void;
  onNavigateToStory: () => void;
  onNavigateToBlog: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateToCatalog, 
  onNavigateToStory, 
  onNavigateToBlog 
}) => {
  const { setIsAIChatOpen, setIsComboBuilderOpen, showToast } = useStore();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    showToast('Đăng ký thành công!', 'Mã giảm 15% SOWELLHEALTH đã sẵn sàng cho đơn hàng đầu tiên của bạn.', 'success');
    setEmailInput('');
  };

  return (
    <footer className="bg-[#163824] text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Clean Newsletter Banner */}
        <div className="bg-white/6 rounded-3xl p-6 sm:p-10 mb-14 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              Bản tin dinh dưỡng
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Nhận ưu đãi 15% cho đơn hàng đầu tiên
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/70 max-w-lg">
              Đăng ký email để nhận cẩm nang tính calo bữa phụ và thông báo các mẻ bánh nướng mới nhất từ SOWELL.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="Nhập địa chỉ email của bạn..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="bg-white/10 text-white placeholder-emerald-100/40 text-xs sm:text-sm px-4 py-3 rounded-full border border-white/15 focus:outline-none focus:border-white/40 flex-1 md:w-68"
            />
            <button
              type="submit"
              className="bg-white hover:bg-stone-100 text-[#163824] px-5 py-3 rounded-full font-bold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <span>Đăng ký</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand Story & Certifications */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#1E7547] flex items-center justify-center shrink-0">
                <img
                  src="/assets/images/sowell-stamp-badge.png"
                  alt="SOWELL Stamp"
                  className="w-[180%] h-[180%] max-w-none object-cover object-center"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div>
                <span className="font-extrabold text-2xl text-white tracking-tight leading-none block">
                  Sowell
                </span>
                <p className="text-[10px] text-emerald-300 font-medium tracking-wider uppercase mt-1">
                  Gieo hạt xanh, vị ngon lành
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-emerald-100/70 leading-relaxed max-w-md">
              Thương hiệu bánh hạt dinh dưỡng nướng mộc nhiệt thấp. Sử dụng yến mạch nguyên cám Úc, hạt Macca Tây Nguyên và mật hoa dừa tự nhiên, minh bạch chỉ số calo trên từng khẩu phần.
            </p>

            {/* Certifications */}
            <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-emerald-100/80">
              <span className="bg-white/8 px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>ISO 22000:2018</span>
              </span>
              <span className="bg-white/8 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-300" />
                <span>HACCP Codex</span>
              </span>
              <span className="bg-white/8 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                <span>OCOP 4 Sao</span>
              </span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-emerald-300 uppercase tracking-wider">Khám Phá</h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/70">
              <li>
                <button onClick={onNavigateToCatalog} className="hover:text-white transition-colors cursor-pointer">
                  Bộ sưu tập bánh
                </button>
              </li>
              <li>
                <button onClick={() => setIsComboBuilderOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Tự phối hộp bánh (-18%)
                </button>
              </li>
              <li>
                <button onClick={() => setIsAIChatOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Trợ lý AI tư vấn dinh dưỡng
                </button>
              </li>
              <li>
                <button onClick={onNavigateToStory} className="hover:text-white transition-colors cursor-pointer">
                  Câu chuyện nông trại
                </button>
              </li>
              <li>
                <button onClick={onNavigateToBlog} className="hover:text-white transition-colors cursor-pointer">
                  Cẩm nang dinh dưỡng
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-emerald-300 uppercase tracking-wider">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/70">
              <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả 7 ngày</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Giao hàng hỏa tốc 2H</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kiểm tra hàng khi nhận</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bảo mật thông tin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quà tặng doanh nghiệp</a></li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-emerald-300 uppercase tracking-wider">Liên Hệ</h4>
            <div className="space-y-2.5 text-xs text-emerald-100/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>120 Đường Số 7, Phường An Phú, TP. Thủ Đức, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Hotline: <strong className="text-white">1900 6828</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>contact@sowell.vn</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-100/50 gap-4">
          <p>© 2026 SOWELL Food Company Limited. All rights reserved.</p>
          <p>Gieo hạt xanh, vị ngon lành</p>
        </div>

      </div>
    </footer>
  );
};
