import React, { useState } from 'react';
import { ViewId } from '../types';
import { Brain, ShieldAlert, History, WifiOff, Phone, ArrowRight } from 'lucide-react';

interface StatesViewProps {
  onNavigate: (view: ViewId) => void;
  onOpenCrisis: () => void;
}

export const StatesView: React.FC<StatesViewProps> = ({ onNavigate, onOpenCrisis }) => {
  const [activeState, setActiveState] = useState<'calc' | 'escalation' | 'empty' | 'offline'>('calc');

  return (
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-4">
      <div className="mb-4">
        <span className="text-xs text-red-600 font-bold uppercase tracking-wider block mb-1">
          Interactive UI States
        </span>
        <h2 className="text-2xl font-bold text-gray-900 font-display">System State Sandbox</h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
          Preview the resilient error boundaries, clinical calculation loaders, empty states, and escalation alerts designed for sensitive healthcare contexts.
        </p>
      </div>

      {/* State Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {[
          { id: 'calc', label: 'Clinical Processing' },
          { id: 'escalation', label: 'Safety Escalation' },
          { id: 'empty', label: 'Empty History' },
          { id: 'offline', label: 'Network / Offline' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveState(item.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap shrink-0 ${
              activeState === item.id
                ? 'bg-black text-white font-semibold shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Container for Sub-states */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs min-h-[360px] flex items-center justify-center">
        {/* State 1: Clinical Processing */}
        {activeState === 'calc' && (
          <div className="flex flex-col items-center text-center max-w-sm animate-in fade-in duration-200">
            <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-sky-100 animate-ping opacity-75" />
              <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center shadow-inner">
                <Brain className="w-8 h-8 animate-pulse" />
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1 font-display">
              Analyzing Responses
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Cross-referencing PC-PTSD-5 DSM-5 criteria, checking for symptom cluster markers, and preparing supportive guidance...
            </p>
            <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}

        {/* State 2: Safety Escalation */}
        {activeState === 'escalation' && (
          <div className="flex flex-col items-center text-center max-w-sm animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-red-100 border border-red-200 text-red-700 flex items-center justify-center mb-3 shadow-2xs">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-red-700 mb-1 font-display">
              High-Risk Safety Escalation
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              MindTrauma AI has paused standard screening because immediate safety is always our first priority.
            </p>
            <div className="w-full flex flex-col gap-2">
              <a
                href="tel:988"
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Dial 988 Lifeline</span>
              </a>
              <button
                type="button"
                onClick={onOpenCrisis}
                className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-800 font-semibold text-xs border border-gray-200 hover:bg-gray-200 transition-colors"
              >
                Open Crisis Hub
              </button>
            </div>
          </div>
        )}

        {/* State 3: Empty History */}
        {activeState === 'empty' && (
          <div className="flex flex-col items-center text-center max-w-sm animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center mb-3 border border-gray-200">
              <History className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1 font-display">
              No Assessments Yet
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              You haven't completed any trauma screeners on this device. Start a 2-minute check-in to track your symptoms over time.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('consent')}
              className="px-6 py-2.5 rounded-xl bg-black text-white text-xs font-semibold shadow-xs hover:bg-gray-800 transition-colors flex items-center gap-1.5"
            >
              <span>Start first screener</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* State 4: Offline Mode */}
        {activeState === 'offline' && (
          <div className="flex flex-col items-center text-center max-w-sm animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 text-gray-600 flex items-center justify-center mb-3">
              <WifiOff className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1 font-display">
              Offline Mode Active
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Internet connection is unavailable, but your local screening engine and crisis hotlines remain fully accessible.
            </p>
            <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 mb-4 w-full border border-gray-200">
              Emergency telephone hotlines (988, 911) do not require internet data connections.
            </div>
            <button
              type="button"
              onClick={() => alert('Checking connection... All core screener and grounding logic runs offline.')}
              className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-semibold shadow-xs hover:bg-gray-800 transition-colors"
            >
              Check Connection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
