import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingView from './components/LandingView';
import ApplicationFormView from './components/ApplicationFormView';
import RejectionExplainerView from './components/RejectionExplainerView';
import BestFitOffersView from './components/BestFitOffersView';
import RoadmapView from './components/RoadmapView';
import DashboardView from './components/DashboardView';
import SuccessView from './components/SuccessView';
import InstantApprovalView from './components/InstantApprovalView';
import AIChatDrawer from './components/AIChatDrawer';
import ErrorBoundary from './components/ErrorBoundary';
import FooterModals from './components/FooterModals';
import {
  DEMO_PERSONAS,
  INITIAL_APPLICATION_STATE,
  INITIAL_HABIT_TASKS
} from './data/mockData';
import { calculateDti } from './utils/financialEngine';
import { ShieldCheck, Home, FileText, Bot, BarChart3, HelpCircle } from 'lucide-react';

// Storage keys
const STORAGE_KEY_STATE = 'sahayak_demo_session_v2';

export default function App() {
  // Load initial state from sessionStorage if available
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [activePersonaId, setActivePersonaId] = useState('rahul');
  const [applicant, setApplicant] = useState(INITIAL_APPLICATION_STATE);
  const [habitPhases, setHabitPhases] = useState(INITIAL_HABIT_TASKS);
  const [lang, setLang] = useState('en');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [activeFooterModal, setActiveFooterModal] = useState(null);

  // Restore session from sessionStorage on initial mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentView) setCurrentView(parsed.currentView);
        if (parsed.activePersonaId) setActivePersonaId(parsed.activePersonaId);
        if (parsed.applicant) setApplicant(parsed.applicant);
        if (parsed.habitPhases) setHabitPhases(parsed.habitPhases);
        if (parsed.lang) setLang(parsed.lang);
        if (parsed.chatMessages) setChatMessages(parsed.chatMessages);
      }
    } catch (e) {
      console.warn('Could not restore session from storage', e);
    }
    setSessionLoaded(true);
  }, []);

  // Save session to sessionStorage whenever state changes
  useEffect(() => {
    if (!sessionLoaded) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY_STATE,
        JSON.stringify({
          currentView,
          activePersonaId,
          applicant,
          habitPhases,
          lang,
          chatMessages
        })
      );
    } catch (e) {
      console.warn('Could not save session to storage', e);
    }
  }, [currentView, activePersonaId, applicant, habitPhases, lang, chatMessages, sessionLoaded]);

  // Load a preset demo persona cleanly & scope chat history
  const handleSelectPersona = (personaId) => {
    setActivePersonaId(personaId);
    const persona = DEMO_PERSONAS.find((p) => p.id === personaId);
    if (persona) {
      const newApplicant = {
        fullName: persona.name,
        monthlyIncome: persona.monthlyIncome,
        existingEmis: persona.existingEmis,
        requestedLoanAmount: persona.requestedLoanAmount,
        tenureMonths: persona.tenureMonths,
        employmentType: persona.employmentType,
        creditTier: persona.creditTier,
        cibilScore: persona.cibilScore,
        personaId: persona.id,
        isCustom: false
      };
      setApplicant(newApplicant);

      // Clear chat messages to avoid cross-persona context leaks
      setChatMessages([
        {
          sender: 'ai',
          text: `Hello ${persona.name}! I am Paytm Sahayak, your AI Financial Education Coach.\n\nI can help you analyze your Debt-to-Income (DTI) ratio (${((persona.existingEmis / persona.monthlyIncome) * 100).toFixed(1)}%), explore what-if repayment scenarios, or clarify credit reporting guidelines. How can I assist you today?`
        }
      ]);

      if (persona.id === 'amit') {
        setCurrentView('instant-approval');
      } else {
        setCurrentView('explainer');
      }
    }
  };

  // Evaluation trigger from Application Form using single source of truth
  const handleSubmitEvaluation = () => {
    const { isSafe } = calculateDti(applicant.existingEmis, applicant.monthlyIncome);
    if (isSafe) {
      setCurrentView('instant-approval');
    } else {
      setCurrentView('explainer');
    }
  };

  // Toggle checklist task
  const handleToggleTask = (phaseId, taskId) => {
    setHabitPhases((prevPhases) =>
      prevPhases.map((phase) => {
        if (phase.phaseId === phaseId) {
          return {
            ...phase,
            tasks: phase.tasks.map((task) =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          };
        }
        return phase;
      })
    );
  };

  // Fast-Forward journey for demo pitch
  const handleFastForward = (targetPercent) => {
    let allTasks = [];
    habitPhases.forEach((p) => p.tasks.forEach((t) => allTasks.push(t.id)));

    let tasksToComplete = 0;
    if (targetPercent >= 100) tasksToComplete = allTasks.length;
    else if (targetPercent >= 75) tasksToComplete = 5;
    else if (targetPercent >= 45) tasksToComplete = 3;
    else if (targetPercent >= 20) tasksToComplete = 2;
    else tasksToComplete = 0;

    const completedIds = new Set(allTasks.slice(0, tasksToComplete));

    setHabitPhases((prevPhases) =>
      prevPhases.map((phase) => ({
        ...phase,
        tasks: phase.tasks.map((task) => ({
          ...task,
          completed: completedIds.has(task.id)
        }))
      }))
    );
  };

  // Reset demo completely
  const handleReset = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY_STATE);
    } catch (e) {}

    setApplicant(INITIAL_APPLICATION_STATE);
    setHabitPhases(INITIAL_HABIT_TASKS);
    setActivePersonaId('rahul');
    setChatMessages([]);
    setIsChatOpen(false);
    setActiveFooterModal(null);
    setCurrentView('landing');
  };

  // Calculate overall completion percent
  let totalWeight = 0;
  let completedWeight = 0;
  habitPhases.forEach((p) => {
    p.tasks.forEach((t) => {
      totalWeight += t.weightPercent;
      if (t.completed) completedWeight += t.weightPercent;
    });
  });
  const progressPercent = Math.min(100, Math.round((completedWeight / totalWeight) * 100)) || 0;

  return (
    <ErrorBoundary onReset={handleReset}>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 overflow-x-hidden">
        {/* Top Navbar */}
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          activePersonaId={activePersonaId}
          onSelectPersona={handleSelectPersona}
          onReset={handleReset}
          lang={lang}
          setLang={setLang}
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
        />

        {/* Main View Router */}
        <main className="flex-1 pb-16">
          {currentView === 'landing' && (
            <LandingView
              onStartApplication={() => setCurrentView('application')}
              onSelectPersona={handleSelectPersona}
              lang={lang}
            />
          )}

          {currentView === 'application' && (
            <ApplicationFormView
              applicant={applicant}
              setApplicant={setApplicant}
              onSubmitEvaluation={handleSubmitEvaluation}
              onSelectPersona={handleSelectPersona}
              activePersonaId={activePersonaId}
              lang={lang}
            />
          )}

          {currentView === 'explainer' && (
            <RejectionExplainerView
              applicant={applicant}
              onProceedToOffers={() => setCurrentView('offers')}
              onProceedToRoadmap={() => setCurrentView('roadmap')}
              lang={lang}
            />
          )}

          {currentView === 'offers' && (
            <BestFitOffersView
              applicant={applicant}
              onProceedToRoadmap={() => setCurrentView('roadmap')}
              lang={lang}
            />
          )}

          {currentView === 'roadmap' && (
            <RoadmapView
              applicant={applicant}
              onProceedToDashboard={() => setCurrentView('dashboard')}
              lang={lang}
            />
          )}

          {currentView === 'dashboard' && (
            <DashboardView
              applicant={applicant}
              habitPhases={habitPhases}
              onToggleTask={handleToggleTask}
              onFastForward={handleFastForward}
              onProceedToSuccess={() => setCurrentView('success')}
              lang={lang}
            />
          )}

          {currentView === 'success' && (
            <SuccessView
              applicant={applicant}
              progressPercent={progressPercent}
              onProceedToDashboard={() => setCurrentView('dashboard')}
              onResetAll={handleReset}
              lang={lang}
            />
          )}

          {currentView === 'instant-approval' && (
            <InstantApprovalView
              applicant={applicant}
              onResetAll={handleReset}
              lang={lang}
            />
          )}
        </main>

        {/* Slide-over AI Coach Drawer */}
        <AIChatDrawer
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          applicant={applicant}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          lang={lang}
        />

        {/* Footer Interactive Modals */}
        <FooterModals
          activeModal={activeFooterModal}
          onClose={() => setActiveFooterModal(null)}
        />

        {/* Paytm Sticky Bottom Action Bar (Mobile only) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-4 shadow-xs sm:hidden flex items-center justify-around">
          <button
            onClick={() => setCurrentView('landing')}
            aria-label="Loans Home"
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              currentView === 'landing' ? 'text-[#002970] font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Loans</span>
          </button>
          <button
            onClick={() => setCurrentView('application')}
            aria-label="Check Eligibility"
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              currentView === 'application' ? 'text-[#002970] font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Apply</span>
          </button>
          <button
            onClick={() => setCurrentView('explainer')}
            aria-label="Sahayak Coach Diagnosis"
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              currentView === 'explainer' || currentView === 'offers' ? 'text-[#002970] font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Sahayak</span>
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            aria-label="90 Day Tracker"
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              currentView === 'dashboard' ? 'text-[#002970] font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Tracker</span>
          </button>
          <button
            onClick={() => setIsChatOpen(true)}
            aria-label="24x7 AI Help"
            className="flex flex-col items-center gap-1 text-[10px] font-medium text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>24x7 Help</span>
          </button>
        </div>

        {/* Paytm Super App Footer */}
        <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 space-y-3 mb-14 sm:mb-0">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="font-bold text-[#002970] text-sm tracking-tight">Pay</span>
                <span className="font-bold text-[#00BAF2] text-sm tracking-tight">tm</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="font-medium text-slate-700">Sahayak AI Financial Coaching System</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-600">
              <span>Build for India AI Hackathon</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                RBI Fortnightly Synchronized
              </span>
              <span>•</span>
              <span className="text-slate-400">256-Bit SSL Encrypted</span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto border-t border-slate-100 pt-3 text-center md:text-left text-[11px] text-slate-400 flex flex-col md:flex-row items-center justify-between gap-2">
            <p>
              © 2026 One97 Communications Limited. Paytm Sahayak is an educational credit transformation coach built on RBI Digital Lending Guidelines.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <button
                onClick={() => setActiveFooterModal('privacy')}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Security & Privacy
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveFooterModal('grievance')}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Grievance Officer
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveFooterModal('nbfc')}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                NBFC Partner Disclosures
              </button>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
