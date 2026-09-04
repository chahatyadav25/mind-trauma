import React from 'react';
import { ViewId } from '../types';
import { PlusCircle, History, ToggleLeft, ArrowRight, Check } from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: ViewId) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-4">
      {/* Welcome Card */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-2xs mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs text-red-600 font-bold uppercase tracking-wider block">
            Patient Overview
          </span>
          <h2 className="text-2xl font-bold text-gray-900 font-display">Welcome back, Sarah</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Your private health workspace is synced locally with encrypted safeguards.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('intro')}
          className="px-4 py-2.5 rounded-xl bg-black text-white text-xs font-semibold shadow-xs hover:bg-gray-800 transition-colors flex items-center gap-1.5 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Screener</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg border border-red-200 font-display">
            4/5
          </div>
          <div>
            <span className="text-[11px] text-gray-500 block">Latest PC-PTSD-5</span>
            <span className="text-xs font-bold text-gray-900 font-display">Positive Screen</span>
            <span className="text-[10px] text-gray-400 block">Oct 24 • 2 days ago</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-lg border border-sky-100 font-display">
            4
          </div>
          <div>
            <span className="text-[11px] text-gray-500 block">Saved Resources</span>
            <span className="text-xs font-bold text-gray-900 font-display">Guides &amp; Helplines</span>
            <span className="text-[10px] text-teal-700 font-medium">Ready offline</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-lg border border-gray-200 font-display">
            3
          </div>
          <div>
            <span className="text-[11px] text-gray-500 block">Coping Check-ins</span>
            <span className="text-xs font-bold text-gray-900 font-display">Logged Reflections</span>
            <span className="text-[10px] text-sky-700 font-medium">Grounding active</span>
          </div>
        </div>
      </div>

      {/* Visual Healing Journey Tracker */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-2xs mb-4">
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 font-display">
          <span>Your Healing Journey Pathway</span>
        </h3>

        <div className="relative flex flex-col gap-5 pl-2">
          <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-gray-200" />

          {/* Step 1 */}
          <div className="relative flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs z-10 shadow-2xs">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-gray-900 block font-display">
                1. Screening Completed
              </span>
              <span className="text-[11px] text-gray-500">Validated PC-PTSD-5 score recorded</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-semibold border border-teal-200">
              Done
            </span>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs z-10 shadow-2xs">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-gray-900 block font-display">
                2. Result Reviewed
              </span>
              <span className="text-[11px] text-gray-500">Analyzed 4 DSM-5 trauma clusters</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-semibold border border-teal-200">
              Reviewed
            </span>
          </div>

          {/* Step 3 */}
          <div className="relative flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs z-10 shadow-2xs font-display">
              3
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-black block font-display">
                3. AI Psychoeducation
              </span>
              <span className="text-[11px] text-gray-500">Explored grounding and symptom dynamics</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('chat')}
              className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-100 text-xs font-semibold hover:bg-sky-100 transition-colors"
            >
              Resume
            </button>
          </div>

          {/* Step 4 */}
          <div className="relative flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs z-10 font-display">
              4
            </div>
            <div className="flex-1">
              <span className="text-xs font-medium text-gray-600 block">
                4. Connected to Care
              </span>
              <span className="text-[11px] text-gray-500">Schedule consultation with a licensed specialist</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('resources')}
              className="px-3 py-1 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors border border-gray-200"
            >
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* Quick Route Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
        <div
          onClick={() => onNavigate('history')}
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 font-display">View Screener History</h4>
              <p className="text-[11px] text-gray-500">Review trends &amp; export PDF</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>

        <div
          onClick={() => onNavigate('states')}
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
              <ToggleLeft className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 font-display">System &amp; UI States</h4>
              <p className="text-[11px] text-gray-500">Preview loading, offline, empty states</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
