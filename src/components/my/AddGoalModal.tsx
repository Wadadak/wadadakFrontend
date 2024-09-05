import { useState } from 'react';
import Button from '../common/Button';
import SimpleModal from '../common/SimpleModal';
import TextInput from '../common/TextInput';
import DateOnlyPicker from '../common/DateOnlyPicker';
import Label from '../common/Label';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';
import NumberInput from '../common/NumberInput';
import { useAddRunningRecord } from '@/hooks/running/useAddRunningRecord';
import { RunningGoalRequest, RunningRecordRequest } from '@/types/runningTypes';
import { extractUserIdFromToken } from '@/app/login/page';
import { getAccessToken } from '@/apis/authService';
import { useAddRunningGoal } from '@/hooks/running/useAddRunningGoal';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
export const AddGoalModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AddRecordModalProps) => {
  // const [date, setDate] = useState<string>();
  const [totalDistance, setTotalDistance] = useState<string>();
  const [totalRunningTime, setTotalRunningTime] = useState<string>();
  const [runCount, setRunCount] = useState<string>();


  const [timeHour, setTimeHour] = useState<number>();
  const [timeMinute, setTimeMinute] = useState<number>();
  const [timeSecond, setTimeSecond] = useState<number>();

  const [paceMinute, setPaceMinute] = useState<number>();
  const [paceSecond, setPaceSecond] = useState<number>();

  const [isPublic, setIsPublic] = useState<boolean>();

  const [clickDatePicker, setClickDatePicker] = useState<boolean>(false);

  const { mutate: addGoal } = useAddRunningGoal(
    () => {
      alert('목표가 추가되었습니다.');
      onClose();
    },
    (message) => {
      alert(message);
    },
  );

  const handleSubmitGoal = () => {
    if (
      !totalDistance ||
      !timeHour ||
      !timeMinute ||
      !timeSecond ||
      !paceMinute ||
      !paceSecond ||
      !runCount
      // !date
    ) {
      alert('모든 값을 입력해주세요.');
      return;
    }

    const body: RunningGoalRequest = {
      userId: extractUserIdFromToken(getAccessToken()) ?? 0,
      totalDistance: Number(totalDistance),
      totalRunningTime: `${timeHour}:${timeMinute}:${timeSecond}`,
      runCount: Number(runCount),
      averagePace: `${paceMinute}:${paceSecond}`,
      isPublic: isPublic ? 1 : 0,
    };

    console.log('Add Record Modal body', body);
    addGoal(body);
  };

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title={'목표 추가'}>
      <div className="flex flex-col">
        <Label label={'목표 누적 거리'} textSize="md" textStyle="font-semibold">
          <TextInput
            placeholder="거리 입력"
            value={totalDistance}
            onChange={setTotalDistance}
            width="lg"
          />
        </Label>
        <Label
          label={'목표 누적 러닝시간'}
          textSize="md"
          textStyle="font-semibold"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <NumberInput
                placeholder="시"
                value={timeHour}
                onChange={setTimeHour}
                width="lg"
              />
              <div>시</div>
            </div>
            <div className="flex items-center space-x-2">
              <NumberInput
                placeholder="분"
                value={timeMinute}
                onChange={setTimeMinute}
                width="lg"
              />
              <div>분</div>
            </div>
            <div className="flex items-center space-x-2">
              <NumberInput
                placeholder="초"
                value={timeSecond}
                onChange={setTimeSecond}
                width="lg"
              />
              <div>초</div>
            </div>
          </div>
        </Label>
        <Label
          label={'목표 누적 러닝 횟수'}
          textSize="md"
          textStyle="font-semibold"
        >
          <TextInput
            placeholder="러닝 횟수 입력"
            value={runCount}
            onChange={setRunCount}
            width="lg"
          />
        </Label>
        <Label
          label={'목표 평균 페이스'}
          textSize="md"
          textStyle="font-semibold"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <NumberInput
                placeholder="분"
                value={paceMinute}
                onChange={setPaceMinute}
                width="lg"
              />
              <div>분</div>
            </div>
            <div className="flex items-center space-x-2">
              <NumberInput
                placeholder="초"
                value={paceSecond}
                onChange={setPaceSecond}
                width="lg"
              />
              <div>초</div>
            </div>
          </div>
        </Label>
      </div>
      <div className="flex justify-end mt-3">
        <Button onClick={handleSubmitGoal}>추가하기</Button>
      </div>
    </SimpleModal>
  );
};
