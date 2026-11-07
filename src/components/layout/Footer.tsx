import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Sprout, 
  ShieldCheck, 
  Award, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Box,
  Sparkles
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
    <footer className="bg-[#1C2A1F] text-white pt-16 pb-12 border-t border-[#2D3E31]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Newsletter Banner */}
        <div className="bg-[#243729] rounded-3xl p-6 sm:p-10 mb-14 border border-[#344E3B] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-black text-[#E59828] uppercase tracking-wider">
              Ưu Đãi Đặc Quyền
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Nhận Mã Giảm 15% Cho Đơn Hàng Đầu Tiên
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-lg">
              Đăng ký email để nhận cẩm nang tính calo bữa phụ miễn phí và thông báo các mẻ bánh nướng mới nhất từ SOWELL.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="Nhập địa chỉ email của bạn..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="bg-white/10 text-white placeholder-emerald-200/50 text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#E59828] flex-1 md:w-72"
            />
            <button
              type="submit"
              className="bg-[#E59828] hover:bg-[#d08316] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <span>Nhận mã</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2D3E31]">
          
          {/* Col 1 & 2: Brand Story & Certifications */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/sowell-stamp-badge.png"
                alt="SOWELL Stamp"
                className="h-12 w-auto object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div>
                <span className="font-extrabold text-2xl text-white tracking-tight">
                  Sowell
                </span>
                <p className="text-[10px] text-[#E59828] font-bold tracking-widest uppercase">
                  Gieo hạt xanh, vị ngon lành
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
              SOWELL là thương hiệu tiên phong tại Việt Nam sản xuất bánh ngũ cốc nướng mộc nhiệt thấp, 
              sử dụng 100% yến mạch nguyên cám Úc, hạt Macca Tây Nguyên và mật hoa dừa Low GI. 
              Cam kết không đường tinh luyện, chuẩn calo khoa học cho người Việt.
            </p>

            {/* Certifications Stamps */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-[#E59828] uppercase tracking-wider mb-2">Chứng Nhận Chất Lượng:</p>
              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>ISO 22000:2018</span>
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>HACCP Codex</span>
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1">
                  <Sprout className="w-3 h-3 text-emerald-400" />
                  <span>OCOP 4 Sao</span>
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Khám Phá SOWELL</h4>
            <ul className="space-y-2 text-xs text-emerald-100/70">
              <li>
                <button onClick={onNavigateToCatalog} className="hover:text-white transition-colors cursor-pointer">
                  Bộ Sưu Tập Bánh
                </button>
              </li>
              <li>
                <button onClick={() => setIsComboBuilderOpen(true)} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  <Box className="w-3 h-3 text-[#E59828]" />
                  <span>Tự Phối Combo Hộp Bánh</span>
                </button>
              </li>
              <li>
                <button onClick={() => setIsAIChatOpen(true)} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#E59828]" />
                  <span>Trợ Lý AI Tính Calo TDEE</span>
                </button>
              </li>
              <li>
                <button onClick={onNavigateToStory} className="hover:text-white transition-colors cursor-pointer">
                  Nông Trại Hạt Bản Địa
                </button>
              </li>
              <li>
                <button onClick={onNavigateToBlog} className="hover:text-white transition-colors cursor-pointer">
                  Cẩm Nang Calo Bữa Phụ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Chính Sách & Hỗ Trợ</h4>
            <ul className="space-y-2 text-xs text-emerald-100/70">
              <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả 7 ngày</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Giao hàng hỏa tốc 2H (Hà Nội, TP.HCM)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kiểm tra hàng trước khi thanh toán</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bảo mật thông tin khách hàng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hợp tác đại lý & Quà tặng doanh nghiệp</a></li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Liên Hệ</h4>
            <div className="space-y-2 text-xs text-emerald-100/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E59828] shrink-0 mt-0.5" />
                <span>Trụ sở: 120 Đường Số 7, Phường An Phú, TP. Thủ Đức, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E59828] shrink-0" />
                <span>Hotline: <strong className="text-white">1900 6828</strong> (8h - 21h)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E59828] shrink-0" />
                <span>Email: contact@sowell.vn</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#1E7547] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#1E7547] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#1E7547] transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-100/50 gap-4">
          <p>© 2026 SOWELL Food Company Limited. All rights reserved. GPKD số: 031899214 do Sở KH&ĐT TP.HCM cấp.</p>
          <div className="flex items-center gap-4">
            <span>Thiết kế UI/UX & Phát triển Full-stack chuẩn Thương Mại Điện Tử</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
