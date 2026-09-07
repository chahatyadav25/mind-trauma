import React, { useState, useEffect } from 'react';
import { PC_PTSD_5_QUESTIONS } from '../data/screeningData';
import { 
  Calendar, 
  HelpCircle, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall,
  ShieldCheck
} from 'lucide-react';

interface QuestionnaireViewProps {
  currentQuestionIndex: number;
  userAnswers: (boolean | null)[];
  onSelectAnswer: (index: number, isYes: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  onOpenCrisis: () => void;
}

export const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({
  currentQuestionIndex,
  userAnswers,
  onSelectAnswer,
  onNext,
  onPrev,
  onOpenCrisis,
}) => {
  const [whyOpen, setWhyOpen] = useState(true);
  const qData = PC_PTSD_5_QUESTIONS[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];
  const progressPct = ((currentQuestionIndex + 1) / PC_PTSD_5_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === PC_PTSD_5_QUESTIONS.length - 1;

  // Desktop keyboard shortcuts (Y = Yes, N = No, Enter = Next when answered)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'y' || e.key === 'Y') {
        onSelectAnswer(currentQuestionIndex, true);
      } else if (e.key === 'n' || e.key === 'N') {
        onSelectAnswer(currentQuestionIndex, false);
      } else if (e.key === 'Enter' && currentAnswer !== null) {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentQuestionIndex, currentAnswer, onSelectAnswer, onNext]);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header & Clinical Progress Tracker */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-display">
              PC-PTSD-5 Clinical Assessment
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">
              Primary Care PTSD Screen for DSM-5
            </span>
          </div>
          <span className="text-xs font-bold text-gray-900 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-2xs">
            Question {currentQuestionIndex + 1} of {PC_PTSD_5_QUESTIONS.length}
          </span>
        </div>

        {/* Multi-Step Desktop Progress Tracker */}
        <div className="grid grid-cols-5 gap-2 mb-2">
          {PC_PTSD_5_QUESTIONS.map((_, idx) => {
            const isDone = userAnswers[idx] !== null;
            const isCurrent = idx === currentQuestionIndex;
            return (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'bg-black'
                    : isDone
                    ? 'bg-teal-600'
                    : 'bg-gray-200'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Primary Question Assessment Card */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-xs mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200/80">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            <span>Timeframe: In the past month</span>
          </div>
          <span className="text-xs text-gray-400 font-medium hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-700 font-mono text-[10px]">Y</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-700 font-mono text-[10px]">N</kbd> on keyboard
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-950 font-bold mb-8 leading-snug font-display">
          {qData.q}
        </h2>

        {/* Large Tactile YES / NO Desktop Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* YES Button */}
          <button
            type="button"
            onClick={() => onSelectAnswer(currentQuestionIndex, true)}
            className={`p-5 sm:p-6 rounded-2xl border-2 flex items-center justify-between transition-all active:scale-[0.99] text-left cursor-pointer ${
              currentAnswer === true
                ? 'border-black bg-teal-50/50 shadow-xs ring-2 ring-black/5'
                : 'bg-gray-50/70 hover:bg-white hover:border-gray-300 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border transition-colors ${
                currentAnswer === true 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-700 border-gray-300'
              }`}>
                Y
              </span>
              <div>
                <span className="text-lg font-bold font-display text-gray-950 block">Yes</span>
                <span className="text-xs text-gray-500">I have experienced this</span>
              </div>
            </div>
            <CheckCircle2
              className={`w-7 h-7 text-teal-700 transition-opacity ${
                currentAnswer === true ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </button>

          {/* NO Button */}
          <button
            type="button"
            onClick={() => onSelectAnswer(currentQuestionIndex, false)}
            className={`p-5 sm:p-6 rounded-2xl border-2 flex items-center justify-between transition-all active:scale-[0.99] text-left cursor-pointer ${
              currentAnswer === false
                ? 'border-black bg-teal-50/50 shadow-xs ring-2 ring-black/5'
                : 'bg-gray-50/70 hover:bg-white hover:border-gray-300 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border transition-colors ${
                currentAnswer === false 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-700 border-gray-300'
              }`}>
                N
              </span>
              <div>
                <span className="text-lg font-bold font-display text-gray-950 block">No</span>
                <span className="text-xs text-gray-500">I have not experienced this</span>
              </div>
            </div>
            <CheckCircle2
              className={`w-7 h-7 text-teal-700 transition-opacity ${
                currentAnswer === false ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </button>
        </div>

        {/* Clinical Rationale Accordion */}
        <div className="rounded-2xl bg-gray-50/90 border border-gray-200/90 overflow-hidden">
          <button
            type="button"
            onClick={() => setWhyOpen(prev => !prev)}
            className="w-full px-5 py-3.5 flex items-center justify-between text-gray-800 text-xs sm:text-sm hover:text-black transition-colors text-left"
          >
            <span className="flex items-center gap-2 font-semibold text-gray-900">
              <HelpCircle className="w-4 h-4 text-teal-700" />
              <span>Why are clinicians asking this question?</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                whyOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          {whyOpen && (
            <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/60">
              {qData.why}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navigation Footer Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentQuestionIndex === 0}
          className="px-5 py-3 rounded-xl bg-white text-gray-800 text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Question</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={currentAnswer === null}
          className={`px-8 py-3 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2 ${
            currentAnswer !== null 
              ? 'opacity-100 hover:bg-gray-800 cursor-pointer active:scale-98' 
              : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <span>{isLastQuestion ? 'Review Clinical Results' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Safety & Confidentiality Bar */}
      <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 text-center sm:text-left">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          Responses are processed locally in-browser
        </span>

        <button
          type="button"
          onClick={onOpenCrisis}
          className="text-gray-600 hover:text-red-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5 text-red-600" />
          <span>Need immediate emotional support? <strong>Call Tele-MANAS (14416) or Emergency (112)</strong></span>
        </button>
      </div>
    </div>
  );
};
