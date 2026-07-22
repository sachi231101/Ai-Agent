import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudioCanvas } from '../components/StudioCanvas';
import { ReviewCanvas } from '../components/ReviewCanvas';
import { TestCanvas } from '../components/TestCanvas';
import { DeployCanvas } from '../components/DeployCanvas';
import { ROUTES } from '@/lib/constants';

export default function StudioPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'build' | 'review' | 'test' | 'deploy'>('build');

  return (
    <div>
      {currentStep === 'build' ? (
        <StudioCanvas
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
            alert('🎉 Congratulations! Agent successfully deployed to production environment!');
            navigate(ROUTES.DASHBOARD);
          }}
        />
      )}
    </div>
  );
}
