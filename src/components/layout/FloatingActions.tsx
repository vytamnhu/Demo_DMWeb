import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Box, ShoppingBag } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { setIsAIChatOpen, setIsComboBuilderOpen, cartCount, setIsCartOpen } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Floating Action 1: Custom Combo Builder Shortcut */}
      <button
        onClick={() => setIsComboBuilderOpen(true)}
        className="pointer-events-auto bg-[#E59828] hover:bg-[#d08316] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-108 flex items-center gap-2 group cursor-pointer border-2 border-white"
        title="Tự Phối Combo Hộp Bánh (-18%)"
      >
        <Box className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden group-hover:inline text-xs font-black pr-1">
          Tự Phối Hộp (-18%)
        </span>
      </button>

      {/* Floating Action 2: CORE FEATURE 1 - AI CHATBOT TRIGGER WITH MANDATORY SLOGAN */}
      <button
        onClick={() => setIsAIChatOpen(true)}
        className="pointer-events-auto bg-[#1E7547] hover:bg-[#165a36] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:shadow-emerald-900/40 transition-all transform hover:scale-105 flex items-center gap-3 cursor-pointer border-2 border-white group relative"
      >
        {/* Pulsing indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E59828] opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#E59828]" />
        </span>

        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm shrink-0">
          🤖
        </div>

        <div className="text-left">
          <span className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider block leading-none">
            Trợ Lý SOWELL
          </span>
          <span className="text-xs sm:text-sm font-black text-white leading-tight">
            AI Tính Calo & Bánh ✨
          </span>
        </div>
      </button>

    </div>
  );
};

