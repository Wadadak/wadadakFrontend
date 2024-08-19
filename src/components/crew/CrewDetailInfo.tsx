import React from 'react';
import { Crew } from '@/types/crewTypes';
import Wrapper from '../layout/Wrapper';

interface CrewDetailInfoProps {
  crew: Crew;
}

const CrewDetailInfo = ({ crew }: CrewDetailInfoProps) => {
  const defaultImage = '/images/default.png';

  if (!crew) {
    return <div>크루 정보를 불러오고 있습니다.</div>;
  }
  return (
    <Wrapper>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      {/* <div className="card card-side bg-base-100 shadow-sm">
        <figure>
          <img src={crew.crewImage || defaultImage} alt={crew.crewName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {crew.crewName}
            <div className="badge badge-secondary">{crew.activityRegion}</div>
          </h2>
          <div>
            <p>
              정원 : {crew.crewOccupancy} / {crew.crewCapacity}
            </p>
            {crew.minAge === null && crew.maxAge === null && (
              <p>
                연령대 : {crew.crewOccupancy} / {crew.crewCapacity}
              </p>
            )}
            {crew.genderRestriction && (
              <p>성별 제한 : {crew.genderRestriction}</p>
            )}
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">가입 신청</button>
          </div>
        </div>
      </div> */}
    </Wrapper>
  );
};

export default CrewDetailInfo;
