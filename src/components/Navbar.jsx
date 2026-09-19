import React, { useState } from 'react';
import { Globe, RefreshCw, Search, Headphones, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';
import { DEMO_PERSONAS } from '../data/mockData';

export default function Navbar({
  currentView,
  setCurrentView,
  activePersonaId,
  onSelectPersona,
  onReset,
  lang,
  setLang,
  isChatOpen,
  setIsChatOpen
}) {
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const activePersona = DEMO_PERSONAS.find((p) => p.id === activePersonaId) || DEMO_PERSONAS[0];

  const paytmTabs = [
    { id: 'landing', label: '1. Home' },
    { id: 'application', label: '2. Eligibility' },
    { id: 'explainer', label: '3. Diagnosis' },
    { id: 'offers', label: '4. Offers' },
    { id: 'roadmap', label: '5. 90-Day Plan' },
    { id: 'dashboard', label: '6. Tracker' },
    { id: 'success', label: '7. Sanction' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF5] border-b-[3px] border-black shadow-brutal-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 text-left group bg-white px-3 py-1.5 border-2 border-black shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              <div className="flex items-baseline">
                <span className="font-black text-xl tracking-tighter text-[#002970]">Pay</span>
                <span className="font-black text-xl tracking-tighter text-[#00BAF2]">tm</span>
              </div>
              <span className="bg-[#FFD200] text-black text-[10px] font-black px-1.5 py-0.5 border border-black uppercase tracking-wider">
                Sahayak
              </span>
            </button>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {paytmTabs.map((tab) => {
                const isActive = currentView === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentView(tab.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-black transition-all border-2 border-black ${
                      isActive
                        ? 'bg-[#00BAF2] text-black shadow-brutal-sm translate-x-[1px] translate-y-[1px]'
                        : 'bg-white text-black hover:bg-[#FFD200] shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 bg-white px-3 py-1.5 border-2 border-black shadow-brutal-sm hover:bg-[#FFD200] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-black" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* 24x7 Help Trigger */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center gap-1.5 bg-[#FFD200] text-black px-3 py-1.5 border-2 border-black shadow-brutal-sm hover:bg-[#FFE55B] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              <Headphones className="w-4 h-4 text-black" />
              <span className="hidden sm:inline font-black">Ask AI</span>
            </button>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-2 bg-white px-3 py-1.5 border-2 border-black shadow-brutal-sm hover:bg-[#E6F8FE] transition-all"
              >
                <div className="w-5 h-5 bg-[#002970] text-white font-black text-[10px] flex items-center justify-center border border-black">
                  {activePersona.name.charAt(0)}
                </div>
                <span className="font-black text-xs hidden sm:inline max-w-[80px] truncate">
                  {activePersona.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-black" />
              </button>

              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-[#FFFDF5] border-[3px] border-black shadow-brutal-lg p-2.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1 text-[10px] font-black text-black uppercase tracking-wider flex items-center justify-between border-b-2 border-black mb-2 bg-[#FFD200]">
                    <span>Select Persona</span>
                    <span className="font-mono">PROFILES</span>
                  </div>
                  {DEMO_PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPersona(p.id);
                        setShowPersonaMenu(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg flex items-center gap-3 transition-all mb-1 border-2 border-black ${
                        activePersonaId === p.id
                          ? 'bg-[#00BAF2] shadow-brutal-sm font-black'
                          : 'bg-white hover:bg-[#FFE55B] shadow-brutal-sm hover:shadow-none'
                      }`}
                    >
                      <span className="text-xl p-1 bg-white border border-black rounded">{p.avatar}</span>
                      <div className="overflow-hidden flex-1 text-xs">
                        <div className="font-black text-black flex items-center justify-between">
                          <span>{p.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 border border-black font-black uppercase ${
                            p.id === 'amit' ? 'bg-[#00B37E] text-white' : 'bg-[#FF4D4D] text-white'
                          }`}>
                            {p.id === 'amit' ? '20% Pass' : '56% Reject'}
                          </span>
                        </div>
                        <div className="text-[11px] text-black font-medium truncate">{p.tag}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reset Demo Button */}
            <button
              onClick={onReset}
              title="Reset Demo"
              className="p-2 bg-white text-black border-2 border-black shadow-brutal-sm hover:bg-[#FF4D4D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

