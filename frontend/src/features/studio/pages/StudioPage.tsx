import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StudioCanvas } from '../components/StudioCanvas';
import { ReviewCanvas } from '../components/ReviewCanvas';
import { TestCanvas } from '../components/TestCanvas';
import { DeployCanvas } from '../components/DeployCanvas';
import { ROUTES } from '@/lib/constants';

export default function StudioPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<'build' | 'review' | 'test' | 'deploy'>('build');
  const locationState = location.state as { initialPrompt?: string; timestamp?: number; createNew?: boolean } | null;
  const initialPrompt = locationState?.initialPrompt;
  const sessionKey = locationState?.timestamp ? `session-${locationState.timestamp}` : 'session-default';

  return (
    <div>
      {currentStep === 'build' ? (
        <StudioCanvas
          key={sessionKey}
          initialPrompt={initialPrompt}
          onBack={() => navigate(ROUTES.DASHBOARD)}
          onNextToReview={() => setCurrentStep('review')}
        />
      ) : currentStep === 'review' ? (
        <ReviewCanvas
          onBackToBuild={() => setCurrentStep('build')}
          onNextToTest={() => setCurrentStep('test')}
        />
      ) : currentStep === 'test' ? (
        <TestCanvas
          onBackToReview={() => setCurrentStep('review')}
          onNextToDeploy={() => setCurrentStep('deploy')}
        />
      ) : (
        <DeployCanvas
          onBackToReview={() => setCurrentStep('test')}
          onSaveAndContinue={() => {
            alert('🎉 Agent successfully architected and compiled via real-time AI Conversation Engine!');
            navigate(ROUTES.DASHBOARD);
          }}
        />
      )}
    </div>
  );
}
