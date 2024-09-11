import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CrewInfoResponse,
  CrewResponse,
  UpdateCrewData,
} from '@/types/crewTypes';
import { updateCrew } from '@/apis/crew/crewApi';
import { useRouter } from 'next/navigation';
import { useRegions } from '../useRegions';

export const useUpdateCrewForm = (
  crewId: number,
  crewInfo?: CrewInfoResponse,
) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: regions } = useRegions();

  // 폼 상태 관리
  const [crewName, setCrewName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [crewCapacity, setCrewCapacity] = useState<number>();
  const [activityRegion, setActivityRegion] = useState<string>();
  const [crewImage, setCrewImage] = useState<string | File>();
  const [runRecordOpen, setRunRecordOpen] = useState<boolean>(false);
  const [minYear, setMinYear] = useState<number>();
  const [maxYear, setMaxYear] = useState<number>();
  const [gender, setGender] = useState<string>();
  const [leaderRequired, setLeaderRequired] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 크루 정보가 로드되면 상태 초기화
  useEffect(() => {
    if (crewInfo && regions) {
      // 초기 값으로 주어진 name을 id로 변환하여 상태에 설정
      const selectedRegion = regions.find(
        (region) => region.name === crewInfo.activityRegion,
      );
      setActivityRegion(selectedRegion?.id); // name을 id로 변환 후 상태 설정

      setCrewName(crewInfo.crewName);
      setDescription(crewInfo.description);
      setCrewCapacity(crewInfo.crewCapacity);
      setRunRecordOpen(crewInfo.limit.runRecordOpen);
      setLeaderRequired(crewInfo.limit.leaderRequired);
      setMinYear(crewInfo.limit.minYear);
      setMaxYear(crewInfo.limit.maxYear);
      setGender(crewInfo.limit.gender);
      setCrewImage(crewInfo.crewImage as string);
    }
  }, [crewInfo, regions]);

  // // NOTE 권한 확인
  // useEffect(() => {
  //   if (
  //     !isRoleLoading &&
  //     userRole &&
  //     !['LEADER', 'STAFF'].includes(userRole.role)
  //   ) {
  //     alert('수정 권한이 없습니다');
  //     router.push('/my-crews');
  //   }
  // }, [userRole, isRoleLoading, router]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!description) {
      newErrors.description = '크루 소개를 입력하세요.';
    } else if (description.length > 500) {
      newErrors.description = '크루 소개는 500자 이내여야 합니다.';
    }

    if (!activityRegion) {
      newErrors.activityRegion = '활동 지역을 선택하세요.';
    }

    if (runRecordOpen === null || runRecordOpen === undefined) {
      newErrors.runRecordOpen = '선택하세요.';
    }

    if (runRecordOpen === null || runRecordOpen === undefined) {
      newErrors.leaderRequired = '선택하세요.';
    }

    if (minYear && maxYear && minYear < maxYear) {
      newErrors.yearRange = '연령대를 올바르게 선택하세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // 에러가 없으면 true 반환
  };

  const mutation = useMutation<CrewResponse, Error, UpdateCrewData>({
    mutationFn: async (data: UpdateCrewData): Promise<CrewResponse> => {
      return updateCrew(crewId, data);
    },

    onSuccess: () => {
      // 데이터 갱신하기 위해 연결된 데이터 무효화
      queryClient.invalidateQueries({
        queryKey: ['crewInfo', crewId],
      });
      alert('크루 정보가 수정되었습니다.');
      router.push(`/my-crews/${crewId}/info`);
    },
    onError: (error: Error) => {
      console.error('크루 작업 중 오류 발생:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const crewData: UpdateCrewData = {
        description: description!,
        activityRegion: activityRegion!,
        runRecordOpen,
        leaderRequired,
        crewCapacity,
        minYear,
        maxYear,
        gender,
      };

      // profileImage가 File 타입일 때만 추가
      if (crewImage instanceof File) {
        crewData.crewImage = crewImage;
      }

      mutation.mutate(crewData);
    } else {
      console.log('유효성 검사 실패:', errors);
    }
  };

  const handleImageUpload = (file?: File) => {
    if (file) {
      setCrewImage(file);
    } // 파일이 업로드되면 파일로 설정
    // } else if (typeof crewImage === 'string' && crewImage) {
    //   // 이미 URL로 설정된 이미지가 있으면 그대로 유지
    //   setCrewImage(crewImage);
    // } else {
    //   // setCrewImage(undefined); // 파일이 선택되지 않으면 undefined로 설정
    // }
  };

  return {
    crewName, // 크루 이름을 반환하여 컴포넌트에서 읽기 전용으로 표시
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
    setCrewImage,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    gender,
    setGender,
    handleSubmit, // 폼 제출 핸들러
    handleImageUpload,
    errors, // 유효성 검사 오류
  };
};
