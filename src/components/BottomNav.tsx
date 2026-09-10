import React from 'react';
import { ViewId } from '../types';
import { Home, ClipboardList, BarChart3, Bot, BookOpen, LayoutDashboard } from 'lucide-react';

interface BottomNavProps {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const navItems: { id: ViewId; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'assessment', label: 'Screening', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'results', label: 'Results', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'chat', label: 'Saathi', icon: <Bot className="w-5 h-5" /> },
    { id: 'resources', label: 'Resources', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-md pb-safe">
      <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive =
            currentView === item.id ||
            (item.id === 'assessment' && ['consent', 'safety', 'intro', 'assessment'].includes(currentView));

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 transition-colors ${
                isActive ? 'text-black font-bold' : 'text-gray-500 hover:text-gray-900 font-normal'
              }`}
            >
              <span className={isActive ? 'text-black stroke-[2.2]' : 'text-gray-500'}>
                {item.icon}
              </span>
              <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
