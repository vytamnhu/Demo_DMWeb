import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ALL_ALLERGENS, ALL_DIETARY_OPTIONS } from '../../data/productsData';
import { Allergen, Product, CartItem } from '../../types';
import confetti from 'canvas-confetti';
import { 
  Box, 
  X, 
  Check, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Gift, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Flame,
  ShieldCheck
} from 'lucide-react';

export const CustomComboBuilder: React.FC = () => {
  const { isComboBuilderOpen, setIsComboBuilderOpen, addComboToCart, products } = useStore();

  // Wizard Steps: 1: Diet -> 2: Allergens -> 3: Select Box & Fill Bars -> 4: Review & Add
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Dietary Goal
  const [selectedDiet, setSelectedDiet] = useState<string>('Eat Clean');

  // Step 2: Allergens Exclusion
  const [excludedAllergens, setExcludedAllergens] = useState<Allergen[]>([]);

  // Step 3: Box Size (6, 12, or 24)
  const [boxSize, setBoxSize] = useState<6 | 12 | 24>(12);
  const [boxItems, setBoxItems] = useState<{ [productId: string]: number }>({
    'sowell-bar-macca-oat': 4,
    'sowell-bar-dark-choco-almond': 4,
    'sowell-bar-matcha-berry-cashew': 4
  });

  // Gift card message
  const [giftMessage, setGiftMessage] = useState<string>('');

  // Discount percentages by box size
  const comboDiscounts: Record<number, number> = {
    6: 10,   // -10%
    12: 18,  // -18% (Best value)
    24: 25   // -25% (Family pack)
  };

  // Toggle allergen
  const toggleAllergen = (allergen: Allergen) => {
    setExcludedAllergens((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
    );
  };

  // Filter products matching Step 1 & Step 2
  const availableProducts = useMemo(() => {
    return products.filter((p) => {
      // Must not be a jar (only single bars for box filler)
      if (p.category !== 'cereal-bars') return false;

      // Check dietary match if specified
      if (selectedDiet && !p.dietaryTags.some(tag => tag.toLowerCase() === selectedDiet.toLowerCase())) {
        if (selectedDiet !== 'Eat Clean' && !p.dietaryTags.includes('Eat Clean')) {
          return false;
        }
      }

      // Check allergens exclusion
      if (excludedAllergens.length > 0) {
        const containsExcluded = p.allergens.some((a) => excludedAllergens.includes(a));
        if (containsExcluded) return false;
      }

      return true;
    });
  }, [products, selectedDiet, excludedAllergens]);

  // Total bars currently in box
  const totalSelectedBars = Object.values(boxItems).reduce((sum, count) => sum + count, 0);
  const isBoxFull = totalSelectedBars === boxSize;
  const remainingSlots = Math.max(0, boxSize - totalSelectedBars);

  // Financial calculations
  const originalSubtotal = Object.entries(boxItems).reduce((sum, [pId, count]) => {
    const prod = products.find((p) => p.id === pId);
    return sum + (prod ? prod.price * count : 0);
  }, 0);

  const discountRate = comboDiscounts[boxSize] || 10;
  const discountAmount = Math.round((originalSubtotal * discountRate) / 100);
  const finalComboPrice = originalSubtotal - discountAmount;

  // Add / remove bar from box
  const updateBarCount = (productId: string, delta: number) => {
    const current = boxItems[productId] || 0;
    if (delta > 0 && totalSelectedBars >= boxSize) return; // box is full
    const nextCount = Math.max(0, current + delta);

    setBoxItems((prev) => {
      const updated = { ...prev, [productId]: nextCount };
      if (nextCount === 0) delete updated[productId];
      return updated;
    });
  };

  // Generate visual slots array
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

  // Handle Complete Combo & Add to Cart
  const handleAddComboToCart = () => {
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const itemsSummary = Object.entries(boxItems).map(([pId, count]) => {
      const prod = products.find((p) => p.id === pId)!;
      return { product: prod, count };
    });

    const comboItem: CartItem = {
      id: `combo-${Date.now()}`,
      name: `Hộp SOWELL Custom ${boxSize} Thanh [${selectedDiet}]`,
      price: finalComboPrice,
      quantity: 1,
      image: itemsSummary[0]?.product.images[0] || products[0].images[0],
      isCustomCombo: true,
      variantDescription: itemsSummary.map(i => `${i.count}x ${i.product.name.replace('Bánh Thanh Ngũ Cốc ', '')}`).join(', '),
      comboDetails: {
        boxSize,
        dietaryGoal: selectedDiet,
        excludedAllergens,
        items: itemsSummary,
        giftMessage: giftMessage.trim() || undefined
      }
    };

    addComboToCart(comboItem);
    setIsComboBuilderOpen(false);
  };

  if (!isComboBuilderOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-[#E8E2D5] flex flex-col my-auto animate-scaleUp">
        
        {/* Luxury Header */}
        <div className="bg-[#153E26] text-white p-5 sm:p-6 relative shadow-md">
          <button
            onClick={() => setIsComboBuilderOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E59828] text-white flex items-center justify-center shadow-lg font-bold text-2xl shrink-0">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg sm:text-xl">
                  Tự Phối Hộp Bánh SOWELL Custom
                </h3>
                <span className="bg-[#E59828] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Ưu đãi đến -25%
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 mt-1">
                Tự do mix các vị bánh bạn yêu thích theo chế độ ăn riêng, AI tự động loại trừ dị ứng.
              </p>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/15 text-xs">
            {[
              { stepNum: 1, label: '1. Chế độ ăn' },
              { stepNum: 2, label: '2. Lọc dị ứng' },
              { stepNum: 3, label: '3. Xếp bánh vào hộp' },
              { stepNum: 4, label: '4. Hoàn tất' }
            ].map((s) => (
              <button
                key={s.stepNum}
                onClick={() => setCurrentStep(s.stepNum as any)}
                className={`py-1.5 px-2 rounded-xl text-center font-bold transition-all text-[11px] sm:text-xs cursor-pointer ${
                  currentStep === s.stepNum
                    ? 'bg-white text-[#153E26] shadow-sm'
                    : currentStep > s.stepNum
                    ? 'bg-white/20 text-white'
                    : 'text-white/40'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wizard Body */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto space-y-6">
          
          {/* STEP 1: CHỌN CHẾ ĐỘ ĂN */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center max-w-lg mx-auto mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E7547] bg-[#EBF7EE] px-3.5 py-1.5 rounded-full border border-[#BCE8C6]">
                  Bước 1: Chọn Chế Độ Ăn
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-zinc-900 mt-2">
                  Hộp bánh này phục vụ mục tiêu dinh dưỡng nào của bạn?
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {ALL_DIETARY_OPTIONS.map((opt) => {
                  const isSelected = selectedDiet === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => setSelectedDiet(opt.value)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#EBF7EE] border-[#1E7547] shadow-md scale-102'
                          : 'bg-white border-[#E8E2D5] hover:border-zinc-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{opt.icon}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-[#1E7547]" />
                          )}
                        </div>
                        <h5 className="font-bold text-sm text-[#1C2D20]">{opt.label}</h5>
                        <p className="text-xs text-zinc-500 mt-1">{opt.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-[#1E7547] hover:bg-[#165a36] text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Tiếp tục: Sàng lọc dị ứng</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SÀNG LỌC DỊ ỨNG */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center max-w-lg mx-auto mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#FEF4E5] px-3.5 py-1.5 rounded-full border border-[#FCD34D]">
                  Bước 2: Sàng Lọc Dị Ứng
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-zinc-900 mt-2">
                  Bạn hoặc người nhận có dị ứng với thành phần nào sau đây?
                </h4>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Hệ thống AI sẽ ngay lập tức loại bỏ các thanh bánh chứa thành phần đã chọn để đảm bảo an toàn tuyệt đối.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ALL_ALLERGENS.map((allergen) => {
                  const isExcluded = excludedAllergens.includes(allergen.value as Allergen);
                  return (
                    <button
                      key={allergen.value}
                      onClick={() => toggleAllergen(allergen.value as Allergen)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                        isExcluded
                          ? 'bg-rose-50 border-rose-400 text-rose-800 font-bold shadow-xs'
                          : 'bg-white border-[#E8E2D5] text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{allergen.icon}</span>
                        <span className="text-xs">{allergen.label}</span>
                      </div>
                      {isExcluded ? (
                        <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-black">
                          GẠCH BỎ
                        </span>
                      ) : (
                        <span className="text-zinc-300 text-xs">+</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-medium">
                  <Check className="w-4 h-4 text-[#1E7547]" />
                  <span>
                    Tìm thấy <strong>{availableProducts.length}</strong> loại bánh ngũ cốc đạt chuẩn 
                    [{selectedDiet}] và an toàn 100% không chứa dị ứng đã chọn.
                  </span>
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-bold text-zinc-500 hover:text-zinc-800 cursor-pointer"
                >
                  ← Quay lại
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-[#1E7547] hover:bg-[#165a36] text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Tiếp tục: Xếp bánh vào hộp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: VISUAL CRAFT BOX FILLER */}
          {currentStep === 3 && (
            <div className="space-y-6">
              
              {/* Box Size Selector with Discount Badges */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  1. Chọn kích cỡ hộp bánh:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { size: 6, title: 'Hộp Trải Nghiệm (6 Thanh)', discount: 'Giảm 10%', best: false },
                    { size: 12, title: 'Hộp Tiết Kiệm (12 Thanh)', discount: 'Giảm 18%', best: true },
                    { size: 24, title: 'Hộp Gia Đình (24 Thanh)', discount: 'Giảm 25% + Freeship', best: false }
                  ].map((b) => (
                    <button
                      key={b.size}
                      onClick={() => setBoxSize(b.size as any)}
                      className={`p-3 sm:p-4 rounded-2xl border-2 text-center transition-all cursor-pointer relative ${
                        boxSize === b.size
                          ? 'bg-[#EBF7EE] border-[#1E7547] shadow-md'
                          : 'bg-white border-[#E8E2D5] hover:border-zinc-300'
                      }`}
                    >
                      {b.best && (
                        <span className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-[#E59828] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                          Bán chạy nhất
                        </span>
                      )}
                      <h5 className="font-bold text-xs sm:text-sm text-[#1C2D20]">{b.title}</h5>
                      <span className="text-[11px] font-black text-[#1E7547] bg-white px-2 py-0.5 rounded border border-[#CDEED5] inline-block mt-1 font-mono">
                        {b.discount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* VISUAL LUXURY BOX CONTAINER */}
              <div className="bg-[#FAF5EC] rounded-3xl p-5 sm:p-7 border-2 border-[#1E7547] shadow-xl space-y-4 relative overflow-hidden">
                
                {/* Wood/Craft texture bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E0D5C3]">
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-zinc-900 flex items-center gap-2">
                      <Box className="w-5 h-5 text-[#1E7547]" />
                      <span>Hộp SOWELL Custom ({totalSelectedBars}/{boxSize} thanh)</span>
                    </h4>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      {remainingSlots > 0 
                        ? `Còn thiếu ${remainingSlots} thanh nữa để hoàn thành hộp quà!` 
                        : '🎉 Tuyệt vời! Hộp bánh đã được lấp đầy hoàn chỉnh 100%!'}
                    </p>
                  </div>

                  {/* Progress Bar with discount tier indicator */}
                  <div className="flex items-center gap-2">
                    <div className="w-full sm:w-44 bg-[#E0D5C3] h-3 rounded-full overflow-hidden border border-zinc-300">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          isBoxFull ? 'bg-[#1E7547]' : 'bg-[#E59828]'
                        }`}
                        style={{ width: `${(totalSelectedBars / boxSize) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-black font-mono text-[#1E7547]">
                      {Math.round((totalSelectedBars / boxSize) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Compartment Grid */}
                <div className={`grid gap-2.5 ${
                  boxSize === 6 ? 'grid-cols-3 sm:grid-cols-6' : boxSize === 12 ? 'grid-cols-4 sm:grid-cols-6' : 'grid-cols-6 sm:grid-cols-8'
                }`}>
                  {visualSlots.map((item, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-1 relative overflow-hidden transition-all duration-300 ${
                        item 
                          ? 'border-[#1E7547] bg-white shadow-md' 
                          : 'border-dashed border-[#CFC3B0] bg-[#F3EFE6]/50'
                      }`}
                    >
                      {item ? (
                        <>
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <button
                            onClick={() => updateBarCount(item.id, -1)}
                            className="absolute top-1 right-1 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md hover:bg-rose-700 cursor-pointer"
                            title="Bỏ thanh này"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <div className="text-center p-1">
                          <span className="text-[10px] text-zinc-400 font-bold block">Slot {idx + 1}</span>
                          <span className="text-[11px] text-zinc-300">+</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Live Price & Discount Summary */}
                <div className="pt-3 border-t border-[#E0D5C3] flex flex-wrap items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">Giá gốc: <del>{originalSubtotal.toLocaleString('vi-VN')}₫</del></span>
                    <span className="bg-[#E59828] text-white text-[10px] font-black px-2 py-0.5 rounded font-mono">
                      Tiết kiệm {discountAmount.toLocaleString('vi-VN')}₫ (-{discountRate}%)
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-zinc-700">Giá Hộp Combo:</span>
                    <span className="text-xl sm:text-2xl font-black text-[#1E7547] font-mono">
                      {finalComboPrice.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

              </div>

              {/* LIST OF COMPATIBLE BARS TO ADD */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  2. Chọn thanh bánh vào hộp:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableProducts.map((product) => {
                    const count = boxItems[product.id] || 0;
                    return (
                      <div
                        key={product.id}
                        className="bg-white p-3.5 rounded-2xl border border-[#E8E2D5] flex items-center justify-between gap-3 shadow-xs hover:border-[#1E7547] transition-colors"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-xl shrink-0 border border-zinc-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-xs text-zinc-900 truncate">{product.name}</h5>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-black text-[#1E7547] font-mono">{product.price.toLocaleString('vi-VN')}₫</span>
                            <span className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.2 rounded">{product.nutrition.calories} kcal</span>
                          </div>
                        </div>

                        {/* Plus / Minus Counter */}
                        <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-zinc-200 rounded-xl p-1 shrink-0">
                          <button
                            onClick={() => updateBarCount(product.id, -1)}
                            disabled={count === 0}
                            className="w-6 h-6 rounded-lg bg-white text-zinc-700 flex items-center justify-center font-bold text-xs disabled:opacity-30 border border-zinc-200 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-black text-xs text-[#1C2D20] font-mono">
                            {count}
                          </span>
                          <button
                            onClick={() => updateBarCount(product.id, 1)}
                            disabled={totalSelectedBars >= boxSize}
                            className="w-6 h-6 rounded-lg bg-[#1E7547] text-white flex items-center justify-center font-bold text-xs disabled:opacity-30 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-bold text-zinc-500 hover:text-zinc-800 cursor-pointer"
                >
                  ← Đổi sàng lọc dị ứng
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  disabled={!isBoxFull}
                  className="bg-[#1E7547] hover:bg-[#165a36] text-white px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Tiếp tục: Viết thiệp & Đặt hộp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: REVIEW & ADD TO CART */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E7547] bg-[#EBF7EE] px-3.5 py-1.5 rounded-full border border-[#BCE8C6]">
                  Bước 4: Xác Nhận Hộp Bánh
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-zinc-900 mt-2">
                  Hộp SOWELL Custom {boxSize} Thanh Hoàn Chỉnh
                </h4>
              </div>

              {/* Review Box Breakdown */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div>
                    <h5 className="font-bold text-sm text-[#1C2D20]">
                      Cấu hình: Hộp {boxSize} Thanh [{selectedDiet}]
                    </h5>
                    <p className="text-xs text-zinc-500">
                      {excludedAllergens.length > 0 
                        ? `Đã loại trừ dị ứng: ${excludedAllergens.join(', ')}` 
                        : 'Không có yêu cầu loại trừ dị ứng'}
                    </p>
                  </div>
                  <span className="bg-[#E59828] text-white text-xs font-black px-3 py-1 rounded-md font-mono">
                    Tiết kiệm {discountRate}%
                  </span>
                </div>

                {/* Items in Combo */}
                <div className="space-y-2">
                  {Object.entries(boxItems).map(([pId, count]) => {
                    const prod = products.find((p) => p.id === pId);
                    if (!prod) return null;
                    return (
                      <div key={pId} className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-50">
                        <div className="flex items-center gap-2.5">
                          <img src={prod.images[0]} alt={prod.name} className="w-9 h-9 rounded-xl object-cover border border-zinc-200" />
                          <span className="font-semibold text-zinc-800">{prod.name}</span>
                        </div>
                        <span className="font-black text-[#1E7547] font-mono">x{count} thanh</span>
                      </div>
                    );
                  })}
                </div>

                {/* Optional Gift Message Card */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-zinc-700 mb-1 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Lời nhắn thiệp quà tặng (Miễn phí):</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Nhập lời chúc sức khỏe nếu đây là món quà bạn gửi tặng người thân yêu..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full bg-[#FAF8F5] text-xs p-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#1E7547]"
                  />
                </div>

                {/* Total Price Calculation */}
                <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs text-zinc-500 block">Tổng thanh toán hộp combo:</span>
                    <span className="text-xs text-rose-600 font-bold">Đã trừ ưu đãi combo {discountAmount.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <span className="text-2xl font-black text-[#1E7547] font-mono">
                    {finalComboPrice.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-xs font-bold text-zinc-500 hover:text-zinc-800 cursor-pointer"
                >
                  ← Điều chỉnh lại vị bánh
                </button>

                <button
                  onClick={handleAddComboToCart}
                  className="bg-[#1E7547] hover:bg-[#165a36] text-white px-8 py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-[#1E7547]/20 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 text-emerald-200" />
                  <span>Thêm Hộp Combo Vào Giỏ Hàng</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
