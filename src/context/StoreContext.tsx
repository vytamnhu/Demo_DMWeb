import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, UserOrder, UserProfile } from '../types';
import { PRODUCTS } from '../data/productsData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface StoreContextType {
  // Products
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  addComboToCart: (combo: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  discountAmount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  finalTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAIChatOpen: boolean;
  setIsAIChatOpen: (open: boolean) => void;
  isComboBuilderOpen: boolean;
  setIsComboBuilderOpen: (open: boolean) => void;
  isUserAccountOpen: boolean;
  setIsUserAccountOpen: (open: boolean) => void;
  activeAccountTab: 'orders' | 'tracking' | 'wishlist' | 'profile';
  setActiveAccountTab: (tab: 'orders' | 'tracking' | 'wishlist' | 'profile') => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  lastOrder: UserOrder | null;

  // Checkout submission
  placeOrder: (orderDetails: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    paymentMethod: 'momo' | 'vnpay' | 'bank_transfer' | 'cod';
    notes?: string;
  }) => UserOrder;

  // Orders
  orders: UserOrder[];

  // User
  user: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Navigation
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_MIN = 299000;
const STANDARD_SHIPPING = 25000;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      {
        id: 'sowell-bar-macca-oat',
        productId: 'sowell-bar-macca-oat',
        name: 'Bánh Thanh Ngũ Cốc Macca & Yến Mạch Mật Dừa',
        price: 28000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
        caloriesPerUnit: 142,
        variantDescription: 'Gói thanh lẻ 35g'
      }
    ];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['sowell-bar-dark-choco-almond']);

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [fixedDiscount, setFixedDiscount] = useState<number>(0);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isComboBuilderOpen, setIsComboBuilderOpen] = useState(false);
  const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);
  const [activeAccountTab, setActiveAccountTab] = useState<'orders' | 'tracking' | 'wishlist' | 'profile'>('orders');
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<UserOrder | null>(null);

  // Active section for header nav
  const [activeSection, setActiveSection] = useState('home');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // User Profile
  const [user, setUser] = useState<UserProfile>({
    name: 'Nguyễn Phương Anh',
    phone: '0988 123 456',
    email: 'phuonganh.fit@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    defaultAddress: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
    dietaryPreference: 'Eat Clean',
    knownAllergies: [],
    weight: 52,
    height: 162,
    dailyCalorieTarget: 1650
  });

  // Mock orders history
  const [orders, setOrders] = useState<UserOrder[]>([
    {
      id: 'SW-89421',
      orderNumber: 'SW89421',
      date: '02/11/2026',
      status: 'shipping',
      items: [
        {
          id: 'combo-12',
          name: 'Hộp SOWELL Custom 12 Thanh [Eat Clean & Keto]',
          price: 295000,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
          variantDescription: '6 thanh Macca, 6 thanh Socola Hạnh nhân',
          isCustomCombo: true
        }
      ],
      subtotal: 295000,
      discount: 29500,
      shippingFee: 0,
      total: 265500,
      paymentMethod: 'momo',
      paymentStatus: 'paid',
      shippingAddress: {
        fullName: 'Nguyễn Phương Anh',
        phone: '0988 123 456',
        address: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ',
        ward: 'Phường 22',
        district: 'Quận Bình Thạnh',
        city: 'TP. Hồ Chí Minh'
      },
      trackingCode: 'GHN-8829104',
      estimatedDelivery: '07/11/2026 (Dự kiến trong ngày mai)'
    },
    {
      id: 'SW-85112',
      orderNumber: 'SW85112',
      date: '18/10/2026',
      status: 'delivered',
      items: [
        {
          id: 'sowell-granola-supernuts-jar',
          name: 'Granola Siêu Hạt Nướng Mộc (Hũ 350g)',
          price: 165000,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1517093708453-2708bca68a18?auto=format&fit=crop&w=800&q=80'
        }
      ],
      subtotal: 330000,
      discount: 33000,
      shippingFee: 0,
      total: 297000,
      paymentMethod: 'bank_transfer',
      paymentStatus: 'paid',
      shippingAddress: {
        fullName: 'Nguyễn Phương Anh',
        phone: '0988 123 456',
        address: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ',
        ward: 'Phường 22',
        district: 'Quận Bình Thạnh',
        city: 'TP. Hồ Chí Minh'
      },
      trackingCode: 'VTP-9921445',
      estimatedDelivery: '20/10/2026 (Đã giao thành công)'
    }
  ]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_MIN - cartSubtotal);
  const shippingFee = cartSubtotal >= FREE_SHIPPING_MIN || cartSubtotal === 0 ? 0 : STANDARD_SHIPPING;

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100) + fixedDiscount;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && !item.isCustomCombo);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.images[0],
          caloriesPerUnit: product.nutrition.calories,
          variantDescription: product.tagline
        }
      ];
    });

    showToast('Đã thêm vào giỏ hàng', `${quantity}x ${product.name}`, 'success');
  };

  const addComboToCart = (combo: CartItem) => {
    setCart((prev) => [combo, ...prev]);
    showToast('Tạo hộp thành công!', `Đã thêm ${combo.name} vào giỏ hàng`, 'success');
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Đã xóa sản phẩm', 'Sản phẩm đã được gỡ khỏi giỏ hàng', 'info');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SOWELLHEALTH') {
      setAppliedCoupon('SOWELLHEALTH (Giảm 15%)');
      setDiscountPercent(15);
      setFixedDiscount(0);
      showToast('Áp dụng mã thành công!', 'Giảm ngay 15% tổng giá trị đơn hàng', 'success');
      return { success: true, message: 'Áp dụng mã giảm 15% thành công!' };
    }
    if (cleanCode === 'FREESHIP') {
      setAppliedCoupon('FREESHIP (Miễn phí ship)');
      setFixedDiscount(25000);
      setDiscountPercent(0);
      showToast('Áp dụng mã thành công!', 'Miễn phí vận chuyển 25.000₫', 'success');
      return { success: true, message: 'Miễn phí vận chuyển thành công!' };
    }
    if (cleanCode === 'COMBOVEGAN') {
      setAppliedCoupon('COMBOVEGAN (Giảm 30.000₫)');
      setFixedDiscount(30000);
      setDiscountPercent(0);
      showToast('Áp dụng mã thành công!', 'Giảm 30.000₫ cho đơn hàng xanh', 'success');
      return { success: true, message: 'Giảm 30.000₫ thành công!' };
    }
    showToast('Mã giảm giá không hợp lệ', 'Vui lòng thử mã SOWELLHEALTH hoặc FREESHIP', 'error');
    return { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    setFixedDiscount(0);
    showToast('Đã hủy mã giảm giá', '', 'info');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Đã xóa khỏi yêu thích', 'Sản phẩm đã được gỡ khỏi danh sách yêu thích', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = products.find((p) => p.id === productId);
        showToast('Đã lưu vào yêu thích', `${prod?.name || 'Sản phẩm'} đã được thêm vào yêu thích`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...profile }));
    showToast('Cập nhật hồ sơ thành công', 'Thông tin dinh dưỡng và giao hàng đã được lưu', 'success');
  };

  const placeOrder = (orderDetails: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    paymentMethod: 'momo' | 'vnpay' | 'bank_transfer' | 'cod';
    notes?: string;
  }): UserOrder => {
    const orderNumber = `SW${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: UserOrder = {
      id: orderNumber,
      orderNumber,
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'pending',
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee,
      total: finalTotal,
      paymentMethod: orderDetails.paymentMethod,
      paymentStatus: orderDetails.paymentMethod === 'cod' ? 'pending' : 'paid',
      shippingAddress: {
        fullName: orderDetails.fullName,
        phone: orderDetails.phone,
        address: orderDetails.address,
        ward: orderDetails.ward,
        district: orderDetails.district,
        city: orderDetails.city,
        notes: orderDetails.notes
      },
      trackingCode: `GHN-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDelivery: 'Sau 2-3 ngày làm việc'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        addComboToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        freeShippingThreshold: FREE_SHIPPING_MIN,
        freeShippingRemaining,
        finalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAIChatOpen,
        setIsAIChatOpen,
        isComboBuilderOpen,
        setIsComboBuilderOpen,
        isUserAccountOpen,
        setIsUserAccountOpen,
        activeAccountTab,
        setActiveAccountTab,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        lastOrder,
        placeOrder,
        orders,
        user,
        updateUserProfile,
        toasts,
        showToast,
        removeToast,
        activeSection,
        setActiveSection
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

