import React, { useState } from 'react';
import { Sparkles, Globe, RefreshCw, Users, ShieldCheck } from 'lucide-react';
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

  const steps = [
    { id: 'landing', label: '1. Home' },
    { id: 'application', label: '2. Apply' },
    { id: 'explainer', label: '3. AI Diagnosis' },
    { id: 'offers', label: '4. Best-Fit Offers' },
    { id: 'roadmap', label: '5. 90-Day Plan' },
    { id: 'dashboard', label: '6. Tracker' },
    { id: 'success', label: '7. Approved 🎉' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Hackathon Banner */}
      <div className="bg-[#002970] text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-[#00BAF2] text-[#002970] font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
            Paytm Build for India
          </span>
          <span className="hidden sm:inline text-blue-100 font-normal">
            Track: AI-Powered Financial Journeys • Prototype Demo
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#00BAF2]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold">RBI Safe Sandbox</span>
          </span>
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded text-[11px] transition-colors"
            title="Toggle English / Hinglish"
          >
            <Globe className="w-3 h-3 text-[#00BAF2]" />
            <span>{lang === 'en' ? '🇮🇳 Hinglish' : '🇬🇧 English'}</span>
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Paytm + Sahayak Brand Wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-3 text-left group"
            >
              {/* Paytm Dual-Tone Brand Badge */}
              <div className="h-10 px-3 rounded-xl bg-white border-2 border-[#002970]/10 flex items-center justify-center shadow-sm group-hover:border-[#00BAF2] transition-colors">
                <span className="font-black text-xl tracking-tight text-[#002970]">
                  Pay<span className="text-[#00BAF2]">tm</span>
                </span>
              </div>

              <div className="h-7 w-px bg-slate-200 hidden sm:block" />

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-[#002970]">
                    Sahayak
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-black bg-[#00BAF2] text-[#002970]">
                    <Sparkles className="w-2.5 h-2.5 mr-0.5 text-[#002970]" /> AI
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider -mt-0.5">
                  Financial Journey Advisor
                </p>
              </div>
            </button>
          </div>

          {/* Quick Flow Breadcrumbs (Clickable for quick pitch navigation) */}
          <nav className="hidden xl:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            {steps.map((step) => {
              const isActive = currentView === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentView(step.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#002970] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#002970] hover:bg-white/60'
                  }`}
                >
                  {step.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Persona Selector + Reset + AI Coach */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Demo Persona Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-[#00BAF2] text-[#002970] px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-[#00BAF2]" />
                <span className="hidden sm:inline">Demo Persona:</span>
                <span className="font-bold text-[#0084B4]">
                  {DEMO_PERSONAS.find((p) => p.id === activePersonaId)?.name.split(' ')[0] || 'Rahul'}
                </span>
              </button>

              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Test Scenario
                  </div>
                  {DEMO_PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPersona(p.id);
                        setShowPersonaMenu(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg flex items-center gap-2.5 transition-colors ${
                        activePersonaId === p.id
                          ? 'bg-blue-50 border border-[#00BAF2]/30 text-[#002970]'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xl">{p.avatar}</span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-[#002970] flex items-center gap-1.5">
                          {p.name}
                          {p.id === 'amit' ? (
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1 rounded">Approved</span>
                          ) : (
                            <span className="text-[10px] bg-amber-100 text-amber-700 px-1 rounded">56% DTI</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{p.tag}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Coach Floating Toggle */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#00BAF2] to-[#0084B4] hover:opacity-95 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-[#00BAF2]/25 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="hidden md:inline">Ask AI Coach</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={onReset}
              title="Reset Application State"
              className="p-2 text-slate-400 hover:text-[#002970] hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
