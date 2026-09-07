import React from 'react';
import { ViewId } from '../types';
import { HeartHandshake, AlertTriangle, Smile, ArrowRight, ArrowLeft } from 'lucide-react';

interface SafetyViewProps {
  onNavigate: (view: ViewId) => void;
  onOpenCrisis: () => void;
}

export const SafetyView: React.FC<SafetyViewProps> = ({ onNavigate, onOpenCrisis }) => {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 text-center max-w-xl mx-auto">
        <span className="w-16 h-16 mx-auto rounded-3xl bg-red-100 flex items-center justify-center text-red-700 mb-4 shadow-2xs border border-red-200">
          <HeartHandshake className="w-8 h-8" />
        </span>
        <span className="text-xs text-red-600 font-bold uppercase tracking-wider block mb-1 font-display">
          Clinical Triage • Step 2
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-950 font-display">
          Immediate Safety Check
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
          Before exploring past stressful events, we want to confirm you are safe. Are you currently in acute danger, or having thoughts of hurting yourself?
        </p>
      </div>

      {/* Safety Triage Cards (2 Columns on Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* Yes Card */}
        <button
          onClick={onOpenCrisis}
          className="w-full text-left bg-white hover:bg-red-50/60 p-6 sm:p-8 rounded-3xl border border-gray-200 hover:border-red-300 shadow-2xs transition-all group flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0 mb-4 border border-red-200 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-950 group-hover:text-red-700 transition-colors font-display mb-1.5">
              Yes, I need immediate help
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Connect immediately to free, confidential 24/7 crisis support via call or text.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-700">
            <span>Connect to Crisis Helplines (14416 / 112)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* No Card */}
        <button
          onClick={() => onNavigate('intro')}
          className="w-full text-left bg-white hover:bg-teal-50/60 p-6 sm:p-8 rounded-3xl border border-gray-200 hover:border-teal-300 shadow-2xs transition-all group flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mb-4 border border-teal-200 group-hover:scale-105 transition-transform">
              <Smile className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-950 group-hover:text-teal-800 transition-colors font-display mb-1.5">
              No, I feel safe to continue
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Proceed to the 5-question PC-PTSD-5 clinical questionnaire at your own pace.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800">
            <span>Continue to Screener Overview</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center shadow-2xs max-w-xl mx-auto mb-6">
        <p className="text-xs text-gray-600 leading-relaxed">
          If you are in immediate physical peril or experiencing a medical emergency in India, please dial <strong>112 (National Emergency)</strong> or <strong>108 (Ambulance)</strong>, or visit your nearest hospital emergency room.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={() => onNavigate('consent')}
          className="text-gray-500 hover:text-black text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Informed Consent</span>
        </button>
      </div>
    </div>
  );
};
