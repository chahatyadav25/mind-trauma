import React from 'react';
import { ViewId } from '../types';
import { DSM5_CLUSTERS } from '../data/screeningData';
import { Brain, ShieldAlert, Shield, HeartCrack, Sparkles, CheckCircle, Bot, BookOpen } from 'lucide-react';

interface SymptomsViewProps {
  onNavigate: (view: ViewId) => void;
}

export const SymptomsView: React.FC<SymptomsViewProps> = ({ onNavigate }) => {
  const getClusterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-sky-700" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-700" />;
      case 'Shield': return <Shield className="w-5 h-5 text-teal-700" />;
      case 'HeartCrack': return <HeartCrack className="w-5 h-5 text-purple-700" />;
      default: return <Sparkles className="w-5 h-5 text-gray-700" />;
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-4">
      <div className="mb-4">
        <span className="text-xs text-red-600 font-bold uppercase tracking-wider block mb-1">
          Clinical Psychoeducation
        </span>
        <h2 className="text-2xl font-bold text-gray-900 font-display">DSM-5 Trauma Symptom Clusters</h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
          Trauma reactions are normal physiological adaptations to abnormal, overwhelming stressors. Mental health professionals evaluate four primary symptom clusters:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
        {DSM5_CLUSTERS.map((cluster) => (
          <div
            key={cluster.id}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200">
                  {getClusterIcon(cluster.iconName)}
                </div>
                <h3 className="text-sm font-bold text-gray-900 font-display">
                  {cluster.number}. {cluster.name}
                </h3>
              </div>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                {cluster.description}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg w-fit border border-teal-100">
              {cluster.screenedIn}
            </span>
          </div>
        ))}
      </div>

      {/* Evidence-Based Pathways Card */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-2xs mb-4">
        <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2 font-display">
          <CheckCircle className="w-5 h-5 text-teal-700" />
          Evidence-Based Pathways to Relief
        </h4>
        <p className="text-xs text-gray-600 mb-4 leading-relaxed">
          Trauma symptoms respond exceptionally well to targeted modalities such as <strong>EMDR (Eye Movement Desensitization and Reprocessing)</strong>, <strong>Cognitive Processing Therapy (CPT)</strong>, and <strong>Somatic Experiencing</strong>.
        </p>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('chat')}
            className="px-4 py-2.5 rounded-xl bg-black text-white text-xs font-semibold shadow-xs hover:bg-gray-800 transition-all flex items-center gap-1.5"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask AI about treatments</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('resources')}
            className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-800 text-xs font-semibold hover:bg-gray-200 transition-colors border border-gray-200 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-gray-500" />
            <span>Find licensed providers</span>
          </button>
        </div>
      </div>
    </div>
  );
};
