import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apis/axiosInstance';

interface Regions {
  id: string;
  name: string;
}

const fetchRegions = async (): Promise<Regions[]> => {
  const response = await axiosInstance.get('/region');
  return response.data;
};

export const useRegions = () => {
  return useQuery<Regions[], Error>({
    queryKey: ['region'],
    queryFn: fetchRegions,
    staleTime: Infinity,
  });
};
