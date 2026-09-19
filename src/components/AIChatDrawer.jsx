import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, HelpCircle, ChevronRight, ShieldAlert, Headphones, ShieldCheck, Lock } from 'lucide-react';
import { AI_FAQ_KNOWLEDGE } from '../data/mockData';
import { generateFinancialAdvisorResponse } from '../utils/financialEngine';

export default function AIChatDrawer({
  isOpen,
  onClose,
  applicant
}) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${applicant?.fullName || 'Rahul'}! I am Paytm Sahayak, your AI Financial Education Coach. I can help you understand your Debt-to-Income (DTI) calculations, explore what-if scenarios, or clarify RBI fortnightly reporting rules. How can I help you today?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendPrompt = (question, explicitAnswer) => {
    // Add user question
    const userMsg = { sender: 'user', text: question };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let aiReply = explicitAnswer;
      if (!aiReply) {
        const generated = generateFinancialAdvisorResponse(question, applicant);
        aiReply = generated.answer;
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    }, 450);
  };

  const handleCustomSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    setInputText('');

    const generated = generateFinancialAdvisorResponse(query, applicant);
    handleSendPrompt(query, generated.answer);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Chat Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-[#002970] via-[#001f5c] to-[#001438] text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00BAF2] text-[#002970] flex items-center justify-center font-black shadow-md shadow-[#00BAF2]/30">
              <Headphones className="w-5 h-5 text-[#002970]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-extrabold text-sm">
                <span className="font-black">Paytm Sahayak 24x7</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#00BAF2]">
                <Lock className="w-2.5 h-2.5" />
                <span>256-Bit Encrypted Financial Advisory</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safety & Educational Disclaimer Bar */}
        <div className="px-3.5 py-1.5 bg-[#E8F7FD] border-b border-[#00BAF2]/20 flex items-center gap-2 text-[10px] text-[#002970] leading-tight font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00BAF2] shrink-0" />
          <span>Educational estimation engine. Sanction decisions remain subject to partner bank credit policies.</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#E8F7FD] border border-[#00BAF2]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#00BAF2]" />
                </div>
              )}
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-[#002970] text-white rounded-tr-none shadow-sm'
                    : 'bg-[#F7F9FC] text-[#002970] rounded-tl-none border border-slate-200 font-medium'
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
              <span>Paytm AI is computing personalized answer...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-[#00BAF2]" />
            <span>Suggested Questions:</span>
          </div>
          <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto pr-1">
            {AI_FAQ_KNOWLEDGE.map((faq) => (
              <button
                key={faq.id}
                onClick={() => handleSendPrompt(faq.question, faq.answer)}
                className="text-left p-2 rounded-xl bg-white hover:bg-[#E8F7FD] border border-slate-200 hover:border-[#00BAF2] text-[11px] font-semibold text-[#002970] transition-colors flex items-center justify-between group"
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
            placeholder="Ask Sahayak (e.g. 'How do I cut my DTI to 40%?')..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00BAF2] focus:ring-1 focus:ring-[#00BAF2] outline-none text-xs text-[#002970]"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-gradient-to-r from-[#00BAF2] to-[#0084B4] hover:opacity-95 text-[#002970] font-black transition-colors shadow-sm"
          >
            <Send className="w-4 h-4 text-[#002970]" />
          </button>
        </form>
      </div>
    </div>
  );
}
