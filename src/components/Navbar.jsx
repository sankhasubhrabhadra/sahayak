import React, { useState } from 'react';
import { Globe, RefreshCw, Search, Headphones, ChevronDown, CheckCircle2, SlidersHorizontal } from 'lucide-react';
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
    { id: 'landing', label: 'Home' },
    { id: 'application', label: 'Eligibility' },
    { id: 'explainer', label: 'Diagnosis' },
    { id: 'offers', label: 'Bank Offers' },
    { id: 'roadmap', label: '90-Day Plan' },
    { id: 'dashboard', label: 'Tracker' },
    { id: 'success', label: 'Sanction' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="flex items-baseline">
                <span className="font-black text-xl tracking-tighter text-[#002970]">Pay</span>
                <span className="font-black text-xl tracking-tighter text-[#00BAF2]">tm</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 text-xs font-semibold text-slate-500">
                <span>Sahayak</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">AI Coach</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {paytmTabs.map((tab) => {
                const isActive = currentView === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentView(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* 24x7 Help Trigger */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center gap-1.5 text-slate-700 hover:text-[#002970] px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Headphones className="w-3.5 h-3.5 text-[#00BAF2]" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-800 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[#002970] text-white font-bold text-[10px] flex items-center justify-center">
                  {activePersona.name.charAt(0)}
                </div>
                <span className="font-semibold text-xs hidden sm:inline max-w-[80px] truncate">
                  {activePersona.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-slate-800 animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 mb-1">
                    <span>Select Persona</span>
                    <span className="text-[#00BAF2]">Demo Profiles</span>
                  </div>
                  {DEMO_PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPersona(p.id);
                        setShowPersonaMenu(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                        activePersonaId === p.id
                          ? 'bg-slate-50 border border-slate-300'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xl">{p.avatar}</span>
                      <div className="overflow-hidden flex-1 text-xs">
                        <div className="font-bold text-slate-900 flex items-center justify-between">
                          <span>{p.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                            p.id === 'amit' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {p.id === 'amit' ? 'Pass 20%' : 'Reject 56%'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{p.tag}</div>
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
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
