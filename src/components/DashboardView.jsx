import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, CheckCircle, Circle, Trophy, ArrowRight, Zap, RefreshCw, Award, Sliders, ShieldCheck, TrendingUp, Calendar } from 'lucide-react';
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
      } catch (e) {
        // Confetti fallback
      }
    }
  }, [is100Percent]);

  // Circular progress ring parameters
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Financial Fitness Dashboard */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0084B4] bg-blue-50 px-2.5 py-1 rounded-md">
              Sahayak Habit Engine
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Real-Time Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002970] mt-1">
            {applicant.fullName || 'Rahul'}'s {t.trackerTitle}
          </h1>
        </div>

        {/* 100% Celebration Action Banner if completed */}
        {is100Percent && (
          <button
            onClick={onProceedToSuccess}
            className="animate-bounce bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center gap-2 text-sm transition-all hover:scale-105"
          >
            <Trophy className="w-5 h-5 text-amber-300" />
            <span>🎉 100% Ready — Claim Pre-Approved Loan!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hero Stats Row: Fitness Dial + Streak + Level XP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Circular Progress Gauge */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.readinessScore}
            </span>
            <div className="text-3xl font-black text-[#002970]">
              {progressPercent}%
            </div>
            <p className="text-xs font-semibold text-slate-500">
              {is100Percent ? '🌟 Fully Sanction Ready' : 'In Progress (On Track)'}
            </p>
          </div>

          {/* Circular SVG Gauge */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#E2E8F0"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={is100Percent ? '#00B37E' : '#00BAF2'}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-black text-[#002970]">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Card 2: Streak Counter */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Flame className="w-9 h-9 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Discipline Streak
            </span>
            <div className="text-2xl font-black text-[#002970] flex items-center gap-1.5">
              <span>{streakDays} Days</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">🔥 Active</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Top 5% financial consistency among peers.
            </p>
          </div>
        </div>

        {/* Card 3: Financial Health XP */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#00BAF2]/10 border border-[#00BAF2]/20 flex items-center justify-center text-[#0084B4]">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Financial Level
            </span>
            <div className="text-2xl font-black text-[#002970]">
              Level {progressPercent > 60 ? '3' : progressPercent > 30 ? '2' : '1'}
            </div>
            <p className="text-xs font-semibold text-[#0084B4]">
              {earnedXp} / {totalXp} XP points earned
            </p>
          </div>
        </div>
      </div>

      {/* Presenter & Hackathon Demo Superpower: Fast-Forward Slider Bar */}
      <div className="bg-gradient-to-r from-[#002970] to-[#001944] text-white rounded-3xl p-6 shadow-card border border-blue-900/40 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#00BAF2]" />
            <span className="text-sm font-bold text-white">
              {t.fastForwardTitle}
            </span>
          </div>
          <span className="text-xs text-blue-200">
            Click presets or drag slider to demonstrate 90-day progress to hackathon judges:
          </span>
        </div>

        {/* Quick Jump Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onFastForward(20)}
            className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors border border-white/10"
          >
            Day 1 (20% Start)
          </button>
          <button
            onClick={() => onFastForward(45)}
            className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors border border-white/10"
          >
            Day 30 (45% Month 1)
          </button>
          <button
            onClick={() => onFastForward(75)}
            className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors border border-white/10"
          >
            Day 60 (75% Month 2)
          </button>
          <button
            onClick={() => onFastForward(100)}
            className="py-2 px-3 rounded-xl bg-[#00BAF2] hover:bg-[#00a6d9] text-[#002970] text-xs font-extrabold shadow-md transition-colors"
          >
            Day 90 (100% Ready 🎉)
          </button>
        </div>

        {/* Slider */}
        <div className="pt-2">
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={progressPercent}
            onChange={(e) => onFastForward(Number(e.target.value))}
            className="w-full accent-[#00BAF2] h-2 bg-white/20 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Habit Checklist Section with Month Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#002970]">
              Actionable Milestone Habits Checklist
            </h2>
            <p className="text-xs text-slate-500">
              Check off financial tasks as you complete them to increase your loan readiness score.
            </p>
          </div>

          {/* Phase Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'all' ? 'bg-[#002970] text-white shadow-xs' : 'hover:bg-white/60'
              }`}
            >
              All Phases
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 1 ? 'bg-[#002970] text-white shadow-xs' : 'hover:bg-white/60'
              }`}
            >
              Month 1
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 2 ? 'bg-[#002970] text-white shadow-xs' : 'hover:bg-white/60'
              }`}
            >
              Month 2
            </button>
            <button
              onClick={() => setActiveTab(3)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 3 ? 'bg-[#002970] text-white shadow-xs' : 'hover:bg-white/60'
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
                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
                  <span className="font-extrabold text-[#002970] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00BAF2]" />
                    {phase.phaseTitle}
                  </span>
                  <span className="text-slate-400 font-semibold">{phase.phaseBadge}</span>
                </div>

                <div className="space-y-2.5">
                  {phase.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => onToggleTask(phase.phaseId, task.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        task.completed
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-slate-50/70 border-slate-200 hover:border-[#00BAF2]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {task.completed ? (
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 hover:text-[#00BAF2]" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <h4 className={`text-xs sm:text-sm font-bold ${
                            task.completed ? 'text-slate-800 line-through opacity-75' : 'text-[#002970]'
                          }`}>
                            {task.title}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            {task.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#00BAF2]/10 text-[#0084B4]">
                          +{task.xp} XP
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
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-8 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6 animate-in zoom-in-95">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-black">
              🎉 All 90-Day Milestones Successfully Achieved!
            </h3>
            <p className="text-xs text-emerald-100">
              Your revised DTI is verified at 34.2% and Paytm Underwriting has unlocked your pre-approved loan offer.
            </p>
          </div>

          <button
            onClick={onProceedToSuccess}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-emerald-800 font-extrabold text-sm shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Claim & Disburse Pre-Approved Loan ➔
          </button>
        </div>
      )}
    </div>
  );
}
