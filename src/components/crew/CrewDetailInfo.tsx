import React from 'react';
import { Crew } from '@/types/crewTypes';
import Wrapper from '../layout/Wrapper';

interface CrewDetailInfoProps {
  crew: Crew;
}

const CrewDetailInfo = ({ crew }: CrewDetailInfoProps) => {
  const defaultImage = '/images/default.png';

  return (
    <Wrapper>
      <div className="card card-side bg-base-100 shadow-sm">
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
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CrewDetailInfo;
