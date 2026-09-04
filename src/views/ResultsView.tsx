import React from 'react';
import { ViewId } from '../types';
import { CheckCircle2, AlertCircle, ShieldAlert, Sparkles, ArrowRight, RotateCcw, ListFilter, Bot, BookOpen, LayoutDashboard } from 'lucide-react';

interface ResultsViewProps {
  score: number;
  onSimulateScore: (newScore: number) => void;
  onNavigate: (view: ViewId) => void;
  onRetake: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  score,
  onSimulateScore,
  onNavigate,
  onRetake,
}) => {
  const isPositive = score >= 3;

  return (
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-4">
      {/* Simulation Switcher */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-2xs mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 px-2">Simulate Outcome:</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => onSimulateScore(4)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              isPositive
                ? 'bg-black text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Positive (4/5)
          </button>
          <button
            type="button"
            onClick={() => onSimulateScore(0)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              !isPositive
                ? 'bg-black text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Negative (0/5)
          </button>
        </div>
      </div>

      {/* Dynamic Results Card */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200 shadow-2xs mb-4">
        {isPositive ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200 font-display">
                  Score: {score} / 5
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-100 text-xs font-semibold">
                  Positive screening result
                </span>
              </div>
              <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug font-display">
              Your responses suggest further evaluation may be beneficial.
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
              This is a <strong>clinical screening result, NOT a diagnosis</strong>. A positive screen indicates that trauma-related symptoms may be noticeably present and that speaking with a qualified healthcare professional could provide valuable guidance.
            </p>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide font-display">
                Identified Symptom Indicators:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs font-medium text-gray-800">Intrusive memories</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs font-medium text-gray-800">Avoidance triggers</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs font-medium text-gray-800">Being on guard</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-sky-900 font-display">Recommended Next Steps</h5>
                <p className="text-xs text-sky-800 leading-relaxed mt-0.5">
                  Consider speaking with a licensed mental health professional who specializes in trauma care (such as EMDR or CPT). Our AI assistant is also ready to guide you through somatic grounding exercises.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-800 text-xs font-bold font-display">
                  Score: {score} / 5
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-semibold">
                  Negative screening result
                </span>
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug font-display">
              Your responses do not indicate an elevated trauma screen.
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
              This is a <strong>clinical screening result, NOT a diagnosis</strong>. Your responses today did not meet the threshold for a positive PC-PTSD-5 screen. However, emotional well-being changes, and support is always available if you feel stressed.
            </p>

            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-teal-900 font-display">Maintaining Well-Being</h5>
                <p className="text-xs text-teal-800 leading-relaxed mt-0.5">
                  Explore self-paced somatic nervous system regulation techniques, sleep calming guides, or return anytime you wish to re-evaluate your symptoms.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          onClick={() => onNavigate('symptoms')}
          className="py-3 px-4 rounded-xl bg-white border border-gray-200 text-black font-semibold text-xs sm:text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-2xs"
        >
          <ListFilter className="w-4 h-4 text-gray-600" />
          <span>View Symptom Breakdown</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('chat')}
          className="py-3 px-4 rounded-xl bg-black text-white font-semibold text-xs sm:text-sm shadow-xs hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
        >
          <Bot className="w-4 h-4" />
          <span>Discuss with AI Assistant</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('resources')}
          className="py-3 px-4 rounded-xl bg-white border border-gray-200 text-gray-800 font-semibold text-xs sm:text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-2xs"
        >
          <BookOpen className="w-4 h-4 text-gray-500" />
          <span>Explore Resources</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="py-3 px-4 rounded-xl bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:bg-teal-800 transition-colors flex items-center justify-center gap-2"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Save to Dashboard</span>
        </button>
      </div>

      {/* Retake Screener */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onRetake}
          className="text-xs text-gray-500 hover:text-black font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake questionnaire</span>
        </button>
      </div>
    </div>
  );
};
