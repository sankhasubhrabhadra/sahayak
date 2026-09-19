import React, { useState } from 'react';
import { Sparkles, Globe, RefreshCw, Users, ShieldCheck, Search, Headphones, QrCode, Bell, ChevronDown, CheckCircle2 } from 'lucide-react';
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
    { id: 'landing', label: 'Loans & Credit' },
    { id: 'application', label: 'Apply Loan' },
    { id: 'explainer', label: 'Sahayak AI Diagnosis' },
    { id: 'offers', label: 'Bank Matches' },
    { id: 'roadmap', label: '90-Day Plan' },
    { id: 'dashboard', label: 'Credit Tracker' },
    { id: 'success', label: 'Sanction Letter 📄' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs transition-all">
      {/* 1. Official Paytm Top Utility Bar */}
      <div className="bg-[#002970] text-white px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          {/* Paytm Brandmark in Official Typography */}
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 text-left"
          >
            <div className="bg-white px-2.5 py-1 rounded-md flex items-center shadow-xs">
              <span className="font-black text-base tracking-tighter text-[#002970] leading-none">
                Pay<span className="text-[#00BAF2]">tm</span>
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 pl-1 text-[11px] font-bold text-blue-100">
              <span>Financial Services</span>
              <span className="text-[#00BAF2]">•</span>
              <span className="text-[#00BAF2] font-semibold">Sahayak AI Coach</span>
            </div>
          </button>
        </div>

        {/* Search Bar / Services Quick Finder (Authentic Paytm Search) */}
        <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
          <div className="w-full bg-[#001944] border border-blue-900 rounded-full px-3 py-1.5 flex items-center gap-2 text-blue-200 text-xs">
            <Search className="w-3.5 h-3.5 text-[#00BAF2]" />
            <input
              type="text"
              readOnly
              placeholder="Search Loans, DTI, CIBIL, EMI..."
              className="bg-transparent text-white placeholder-blue-300/70 text-xs outline-none w-full cursor-pointer"
              onClick={() => setIsChatOpen(true)}
            />
          </div>
        </div>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-semibold">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md text-[11px] transition-colors"
          >
            <Globe className="w-3 h-3 text-[#00BAF2]" />
            <span>{lang === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}</span>
          </button>

          {/* 24x7 Help / Coach Trigger */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="flex items-center gap-1.5 text-blue-100 hover:text-white bg-[#00BAF2]/20 hover:bg-[#00BAF2]/30 px-2.5 py-1 rounded-md text-[11px] text-[#00BAF2] font-bold transition-colors"
          >
            <Headphones className="w-3.5 h-3.5 text-[#00BAF2]" />
            <span className="hidden sm:inline">24x7 AI Help</span>
          </button>

          {/* User Profile Pill with KYC Tick */}
          <div className="relative">
            <button
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-full border border-white/10 text-white transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-[#00BAF2] text-[#002970] font-black text-[10px] flex items-center justify-center">
                {activePersona.name.charAt(0)}
              </div>
              <span className="font-bold text-[11px] hidden sm:inline max-w-[85px] truncate">
                {activePersona.name.split(' ')[0]}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 -ml-1" />
              <ChevronDown className="w-3 h-3 text-blue-200" />
            </button>

            {/* Persona Switcher Dropdown */}
            {showPersonaMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 text-slate-800 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-2 mb-1">
                  <span>Switch Paytm Persona</span>
                  <span className="text-[#0084B4]">Demo Scenarios</span>
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
                        ? 'bg-blue-50 border border-[#00BAF2]/40'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl">{p.avatar}</span>
                    <div className="overflow-hidden flex-1">
                      <div className="text-xs font-black text-[#002970] flex items-center justify-between">
                        <span>{p.name}</span>
                        {p.id === 'amit' ? (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Pass (20% DTI)</span>
                        ) : (
                          <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">Reject (56% DTI)</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{p.tag}</div>
                      <div className="text-[10px] font-semibold text-[#0084B4] mt-0.5">
                        ₹{p.monthlyIncome.toLocaleString('en-IN')}/mo • EMIs ₹{p.existingEmis.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={onReset}
            title="Reset to initial state"
            className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Paytm Sub-Navigation Bar (Product Journey Tabs) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center space-x-1.5 shrink-0">
            {paytmTabs.map((tab) => {
              const isActive = currentView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentView(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#002970] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#002970] hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Paytm Security Verified Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-bold text-slate-500 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#00B37E]" />
            <span>Paytm 100% Assurance</span>
          </div>
        </div>
      </div>
    </header>
  );
}
