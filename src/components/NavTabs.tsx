import React, { useRef, useEffect } from 'react';
import { ViewId } from '../types';

interface NavTabsProps {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
}

const TABS: { id: ViewId; label: string }[] = [
  { id: 'landing', label: '1. Home' },
  { id: 'consent', label: '2. Consent' },
  { id: 'safety', label: '3. Safety Triage' },
  { id: 'intro', label: '4. Intro PC-PTSD-5' },
  { id: 'assessment', label: '5. Questionnaire' },
  { id: 'results', label: '6. Results' },
  { id: 'symptoms', label: '7. Symptom Overview' },
  { id: 'chat', label: '8. AI Assistant' },
  { id: 'resources', label: '9. Resources' },
  { id: 'dashboard', label: '10. Dashboard' },
  { id: 'history', label: '11. History' },
  { id: 'states', label: '12. UI States' },
];

export const NavTabs: React.FC<NavTabsProps> = ({ currentView, onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeBtnRef.current && containerRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [currentView]);

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md px-3 py-2.5 border-b border-gray-200 shadow-2xs">
      <div ref={containerRef} className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-[46rem] mx-auto">
        {TABS.map((tab) => {
          const isActive = currentView === tab.id;
          return (
            <button
              key={tab.id}
              ref={isActive ? activeBtnRef : null}
              onClick={() => onNavigate(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-black text-white font-semibold shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
