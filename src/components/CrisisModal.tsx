import React from 'react';
import { AlertTriangle, Phone, MessageSquare, ShieldAlert, X } from 'lucide-react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl relative border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center border border-red-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 font-display">
                Immediate Crisis Support
              </h3>
              <span className="text-xs text-gray-500 font-medium">Free • Confidential • Available 24/7</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">
          If you or someone you care about is having difficult emotions, feeling overwhelmed, or in distress, caring human support is ready right now. You are never alone:
        </p>

        <div className="flex flex-col gap-3 mb-5">
          <a
            href="tel:988"
            className="p-4 rounded-2xl bg-red-600 text-white flex items-center justify-between hover:bg-red-700 transition-colors shadow-xs group"
          >
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 shrink-0" />
              <div>
                <span className="text-sm font-bold block">Call 988 Suicide & Crisis Lifeline</span>
                <span className="text-xs text-red-100">Trained crisis counselors ready 24/7/365</span>
              </div>
            </div>
            <span className="text-white text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
              Call →
            </span>
          </a>

          <a
            href="sms:741741"
            className="p-4 rounded-2xl bg-gray-50 text-gray-900 flex items-center justify-between hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-gray-700 shrink-0" />
              <div>
                <span className="text-sm font-bold block">Text HOME to 741741</span>
                <span className="text-xs text-gray-500">Free, 24/7 crisis support via SMS</span>
              </div>
            </div>
            <span className="text-gray-600 text-xs font-semibold">Text →</span>
          </a>

          <a
            href="tel:911"
            className="p-4 rounded-2xl bg-red-50 text-gray-900 flex items-center justify-between hover:bg-red-100/70 transition-colors border border-red-200"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <span className="text-sm font-bold block">Emergency Services (911)</span>
                <span className="text-xs text-gray-600">For immediate physical or medical danger</span>
              </div>
            </div>
            <span className="text-red-700 text-xs font-semibold">Dial 911 →</span>
          </a>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gray-100 text-gray-800 text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-colors border border-gray-200"
        >
          Return to MindTrauma AI
        </button>
      </div>
    </div>
  );
};
