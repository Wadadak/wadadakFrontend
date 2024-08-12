import React from 'react';

interface Crew {
  name: string;
  occupancy: number;
  capacity: number;
  imageURL: string;
}

interface CrewCardProps {
  crew: Crew;
}

const CrewCard: React.FC<CrewCardProps> = ({ crew }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={crew.imageURL} alt={crew.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{crew.name}</h2>
        <p>
          {crew.occupancy} / {crew.capacity}
        </p>
        <div className="card-actions justify-start">
          <button className="btn btn-primary">정기 러닝 정보</button>
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
