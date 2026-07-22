import { useNavigate } from 'react-router-dom';
import { StudioCanvas } from '@/features/studio/components/StudioCanvas';
import { ROUTES } from '@/lib/constants';

export default function CreateAgentPage() {
  const navigate = useNavigate();

  return (
    <StudioCanvas
      onBack={() => navigate(ROUTES.DASHBOARD)}
    />
  );
}
