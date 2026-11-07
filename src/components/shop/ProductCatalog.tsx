import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ALL_ALLERGENS, ALL_DIETARY_OPTIONS } from '../../data/productsData';
import { Allergen, DietaryTag } from '../../types';
import { SlidersHorizontal, RotateCcw, Flame, X, ChevronDown } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { products } = useStore();

  // Filter States
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);
  const [excludedAllergens, setExcludedAllergens] = useState<Allergen[]>([]);
  const [maxCalories, setMaxCalories] = useState<number>(200);
  const [sugarFilter, setSugarFilter] = useState<'all' | 'zero' | 'low'>('all');
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'calories-asc' | 'rating'>('bestseller');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  // Quick single-click dietary tab or toggle
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
      if (product.nutrition.calories > maxCalories) return false;
      if (sugarFilter === 'zero' && product.nutrition.totalSugars > 0) return false;
      if (sugarFilter === 'low' && product.nutrition.totalSugars > 2) return false;

      if (selectedDietary.length > 0) {
        const matchesDiet = selectedDietary.some(tag => product.dietaryTags.includes(tag));
        if (!matchesDiet) return false;
      }

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

  const advancedFilterCount = excludedAllergens.length + (sugarFilter !== 'all' ? 1 : 0) + (maxCalories < 200 ? 1 : 0);
  const totalFilterCount = selectedDietary.length + advancedFilterCount;

  const quickDietTabs: { label: string; value: DietaryTag | 'ALL' }[] = [
    { label: 'Tất cả', value: 'ALL' },
    { label: 'Eat Clean', value: 'Eat Clean' },
    { label: 'Giàu Protein', value: 'Giàu Protein' },
    { label: 'Thuần Chay (Vegan)', value: 'Vegan' },
    { label: 'Không đường', value: 'Không đường' },
    { label: 'Không hạt (Nut-Free)', value: 'Nut-Free' },
    { label: 'Keto', value: 'Keto' },
  ];

  return (
    <section id="catalog-section" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E7547]">
              Cửa hàng SOWELL
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163824] mt-1">
              Bộ Sưu Tập Bánh Dinh Dưỡng
            </h2>
          </div>
          <p className="text-stone-500 text-sm max-w-md">
            Chọn nhanh chế độ ăn hoặc mở bộ lọc thông minh để giới hạn mức Calo và loại trừ hạt gây dị ứng.
          </p>
        </div>

        {/* Streamlined Horizontal Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6">
          
          {/* Quick Dietary Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
            {quickDietTabs.map((tab) => {
              const isAll = tab.value === 'ALL';
              const isActive = isAll 
                ? selectedDietary.length === 0 
                : selectedDietary.includes(tab.value as DietaryTag);

              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    if (isAll) {
                      setSelectedDietary([]);
                    } else {
                      toggleDietary(tab.value as DietaryTag);
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#163824] text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200/80 hover:border-stone-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Smart Filter Toggle + Sort */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
            <button
              onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                isAdvancedFilterOpen || advancedFilterCount > 0
                  ? 'bg-[#EEF6F0] text-[#163824] border-[#1E7547]/40'
                  : 'bg-white text-stone-700 border-stone-200/80 hover:border-stone-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1E7547]" />
              <span>Lọc Calo & Dị ứng</span>
              {advancedFilterCount > 0 && (
                <span className="bg-[#1E7547] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {advancedFilterCount}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAdvancedFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-200/80 rounded-full px-4 py-2 text-xs font-semibold text-stone-700 focus:outline-none focus:border-[#1E7547] cursor-pointer"
            >
              <option value="bestseller">Sắp xếp: Bán chạy nhất</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="calories-asc">Calo: Thấp đến Cao</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>

        {/* Collapsible Smart Filter Drawer (Clean 3-Column Panel) */}
        {isAdvancedFilterOpen && (
          <div className="bg-white rounded-3xl p-6 mb-8 border border-stone-200/80 shadow-sm animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Col 1: Calorie & Sugar Control */}
              <div className="md:col-span-4 space-y-5">
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#1E7547]" />
                      Mức Calo tối đa mỗi khẩu phần
                    </span>
                    <span className="font-bold text-[#163824] bg-[#EEF6F0] px-2.5 py-0.5 rounded-full">
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
                    className="w-full accent-[#163824] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                    <span>130 kcal</span>
                    <span>165 kcal</span>
                    <span>200 kcal</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">Hàm lượng đường</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'all', label: 'Tất cả' },
                      { id: 'zero', label: '0g Đường' },
                      { id: 'low', label: '< 2g Đường' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSugarFilter(s.id as any)}
                        className={`text-xs py-2 px-2.5 rounded-xl font-medium border transition-colors cursor-pointer ${
                          sugarFilter === s.id
                            ? 'bg-[#163824] text-white border-[#163824]'
                            : 'bg-stone-50 text-stone-600 border-stone-200/70 hover:bg-stone-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Col 2: Dietary Needs */}
              <div className="md:col-span-3 md:border-l md:border-stone-100 md:pl-6">
                <label className="block text-xs font-semibold text-stone-700 mb-2.5">
                  Chế độ ăn phù hợp
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_DIETARY_OPTIONS.map((opt) => {
                    const isSelected = selectedDietary.includes(opt.value as DietaryTag);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => toggleDietary(opt.value as DietaryTag)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EEF6F0] text-[#163824] border-[#1E7547]/50 font-semibold'
                            : 'bg-stone-50/70 text-stone-600 border-stone-200/70 hover:border-stone-300'
                        }`}
                      >
                        {opt.value}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Col 3: Allergen Exclusions */}
              <div className="md:col-span-5 md:border-l md:border-stone-100 md:pl-6">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-xs font-semibold text-stone-700">
                    Loại trừ dị ứng (Bấm để gạch bỏ thành phần)
                  </label>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_ALLERGENS.map((allergen) => {
                    const isExcluded = excludedAllergens.includes(allergen.value as Allergen);
                    return (
                      <button
                        key={allergen.value}
                        onClick={() => toggleAllergen(allergen.value as Allergen)}
                        className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                          isExcluded
                            ? 'bg-rose-50 text-rose-700 border-rose-200 font-semibold line-through'
                            : 'bg-stone-50/70 text-stone-600 border-stone-200/70 hover:border-stone-300'
                        }`}
                      >
                        <span>{allergen.label}</span>
                        {isExcluded && <X className="w-3 h-3 text-rose-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Filter Summary Bar */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">
                Tìm thấy <strong className="text-[#163824]">{filteredProducts.length}</strong> sản phẩm phù hợp
              </span>
              <div className="flex items-center gap-3">
                {totalFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-stone-500 hover:text-rose-600 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Đặt lại mặc định</span>
                  </button>
                )}
                <button
                  onClick={() => setIsAdvancedFilterOpen(false)}
                  className="bg-[#163824] text-white px-4 py-1.5 rounded-full font-semibold cursor-pointer"
                >
                  Thu gọn
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filter Chips (when drawer is closed) */}
        {totalFilterCount > 0 && !isAdvancedFilterOpen && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-stone-400">Đang lọc:</span>
            {maxCalories < 200 && (
              <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-full flex items-center gap-1 text-stone-700">
                ≤ {maxCalories} kcal
                <button onClick={() => setMaxCalories(200)} className="hover:text-rose-500 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            {sugarFilter !== 'all' && (
              <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-full flex items-center gap-1 text-stone-700">
                {sugarFilter === 'zero' ? '0g Đường' : '< 2g Đường'}
                <button onClick={() => setSugarFilter('all')} className="hover:text-rose-500 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            {excludedAllergens.map((alg) => (
              <span key={alg} className="bg-rose-50 border border-rose-200 text-rose-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                Không {alg}
                <button onClick={() => toggleAllergen(alg)} className="hover:text-rose-900 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            ))}
            <button
              onClick={resetFilters}
              className="text-stone-500 hover:text-[#163824] underline ml-1 cursor-pointer"
            >
              Xóa tất cả
            </button>
          </div>
        )}

        {/* Product Grid: Clean 4-Column Layout */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/70 max-w-lg mx-auto my-6 space-y-4">
            <p className="text-base font-bold text-[#163824]">
              Chưa có sản phẩm khớp với toàn bộ tiêu chí lọc
            </p>
            <p className="text-xs text-stone-500 leading-relaxed">
              Bạn hãy thử tăng mức Calo tối đa hoặc bỏ chọn bớt một vài tiêu chí dị ứng để xem thêm các vị bánh khác nhé.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#163824] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#1E7547] transition-colors cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
