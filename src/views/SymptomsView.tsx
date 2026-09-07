import React from 'react';
import { ViewId } from '../types';
import { DSM5_CLUSTERS } from '../data/screeningData';
import { 
  Brain, 
  ShieldAlert, 
  Shield, 
  HeartCrack, 
  Sparkles, 
  CheckCircle, 
  Bot, 
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

interface SymptomsViewProps {
  onNavigate: (view: ViewId) => void;
}

export const SymptomsView: React.FC<SymptomsViewProps> = ({ onNavigate }) => {
  const getClusterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-6 h-6 text-sky-700" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-red-700" />;
      case 'Shield': return <Shield className="w-6 h-6 text-teal-700" />;
      case 'HeartCrack': return <HeartCrack className="w-6 h-6 text-purple-700" />;
      default: return <Sparkles className="w-6 h-6 text-gray-700" />;
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-red-600 font-bold uppercase tracking-wider font-display">
            Clinical Psychoeducation
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 font-medium">
            DSM-5 Diagnostic Reference
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-950 font-display">
          DSM-5 Trauma Symptom Clusters
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-3xl leading-relaxed">
          Trauma reactions are normal neurobiological adaptations to extraordinary, overwhelming stressors. Clinical professionals evaluate four core symptom clusters when assessing post-traumatic stress:
        </p>
      </div>

      {/* 4-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {DSM5_CLUSTERS.map((cluster) => (
          <div
            key={cluster.id}
            className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200">
                  {getClusterIcon(cluster.iconName)}
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block font-display">
                    Cluster {cluster.number}
                  </span>
                  <h3 className="text-base font-bold text-gray-950 font-display leading-tight">
                    {cluster.name}
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                {cluster.description}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <span className="inline-block text-xs font-semibold text-teal-900 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200/70">
                {cluster.screenedIn}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Evidence-Based Relief Modalities Card */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-xs mb-6">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider font-display mb-2">
          <Stethoscope className="w-4 h-4 text-teal-600" />
          <span>Clinical Practice Guidelines</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-950 mb-3 font-display flex items-center gap-2.5">
          <CheckCircle className="w-6 h-6 text-teal-700 shrink-0" />
          <span>Evidence-Based Pathways to Lasting Relief</span>
        </h2>

        <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-3xl leading-relaxed">
          Decades of clinical research show that post-traumatic stress is highly treatable. Trauma symptoms respond exceptionally well to targeted modalities that help the nervous system and memory networks complete unprocessed distress.
        </p>

        {/* 3 Therapy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <h4 className="text-sm font-bold text-gray-950 font-display mb-1.5">
              EMDR Therapy
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Eye Movement Desensitization and Reprocessing utilizes bilateral sensory stimulation to help the brain gently integrate painful traumatic memories without reliving terror.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <h4 className="text-sm font-bold text-gray-950 font-display mb-1.5">
              Cognitive Processing (CPT)
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Identifies "stuck points"—beliefs regarding self-blame, safety, and trust that formed following trauma—and provides cognitive tools to re-establish balanced beliefs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <h4 className="text-sm font-bold text-gray-950 font-display mb-1.5">
              Somatic Experiencing
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Focuses on physical sensations and stored autonomic survival responses (fight, flight, freeze), gently restoring vagal tone and autonomic flexibility.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => onNavigate('chat')}
            className="px-6 py-3 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-gray-800 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI about these treatments</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('resources')}
            className="px-6 py-3 rounded-xl bg-gray-100 text-gray-800 text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-colors border border-gray-200 flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span>Find licensed trauma specialists</span>
          </button>
        </div>
      </div>
    </div>
  );
};
