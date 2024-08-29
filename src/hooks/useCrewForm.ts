import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
// import { mockCrewList } from '@/mocks/mockData/mockCrewList';
import { useParams } from 'next/navigation';
import { CreateCrewData, CrewResponse, UpdateCrewData } from '@/types/crewTypes';
import axiosInstance from '@/apis/axiosInstance';

const createCrew =async (newCrewData:CreateCrewData) :Promise<CrewResponse> => {
    const formData = new FormData();
    formData.append('crewName', newCrewData.crewName);
    formData.append('description', newCrewData.description);
    formData.append('activityRegion', newCrewData.activityRegion);
    formData.append('runRecordOpen', String(newCrewData.runRecordOpen));
    formData.append('leaderRequired', String(newCrewData.leaderRequired));

    if(newCrewData.crewCapacity) {
      formData.append('crewCapacity', String(newCrewData.crewCapacity));
    }

    if(newCrewData.crewImage) {
      formData.append('crewImage', newCrewData.crewImage);
    }

    if(newCrewData.minYear) {
      formData.append('minYear', String(newCrewData.minYear));
    }

    if(newCrewData.maxYear) {
      formData.append('maxYear', String(newCrewData.maxYear));
    }

    if(newCrewData.gender) {
      formData.append('gender', newCrewData.gender);
    }


    const response = await axiosInstance.post('/crew', formData, {
      headers : {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data
}

const updateCrew =async (newCrewData:UpdateCrewData) :Promise<CrewResponse>=> {
    const formData = new FormData();
    formData.append('description', newCrewData.description);
    formData.append('activityRegion', newCrewData.activityRegion);
    formData.append('runRecordOpen', String(newCrewData.runRecordOpen));
    formData.append('leaderRequired', String(newCrewData.leaderRequired));

    if(newCrewData.crewCapacity) {
      formData.append('crewCapacity', String(newCrewData.crewCapacity));
    }

    if(newCrewData.crewImage) {
      formData.append('crewImage', newCrewData.crewImage);
    }

    if(newCrewData.minYear) {
      formData.append('minYear', String(newCrewData.minYear));
    }

    if(newCrewData.maxYear) {
      formData.append('maxYear', String(newCrewData.maxYear));
    }

    if(newCrewData.gender) {
      formData.append('gender', newCrewData.gender);
    }


    const response = await axiosInstance.put(`/crew/${crewId}`, formData, {
      headers : {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data
}


export const useCrewForm = () => {
  const { crewId } = useParams(); // URL에서 crewId 추출
  // const id = parseInt(crewId as string, 10);
  // const crew = mockCrewList.find((crew) => crew.crewId === id);

  const [crewName, setCrewName] = useState('');
  const [description, setDescription] = useState('');
  const [crewCapacity, setCrewCapacity] = useState<number | null>(null);
  const [activityRegion, setActivityRegion] = useState('');
  const [crewImage, setCrewImage] = useState<File | null>(null);
  const [runRecordOpen, setRunRecordOpen] = useState(false);
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);
  const [gender, setGender] = useState('');
  const [leaderRequired, setLeaderRequired] = useState(false);
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
      setMaxYear(crew.maxYear ?? null);
      setMinYear(crew.minYear ?? null);
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
