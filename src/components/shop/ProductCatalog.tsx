import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ALL_ALLERGENS, ALL_DIETARY_OPTIONS } from '../../data/productsData';
import { Allergen, DietaryTag } from '../../types';
import { Filter, SlidersHorizontal, RotateCcw, Flame, Check, X } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { products } = useStore();

  // Filter States
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);
  const [excludedAllergens, setExcludedAllergens] = useState<Allergen[]>([]);
  const [maxCalories, setMaxCalories] = useState<number>(200);
  const [sugarFilter, setSugarFilter] = useState<'all' | 'zero' | 'low'>('all');
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'calories-asc' | 'rating'>('bestseller');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Toggle dietary tag
  const toggleDietary = (tag: DietaryTag) => {
    setSelectedDietary(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Toggle allergen exclusion
  const toggleAllergen = (allergen: Allergen) => {
    setExcludedAllergens(prev => 
      prev.includes(allergen) ? prev.filter(a => a !== allergen) : [...prev, allergen]
    );
  };

  const resetFilters = () => {
    setSelectedDietary([]);
    setExcludedAllergens([]);
    setMaxCalories(200);
    setSugarFilter('all');
    setSortBy('bestseller');
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Calories filter
      if (product.nutrition.calories > maxCalories) return false;

      // 2. Sugar filter
      if (sugarFilter === 'zero' && product.nutrition.totalSugars > 0) return false;
      if (sugarFilter === 'low' && product.nutrition.totalSugars > 2) return false;

      // 3. Dietary tags filter (must match selected)
      if (selectedDietary.length > 0) {
        const matchesDiet = selectedDietary.some(tag => product.dietaryTags.includes(tag));
        if (!matchesDiet) return false;
      }

      // 4. Allergen exclusion filter (cannot contain ANY excluded allergen)
      if (excludedAllergens.length > 0) {
        const hasAllergen = product.allergens.some(a => excludedAllergens.includes(a));
        if (hasAllergen) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'bestseller') return b.soldCount - a.soldCount;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'calories-asc') return a.nutrition.calories - b.nutrition.calories;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, maxCalories, sugarFilter, selectedDietary, excludedAllergens, sortBy]);

  const activeFilterCount = selectedDietary.length + excludedAllergens.length + (sugarFilter !== 'all' ? 1 : 0) + (maxCalories < 200 ? 1 : 0);

  return (
    <section id="catalog-section" className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-[#EAE5DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Catalog Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E7547] bg-[#EBF7EE] px-3.5 py-1.5 rounded-full border border-[#BCE8C6]">
            Cửa Hàng Dinh Dưỡng
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153E26] mt-2">
            Danh Mục Toàn Bộ Bánh Ngũ Cốc SOWELL
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-2">
            Bộ lọc thông minh giúp bạn chọn chính xác bánh theo hạn mức Calo, lượng đường và loại trừ hoàn toàn các loại hạt gây dị ứng.
          </p>
        </div>

        {/* Toolbar: Result count + Mobile toggle + Sort */}
        <div className="bg-white rounded-2xl p-4 mb-8 border border-zinc-200/90 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden bg-[#1E7547] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Filter className="w-4 h-4" />
              <span>Bộ lọc ({activeFilterCount})</span>
            </button>

            <p className="text-xs sm:text-sm font-semibold text-zinc-700">
              Hiển thị <span className="text-[#1E7547] font-black">{filteredProducts.length}</span> sản phẩm phù hợp
            </p>

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer bg-rose-50 px-2.5 py-1 rounded-lg"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Đặt lại ({activeFilterCount})</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-zinc-500 hidden sm:inline">Sắp xếp theo:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF8F5] border border-zinc-200 rounded-xl px-3 py-2 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#1E7547] cursor-pointer"
            >
              <option value="bestseller">🔥 Bán chạy nhất</option>
              <option value="rating">★ Đánh giá cao nhất</option>
              <option value="calories-asc">⚡ Calo thấp nhất</option>
              <option value="price-asc">₫ Giá: Thấp đến Cao</option>
              <option value="price-desc">₫ Giá: Cao đến Thấp</option>
            </select>
          </div>

        </div>

        {/* Main Grid: Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Filters (Desktop + Mobile slide) */}
          <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 shadow-2xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <h3 className="font-bold text-sm text-[#153E26] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#1E7547]" />
                  <span>Bộ Lọc Thông Minh</span>
                </h3>
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters} className="text-[11px] text-zinc-400 hover:text-zinc-700 cursor-pointer">
                    Xóa tất cả
                  </button>
                )}
              </div>

              {/* 1. Calorie Range Slider & Quick Presets */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-bold text-zinc-700 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#D97706]" />
                    Mức Calo tối đa:
                  </span>
                  <span className="font-black text-[#1E7547] text-sm bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100 font-mono">
                    ≤ {maxCalories} kcal
                  </span>
                </div>
                <input
                  type="range"
                  min="130"
                  max="200"
                  step="5"
                  value={maxCalories}
                  onChange={(e) => setMaxCalories(Number(e.target.value))}
                  className="w-full accent-[#1E7547] cursor-pointer"
                />
                
                {/* Clean Quick Calorie Pills */}
                <div className="grid grid-cols-3 gap-1.5 mt-2">
                  {[
                    { label: '≤ 140 kcal', val: 140, tip: 'Giảm mỡ' },
                    { label: '≤ 160 kcal', val: 160, tip: 'Bữa xế' },
                    { label: 'Tất cả', val: 200, tip: 'Đầy đủ' }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      onClick={() => setMaxCalories(preset.val)}
                      className={`text-[10px] py-1 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                        maxCalories === preset.val
                          ? 'bg-[#1E7547] text-white border-[#1E7547] font-bold'
                          : 'bg-[#FAF8F5] text-zinc-600 border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Sugar Filter */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-2">Lượng đường trong bánh</label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setSugarFilter('all')}
                    className={`text-[11px] py-1.5 px-2 rounded-lg font-bold border transition-colors cursor-pointer ${
                      sugarFilter === 'all'
                        ? 'bg-[#1E7547] text-white border-[#1E7547]'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                    }`}
                  >
                    Tất cả
                  </button>
                  <button
                    onClick={() => setSugarFilter('zero')}
                    className={`text-[11px] py-1.5 px-2 rounded-lg font-bold border transition-colors cursor-pointer ${
                      sugarFilter === 'zero'
                        ? 'bg-[#1E7547] text-white border-[#1E7547]'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                    }`}
                  >
                    0g Đường
                  </button>
                  <button
                    onClick={() => setSugarFilter('low')}
                    className={`text-[11px] py-1.5 px-2 rounded-lg font-bold border transition-colors cursor-pointer ${
                      sugarFilter === 'low'
                        ? 'bg-[#1E7547] text-white border-[#1E7547]'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                    }`}
                  >
                    {'< 2g'} Đường
                  </button>
                </div>
              </div>

              {/* 3. Dietary Lifestyle Tags */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-2">Chế độ ăn phù hợp</label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_DIETARY_OPTIONS.map((opt) => {
                    const isSelected = selectedDietary.includes(opt.value as DietaryTag);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => toggleDietary(opt.value as DietaryTag)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EBF7EE] text-[#1E7547] border-[#1E7547] font-bold shadow-2xs'
                            : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <span>{opt.icon}</span>
                        <span>{opt.value}</span>
                        {isSelected && <Check className="w-3 h-3 text-[#1E7547]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Sàng lọc dị ứng (Loại trừ thành phần) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-zinc-700">
                    Sàng lọc dị ứng (Loại trừ)
                  </label>
                  <span className="text-[10px] text-zinc-400">Chọn để gạch bỏ</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {ALL_ALLERGENS.map((allergen) => {
                    const isExcluded = excludedAllergens.includes(allergen.value as Allergen);
                    return (
                      <button
                        key={allergen.value}
                        onClick={() => toggleAllergen(allergen.value as Allergen)}
                        className={`text-[11px] p-2 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isExcluded
                            ? 'bg-rose-50 text-rose-700 border-rose-300 font-bold'
                            : 'bg-[#FAF8F5] text-zinc-600 border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <span className="truncate">{allergen.label}</span>
                        {isExcluded ? (
                          <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        ) : (
                          <span className="text-[10px] text-zinc-400 shrink-0">+</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {excludedAllergens.length > 0 && (
                  <p className="text-[11px] text-rose-600 mt-2 font-medium">
                    ⚠️ Đã loại bỏ bánh chứa {excludedAllergens.length} loại dị ứng.
                  </p>
                )}
              </div>

            </div>
          </aside>

          {/* Product Cards Container */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200/90 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center text-3xl mx-auto">
                  🌾
                </div>
                <h3 className="text-xl font-bold text-[#153E26]">
                  Không tìm thấy sản phẩm phù hợp với bộ lọc này
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
                  Vui lòng nới lỏng mức calo tối đa hoặc bỏ chọn bớt các tiêu chí dị ứng để xem thêm các dòng bánh khác nhé.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#1E7547] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-[#165a36] transition-colors cursor-pointer"
                >
                  Xóa bộ lọc & Xem lại tất cả
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
