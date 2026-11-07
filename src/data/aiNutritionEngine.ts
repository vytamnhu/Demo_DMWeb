import type { Product } from '../types/index';
import { PRODUCTS } from './productsData';

/**
 * ============================================================================
 * TRỢ LÝ TƯ VẤN DINH DƯỠNG SOWELL TOÀN DIỆN
 * Tư vấn chính xác cho tất cả sản phẩm của web SOWELL:
 * - Biscotti & Bánh ngói hạnh nhân
 * - Bánh thanh ngũ cốc Eat Clean, Vegan, Nut-Free, High-Protein, Keto
 * - Hũ Granola siêu hạt
 * Đối chiếu dị ứng chéo, loại trừ thành phần mẫn cảm và gợi ý sản phẩm phù hợp.
 * ============================================================================
 */

export interface SOWELLProductNutrition {
  name: string;
  servingSize: string;
  servingWeightGrams: number;
  servingsPerPack: string;
  caloriesPerServing: number;
  proteinPerServing: number;
  fatPerServing: number;
  satFatPerServing: number;
  carbsPerServing: number;
  sugarPerServing: number;
  fiberPerServing: number;
  sodiumPerServing: number;
  per100g: {
    calories: number;
    carbs: number;
    sugar: number;
    fat: number;
    satFat: number;
    protein: number;
    fiber: number;
    sodium: number;
  };
  ingredients: string;
  allergens: string[];
  sugarSources: string;
  crossContamination: string;
  texture: string;
  taste: string;
  shelfLife: string;
  openShelfLife: string;
  storage: string;
  reCrisp: string;
  veganSuitable: boolean;
  lactoOvoVegSuitable: boolean;
  shopNotice: string;
}

export const SOWELL_DATA: Record<'biscotti' | 'tuiles', SOWELLProductNutrition> = {
  biscotti: {
    name: 'Biscotti (3 vị: Original, Choco, Matcha)',
    servingSize: '50 g (khoảng 2 miếng)',
    servingWeightGrams: 50,
    servingsPerPack: 'Gói 100 g: 2 khẩu phần; gói 250 g: 5 khẩu phần',
    caloriesPerServing: 175,
    proteinPerServing: 7,
    fatPerServing: 4,
    satFatPerServing: 1.5,
    carbsPerServing: 28,
    sugarPerServing: 10,
    fiberPerServing: 3,
    sodiumPerServing: 90,
    per100g: {
      calories: 350,
      carbs: 56,
      sugar: 20,
      fat: 8,
      satFat: 3,
      protein: 14,
      fiber: 6,
      sodium: 180
    },
    ingredients: 'Bột mì nguyên cám, trứng gà, hạnh nhân, hạt điều, hạt bí xanh, bột mì, nho khô, bơ lạt, đường nâu, bột trà xanh, bột cacao, bột nở, muối. (Đây là danh sách chung cho cả 3 vị; thành phần riêng từng vị hiện chưa có thông tin riêng trên nhãn).',
    allergens: ['Gluten (Bột mì)', 'Trứng', 'Hạnh nhân', 'Hạt điều', 'Sữa/Bơ động vật'],
    sugarSources: 'Đường nâu, nho khô',
    crossContamination: 'Nhãn không ghi thông tin về lây nhiễm chéo.',
    texture: 'Giòn chắc, cứng hơn bánh ngói, rất hợp nhúng cà phê, sữa hoặc trà.',
    taste: 'Ngọt vừa, vị hạt và nho khô thơm bùi.',
    shelfLife: 'Hạn sử dụng 3 tháng kể từ ngày sản xuất in trên bao bì. Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.',
    openShelfLife: 'Giữ giòn khoảng 7 ngày nếu đậy kín.',
    storage: 'Không cần để tủ lạnh; tránh ẩm vì bánh dễ mềm.',
    reCrisp: 'Nướng hoặc làm nóng nhẹ ở 100–120°C trong 3–5 phút rồi để nguội.',
    veganSuitable: false, // Có trứng gà và bơ lạt
    lactoOvoVegSuitable: true, // Không có thịt
    shopNotice: 'Không dùng sản phẩm hết hạn hoặc có dấu hiệu hư hỏng. Hướng dẫn của shop: dùng 2–3 miếng trước buổi tập, ăn phụ thay snack, ăn sáng ăn vặt, không dùng quá nhiều một lần.'
  },
  tuiles: {
    name: 'Bánh ngói hạnh nhân (Tuiles Almond)',
    servingSize: '20 g (1 túi nhỏ gồm 2 bánh)',
    servingWeightGrams: 20,
    servingsPerPack: 'Gói 250 g: 12–13 khẩu phần (khoảng 24–26 bánh). Quy cách khác: hiện chưa có thông tin.',
    caloriesPerServing: 98,
    proteinPerServing: 1.8,
    fatPerServing: 6.2,
    satFatPerServing: 2.0,
    carbsPerServing: 8.8,
    sugarPerServing: 5.2,
    fiberPerServing: 0.8,
    sodiumPerServing: 24,
    per100g: {
      calories: 490,
      carbs: 44,
      sugar: 26,
      fat: 31,
      satFat: 10,
      protein: 9,
      fiber: 4,
      sodium: 120
    },
    ingredients: 'Hạnh nhân lát, lòng trắng trứng, đường trehalose, đường nâu hữu cơ, bột hạnh nhân, bột mì, bơ lạt, muối… (mô tả có dấu “…” nên danh sách chưa đầy đủ: hiện chưa có thông tin chi tiết hơn. Vị hạt bí, matcha, cacao có thêm thành phần tương tự: hiện chưa có thông tin).',
    allergens: ['Hạnh nhân', 'Trứng', 'Gluten (Bột mì)', 'Sữa/Bơ động vật'],
    sugarSources: 'Đường trehalose, đường nâu hữu cơ',
    crossContamination: 'Nhãn không ghi thông tin về lây nhiễm chéo.',
    texture: 'Giòn rụm, mỏng, không bị cứng.',
    taste: 'Ngọt rất nhẹ, thơm bơ lạt, hạnh nhân bùi béo.',
    shelfLife: 'HSD 3 tháng, sản xuất mới mỗi ngày. Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng, đóng kín sau khi mở.',
    openShelfLife: 'Giữ giòn khoảng 5 ngày nếu đậy kín.',
    storage: 'Không cần để tủ lạnh; tránh ẩm vì bánh dễ mềm.',
    reCrisp: 'Nướng hoặc làm nóng nhẹ ở 100–120°C trong 3–5 phút rồi để nguội.',
    veganSuitable: false, // Có lòng trắng trứng và bơ lạt
    lactoOvoVegSuitable: true,
    shopNotice: 'Mô tả ghi rõ đây không phải bánh giảm cân, cần cân nhắc và tính calo kỹ nếu đang giảm cân; bánh có thể bể vỡ ít khi vận chuyển.'
  }
};

/** Mốc tham chiếu chung WHO cho người trưởng thành khỏe mạnh (2.000 kcal/ngày) */
export const WHO_REFERENCE = {
  calories: 2000,
  freeSugarGrams: 50, // dưới 10% năng lượng
  satFatGrams: 22,    // dưới 10% năng lượng
  sodiumMg: 2000,     // dưới 2 g natri = dưới 5 g muối (natri x 2.5)
  saltGrams: 5
};

export interface ServingCalculationResult {
  productName: string;
  servings: number;
  totalGrams: number;
  calories: number;
  carbs: number;
  sugar: number;
  fat: number;
  satFat: number;
  protein: number;
  fiber: number;
  sodium: number;
  saltGrams: number;
  sugarPercentageOfWHO: number;
  caloriesPercentageOfWHO: number;
  formulaText: string;
}

export function calculateServings(productKey: 'biscotti' | 'tuiles', servings: number): ServingCalculationResult {
  const p = SOWELL_DATA[productKey];
  const count = Math.max(1, servings);
  const totalGrams = p.servingWeightGrams * count;
  const calories = p.caloriesPerServing * count;
  const carbs = Math.round(p.carbsPerServing * count * 10) / 10;
  const sugar = Math.round(p.sugarPerServing * count * 10) / 10;
  const fat = Math.round(p.fatPerServing * count * 10) / 10;
  const satFat = Math.round(p.satFatPerServing * count * 10) / 10;
  const protein = Math.round(p.proteinPerServing * count * 10) / 10;
  const fiber = Math.round(p.fiberPerServing * count * 10) / 10;
  const sodium = Math.round(p.sodiumPerServing * count);
  const saltGrams = Math.round((sodium * 2.5 / 1000) * 10) / 10;

  const sugarPercentageOfWHO = Math.round((sugar / WHO_REFERENCE.freeSugarGrams) * 100);
  const caloriesPercentageOfWHO = Math.round((calories / WHO_REFERENCE.calories) * 100);

  const formulaText = `Phép tính cho ${count} khẩu phần (${totalGrams} g): Năng lượng = ${p.caloriesPerServing} × ${count} = ${calories} kcal; Đường = ${p.sugarPerServing}g × ${count} = ${sugar} g; Natri = ${p.sodiumPerServing}mg × ${count} = ${sodium} mg (~${saltGrams} g muối). Chiếm khoảng ${sugarPercentageOfWHO}% mốc đường và ${caloriesPercentageOfWHO}% mốc calo tham chiếu chung WHO (2.000 kcal/ngày).`;

  return {
    productName: p.name,
    servings: count,
    totalGrams,
    calories,
    carbs,
    sugar,
    fat,
    satFat,
    protein,
    fiber,
    sodium,
    saltGrams,
    sugarPercentageOfWHO,
    caloriesPercentageOfWHO,
    formulaText
  };
}

/**
 * Lọc danh sách sản phẩm an toàn loại trừ các dị ứng cụ thể
 */
export function getSafeProductsExcluding(excludedKeywords: string[]): Product[] {
  return PRODUCTS.filter(prod => {
    // Check allergens list
    for (const allergen of prod.allergens) {
      for (const kw of excludedKeywords) {
        if (allergen.toLowerCase().includes(kw.toLowerCase())) {
          return false;
        }
      }
    }
    // Check ingredients list
    for (const ing of prod.ingredients) {
      for (const kw of excludedKeywords) {
        if (ing.toLowerCase().includes(kw.toLowerCase())) {
          return false;
        }
      }
    }
    return true;
  });
}

// Backward-compatible types for legacy imports
export type UserGoal = 'weight-loss' | 'muscle-gain' | 'maintenance' | 'eat-clean' | 'diabetes' | 'pregnancy';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very-active';
export type Gender = 'male' | 'female';
export interface UserMetrics {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: UserGoal;
}
export interface NutritionResult {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  targetCalories: number;
  deficitOrSurplus: number;
  recommendedSnackCalories: { min: number; max: number };
  macroSplit: { proteinGrams: number; carbsGrams: number; fatGrams: number };
  primaryRecommendation: Product;
  secondaryRecommendations: Product[];
  reasoning: string;
  nutritionalAdvice: string;
}

export function generateNutritionPlan(_metrics: UserMetrics): NutritionResult {
  const biscotti = PRODUCTS.find(p => p.id === 'sowell-biscotti-3-flavors') || PRODUCTS[0];
  const tuiles = PRODUCTS.find(p => p.id === 'sowell-tuiles-almond') || PRODUCTS[1];
  return {
    bmi: 21.5,
    bmiCategory: 'Tham khảo số liệu khẩu phần',
    bmr: 1400,
    tdee: 1800,
    targetCalories: 1800,
    deficitOrSurplus: 0,
    recommendedSnackCalories: { min: 100, max: 200 },
    macroSplit: { proteinGrams: 70, carbsGrams: 200, fatGrams: 50 },
    primaryRecommendation: biscotti,
    secondaryRecommendations: [tuiles],
    reasoning: 'Theo quy định tư vấn, SOWELL cung cấp số liệu dinh dưỡng sản phẩm trên từng khẩu phần và đối chiếu mốc tham chiếu chung WHO, không tính mục tiêu calo cá nhân.',
    nutritionalAdvice: 'Mỗi khẩu phần Biscotti (50g) cung cấp 175 kcal, 10g đường. Khẩu phần Bánh ngói (20g) cung cấp 98 kcal, 5.2g đường.'
  };
}

export interface AIAnswerResponse {
  text: string;
  recommendedProduct?: Product;
  quickReplies?: string[];
  level?: 1 | 2 | 3 | 4 | 'emergency' | 'eating_disorder' | 'forbidden' | 'out_of_scope';
}

/**
 * NATURAL LANGUAGE CONSULTANT ENGINE FOR ALL SOWELL PRODUCTS
 * Fully supports Biscotti, Bánh ngói, and all 8 specialized cereal bars & granolas.
 */
export function processUserQuestion(question: string): AIAnswerResponse {
  const q = question.toLowerCase().trim();
  const biscottiProd = PRODUCTS.find(p => p.id === 'sowell-biscotti-3-flavors') || PRODUCTS[0];
  const tuilesProd = PRODUCTS.find(p => p.id === 'sowell-tuiles-almond') || PRODUCTS[1];
  const sesameRedbeanProd = PRODUCTS.find(p => p.id === 'sowell-bar-sesame-redbean-protein') || PRODUCTS[6];
  const pumpkinRedDateProd = PRODUCTS.find(p => p.id === 'sowell-bar-pumpkin-red-date') || PRODUCTS[8];
  const peanutChiaProd = PRODUCTS.find(p => p.id === 'sowell-bar-peanut-butter-chia') || PRODUCTS[9];
  const maccaOatProd = PRODUCTS.find(p => p.id === 'sowell-bar-macca-oat') || PRODUCTS[2];
  const walnutBananaProd = PRODUCTS.find(p => p.id === 'sowell-bar-walnut-banana') || PRODUCTS[5];

  // --------------------------------------------------------------------------
  // KHẨN CẤP: Dị ứng cấp tính (Khó thở, sưng môi/mặt, nổi mề đay sau khi ăn)
  // --------------------------------------------------------------------------
  if (
    (q.includes('khó thở') || q.includes('sưng môi') || q.includes('sưng mặt') || q.includes('mề đay') || q.includes('ngứa họng') || q.includes('sốc phản vệ')) ||
    (q.includes('ăn xong') && (q.includes('ngứa') || q.includes('dị ứng') || q.includes('khó chịu') || q.includes('nôn mửa')))
  ) {
    return {
      text: 'Bạn hãy **ngừng ăn bánh ngay lập tức** và **gọi cấp cứu 115** hoặc đến cơ sở y tế gần nhất để được kiểm tra và xử trí kịp thời. Sức khỏe và an toàn tính mạng của bạn là quan trọng nhất lúc này, shop xin phép không tư vấn thêm về sản phẩm vào lúc này.',
      quickReplies: ['Gọi cấp cứu 115', 'Nhắn trực tiếp cho shop'],
      level: 'emergency'
    };
  }

  // --------------------------------------------------------------------------
  // RỐI LOẠN ĂN UỐNG: Ép nôn, sợ béo cực đoan
  // --------------------------------------------------------------------------
  if (q.includes('ép nôn') || q.includes('móc họng') || (q.includes('nhịn ăn') && q.includes('sợ béo')) || q.includes('rối loạn ăn uống')) {
    return {
      text: 'Mình xin phép dừng tư vấn sản phẩm bánh. Hành vi tự ép nôn hay nhịn ăn quá mức có thể gây ảnh hưởng rất lớn đến sức khỏe và tâm lý của bạn. Bạn hãy nhẹ nhàng chia sẻ tình trạng này với chuyên gia y tế, chuyên gia tâm lý hoặc người thân đáng tin cậy để nhận được sự đồng hành và hỗ trợ tốt nhất nhé.',
      quickReplies: ['Cảm ơn bạn', 'Nhắn trực tiếp cho shop'],
      level: 'eating_disorder'
    };
  }

  // --------------------------------------------------------------------------
  // CÂU HỎI BỊ CẤM / YÊU CẦU PHÁ VỠ QUY TẮC
  // --------------------------------------------------------------------------
  if (
    (q.includes('bỏ qua') && (q.includes('quy tắc') || q.includes('luật'))) ||
    q.includes('chữa được') || q.includes('điều trị') || q.includes('chữa tiểu đường') || q.includes('chữa bệnh') ||
    q.includes('hạ đường huyết') || q.includes('tăng miễn dịch') || q.includes('giảm cân nhanh')
  ) {
    return {
      text: 'SOWELL xin từ chối mọi yêu cầu tuyên bố bánh có công dụng chữa bệnh, điều trị, hạ đường huyết hay giảm cân nhanh. Các sản phẩm của SOWELL là món ăn nhẹ dinh dưỡng thông thường, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Thông tin thành phần và dinh dưỡng được công khai minh bạch để bạn tham khảo.',
      quickReplies: ['Bảng dinh dưỡng Biscotti', 'Bánh Nut-Free', 'Nhắn cho shop'],
      level: 'forbidden'
    };
  }

  if (q.includes('lập') && (q.includes('thực đơn') || q.includes('kế hoạch')) && q.includes('giảm cân')) {
    return {
      text: 'Mình không thể lập thực đơn hay kế hoạch giảm cân riêng cho từng khách hàng được ạ. SOWELL cung cấp số liệu dinh dưỡng chuẩn của từng sản phẩm để bạn dễ dàng theo dõi calo: ví dụ Bánh Hạt Bí Táo Đỏ (135 kcal), Bánh Macca Yến Mạch (142 kcal), Biscotti (175 kcal/50g). Để có kế hoạch giảm cân khoa học, bạn nên tham khảo ý kiến chuyên gia dinh dưỡng hoặc bác sĩ nhé.',
      recommendedProduct: pumpkinRedDateProd,
      quickReplies: ['Bánh ít calo nhất', 'Bảng dinh dưỡng Biscotti', 'Mốc tham chiếu WHO'],
      level: 'forbidden'
    };
  }

  // --------------------------------------------------------------------------
  // NGOÀI PHẠM VI: Giá, Vận chuyển, Bể vỡ & Đổi trả, Sản xuất mới
  // --------------------------------------------------------------------------
  if (q.includes('bao nhiêu tiền') || q.includes('giá bao nhiêu') || q.includes('giá cả') || q.includes('bảng giá')) {
    return {
      text: 'Về mức giá và các chương trình ưu đãi hiện hành, thanh ngũ cốc SOWELL dao động từ 26.000₫ – 32.000₫/thanh (35g–40g), Biscotti giá 85.000₫/gói, Bánh ngói 115.000₫/gói, Granola hũ 350g giá 165.000₫. Bạn vui lòng nhắn trực tiếp cho shop để nhận thông tin giá và combo ưu đãi giảm 18% mới nhất nhé!',
      quickReplies: ['Nhắn trực tiếp cho shop', 'Bảng dinh dưỡng Biscotti', 'Tự phối combo'],
      level: 'out_of_scope'
    };
  }

  // Giao hàng / Thời gian giao / Phí ship
  if (q.includes('ship') || q.includes('vận chuyển') || q.includes('giao hàng') || q.includes('toàn quốc') || q.includes('mấy ngày')) {
    if (q.includes('ngói') || q.includes('tuiles')) {
      return {
        text: 'Về vận chuyển Bánh ngói hạnh nhân: do bánh có kết cấu mỏng giòn nên shop luôn đóng gói bọc bóng khí chống sốc nhiều lớp cẩn thận. Thời gian giao hàng nội thành là 1–2 ngày, các tỉnh khác khoảng 2–4 ngày. Đơn từ 199.000đ được miễn phí ship toàn quốc và bạn được kiểm tra tình trạng đóng gói khi nhận nhé!',
        recommendedProduct: tuilesProd,
        quickReplies: ['Nhắn trực tiếp cho shop', 'Bánh có bị vỡ khi giao?'],
        level: 'out_of_scope'
      };
    }
    if (q.includes('biscotti')) {
      return {
        text: 'Về vận chuyển Biscotti: bánh có kết cấu nướng hai lần giòn chắc nên rất cứng cáp, vận chuyển xa cực kỳ an toàn và giữ trọn độ nguyên vẹn. Thời gian giao hàng nội thành là 1–2 ngày, tỉnh khác từ 2–4 ngày. Shop miễn phí vận chuyển cho đơn từ 199.000đ trên toàn quốc nhé!',
        recommendedProduct: biscottiProd,
        quickReplies: ['Nhắn trực tiếp cho shop', 'Xem Biscotti 3 vị'],
        level: 'out_of_scope'
      };
    }
    if (q.includes('thanh') || q.includes('granola')) {
      return {
        text: 'Về vận chuyển Bánh thanh ngũ cốc & Granola: Bánh thanh được đóng gói từng thanh riêng biệt trong túi màng nhôm đa lớp chống va đập và giữ giòn; hũ Granola được quấn xốp chống sốc dày. Thời gian giao nội thành 1–2 ngày, tỉnh khác 2–4 ngày, miễn phí ship cho đơn từ 199.000đ toàn quốc nhé!',
        recommendedProduct: maccaOatProd,
        quickReplies: ['Nhắn trực tiếp cho shop', 'Xem các dòng bánh thanh'],
        level: 'out_of_scope'
      };
    }
    return {
      text: 'Chính sách vận chuyển áp dụng chung cho toàn bộ sản phẩm SOWELL:\n- **Thời gian giao hàng:** Nội thành 1–2 ngày, các tỉnh thành khác khoảng 2–4 ngày làm việc.\n- **Phí ship:** Miễn phí vận chuyển (FREESHIP) cho mọi đơn hàng từ 199.000đ trên toàn quốc.\n- **Kiểm tra khi nhận:** Khách hàng được quyền kiểm tra kiện hàng đóng gói nguyên vẹn trước khi thanh toán cho shipper.\nBạn vui lòng nhắn trực tiếp cho shop để xác nhận địa chỉ và nhận mã ưu đãi vận chuyển nhé!',
      quickReplies: ['Nhắn trực tiếp cho shop', 'Bánh có bị bể vỡ khi giao?'],
      level: 'out_of_scope'
    };
  }

  // Bể vỡ / Đổi trả / Hư hỏng
  if (q.includes('vỡ') || q.includes('bể') || q.includes('đổi trả') || q.includes('hỏng') || q.includes('gãy') || q.includes('nứt')) {
    // 1. Khách hỏi về các bánh khác (Biscotti, Bánh thanh ngũ cốc, Granola)
    if (q.includes('khác') || q.includes('còn lại') || q.includes('ngoài bánh ngói')) {
      return {
        text: 'Đối với tất cả các dòng bánh khác của SOWELL (Biscotti, Bánh thanh ngũ cốc, Granola), shop đều áp dụng **chính sách bảo hành & đổi trả 100%**:\n- **Biscotti (3 vị):** Kết cấu nướng hai lần giòn chắc nên rất cứng cáp, cực kỳ hiếm khi bị nứt vỡ khi vận chuyển.\n- **Bánh thanh ngũ cốc (Macca, Mè đen, Óc chó, v.v.):** Đóng gói màng nhôm đa lớp riêng từng thanh nhỏ gọn, chống va đập rất tốt.\n- **Hũ Granola thủy tinh:** Được quấn bọc xốp chống sốc đa lớp.\nNếu bất kỳ sản phẩm nào bạn nhận được bị bể vỡ nhiều, hư hỏng hoặc lỗi bao bì do vận chuyển, shop hỗ trợ đổi mới trong vòng 48 giờ (kèm ảnh/video mở hộp). Bạn chỉ cần nhắn tin cho shop là sẽ được hỗ trợ gửi hàng mới ngay nhé!',
        recommendedProduct: biscottiProd,
        quickReplies: ['Nhắn trực tiếp cho shop', 'Chính sách Freeship', 'Xem toàn bộ sản phẩm'],
        level: 'out_of_scope'
      };
    }

    // 2. Khách hỏi riêng về Biscotti
    if (q.includes('biscotti')) {
      return {
        text: 'Biscotti SOWELL được nướng hai lần theo phương pháp truyền thống tạo kết cấu giòn chắc, khô ráo nên bánh rất cứng cáp, ít bị bể vỡ khi vận chuyển xa. Shop luôn đóng gói cẩn thận trong túi zip và bọc bóng khí bảo vệ. Trường hợp hiếm hoi bánh bị vỡ vụn nhiều hoặc bao bì bị lỗi do đơn vị vận chuyển, shop hỗ trợ đổi trả sản phẩm mới trong vòng 48 giờ kèm ảnh/video mở hộp. Bạn hoàn toàn yên tâm khi đặt hàng nhé!',
        recommendedProduct: biscottiProd,
        quickReplies: ['Nhắn trực tiếp cho shop', 'Bảng dinh dưỡng Biscotti', 'Xem Bánh ngói'],
        level: 'out_of_scope'
      };
    }

    // 3. Khách hỏi riêng về Bánh thanh ngũ cốc hoặc Granola
    if (q.includes('thanh') || q.includes('ngũ cốc') || q.includes('granola')) {
      return {
        text: 'Các dòng Bánh thanh ngũ cốc SOWELL (Macca, Mè đen, Hạt bí, Bơ đậu phộng...) được đóng gói riêng từng thanh trong túi màng nhôm bảo vệ, kết cấu dẻo bùi hoặc giòn xốp tự nhiên nên hạn chế tối đa nguy cơ gãy vỡ; còn hũ Granola được quấn chống sốc đa lớp. Nếu kiện hàng nhận được bị móp méo, bánh bị gãy vụn hoặc lỗi bao bì do vận chuyển, shop hỗ trợ đổi hàng mới trong vòng 48 giờ kèm ảnh/video mở hộp nhé!',
        recommendedProduct: maccaOatProd,
        quickReplies: ['Nhắn trực tiếp cho shop', 'Xem các dòng bánh thanh', 'Phí ship bao nhiêu?'],
        level: 'out_of_scope'
      };
    }

    // 4. Khách hỏi riêng về Bánh ngói hạnh nhân
    if (q.includes('ngói') || q.includes('tuiles')) {
      return {
        text: 'Bánh ngói hạnh nhân có kết cấu mỏng giòn rụm nên dễ vỡ hơn các dòng bánh khác khi vận chuyển xa. Vì vậy shop luôn chèn bọc bóng khí dày nhiều lớp và dán nhãn hàng dễ vỡ để bảo vệ bánh. Shop cam kết hỗ trợ đổi trả hoặc gửi bù bánh mới trong vòng 48 giờ nếu bánh nhận được bị bể vỡ nhiều, kèm hình ảnh hoặc video mở hộp. Bạn cứ yên tâm đặt bánh và nhắn shop nếu cần hỗ trợ nhé!',
        recommendedProduct: tuilesProd,
        quickReplies: ['Nhắn trực tiếp cho shop', 'Bánh làm mới hay hàng tồn?', 'Xem các bánh khác'],
        level: 'out_of_scope'
      };
    }

    // 5. Câu hỏi CHUNG cho toàn bộ sản phẩm trên web
    return {
      text: 'Chính sách bảo đảm vận chuyển & đổi trả của SOWELL áp dụng chung cho **toàn bộ sản phẩm trên website**:\n- **Đóng gói cẩn thận:** Mọi đơn hàng (Biscotti, Bánh ngói, Bánh thanh ngũ cốc, Granola) đều được chèn xốp bóng khí chống sốc chuyên dụng trước khi gửi.\n- **Độ bền theo từng loại bánh:** Biscotti giòn chắc và Bánh thanh đóng túi riêng rất khó vỡ; Bánh ngói mỏng giòn được bọc kỹ càng hơn.\n- **Chính sách đổi trả:** Nếu bất kỳ sản phẩm nào bạn nhận được bị bể vỡ nhiều, lỗi bao bì hoặc hư hỏng do vận chuyển, shop hỗ trợ đổi mới trong vòng 48 giờ (kèm hình ảnh/video mở hộp). Bạn chỉ cần nhắn tin cho shop để được hỗ trợ nhanh nhất nhé!',
      quickReplies: ['Nhắn trực tiếp cho shop', 'Thời gian giao hàng', 'Phí ship bao nhiêu?'],
      level: 'out_of_scope'
    };
  }

  // Bánh làm mới hay hàng tồn
  if (q.includes('làm mới') || q.includes('hàng tồn') || q.includes('mới nướng') || q.includes('mẻ mới')) {
    if (q.includes('ngói') || q.includes('tuiles')) {
      return {
        text: 'Bánh ngói hạnh nhân của shop được sản xuất mới mỗi ngày; ngày sản xuất và hạn sử dụng (3 tháng) được in rõ ràng trên bao bì. Bạn có thể kiểm tra trực tiếp ngày in trên gói hoặc nhắn cho shop để được xác nhận mẻ bánh mới nhất nhé!',
        recommendedProduct: tuilesProd,
        quickReplies: ['Hạn sử dụng bao lâu?', 'Xem các bánh khác', 'Nhắn cho shop'],
        level: 'out_of_scope'
      };
    }
    if (q.includes('biscotti')) {
      return {
        text: 'Biscotti SOWELL được nướng mới liên tục theo từng mẻ nhỏ trong tuần để đảm bảo độ giòn chắc và thơm ngon của các loại hạt. Hạn sử dụng là 3 tháng kể từ ngày sản xuất in dập trên bao bì gói. Bạn hoàn toàn yên tâm không có hàng tồn cũ nhé!',
        recommendedProduct: biscottiProd,
        quickReplies: ['Hạn sử dụng Biscotti', 'Nhắn cho shop'],
        level: 'out_of_scope'
      };
    }
    if (q.includes('thanh') || q.includes('granola')) {
      return {
        text: 'Các dòng Bánh thanh ngũ cốc và Granola SOWELL được sấy nướng nhiệt thấp mộc và đóng gói xuất xưởng mới đều đặn trong tuần, hạn sử dụng 6 tháng. Bao bì màng nhôm đa lớp cản sáng và cản oxy giúp giữ trọn độ giòn thơm tự nhiên của hạt mà không cần chất bảo quản!',
        recommendedProduct: maccaOatProd,
        quickReplies: ['Xem bánh thanh', 'Nhắn cho shop'],
        level: 'out_of_scope'
      };
    }
    return {
      text: 'Toàn bộ sản phẩm của SOWELL (Biscotti, Bánh ngói hạnh nhân, Bánh thanh ngũ cốc, Granola) đều được sản xuất mới liên tục theo từng mẻ nhỏ trong tuần, cam kết **100% không có hàng tồn cũ**; ngày sản xuất và hạn sử dụng được in dập rõ ràng trên bao bì từng sản phẩm. Bạn hoàn toàn yên tâm thưởng thức trọn vẹn độ giòn thơm mới nhé!',
      quickReplies: ['Nhắn trực tiếp cho shop', 'Hạn sử dụng bao lâu?', 'Xem toàn bộ sản phẩm'],
      level: 'out_of_scope'
    };
  }

  // --------------------------------------------------------------------------
  // DỊ ỨNG & ĐỐI CHIẾU SẢN PHẨM PHÙ HỢP TRONG TOÀN BỘ CATALOG
  // --------------------------------------------------------------------------
  
  // 1. DỊ ỨNG HẠNH NHÂN (Almond Allergy)
  if (q.includes('hạnh nhân') && (q.includes('dị ứng') || q.includes('không ăn được') || q.includes('kiêng'))) {
    return {
      text: `SOWELL đối chiếu thành phần và xin thông báo:\n- **Sản phẩm KHÔNG phù hợp:** Biscotti, Bánh ngói hạnh nhân, Bánh Socola Đen Hạnh Nhân và Granola Siêu Hạt (do chứa hạnh nhân).\n- **Sản phẩm AN TOÀN thay thế khuyên dùng:**\n  1. **Bánh Thanh Protein Mè Đen & Đậu Đỏ (Nut-Free):** 100% không hạnh nhân, 9.5g đạm, 0g đường.\n  2. **Bánh Thanh Hạt Bí Xanh & Táo Đỏ Kỷ Tử (Nut-Free):** 135 kcal, không hạt vỏ cứng.\n  3. **Bánh Macca & Yến Mạch Mật Dừa (142 kcal)** hoặc **Bánh Óc Chó Chuối Dẻo (165 kcal)** (nếu bạn chỉ dị ứng riêng hạnh nhân).\nNếu dị ứng nặng, bạn nên tham khảo ý kiến bác sĩ trước khi dùng nhé.`,
      recommendedProduct: sesameRedbeanProd,
      quickReplies: ['Xem Bánh Mè Đen Nut-Free', 'Xem Bánh Hạt Bí Táo Đỏ', 'Dị ứng hạt điều'],
      level: 2
    };
  }

  // 2. DỊ ỨNG HẠT ĐIỀU (Cashew Allergy)
  if (q.includes('hạt điều') && (q.includes('dị ứng') || q.includes('không ăn được') || q.includes('kiêng'))) {
    return {
      text: `Đối chiếu thành phần cho người dị ứng hạt điều:\n- **Sản phẩm KHÔNG phù hợp:** Biscotti (có hạt điều), Bánh Thanh Hạt Điều & Nam Việt Quất Uji Matcha, Granola Siêu Hạt.\n- **Sản phẩm AN TOÀN thay thế:**\n  1. **Bánh Ngói Hạnh Nhân (Tuiles Almond):** 98 kcal, chỉ dùng hạnh nhân lát, không có hạt điều.\n  2. **Bánh Thanh Protein Mè Đen & Đậu Đỏ (Nut-Free):** 100% không hạt điều, giàu đạm.\n  3. **Bánh Thanh Hạt Bí Xanh & Táo Đỏ Kỷ Tử:** Hoàn toàn không hạt điều.\n  4. **Bánh Thanh Macca & Yến Mạch Mật Dừa:** 142 kcal, giòn bùi macca.\nBạn hãy kiểm tra kỹ thành phần trên bao bì và hỏi bác sĩ nếu có tiền sử mẫn cảm nặng nhé.`,
      recommendedProduct: tuilesProd,
      quickReplies: ['Xem Bánh Ngói Hạnh Nhân', 'Bánh Mè Đen Nut-Free', 'Nhắn cho shop'],
      level: 2
    };
  }

  // 3. DỊ ỨNG QUẢ ÓC CHÓ (Walnut Allergy)
  if (q.includes('óc chó') && (q.includes('dị ứng') || q.includes('không ăn được') || q.includes('kiêng'))) {
    return {
      text: `Đối chiếu thành phần cho người dị ứng quả óc chó:\n- **Sản phẩm KHÔNG phù hợp:** Bánh Granola Quả Óc Chó & Chuối Dẻo và Hũ Granola Siêu Hạt.\n- **Sản phẩm AN TOÀN thay thế:**\n  1. **Biscotti (3 vị)** và **Bánh ngói hạnh nhân** (hoàn toàn không chứa quả óc chó).\n  2. **Bánh Thanh Mè Đen Đậu Đỏ (Nut-Free):** 9.5g đạm, 0g đường.\n  3. **Bánh Thanh Hạt Bí Xanh & Táo Đỏ:** 135 kcal, thanh mát.\n  4. **Bánh Thanh Macca & Yến Mạch:** Bùi béo macca Tây Nguyên.\nĐây là thông tin đối chiếu nhãn, bạn nên hỏi bác sĩ nếu có cơ địa dị ứng nhé.`,
      recommendedProduct: biscottiProd,
      quickReplies: ['Xem Biscotti 3 vị', 'Bánh Macca Yến Mạch', 'Nhắn cho shop'],
      level: 2
    };
  }

  // 4. DỊ ỨNG ĐẬU PHỘNG / LẠC (Peanut Allergy)
  if (q.includes('đậu phộng') || q.includes('lạc')) {
    if (q.includes('dị ứng') || q.includes('kiêng') || q.includes('không ăn được')) {
      return {
        text: `Đối chiếu thành phần cho người dị ứng đậu phộng:\n- **Sản phẩm KHÔNG phù hợp:** Bánh Thanh Bơ Đậu Phộng & Hạt Chia Giòn (chứa 30% bơ đậu phộng rang củi).\n- **Sản phẩm KHÔNG chứa thành phần đậu phộng:**\n  1. **Biscotti (3 vị)** và **Bánh ngói hạnh nhân**.\n  2. **Bánh Thanh Protein Mè Đen & Đậu Đỏ (Nut-Free)**.\n  3. **Bánh Thanh Hạt Bí Táo Đỏ** & **Bánh Macca Yến Mạch**.\n*Lưu ý an toàn:* Trên nhãn các bánh này không ghi thành phần đậu phộng, nhưng chưa có cam kết riêng về lây nhiễm chéo. Bạn có tiền sử dị ứng đậu phộng nặng hãy nhắn shop kiểm tra kỹ với xưởng và hỏi bác sĩ trước nhé.`,
        recommendedProduct: sesameRedbeanProd,
        quickReplies: ['Bánh Mè Đen Nut-Free', 'Xem Biscotti 3 vị', 'Nhắn cho shop'],
        level: 2
      };
    }
  }

  // 5. DỊ ỨNG TẤT CẢ CÁC LOẠI HẠT (Tree-nut Allergy / Nut-Free)
  if ((q.includes('dị ứng hạt') || q.includes('dị ứng tất cả') || q.includes('nut-free') || q.includes('không ăn được hạt')) && !q.includes('hạnh nhân') && !q.includes('hạt điều')) {
    return {
      text: `Nếu bạn bị dị ứng các loại hạt vỏ cứng (hạnh nhân, hạt điều, óc chó, macca), SOWELL có dòng **100% Nut-Free chuyên biệt** an toàn cho bạn:\n- **Sản phẩm khuyên dùng số 1:** **Bánh Thanh Protein Mè Đen & Đậu Đỏ Nảy Mầm (Nut-Free)**: Chỉ sử dụng hạt mè đen Điện Biên và bột đậu đỏ nảy mầm, cung cấp 9.5g đạm thực vật, 0g đường.\n- **Sản phẩm số 2:** **Bánh Thanh Hạt Bí Xanh & Táo Đỏ Kỷ Tử Dưỡng Nhan (Nut-Free)**: Chỉ dùng hạt bí xanh và táo đỏ, thơm ngọt dịu 135 kcal.\n*Sản phẩm cần tránh:* Biscotti, Bánh ngói, Bánh Macca, Bánh Óc Chó, Bánh Hạt Điều. Bạn nên đọc kỹ nhãn và hỏi ý kiến bác sĩ khi mẫn cảm nặng nhé.`,
      recommendedProduct: sesameRedbeanProd,
      quickReplies: ['Bánh Mè Đen Nut-Free', 'Bánh Hạt Bí Táo Đỏ', 'Nhắn cho shop'],
      level: 2
    };
  }

  // 6. DỊ ỨNG TRỨNG, SỮA, BƠ LẠT HOẶC ĂN THUẦN CHAY (Vegan)
  if (q.includes('thuần chay') || q.includes('vegan') || ((q.includes('trứng') || q.includes('sữa') || q.includes('bơ')) && (q.includes('dị ứng') || q.includes('kiêng')))) {
    return {
      text: `Đối chiếu thành phần cho người kiêng trứng, sữa, bơ động vật hoặc ăn thuần chay (Vegan):\n- **Sản phẩm KHÔNG phù hợp:** Biscotti (có trứng gà, bơ lạt) và Bánh ngói hạnh nhân (có lòng trắng trứng, bơ lạt).\n- **5 Dòng Bánh Thanh Ngũ Cốc 100% THUẦN CHAY (VEGAN) phù hợp hoàn hảo:**\n  1. **Bánh Thanh Protein Mè Đen & Đậu Đỏ** (Nut-Free, 9.5g đạm thực vật, 0g đường).\n  2. **Bánh Thanh Macca & Yến Mạch Mật Dừa** (142 kcal, 100% thực vật).\n  3. **Bánh Thanh Hạt Bí Xanh & Táo Đỏ Kỷ Tử** (135 kcal, 0% bơ sữa).\n  4. **Bánh Granola Quả Óc Chó & Chuối Sấy Dẻo** (165 kcal, giàu Omega-3).\n  5. **Bánh Thanh Hạt Điều & Nam Việt Quất Uji Matcha**.\nCác dòng bánh thanh này hoàn toàn không dùng trứng, không bơ sữa động vật!`,
      recommendedProduct: maccaOatProd,
      quickReplies: ['Bánh Macca Yến Mạch Vegan', 'Bánh Mè Đen Protein Vegan', 'Bánh Hạt Bí Táo Đỏ'],
      level: 2
    };
  }

  // 7. DỊ ỨNG GLUTEN / BỘT MÌ / CELIAC
  if (q.includes('gluten') || q.includes('celiac') || (q.includes('bột mì') && (q.includes('dị ứng') || q.includes('kiêng')))) {
    return {
      text: `Đối chiếu thành phần cho người kiêng Gluten / Bột mì:\n- **Biscotti và Bánh ngói hạnh nhân:** Đều chứa bột mì nguyên cám và bột mì nên **không phù hợp** với người kiêng gluten.\n- **Các dòng bánh thanh ngũ cốc:** Sử dụng yến mạch nguyên cám Úc cán dẹt (chứa gluten từ yến mạch).\n- **Lựa chọn ít mẫn cảm nhất:** **Bánh Thanh Protein Mè Đen & Đậu Đỏ Nảy Mầm** sử dụng gạo lứt huyết rồng và bột đậu đỏ nảy mầm, không sử dụng bột mì truyền thống. Tuy nhiên nếu bạn mắc bệnh Celiac nghiêm ngặt, hãy tham khảo ý kiến bác sĩ trước khi sử dụng bất kỳ sản phẩm chế biến sẵn nào nhé.`,
      recommendedProduct: sesameRedbeanProd,
      quickReplies: ['Bánh Mè Đen Đậu Đỏ', 'Thành phần Biscotti', 'Nhắn cho shop'],
      level: 2
    };
  }

  // --------------------------------------------------------------------------
  // CÁC ĐỐI TƯỢNG VÀ MỤC TIÊU SỨC KHỎE KHÁC (GYM, TIỂU ĐƯỜNG, BẦU, GIẢM MỠ)
  // --------------------------------------------------------------------------

  // 1. TẬP GYM / THỂ THAO / TĂNG CƠ / PRE-WORKOUT / HIGH-PROTEIN
  if (q.includes('gym') || q.includes('thể thao') || q.includes('tăng cơ') || q.includes('protein') || q.includes('đạm') || q.includes('pre-workout')) {
    return {
      text: `SOWELL có các dòng bánh giàu đạm tự nhiên tối ưu cho người tập gym và thể thao:\n1. **Bánh Thanh Bơ Đậu Phộng & Hạt Chia (10.2g Đạm - Đứng đầu):** Cung cấp đạm thực vật và hạt chia giữ nước cho cơ bắp, ăn trước tập 30–45 phút nạp năng lượng bền bỉ.\n2. **Bánh Thanh Protein Mè Đen & Đậu Đỏ (9.5g Đạm, 0g Đường):** Tối ưu phục hồi cơ bắp và siết cơ nạc.\n3. **Bánh Thanh Socola Đen 85% Hạnh Nhân (8.2g Đạm, chỉ 0.8g Đường):** Đậm vị cacao Tiền Giang, chuẩn Keto/Low-Carb.\n4. **Biscotti (3 vị) (7g Đạm / 50g):** Giòn chắc, nạp tinh bột hấp thu chậm trước buổi tập. Bạn có thể chọn loại phù hợp với mục tiêu tăng cơ hay siết mỡ nhé!`,
      recommendedProduct: peanutChiaProd,
      quickReplies: ['Bánh Bơ Đậu Phộng 10.2g Đạm', 'Bánh Mè Đen 9.5g Đạm', 'Bánh Socola 0.8g Đường'],
      level: 3
    };
  }

  // 2. TIỂU ĐƯỜNG / TIỀN TIỂU ĐƯỜNG / KIỂM SOÁT ĐƯỜNG HUYẾT
  if (q.includes('tiểu đường') || q.includes('đái tháo') || q.includes('đường huyết') || q.includes('tiền tiểu đường')) {
    return {
      text: `Đối với người cần kiểm soát đường huyết, việc ăn uống cần theo chỉ định điều trị của bác sĩ. SOWELL cung cấp số liệu dinh dưỡng minh bạch của các dòng bánh:\n1. **Bánh Thanh Protein Mè Đen & Đậu Đỏ (0g Đường):** Hoàn toàn không đường, vị ngọt dịu từ cỏ ngọt Stevia tự nhiên, 11.2g carb, 6g chất xơ giúp làm chậm hấp thu đường.\n2. **Bánh Thanh Socola Đen 85% & Hạnh Nhân:** Chỉ có 0.8g đường, giàu polyphenol.\n3. **Bánh Ngói (5.2g đường/20g)** & **Biscotti (10g đường/50g)**.\nCarbohydrate và đường đều tác động đến đường huyết, vì vậy bạn nên tham khảo ý kiến bác sĩ điều trị trước khi đưa vào thực đơn nhé.`,
      recommendedProduct: sesameRedbeanProd,
      quickReplies: ['Bánh Mè Đen 0g Đường', 'Bánh Socola 0.8g Đường', 'Bảng dinh dưỡng Biscotti'],
      level: 4
    };
  }

  // 3. MẸ BẦU, MANG THAI, SAU SINH
  if (q.includes('bầu') || q.includes('mang thai') || q.includes('thai kỳ') || q.includes('sau sinh') || q.includes('cho con bú')) {
    return {
      text: `Mẹ bầu và phụ nữ sau sinh có nhu cầu dinh dưỡng riêng biệt, nên tham khảo ý kiến bác sĩ sản khoa. Các dòng bánh lành mạnh của SOWELL để bạn tham khảo:\n1. **Bánh Granola Quả Óc Chó & Chuối Sấy Dẻo (165 kcal):** Hạt óc chó dồi dào Omega-3 và vitamin nhóm B tốt cho mẹ và bé, vị ngọt tự nhiên từ chuối chín.\n2. **Bánh Thanh Hạt Bí Xanh & Táo Đỏ Kỷ Tử (135 kcal):** Bổ sung sắt và kẽm thực vật, thanh thuần dễ ăn khi nghén.\n3. **Biscotti (175 kcal/50g):** Giòn chắc, hợp nhúng sữa ấm.\nBạn lưu ý kiểm tra các thành phần gây dị ứng và hỏi ý kiến bác sĩ trước khi dùng nhé.`,
      recommendedProduct: walnutBananaProd,
      quickReplies: ['Bánh Óc Chó Chuối cho mẹ bầu', 'Bánh Hạt Bí Táo Đỏ', 'Hỏi bác sĩ'],
      level: 4
    };
  }

  // 4. KIỂM SOÁT CÂN NẶNG / ĂN KIÊNG / CALO THẤP NHẤT
  if (q.includes('ít calo') || q.includes('thấp calo') || q.includes('giảm mỡ') || q.includes('giảm cân') || q.includes('béo')) {
    return {
      text: `Về mức năng lượng các dòng bánh SOWELL giúp bạn dễ dàng theo dõi calo mỗi ngày:\n- **Thấp calo nhất:** **Bánh Thanh Hạt Bí Xanh & Táo Đỏ Kỷ Tử** (Chỉ **135 kcal** / thanh 35g, 5.2g chất xơ).\n- **Xếp thứ hai:** **Bánh Thanh Hạt Điều & Nam Việt Quất Matcha** (Chỉ **138 kcal** / thanh 35g).\n- **Bánh Thanh Macca & Yến Mạch Mật Dừa:** **142 kcal** (Chuẩn bữa phụ khoa học).\n- **Bánh Ngói Hạnh Nhân:** **98 kcal** / khẩu phần 20g (2 bánh).\n- **Biscotti (3 vị):** **175 kcal** / khẩu phần 50g (~2 miếng).\nBánh giúp bạn có bữa xế lành mạnh thay thế snack dầu mỡ. Bạn có thể cân đối vào tổng calo trong ngày nhé!`,
      recommendedProduct: pumpkinRedDateProd,
      quickReplies: ['Xem Bánh Hạt Bí 135 kcal', 'Bánh Matcha 138 kcal', 'Bánh Ngói 98 kcal'],
      level: 3
    };
  }

  // 5. TRẺ EM / HỌC SINH / BÉ NHỎ
  if (q.includes('trẻ') || q.includes('bé') || q.includes('con nít') || q.includes('học sinh')) {
    return {
      text: `Với trẻ nhỏ (đặc biệt dưới 2–3 tuổi hoặc đang ăn dặm), shop khuyên không nên cho bé ăn vì bánh giòn và các mảnh hạt tiềm ẩn nguy cơ hóc đường thở, đồng thời có nguy cơ dị ứng hạt/gluten. Với các bé lớn hơn:\n- **Bánh Granola Quả Óc Chó & Chuối Sấy Dẻo:** Vị dẻo bùi tự nhiên, bổ sung Omega-3 cho bé học tập.\n- **Bánh Thanh Mè Đen Đậu Đỏ:** Dồi dào canxi và sắt thực vật, 0g đường hóa học.\nNgười lớn cần ngồi cùng quan sát khi bé ăn bánh giòn. Bạn nên tham khảo ý kiến bác sĩ nhi khoa trước khi cho bé dùng nhé.`,
      recommendedProduct: walnutBananaProd,
      quickReplies: ['Bánh Óc Chó Chuối', 'Bánh Mè Đen Nut-Free', 'Nhắn cho shop'],
      level: 4
    };
  }

  // 6. GRANOLA SIÊU HẠT (HŨ 350G)
  if (q.includes('granola') || q.includes('hũ') || q.includes('sữa chua') || q.includes('sinh tố')) {
    const granolaProd = PRODUCTS.find(p => p.id === 'sowell-granola-supernuts-jar') || PRODUCTS[7];
    return {
      text: `Hũ **Granola Siêu Hạt Nướng Mộc Mật Hoa Dừa (350g)** chứa tới 85% hạt dinh dưỡng cao cấp (Macca, Hạnh nhân, Óc chó, Hạt điều, Hạt bí) nướng cùng 15% yến mạch màng mỏng mật dừa:\n- Mỗi khẩu phần 40g (khoảng 3 thìa canh) cung cấp: **182 kcal**, **8.8g chất đạm**, **5.5g chất xơ hòa tan**, chỉ 1.5g đường tự nhiên.\n- Rất thích hợp để bạn trộn cùng sữa chua Hy Lạp, sinh tố hoa quả (Smoothie) hoặc nhâm nhi lành mạnh mỗi sáng. Bánh có chứa các loại hạt cây và yến mạch, bạn lưu ý nếu có dị ứng nhé!`,
      recommendedProduct: granolaProd,
      quickReplies: ['Xem Hũ Granola 350g', 'Bánh Thanh Macca', 'Đặt hàng ngay'],
      level: 1
    };
  }

  // 7. ĂN CẢ GÓI BISCOTTI HOẶC BÁNH NGÓI
  if (q.includes('cả gói') || q.includes('hết gói') || q.includes('1 gói') || q.includes('hết cả gói')) {
    const isTuiles = q.includes('ngói');
    if (isTuiles) {
      const calc = calculateServings('tuiles', 12.5);
      return {
        text: `Về Bánh ngói hạnh nhân gói 250 g: Gói có khoảng 12–13 khẩu phần (mỗi khẩu phần 20 g). ${calc.formulaText} Bạn có thể cân đối lượng ăn theo nhu cầu nhé.`,
        recommendedProduct: tuilesProd,
        quickReplies: ['Calo cả gói Biscotti', 'Bảng dinh dưỡng Bánh ngói'],
        level: 1
      };
    } else {
      return {
        text: `Về Biscotti:\n- Gói 100 g (2 khẩu phần): Năng lượng = 175 kcal × 2 = 350 kcal; đường = 10g × 2 = 20 g.\n- Gói 250 g (5 khẩu phần): Năng lượng = 175 kcal × 5 = 875 kcal; đường = 10g × 5 = 50 g (tương đương 100% mốc 50g đường tham chiếu WHO).\nBạn hãy cân nhắc lượng ăn phù hợp theo mục tiêu dinh dưỡng hàng ngày nhé!`,
        recommendedProduct: biscottiProd,
        quickReplies: ['Calo cả gói Bánh ngói', 'Mốc tham chiếu WHO'],
        level: 1
      };
    }
  }

  // 8. TẤT CẢ SẢN PHẨM TRÊN WEB / XEM TOÀN BỘ SẢN PHẨM
  if (q.includes('toàn bộ') || q.includes('tất cả sản phẩm') || q.includes('những loại nào') || q.includes('có những bánh gì')) {
    return {
      text: `Hiện tại trên website SOWELL có 10 dòng sản phẩm dinh dưỡng chính:\n1. **Biscotti (3 vị: Original, Choco, Matcha)**: 175 kcal/50g, giòn chắc hợp nhúng trà/cà phê.\n2. **Bánh Ngói Hạnh Nhân (Tuiles Almond)**: 98 kcal/20g, mỏng giòn thơm bơ lạt.\n3. **Dòng Nut-Free (100% không hạt vỏ cứng)**: Bánh Mè Đen Đậu Đỏ (9.5g đạm, 0g đường) & Bánh Hạt Bí Táo Đỏ (135 kcal).\n4. **Dòng Thuần Chay (Vegan)**: Bánh Macca Yến Mạch, Bánh Óc Chó Chuối, Bánh Hạt Điều Matcha.\n5. **Dòng Thể Thao / Giàu Đạm**: Bánh Bơ Đậu Phộng Hạt Chia (10.2g đạm), Bánh Socola Đen 85% (Keto).\n6. **Hũ Granola Siêu Hạt 350g**: 85% hạt dinh dưỡng. Bạn quan tâm dòng bánh nào nhất?`,
      recommendedProduct: maccaOatProd,
      quickReplies: ['Bánh Nut-Free không hạt', 'Bánh giàu đạm cho Gymer', 'Bánh ít calo nhất', 'Biscotti 3 vị'],
      level: 1
    };
  }

  // 9. SO SÁNH BISCOTTI VÀ BÁNH NGÓI
  if (q.includes('so sánh') || (q.includes('khác nhau') && q.includes('biscotti') && q.includes('ngói'))) {
    return {
      text: 'Bảng so sánh dinh dưỡng trên 1 khẩu phần giữa hai loại bánh:\n- Biscotti (50g): 175 kcal, 28g carb, 10g đường, 7g đạm, 4g béo, kết cấu giòn chắc.\n- Bánh ngói (20g): 98 kcal, 8,8g carb, 5,2g đường, 1,8g đạm, 6,2g béo, kết cấu giòn rụm, mỏng nhẹ.\nShop không đánh giá loại nào tốt hơn, bạn có thể lựa chọn theo khẩu vị và mục đích sử dụng nhé.',
      recommendedProduct: biscottiProd,
      quickReplies: ['Biscotti có cứng không?', 'Bánh ngói có ngọt không?', 'Nhắn cho shop'],
      level: 1
    };
  }

  // 10. CALO / ĐƯỜNG / HẠN DÙNG CHUNG
  if (q.includes('hạn sử dụng') || q.includes('hsd') || q.includes('bảo quản') || q.includes('bao lâu')) {
    return {
      text: 'Thông tin bảo quản và hạn sử dụng:\n- HSD khi chưa mở: 3 tháng kể từ ngày sản xuất in trên bao bì (Bánh ngói sản xuất mới mỗi ngày; các dòng thanh ngũ cốc sấy nhiệt thấp giữ giòn 6 tháng).\n- Sau khi mở túi: Giữ giòn khoảng 5–7 ngày nếu đậy kín.\n- Bảo quản nơi khô ráo, thoáng mát, tránh ẩm và ánh nắng trực tiếp. Bạn có cần hướng dẫn thêm về bảo quản bánh không?',
      recommendedProduct: biscottiProd,
      quickReplies: ['Cách làm bánh giòn lại', 'Xem toàn bộ sản phẩm', 'Nhắn cho shop'],
      level: 1
    };
  }

  // --------------------------------------------------------------------------
  // DEFAULT INTELLIGENT FALLBACK
  // --------------------------------------------------------------------------
  return {
    text: `Chào bạn, mình là Trợ lý tư vấn dinh dưỡng của SOWELL! Shop hiện có đầy đủ các dòng bánh đáp ứng cho mọi chế độ ăn:\n- **Biscotti (3 vị)** & **Bánh ngói hạnh nhân** giòn rụm thơm bơ.\n- **Dòng Nut-Free (không hạt vỏ cứng)**: Bánh Mè Đen Đậu Đỏ (0g đường, 9.5g đạm) & Bánh Hạt Bí Táo Đỏ (135 kcal).\n- **Dòng Thuần Chay (Vegan)**: Bánh Macca Yến Mạch, Bánh Óc Chó Chuối.\n- **Dòng Thể Thao**: Bánh Bơ Đậu Phộng Hạt Chia (10.2g đạm).\nBạn đang tìm bánh cho mục tiêu nào hoặc cần loại trừ chất gây dị ứng nào không?`,
    recommendedProduct: biscottiProd,
    quickReplies: [
      'Tôi dị ứng hạnh nhân',
      'Bánh cho người ăn chay (Vegan)',
      'Bánh cho người tập gym',
      'Người tiểu đường ăn loại nào?',
      'Bánh nào ít calo nhất?'
    ],
    level: 1
  };
}
