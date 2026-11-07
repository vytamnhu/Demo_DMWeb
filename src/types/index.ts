export type DietaryTag = 'Eat Clean' | 'Keto' | 'Vegan' | 'Không đường' | 'Ít đường' | 'Giàu Protein' | 'Mẹ bầu' | 'Gluten-Free' | 'Nut-Free';

export type Allergen = 
  | 'Hạt điều' 
  | 'Đậu phộng' 
  | 'Mè/Vừng' 
  | 'Hạnh nhân' 
  | 'Quả óc chó' 
  | 'Hạt Macca' 
  | 'Gluten/Yến mạch' 
  | 'Gluten (Bột mì)'
  | 'Trứng'
  | 'Sữa/Bơ động vật';

export interface NutritionFacts {
  servingSize: string; // e.g. "1 thanh (35g)"
  calories: number; // kcal
  protein: number; // g
  totalCarbs: number; // g
  dietaryFiber: number; // g
  totalSugars: number; // g
  addedSugars: number; // g
  totalFat: number; // g
  saturatedFat: number; // g
  sodium: number; // mg
  potassium?: number; // mg
  ironPercentage?: number; // % DV
  calciumPercentage?: number; // % DV
}

export interface Review {
  id: string;
  userName: string;
  avatar: string;
  userRole?: string; // e.g. "Hội viên Gym 3 năm", "Nhân viên văn phòng"
  rating: number; // 1-5
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  images?: string[];
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'cereal-bars' | 'granola' | 'superfood-snacks' | 'combo-packs';
  tagline: string;
  description: string;
  story: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  images: string[];
  dietaryTags: DietaryTag[];
  allergens: Allergen[];
  nutrition: NutritionFacts;
  ingredients: string[];
  flavorProfile: string;
  bestTime: string; // e.g. "Trước tập 30 phút", "Bữa xế 15:00", "Bữa sáng 60s"
  isBestseller?: boolean;
  isNew?: boolean;
  weightGrams: number;
  boxUnitCount?: number; // if box of 12
}

export interface CartItem {
  id: string; // product id or combo id
  productId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantDescription?: string;
  caloriesPerUnit?: number;
  isCustomCombo?: boolean;
  comboDetails?: {
    boxSize: 6 | 12 | 24;
    dietaryGoal: string;
    excludedAllergens: Allergen[];
    items: { product: Product; count: number }[];
    giftMessage?: string;
  };
}

export interface UserOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'baking' | 'shipping' | 'delivered' | 'cancelled';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'momo' | 'vnpay' | 'bank_transfer' | 'cod';
  paymentStatus: 'paid' | 'pending';
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    ward: string;
    district: string;
    city: string;
    notes?: string;
  };
  trackingCode?: string;
  estimatedDelivery?: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  avatar: string;
  defaultAddress: string;
  dietaryPreference?: DietaryTag;
  knownAllergies: Allergen[];
  weight?: number;
  height?: number;
  dailyCalorieTarget?: number;
}

