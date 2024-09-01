'use client';

import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import NumberInput from '@/components/common/NumberInput';
import SimpleModal from '@/components/common/SimpleModal';
import TextInput from '@/components/common/TextInput';
import { ToggleButton } from '@/components/common/ToggleButtion';
import { TitleBanner } from '@/components/layout/TitleBanner';
import Wrapper from '@/components/layout/Wrapper';
import { useUserInfo } from '@/hooks/user/useUserInfo';
import { mockMyInfo } from '@/mocks/mockData/mockMyInfo';
import {
  mockMyRunningInfo,
  mockRunningList,
} from '@/mocks/mockData/mockRunList';
import {
  faPen,
  faPenToSquare,
  faRankingStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyPage = () => {
  const { data, isLoading, error } = useUserInfo(1); //hctodo 임시데이터
  const router = useRouter();
  const [tabSelect, setTabSelect] = useState(false);
  const [isRunningProfileOn, setIsRunningProfileOn] = useState<boolean>(false);
  const [isRunningRecordProfileOn, setIsRunningRecordProfileOn] =
    useState<boolean>(false);

  const [recordTab, setRecordTab] = useState('round'); // round, week, month, year
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [showWeeklyGoal, setShowWeeklyGoal] = useState(false);

  const [distance, setDistance] = useState<string | undefined>('');
  const [time, setTime] = useState<string | undefined>('');
  const [pace, setPace] = useState<string | undefined>('');

  const [editRunningId, setEditRunningId] = useState<number | undefined>();

  useEffect(() => {
    setShowEditModal(true);
  }, [editRunningId]);

  return (
    <div className="flex flex-col items-center w-full">
      <TitleBanner>🏃🏻내 정보</TitleBanner>
      {/* 총 거리 */}
      <Wrapper>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-end space-x-6">
            <div className="flex items-center space-x-3">
              <Avatar size="w-8" src={data?.profileImage} />
              <div className="font-bold">{data?.nickname}</div>
            </div>
            <Button
              onClick={() => {
                router.push('/my/edit');
              }}
            >
              프로필 수정
            </Button>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col items-center space-y-1">
              <div className="text-[128px] font-extrabold">
                {mockMyRunningInfo.totalDistance} km
              </div>
              <div className="font-bold">총 거리</div>
            </div>
            <div className="flex justify-center mt-8 space-x-16">
              <MyRecordItem
                record={String(mockMyRunningInfo.totalRunningCount)}
                name={'총 러닝 횟수'}
              />
              <MyRecordItem
                record={mockMyRunningInfo.averagePace}
                name={'평균 페이스'}
              />
              <MyRecordItem
                record={mockMyRunningInfo.averageRunningTime}
                name={'평균 기록'}
              />
            </div>
            <button
              className="text-[14px] text-gray-400 underline underline-offset-4"
              onClick={() => {
                setShowAddRecord(true);
              }}
            >
              기록 추가하기
            </button>
          </div>
        </div>
      </Wrapper>
      <div className="w-full h-2 bg-gray-200"></div>
      {/* 주,월,연 목표 */}
      <Wrapper>
        <div className="flex flex-col space-y-16">
          <div className="flex flex-col space-y-7">
            <div className="flex justify-center">
              <div
                role="tablist"
                className="space-x-8 font-bold tabs tabs-bordered w-60"
              >
                <a
                  role="tab"
                  className="text-gray-500 tab"
                  style={{ whiteSpace: 'nowrap' }}
                  onClick={() => {
                    setTabSelect(true);
                  }}
                >
                  내 러닝
                </a>
                <a
                  role="tab"
                  className="text-gray-500 tab tab-active"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  내 크루
                </a>
                <a
                  role="tab"
                  className="text-gray-500 tab"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  내 활동
                </a>
              </div>
            </div>

            <div className="flex flex-col w-full space-y-12">
              <div className="flex justify-end space-x-3">
                <div className="font-bold">프로필 공개</div>
                <ToggleButton
                  onButtonClick={() =>
                    setIsRunningProfileOn(!isRunningProfileOn)
                  }
                  isOn={isRunningProfileOn}
                />
              </div>

              <div className="flex justify-center grid-cols-3 gap-[100px]">
                <MyGoalItem
                  title={'주간 목표'}
                  progress={50}
                  onItemClick={() => {
                    setShowWeeklyGoal(true);
                  }}
                />
                <MyGoalItem
                  title={'월간 목표'}
                  progress={40}
                  onItemClick={() => {}}
                />
                <MyGoalItem
                  title={'연간 목표'}
                  progress={80}
                  onItemClick={() => {}}
                />
              </div>
            </div>
          </div>
          {/* 기록 코드 리스트 */}
          <div className="flex flex-col space-y-7">
            <div className="flex items-center justify-between">
              <div className="flex justify-center flex-grow space-x-5">
                <Button
                  color={recordTab === 'round' ? 'accent' : undefined}
                  onClick={() => {
                    setRecordTab('round');
                  }}
                >
                  회차별
                </Button>
                <Button
                  color={recordTab === 'week' ? 'accent' : undefined}
                  onClick={() => {
                    setRecordTab('week');
                  }}
                >
                  주별
                </Button>
                <Button
                  color={recordTab === 'month' ? 'accent' : undefined}
                  onClick={() => {
                    setRecordTab('month');
                  }}
                >
                  월별
                </Button>
                <Button
                  color={recordTab === 'year' ? 'accent' : undefined}
                  onClick={() => {
                    setRecordTab('year');
                  }}
                >
                  연간
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="font-bold">프로필 공개</div>
                <ToggleButton
                  onButtonClick={() =>
                    setIsRunningRecordProfileOn(!isRunningRecordProfileOn)
                  }
                  isOn={isRunningRecordProfileOn}
                />
              </div>
            </div>
            <div className="w-full h-1 bg-gray-100"></div>
            {recordTab === 'round' && (
              <div className="flex flex-col space-y-4">
                {mockRunningList.data.map((item, index) => (
                  <RunningRecordItem
                    key={index}
                    round={item.runRecordId}
                    date={item.runningDate}
                    distance={item.distance}
                    totalTime={item.runningTime}
                    pace={item.pace}
                    onButtonClick={() => {
                      setEditRunningId(item.runRecordId);
                    }}
                  />
                ))}
              </div>
            )}
            {recordTab === 'week' && (
              <div className="flex flex-col space-y-4">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                  <RunningRecordItem
                    key={index}
                    date={'2024-05-1주차'}
                    distance={11.83}
                    totalTime={'01:12:25'}
                    pace={"5'55''"}
                  />
                ))}
              </div>
            )}
            {recordTab === 'month' && (
              <div className="flex flex-col space-y-4">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                  <RunningRecordItem
                    key={index}
                    date={'2024-05월'}
                    distance={11.83}
                    totalTime={'01:12:25'}
                    pace={"5'55''"}
                  />
                ))}
              </div>
            )}
            {recordTab === 'year' && (
              <div className="flex flex-col space-y-4">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                  <RunningRecordItem
                    key={index}
                    date={'2024년'}
                    distance={11.83}
                    totalTime={'01:12:25'}
                    pace={"5'55''"}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-center">
              <Button
                wide
                onClick={() => {
                  setShowAddRecord(true);
                }}
              >
                <FontAwesomeIcon icon={faPen} />
                <span>기록 추가</span>
              </Button>
            </div>
          </div>
        </div>
      </Wrapper>
      <EditRecordModal
        id={editRunningId}
        isOpen={showEditModal}
        onClose={() => {
          //수정을 완료하고 모달을 닫을때,
          // refetch();
          setShowEditModal(false);
        }}
      />
      <AddRecordModal
        isOpen={showAddRecord}
        onClose={() => setShowAddRecord(false)}
      />
      <SimpleModal
        isOpen={showWeeklyGoal}
        onClose={() => {
          setShowWeeklyGoal(false);
        }}
        title={'주간 목표'}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-5">
            <div>2024.08.05 ~ 07일</div>
            <div className="flex flex-col space-y-2">
              <div className="font-bold">거리</div>
              <TextInput
                value={distance}
                onChange={(value) => {
                  setDistance(value);
                }}
                placeholder="목표 거리 입력"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="font-bold">시간</div>
              <TextInput
                value={time}
                onChange={(value) => {
                  setTime(value);
                }}
                placeholder="목표 시간 입력"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="font-bold">페이스</div>
              <TextInput
                value={pace}
                onChange={(value) => {
                  setPace(value);
                }}
                placeholder="목표 페이스 입력"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>설정 하기</Button>
          </div>
        </div>
      </SimpleModal>
    </div>
  );
};
export default MyPage;

interface MyGoalItemProps {
  title: string;
  progress: number;
  onItemClick: () => void;
}

const MyGoalItem = ({ title, onItemClick, progress }: MyGoalItemProps) => {
  const style: React.CSSProperties = {
    '--value': progress,
    '--size': '8rem',
    '--thickness': '1rem',
  } as React.CSSProperties;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center space-y-3">
        <div className="radial-progress" style={style} role="progressbar">
          {progress}%
        </div>
        <div className="h-6 bg-gray-200 w-[200px] rounded-[12px]"></div>
        <div className="h-6 bg-gray-200 w-[200px] rounded-[12px]"></div>
      </div>
      <div
        className="flex items-center justify-center mt-6 space-x-2 cursor-pointer"
        onClick={onItemClick}
      >
        <div className="text-[16px] font-semibold">{title}</div>
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
    </div>
  );
};

interface MyRecordItemProps {
  record: string;
  name: string;
  iconStyle?: string;
  recordStyle?: string;
  nameStyle?: string;
}

export const MyRecordItem = ({
  record,
  name,
  iconStyle,
  recordStyle,
  nameStyle,
}: MyRecordItemProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <FontAwesomeIcon
        icon={faRankingStar}
        className={`w-8 h-8 ${iconStyle}`}
      />
      <div className={`text-4xl font-extrabold ${recordStyle}`}>{record}</div>
      <div className={`font-bold text-gray-500 ${nameStyle}`}>{name}</div>
    </div>
  );
};

interface RunningRecordItemProps {
  round?: number;
  date: string;
  distance: number;
  totalTime: string;
  pace: string;
  onButtonClick?: () => void;
}
const RunningRecordItem = ({
  round,
  date,
  distance,
  totalTime,
  pace,
  onButtonClick,
}: RunningRecordItemProps) => {
  return (
    <div className="flex items-center px-5 py-4 border border-gray-200 rounded-lg">
      <div className="flex space-x-5 text-[20px] font-bold divide-x divide-gray-300 grow">
        {round && <div className="w-[100px] text-center">#{round}</div>}
        <div className="px-8">{date}</div>
        <div className="px-8">{distance}km</div>
        <div className="px-8">{totalTime}</div>
        <div className="px-8">{pace}</div>
      </div>
      {onButtonClick && <Button onClick={onButtonClick}>수정하기</Button>}
    </div>
  );
};

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddRecordModal = ({ isOpen, onClose }: AddRecordModalProps) => {
  const [date, setDate] = useState<string | undefined>('');
  const [distance, setDistance] = useState<string | undefined>('');
  const [record, setRecord] = useState<string | undefined>('');
  const [pace, setPace] = useState<string | undefined>('');

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title={'기록 추가'}>
      <div className="flex flex-col space-y-7">
        <div className="flex flex-col mt-3 space-y-3">
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">날짜</div>
            <TextInput
              placeholder="날짜 입력"
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">거리</div>
            <TextInput
              placeholder="거리 입력"
              value={distance}
              onChange={(value) => {
                setDistance(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">시간</div>
            <TextInput
              placeholder="시간 입력"
              value={record}
              onChange={(value) => {
                setRecord(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">페이스</div>
            <TextInput
              placeholder="페이스 입력"
              value={pace}
              onChange={(value) => {
                setPace(value);
              }}
              width="xl"
            />
          </div>
        </div>
        <Button
          onClick={() => {
            const query = {
              date,
              distance,
              record,
              pace,
            };

            console.log('query', query);

            onClose();
          }}
        >
          추가하기
        </Button>
      </div>
    </SimpleModal>
  );
};

interface EditRecordModalProps {
  id?: number;
  isOpen: boolean;
  onClose: () => void;
}
const EditRecordModal = ({ id, isOpen, onClose }: EditRecordModalProps) => {
  if (id === undefined) return <></>;

  //id=2인 api를 호출해서 나온 값으로 여기를 채워줘야해
  const data = mockRunningList.data[id - 1]; // 2024-08-02

  const [date, setDate] = useState<string | undefined>(data.runningDate);
  const [distance, setDistance] = useState<string | undefined>(
    String(data.distance),
  );
  const [record, setRecord] = useState<string | undefined>(data.runningTime);
  const [pace, setPace] = useState<string | undefined>(data.pace);

  useEffect(() => {
    setDate(data.runningDate);
    setDistance(String(data.distance));
    setRecord(data.runningTime);
    setPace(data.pace);
  }, [id]);

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title={'기록 수정'}>
      <div className="flex flex-col space-y-7">
        <div className="flex flex-col mt-3 space-y-3">
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">날짜</div>
            <TextInput
              placeholder="날짜 입력"
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">거리</div>
            <TextInput
              placeholder="거리 입력"
              value={distance}
              onChange={(value) => {
                setDistance(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">시간</div>
            <TextInput
              placeholder="시간 입력"
              value={record}
              onChange={(value) => {
                setRecord(value);
              }}
              width="xl"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-semibold">페이스</div>
            <TextInput
              placeholder="페이스 입력"
              value={pace}
              onChange={(value) => {
                setPace(value);
              }}
              width="xl"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <Button
            color="base-500"
            onClick={() => {
              alert(`#${data.runRecordId}을 삭제합니다.`);
              //삭제 api를 호출
              // 성공하면 모달 닫기.
              onClose();
            }}
          >
            삭제하기
          </Button>
          <Button
            onClick={() => {
              const query = {
                date,
                distance,
                record,
                pace,
              };

              console.log('query', query);

              //query를 기록 수정하는 api에 보냄
              //isSuccess == true이면

              alert('수정되었습니다!');

              onClose();
            }}
          >
            수정하기
          </Button>
        </div>
      </div>
    </SimpleModal>
  );
};
