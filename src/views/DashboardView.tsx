import React from 'react';
import { ViewId } from '../types';
import { 
  PlusCircle, 
  History, 
  ToggleLeft, 
  ArrowRight, 
  Check, 
  Bot, 
  Wind, 
  ShieldCheck, 
  PhoneCall,
  Activity,
  Calendar,
  FileSpreadsheet
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: ViewId) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-red-600 font-bold uppercase tracking-wider">
              Patient Overview
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-teal-600" />
              Private Local Session
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 font-display">
            Welcome back, Sarah
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Your clinical screener records and coping tools are stored locally on your device with strict confidentiality.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('intro')}
            className="px-4 py-2.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-gray-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Screener</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('chat')}
            className="px-4 py-2.5 rounded-xl bg-teal-50 text-teal-900 border border-teal-200/80 text-xs sm:text-sm font-semibold hover:bg-teal-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-teal-700" />
            <span>AI Check-in</span>
          </button>
        </div>
      </div>

      {/* 4 Metrics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-xl border border-red-200 font-display shrink-0">
            4/5
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Latest PC-PTSD-5</span>
            <span className="text-sm font-bold text-gray-900 font-display block">Positive Screen</span>
            <span className="text-[11px] text-gray-400 block mt-0.5">Oct 24 • 2 days ago</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xl border border-teal-200 font-display shrink-0">
            <Activity className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Primary Cluster</span>
            <span className="text-sm font-bold text-gray-900 font-display block">Hyperarousal</span>
            <span className="text-[11px] text-teal-700 font-medium block mt-0.5">Somatic focus</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xl border border-sky-100 font-display shrink-0">
            4
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Saved Resources</span>
            <span className="text-sm font-bold text-gray-900 font-display block">Guides &amp; Care</span>
            <span className="text-[11px] text-sky-700 font-medium block mt-0.5">Ready offline</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xl border border-purple-100 font-display shrink-0">
            3
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Reflections Logged</span>
            <span className="text-sm font-bold text-gray-900 font-display block">Coping Sessions</span>
            <span className="text-[11px] text-purple-700 font-medium block mt-0.5">Grounding active</span>
          </div>
        </div>
      </div>

      {/* Main Content 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Healing Pathway & Screening History Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Healing Journey Pathway */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-950 font-display flex items-center gap-2">
                <span>Clinical Healing Pathway</span>
              </h3>
              <span className="text-xs text-gray-500 font-medium">Step 3 of 4 In Progress</span>
            </div>

            <div className="relative flex flex-col gap-6 pl-2">
              <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-gray-200" />

              {/* Step 1 */}
              <div className="relative flex items-start sm:items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs z-10 shadow-2xs shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block font-display">
                    1. PC-PTSD-5 Screening Completed
                  </span>
                  <span className="text-xs text-gray-500">
                    Validated screener recorded with 4/5 affirmative criteria
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200 shrink-0">
                  Completed
                </span>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start sm:items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs z-10 shadow-2xs shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block font-display">
                    2. Trauma Clusters Evaluated
                  </span>
                  <span className="text-xs text-gray-500">
                    Analyzed Hyperarousal, Avoidance, and Intrusions
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200 shrink-0">
                  Reviewed
                </span>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start sm:items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs z-10 shadow-2xs font-display shrink-0">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-black block font-display">
                    3. Psychoeducation &amp; Somatic Support
                  </span>
                  <span className="text-xs text-gray-500">
                    Explore grounding exercises and AI-guided coping strategies
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('chat')}
                  className="px-3.5 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-100 text-xs font-semibold hover:bg-sky-100 transition-colors shrink-0 cursor-pointer"
                >
                  Resume
                </button>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-start sm:items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 text-gray-400 flex items-center justify-center font-bold text-xs z-10 font-display shrink-0">
                  4
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-600 block">
                    4. Professional Consultation &amp; Care
                  </span>
                  <span className="text-xs text-gray-500">
                    Share clinical outcome summary with a licensed therapist or physician
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('resources')}
                  className="px-3.5 py-1.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors border border-gray-200 shrink-0 cursor-pointer"
                >
                  Find Care
                </button>
              </div>
            </div>
          </div>

          {/* Quick Route Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => onNavigate('history')}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100 shrink-0">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 font-display">
                    Screener History
                  </h4>
                  <p className="text-xs text-gray-500">Timeline &amp; PDF export</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>

            <div
              onClick={() => onNavigate('states')}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shrink-0">
                  <ToggleLeft className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 font-display">
                    System UI States
                  </h4>
                  <p className="text-xs text-gray-500">Preview states &amp; alerts</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Right Column: Grounding Tool, Clinical Helplines, & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Somatic Regulation Quick Launcher */}
          <div className="bg-gradient-to-br from-teal-50/70 via-white to-sky-50/50 p-6 rounded-3xl border border-teal-200/80 shadow-2xs">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider font-display mb-2">
              <Wind className="w-4 h-4 text-teal-600" />
              <span>Somatic Nervous System Tool</span>
            </div>
            <h4 className="text-lg font-bold text-gray-950 font-display mb-1.5">
              5-4-3-2-1 Sensory Grounding
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed mb-5">
              Gently signal to your amygdala and sympathetic nervous system that you are safe in the present physical space.
            </p>
            <button
              onClick={() => onNavigate('resources')}
              className="w-full py-3 rounded-xl bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-teal-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wind className="w-4 h-4" />
              <span>Open Sensory Grounding</span>
            </button>
          </div>

          {/* Crisis & Safety Support Card */}
          <div className="bg-red-50/80 p-6 rounded-3xl border border-red-200 shadow-2xs">
            <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider font-display mb-2">
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>24/7 Crisis Assistance</span>
            </div>
            <h4 className="text-base font-bold text-red-950 font-display mb-1">
              You do not have to carry this alone
            </h4>
            <p className="text-xs text-red-900 leading-relaxed mb-4">
              Free, confidential counseling available 24/7 across India via Tele-MANAS (14416), KIRAN (1800-599-0019), and National Emergency (112).
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:14416"
                className="py-2.5 px-3 rounded-xl bg-red-600 text-white text-xs font-bold shadow-xs hover:bg-red-700 transition-colors text-center block"
              >
                Tele-MANAS (14416)
              </a>
              <a
                href="tel:112"
                className="py-2.5 px-3 rounded-xl bg-white text-red-700 border border-red-200 text-xs font-bold shadow-2xs hover:bg-red-50 transition-colors text-center block"
              >
                Emergency (112)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
