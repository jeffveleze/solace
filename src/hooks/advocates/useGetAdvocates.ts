import { useQuery } from '@tanstack/react-query';
import { API_ROUTES } from '@/config/constants';
import { Advocate } from '@/types/advocate';
import { SEARCH_VALUE } from '@/constants/advocates';

export const useGetAdvocates = (searchValue?: string) => {
  const getAdvocates = async (): Promise<{ data: Advocate[] }> => {
    const url = new URL(API_ROUTES.ADVOCATES, window.location.origin);
    if (searchValue) {
      url.searchParams.append(SEARCH_VALUE, searchValue);
    }
    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['advocates', searchValue],
    queryFn: getAdvocates,
  });

  return { advocates: data?.data, isLoading, error };
};
