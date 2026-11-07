import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Package, 
  Truck, 
  Heart, 
  User, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus,
  ShoppingBag,
  Trash2
} from 'lucide-react';
import { ALL_ALLERGENS } from '../../data/productsData';
import { Allergen } from '../../types';

export const UserDashboardModal: React.FC = () => {
  const { 
    isUserAccountOpen, 
    setIsUserAccountOpen, 
    activeAccountTab, 
    setActiveAccountTab,
    orders, 
    user, 
    updateUserProfile,
    wishlist,
    products,
    addToCart,
    toggleWishlist
  } = useStore();

  const [dietPref, setDietPref] = useState(user.dietaryPreference || 'Eat Clean');
  const [knownAllergies, setKnownAllergies] = useState<Allergen[]>(user.knownAllergies || []);
  const [weight, setWeight] = useState(user.weight || 52);
  const [height, setHeight] = useState(user.height || 162);

  if (!isUserAccountOpen) return null;

  const wishedProducts = products.filter(p => wishlist.includes(p.id));

  const toggleAllergy = (allergen: Allergen) => {
    setKnownAllergies(prev => 
      prev.includes(allergen) ? prev.filter(a => a !== allergen) : [...prev, allergen]
    );
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      dietaryPreference: dietPref as any,
      knownAllergies,
      weight,
      height
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-[#E8E2D5] flex flex-col my-auto">
        
        {/* Header */}
        <div className="bg-[#1E7547] text-white p-5 sm:p-6 relative shadow-md">
          <button
            onClick={() => setIsUserAccountOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xl sm:text-2xl">
                  {user.name}
                </h3>
                <span className="bg-[#E59828] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Thành Viên Gold
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                {user.email} • {user.phone}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/20 text-xs">
            {[
              { id: 'orders', label: 'Lịch sử đơn hàng', icon: <Package className="w-4 h-4" /> },
              { id: 'tracking', label: 'Theo dõi vận đơn', icon: <Truck className="w-4 h-4" /> },
              { id: 'wishlist', label: `Yêu thích (${wishlist.length})`, icon: <Heart className="w-4 h-4" /> },
              { id: 'profile', label: 'Hồ sơ dinh dưỡng', icon: <User className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAccountTab(tab.id as any)}
                className={`py-2 px-3.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeAccountTab === tab.id
                    ? 'bg-white text-[#1E7547] shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto space-y-6">
          
          {/* TAB 1: ORDER HISTORY */}
          {activeAccountTab === 'orders' && (
            <div className="space-y-4">
              <h4 className="font-bold text-base text-[#1C2D20]">
                Danh Sách Đơn Hàng Đã Đặt ({orders.length})
              </h4>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-zinc-200">
                  <p className="text-sm text-zinc-500">Bạn chưa có đơn hàng nào.</p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-2xl p-5 border border-[#E8E2D5] space-y-3 shadow-xs hover:border-[#1E7547] transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100 text-xs">
                      <div>
                        <span className="font-black text-[#1C2D20] text-sm">Mã đơn: #{ord.orderNumber}</span>
                        <span className="text-zinc-400 ml-2">Ngày đặt: {ord.date}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                        ord.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'shipping'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {ord.status === 'delivered' ? 'Đã giao thành công' : ord.status === 'shipping' ? 'Đang giao hàng' : 'Đang nướng bánh mẻ mới'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-zinc-200" />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-zinc-900 truncate">{item.name}</h5>
                            <p className="text-zinc-500">{item.variantDescription || `Số lượng: ${item.quantity}`}</p>
                          </div>
                          <span className="font-black text-[#1E7547]">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between text-xs">
                      <span className="text-zinc-500">
                        Thanh toán: <strong className="uppercase text-zinc-800">{ord.paymentMethod}</strong> ({ord.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'})
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-zinc-500">Tổng thanh toán:</span>
                        <span className="text-base font-black text-[#1E7547]">
                          {ord.total.toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE SHIPPING TIMELINE TRACKING */}
          {activeAccountTab === 'tracking' && (
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D5] space-y-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                <div>
                  <h4 className="font-bold text-base text-[#1C2D20]">
                    Tra Cứu Vận Đơn: #{orders[0]?.trackingCode || 'GHN-8829104'}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Đơn vị vận chuyển: <strong>Giao Hàng Nhanh Express</strong> • Dự kiến giao: <strong>Hôm nay</strong>
                  </p>
                </div>
                <span className="bg-emerald-50 text-[#1E7547] text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                  Đang vận chuyển
                </span>
              </div>

              {/* Step Timeline */}
              <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#1E7547] text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  <h5 className="font-bold text-xs sm:text-sm text-[#1C2D20]">Đơn hàng đã được xác nhận</h5>
                  <p className="text-[11px] text-zinc-500">Hệ thống SOWELL đã tiếp nhận và chuyển xưởng nướng mộc bánh tươi.</p>
                  <span className="text-[10px] text-zinc-400">02/11/2026 09:15</span>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#1E7547] text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  <h5 className="font-bold text-xs sm:text-sm text-[#1C2D20]">Bánh nướng mộc & Đóng gói màng nhôm hoàn tất</h5>
                  <p className="text-[11px] text-zinc-500">Kiểm tra chất lượng HACCP và dán tem niêm phong hộp.</p>
                  <span className="text-[10px] text-zinc-400">02/11/2026 14:30</span>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#E59828] text-white flex items-center justify-center text-[10px] animate-pulse">
                    🚚
                  </div>
                  <h5 className="font-bold text-xs sm:text-sm text-[#E59828]">Shipper đang trên đường giao đến bạn</h5>
                  <p className="text-[11px] text-zinc-500">Bưu tá: Trần Văn Nam (SĐT: 0912.***.789) đang di chuyển tại khu vực Quận Bình Thạnh.</p>
                  <span className="text-[10px] text-zinc-400">Hôm nay 08:45</span>
                </div>

                {/* Step 4 */}
                <div className="relative opacity-40">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-zinc-300 text-zinc-600 flex items-center justify-center text-[10px]">
                    ○
                  </div>
                  <h5 className="font-bold text-xs sm:text-sm text-zinc-600">Giao hàng thành công</h5>
                  <p className="text-[11px] text-zinc-400">Khách hàng kiểm tra và ký nhận bánh.</p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: WISHLIST */}
          {activeAccountTab === 'wishlist' && (
            <div className="space-y-4">
              <h4 className="font-bold text-base text-[#1C2D20]">
                Danh Sách Sản Phẩm Yêu Thích ({wishedProducts.length})
              </h4>

              {wishedProducts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-zinc-200">
                  <p className="text-sm text-zinc-500">Bạn chưa thêm sản phẩm nào vào yêu thích.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishedProducts.map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded-2xl border border-zinc-200 flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs sm:text-sm text-[#1C2D20] truncate">{p.name}</h5>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-[#1E7547]">{p.price.toLocaleString('vi-VN')}₫</span>
                          <span className="text-[10px] bg-zinc-100 px-1.5 py-0.2 rounded text-zinc-600">{p.nutrition.calories} kcal</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="bg-[#1E7547] text-white px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 hover:bg-[#165a36]"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Thêm giỏ</span>
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="text-zinc-400 hover:text-rose-600 p-1"
                            title="Xóa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DIETARY PROFILE */}
          {activeAccountTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl p-6 border border-[#E8E2D5] space-y-5 shadow-xs">
              <div>
                <h4 className="font-bold text-base text-[#1C2D20]">
                  Hồ Sơ Sức Khỏe & Cảnh Báo Dị Ứng
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Lưu trữ thông tin để SOWELL tự động cảnh báo mỗi khi bạn xem các sản phẩm chứa thành phần dị ứng.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Chiều cao (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] text-xs p-2.5 rounded-xl border border-zinc-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Cân nặng (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] text-xs p-2.5 rounded-xl border border-zinc-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-2">Dị ứng cố hữu cần loại bỏ</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ALL_ALLERGENS.map((allergen) => {
                    const isSelected = knownAllergies.includes(allergen.value as Allergen);
                    return (
                      <button
                        type="button"
                        key={allergen.value}
                        onClick={() => toggleAllergy(allergen.value as Allergen)}
                        className={`text-xs p-2 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold' : 'border-zinc-200 text-zinc-600'
                        }`}
                      >
                        <span className="truncate">{allergen.label}</span>
                        {isSelected && <span className="text-rose-600">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1E7547] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md hover:bg-[#165a36]"
                >
                  Lưu Hồ Sơ Dinh Dưỡng
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

