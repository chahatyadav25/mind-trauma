import React, { useState } from 'react';
import { PC_PTSD_5_QUESTIONS } from '../data/screeningData';
import { Calendar, HelpCircle, ChevronDown, ArrowLeft, ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';

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
  const [whyOpen, setWhyOpen] = useState(false);
  const qData = PC_PTSD_5_QUESTIONS[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];
  const progressPct = ((currentQuestionIndex + 1) / PC_PTSD_5_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === PC_PTSD_5_QUESTIONS.length - 1;

  return (
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-4">
      {/* Header & Stepper Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1 font-display">
            PC-PTSD-5 Screener
          </span>
          <span className="text-xs font-bold text-gray-900 bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full">
            Question {currentQuestionIndex + 1} of {PC_PTSD_5_QUESTIONS.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200 shadow-2xs mb-4">
        <div className="flex items-center gap-1.5 text-gray-600 text-xs mb-3 font-medium">
          <Calendar className="w-4 h-4 text-teal-700" />
          <span className="font-semibold text-teal-800">Past-month timeframe</span>
        </div>

        <h2 className="text-lg sm:text-xl text-gray-900 font-bold mb-6 leading-relaxed font-display">
          {qData.q}
        </h2>

        {/* Large YES / NO Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
          {/* YES Button */}
          <button
            type="button"
            onClick={() => onSelectAnswer(currentQuestionIndex, true)}
            className={`p-4 sm:p-5 rounded-2xl text-gray-900 border-2 flex items-center justify-between transition-all active:scale-[0.98] text-left ${
              currentAnswer === true
                ? 'border-black bg-sky-50/80 shadow-xs'
                : 'bg-gray-50/70 hover:bg-sky-50/40 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center font-bold text-black shadow-2xs">
                Y
              </span>
              <span className="text-base font-bold font-display">Yes</span>
            </div>
            <CheckCircle2
              className={`w-6 h-6 text-black transition-opacity ${
                currentAnswer === true ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </button>

          {/* NO Button */}
          <button
            type="button"
            onClick={() => onSelectAnswer(currentQuestionIndex, false)}
            className={`p-4 sm:p-5 rounded-2xl text-gray-900 border-2 flex items-center justify-between transition-all active:scale-[0.98] text-left ${
              currentAnswer === false
                ? 'border-black bg-sky-50/80 shadow-xs'
                : 'bg-gray-50/70 hover:bg-sky-50/40 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center font-bold text-black shadow-2xs">
                N
              </span>
              <span className="text-base font-bold font-display">No</span>
            </div>
            <CheckCircle2
              className={`w-6 h-6 text-black transition-opacity ${
                currentAnswer === false ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </button>
        </div>

        {/* Expandable Clinical Rationale Accordion */}
        <div className="rounded-xl bg-gray-50 border border-gray-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setWhyOpen(prev => !prev)}
            className="w-full px-4 py-3 flex items-center justify-between text-gray-700 text-xs hover:text-black transition-colors text-left"
          >
            <span className="flex items-center gap-1.5 font-semibold text-black">
              <HelpCircle className="w-4 h-4 text-sky-700" />
              Why are we asking this?
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                whyOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          {whyOpen && (
            <div className="px-4 pb-3.5 pt-0.5 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
              {qData.why}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-800 text-xs font-semibold hover:bg-gray-200 transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={currentAnswer === null}
          className={`px-6 py-2.5 rounded-xl bg-black text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 ${
            currentAnswer !== null ? 'opacity-100 hover:bg-gray-800' : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <span>{isLastQuestion ? 'Complete Assessment' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Safety Anchor */}
      <div className="mt-5 text-center">
        <button
          type="button"
          onClick={onOpenCrisis}
          className="text-xs text-gray-600 hover:text-red-600 transition-colors inline-flex items-center gap-1.5"
        >
          <PhoneCall className="w-3.5 h-3.5 text-red-600" />
          <span>Feeling distressed right now? <strong>Call 988 for immediate help</strong></span>
        </button>
      </div>
    </div>
  );
};
