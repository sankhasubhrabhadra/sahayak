import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, CheckCircle, Circle, Trophy, ArrowRight, Zap, RefreshCw, Award, Sliders, ShieldCheck, TrendingUp, Calendar, Volume2, Coins } from 'lucide-react';
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
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: Paytm Financial Fitness Dashboard */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#FFD200] px-2.5 py-1 border-2 border-black shadow-brutal-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-black animate-ping" />
              Paytm Credit Builder Engine
            </span>
            <span className="text-xs text-black font-bold uppercase tracking-wider">• Real-Time Bureau Sync</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight mt-2">
            {applicant.fullName || 'Rahul'}'s {t.trackerTitle}
          </h1>
        </div>

        {/* 100% Celebration Action Banner if completed */}
        {is100Percent && (
          <button
            onClick={onProceedToSuccess}
            className="bg-[#00B37E] hover:bg-[#00E699] text-white font-black px-6 py-3 rounded-xl border-[3px] border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
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
        <div className="bg-white rounded-xl p-5 border-[3px] border-black shadow-brutal flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-black text-black uppercase tracking-wider bg-[#00BAF2] px-2 py-0.5 border border-black inline-block shadow-brutal-sm">
              {t.readinessScore}
            </span>
            <div className="text-4xl font-black text-black">
              {progressPercent}%
            </div>
            <p className="text-xs font-bold text-black/70">
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
                stroke="#E2E8F0"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke={is100Percent ? '#00B37E' : '#00BAF2'}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-base font-black text-black">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Card 2: Streak Counter */}
        <div className="bg-white rounded-xl p-5 border-[3px] border-black shadow-brutal flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#FFD200] border-2 border-black flex items-center justify-center text-black shadow-brutal-sm shrink-0">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-black text-black uppercase tracking-wider bg-[#FFFDF5] px-2 py-0.5 border border-black inline-block">
              Discipline Streak
            </span>
            <div className="text-2xl font-black text-black flex items-center gap-2 mt-0.5">
              <span>{streakDays} Days</span>
              <span className="text-[10px] bg-[#FF4D4D] text-white font-black px-2 py-0.5 border border-black uppercase">Active</span>
            </div>
            <p className="text-xs text-black/70 font-bold mt-0.5">
              100% timely auto-debit payments recorded.
            </p>
          </div>
        </div>

        {/* Card 3: Financial Health XP */}
        <div className="bg-white rounded-xl p-5 border-[3px] border-black shadow-brutal flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#00BAF2] border-2 border-black flex items-center justify-center text-black shadow-brutal-sm shrink-0">
            <Coins className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-black text-black uppercase tracking-wider bg-[#FFFDF5] px-2 py-0.5 border border-black inline-block">
              Paytm Cashback Points
            </span>
            <div className="text-2xl font-black text-black mt-0.5">
              Level {progressPercent > 60 ? '3' : progressPercent > 30 ? '2' : '1'}
            </div>
            <p className="text-xs font-black text-black/80">
              {earnedXp} / {totalXp} Reward Points
            </p>
          </div>
        </div>
      </div>

      {/* Presenter & Hackathon Demo Superpower: Fast-Forward Slider Bar */}
      <div className="bg-black text-white rounded-xl p-6 border-[3px] border-black shadow-brutal-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#FFD200]" />
            <span className="text-sm font-black text-white uppercase tracking-wider">
              {t.fastForwardTitle}
            </span>
          </div>
          <span className="text-xs font-bold text-white/80 bg-white/20 px-2 py-0.5 rounded">
            Simulate 90-day progress timeline for demo:
          </span>
        </div>

        {/* Quick Jump Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onFastForward(20)}
            className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-black transition-all border-2 border-white/30 text-white cursor-pointer"
          >
            Day 1 (20% Start)
          </button>
          <button
            onClick={() => onFastForward(45)}
            className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-black transition-all border-2 border-white/30 text-white cursor-pointer"
          >
            Day 30 (45% Month 1)
          </button>
          <button
            onClick={() => onFastForward(75)}
            className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-black transition-all border-2 border-white/30 text-white cursor-pointer"
          >
            Day 60 (75% Month 2)
          </button>
          <button
            onClick={() => onFastForward(100)}
            className="py-2 px-3 rounded-lg bg-[#FFD200] hover:bg-[#FFE55B] text-black text-xs font-black border-2 border-black shadow-brutal-sm transition-all cursor-pointer"
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
            className="w-full accent-[#00BAF2] h-3 bg-white/20 border border-white/40 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Habit Checklist Section with Month Tabs */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border-[3px] border-black shadow-brutal space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-black">
          <div>
            <h2 className="text-base sm:text-xl font-black text-black">
              Paytm Verified Milestone Habits Checklist
            </h2>
            <p className="text-xs text-black/70 font-medium">
              Check off tasks as you complete them to reduce DTI and increase loan readiness.
            </p>
          </div>

          {/* Phase Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-[#FFFDF5] p-1 border-2 border-black shadow-brutal-sm text-xs font-black">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 transition-all border border-black ${
                activeTab === 'all' ? 'bg-[#00BAF2] text-black font-black shadow-brutal-sm' : 'hover:bg-[#FFD200]'
              }`}
            >
              All Phases
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`px-3 py-1 transition-all border border-black ${
                activeTab === 1 ? 'bg-[#00BAF2] text-black font-black shadow-brutal-sm' : 'hover:bg-[#FFD200]'
              }`}
            >
              Month 1
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`px-3 py-1 transition-all border border-black ${
                activeTab === 2 ? 'bg-[#00BAF2] text-black font-black shadow-brutal-sm' : 'hover:bg-[#FFD200]'
              }`}
            >
              Month 2
            </button>
            <button
              onClick={() => setActiveTab(3)}
              className={`px-3 py-1 transition-all border border-black ${
                activeTab === 3 ? 'bg-[#00BAF2] text-black font-black shadow-brutal-sm' : 'hover:bg-[#FFD200]'
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
                <div className="flex items-center justify-between text-xs pb-1 border-b border-black/10">
                  <span className="font-black text-black uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-black" />
                    {phase.phaseTitle}
                  </span>
                  <span className="font-bold text-black/60">{phase.phaseBadge}</span>
                </div>

                <div className="space-y-2.5">
                  {phase.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => onToggleTask(phase.phaseId, task.id)}
                      className={`p-4 rounded-lg border-2 border-black transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        task.completed
                          ? 'bg-[#E8F8F2] shadow-none opacity-85'
                          : 'bg-[#FFFDF5] shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {task.completed ? (
                            <CheckCircle className="w-5 h-5 text-[#00B37E] stroke-[3]" />
                          ) : (
                            <Circle className="w-5 h-5 text-black stroke-[2]" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className={`text-xs sm:text-sm font-black ${
                            task.completed ? 'text-black/60 line-through' : 'text-black'
                          }`}>
                            {task.title}
                          </h4>
                          <p className="text-[11px] text-black/70 font-medium leading-relaxed">
                            {task.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] font-black px-2 py-0.5 border border-black bg-[#FFD200]">
                          +{task.xp} pts
                        </span>
                        <span className="text-[10px] text-black/60 font-bold uppercase">
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
        <div className="bg-[#00BAF2] text-black rounded-xl p-6 border-[3px] border-black shadow-brutal-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-black text-black">
              🎉 All 90-Day Milestones Successfully Achieved!
            </h3>
            <p className="text-xs text-black/80 font-medium">
              Your revised DTI is verified at 34.2% and pre-approved loan sanctions are unlocked.
            </p>
          </div>

          <button
            onClick={onProceedToSuccess}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-black text-white hover:bg-[#FFD200] hover:text-black font-black text-xs sm:text-sm border-2 border-black shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all whitespace-nowrap cursor-pointer"
          >
            Claim Pre-Approved Loan Offer ➔
          </button>
        </div>
      )}
    </div>
  );
}

