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
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#002970]">
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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 font-semibold">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00BAF2]" />
            Paytm Build for India AI Hackathon
          </span>
          <span>•</span>
          <span>Track: AI-Powered Financial Journeys</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-[#00B37E]">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Mock Simulated Logic
          </span>
        </div>
        <p className="text-[11px] text-slate-400">
          "Sahayak" — Transforming Loan Rejections into Guaranteed 90-Day Approval Pathways. Built for Indian Borrowers.
        </p>
      </footer>
    </div>
  );
}
