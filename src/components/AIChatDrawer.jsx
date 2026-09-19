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
    }, 400);
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-md bg-[#FFFDF5] h-full border-l-[3px] border-black shadow-brutal-xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Chat Drawer Header */}
        <div className="p-4 bg-black text-white flex items-center justify-between border-b-[3px] border-black">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FFD200] text-black flex items-center justify-center font-black border-2 border-black shadow-brutal-sm">
              <Headphones className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wide">
                <span>Paytm Sahayak 24x7</span>
                <span className="w-2 h-2 rounded-full bg-[#00BAF2] animate-pulse" />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#00BAF2] font-extrabold uppercase">
                <Lock className="w-3 h-3 stroke-[2.5]" />
                <span>Financial Guidance Engine</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white hover:bg-zinc-800 border-2 border-transparent hover:border-zinc-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Safety & Educational Disclaimer Bar */}
        <div className="px-3.5 py-2.5 bg-[#FFD200] border-b-2 border-black flex items-center gap-2 text-[11px] font-bold text-black leading-tight">
          <ShieldCheck className="w-4 h-4 text-black shrink-0 stroke-[2.5]" />
          <span>Educational estimation engine. Sanction decisions remain subject to partner bank credit policies.</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-md bg-[#00BAF2] border-2 border-black shadow-brutal-sm flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-black fill-black" />
                </div>
              )}
              <div
                className={`max-w-[85%] p-3.5 rounded-lg text-xs leading-relaxed whitespace-pre-line border-2 border-black shadow-brutal-sm ${
                  m.sender === 'user'
                    ? 'bg-[#FFD200] text-black font-bold'
                    : 'bg-white text-black font-semibold'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-black font-bold">
              <div className="w-6 h-6 rounded-md bg-[#00BAF2] border-2 border-black shadow-brutal-sm flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-black animate-spin" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider">Computing response...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="p-3 bg-white border-t-2 border-black space-y-2">
          <div className="text-[10px] font-black text-black uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            <span>Suggested Questions:</span>
          </div>
          <div className="flex flex-col gap-1.5 max-h-28 overflow-y-auto pr-1">
            {AI_FAQ_KNOWLEDGE.map((faq) => (
              <button
                key={faq.id}
                onClick={() => handleSendPrompt(faq.question, faq.answer)}
                className="text-left p-2 rounded-lg bg-[#FFFDF5] hover:bg-[#FFD200] border-2 border-black shadow-brutal-sm text-[11px] font-bold text-black transition-all flex items-center justify-between group cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                <span className="truncate">{faq.question}</span>
                <ChevronRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform shrink-0 ml-1 stroke-[2.5]" />
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCustomSend} className="p-3 bg-[#FFFDF5] border-t-2 border-black flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Sahayak (e.g. 'How do I cut my DTI to 40%?')..."
            className="flex-1 px-3.5 py-2.5 rounded-lg border-2 border-black bg-white focus:bg-[#FFFDF5] focus:shadow-brutal-sm outline-none text-xs font-bold text-black placeholder:text-zinc-500 placeholder:font-normal"
          />
          <button
            type="submit"
            className="p-3 rounded-lg bg-[#00BAF2] hover:bg-[#00a3d4] text-black font-black border-2 border-black shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 text-black stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
}
