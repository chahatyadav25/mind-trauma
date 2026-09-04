import React from 'react';
import { ViewId } from '../types';
import { HeartHandshake, AlertTriangle, Smile, ArrowRight } from 'lucide-react';

interface SafetyViewProps {
  onNavigate: (view: ViewId) => void;
  onOpenCrisis: () => void;
}

export const SafetyView: React.FC<SafetyViewProps> = ({ onNavigate, onOpenCrisis }) => {
  return (
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-6">
      <div className="mb-6 text-center">
        <span className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-700 mb-3 shadow-2xs border border-red-200">
          <HeartHandshake className="w-7 h-7" />
        </span>
        <span className="text-xs text-red-600 font-bold uppercase tracking-wider block mb-1">
          Safety First
        </span>
        <h2 className="text-2xl font-bold text-gray-900 font-display">Before we continue</h2>
        <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
          Are you currently in immediate danger, or are you thinking about seriously hurting yourself?
        </p>
      </div>

      {/* Safety Triage Cards */}
      <div className="flex flex-col gap-3.5 mb-6">
        {/* Yes Card */}
        <button
          onClick={onOpenCrisis}
          className="w-full text-left bg-white hover:bg-red-50/60 p-4 sm:p-5 rounded-2xl border border-gray-200 hover:border-red-300 shadow-2xs transition-all group flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-red-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-red-700 transition-colors font-display">
                Yes, I need immediate help
              </h3>
              <p className="text-xs text-gray-500">Connect instantly to free, confidential 24/7 crisis support.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-700 transition-colors" />
        </button>

        {/* No Card */}
        <button
          onClick={() => onNavigate('intro')}
          className="w-full text-left bg-white hover:bg-teal-50/60 p-4 sm:p-5 rounded-2xl border border-gray-200 hover:border-teal-300 shadow-2xs transition-all group flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-teal-200">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-teal-800 transition-colors font-display">
                No, I feel safe enough to continue
              </h3>
              <p className="text-xs text-gray-500">Proceed to the 5-question clinical screener at your own pace.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-700 transition-colors" />
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 text-center shadow-2xs">
        <p className="text-xs text-gray-600 leading-relaxed">
          If you are in immediate physical danger, please dial <strong>911</strong> or visit your nearest hospital emergency room.
        </p>
      </div>
    </div>
  );
};
