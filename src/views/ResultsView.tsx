import React from 'react';
import { ViewId } from '../types';
import { 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  ListFilter, 
  Bot, 
  BookOpen, 
  LayoutDashboard,
  Printer,
  ShieldCheck,
  Stethoscope,
  HeartHandshake
} from 'lucide-react';

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Simulation Bar & Meta Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 px-1">Screening Simulation:</span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => onSimulateScore(4)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isPositive
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Positive (4/5)
            </button>
            <button
              type="button"
              onClick={() => onSimulateScore(1)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                !isPositive
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Negative (1/5)
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium transition-colors"
          title="Print or Save PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Export Summary</span>
        </button>
      </div>

      {/* 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Score Dial & Clinical Interpretation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs">
            {/* Score Pill & Icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border font-display ${
                  isPositive 
                    ? 'bg-red-100 text-red-800 border-red-200' 
                    : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                }`}>
                  Score: {score} of 5 Affirmative
                </span>
                <span className="text-xs text-gray-500 font-medium">Cutoff threshold: 3</span>
              </div>
              {isPositive ? (
                <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              )}
            </div>

            {/* Score Big Visual Meter */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 mb-6 text-center">
              <span className="text-4xl sm:text-5xl font-bold font-display text-gray-950 block mb-1">
                {score} <span className="text-xl text-gray-400 font-normal">/ 5</span>
              </span>
              <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full ${
                isPositive 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {isPositive ? 'Positive Clinical Screen' : 'Negative Clinical Screen'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 mb-3 font-display leading-tight">
              {isPositive
                ? 'Your responses suggest symptoms consistent with traumatic stress reactions.'
                : 'Your responses do not indicate an elevated trauma screener score today.'}
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              {isPositive ? (
                <>
                  A positive PC-PTSD-5 screen indicates that trauma reactions may be noticeably impacting your nervous system, sleep, or mood. <strong>Remember: this is a screening tool, not a medical diagnosis.</strong> Discussing these results with a licensed healthcare provider can help you evaluate personal options.
                </>
              ) : (
                <>
                  Your responses did not meet the positive cutoff threshold for traumatic stress symptoms in the past month. However, emotional reactions can evolve over time, and support is always available whenever you need guidance.
                </>
              )}
            </p>

            {/* Identified Symptom Indicators */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 mb-2.5 uppercase tracking-wider font-display">
                DSM-5 Cluster Indicators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isPositive ? 'bg-red-500' : 'bg-emerald-500'}`} />
                  <span className="text-xs font-medium text-gray-800">Intrusive Memories</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isPositive ? 'bg-red-500' : 'bg-emerald-500'}`} />
                  <span className="text-xs font-medium text-gray-800">Avoidance of Reminders</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isPositive ? 'bg-red-500' : 'bg-emerald-500'}`} />
                  <span className="text-xs font-medium text-gray-800">Hyperarousal &amp; Startle</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isPositive ? 'bg-red-500' : 'bg-emerald-500'}`} />
                  <span className="text-xs font-medium text-gray-800">Emotional Numbness</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onRetake}
              className="text-xs text-gray-600 hover:text-black font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake screening questionnaire</span>
            </button>
          </div>
        </div>

        {/* Right Column: Evidence-Based Next Steps & Pathways (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Action Pathways Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider font-display mb-2">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Evidence-Informed Care Pathways</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-950 font-display mb-2">
              Recommended Next Steps
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              Trauma responses are normal neurobiological adaptations to extraordinary stress. Evidence-based therapies have exceptionally high success rates in helping the brain reprocess traumatic events.
            </p>

            {/* 3 Therapy Pathway Highlights */}
            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/70 flex items-start gap-3.5">
                <ShieldAlert className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-teal-950 font-display">
                    1. EMDR &amp; Cognitive Processing Therapy (CPT)
                  </h4>
                  <p className="text-xs text-teal-900 leading-relaxed mt-0.5">
                    Gold-standard protocols recommended by the VA, DoD, and World Health Organization for reducing emotional distress from intrusive memories.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/70 flex items-start gap-3.5">
                <Sparkles className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-sky-950 font-display">
                    2. Somatic Nervous System Regulation
                  </h4>
                  <p className="text-xs text-sky-900 leading-relaxed mt-0.5">
                    Physical grounding techniques (5-4-3-2-1 and diaphragmatic breathing) help down-regulate hyperarousal and restore feelings of present safety.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-start gap-3.5">
                <HeartHandshake className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950 font-display">
                    3. How to Talk to Your Doctor
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mt-0.5">
                    "I completed a validated PC-PTSD-5 screening and noticed symptoms affecting my sleep and focus. I'd like to discuss a referral to a trauma specialist."
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => onNavigate('chat')}
                className="py-3.5 px-5 rounded-xl bg-black text-white font-semibold text-xs sm:text-sm shadow-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Discuss with AASRA</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('symptoms')}
                className="py-3.5 px-5 rounded-xl bg-gray-100 text-gray-900 font-semibold text-xs sm:text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border border-gray-200 cursor-pointer"
              >
                <ListFilter className="w-4 h-4 text-gray-600" />
                <span>Explore Symptom Clusters</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('resources')}
                className="py-3.5 px-5 rounded-xl bg-white border border-gray-200 text-gray-800 font-semibold text-xs sm:text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span>Trauma Recovery Library</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="py-3.5 px-5 rounded-xl bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:bg-teal-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to Patient Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
