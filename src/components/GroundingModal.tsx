import React, { useState } from 'react';
import { GROUNDING_STEPS } from '../data/screeningData';
import { Sparkles, Eye, Hand, Ear, Wind, Smile, X, ArrowRight, CheckCircle2 } from 'lucide-react';

interface GroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroundingModal: React.FC<GroundingModalProps> = ({ isOpen, onClose }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const current = GROUNDING_STEPS[currentStepIdx];

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye': return <Eye className="w-8 h-8 text-teal-700" />;
      case 'Hand': return <Hand className="w-8 h-8 text-teal-700" />;
      case 'Ear': return <Ear className="w-8 h-8 text-teal-700" />;
      case 'Wind': return <Wind className="w-8 h-8 text-teal-700" />;
      case 'Smile': return <Smile className="w-8 h-8 text-teal-700" />;
      default: return <Sparkles className="w-8 h-8 text-teal-700" />;
    }
  };

  const handleNext = () => {
    if (currentStepIdx < GROUNDING_STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl relative border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-gray-900 font-display">
              5-4-3-2-1 Sensory Grounding
            </h3>
          </div>
          <button
            onClick={() => { handleReset(); onClose(); }}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isCompleted ? (
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3 font-medium">
              <span>Step {currentStepIdx + 1} of 5</span>
              <span className="text-teal-700 font-semibold">{current.step} Sensations</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-teal-600 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStepIdx + 1) / 5) * 100}%` }}
              />
            </div>

            <div className="text-center py-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shadow-inner">
                {getStepIcon(current.iconName)}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2 font-display">
                {current.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
                {current.text}
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
              >
                <span>{currentStepIdx === 4 ? 'Complete Exercise' : 'Next Grounding Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {currentStepIdx > 0 && (
                <button
                  onClick={() => setCurrentStepIdx(prev => prev - 1)}
                  className="py-2 text-xs text-gray-500 hover:text-gray-800 font-medium"
                >
                  Previous Step
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2 font-display">
              Grounding cycle complete
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto mb-6 leading-relaxed">
              Take one final deep, nourishing breath in. Notice the stability beneath you. You are present, safe, and supported in this moment.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { handleReset(); onClose(); }}
                className="w-full py-3.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
              <button
                onClick={handleReset}
                className="py-2 text-xs text-teal-700 hover:underline font-semibold"
              >
                Repeat exercise
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
