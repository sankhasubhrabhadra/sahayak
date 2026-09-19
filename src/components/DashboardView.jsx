import React, { useState, useEffect } from 'react';
import { Flame, CheckCircle, Circle, Trophy, ArrowRight, Zap, RefreshCw, Award, Sliders, ShieldCheck, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRANSLATIONS } from '../data/mockData';

export default function DashboardView({
  applicant,
  habitPhases,
  onToggleTask,
  onFastForward,
  onProceedToSuccess,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [activeTab, setActiveTab] = useState('all');

  // Calculate overall completion percentage from habit tasks
  let totalWeight = 0;
  let completedWeight = 0;
  let totalXp = 0;
  let earnedXp = 0;

  habitPhases.forEach((phase) => {
    phase.tasks.forEach((task) => {
      totalWeight += task.weightPercent;
      totalXp += task.xp;
      if (task.completed) {
        completedWeight += task.weightPercent;
        earnedXp += task.xp;
      }
    });
  });

  const progressPercent = Math.min(100, Math.round((completedWeight / totalWeight) * 100)) || 0;
  const is100Percent = progressPercent >= 100;

  // Streak count simulation
  const streakDays = Math.max(1, Math.round(progressPercent * 0.9));

  // Trigger confetti when hitting 100%
  useEffect(() => {
    if (is100Percent) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [is100Percent]);

  // Circular progress ring parameters
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: Paytm Financial Fitness Dashboard */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Paytm Credit Builder Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">• Real-Time Bureau Sync</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            {applicant.fullName || 'Rahul'}'s {t.trackerTitle}
          </h1>
        </div>

        {/* 100% Celebration Action Banner if completed */}
        {is100Percent && (
          <button
            onClick={onProceedToSuccess}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer active:scale-[0.99]"
          >
            <Trophy className="w-5 h-5 text-white" />
            <span>🎉 100% Ready — Claim ₹1,50,000 Loan!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hero Stats Row: Fitness Dial + Streak + Level XP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Circular Progress Gauge */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {t.readinessScore}
            </span>
            <div className="text-4xl font-bold text-slate-900">
              {progressPercent}%
            </div>
            <p className="text-xs text-slate-500">
              {is100Percent ? '🌟 Fully Sanction Ready' : 'In Progress (On Track)'}
            </p>
          </div>

          {/* Circular SVG Gauge */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#F1F5F9"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke={is100Percent ? '#059669' : '#00BAF2'}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-base font-bold text-slate-900">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Card 2: Streak Counter */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Discipline Streak
            </span>
            <div className="text-2xl font-bold text-slate-900 flex items-center gap-2 mt-0.5">
              <span>{streakDays} Days</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-md border border-emerald-200">Active</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              100% timely auto-debit payments recorded.
            </p>
          </div>
        </div>

        {/* Card 3: Financial Health XP */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Paytm Cashback Points
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              Level {progressPercent > 60 ? '3' : progressPercent > 30 ? '2' : '1'}
            </div>
            <p className="text-xs text-slate-500">
              {earnedXp} / {totalXp} Reward Points
            </p>
          </div>
        </div>
      </div>

      {/* Presenter & Hackathon Demo Superpower: Fast-Forward Slider Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-white">
              {t.fastForwardTitle}
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Simulate 90-day progress timeline for demo:
          </span>
        </div>

        {/* Quick Jump Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onFastForward(20)}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-colors border border-slate-700 text-slate-300 cursor-pointer"
          >
            Day 1 (20% Start)
          </button>
          <button
            onClick={() => onFastForward(45)}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-colors border border-slate-700 text-slate-300 cursor-pointer"
          >
            Day 30 (45% Month 1)
          </button>
          <button
            onClick={() => onFastForward(75)}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-colors border border-slate-700 text-slate-300 cursor-pointer"
          >
            Day 60 (75% Month 2)
          </button>
          <button
            onClick={() => onFastForward(100)}
            className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Day 90 (100% Ready 🎉)
          </button>
        </div>

        {/* Slider */}
        <div className="pt-1">
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={progressPercent}
            onChange={(e) => onFastForward(Number(e.target.value))}
            className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Habit Checklist Section with Month Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900">
              Paytm Verified Milestone Habits Checklist
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Check off tasks as you complete them to reduce DTI and increase loan readiness.
            </p>
          </div>

          {/* Phase Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'all' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Phases
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 1 ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Month 1
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 2 ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Month 2
            </button>
            <button
              onClick={() => setActiveTab(3)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 3 ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Month 3
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-6">
          {habitPhases
            .filter((phase) => activeTab === 'all' || phase.phaseId === activeTab)
            .map((phase) => (
              <div key={phase.phaseId} className="space-y-3">
                <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                  <span className="font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    {phase.phaseTitle}
                  </span>
                  <span className="text-slate-400 font-medium">{phase.phaseBadge}</span>
                </div>

                <div className="space-y-2.5">
                  {phase.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => onToggleTask(phase.phaseId, task.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        task.completed
                          ? 'bg-slate-50/70 border-slate-200/60 opacity-80'
                          : 'bg-white border-slate-200/80 shadow-xs hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {task.completed ? (
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className={`text-xs sm:text-sm font-semibold ${
                            task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                          }`}>
                            {task.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                            {task.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          +{task.xp} pts
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom CTA when 100% */}
      {is100Percent && (
        <div className="bg-emerald-600 text-white rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">
              🎉 All 90-Day Milestones Successfully Achieved!
            </h3>
            <p className="text-xs text-emerald-100 font-normal">
              Your revised DTI is verified at 34.2% and pre-approved loan sanctions are unlocked.
            </p>
          </div>

          <button
            onClick={onProceedToSuccess}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-semibold text-xs sm:text-sm shadow-xs transition-all whitespace-nowrap cursor-pointer active:scale-[0.99]"
          >
            Claim Pre-Approved Loan Offer ➔
          </button>
        </div>
      )}
    </div>
  );
}

