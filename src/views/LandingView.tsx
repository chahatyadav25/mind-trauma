import React from 'react';
import { ViewId } from '../types';
import { BRAND_ASSETS } from '../data/screeningData';
import { ShieldCheck, FileText, Bot, AlertOctagon, ArrowRight, Info, Lock } from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: ViewId) => void;
  onOpenCrisis: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate, onOpenCrisis }) => {
  return (
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-5">
      {/* Compliance and Safety Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold border border-red-200 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          Confidential Clinical Screening &amp; AI Guidance
        </span>
        <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
          <Lock className="w-3.5 h-3.5 text-gray-700" />
          HIPAA &amp; GDPR Aligned
        </span>
      </div>

      {/* Hero Card */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200 overflow-hidden mb-6">
        <div className="w-full flex justify-center mb-5">
          <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-sky-50 via-teal-50 to-white shadow-inner flex items-center justify-center border border-slate-100">
            <img
              alt="MindTrauma AI therapeutic calm illustration"
              className="w-full h-full object-contain rounded-full"
              src={BRAND_ASSETS.heroIllustration}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2 font-display">
            Understand what you’re experiencing.
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto mb-6 leading-relaxed">
            A private, guided screening experience that can help you recognize trauma-related symptoms and explore appropriate next steps.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => onNavigate('consent')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black text-white text-sm font-semibold shadow-sm hover:bg-gray-800 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Start assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('intro')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gray-100 text-gray-800 text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5 border border-gray-200"
            >
              <Info className="w-4 h-4 text-gray-600" />
              <span>Learn how it works</span>
            </button>
          </div>
        </div>
      </div>

      {/* Three Trust Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-900 font-display">Private &amp; Safe</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your responses are handled with strict privacy and care. No account is required to start your clinical check.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-900 font-display">Evidence-Informed</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Validated Primary Care PTSD Screen (PC-PTSD-5) structured questionnaires designed for trauma-related symptoms.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
            <Bot className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-900 font-display">Supportive AI</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Explore your results in a safe, non-judgmental dialogue with our AI assistant trained on compassionate psychoeducation.
          </p>
        </div>
      </div>

      {/* Clinical Disclaimer Card */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex items-start gap-3.5 mb-6">
        <AlertOctagon className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="text-xs font-bold text-gray-900 block mb-0.5 tracking-wider uppercase font-display">
            Clinical Disclaimer
          </span>
          <p className="text-xs text-gray-600 leading-relaxed">
            MindTrauma AI is a screening and supportive guidance tool, not a clinical diagnosis or replacement for a qualified mental-health professional. If you are experiencing a medical or psychological emergency, please call 988 or emergency services immediately.
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="pt-4 pb-2 flex flex-col items-center gap-3 text-center border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
          <button onClick={() => onNavigate('consent')} className="hover:text-black transition-colors">
            Privacy Notice
          </button>
          <span>•</span>
          <button onClick={() => onNavigate('symptoms')} className="hover:text-black transition-colors">
            Symptom Clusters
          </button>
          <span>•</span>
          <button onClick={() => onNavigate('resources')} className="hover:text-black transition-colors">
            Safety Resources
          </button>
          <span>•</span>
          <button onClick={onOpenCrisis} className="text-red-600 font-semibold hover:underline">
            Crisis Support (988)
          </button>
        </div>
        <p className="text-[11px] text-gray-400">
          © 2025 MindTrauma AI. Validated DSM-5 screener implementation.
        </p>
      </footer>
    </div>
  );
};
