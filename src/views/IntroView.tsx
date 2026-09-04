import React from 'react';
import { ViewId } from '../types';
import { Clock, PauseCircle, Lock, Brain, Check, ArrowRight } from 'lucide-react';

interface IntroViewProps {
  onNavigate: (view: ViewId) => void;
  onStartAssessment: () => void;
}

export const IntroView: React.FC<IntroViewProps> = ({ onNavigate, onStartAssessment }) => {
  return (
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-5">
      <div className="mb-5">
        <span className="text-xs text-red-600 font-bold uppercase tracking-wider block mb-1">
          Overview
        </span>
        <h2 className="text-2xl font-bold text-gray-900 font-display">About the PC-PTSD-5</h2>
        <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
          The Primary Care PTSD Screen for DSM-5 is a validated 5-item clinical instrument developed by the National Center for PTSD to identify potential trauma reactions.
        </p>
      </div>

      {/* Info Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col items-center text-center">
          <Clock className="w-6 h-6 text-teal-700 mb-1" />
          <span className="text-xs font-bold text-gray-900 font-display">~2 Minutes</span>
          <span className="text-[11px] text-gray-500">5 straightforward questions</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col items-center text-center">
          <PauseCircle className="w-6 h-6 text-sky-700 mb-1" />
          <span className="text-xs font-bold text-gray-900 font-display">Take Your Time</span>
          <span className="text-[11px] text-gray-500">Pause or exit whenever you need</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col items-center text-center">
          <Lock className="w-6 h-6 text-teal-700 mb-1" />
          <span className="text-xs font-bold text-gray-900 font-display">Local &amp; Confidential</span>
          <span className="text-[11px] text-gray-500">Private session memory</span>
        </div>
      </div>

      {/* What to Expect Box */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs mb-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 font-display">
          <Brain className="w-4 h-4 text-gray-800" />
          How the screening works
        </h3>
        <ul className="space-y-2.5 text-xs text-gray-600">
          <li className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <span>Each question asks about reactions you may have experienced in the <strong>past month</strong>.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <span>Answer a simple <strong>Yes</strong> or <strong>No</strong> based on what feels true for your experience.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <span>Receive an evidence-informed summary, DSM-5 symptom cluster breakdown, and supportive recovery options.</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onStartAssessment}
          className="flex-1 py-3.5 rounded-xl bg-black text-white text-sm font-semibold shadow-xs hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
        >
          <span>Begin Questionnaire</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onNavigate('safety')}
          className="py-3 px-5 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200"
        >
          Back
        </button>
      </div>
    </div>
  );
};
