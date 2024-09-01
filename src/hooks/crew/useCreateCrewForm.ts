import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCrewData, CrewResponse } from '@/types/crewTypes';
import { createCrew } from '@/apis/crewApi';
import { useRouter } from 'next/navigation';

export const useCreateCrewForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [crewName, setCrewName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [crewCapacity, setCrewCapacity] = useState<number>();
  const [activityRegion, setActivityRegion] = useState<string>();
  const [crewImage, setCrewImage] = useState<File>();
  const [runRecordOpen, setRunRecordOpen] = useState<boolean>();
  const [minYear, setMinYear] = useState<number>();
  const [maxYear, setMaxYear] = useState<number>();
  const [gender, setGender] = useState<string>();
  const [leaderRequired, setLeaderRequired] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!crewName) {
      newErrors.crewName = '크루명을 입력하세요.';
    } else if (crewName.length > 30) {
      newErrors.crewName = '크루명은 30자 이내여야 합니다.';
    }

    if (!description) {
      newErrors.description = '크루 소개를 입력하세요.';
    } else if (description.length > 500) {
      newErrors.description = '크루 소개는 500자 이내여야 합니다.';
    }

    if (!activityRegion) {
      newErrors.activityRegion = '활동 지역을 선택하세요.';
    }

    if (!runRecordOpen) {
      newErrors.runRecordOpen = '선택하세요.';
    }

    // // // FIXME
    // if (!leaderRequired) {
    //   newErrors.leaderRequired = '선택하세요.';
    // }

    if (minYear && maxYear) {
      if (minYear < maxYear) {
        newErrors.yearRange = '연령대를 올바르게 선택하세요.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // 에러가 없으면 true 반환
  };

  const mutation = useMutation<CrewResponse, Error, CreateCrewData>({
    mutationFn: async (data: CreateCrewData): Promise<CrewResponse> =>
      createCrew(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crewList'] });
      alert('크루가 생성되었습니다!');
      router.push(`/my-crews`);
    },
    onError: (error: Error) => {
      console.error('크루 작업 중 오류 발생:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const crewData: CreateCrewData = {
        crewName: crewName!,
        description: description!,
        activityRegion: activityRegion!,
        runRecordOpen: runRecordOpen!,
        leaderRequired: leaderRequired!,
        crewCapacity,
        crewImage,
        minYear,
        maxYear,
        gender,
      };

      mutation.mutate(crewData);
    } else {
      console.log('유효성 검사 실패:', errors);
    }
  };

  const handleImageUpload = (file?: File) => {
    if (file) {
      setCrewImage(file);
    } else {
      setCrewImage(undefined); // 파일이 선택되지 않으면 null로 설정
    }
  };

  return {
    crewName,
    setCrewName,
    description,
    setDescription,
    activityRegion,
    setActivityRegion,
    runRecordOpen,
    setRunRecordOpen,
    leaderRequired,
    setLeaderRequired,
    crewCapacity,
    setCrewCapacity,
    crewImage,
    handleImageUpload,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    gender,
    setGender,
    handleSubmit, // 폼 제출 핸들러
    errors, // 유효성 검사 오류
  };
};
