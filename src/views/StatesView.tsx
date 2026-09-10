import React, { useState } from 'react';
import { ViewId } from '../types';
import { Brain, ShieldAlert, History, WifiOff, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface StatesViewProps {
  onNavigate: (view: ViewId) => void;
  onOpenCrisis: () => void;
}

export const StatesView: React.FC<StatesViewProps> = ({ onNavigate, onOpenCrisis }) => {
  const [activeState, setActiveState] = useState<'calc' | 'escalation' | 'empty' | 'offline'>('calc');

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-red-600 font-bold uppercase tracking-wider font-display">
            Interactive System States
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 font-medium">
            Resilient Healthcare Fallbacks
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 font-display">
          System &amp; UI State Sandbox
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed max-w-3xl">
          Preview the resilient fallback boundaries, clinical calculation loaders, empty states, and crisis escalation alerts designed for sensitive health environments.
        </p>
      </div>

      {/* State Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
        {[
          { id: 'calc', label: 'Clinical Processing Loader' },
          { id: 'escalation', label: 'Safety Escalation Alert' },
          { id: 'empty', label: 'Zero State / Empty History' },
          { id: 'offline', label: 'Offline / Network Degradation' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveState(item.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeState === item.id
                ? 'bg-black text-white font-semibold shadow-xs'
                : 'bg-white text-gray-700 hover:bg-gray-100 font-medium border border-gray-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Preview Container */}
      <div className="bg-white p-8 sm:p-14 rounded-3xl border border-gray-200 shadow-xs min-h-[420px] flex items-center justify-center">
        {/* State 1: Clinical Processing */}
        {activeState === 'calc' && (
          <div className="flex flex-col items-center text-center max-w-md animate-in fade-in duration-200">
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-teal-100/60 animate-ping opacity-75" />
              <div className="w-20 h-20 rounded-3xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shadow-inner">
                <Brain className="w-10 h-10 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-950 mb-2 font-display">
              Analyzing Screening Responses
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              Cross-referencing affirmative items against PC-PTSD-5 DSM-5 criteria, evaluating symptom cluster indicators, and preparing trauma-informed guidance...
            </p>
            <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-700 rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}

        {/* State 2: Safety Escalation */}
        {activeState === 'escalation' && (
          <div className="flex flex-col items-center text-center max-w-md animate-in fade-in duration-200">
            <div className="w-20 h-20 rounded-3xl bg-red-100 border border-red-200 text-red-700 flex items-center justify-center mb-5 shadow-2xs">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2 font-display">
              High-Risk Safety Escalation
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-6">
              Aasra has paused standard screening because your immediate personal safety is always the highest priority.
            </p>
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <a
                href="tel:14416"
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Tele-MANAS (14416)</span>
              </a>
              <button
                type="button"
                onClick={onOpenCrisis}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-100 text-gray-800 font-semibold text-xs sm:text-sm border border-gray-200 hover:bg-gray-200 transition-colors"
              >
                Open Crisis Hub
              </button>
            </div>
          </div>
        )}

        {/* State 3: Empty History */}
        {activeState === 'empty' && (
          <div className="flex flex-col items-center text-center max-w-md animate-in fade-in duration-200">
            <div className="w-20 h-20 rounded-3xl bg-gray-100 text-gray-400 flex items-center justify-center mb-5 border border-gray-200">
              <History className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-950 mb-2 font-display">
              No Previous Assessments Logged
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              You haven't completed any screening sessions on this device yet. Start a 2-minute clinical check-in to track your symptoms over time.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('consent')}
              className="px-8 py-3 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Start First Screener</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* State 4: Offline Mode */}
        {activeState === 'offline' && (
          <div className="flex flex-col items-center text-center max-w-md animate-in fade-in duration-200">
            <div className="w-20 h-20 rounded-3xl bg-gray-100 border border-gray-200 text-gray-600 flex items-center justify-center mb-5">
              <WifiOff className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-950 mb-2 font-display">
              Offline Protection Active
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              Internet connection is unavailable, but your local clinical screening engine, somatic grounding tools, and telephone hotlines remain fully active.
            </p>
            <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-500 mb-6 w-full border border-gray-200 text-center">
              Emergency phone hotlines (Tele-MANAS 14416, KIRAN 1800-599-0019, Emergency 112) operate over cellular phone networks and do not require internet data.
            </div>
            <button
              type="button"
              onClick={() => alert('All core screening, scoring, and grounding exercises run entirely offline.')}
              className="px-6 py-3 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Check Local Sync
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
