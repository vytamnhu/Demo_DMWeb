import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { setIsAIChatOpen } = useStore();

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={() => setIsAIChatOpen(true)}
        className="bg-[#163824] hover:bg-[#1E7547] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 cursor-pointer border border-white/15 group"
        title="Trợ lý AI tư vấn dinh dưỡng & dị ứng"
      >
        <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
        </div>
        <span className="text-xs font-semibold pr-1">
          Trợ lý AI Dinh Dưỡng
        </span>
      </button>
    </div>
  );
};
