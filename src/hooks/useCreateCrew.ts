import { useRecoilState } from 'recoil';
import {
  crewNameState,
  crewDescriptionState,
  crewLocationState,
  runningRecordRequiredState,
  crewApprovalRequiredState,
  crewImageState,
  crewCapacityState,
  crewGenderRestrictionState,
  crewMaxAgeState,
  crewMinAgeState,
} from '@/recoil/atoms/crewState';

export const useCreateCrew = () => {
  const [name, setName] = useRecoilState(crewNameState);
  const [description, setDescription] = useRecoilState(crewDescriptionState);
  const [location, setLocation] = useRecoilState(crewLocationState);
  const [recordRequired, setRecordRequired] = useRecoilState(
    runningRecordRequiredState,
  );
  const [approvalRequired, setApprovalRequired] = useRecoilState(
    crewApprovalRequiredState,
  );
  const [image, setImage] = useRecoilState(crewImageState);
  const [capacity, setCapacity] = useRecoilState(crewCapacityState);
  const [genderRestriction, setGenderRestriction] = useRecoilState(
    crewGenderRestrictionState,
  );
  const [maxAge, setMaxAge] = useRecoilState(crewMaxAgeState);
  const [minAge, setMinAge] = useRecoilState(crewMinAgeState);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  return {
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
};
