import React from 'react';
import { ViewId } from '../types';
import { 
  ShieldCheck, 
  FileText, 
  Bot, 
  AlertOctagon, 
  ArrowRight, 
  Info, 
  Lock, 
  CheckCircle2, 
  Wind, 
  PhoneCall,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: ViewId) => void;
  onOpenCrisis: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate, onOpenCrisis }) => {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Meta Trust Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200/70">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold border border-red-200/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Confidential Clinical Screening &amp; AI Guidance
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            Validated PC-PTSD-5 Protocol
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-gray-600" />
            100% Private • In-Browser
          </span>
          <span className="hidden md:inline text-gray-300">•</span>
          <span className="hidden md:inline">HIPAA &amp; GDPR Aligned</span>
        </div>
      </div>

      {/* Expansive 2-Column Hero Section */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs border border-gray-200 overflow-hidden mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Compassionate Mental Health Technology</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-950 tracking-tight leading-[1.15] mb-4 font-display">
              Understand what your mind &amp; body are experiencing.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
              A private, clinical-grade screening experience to help you recognize trauma-related stress reactions, explore DSM-5 symptom clusters, and connect with evidence-based guidance.
            </p>

            {/* CTA Action Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8">
              <button
                onClick={() => onNavigate('consent')}
                className="px-8 py-3.5 rounded-xl bg-black text-white text-sm font-semibold shadow-md hover:bg-gray-800 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Start Clinical Screener</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onNavigate('intro')}
                className="px-6 py-3.5 rounded-xl bg-gray-100 text-gray-800 text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border border-gray-200 cursor-pointer"
              >
                <Info className="w-4 h-4 text-gray-600" />
                <span>How Screening Works</span>
              </button>

              <button
                onClick={() => onNavigate('chat')}
                className="px-6 py-3.5 rounded-xl bg-teal-50 text-teal-900 text-sm font-semibold hover:bg-teal-100 transition-colors flex items-center justify-center gap-2 border border-teal-200/80 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-teal-700" />
                <span>Talk with AASRA</span>
              </button>
            </div>

            {/* Quick Metrics & Protocol Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 w-full">
              <div>
                <span className="block text-xl sm:text-2xl font-bold text-gray-900 font-display">5 Questions</span>
                <span className="text-xs text-gray-500 font-medium">Standard Screener</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold text-teal-700 font-display">~3 Minutes</span>
                <span className="text-xs text-gray-500 font-medium">Gentle &amp; Self-Paced</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold text-gray-900 font-display">Zero Tracking</span>
                <span className="text-xs text-gray-500 font-medium">Completely Anonymous</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Therapeutic Artwork & Trust Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px]">
              {/* Soft Ambient Backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-teal-100/60 via-sky-100/40 to-indigo-100/50 rounded-3xl blur-xl opacity-70" />

              <div className="relative bg-gradient-to-b from-white to-sky-50/40 rounded-3xl p-6 border border-gray-200/80 shadow-md">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-tr from-sky-50 via-teal-50 to-indigo-50/40 flex items-center justify-center mb-5 border border-gray-100 p-6">
                  {/* Soothing Concentric Biological Waves Graphic */}
                  <svg className="w-full h-full text-teal-700/80" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.25" />
                    <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
                    <circle cx="100" cy="100" r="52" fill="url(#hero-gradient)" opacity="0.18" />
                    <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                    
                    {/* Calm Flow Waves */}
                    <path d="M40 105 C 70 85, 130 125, 160 105" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                    <path d="M50 120 C 80 100, 120 140, 150 120" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    <path d="M65 90 C 85 80, 115 100, 135 90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

                    {/* Central Mind-Heart Balance Node */}
                    <circle cx="100" cy="100" r="14" fill="currentColor" />
                    <circle cx="100" cy="100" r="6" fill="#ffffff" />
                    <circle cx="100" cy="55" r="4" fill="currentColor" opacity="0.6" />
                    <circle cx="100" cy="145" r="4" fill="currentColor" opacity="0.6" />
                    <circle cx="55" cy="100" r="4" fill="currentColor" opacity="0.6" />
                    <circle cx="145" cy="100" r="4" fill="currentColor" opacity="0.6" />

                    <defs>
                      <radialGradient id="hero-gradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                        <stop offset="0%" stopColor="#0d9488" />
                        <stop offset="100%" stopColor="#0284c7" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>

                {/* Floating Feature Badges */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/90 border border-gray-200/80 shadow-2xs text-xs">
                    <span className="font-semibold text-gray-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      DSM-5 Cluster Analysis
                    </span>
                    <span className="text-[11px] text-gray-500">4 Categories</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/90 border border-gray-200/80 shadow-2xs text-xs">
                    <span className="font-semibold text-gray-900 flex items-center gap-2">
                      <Wind className="w-4 h-4 text-sky-600" />
                      5-4-3-2-1 Somatic Grounding
                    </span>
                    <span className="text-[11px] text-sky-700 font-medium">Interactive Tool</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div>
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1.5 font-display">Private &amp; Secure</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Your screening answers are processed completely in your browser session. No registration, no cookies, no tracking.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('consent')}
            className="mt-4 text-xs font-semibold text-sky-800 hover:text-sky-950 flex items-center gap-1"
          >
            <span>Read consent protocol</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div>
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1.5 font-display">Evidence-Informed</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Built on the Primary Care PTSD Screen for DSM-5 (PC-PTSD-5), a 5-item validated measure utilized in clinical settings.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('symptoms')}
            className="mt-4 text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1"
          >
            <span>Explore symptom clusters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div>
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100 mb-4">
              <Bot className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1.5 font-display">AASRA AI Support</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Discuss results, explore psychoeducational explanations, and practice calming strategies with AASRA, your empathetic AI dialogue companion.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('chat')}
            className="mt-4 text-xs font-semibold text-purple-800 hover:text-purple-950 flex items-center gap-1"
          >
            <span>Consult AASRA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200 mb-4">
              <Wind className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1.5 font-display">Somatic Regulation</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Immediate access to nervous system soothing tools, diaphragmatic breath guides, and sensory orientation practices.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('resources')}
            className="mt-4 text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>View recovery library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Clinical Disclaimer & Crisis Help Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-2xs flex items-start gap-4">
          <AlertOctagon className="w-6 h-6 text-gray-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="text-xs font-bold text-gray-950 block mb-1 tracking-wider uppercase font-display">
              Clinical Disclaimer &amp; Medical Boundaries
            </span>
            <p className="text-xs text-gray-600 leading-relaxed">
              MindTrauma AI is an informational screening and psychoeducational support aid—it does not formulate a medical diagnosis or substitute for care from a licensed healthcare provider, psychologist, or psychiatrist. Symptoms persisting for over one month with functional impairment warrant professional consultation.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 bg-red-50/80 p-5 sm:p-6 rounded-2xl border border-red-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider font-display mb-1">
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Immediate Crisis Support</span>
            </div>
            <p className="text-xs text-red-900 leading-relaxed mb-3">
              If you or a loved one is in urgent distress or experiencing thoughts of harm:
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCrisis}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-xs hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Tele-MANAS (14416)</span>
            </button>
            <a
              href="tel:112"
              className="px-4 py-2.5 rounded-xl bg-white text-red-700 border border-red-200 text-xs font-bold shadow-2xs hover:bg-red-50 transition-colors"
            >
              Emergency: 112
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Web Footer */}
      <footer className="pt-6 pb-2 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-teal-700" />
          <span className="font-medium text-gray-700">MindTrauma AI • Evidence-Informed Clinical Screener</span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <button onClick={() => onNavigate('consent')} className="hover:text-black transition-colors">
            Informed Consent
          </button>
          <button onClick={() => onNavigate('symptoms')} className="hover:text-black transition-colors">
            Symptom Clusters
          </button>
          <button onClick={() => onNavigate('resources')} className="hover:text-black transition-colors">
            Helplines &amp; Therapy
          </button>
          <button onClick={() => onNavigate('states')} className="hover:text-black transition-colors">
            System UI States
          </button>
          <button onClick={onOpenCrisis} className="text-red-600 font-semibold hover:underline">
            Crisis Lifeline (14416 / 988)
          </button>
        </div>

        <p className="text-[11px] text-gray-400">
          DSM-5 &amp; PC-PTSD-5 Clinical Standard
        </p>
      </footer>
    </div>
  );
};
