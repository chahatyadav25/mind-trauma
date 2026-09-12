import React, { useState, useEffect } from 'react';
import { ViewId, AssessmentCompositeResult, AssessmentRecord } from './types';
import { 
  calculatePcPtsd5Score, 
  calculateGad7Score, 
  getGad7Severity, 
  determineRiskLevel, 
  loadStoredAssessments,
  saveStoredAssessments,
  formatDateKey
} from './data/screeningData';

import { Header } from './components/Header';
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
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState<boolean>(false);
  const [isGroundingModalOpen, setIsGroundingModalOpen] = useState<boolean>(false);

  // Active Questionnaire Responses
  const [traumaExposure, setTraumaExposure] = useState<boolean | null>(null);
  const [ptsdAnswers, setPtsdAnswers] = useState<(boolean | null)[]>([null, null, null, null, null]);
  const [gad7Answers, setGad7Answers] = useState<(number | null)[]>([null, null, null, null, null, null, null]);
  const [urgentDistress, setUrgentDistress] = useState<boolean | null>(null);
  const [selfHarmOrDanger, setSelfHarmOrDanger] = useState<boolean | null>(null);

  // Saved Screening History (persisted locally and drives the mood/well-being trend)
  const [historyList, setHistoryList] = useState<AssessmentRecord[]>(() => loadStoredAssessments());

  // Computed / Current Composite Assessment Result
  const [currentAssessment, setCurrentAssessment] = useState<AssessmentCompositeResult>({
    traumaExposure: true,
    ptsdAnswers: [true, true, true, false, true],
    ptsdScore: 4,
    ptsdPositive: true,
    gad7Answers: [2, 2, 2, 2, 2, 2, 2],
    gad7Score: 14,
    gad7Severity: 'moderate',
    gad7NeedsReferral: true,
    riskLevel: 'routine',
    riskAnswers: {
      urgentDistress: false,
      selfHarmOrDanger: false,
    }
  });

  // Always glide smoothly to the top whenever navigation changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigate = (view: ViewId) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleStartAssessment = () => {
    setTraumaExposure(null);
    setPtsdAnswers([null, null, null, null, null]);
    setGad7Answers([null, null, null, null, null, null, null]);
    setUrgentDistress(null);
    setSelfHarmOrDanger(null);
    handleNavigate('assessment');
  };

  const handleSetPtsdAnswer = (index: number, val: boolean) => {
    setPtsdAnswers(prev => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  };

  const handleSetGad7Answer = (index: number, val: number) => {
    setGad7Answers(prev => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  };

  const handleCompleteAssessment = () => {
    const ptsdScore = calculatePcPtsd5Score(traumaExposure, ptsdAnswers);
    const ptsdPositive = ptsdScore >= 3;
    const gad7Score = calculateGad7Score(gad7Answers);
    const gad7Severity = getGad7Severity(gad7Score);
    const gad7NeedsReferral = gad7Score >= 10;
    const riskLevel = determineRiskLevel(urgentDistress, selfHarmOrDanger);

    const completed: AssessmentCompositeResult = {
      traumaExposure,
      ptsdAnswers,
      ptsdScore,
      ptsdPositive,
      gad7Answers,
      gad7Score,
      gad7Severity,
      gad7NeedsReferral,
      riskLevel,
      riskAnswers: {
        urgentDistress,
        selfHarmOrDanger
      }
    };

    setCurrentAssessment(completed);

    // Save to historical timeline log and update mood graph data point
    const now = new Date();
    const dateKey = formatDateKey(now);
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newRecord: AssessmentRecord = {
      id: `rec-${Date.now()}`,
      date: dateStr,
      dateKey,
      timestamp: now.getTime(),
      score: ptsdScore,
      total: 5,
      isPositive: ptsdPositive,
      statusText: !traumaExposure ? 'Trauma Neg (0/5)' : ptsdPositive ? 'Positive Screen' : 'Lower Indication (0–2)',
      summary: !traumaExposure
        ? `Criterion A trauma exposure was not reported (Score: 0/5). GAD-7 Anxiety Score: ${gad7Score}/21 (${gad7Severity.toUpperCase()}).`
        : `Reported well-being/assessment score of ${ptsdScore}/5 and GAD-7 anxiety score of ${gad7Score}/21 (${gad7Severity.toUpperCase()}). ${gad7NeedsReferral ? 'Referral threshold exceeded.' : ''}`,
      answers: ptsdAnswers,
      traumaExposure: !!traumaExposure,
      gad7Score,
      gad7Severity,
      riskLevel
    };

    setHistoryList(prev => {
      const filtered = prev.filter(r => r.dateKey !== dateKey);
      const updated = [newRecord, ...filtered];
      saveStoredAssessments(updated);
      return updated;
    });
    handleNavigate('results');
  };

  const handleInspectRecord = (rec: AssessmentRecord) => {
    const isPositive = rec.score >= 3;
    const gadScore = rec.gad7Score ?? 8;
    const gadSev = rec.gad7Severity ?? getGad7Severity(gadScore);

    setCurrentAssessment({
      traumaExposure: rec.traumaExposure ?? (rec.score > 0),
      ptsdAnswers: rec.answers,
      ptsdScore: rec.score,
      ptsdPositive: isPositive,
      gad7Answers: [1, 1, 1, 1, 1, 1, 2],
      gad7Score: gadScore,
      gad7Severity: gadSev,
      gad7NeedsReferral: gadScore >= 10,
      riskLevel: rec.riskLevel ?? 'routine',
      riskAnswers: { urgentDistress: false, selfHarmOrDanger: false }
    });
    handleNavigate('results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5FAFC] text-[#1b1c1c] font-sans antialiased">
      {/* Top Application Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenCrisis={() => setIsCrisisModalOpen(true)}
        onOpenGrounding={() => setIsGroundingModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 md:pb-10 bg-[#F5FAFC]">
        {/* Dynamic View Pane */}
        <div className="flex-1 w-full animate-in fade-in duration-200">
          {currentView === 'landing' && (
            <LandingView
              onStart={handleStartAssessment}
              onNavigate={handleNavigate}
              onOpenCrisis={() => setIsCrisisModalOpen(true)}
              onOpenGrounding={() => setIsGroundingModalOpen(true)}
            />
          )}

          {currentView === 'consent' && (
            <ConsentView
              onAccept={() => handleNavigate('safety')}
              onCancel={() => handleNavigate('landing')}
            />
          )}

          {currentView === 'safety' && (
            <SafetyView
              onProceed={() => handleNavigate('intro')}
              onBack={() => handleNavigate('consent')}
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
              traumaExposure={traumaExposure}
              onSetTraumaExposure={setTraumaExposure}
              ptsdAnswers={ptsdAnswers}
              onSetPtsdAnswer={handleSetPtsdAnswer}
              gad7Answers={gad7Answers}
              onSetGad7Answer={handleSetGad7Answer}
              urgentDistress={urgentDistress}
              onSetUrgentDistress={setUrgentDistress}
              selfHarmOrDanger={selfHarmOrDanger}
              onSetSelfHarmOrDanger={setSelfHarmOrDanger}
              onComplete={handleCompleteAssessment}
              onOpenCrisis={() => setIsCrisisModalOpen(true)}
              onCancelOrBackToIntro={() => handleNavigate('intro')}
            />
          )}

          {currentView === 'results' && (
            <ResultsView
              result={currentAssessment}
              onNavigate={handleNavigate}
              onRetake={handleStartAssessment}
              onOpenGrounding={() => setIsGroundingModalOpen(true)}
              onOpenCrisis={() => setIsCrisisModalOpen(true)}
            />
          )}

          {currentView === 'symptoms' && (
            <SymptomsView
              onNavigate={handleNavigate}
              onOpenGrounding={() => setIsGroundingModalOpen(true)}
            />
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
            <DashboardView 
              onNavigate={handleNavigate}
              assessments={historyList}
              onStartAssessment={handleStartAssessment}
              onOpenGrounding={() => setIsGroundingModalOpen(true)}
              onOpenCrisis={() => setIsCrisisModalOpen(true)}
            />
          )}

          {currentView === 'history' && (
            <HistoryView
              historyList={historyList}
              onClearHistory={() => {
                setHistoryList([]);
                saveStoredAssessments([]);
              }}
              onNavigate={handleNavigate}
              onInspectRecord={handleInspectRecord}
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
