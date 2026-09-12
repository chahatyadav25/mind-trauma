import React, { useState } from 'react';
import { ViewId, AssessmentRecord } from '../types';
import { 
  FileDown, 
  Calendar, 
  ArrowRight, 
  Trash2, 
  ShieldCheck, 
  PlusCircle, 
  Activity, 
  ClipboardList,
  Bot,
  Lock
} from 'lucide-react';

interface HistoryViewProps {
  historyList: AssessmentRecord[];
  onClearHistory: () => void;
  onNavigate: (view: ViewId) => void;
  onInspectRecord: (rec: AssessmentRecord) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ 
  historyList,
  onClearHistory,
  onNavigate, 
  onInspectRecord
}) => {
  const [showExportBanner, setShowExportBanner] = useState(false);

  const handleExportPdf = () => {
    setShowExportBanner(true);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleConfirmClear = () => {
    if (window.confirm('Are you sure you want to securely clear your clinical assessment history from this browser?')) {
      onClearHistory();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-red-600 font-bold uppercase tracking-wider font-display">
              Timeline Tracking
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 font-medium">
              Well-Being &amp; Anxiety Longitudinal Logs
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 font-display">
            Assessment &amp; Well-Being History
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review your past symptom evaluations over time and generate reports for provider discussions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('assessment')}
            className="px-4 py-2.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-gray-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Daily Well-Being Check</span>
          </button>

          <button
            type="button"
            onClick={handleExportPdf}
            className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-gray-700" />
            <span>Export Summary</span>
          </button>
        </div>
      </div>

      {/* Primary Selector Row */}
      <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
        <div className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-black text-white shadow-xs flex items-center gap-2">
          <ClipboardList className="w-4 h-4" />
          <span>Well-Being Assessments ({historyList.length})</span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('chat')}
          className="ml-auto px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer bg-teal-50 text-teal-900 hover:bg-teal-100 border border-teal-200/80 shadow-2xs"
          title="Open Saathi AI Chat & View PIN-Protected History"
        >
          <Bot className="w-4 h-4 text-teal-700" />
          <span className="hidden sm:inline">Saathi</span>
          <span>Chat History</span>
          <Lock className="w-3 h-3 text-amber-600" />
        </button>
      </div>

      {showExportBanner && (
        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 text-teal-900 rounded-2xl text-xs sm:text-sm flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
          <span>Preparing printable clinical summary for healthcare provider discussion...</span>
          <button
            onClick={() => setShowExportBanner(false)}
            className="text-teal-800 font-bold underline hover:text-teal-950 ml-4 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Clinical Screeners Tab */}
      {historyList.length > 0 ? (
        <div className="space-y-4 mb-8">
          {historyList.map((record) => (
            <div
              key={record.id}
              className="p-5 sm:p-6 rounded-3xl border border-gray-200 bg-white shadow-2xs hover:border-gray-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 group"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {record.date}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-display ${
                      record.isPositive
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {record.statusText}
                  </span>
                  {record.gad7Score !== undefined && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                      GAD-7: {record.gad7Score}/21 ({record.gad7Severity})
                    </span>
                  )}
                  {record.riskLevel && record.riskLevel !== 'routine' && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
                      Risk: {record.riskLevel}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold font-display text-gray-950">
                    {record.score}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    out of {record.total} Affirmative Criteria
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
                  {record.summary}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                <button
                  type="button"
                  onClick={() => onInspectRecord(record)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Review Clinical Synthesis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center mb-8">
          <p className="text-sm text-gray-500 mb-4">All assessment records have been securely cleared from local storage.</p>
          <button
            onClick={() => onNavigate('consent')}
            className="px-6 py-3 bg-black text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Start a new assessment
          </button>
        </div>
      )}

      {/* Footer controls & local security reminder */}
      <div className="p-6 rounded-3xl bg-gray-50/80 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-gray-500">
          <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
          <span>Records are stored in your device's browser memory and are never uploaded to commercial tracking servers.</span>
        </div>

        {historyList.length > 0 && (
          <button
            type="button"
            onClick={handleConfirmClear}
            className="text-red-700 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>
    </div>
  );
};
