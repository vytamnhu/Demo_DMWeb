import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ALL_ALLERGENS } from '../../data/productsData';
import { Allergen, Product, CartItem } from '../../types';
import confetti from 'canvas-confetti';
import { 
  Box, 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Gift, 
  Sparkles,
  RotateCcw,
  ShieldAlert,
  Check,
  Wand2
} from 'lucide-react';

type PresetKey =
  | 'bestseller'
  | 'eatclean_lowcal'
  | 'high_protein'
  | 'keto_sugarfree'
  | 'vegan'
  | 'maternity_beauty'
  | 'nut_free'
  | 'all_flavors';

interface PresetMixConfig {
  id: PresetKey;
  label: string;
  badge: string;
  desc: string;
  productIds: string[];
}

const PRESET_MIXES: PresetMixConfig[] = [
  {
    id: 'bestseller',
    label: 'Mix Bán Chạy Nhất',
    badge: 'Phổ biến',
    desc: 'Sự kết hợp cân bằng giữa 3 hương vị được yêu thích nhất: Macca Mật Dừa, Socola Đen 85% và Uji Matcha.',
    productIds: [
      'sowell-bar-macca-oat',
      'sowell-bar-dark-choco-almond',
      'sowell-bar-matcha-berry-cashew'
    ]
  },
  {
    id: 'eatclean_lowcal',
    label: 'Eat Clean & Giảm Mỡ',
    badge: '≤ 142 kcal',
    desc: 'Ưu tiên 3 dòng bánh có mức năng lượng thấp nhất (135 – 142 kcal/thanh) và giàu xơ hòa tan giúp no lâu, giữ dáng.',
    productIds: [
      'sowell-bar-pumpkin-red-date',
      'sowell-bar-matcha-berry-cashew',
      'sowell-bar-macca-oat'
    ]
  },
  {
    id: 'high_protein',
    label: 'Tập Gym & Tăng Cơ',
    badge: 'Giàu Protein',
    desc: 'Tối ưu 8.2g – 10.2g Đạm thực vật mỗi thanh, hỗ trợ nạp năng lượng trước tập (Pre-workout) và phục hồi cơ bắp.',
    productIds: [
      'sowell-bar-peanut-butter-chia',
      'sowell-bar-sesame-redbean-protein',
      'sowell-bar-dark-choco-almond'
    ]
  },
  {
    id: 'keto_sugarfree',
    label: 'Keto & Tiểu Đường',
    badge: '0g – 1g Đường',
    desc: 'Chỉ số đường huyết cực thấp (Low GI), dùng cỏ ngọt Stevia tự nhiên, hạn chế tối đa tinh bột chuyển hóa nhanh.',
    productIds: [
      'sowell-bar-sesame-redbean-protein',
      'sowell-bar-dark-choco-almond',
      'sowell-bar-peanut-butter-chia'
    ]
  },
  {
    id: 'vegan',
    label: 'Thuần Chay (Vegan)',
    badge: '100% Thực vật',
    desc: 'Hoàn toàn từ hạt và thảo mộc tự nhiên, không chứa trứng, sữa hay bơ động vật.',
    productIds: [
      'sowell-bar-macca-oat',
      'sowell-bar-walnut-banana',
      'sowell-bar-sesame-redbean-protein',
      'sowell-bar-pumpkin-red-date'
    ]
  },
  {
    id: 'maternity_beauty',
    label: 'Mẹ Bầu & Dưỡng Nhan',
    badge: 'Omega-3 & Sắt',
    desc: 'Giàu Omega-3 từ quả óc chó, Sắt & Canxi từ mè đen, táo đỏ và kỷ tử, an toàn cho mẹ bầu và sau sinh.',
    productIds: [
      'sowell-bar-walnut-banana',
      'sowell-bar-pumpkin-red-date',
      'sowell-bar-sesame-redbean-protein'
    ]
  },
  {
    id: 'nut_free',
    label: 'Không Hạt Vỏ Cứng',
    badge: 'Nut-Free',
    desc: 'An toàn cho người dị ứng các loại hạt vỏ cứng (không hạnh nhân, không hạt điều, không óc chó, không đậu phộng).',
    productIds: [
      'sowell-bar-sesame-redbean-protein',
      'sowell-bar-pumpkin-red-date'
    ]
  },
  {
    id: 'all_flavors',
    label: 'Trải Nghiệm Đủ 7 Vị',
    badge: 'Đa dạng',
    desc: 'Phối trọn bộ tất cả 7 hương vị thanh hạt SOWELL để bạn đổi vị mỗi ngày trong tuần không sợ ngán.',
    productIds: [
      'sowell-bar-macca-oat',
      'sowell-bar-dark-choco-almond',
      'sowell-bar-matcha-berry-cashew',
      'sowell-bar-walnut-banana',
      'sowell-bar-sesame-redbean-protein',
      'sowell-bar-pumpkin-red-date',
      'sowell-bar-peanut-butter-chia'
    ]
  }
];

export const CustomComboBuilder: React.FC = () => {
  const { isComboBuilderOpen, setIsComboBuilderOpen, addComboToCart, products } = useStore();

  // Filter States (Inline, non-blocking)
  const [selectedDiet, setSelectedDiet] = useState<string>('ALL');
  const [excludedAllergens, setExcludedAllergens] = useState<Allergen[]>([]);
  const [showAllergenPanel, setShowAllergenPanel] = useState(false);

  // Active Preset State
  const [activePreset, setActivePreset] = useState<PresetKey | 'custom'>('bestseller');

  // Box Configuration (6, 12, or 24 bars)
  const [boxSize, setBoxSize] = useState<6 | 12 | 24>(12);
  const [boxItems, setBoxItems] = useState<{ [productId: string]: number }>({
    'sowell-bar-macca-oat': 4,
    'sowell-bar-dark-choco-almond': 4,
    'sowell-bar-matcha-berry-cashew': 4
  });

  // Gift card message
  const [showGiftInput, setShowGiftInput] = useState(false);
  const [giftMessage, setGiftMessage] = useState<string>('');

  // Discount tiers
  const comboDiscounts: Record<6 | 12 | 24, number> = {
    6: 10,
    12: 18,
    24: 25
  };

  // All mixable bar products
  const barProducts = useMemo(() => {
    return products.filter((p) => p.category === 'cereal-bars');
  }, [products]);

  // Filtered products based on inline diet & allergen pills
  const availableProducts = useMemo(() => {
    return barProducts.filter((p) => {
      if (selectedDiet !== 'ALL' && !p.dietaryTags.some(tag => tag.toLowerCase() === selectedDiet.toLowerCase())) {
        return false;
      }
      if (excludedAllergens.length > 0) {
        const containsExcluded = p.allergens.some((a) => excludedAllergens.includes(a));
        if (containsExcluded) return false;
      }
      return true;
    });
  }, [barProducts, selectedDiet, excludedAllergens]);

  // Helper to distribute `size` bars across `ids`
  const distributeBars = (ids: string[], size: number) => {
    const newMix: { [productId: string]: number } = {};
    if (ids.length === 0) return newMix;
    const baseCount = Math.floor(size / ids.length);
    let remainder = size % ids.length;

    ids.forEach((id) => {
      const add = baseCount + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
      if (add > 0) newMix[id] = add;
    });
    return newMix;
  };

  // Handle changing box size & automatically re-distribute if a preset is active, or trim if custom
  const handleSelectBoxSize = (newSize: 6 | 12 | 24) => {
    setBoxSize(newSize);
    if (activePreset !== 'custom') {
      const presetConfig = PRESET_MIXES.find((p) => p.id === activePreset);
      if (presetConfig) {
        const safeIds = presetConfig.productIds.filter((id) => {
          const prod = products.find((p) => p.id === id);
          return prod && !prod.allergens.some((a) => excludedAllergens.includes(a));
        });
        const pool = safeIds.length > 0 ? safeIds : availableProducts.map((p) => p.id);
        setBoxItems(distributeBars(pool, newSize));
        return;
      }
    }

    const currentTotal = Object.values(boxItems).reduce((s, c) => s + c, 0);
    if (currentTotal > newSize) {
      let remainingAllowed = newSize;
      const trimmed: { [productId: string]: number } = {};
      for (const [pId, count] of Object.entries(boxItems)) {
        if (remainingAllowed <= 0) break;
        const take = Math.min(count, remainingAllowed);
        if (take > 0) {
          trimmed[pId] = take;
          remainingAllowed -= take;
        }
      }
      setBoxItems(trimmed);
    }
  };

  // Toggle allergen exclusion and remove any already-selected bars that contain that allergen
  const toggleAllergen = (allergen: Allergen) => {
    const isCurrentlyExcluded = excludedAllergens.includes(allergen);
    const nextAllergens = isCurrentlyExcluded
      ? excludedAllergens.filter((a) => a !== allergen)
      : [...excludedAllergens, allergen];

    setExcludedAllergens(nextAllergens);

    if (!isCurrentlyExcluded) {
      setBoxItems((prev) => {
        const updated = { ...prev };
        for (const pId of Object.keys(updated)) {
          const prod = products.find((p) => p.id === pId);
          if (prod && prod.allergens.includes(allergen)) {
            delete updated[pId];
          }
        }
        return updated;
      });
    }
  };

  // Apply 1-click preset mix
  const applyPresetMix = (presetKey: PresetKey) => {
    const presetConfig = PRESET_MIXES.find((p) => p.id === presetKey);
    if (!presetConfig) return;

    setActivePreset(presetKey);
    setSelectedDiet('ALL');

    const safeIds = presetConfig.productIds.filter((id) => {
      const p = products.find((prod) => prod.id === id);
      return p && !p.allergens.some((a) => excludedAllergens.includes(a));
    });

    const pool = safeIds.length > 0 ? safeIds : availableProducts.map((p) => p.id);
    if (pool.length === 0) return;

    setBoxItems(distributeBars(pool, boxSize));
  };

  // Auto-fill remaining empty slots
  const autoFillRemaining = () => {
    const currentTotal = Object.values(boxItems).reduce((s, c) => s + c, 0);
    const needed = boxSize - currentTotal;
    if (needed <= 0 || availableProducts.length === 0) return;

    const firstAvailable = availableProducts[0].id;
    setBoxItems((prev) => ({
      ...prev,
      [firstAvailable]: (prev[firstAvailable] || 0) + needed
    }));
  };

  // Total bars & remaining slots
  const totalSelectedBars = Object.values(boxItems).reduce((sum, count) => sum + count, 0);
  const isBoxFull = totalSelectedBars === boxSize;
  const remainingSlots = Math.max(0, boxSize - totalSelectedBars);

  // Financial & Nutrition calculations
  const { originalSubtotal, totalProtein, avgCalories } = useMemo(() => {
    let subtotal = 0;
    let protein = 0;
    let calories = 0;
    let countTotal = 0;

    Object.entries(boxItems).forEach(([pId, count]) => {
      const prod = products.find((p) => p.id === pId);
      if (prod && count > 0) {
        subtotal += prod.price * count;
        protein += prod.nutrition.protein * count;
        calories += prod.nutrition.calories * count;
        countTotal += count;
      }
    });

    return {
      originalSubtotal: subtotal,
      totalProtein: Math.round(protein * 10) / 10,
      avgCalories: countTotal > 0 ? Math.round(calories / countTotal) : 0
    };
  }, [boxItems, products]);

  const discountRate = comboDiscounts[boxSize];
  const discountAmount = Math.round((originalSubtotal * discountRate) / 100);
  const finalComboPrice = originalSubtotal - discountAmount;

  // Update bar count manually
  const updateBarCount = (productId: string, delta: number) => {
    const current = boxItems[productId] || 0;
    if (delta > 0 && totalSelectedBars >= boxSize) return;
    const nextCount = Math.max(0, Math.min(current + delta, current + remainingSlots));

    setActivePreset('custom');
    setBoxItems((prev) => {
      const updated = { ...prev, [productId]: nextCount };
      if (nextCount === 0) delete updated[productId];
      return updated;
    });
  };

  // Visual slots array
  const visualSlots = useMemo(() => {
    const slots: (Product | null)[] = [];
    Object.entries(boxItems).forEach(([pId, count]) => {
      const prod = products.find((p) => p.id === pId);
      if (prod) {
        for (let i = 0; i < count; i++) {
          slots.push(prod);
        }
      }
    });
    while (slots.length < boxSize) {
      slots.push(null);
    }
    return slots;
  }, [boxItems, boxSize, products]);

  // Complete & Add to Cart
  const handleAddComboToCart = () => {
    if (!isBoxFull) return;

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.65 }
      });
    } catch {
      // ignore
    }

    const itemsSummary = Object.entries(boxItems).map(([pId, count]) => {
      const prod = products.find((p) => p.id === pId)!;
      return { product: prod, count };
    });

    const activePresetLabel = activePreset !== 'custom'
      ? PRESET_MIXES.find((p) => p.id === activePreset)?.label || 'Mix Tự Chọn'
      : 'Mix Tự Chọn';

    const comboItem: CartItem = {
      id: `combo-${Date.now()}`,
      name: `Combo ${activePresetLabel} (${boxSize} Thanh)`,
      price: finalComboPrice,
      quantity: 1,
      image: itemsSummary[0]?.product.images[0] || products[0].images[0],
      isCustomCombo: true,
      variantDescription: itemsSummary
        .map((i) => `${i.count}x ${i.product.name.replace('Bánh Thanh Ngũ Cốc ', '').replace('Bánh Thanh ', '').replace('Bánh Granola Nướng Mộc ', '')}`)
        .join(', '),
      comboDetails: {
        boxSize,
        dietaryGoal: activePresetLabel,
        excludedAllergens,
        items: itemsSummary,
        giftMessage: giftMessage.trim() || undefined
      }
    };

    addComboToCart(comboItem);
    setIsComboBuilderOpen(false);
  };

  if (!isComboBuilderOpen) return null;

  const dietTabs = [
    { label: 'Tất cả (7 vị)', value: 'ALL' },
    { label: 'Eat Clean', value: 'Eat Clean' },
    { label: 'Giàu Protein', value: 'Giàu Protein' },
    { label: 'Không đường', value: 'Không đường' },
    { label: 'Keto', value: 'Keto' },
    { label: 'Thuần Chay', value: 'Vegan' },
    { label: 'Mẹ bầu', value: 'Mẹ bầu' },
    { label: 'Không hạt (Nut-Free)', value: 'Nut-Free' },
  ];

  const currentPresetInfo = activePreset !== 'custom'
    ? PRESET_MIXES.find((p) => p.id === activePreset)
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-6xl w-full max-h-[94vh] shadow-2xl border border-stone-200/80 flex flex-col overflow-hidden my-auto animate-scaleUp">
        
        {/* Clean Studio Header */}
        <div className="bg-white border-b border-stone-200/80 px-5 py-4 sm:px-7 sm:py-5 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#163824] text-white flex items-center justify-center shrink-0">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-extrabold text-lg sm:text-xl text-[#163824] tracking-tight">
                  COMBO Mix Vị Tự Chọn
                </h2>
                <span className="bg-[#EEF6F0] text-[#1E7547] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  Tiết kiệm tới 25%
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Chọn nhanh gói phối sẵn theo chế độ ăn hoặc tự tay chọn từng vị bánh vào hộp 6, 12, 24 thanh
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsComboBuilderOpen(false)}
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer shrink-0"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Split-View Studio Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
            
            {/* LEFT COLUMN: PRESET MIXES, FILTERS & FLAVOR CATALOG (7 cols) */}
            <div className="lg:col-span-7 p-5 sm:p-7 space-y-5 lg:border-r lg:border-stone-200/70">
              
              {/* 1. Rich Multi-Diet Preset Combos */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#163824] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#1E7547]" />
                    Gợi ý phối nhanh theo chế độ ăn (1 chạm):
                  </span>
                  {activePreset === 'custom' && (
                    <span className="text-[11px] font-semibold text-stone-400">
                      Đang tự chỉnh tay
                    </span>
                  )}
                </div>

                {/* 8 Diet Preset Pills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_MIXES.map((preset) => {
                    const isSelected = activePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPresetMix(preset.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#163824] text-white border-[#163824] shadow-xs'
                            : 'bg-[#FAF8F5] hover:bg-[#EEF6F0]/60 text-[#163824] border-stone-200/80 hover:border-[#1E7547]/40'
                        }`}
                      >
                        <span className={`text-[10px] font-semibold block ${
                          isSelected ? 'text-emerald-300' : 'text-[#1E7547]'
                        }`}>
                          {preset.badge}
                        </span>
                        <span className="font-bold text-xs leading-snug mt-0.5 block">
                          {preset.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Preset Explanation Note */}
                {currentPresetInfo && (
                  <div className="pt-2 border-t border-stone-100 flex items-start gap-2 text-[11px] text-stone-600">
                    <Check className="w-3.5 h-3.5 text-[#1E7547] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#163824]">{currentPresetInfo.label}:</strong> {currentPresetInfo.desc}
                    </span>
                  </div>
                )}
              </div>

              {/* 2. Inline Filter Pills + Allergen Exclusion Toggle */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {dietTabs.map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => setSelectedDiet(tab.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          selectedDiet === tab.value
                            ? 'bg-[#163824] text-white'
                            : 'bg-white text-stone-600 border border-stone-200/80 hover:border-stone-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowAllergenPanel(!showAllergenPanel)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 border transition-all cursor-pointer ${
                      showAllergenPanel || excludedAllergens.length > 0
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-white text-stone-600 border-stone-200/80 hover:border-stone-300'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Lọc dị ứng</span>
                    {excludedAllergens.length > 0 && (
                      <span className="bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {excludedAllergens.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Collapsible Allergen Filter Strip */}
                {showAllergenPanel && (
                  <div className="bg-white p-4 rounded-2xl border border-stone-200/80 space-y-2.5 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-700">
                        Chọn thành phần bạn muốn loại trừ khỏi hộp bánh:
                      </span>
                      {excludedAllergens.length > 0 && (
                        <button
                          onClick={() => setExcludedAllergens([])}
                          className="text-stone-400 hover:text-stone-700 text-[11px] cursor-pointer"
                        >
                          Bỏ chọn tất cả
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ALL_ALLERGENS.map((alg) => {
                        const isExcluded = excludedAllergens.includes(alg.value as Allergen);
                        return (
                          <button
                            key={alg.value}
                            onClick={() => toggleAllergen(alg.value as Allergen)}
                            className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-all cursor-pointer ${
                              isExcluded
                                ? 'bg-rose-50 text-rose-700 border-rose-300 font-semibold line-through'
                                : 'bg-stone-50 text-stone-600 border-stone-200/70 hover:border-stone-300'
                            }`}
                          >
                            <span>{alg.label}</span>
                            {isExcluded && <X className="w-3 h-3 text-rose-500" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Flavor Selection Cards */}
              <div className="space-y-2.5">
                {availableProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-stone-200/70 space-y-2">
                    <p className="text-sm font-bold text-[#163824]">
                      Không có vị bánh nào khớp bộ lọc hiện tại
                    </p>
                    <button
                      onClick={() => {
                        setSelectedDiet('ALL');
                        setExcludedAllergens([]);
                      }}
                      className="text-xs font-semibold text-[#1E7547] underline cursor-pointer"
                    >
                      Hiển thị lại tất cả các vị
                    </button>
                  </div>
                ) : (
                  availableProducts.map((product) => {
                    const count = boxItems[product.id] || 0;
                    const shortName = product.name
                      .replace('Bánh Thanh Ngũ Cốc ', '')
                      .replace('Bánh Thanh ', '')
                      .replace('Bánh Granola Nướng Mộc ', '');

                    return (
                      <div
                        key={product.id}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3.5 ${
                          count > 0
                            ? 'bg-white border-[#1E7547] shadow-xs'
                            : 'bg-white/80 border-stone-200/70 hover:border-stone-300'
                        }`}
                      >
                        {/* Thumbnail with active count badge */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                          <img
                            src={product.images[0]}
                            alt={shortName}
                            className="w-full h-full object-cover"
                          />
                          {count > 0 && (
                            <span className="absolute top-1 left-1 bg-[#163824] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-md shadow-xs">
                              ×{count}
                            </span>
                          )}
                        </div>

                        {/* Flavor Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-bold text-sm text-[#163824] truncate">
                              {shortName}
                            </h4>
                          </div>
                          <p className="text-xs text-stone-500 truncate mt-0.5">
                            {product.tagline}
                          </p>

                          {/* Nutrition & Price Pills */}
                          <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px]">
                            <span className="font-bold text-[#163824]">
                              {product.price.toLocaleString('vi-VN')}₫
                            </span>
                            <span className="text-stone-300">|</span>
                            <span className="text-stone-600 font-medium">
                              {product.nutrition.calories} kcal
                            </span>
                            <span className="bg-[#EEF6F0] text-[#1E7547] px-2 py-0.2 rounded font-semibold">
                              {product.nutrition.protein}g Đạm
                            </span>
                            <span className="text-stone-500">
                              {product.nutrition.totalSugars}g Đường
                            </span>
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {count > 0 ? (
                            <div className="flex items-center bg-[#FAF8F5] border border-stone-200 rounded-full p-1">
                              <button
                                onClick={() => updateBarCount(product.id, -1)}
                                className="w-7 h-7 rounded-full bg-white hover:bg-stone-100 text-stone-700 flex items-center justify-center transition-colors border border-stone-200/80 cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-7 text-center font-bold text-xs text-[#163824]">
                                {count}
                              </span>
                              <button
                                onClick={() => updateBarCount(product.id, 1)}
                                disabled={isBoxFull}
                                className="w-7 h-7 rounded-full bg-[#163824] hover:bg-[#1E7547] text-white flex items-center justify-center transition-colors disabled:opacity-30 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => updateBarCount(product.id, 1)}
                              disabled={isBoxFull}
                              className="bg-[#EEF6F0] hover:bg-[#163824] text-[#163824] hover:text-white px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-40 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Chọn vị</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* RIGHT COLUMN: INTERACTIVE BOX TRAY & CHECKOUT SUMMARY (5 cols) */}
            <div className="lg:col-span-5 bg-white p-5 sm:p-7 flex flex-col justify-between space-y-6">
              
              <div className="space-y-5">
                
                {/* 1. Box Size Tier Selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
                    1. Chọn quy cách hộp combo
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { size: 6 as const, label: 'Hộp 6 Thanh', discount: '-10%', tag: 'Dùng thử' },
                      { size: 12 as const, label: 'Hộp 12 Thanh', discount: '-18%', tag: 'Phổ biến' },
                      { size: 24 as const, label: 'Hộp 24 Thanh', discount: '-25%', tag: 'Tốt nhất' }
                    ].map((tier) => {
                      const active = boxSize === tier.size;
                      return (
                        <button
                          key={tier.size}
                          onClick={() => handleSelectBoxSize(tier.size)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                            active
                              ? 'bg-[#163824] text-white border-[#163824] shadow-sm'
                              : 'bg-[#FAF8F5] text-[#163824] border-stone-200/80 hover:border-stone-300'
                          }`}
                        >
                          <span className={`text-[10px] font-semibold block ${
                            active ? 'text-emerald-300' : 'text-stone-400'
                          }`}>
                            {tier.tag}
                          </span>
                          <span className="font-extrabold text-sm block mt-0.5">
                            {tier.label}
                          </span>
                          <span className={`inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            active
                              ? 'bg-white/15 text-white'
                              : 'bg-[#EEF6F0] text-[#1E7547]'
                          }`}>
                            {tier.discount}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Visual Box Tray */}
                <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-stone-200/80 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#163824]">
                        Khay hộp của bạn ({totalSelectedBars}/{boxSize} thanh)
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {isBoxFull
                          ? 'Đã lấp đầy hộp • Sẵn sàng đặt hàng'
                          : `Chọn thêm ${remainingSlots} thanh để nhận ưu đãi -${discountRate}%`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isBoxFull && (
                        <button
                          onClick={autoFillRemaining}
                          className="text-[11px] font-semibold text-[#1E7547] hover:underline flex items-center gap-1 cursor-pointer"
                          title="Tự động lấp đầy các ô còn trống"
                        >
                          <Wand2 className="w-3 h-3" />
                          <span>Lấp đầy</span>
                        </button>
                      )}
                      {totalSelectedBars > 0 && (
                        <button
                          onClick={() => {
                            setActivePreset('custom');
                            setBoxItems({});
                          }}
                          className="text-[11px] text-stone-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                          title="Làm trống hộp"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Xóa</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-stone-200/80 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isBoxFull ? 'bg-[#1E7547]' : 'bg-[#163824]'
                      }`}
                      style={{ width: `${Math.min(100, (totalSelectedBars / boxSize) * 100)}%` }}
                    />
                  </div>

                  {/* Visual Slot Grid */}
                  <div className="grid grid-cols-6 gap-2 pt-1">
                    {visualSlots.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => item && updateBarCount(item.id, -1)}
                        className={`aspect-square rounded-xl border flex items-center justify-center relative overflow-hidden transition-all ${
                          item
                            ? 'border-[#1E7547]/40 bg-white shadow-2xs cursor-pointer group'
                            : 'border-dashed border-stone-300/80 bg-stone-100/60'
                        }`}
                        title={item ? `${item.name} (Bấm để bỏ)` : `Ô trống ${idx + 1}`}
                      >
                        {item ? (
                          <>
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <X className="w-3.5 h-3.5" />
                            </div>
                          </>
                        ) : (
                          <span className="text-[10px] font-semibold text-stone-300">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Live Nutrition Summary of the Box */}
                  {totalSelectedBars > 0 && (
                    <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                      <span>Dinh dưỡng hộp:</span>
                      <div className="flex items-center gap-3 font-medium text-stone-700">
                        <span>TB <strong>{avgCalories} kcal</strong>/thanh</span>
                        <span>•</span>
                        <span className="text-[#1E7547]">Tổng <strong>{totalProtein}g Đạm</strong></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Optional Gift Card Message */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowGiftInput(!showGiftInput)}
                    className="text-xs font-semibold text-stone-600 hover:text-[#163824] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Gift className="w-3.5 h-3.5 text-[#1E7547]" />
                    <span>{showGiftInput ? 'Ẩn lời nhắn thiệp quà tặng' : '+ Thêm thiệp viết tay miễn phí'}</span>
                  </button>

                  {showGiftInput && (
                    <textarea
                      rows={2}
                      placeholder="Nhập lời chúc gửi kèm hộp bánh..."
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="mt-2 w-full bg-[#FAF8F5] text-xs p-3 rounded-xl border border-stone-200/80 focus:outline-none focus:border-[#1E7547]"
                    />
                  )}
                </div>

              </div>

              {/* 4. Checkout Breakdown & Primary CTA */}
              <div className="pt-4 border-t border-stone-200/80 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>Giá lẻ ({totalSelectedBars} thanh):</span>
                    <span>{originalSubtotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="flex justify-between text-[#1E7547] font-semibold">
                    <span>Ưu đãi Combo {boxSize} thanh (-{discountRate}%):</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-stone-100">
                    <span className="font-bold text-sm text-[#163824]">Thành tiền:</span>
                    <span className="text-2xl font-extrabold text-[#163824]">
                      {finalComboPrice.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

                {isBoxFull ? (
                  <button
                    onClick={handleAddComboToCart}
                    className="w-full bg-[#163824] hover:bg-[#1E7547] text-white py-3.5 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Thêm Combo Vào Giỏ Hàng</span>
                  </button>
                ) : (
                  <button
                    onClick={autoFillRemaining}
                    className="w-full bg-[#EEF6F0] hover:bg-[#E0F0E4] text-[#163824] py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-[#1E7547]" />
                    <span>Chọn thêm {remainingSlots} vị nữa (Bấm để tự lấp đầy)</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
