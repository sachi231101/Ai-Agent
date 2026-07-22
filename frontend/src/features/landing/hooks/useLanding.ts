import { useQuery } from '@tanstack/react-query';
import { landingApi } from '../api/landing.api';

export function useLandingData() {
  return useQuery({
    queryKey: ['landing'],
    queryFn: landingApi.getLandingData,
  });
}
