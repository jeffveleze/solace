import { useQuery } from '@tanstack/react-query';
import { API_ROUTES } from '@/config/constants';
import { Advocate } from '@/types/advocate';

export const useGetAdvocates = () => {
  const getAdvocates = async (): Promise<{ data: Advocate[] }> => {
    const response = await fetch(API_ROUTES.ADVOCATES);
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['advocates'],
    queryFn: getAdvocates,
  });

  return { advocates: data?.data, isLoading, error };
};
