import { useEffect, useState } from 'react';
import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import { useParams } from 'next/navigation';

export const useCrewForm = () => {
  const { crewId } = useParams(); // URL에서 crewId 추출
  const id = parseInt(crewId as string, 10);
  const crew = mockCrewList.find((crew) => crew.crewId === id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [recordRequired, setRecordRequired] = useState(false);
  const [approvalRequired, setApprovalRequired] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [capacity, setCapacity] = useState<number | null>(null);
  const [genderRestriction, setGenderRestriction] = useState('');
  const [maxAge, setMaxAge] = useState<number | null>(null);
  const [minAge, setMinAge] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // useEffect로 초기값 설정
  useEffect(() => {
    if (crew) {
      setName(crew.crewName);
      setDescription(crew.description);
      setLocation(crew.activityRegion);
      setRecordRequired(crew.publicRecordRequired ?? false);
      setApprovalRequired(crew.leaderRequired);
      setCapacity(crew.crewCapacity);
      setGenderRestriction(crew.genderRestriction ?? '');
      setMaxAge(crew.maxAge ?? null);
      setMinAge(crew.minAge ?? null);
    }
  }, [crew]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) {
      newErrors.name = '크루명을 입력하세요.';
    } else if (name.length > 30) {
      newErrors.name = '크루명은 30자 이내여야 합니다.';
    }

    if (!description) {
      newErrors.description = '크루 소개를 입력하세요.';
    } else if (description.length > 500) {
      newErrors.description = '크루 소개는 500자 이내여야 합니다.';
    }

    if (!location) {
      newErrors.location = '활동 지역을 선택하세요.';
    }

    if (minAge !== null && maxAge !== null && minAge > maxAge) {
      newErrors.ageRange = '최소 나이는 최대 나이보다 클 수 없습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // 에러가 없으면 true 반환
  };

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
        maxAge,
        minAge,
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
    maxAge,
    setMaxAge,
    minAge,
    setMinAge,
    handleSubmit, // 폼 제출 핸들러
    errors,
  };
};
