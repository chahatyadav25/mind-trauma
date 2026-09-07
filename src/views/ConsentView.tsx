import React, { useState } from 'react';
import { ViewId } from '../types';
import { CheckCircle2, XCircle, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface ConsentViewProps {
  onNavigate: (view: ViewId) => void;
}

export const ConsentView: React.FC<ConsentViewProps> = ({ onNavigate }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-red-600 font-bold uppercase tracking-wider font-display">
            Onboarding • Step 1
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 font-medium">
            Clinical Boundaries &amp; Consent
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-950 font-display">
          Before we begin your assessment
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
          This screener is designed to help you identify post-traumatic stress reactions and explore appropriate next steps. Please review our clinical boundaries and privacy guarantees.
        </p>
      </div>

      {/* 3 Structured Understanding Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mb-4 border border-teal-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-950 mb-2 font-display">What this does</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Presents 5 structured PC-PTSD-5 questions assessing past-month reactions, calculates an evidence-informed score, and suggests practical next steps.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 mb-4 border border-red-200">
              <XCircle className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-950 mb-2 font-display">What this does not do</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Does not formulate a formal medical diagnosis, does not replace evaluation by a licensed clinician, and does not provide emergency medical interventions.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mb-4 border border-sky-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-950 mb-2 font-display">Privacy &amp; Security</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Your responses remain strictly within your device session. You can clear your records at any moment, and no sensitive health data is ever sold or transmitted.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Checkbox */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs mb-8">
        <label className="flex items-center gap-3.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-5 h-5 rounded text-black focus:ring-black/20 accent-black cursor-pointer border-gray-300"
          />
          <span className="text-xs sm:text-sm text-gray-900 font-semibold leading-normal">
            I understand that this is a clinical screening tool, not a medical diagnosis, and I agree to proceed.
          </span>
        </label>
      </div>

      {/* Navigation Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('landing')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Overview</span>
        </button>

        <button
          onClick={() => onNavigate('safety')}
          disabled={!isChecked}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 ${
            isChecked ? 'opacity-100 hover:bg-gray-800 cursor-pointer active:scale-98' : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <span>Continue to Safety Triage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
