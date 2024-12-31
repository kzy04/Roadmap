import React from 'react';

interface UniversityInfoProps {
  name: string;
  shortName: string;
  location: string;
}

const UniversityInfo: React.FC<UniversityInfoProps> = ({ name, shortName, location }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
      <p className="mt-2 text-sm text-gray-600">{shortName}</p>
      <p className="mt-2 text-sm text-gray-600">{location}</p>
    </div>
  );
};

export default UniversityInfo;
