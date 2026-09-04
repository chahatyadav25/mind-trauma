import React, { useState } from 'react';
import { ViewId } from '../types';
import { CheckCircle2, XCircle, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface ConsentViewProps {
  onNavigate: (view: ViewId) => void;
}

export const ConsentView: React.FC<ConsentViewProps> = ({ onNavigate }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-5">
      <div className="mb-5">
        <span className="text-xs text-red-600 font-bold uppercase tracking-wider block mb-1">
          Onboarding Step 1
        </span>
        <h2 className="text-2xl font-bold text-gray-900 font-display">Before we begin</h2>
        <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
          This assessment is designed to help you understand whether some trauma-related symptoms may be present. Please review our clinical boundaries and privacy guarantees.
        </p>
      </div>

      {/* 3 Structured Understanding Cards */}
      <div className="flex flex-col gap-3.5 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 border border-teal-200">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-0.5 font-display">What this does</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Presents 5 structured PC-PTSD-5 questions assessing past-month reactions, calculates an evidence-informed score, and suggests practical, safe next steps.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5 border border-red-200">
            <XCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-0.5 font-display">What this does not do</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Does not provide a formal medical diagnosis, does not replace evaluation by a licensed clinician or psychiatrist, and does not provide emergency medical intervention.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-0.5 font-display">Your privacy &amp; sensitive data protection</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Your responses remain strictly within your device session. You can clear your records at any moment, and no personally identifying information is sold or broadcasted.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Checkbox */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs mb-6">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-5 h-5 rounded text-black focus:ring-black/20 accent-black cursor-pointer border-gray-300"
          />
          <span className="text-xs sm:text-sm text-gray-800 font-semibold leading-normal">
            I understand that this is a screening tool and not a clinical diagnosis.
          </span>
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-2.5">
        <button
          onClick={() => onNavigate('safety')}
          disabled={!isChecked}
          className={`w-full py-3.5 rounded-xl bg-black text-white text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-2 ${
            isChecked ? 'opacity-100 hover:bg-gray-800' : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <span>Continue to Safety Check</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onNavigate('landing')}
          className="w-full py-2.5 rounded-xl text-gray-600 hover:text-gray-900 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Home</span>
        </button>
      </div>
    </div>
  );
};
