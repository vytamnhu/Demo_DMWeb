import React from 'react';
import { NutritionFacts } from '../../types';

interface NutritionFactsTableProps {
  nutrition: NutritionFacts;
  productName: string;
}

export const NutritionFactsTable: React.FC<NutritionFactsTableProps> = ({ nutrition, productName }) => {
  return (
    <div className="bg-white border-2 border-zinc-900 rounded-xl p-5 max-w-sm w-full font-sans text-zinc-900 shadow-sm">
      <div className="border-b-[8px] border-zinc-900 pb-1">
        <h3 className="text-2xl font-black tracking-tight uppercase leading-none">Giá Trị Dinh Dưỡng</h3>
        <p className="text-xs font-semibold text-zinc-700 mt-1 uppercase tracking-wider">Nutrition Facts</p>
        <p className="text-xs text-zinc-600 mt-0.5 truncate">{productName}</p>
      </div>

      <div className="border-b-[4px] border-zinc-900 py-1.5 flex justify-between text-xs font-bold">
        <span>Khẩu phần khuyến nghị:</span>
        <span>{nutrition.servingSize}</span>
      </div>

      <div className="border-b-[8px] border-zinc-900 py-2 flex justify-between items-baseline">
        <div>
          <span className="text-xs font-black uppercase">Năng lượng / Calories</span>
          <p className="text-[10px] text-zinc-500">Mỗi khẩu phần</p>
        </div>
        <span className="text-3xl font-black tracking-tighter">{nutrition.calories} <span className="text-sm font-semibold">kcal</span></span>
      </div>

      <div className="text-[11px] text-right py-1 font-bold border-b border-zinc-300 text-zinc-600">
        % Giá trị hàng ngày (% DV)*
      </div>

      <div className="divide-y divide-zinc-200 text-xs">
        <div className="py-1 flex justify-between">
          <span><strong className="font-bold">Tổng chất béo</strong> (Total Fat) {nutrition.totalFat}g</span>
          <span className="font-bold">{Math.round((nutrition.totalFat / 65) * 100)}%</span>
        </div>
        <div className="py-1 pl-4 flex justify-between text-zinc-600">
          <span>Chất béo bão hòa (Saturated Fat) {nutrition.saturatedFat}g</span>
          <span className="font-semibold">{Math.round((nutrition.saturatedFat / 20) * 100)}%</span>
        </div>
        <div className="py-1 pl-4 flex justify-between text-zinc-600">
          <span>Chất béo chuyển hóa (Trans Fat) 0g</span>
          <span className="font-semibold">0%</span>
        </div>
        <div className="py-1 flex justify-between">
          <span><strong className="font-bold">Natri</strong> (Sodium) {nutrition.sodium}mg</span>
          <span className="font-bold">{Math.round((nutrition.sodium / 2300) * 100)}%</span>
        </div>
        <div className="py-1 flex justify-between">
          <span><strong className="font-bold">Tổng Carbohydrate</strong> {nutrition.totalCarbs}g</span>
          <span className="font-bold">{Math.round((nutrition.totalCarbs / 275) * 100)}%</span>
        </div>
        <div className="py-1 pl-4 flex justify-between text-zinc-600">
          <span>Chất xơ tự nhiên (Dietary Fiber) {nutrition.dietaryFiber}g</span>
          <span className="font-semibold text-[#1E7547] font-bold">{Math.round((nutrition.dietaryFiber / 28) * 100)}%</span>
        </div>
        <div className="py-1 pl-4 flex justify-between text-zinc-600">
          <span>Tổng lượng đường (Total Sugars) {nutrition.totalSugars}g</span>
          <span>-</span>
        </div>
        <div className="py-1 pl-8 flex justify-between text-[#1E7547] font-semibold text-[11px] bg-emerald-50/60 px-1 rounded">
          <span>Bao gồm đường tinh luyện (Added Sugars) {nutrition.addedSugars}g</span>
          <span>0%</span>
        </div>
        <div className="py-1 flex justify-between bg-amber-50/50 px-1 rounded">
          <span><strong className="font-bold text-amber-900">Chất đạm</strong> (Protein) {nutrition.protein}g</span>
          <span className="font-bold text-amber-900">{Math.round((nutrition.protein / 50) * 100)}%</span>
        </div>
      </div>

      <div className="border-t-[4px] border-zinc-900 mt-2 pt-2 text-[10px] text-zinc-500 leading-snug">
        * Tỷ lệ % Giá trị Hàng ngày (% Daily Value) cho biết một khẩu phần ăn đóng góp bao nhiêu vào chế độ ăn 2.000 calo/ngày khuyến nghị cho người trưởng thành.
      </div>
    </div>
  );
};

