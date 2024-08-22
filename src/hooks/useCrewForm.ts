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

  // TODO useQuery로 변경
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 크루 생성 API 호출 로직
    console.log({
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
    });
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
  };
};
