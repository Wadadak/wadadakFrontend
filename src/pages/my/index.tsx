import Wrapper from '@/components/Wrapper';

const MyPage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <Wrapper>
        <div className="flex flex-col w-full bg-rose-200">
          <div>닉네임 프로필수정</div>
          <div className="w-full text-[128px] font-extrabold text-center">
            2453.3
          </div>
          <div>총 러닝횟수 총 달리기 거리 총 페이스</div>
        </div>
      </Wrapper>
      <div className="w-full h-2 bg-gray-200"></div>
      <Wrapper>
        <div className="flex justify-center"> 내 러닝 내 크루 내 활동</div>
        <div className="flex flex-col w-full bg-green-200">
          <div>프로필 공개여부</div>
          <div className="flex justify-center grid-cols-3 gap-[100px]">
            <MyGoalItem title={'주간목표'} />
            <MyGoalItem title={'월간목표'} />
            <MyGoalItem title={'연간목표'} />
          </div>
        </div>
        <div className="flex flex-col">
          <div>menu menu menu</div>
          <div className="flex flex-col space-y-4">
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
            <RunningRecordItem />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
export default MyPage;

export async function getStaticProps() {
  return {
    props: {
      commonTitle: '‍🏃️내 정보', // @서율님 제목 부분 여기 확인 부탁드립니다!
    },
  };
}

interface MyGoalItemProps {
  title: string;
}
const MyGoalItem = ({ title }: MyGoalItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-[170px] h-[170px] bg-gray-200 rounded-full"></div>
        <div className="h-6 bg-gray-200 w-[200px] rounded-[12px]"></div>
        <div className="h-6 bg-gray-200 w-[200px] rounded-[12px]"></div>
      </div>
      <div className="text-[16px] font-semibold text-center mt-6">{title}</div>
    </div>
  );
};

const RunningRecordItem = () => {
  return (
    <div className="flex items-center px-5 py-4 border border-gray-200 divide-x divide-gray-300 rounded-lg">
      <div className="w-[100px] text-center">#128</div>
      <div className="px-8">2024-04-22</div>
      <div className="px-8">12.2km</div>
      <div className="px-8">01:22:24</div>
      <div className="px-8">4’55’’</div>
    </div>
  );
};
