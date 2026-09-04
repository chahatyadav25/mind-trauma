import React, { useState } from 'react';
import { ViewId } from './types';
import { Header } from './components/Header';
import { NavTabs } from './components/NavTabs';
import { BottomNav } from './components/BottomNav';
import { CrisisModal } from './components/CrisisModal';
import { GroundingModal } from './components/GroundingModal';

import { LandingView } from './views/LandingView';
import { ConsentView } from './views/ConsentView';
import { SafetyView } from './views/SafetyView';
import { IntroView } from './views/IntroView';
import { QuestionnaireView } from './views/QuestionnaireView';
import { ResultsView } from './views/ResultsView';
import { SymptomsView } from './views/SymptomsView';
import { ChatView } from './views/ChatView';
import { ResourcesView } from './views/ResourcesView';
import { DashboardView } from './views/DashboardView';
import { HistoryView } from './views/HistoryView';
import { StatesView } from './views/StatesView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewId>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(boolean | null)[]>([null, null, null, null, null]);
  const [currentScore, setCurrentScore] = useState<number>(4);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState<boolean>(false);
  const [isGroundingModalOpen, setIsGroundingModalOpen] = useState<boolean>(false);

  const handleNavigate = (view: ViewId) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAssessment = () => {
    setUserAnswers([null, null, null, null, null]);
    setCurrentQuestionIndex(0);
    handleNavigate('assessment');
  };

  const handleSelectAnswer = (index: number, isYes: boolean) => {
    setUserAnswers(prev => {
      const updated = [...prev];
      updated[index] = isYes;
      return updated;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const calculatedScore = userAnswers.filter(ans => ans === true).length;
      setCurrentScore(calculatedScore);
      handleNavigate('results');
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRetake = () => {
    setUserAnswers([null, null, null, null, null]);
    setCurrentQuestionIndex(0);
    handleNavigate('assessment');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5FAFC] text-[#1b1c1c] font-sans antialiased">
      {/* Top Application Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenCrisis={() => setIsCrisisModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-[#F5FAFC]">
        {/* 12-Module Quick Tab Carousel */}
        <NavTabs currentView={currentView} onNavigate={handleNavigate} />

        {/* Dynamic View Pane */}
        <div className="flex-1 flex flex-col w-full">
          {currentView === 'landing' && (
            <LandingView
              onNavigate={handleNavigate}
              onOpenCrisis={() => setIsCrisisModalOpen(true)}
            />
          )}

          {currentView === 'consent' && (
            <ConsentView onNavigate={handleNavigate} />
          )}

          {currentView === 'safety' && (
            <SafetyView
              onNavigate={handleNavigate}
              onOpenCrisis={() => setIsCrisisModalOpen(true)}
            />
          )}

          {currentView === 'intro' && (
            <IntroView
              onNavigate={handleNavigate}
              onStartAssessment={handleStartAssessment}
            />
          )}

          {currentView === 'assessment' && (
            <QuestionnaireView
              currentQuestionIndex={currentQuestionIndex}
              userAnswers={userAnswers}
              onSelectAnswer={handleSelectAnswer}
              onNext={handleNextQuestion}
              onPrev={handlePrevQuestion}
              onOpenCrisis={() => setIsCrisisModalOpen(true)}
            />
          )}

          {currentView === 'results' && (
            <ResultsView
              score={currentScore}
              onSimulateScore={setCurrentScore}
              onNavigate={handleNavigate}
              onRetake={handleRetake}
            />
          )}

          {currentView === 'symptoms' && (
            <SymptomsView onNavigate={handleNavigate} />
          )}

          {currentView === 'chat' && (
            <ChatView
              onOpenGrounding={() => setIsGroundingModalOpen(true)}
              onOpenCrisis={() => setIsCrisisModalOpen(true)}
            />
          )}

          {currentView === 'resources' && (
            <ResourcesView
              onOpenGrounding={() => setIsGroundingModalOpen(true)}
              onOpenCrisis={() => setIsCrisisModalOpen(true)}
            />
          )}

          {currentView === 'dashboard' && (
            <DashboardView onNavigate={handleNavigate} />
          )}

          {currentView === 'history' && (
            <HistoryView
              onNavigate={handleNavigate}
              onInspectRecord={(score) => setCurrentScore(score)}
            />
          )}

          {currentView === 'states' && (
            <StatesView
              onNavigate={handleNavigate}
              onOpenCrisis={() => setIsCrisisModalOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Persistent Mobile Bottom Navigation */}
      <BottomNav currentView={currentView} onNavigate={handleNavigate} />

      {/* Urgent Crisis Support Modal */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
      />

      {/* 5-4-3-2-1 Somatic Grounding Interactive Modal */}
      <GroundingModal
        isOpen={isGroundingModalOpen}
        onClose={() => setIsGroundingModalOpen(false)}
      />
    </div>
  );
}
