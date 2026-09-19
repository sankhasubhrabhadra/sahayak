import React, { useState } from 'react';
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
import {
  DEMO_PERSONAS,
  INITIAL_APPLICATION_STATE,
  INITIAL_HABIT_TASKS
} from './data/mockData';
import { ShieldCheck, Home, FileText, Bot, BarChart3, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [activePersonaId, setActivePersonaId] = useState('rahul');
  const [applicant, setApplicant] = useState(INITIAL_APPLICATION_STATE);
  const [habitPhases, setHabitPhases] = useState(INITIAL_HABIT_TASKS);
  const [lang, setLang] = useState('en');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Load a preset demo persona
  const handleSelectPersona = (personaId) => {
    setActivePersonaId(personaId);
    const persona = DEMO_PERSONAS.find((p) => p.id === personaId);
    if (persona) {
      setApplicant({
        fullName: persona.name,
        monthlyIncome: persona.monthlyIncome,
        existingEmis: persona.existingEmis,
        requestedLoanAmount: persona.requestedLoanAmount,
        tenureMonths: persona.tenureMonths,
        employmentType: persona.employmentType,
        creditTier: persona.creditTier
      });

      // If Amit, route to instant approval or let them check
      if (persona.id === 'amit') {
        setCurrentView('instant-approval');
      } else {
        // High DTI persona -> jump to diagnosis explainer to showcase coach
        setCurrentView('explainer');
      }
    }
  };

  // Evaluation trigger from Application Form
  const handleSubmitEvaluation = () => {
    const dti = (Number(applicant.existingEmis) / Number(applicant.monthlyIncome)) * 100;
    if (dti > 40) {
      setCurrentView('explainer');
    } else {
      setCurrentView('instant-approval');
    }
  };

  // Toggle individual checklist item
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

  // Reset demo
  const handleReset = () => {
    setApplicant(INITIAL_APPLICATION_STATE);
    setHabitPhases(INITIAL_HABIT_TASKS);
    setActivePersonaId('rahul');
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5] text-black">
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
      />

      {/* Official Paytm Neo-Brutalist Sticky Bottom Action Bar (Mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-[3px] border-black py-2.5 px-3 sm:hidden flex items-center justify-around shadow-brutal">
        <button
          onClick={() => setCurrentView('landing')}
          className={`flex flex-col items-center gap-1 text-[10px] font-black uppercase tracking-wider py-1 px-2 rounded border-2 transition-all ${
            currentView === 'landing' ? 'bg-[#FFD200] border-black shadow-brutal-sm text-black' : 'border-transparent text-slate-700'
          }`}
        >
          <Home className="w-4 h-4 stroke-[2.5]" />
          <span>Loans</span>
        </button>
        <button
          onClick={() => setCurrentView('application')}
          className={`flex flex-col items-center gap-1 text-[10px] font-black uppercase tracking-wider py-1 px-2 rounded border-2 transition-all ${
            currentView === 'application' ? 'bg-[#FFD200] border-black shadow-brutal-sm text-black' : 'border-transparent text-slate-700'
          }`}
        >
          <FileText className="w-4 h-4 stroke-[2.5]" />
          <span>Apply</span>
        </button>
        <button
          onClick={() => setCurrentView('explainer')}
          className={`flex flex-col items-center gap-1 text-[10px] font-black uppercase tracking-wider py-1 px-2 rounded border-2 transition-all ${
            currentView === 'explainer' || currentView === 'offers' ? 'bg-[#FFD200] border-black shadow-brutal-sm text-black' : 'border-transparent text-slate-700'
          }`}
        >
          <Bot className="w-4 h-4 stroke-[2.5]" />
          <span>Sahayak</span>
        </button>
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center gap-1 text-[10px] font-black uppercase tracking-wider py-1 px-2 rounded border-2 transition-all ${
            currentView === 'dashboard' ? 'bg-[#FFD200] border-black shadow-brutal-sm text-black' : 'border-transparent text-slate-700'
          }`}
        >
          <BarChart3 className="w-4 h-4 stroke-[2.5]" />
          <span>Tracker</span>
        </button>
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] font-black uppercase tracking-wider py-1 px-2 rounded border-2 border-black bg-[#00BAF2] text-black shadow-brutal-sm"
        >
          <HelpCircle className="w-4 h-4 stroke-[2.5]" />
          <span>24x7</span>
        </button>
      </div>

      {/* Official Paytm Neo-Brutalist Super App Footer */}
      <footer className="bg-white border-t-[3px] border-black py-8 px-4 sm:px-6 lg:px-8 space-y-4 mb-14 sm:mb-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-black">
          <div className="flex items-center gap-3">
            <div className="flex items-center px-3 py-1 bg-[#FFFDF5] border-2 border-black shadow-brutal-sm rounded-md">
              <span className="font-black text-[#002970] text-sm tracking-tight">Pay</span>
              <span className="font-black text-[#00BAF2] text-sm tracking-tight">tm</span>
            </div>
            <span className="font-black text-black">Sahayak AI Financial Coaching System</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-black text-black">
            <span className="bg-[#FFD200] px-2.5 py-1 rounded border-2 border-black shadow-brutal-sm uppercase">Build for India AI Hackathon</span>
            <span className="flex items-center gap-1.5 bg-[#00B37E] text-white px-2.5 py-1 rounded border-2 border-black shadow-brutal-sm uppercase">
              <ShieldCheck className="w-3.5 h-3.5 stroke-[3]" />
              RBI Fortnightly Sync
            </span>
            <span className="bg-zinc-100 px-2.5 py-1 rounded border-2 border-black shadow-brutal-sm uppercase text-slate-800">256-Bit SSL Encrypted</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t-2 border-black pt-4 text-center md:text-left text-[11px] font-bold text-slate-700 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>
            © 2026 One97 Communications Limited. Paytm Sahayak is an educational & credit transformation coach built on RBI Digital Lending Guidelines.
          </p>
          <div className="flex items-center gap-3 text-[11px] font-black text-black uppercase">
            <span className="hover:underline cursor-pointer">Security & Privacy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Grievance Officer</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">NBFC Disclosures</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
