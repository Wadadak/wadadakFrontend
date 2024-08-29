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
  } = useUserRoles(crewId);

  // 크루 정보 조회
  const {
    data: crewInfo,
    isLoading: isInfoLoading,
    isError: isInfoError,
  } = useCrewInfo(crewId);

  const [crewName, setCrewName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [crewCapacity, setCrewCapacity] = useState<number>();
  const [activityRegion, setActivityRegion] = useState<string>();
  const [crewImage, setCrewImage] = useState<File>();
  const [runRecordOpen, setRunRecordOpen] = useState<boolean>();
  const [minYear, setMinYear] = useState<number>();
  const [maxYear, setMaxYear] = useState<number>();
  const [gender, setGender] = useState<string>();
  const [leaderRequired, setLeaderRequired] = useState<boolean>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const queryClient = useQueryClient();

  // NOTE 권한 확인, 리디렉션 추가 가능
  useEffect(() => {
    if (isEditing && userRole && !['LEADER', 'STAFF'].includes(userRole.role)) {
      alert('수정 권한이 없습니다');
    }
  }, [isEditing, userRole, isRoleLoading]);

  // useEffect로 초기값 설정
  // TODO 이미지 추가
  useEffect(() => {
    if (isEditing && crewInfo) {
      setCrewName(crewInfo.crewName);
      setDescription(crewInfo.description);
      setCrewCapacity(crewInfo.crewCapacity);
      setActivityRegion(crewInfo.activityRegion);
      setRunRecordOpen(crewInfo.limit.runRecordOpen);
      setLeaderRequired(crewInfo.limit.leaderRequired);
      setMinYear(crewInfo.limit.minYear);
      setMaxYear(crewInfo.limit.maxYear);
      setGender(crewInfo.limit.gender);
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
    if (!leaderRequired) {
      newErrors.leaderRequired = '선택하세요.';
    }

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
    mutationFn: (
      newCrewData: CreateCrewData | UpdateCrewData,
    ): Promise<CrewResponse> => {
      if (isEditing) {
        return updateCrew(crewId, newCrewData as UpdateCrewData);
      } else {
        return createCrew(newCrewData as CreateCrewData);
      }
    },
    onSuccess: (data: CrewResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['crewInfo', crewId],
      });
      alert(
        isEditing ? '크루 정보가 수정되었습니다.' : '크루가 생성되었습니다!',
      );
      // TODO 리다이렉트 추가
      router.push(`/my-crews/${crewId}`);
    },
    onError: (error: Error) => {
      console.error('크루 작업 중 오류 발생:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // CHECKLIST
    if (validateForm()) {
      const crewData: CreateCrewData | UpdateCrewData = {
        crewName: crewName!,
        description,
        activityRegion,
        runRecordOpen,
        leaderRequired,
        crewCapacity,
        crewImage,
        minYear,
        maxYear,
        gender,
      };

      if (crewId) {
        // 수정 로직
        console.log('수정할 데이터:', crewData);
        alert('크루가 수정되었습니다.');
      } else {
        // 생성 로직
        console.log('생성할 데이터:', crewData);
        alert('크루가 생성되었습니다.');
      }
    } else {
      console.log('유효성 검사 실패:', errors);
    }
  };

  const handleImageUpload = (file: File) => {
    setCrewImage(file);
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
    errors,
  };
};
