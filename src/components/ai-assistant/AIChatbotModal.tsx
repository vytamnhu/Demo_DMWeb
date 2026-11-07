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
  RotateCcw
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

  // Mode: 'chat' | 'calculator' | 'allergy_check'
  const [activeTab, setActiveTab] = useState<'chat' | 'calculator' | 'allergy_check'>('chat');

  // Calculator Tool state
  const [selectedProduct, setSelectedProduct] = useState<'biscotti' | 'tuiles'>('biscotti');
  const [servingsCount, setServingsCount] = useState<number>(2);
  const [calcResult, setCalcResult] = useState<ServingCalculationResult>(() => calculateServings('biscotti', 2));

  // Chat message stream
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: 'Chào bạn! Mình là **Trợ lý tư vấn dinh dưỡng của SOWELL** 🌿.\n\nMình sẵn sàng hỗ trợ bạn đối chiếu thành phần và tra cứu dinh dưỡng cho **toàn bộ 10 dòng sản phẩm của SOWELL**: từ Biscotti (3 vị), Bánh ngói hạnh nhân, đến các dòng bánh thanh ngũ cốc Eat Clean, Thuần Chay (Vegan), Nut-Free (không hạt vỏ cứng), Giàu Đạm (High-Protein cho Gymer) và Granola siêu hạt.\n\nNếu bạn có dị ứng bất kỳ loại hạt nào hoặc đang theo chế độ ăn riêng biệt, hãy cho mình biết để mình đối chiếu và gợi ý dòng bánh phù hợp nhất nhé!',
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

    // Add user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Vừa xong'
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Process question with SOWELL consultant engine
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
    }, 400);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'ai',
        text: 'Chào bạn! Mình là **Trợ lý tư vấn bánh của SOWELL** 🌿.\n\nMình giúp bạn hiểu rõ về thành phần, bảng số liệu dinh dưỡng của **Biscotti (3 vị)** và **Bánh ngói hạnh nhân**. Bạn cần hỗ trợ thông tin gì ạ?',
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
      <div className="bg-[#FAF8F5] rounded-3xl max-w-xl w-full h-[90vh] sm:h-[85vh] shadow-2xl flex flex-col overflow-hidden border border-[#E8E2D5] relative animate-scaleUp">
        
        {/* Chatbot Header */}
        <div className="bg-[#153E26] text-white p-4 sm:p-5 relative shadow-md shrink-0">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleResetChat}
              className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              title="Làm mới cuộc trò chuyện"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAIChatOpen(false)}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 text-2xl shrink-0">
              🍪
            </div>
            <div className="pr-16">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">Trợ Lý Tư Vấn Bánh SOWELL</h3>
                <span className="bg-[#E59828] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Chuyên môn
                </span>
              </div>
              
              <p className="text-xs text-emerald-100 font-medium leading-snug mt-1 bg-white/10 px-2.5 py-1 rounded-xl border border-white/15">
                🌿 Tư vấn dinh dưỡng toàn diện • Đối chiếu dị ứng hạt & gợi ý bánh phù hợp
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex gap-2 mt-3 pt-2 border-t border-white/15 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'chat' ? 'bg-white text-[#153E26] font-bold shadow-xs' : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              💬 Tư Vấn Trực Tiếp
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calculator' ? 'bg-white text-[#153E26] font-bold shadow-xs' : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Tính Khẩu Phần</span>
            </button>
            <button
              onClick={() => setActiveTab('allergy_check')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'allergy_check' ? 'bg-white text-[#153E26] font-bold shadow-xs' : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Cây Dị Ứng</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* TAB 1: CALCULATOR TOOL */}
          {activeTab === 'calculator' && (
            <div className="bg-white rounded-3xl p-5 border border-[#E8E2D5] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#1E7547]" />
                  <h4 className="font-bold text-sm text-[#1C2D20]">Tính Chỉ Số Khẩu Phần & Đối Chiếu WHO</h4>
                </div>
                <button onClick={() => setActiveTab('chat')} className="text-xs text-zinc-400 hover:text-zinc-600">
                  Trở lại chat
                </button>
              </div>

              {/* Product selector */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">1. Chọn loại bánh:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdateCalculation('biscotti', servingsCount)}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      selectedProduct === 'biscotti'
                        ? 'border-[#1E7547] bg-[#EBF7EE]'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#1C2D20]">Biscotti (3 vị)</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Khẩu phần: 50g (~2 miếng)</div>
                  </button>
                  <button
                    onClick={() => handleUpdateCalculation('tuiles', servingsCount)}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      selectedProduct === 'tuiles'
                        ? 'border-[#1E7547] bg-[#EBF7EE]'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#1C2D20]">Bánh ngói hạnh nhân</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Khẩu phần: 20g (2 bánh)</div>
                  </button>
                </div>
              </div>

              {/* Servings count */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <label className="font-bold text-zinc-700">2. Số khẩu phần định ăn:</label>
                  <span className="font-bold text-[#1E7547] font-mono text-sm">
                    {servingsCount} khẩu phần ({calcResult.totalGrams} g)
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleUpdateCalculation(selectedProduct, num)}
                      className={`flex-1 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        servingsCount === num
                          ? 'bg-[#1E7547] text-white border-[#1E7547]'
                          : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                      }`}
                    >
                      {num} {num === 5 && selectedProduct === 'biscotti' ? '(gói 250g)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Output Card */}
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-zinc-200 space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-zinc-200 shadow-2xs">
                    <span className="text-[10px] text-zinc-500 block uppercase">Năng lượng</span>
                    <span className="font-mono font-bold text-[#1C2D20] text-sm block mt-0.5">
                      {calcResult.calories} kcal
                    </span>
                    <span className="text-[10px] text-zinc-400">({calcResult.caloriesPercentageOfWHO}% WHO)</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-zinc-200 shadow-2xs">
                    <span className="text-[10px] text-zinc-500 block uppercase">Đường</span>
                    <span className="font-mono font-bold text-[#D97706] text-sm block mt-0.5">
                      {calcResult.sugar} g
                    </span>
                    <span className="text-[10px] text-zinc-400">({calcResult.sugarPercentageOfWHO}% WHO)</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-zinc-200 shadow-2xs">
                    <span className="text-[10px] text-zinc-500 block uppercase">Đạm (Protein)</span>
                    <span className="font-mono font-bold text-[#1E7547] text-sm block mt-0.5">
                      {calcResult.protein} g
                    </span>
                    <span className="text-[10px] text-zinc-400">trên {calcResult.totalGrams}g</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2 rounded-xl border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 block">Carb: {calcResult.carbs}g</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 block">Chất béo: {calcResult.fat}g</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 block">Natri: {calcResult.sodium}mg</span>
                  </div>
                </div>

                {/* Formula display */}
                <div className="text-[11px] text-zinc-600 bg-white p-2.5 rounded-xl border border-zinc-200 leading-relaxed">
                  <strong>Phép tính:</strong> {calcResult.formulaText}
                </div>

                <p className="text-[10px] text-zinc-600 bg-zinc-50 p-2 rounded-xl border border-zinc-200 leading-snug">
                  💡 Mốc tham chiếu WHO (50g đường tự do, 2.000 kcal) là mốc chuẩn chung cho người trưởng thành khỏe mạnh để bạn dễ dàng theo dõi lượng ăn hàng ngày.
                </p>

                <button
                  onClick={handleSendCalculationToChat}
                  className="w-full bg-[#1E7547] hover:bg-[#165a36] text-white py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Gửi câu hỏi về lượng ăn này vào khung chat</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ALLERGY QUICK CHECK */}
          {activeTab === 'allergy_check' && (
            <div className="bg-white rounded-3xl p-5 border border-[#E8E2D5] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <h4 className="font-bold text-sm text-[#1C2D20]">Cây Quyết Định Dị Ứng & Kiêng Cữ</h4>
                </div>
                <button onClick={() => setActiveTab('chat')} className="text-xs text-zinc-400 hover:text-zinc-600">
                  Trở lại chat
                </button>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Bấm vào trường hợp bạn hoặc người thân đang kiêng để đối chiếu trực tiếp với bảng thành phần SOWELL:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: '🌰 Dị ứng Hạnh nhân (Almond)', query: 'Tôi dị ứng hạnh nhân, đối chiếu sản phẩm phù hợp cho tôi với?' },
                  { label: '🥜 Dị ứng Hạt điều (Cashew)', query: 'Tôi dị ứng hạt điều, ăn loại bánh nào an toàn?' },
                  { label: '🧠 Dị ứng Quả óc chó (Walnut)', query: 'Tôi dị ứng quả óc chó, có bánh nào không chứa óc chó?' },
                  { label: '🥜 Dị ứng Đậu phộng (Peanut)', query: 'Tôi dị ứng đậu phộng, ăn bánh nào được?' },
                  { label: '🛡️ Dị ứng TẤT CẢ hạt vỏ cứng (Nut-Free)', query: 'Tôi dị ứng tất cả các loại hạt, có bánh nào nut-free an toàn?' },
                  { label: '🌱 Người Ăn Thuần Chay (Vegan 100%)', query: 'Tôi ăn thuần chay vegan, bánh nào 100% từ thực vật không trứng bơ sữa?' },
                  { label: '🥛 Dị ứng Trứng hoặc Sữa / Bơ lạt', query: 'Tôi dị ứng trứng và bơ sữa động vật, tư vấn bánh phù hợp?' },
                  { label: '🌾 Dị ứng Gluten / Bột mì (Celiac)', query: 'Tôi không ăn được gluten, chọn bánh nào?' },
                  { label: '💪 Người tập Gym / Cần nhiều Đạm', query: 'Bánh nào nhiều protein đạm nhất cho người tập gym?' },
                  { label: '🍃 Người cần kiểm soát Đường huyết', query: 'Người tiểu đường ăn được loại bánh nào?' },
                  { label: '✨ Mẹ bầu & Sau sinh', query: 'Mẹ bầu và sau sinh ăn loại bánh nào phù hợp?' },
                  { label: '🥗 Kiểm soát Calo / Giảm mỡ', query: 'Bánh nào ít calo nhất để kiểm soát cân nặng?' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleSendMessage(item.query);
                      setActiveTab('chat');
                    }}
                    className="p-3 rounded-2xl border border-zinc-200 hover:border-[#1E7547] hover:bg-[#EBF7EE] text-left transition-all cursor-pointer group"
                  >
                    <span className="font-bold text-xs text-[#1C2D20] group-hover:text-[#1E7547]">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5 truncate">
                      "{item.query}"
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CHAT MESSAGES STREAM */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#153E26] text-white flex items-center justify-center text-xs shrink-0 mt-1">
                  🍪
                </div>
              )}
              
              <div className={`max-w-[88%] space-y-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Message Bubble */}
                <div
                  className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#1E7547] text-white rounded-tr-none'
                      : 'bg-white text-zinc-800 border border-[#E8E2D5] rounded-tl-none shadow-xs'
                  }`}
                >
                  <div 
                    className="whitespace-pre-line"
                    dangerouslySetInnerHTML={{ 
                      __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                    }} 
                  />

                  {/* Recommended Product Card Inside Message */}
                  {msg.recommendedProduct && (
                    <div className="mt-3 bg-[#FAF8F5] rounded-xl p-3 border border-[#E8E2D5] space-y-2.5">
                      <div className="flex gap-3 items-center">
                        <img
                          src={msg.recommendedProduct.images[0]}
                          alt={msg.recommendedProduct.name}
                          className="w-14 h-14 rounded-xl object-cover border border-zinc-200 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] bg-[#EBF7EE] text-[#1E7547] font-bold px-1.5 py-0.2 rounded">
                            Sản Phẩm SOWELL
                          </span>
                          <h5 className="font-bold text-xs text-[#1C2D20] truncate mt-0.5">
                            {msg.recommendedProduct.name}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-black text-[#1E7547] font-mono">
                              {msg.recommendedProduct.price.toLocaleString('vi-VN')}₫
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              • {msg.recommendedProduct.nutrition.calories} kcal / khẩu phần
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(msg.recommendedProduct!, 1)}
                        className="w-full bg-[#1E7547] hover:bg-[#165a36] text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Thêm Vào Giỏ Hàng</span>
                      </button>
                    </div>
                  )}

                  {/* Quick replies */}
                  {msg.quickReplies && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100">
                      {msg.quickReplies.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(reply)}
                          className="text-[11px] bg-[#FAF8F5] hover:bg-[#EBF7EE] text-[#1E7547] border border-[#CDEED5] px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer"
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

        {/* Bottom Bar: Action & Text input */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#E8E2D5] space-y-2 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Hỏi về thành phần, calo, dị ứng, tiểu đường, bảo quản..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-[#FAF8F5] text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#1E7547]"
            />
            <button
              onClick={() => handleSendMessage()}
              className="bg-[#1E7547] hover:bg-[#165a36] text-white p-2.5 rounded-xl transition-colors cursor-pointer shrink-0"
              title="Gửi câu hỏi"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1">
            <span>💡 Câu trả lời dựa trên nhãn thật và mốc tham chiếu WHO</span>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab('calculator')}
                className="text-[#1E7547] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Calculator className="w-3 h-3 text-[#E59828]" />
                <span>Tính khẩu phần</span>
              </button>
              <button
                onClick={() => setActiveTab('allergy_check')}
                className="text-rose-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ShieldAlert className="w-3 h-3" />
                <span>Kiểm tra dị ứng</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
