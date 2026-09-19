import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, HelpCircle, ChevronRight } from 'lucide-react';
import { AI_FAQ_KNOWLEDGE } from '../data/mockData';

export default function AIChatDrawer({
  isOpen,
  onClose,
  applicant
}) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${applicant?.fullName || 'Rahul'}! I am Sahayak, your AI Financial Rejection Coach. I analyzed your application and know the exact underwriting algorithms used by Paytm and partner lenders. Ask me anything about your DTI, BNPLs, or 90-day plan!`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendPrompt = (question, answer) => {
    // Add user question
    const userMsg = { sender: 'user', text: question };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiReply = answer || `Underwriting models assess stability and debt capacity. In your case, closing small micro-lines (₹6,300/mo total) is the highest-leverage move to drop your DTI ratio from 56.6% to under 40% in under 30 days!`;
      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    }, 600);
  };

  const handleCustomSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    setInputText('');

    // Check if matching any FAQ
    const matchedFaq = AI_FAQ_KNOWLEDGE.find(
      (f) => f.question.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(f.id)
    );

    handleSendPrompt(query, matchedFaq ? matchedFaq.answer : null);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Chat Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-[#002970] to-[#001944] text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00BAF2] text-[#002970] flex items-center justify-center font-black">
              <Bot className="w-5 h-5 text-[#002970]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm">
                <span>Sahayak AI Coach</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-blue-200">Paytm Financial Journey Advisor</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#00BAF2]" />
                </div>
              )}
              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#002970] text-white rounded-tr-none'
                    : 'bg-slate-100 text-[#002970] rounded-tl-none border border-slate-200/60 font-medium'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-slate-400 italic">
              <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#00BAF2] animate-spin" />
              </div>
              <span>Sahayak AI is calculating response...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            <span>Suggested Questions:</span>
          </div>
          <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto pr-1">
            {AI_FAQ_KNOWLEDGE.map((faq) => (
              <button
                key={faq.id}
                onClick={() => handleSendPrompt(faq.question, faq.answer)}
                className="text-left p-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-[#00BAF2] text-[11px] font-semibold text-[#002970] transition-colors flex items-center justify-between group"
              >
                <span className="truncate">{faq.question}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00BAF2] shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCustomSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Sahayak about your credit journey..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00BAF2] focus:ring-1 focus:ring-[#00BAF2] outline-none text-xs text-[#002970]"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-[#002970] hover:bg-[#001944] text-white transition-colors"
          >
            <Send className="w-4 h-4 text-[#00BAF2]" />
          </button>
        </form>
      </div>
    </div>
  );
}
