import React, { useState } from 'react';
import { ViewId, AssessmentRecord } from '../types';
import { INITIAL_HISTORY } from '../data/screeningData';
import { FileDown, Calendar, ArrowRight, Trash2 } from 'lucide-react';

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
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-display">Assessment History</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Track your symptom changes and download clinical summaries.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportPdf}
          className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <FileDown className="w-4 h-4 text-gray-700" />
          <span>Export PDF</span>
        </button>
      </div>

      {showExportBanner && (
        <div className="mb-4 p-3 bg-teal-50 border border-teal-200 text-teal-900 rounded-2xl text-xs flex items-center justify-between">
          <span>Preparing printable clinical summary for healthcare provider discussion...</span>
          <button
            onClick={() => setShowExportBanner(false)}
            className="text-teal-700 font-semibold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {historyList.length > 0 ? (
        <div className="flex flex-col gap-3 mb-4">
          {historyList.map((rec) => (
            <div
              key={rec.id}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-display ${
                      rec.score >= 4
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : 'bg-sky-50 text-sky-800 border border-sky-100'
                    }`}
                  >
                    Score: {rec.score} / {rec.total}
                  </span>
                  <span className="text-xs font-bold text-black font-display">{rec.statusText}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{rec.date}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-3 leading-relaxed">{rec.summary}</p>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium">Instrument: PC-PTSD-5 (DSM-5)</span>
                <button
                  type="button"
                  onClick={() => {
                    onInspectRecord(rec.score);
                    onNavigate('results');
                  }}
                  className="text-black font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>View Detailed Summary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center mb-4">
          <p className="text-xs text-gray-500 mb-3">All screening records have been cleared from local storage.</p>
          <button
            onClick={() => onNavigate('consent')}
            className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-xl hover:bg-gray-800"
          >
            Start a new assessment
          </button>
        </div>
      )}

      {/* Privacy Assurance */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 text-center shadow-2xs">
        <p className="text-xs text-gray-500">
          Data is securely retained only in your browser session. You can{' '}
          <button
            onClick={handleClearHistory}
            className="text-red-600 font-semibold underline inline-flex items-center gap-0.5"
          >
            <Trash2 className="w-3 h-3 inline" />
            <span>clear all history records</span>
          </button>{' '}
          at any time.
        </p>
      </div>
    </div>
  );
};
