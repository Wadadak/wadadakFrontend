import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apis/axiosInstance';

const fetchRegions = async () => {
  const response = await axiosInstance.get('/region');
  return response.data;
};

export const useRegions = () => {
  return useQuery({
    queryKey: ['region'],
    queryFn: fetchRegions,
    staleTime: Infinity,
  });
};
