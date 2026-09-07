import React from 'react';
import { ViewId } from '../types';
import { Clock, PauseCircle, Lock, Brain, Check, ArrowRight, ArrowLeft } from 'lucide-react';

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
            National Center for PTSD Protocol
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-950 font-display">
          About the PC-PTSD-5 Clinical Instrument
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
          The Primary Care PTSD Screen for DSM-5 is a brief, validated 5-item clinical measure used by primary care physicians, veteran health centers, and mental health clinicians to detect trauma-related stress reactions.
        </p>
      </div>

      {/* 3 Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col items-center text-center">
          <Clock className="w-8 h-8 text-teal-700 mb-2" />
          <span className="text-sm font-bold text-gray-950 font-display">~2 to 3 Minutes</span>
          <span className="text-xs text-gray-500 mt-0.5">5 straightforward questions</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col items-center text-center">
          <PauseCircle className="w-8 h-8 text-sky-700 mb-2" />
          <span className="text-sm font-bold text-gray-950 font-display">Self-Paced &amp; Gentle</span>
          <span className="text-xs text-gray-500 mt-0.5">Pause or exit at any moment</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col items-center text-center">
          <Lock className="w-8 h-8 text-purple-700 mb-2" />
          <span className="text-sm font-bold text-gray-950 font-display">100% Confidential</span>
          <span className="text-xs text-gray-500 mt-0.5">Stored in local session memory</span>
        </div>
      </div>

      {/* What to Expect Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs mb-8">
        <h2 className="text-base sm:text-lg font-bold text-gray-950 mb-4 flex items-center gap-2.5 font-display">
          <Brain className="w-5 h-5 text-teal-700" />
          <span>How the screening process works</span>
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <p className="leading-relaxed">
              Each question asks about specific reactions you may have experienced in the <strong>past month</strong> (such as distressing memories, physical arousal, or avoiding reminders).
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <p className="leading-relaxed">
              Select <strong>Yes</strong> or <strong>No</strong> based on what feels authentic to your lived experience. There are no right or wrong answers.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <p className="leading-relaxed">
              Upon completion, you will receive an evidence-informed summary with DSM-5 symptom cluster breakdowns, therapy guidance (EMDR, CPT), and immediate options to consult AASRA.
            </p>
          </div>
        </div>
      </div>

      {/* Action Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('safety')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Safety Triage</span>
        </button>

        <button
          onClick={onStartAssessment}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-gray-800 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Begin Questionnaire</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
