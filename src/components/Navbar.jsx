import React, { useState } from 'react';
import { Globe, RefreshCw, Headphones, ChevronDown } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 text-left group transition-transform active:scale-95"
            >
              <div className="flex items-baseline">
                <span className="font-bold text-xl tracking-tight text-[#002970]">Pay</span>
                <span className="font-bold text-xl tracking-tight text-[#00BAF2]">tm</span>
              </div>
              <span className="bg-[#E8F8FD] text-[#002970] text-[11px] font-bold px-2 py-0.5 rounded-md border border-[#BCE8F9]">
                Sahayak
              </span>
            </button>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
              {paytmTabs.map((tab) => {
                const isActive = currentView === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentView(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#002970] text-white shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 bg-white text-slate-700 font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* 24x7 Help Trigger */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center gap-1.5 bg-[#002970] text-white font-medium px-3.5 py-1.5 rounded-lg hover:bg-[#001f5c] transition-colors shadow-xs cursor-pointer"
            >
              <Headphones className="w-3.5 h-3.5 text-slate-200" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
              >
                <div className="w-5 h-5 bg-slate-900 text-white font-semibold text-[10px] rounded-md flex items-center justify-center">
                  {activePersona.name.charAt(0)}
                </div>
                <span className="font-semibold text-xs text-slate-900 hidden sm:inline max-w-[80px] truncate">
                  {activePersona.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 mb-1.5">
                    <span>Select Persona</span>
                    <span className="font-normal text-[10px]">Demo Profiles</span>
                  </div>
                  {DEMO_PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPersona(p.id);
                        setShowPersonaMenu(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${
                        activePersonaId === p.id
                          ? 'bg-slate-100 font-semibold text-slate-900'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xl p-1 bg-white border border-slate-200 rounded-md shadow-2xs">{p.avatar}</span>
                      <div className="overflow-hidden flex-1 text-xs">
                        <div className="font-semibold text-slate-900 flex items-center justify-between">
                          <span>{p.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                            p.id === 'amit' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {p.id === 'amit' ? '20% Pass' : '56% Reject'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">{p.tag}</div>
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
              className="p-2 bg-white text-slate-500 rounded-lg border border-slate-200 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

