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
import { RunningRecordRequest } from '@/types/runningTypes';

interface AddRecordModalProps {
  goalId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
export const AddRecordModal = ({
  goalId,
  isOpen,
  onClose,
  onSuccess,
}: AddRecordModalProps) => {
  const [date, setDate] = useState<string>();
  const [distance, setDistance] = useState<string>();
  const [timeHour, setTimeHour] = useState<string>();
  const [timeMinute, setTimeMinute] = useState<string>();
  const [timeSecond, setTimeSecond] = useState<string>();
  const [paceMinute, setPaceMinute] = useState<string>();
  const [paceSecond, setPaceSecond] = useState<string>();

  // const [clickDatePicker, setClickDatePicker] = useState<boolean>(false);

  const { mutate: addRecord } = useAddRunningRecord(() => {
    alert('기록이 추가되었습니다.');
    onClose();
  }, alert);

  const handleSubmitRecord = () => {
    if (
      !distance ||
      !timeHour ||
      !timeMinute ||
      !timeSecond ||
      !paceMinute ||
      !paceSecond
    ) {
      alert('모든 값을 입력해주세요.');
      return;
    }

    const body: RunningRecordRequest = {
      goalId: 4,
      distance: Number(distance),
      runningTime: `${timeHour}:${timeMinute}:${timeSecond}`,
      pace: `${paceMinute}:${paceSecond}`,
      isPublic: 1,
    };

    console.log('Add Record Modal body', body);
    addRecord(body);
  };

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title={'기록 추가'}>
      <div className="flex flex-col">
        {/* <Label label={'날짜'} textSize="md" textStyle="font-semibold">
          <div
            className="relative"
            onClick={() => setClickDatePicker((prev) => !prev)}
          >
            <TextInput
              placeholder="날짜 입력"
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              width="lg"
            />
            {clickDatePicker && (
              <div className="absolute left-[32px] top-[52px]">
                <DatePicker
                  selected={undefined}
                  onChange={(date) => {
                    const dateTime =
                      date && DateTime.fromJSDate(new Date(date));
                    const formattedDate = dateTime?.toFormat('yyyy-MM-dd');
                    setDate(formattedDate);
                    setClickDatePicker(false);
                  }}
                  dateFormat="yyyy-MM-dd"
                  open={clickDatePicker} // 드롭다운 상태
                />
              </div>
            )}
          </div>
        </Label> */}
        <Label label={'거리'} textSize="md" textStyle="font-semibold">
          <div className="flex items-center space-x-2">
            <TextInput
              placeholder="거리 입력"
              value={distance}
              onChange={setDistance}
              width="lg"
            />
            <div>km</div>
          </div>
        </Label>
        <Label label={'시간'} textSize="md" textStyle="font-semibold">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <TextInput
                placeholder="시"
                value={timeHour}
                onChange={setTimeHour}
                width="lg"
              />
              <div>시</div>
            </div>
            <div className="flex items-center space-x-2">
              <TextInput
                placeholder="분"
                value={timeMinute}
                onChange={setTimeMinute}
                width="lg"
              />
              <div>분</div>
            </div>
            <div className="flex items-center space-x-2">
              <TextInput
                placeholder="초"
                value={timeSecond}
                onChange={setTimeSecond}
                width="lg"
              />
              <div>초</div>
            </div>
          </div>
        </Label>
        <Label label={'페이스'} textSize="md" textStyle="font-semibold">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <TextInput
                placeholder="분"
                value={paceMinute}
                onChange={setPaceMinute}
                width="lg"
              />
              <div>분</div>
            </div>
            <div className="flex items-center space-x-2">
              <TextInput
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
        <Button onClick={handleSubmitRecord}>추가하기</Button>
      </div>
    </SimpleModal>
  );
};
