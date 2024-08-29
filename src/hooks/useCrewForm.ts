import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import { useParams } from 'next/navigation';
import { useUserRoles } from './useUserRoles';
import { useCrewInfo } from './useCrewInfo';



export const useCrewForm = () => {
  const crewId = Number(useParams().crewId);  
  const isEditing = Boolean(crewId);
  // const id = parseInt(crewId as string, 10);
  // const crew = mockCrewList.find((crew) => crew.crewId === id);

  // 권한 확인 
  const {data:userRole, isLoading:isRoleLoading, isError:isRoleError} = useUserRoles(crewId);
  
  // 크루 정보 조회
  const {data:crewInfo, isLoading:isInfoLoading, isError:isInfoError} = useCrewInfo(crewId);
  

  
  const [crewName, setCrewName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [crewCapacity, setCrewCapacity] = useState<number>();
  const [activityRegion, setActivityRegion] = useState<string>();
  const [crewImage, setCrewImage] = useState<File>();
  const [runRecordOpen, setRunRecordOpen] = useState<boolean>();
  const [minYear, setMinYear] = useState<number>();
  const [maxYear, setMaxYear] = useState<number>();
  const [gender, setGender] = useState<string>('');
  const [leaderRequired, setLeaderRequired] = useState<boolean>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const queryClient = useQueryClient();

  // useEffect로 초기값 설정 
  // TODO 이미지 추가
  useEffect(() => {
    if (isEditing && crewInfo) {
      setCrewName(crewInfo.crewName);
      setDescription(crewInfo.description);
      setCrewCapacity(crewInfo.crewCapacity);
      setActivityRegion(crewInfo.activityRegion);
      setRunRecordOpen(crewInfo.limit.runRecordOpen);
      setApprovalRequired(crewInfo.leaderRequired);
      setGenderRestriction(crewInfo.genderRestriction ?? '');
      setMaxYear(crewInfo.maxYear ?? null);
      setMinYear(crewInfo.minYear ?? null);
    }
  }, [crew]);

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

    if (!location) {
      newErrors.location = '활동 지역을 선택하세요.';
    }

    if (!recordRequired) {
      newErrors.recordRequired = '선택하세요.';
    }
    if (!approvalRequired) {
      newErrors.approvalRequired = '선택하세요.';
    }

    if (minYear !== null && maxYear !== null && minYear < maxYear) {
      newErrors.yearRange = '최소 년생은 최대 년생보다 커야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // 에러가 없으면 true 반환
  };

  const createCrewMutation = useMutation(
    (newCrewData: any)
  )


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const crewData = {
        id: crewId || Date.now().toString(), // 새로운 ID 생성
        name,
        description,
        location,
        recordRequired,
        approvalRequired,
        image,
        capacity,
        genderRestriction,
        maxYear,
        minYear,
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

  const handleImageUpload = (file: File | null) => {
    setImage(file);
  };

  return {
    name,
    setName,
    description,
    setDescription,
    location,
    setLocation,
    recordRequired,
    setRecordRequired,
    approvalRequired,
    setApprovalRequired,
    image,
    handleImageUpload,
    capacity,
    setCapacity,
    genderRestriction,
    setGenderRestriction,
    maxYear,
    setMaxYear,
    minYear,
    setMinYear,
    handleSubmit, // 폼 제출 핸들러
    errors,
  };
};
