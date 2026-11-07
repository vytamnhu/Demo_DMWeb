import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  processUserQuestion,
  calculateServings,
  ServingCalculationResult
} from '../../data/aiNutritionEngine';
import { 
  Calculator, 
  X, 
  Send, 
  ShoppingBag, 
  ShieldAlert,
  RotateCcw,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Product } from '../../types';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedProduct?: Product;
  timestamp: string;
  quickReplies?: string[];
  calculationResult?: ServingCalculationResult;
}

export const AIChatbotModal: React.FC = () => {
  const { isAIChatOpen, setIsAIChatOpen, addToCart } = useStore();

  const [activeTab, setActiveTab] = useState<'chat' | 'calculator' | 'allergy_check'>('chat');

  const [selectedProduct, setSelectedProduct] = useState<'biscotti' | 'tuiles'>('biscotti');
  const [servingsCount, setServingsCount] = useState<number>(2);
  const [calcResult, setCalcResult] = useState<ServingCalculationResult>(() => calculateServings('biscotti', 2));

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: 'Chào bạn! Mình là **Trợ lý Dinh Dưỡng SOWELL**.\n\nMình có thể giúp bạn tra cứu bảng dinh dưỡng, tính lượng Calo theo khẩu phần và đối chiếu thành phần dị ứng trên toàn bộ các dòng bánh của SOWELL.',
      timestamp: 'Vừa xong',
      quickReplies: [
        'Tôi dị ứng hạnh nhân',
        'Bánh thuần chay (Vegan)',
        'Bánh giàu đạm cho Gymer',
        'Bánh không chứa hạt (Nut-Free)',
        'Người tiểu đường ăn loại nào?',
        'Bánh nào ít calo nhất?'
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  const handleUpdateCalculation = (prod: 'biscotti' | 'tuiles', count: number) => {
    setSelectedProduct(prod);
    setServingsCount(count);
    setCalcResult(calculateServings(prod, count));
  };

  const handleSendCalculationToChat = () => {
    const text = `Mình định ăn ${servingsCount} khẩu phần ${selectedProduct === 'biscotti' ? 'Biscotti' : 'Bánh ngói hạnh nhân'}, tính giúp mình calo và đường với!`;
    handleSendMessage(text);
    setActiveTab('chat');
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Vừa xong'
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      const aiResponse = processUserQuestion(text);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiResponse.text,
          recommendedProduct: aiResponse.recommendedProduct,
          quickReplies: aiResponse.quickReplies,
          timestamp: 'Vừa xong'
        }
      ]);
    }, 350);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'ai',
        text: 'Chào bạn! Mình là **Trợ lý Dinh Dưỡng SOWELL**. Bạn cần tra cứu thành phần, calo hay kiểm tra dị ứng loại hạt nào ạ?',
        timestamp: 'Vừa xong',
        quickReplies: [
          'Bảng dinh dưỡng Biscotti',
          'Bảng dinh dưỡng Bánh ngói',
          'Tôi dị ứng hạnh nhân',
          'Người tiểu đường ăn được không?'
        ]
      }
    ]);
  };

  if (!isAIChatOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-xl w-full h-[88vh] sm:h-[82vh] shadow-2xl flex flex-col overflow-hidden border border-stone-200/80 relative animate-scaleUp">
        
        {/* Clean Header */}
        <div className="bg-white border-b border-stone-200/80 px-5 py-4 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#163824] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#163824]">Trợ Lý Dinh Dưỡng SOWELL</h3>
                <p className="text-xs text-stone-500">
                  Tra cứu Calo, Khẩu phần & Sàng lọc dị ứng
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleResetChat}
                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                title="Làm mới cuộc trò chuyện"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAIChatOpen(false)}
                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                title="Đóng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Clean Segmented Tabs */}
          <div className="grid grid-cols-3 gap-1.5 mt-3.5 p-1 bg-stone-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'chat' ? 'bg-white text-[#163824] shadow-2xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Hỏi đáp AI</span>
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'calculator' ? 'bg-white text-[#163824] shadow-2xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Tính khẩu phần</span>
            </button>
            <button
              onClick={() => setActiveTab('allergy_check')}
              className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'allergy_check' ? 'bg-white text-[#163824] shadow-2xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Tra cứu dị ứng</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* TAB 1: CALCULATOR TOOL */}
          {activeTab === 'calculator' && (
            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 space-y-4">
              <div className="pb-2 border-b border-stone-100">
                <h4 className="font-bold text-sm text-[#163824]">Tính Chỉ Số Khẩu Phần & Đối Chiếu WHO</h4>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">1. Chọn loại bánh:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdateCalculation('biscotti', servingsCount)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedProduct === 'biscotti'
                        ? 'border-[#163824] bg-[#EEF6F0]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#163824]">Biscotti (3 vị)</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Khẩu phần: 50g (~2 miếng)</div>
                  </button>
                  <button
                    onClick={() => handleUpdateCalculation('tuiles', servingsCount)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedProduct === 'tuiles'
                        ? 'border-[#163824] bg-[#EEF6F0]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#163824]">Bánh ngói hạnh nhân</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Khẩu phần: 20g (2 bánh)</div>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <label className="font-semibold text-stone-600">2. Số khẩu phần định ăn:</label>
                  <span className="font-bold text-[#1E7547]">
                    {servingsCount} khẩu phần ({calcResult.totalGrams}g)
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleUpdateCalculation(selectedProduct, num)}
                      className={`flex-1 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        servingsCount === num
                          ? 'bg-[#163824] text-white border-[#163824]'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200/70 space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200/70">
                    <span className="text-[10px] text-stone-400 block uppercase">Năng lượng</span>
                    <span className="font-bold text-[#163824] text-sm block mt-0.5">
                      {calcResult.calories} kcal
                    </span>
                    <span className="text-[10px] text-stone-400">{calcResult.caloriesPercentageOfWHO}% WHO</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200/70">
                    <span className="text-[10px] text-stone-400 block uppercase">Đường</span>
                    <span className="font-bold text-[#163824] text-sm block mt-0.5">
                      {calcResult.sugar}g
                    </span>
                    <span className="text-[10px] text-stone-400">{calcResult.sugarPercentageOfWHO}% WHO</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200/70">
                    <span className="text-[10px] text-stone-400 block uppercase">Đạm</span>
                    <span className="font-bold text-[#1E7547] text-sm block mt-0.5">
                      {calcResult.protein}g
                    </span>
                    <span className="text-[10px] text-stone-400">trên {calcResult.totalGrams}g</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-600 bg-white p-3 rounded-xl border border-stone-200/70 leading-relaxed">
                  <strong>Chi tiết:</strong> {calcResult.formulaText}
                </div>

                <button
                  onClick={handleSendCalculationToChat}
                  className="w-full bg-[#163824] hover:bg-[#1E7547] text-white py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer"
                >
                  Hỏi thêm tư vấn về lượng ăn này
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ALLERGY QUICK CHECK */}
          {activeTab === 'allergy_check' && (
            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 space-y-4">
              <p className="text-xs text-stone-600">
                Chọn thành phần bạn đang kiêng hoặc mục tiêu dinh dưỡng để đối chiếu nhanh với bảng thành phần SOWELL:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: 'Dị ứng Hạnh nhân (Almond)', query: 'Tôi dị ứng hạnh nhân, đối chiếu sản phẩm phù hợp cho tôi với?' },
                  { label: 'Dị ứng Hạt điều (Cashew)', query: 'Tôi dị ứng hạt điều, ăn loại bánh nào an toàn?' },
                  { label: 'Dị ứng Quả óc chó (Walnut)', query: 'Tôi dị ứng quả óc chó, có bánh nào không chứa óc chó?' },
                  { label: 'Dị ứng Đậu phộng (Peanut)', query: 'Tôi dị ứng đậu phộng, ăn bánh nào được?' },
                  { label: 'Dị ứng tất cả hạt (Nut-Free)', query: 'Tôi dị ứng tất cả các loại hạt, có bánh nào nut-free an toàn?' },
                  { label: 'Thuần Chay (Vegan 100%)', query: 'Tôi ăn thuần chay vegan, bánh nào 100% từ thực vật không trứng bơ sữa?' },
                  { label: 'Dị ứng Trứng / Sữa / Bơ', query: 'Tôi dị ứng trứng và bơ sữa động vật, tư vấn bánh phù hợp?' },
                  { label: 'Dị ứng Gluten / Bột mì', query: 'Tôi không ăn được gluten, chọn bánh nào?' },
                  { label: 'Tập Gym / Cần giàu Đạm', query: 'Bánh nào nhiều protein đạm nhất cho người tập gym?' },
                  { label: 'Kiểm soát Đường huyết', query: 'Người tiểu đường ăn được loại bánh nào?' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleSendMessage(item.query);
                      setActiveTab('chat');
                    }}
                    className="p-3 rounded-xl border border-stone-200/80 hover:border-[#1E7547] hover:bg-[#EEF6F0]/60 text-left transition-all cursor-pointer"
                  >
                    <span className="font-semibold text-xs text-[#163824] block">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CHAT MESSAGES STREAM */}
          {activeTab === 'chat' && messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#163824] text-white flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                </div>
              )}
              
              <div className={`max-w-[86%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`rounded-2xl p-4 text-xs sm:text-[13px] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#163824] text-white rounded-tr-xs'
                      : 'bg-white text-stone-700 border border-stone-200/80 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <div 
                    className="whitespace-pre-line"
                    dangerouslySetInnerHTML={{ 
                      __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-stone-900">$1</strong>') 
                    }} 
                  />

                  {/* Recommended Product Card Inside Message */}
                  {msg.recommendedProduct && (
                    <div className="mt-3 bg-[#FAF8F5] rounded-xl p-3 border border-stone-200/80 space-y-2.5">
                      <div className="flex gap-3 items-center">
                        <img
                          src={msg.recommendedProduct.images[0]}
                          alt={msg.recommendedProduct.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="font-bold text-xs text-[#163824] truncate">
                            {msg.recommendedProduct.name}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                            <span className="font-bold text-[#1E7547]">
                              {msg.recommendedProduct.price.toLocaleString('vi-VN')}₫
                            </span>
                            <span className="text-stone-400">
                              • {msg.recommendedProduct.nutrition.calories} kcal
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(msg.recommendedProduct!, 1)}
                        className="w-full bg-[#163824] hover:bg-[#1E7547] text-white py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Thêm vào giỏ</span>
                      </button>
                    </div>
                  )}

                  {/* Quick replies */}
                  {msg.quickReplies && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2.5 border-t border-stone-100">
                      {msg.quickReplies.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(reply)}
                          className="text-[11px] bg-[#FAF8F5] hover:bg-[#EEF6F0] text-[#163824] border border-stone-200/80 px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div ref={chatBottomRef} />
        </div>

        {/* Bottom Input */}
        <div className="p-3.5 bg-white border-t border-stone-200/80 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Hỏi về thành phần, calo, dị ứng, tiểu đường..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-[#FAF8F5] text-xs sm:text-sm px-4 py-2.5 rounded-full border border-stone-200/90 focus:outline-none focus:border-[#1E7547]"
            />
            <button
              onClick={() => handleSendMessage()}
              className="bg-[#163824] hover:bg-[#1E7547] text-white p-2.5 rounded-full transition-colors cursor-pointer shrink-0"
              title="Gửi câu hỏi"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
