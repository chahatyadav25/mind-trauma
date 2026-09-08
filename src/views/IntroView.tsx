import React from 'react';
import { ViewId } from '../types';
import { Clock, PauseCircle, Lock, Brain, Flame, Activity, ShieldAlert, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface IntroViewProps {
  onNavigate: (view: ViewId) => void;
  onStartAssessment: () => void;
}

export const IntroView: React.FC<IntroViewProps> = ({ onNavigate, onStartAssessment }) => {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-red-600 font-bold uppercase tracking-wider font-display">
            Screener Overview • Step 3
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 font-medium">
            PC-PTSD-5 &amp; GAD-7 Protocols
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-950 font-display">
          Validated Clinical Screening Instruments
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
          This comprehensive module pairs the <strong>Primary Care PTSD Screen for DSM-5 (PC-PTSD-5)</strong> with the <strong>Generalized Anxiety Disorder 7-item scale (GAD-7)</strong> to provide a holistic view of trauma reactions and anxiety symptoms for victims and complainants.
        </p>
      </div>

      {/* 3 Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col items-center text-center">
          <Clock className="w-8 h-8 text-teal-700 mb-2" />
          <span className="text-sm font-bold text-gray-950 font-display">~3 to 4 Minutes</span>
          <span className="text-xs text-gray-500 mt-0.5">Streamlined &amp; gentle flow</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col items-center text-center">
          <PauseCircle className="w-8 h-8 text-sky-700 mb-2" />
          <span className="text-sm font-bold text-gray-950 font-display">Adaptive Progression</span>
          <span className="text-xs text-gray-500 mt-0.5">Automatic trauma gating rule</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col items-center text-center">
          <Lock className="w-8 h-8 text-purple-700 mb-2" />
          <span className="text-sm font-bold text-gray-950 font-display">100% Confidential</span>
          <span className="text-xs text-gray-500 mt-0.5">Stored in local session memory</span>
        </div>
      </div>

      {/* 5-Step Structure Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs mb-8">
        <h2 className="text-base sm:text-lg font-bold text-gray-950 mb-5 flex items-center gap-2.5 font-display">
          <Brain className="w-5 h-5 text-teal-700" />
          <span>The 5-Step Clinical Screening Pathway</span>
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-red-50 text-red-700 border border-red-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div>
              <strong className="text-gray-950 font-semibold block">Step 1: Trauma Exposure Gate (PC-PTSD-5 Criterion A)</strong>
              <p className="text-gray-600 leading-relaxed mt-0.5">
                Evaluates prior exposure to unusually frightening or traumatic life events. If <em>No</em>, the PTSD score is set to 0 and the screener bypasses directly to anxiety.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div>
              <strong className="text-gray-950 font-semibold block">Step 2: PTSD Symptom Screening (5 DSM-5 Questions)</strong>
              <p className="text-gray-600 leading-relaxed mt-0.5">
                Screens past-month reactions: intrusive memories, avoidance, hyperarousal/startle, emotional numbness, and excessive self-blame.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div>
              <strong className="text-gray-950 font-semibold block">Step 3: Generalized Anxiety Assessment (GAD-7 Scale)</strong>
              <p className="text-gray-600 leading-relaxed mt-0.5">
                7 items assessing past-2-week frequency (Not at all, Several days, More than half the days, Nearly every day) with a clinical referral threshold at 10+.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              4
            </div>
            <div>
              <strong className="text-gray-950 font-semibold block">Step 4: Risk &amp; Urgency Triage</strong>
              <p className="text-gray-600 leading-relaxed mt-0.5">
                Immediate safety check ensuring acute distress or crisis triggers immediate connection to confidential 24/7 helplines (Tele-MANAS 14416 / 112).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              5
            </div>
            <div>
              <strong className="text-gray-950 font-semibold block">Step 5: AI-Generated Preliminary Assessment &amp; Referral Recommendation</strong>
              <p className="text-gray-600 leading-relaxed mt-0.5">
                Holistic synthesis of trauma and anxiety profiles with evidence-based therapy pathways (EMDR, CPT, Somatics) and personalized clinician referral guides.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate('safety')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Safety Triage</span>
        </button>

        <button
          type="button"
          onClick={onStartAssessment}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-gray-800 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Begin Clinical Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
