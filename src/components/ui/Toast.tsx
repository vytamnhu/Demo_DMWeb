import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 ${
            toast.type === 'success'
              ? 'bg-[#1E7547] text-white border-[#248B57]'
              : toast.type === 'error'
              ? 'bg-rose-600 text-white border-rose-700'
              : toast.type === 'warning'
              ? 'bg-amber-600 text-white border-amber-700'
              : 'bg-[#1C2A1F] text-white border-[#2D3E31]'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-200" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-200" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-200" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-emerald-200" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
            {toast.message && <p className="text-xs text-white/90 mt-0.5 leading-relaxed">{toast.message}</p>}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

