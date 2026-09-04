import React from 'react';
import { ViewId } from '../types';
import { BRAND_ASSETS } from '../data/screeningData';
import { PhoneCall, User } from 'lucide-react';

interface HeaderProps {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
  onOpenCrisis: () => void;
}

const VIEW_SUBTITLES: Record<ViewId, string> = {
  landing: 'Clinical Screener & Support',
  consent: 'Step 1 • Informed Consent',
  safety: 'Step 2 • Safety Triage',
  intro: 'PC-PTSD-5 Overview',
  assessment: 'Questionnaire Active',
  results: 'Screening Outcome',
  symptoms: 'DSM-5 Symptom Clusters',
  chat: 'Compassionate AI Support',
  resources: 'Trauma Recovery Library',
  dashboard: 'Patient Overview Space',
  history: 'Screening Timeline',
  states: 'System & UI States'
};

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenCrisis }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xs">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-[46rem] mx-auto">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none"
          title="MindTrauma AI Home"
        >
          <img
            alt="MindTrauma AI Logo"
            className="h-9 w-9 object-contain shrink-0 group-hover:scale-105 transition-transform"
            src={BRAND_ASSETS.logoUrl}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-lg text-black tracking-tight leading-tight flex items-center gap-1.5 font-display">
              MindTrauma AI
            </span>
            <span className="text-xs text-gray-600 font-medium truncate">
              {VIEW_SUBTITLES[currentView] || 'Clinical Screener & Support'}
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCrisis}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition-all border border-red-200 shadow-2xs active:scale-95"
            title="Crisis Support 988"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span className="whitespace-nowrap">Crisis: 988</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="w-8 h-8 rounded-full bg-sky-50 text-sky-800 border border-sky-100 flex items-center justify-center hover:bg-sky-100 transition-colors shadow-2xs"
            title="My Health Dashboard"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
