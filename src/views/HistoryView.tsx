import React, { useState } from 'react';
import { ViewId, AssessmentRecord } from '../types';
import { INITIAL_HISTORY } from '../data/screeningData';
import { FileDown, Calendar, ArrowRight, Trash2, ShieldCheck, PlusCircle } from 'lucide-react';

interface HistoryViewProps {
  onNavigate: (view: ViewId) => void;
  onInspectRecord: (score: number) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onNavigate, onInspectRecord }) => {
  const [historyList, setHistoryList] = useState<AssessmentRecord[]>(INITIAL_HISTORY);
  const [showExportBanner, setShowExportBanner] = useState(false);

  const handleExportPdf = () => {
    setShowExportBanner(true);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to securely clear your clinical screening history from this browser?')) {
      setHistoryList([]);
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
              PC-PTSD-5 Longitudinal Logs
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 font-display">
            Assessment &amp; Screening History
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review your past symptom evaluations over time and generate reports for provider discussions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('intro')}
            className="px-4 py-2.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-gray-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Screener</span>
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

      {showExportBanner && (
        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 text-teal-900 rounded-2xl text-xs sm:text-sm flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
          <span>Preparing printable clinical summary for healthcare provider discussion...</span>
          <button
            onClick={() => setShowExportBanner(false)}
            className="text-teal-800 font-bold underline hover:text-teal-950 ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {historyList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {historyList.map((rec) => (
            <div
              key={rec.id}
              className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold font-display ${
                        rec.score >= 3
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-teal-50 text-teal-800 border border-teal-100'
                      }`}
                    >
                      Score: {rec.score} / {rec.total}
                    </span>
                    <span className="text-xs font-bold text-gray-900 font-display">{rec.statusText}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{rec.date}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">{rec.summary}</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
                <span className="text-gray-400 font-medium">PC-PTSD-5 (DSM-5)</span>
                <button
                  type="button"
                  onClick={() => {
                    onInspectRecord(rec.score);
                    onNavigate('results');
                  }}
                  className="text-black font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View Full Clinical Result</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center mb-8">
          <p className="text-sm text-gray-500 mb-4">All screening records have been securely cleared from local storage.</p>
          <button
            onClick={() => onNavigate('consent')}
            className="px-6 py-3 bg-black text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            Start a new assessment
          </button>
        </div>
      )}

      {/* Privacy Assurance Bar */}
      <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 shadow-2xs">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          Data is retained only within your local browser session storage.
        </span>

        {historyList.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="text-red-600 hover:text-red-700 font-semibold underline inline-flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear local screening history</span>
          </button>
        )}
      </div>
    </div>
  );
};
