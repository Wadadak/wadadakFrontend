import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useUserRoles } from './useUserRoles';
import { useCrewInfo } from './useCrewInfo';
import {
  CreateCrewData,
  CrewResponse,
  UpdateCrewData,
} from '@/types/crewTypes';
import { createCrew, updateCrew } from '@/apis/crewApi';
import { useRouter } from 'next/navigation';

export const useCrewForm = () => {
  const crewId = Number(useParams().crewId);
  const isEditing = Boolean(crewId);
  const router = useRouter();

  // 권한 확인
  const {
    data: userRole,
    isLoading: isRoleLoading,
    isError: isRoleError,
    error: roleError,
  } = useUserRoles(crewId);

  // 크루 정보 조회
  const {
    data: crewInfo,
    isLoading: isInfoLoading,
    isError: isInfoError,
    error: infoError,
  } = useCrewInfo(crewId);

  const [crewName, setCrewName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [crewCapacity, setCrewCapacity] = useState<number>();
  const [activityRegion, setActivityRegion] = useState<string | undefined>(
    undefined,
  );
  const [crewImage, setCrewImage] = useState<File | string | null>(null);
  const [runRecordOpen, setRunRecordOpen] = useState<boolean | undefined>(
    undefined,
  );
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);
  const [gender, setGender] = useState<string>('');
  const [leaderRequired, setLeaderRequired] = useState<boolean>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const queryClient = useQueryClient();

  // NOTE 권한 확인
  useEffect(() => {
    if (isEditing && userRole && !['LEADER', 'STAFF'].includes(userRole.role)) {
      alert('수정 권한이 없습니다');
      router.push('/my-crews');
    }
  }, [isEditing, userRole, isRoleLoading, router]);

  // useEffect로 초기값 설정
  // TODO 이미지 추가
  useEffect(() => {
    if (isEditing && crewInfo) {
      setCrewName(crewInfo.crewName);
      setDescription(crewInfo.description);
      setCrewCapacity(crewInfo.crewCapacity);
      setActivityRegion(crewInfo.activityRegion);
      setRunRecordOpen(crewInfo.limit.runRecordOpen);
      // FIXME 일단 false로 고정
      setLeaderRequired(false);
      setMinYear(crewInfo.limit.minYear);
      setMaxYear(crewInfo.limit.maxYear);
      setGender(crewInfo.limit.gender);
      setCrewImage(crewInfo.crewImage);
    }
  }, [isEditing, crewInfo]);

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

    // FIXME 일단은 고정
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

  const mutation = useMutation<
    CrewResponse,
    Error,
    CreateCrewData | UpdateCrewData
  >({
    mutationFn: async (
      data: CreateCrewData | UpdateCrewData,
    ): Promise<CrewResponse> => {
      if (isEditing) {
        return updateCrew(crewId, data as UpdateCrewData);
      } else {
        return createCrew(data as CreateCrewData);
      }
    },
    onSuccess: () => {
      // 데이터 갱신하기 위해 연결된 데이터 무효화
      queryClient.invalidateQueries({
        queryKey: ['crewInfo', crewId],
      });
      alert(
        isEditing ? '크루 정보가 수정되었습니다.' : '크루가 생성되었습니다!',
      );
      router.push(`/my-crews/${crewId}/info`);
    },
    onError: (error: Error) => {
      console.error('크루 작업 중 오류 발생:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const crewData: CreateCrewData | UpdateCrewData = {
        crewName,
        description,
        activityRegion: activityRegion!,
        runRecordOpen: runRecordOpen!,
        leaderRequired: leaderRequired!,
        crewCapacity,
        crewImage: typeof crewImage === 'string' ? undefined : crewImage,
        minYear,
        maxYear,
        gender,
      };

      mutation.mutate(crewData);
    } else {
      console.log('유효성 검사 실패:', errors);
    }
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      setCrewImage(file);
    } else {
      setCrewImage(null); // 파일이 선택되지 않으면 null로 설정
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
    isRoleError,
    isRoleLoading,
    roleError,
    isInfoError,
    isInfoLoading,
    infoError,
  };
};
