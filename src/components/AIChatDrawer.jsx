import React, { useState, useEffect } from 'react';
import { X, Send, Headphones, ShieldCheck, Lock, ChevronRight, HelpCircle, AlertCircle } from 'lucide-react';
import { AI_FAQ_KNOWLEDGE } from '../data/mockData';
import { generateFinancialAdvisorResponse } from '../utils/financialEngine';

// Markdown renderer helper for clean rich text without raw markdown symbols
function FormattedMessage({ text }) {
  if (!text) return null;

  // Split text into paragraphs
  const paragraphs = text.split('\n\n');

  return (
    <div className="space-y-2 text-xs leading-relaxed">
      {paragraphs.map((para, pIdx) => {
        // Process bold syntax **text**
        const parts = para.split(/(\*\*.*?\*\*)/g);

        // Check if paragraph is a bullet list or single block
        const isBullet = para.trim().startsWith('•') || para.trim().startsWith('*') || para.trim().startsWith('-');

        return (
          <p key={pIdx} className={isBullet ? 'pl-2 border-l-2 border-[#00BAF2]/40 my-1' : ''}>
            {parts.map((part, partIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={partIdx} className="font-bold text-slate-900">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default function AIChatDrawer({
  isOpen,
  onClose,
  applicant = {},
  chatMessages = [],
  setChatMessages,
  lang = 'en'
}) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [inputError, setInputError] = useState('');

  const activeName = (applicant?.fullName || 'Applicant').trim();

  // Initialize greeting if chat is empty
  useEffect(() => {
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          sender: 'ai',
          text: `Hello ${activeName}! I am Paytm Sahayak, your AI Financial Education Coach.\n\nI can help you analyze your Debt-to-Income (DTI) ratio, explore what-if repayment scenarios, or clarify credit reporting guidelines. How can I assist you today?`
        }
      ]);
    }
  }, [chatMessages, activeName, setChatMessages]);

  if (!isOpen) return null;

  const handleSendPrompt = (question, explicitAnswer) => {
    const q = (question || '').trim();
    if (!q) return;

    setInputError('');
    const userMsg = { sender: 'user', text: q };
    setChatMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let aiReply = explicitAnswer;
      if (!aiReply) {
        const generated = generateFinancialAdvisorResponse(q, applicant, lang);
        aiReply = generated.answer;
      }
      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    }, 350);
  };

  const handleCustomSend = (e) => {
    e.preventDefault();
    const query = inputText.trim();

    if (!query) {
      setInputError(lang === 'hi' ? 'कृपया संदेश भेजने से पहले अपना प्रश्न टाइप करें।' : 'Please type a question before sending.');
      return;
    }

    setInputError('');
    setInputText('');
    const generated = generateFinancialAdvisorResponse(query, applicant, lang);
    handleSendPrompt(query, generated.answer);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Chat Drawer Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold border border-slate-700">
              <Headphones className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>Paytm Sahayak AI Coach</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                <Lock className="w-2.5 h-2.5" />
                <span>Active Profile: {activeName}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Chat Drawer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safety & Educational Disclaimer Bar */}
        <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-[10px] text-slate-600 leading-tight">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>Educational estimation engine. Sanction decisions remain subject to partner bank credit policies.</span>
        </div>

        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {chatMessages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-6 h-6 rounded-md bg-[#002970] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <span className="text-[10px] font-bold">P</span>
                </div>
              )}
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-[#002970] text-white rounded-tr-xs shadow-xs text-xs'
                    : 'bg-slate-50 text-slate-800 rounded-tl-xs border border-slate-200/80 font-medium'
                }`}
              >
                {m.sender === 'user' ? (
                  <div className="whitespace-pre-line text-xs">{m.text}</div>
                ) : (
                  <FormattedMessage text={m.text} />
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-slate-400">
              <div className="w-5 h-5 rounded-md bg-[#002970] text-white flex items-center justify-center text-[10px] font-bold">
                P
              </div>
              <span className="text-[11px]">Computing response...</span>
            </div>
          )}
        </div>

        {/* Input Error Message if submit empty */}
        {inputError && (
          <div className="px-4 py-1.5 bg-rose-50 border-t border-rose-200 text-rose-700 text-[11px] font-medium flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{inputError}</span>
          </div>
        )}

        {/* Suggested Quick Prompt Chips */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-1.5">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-slate-400" />
            <span>Suggested Questions:</span>
          </div>
          <div className="flex flex-col gap-1 max-h-28 overflow-y-auto pr-1">
            {AI_FAQ_KNOWLEDGE.map((faq) => (
              <button
                key={faq.id}
                onClick={() => handleSendPrompt(faq.question, faq.answer)}
                className="text-left p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-700 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span className="truncate">{faq.question}</span>
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-slate-700 shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCustomSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            maxLength={500}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (inputError) setInputError('');
            }}
            placeholder="Ask Sahayak (e.g. 'How do I cut my DTI to 40%?')..."
            aria-label="Ask Sahayak AI Coach"
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none text-xs text-slate-900"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            aria-label="Send Message"
            className={`p-2.5 rounded-lg transition-colors shadow-xs cursor-pointer active:scale-95 ${
              inputText.trim()
                ? 'bg-[#002970] hover:bg-[#001f5c] text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
