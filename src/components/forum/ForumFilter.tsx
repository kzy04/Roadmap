import React from 'react';
import { University, universities } from '../../data/universities';

interface ForumFilterProps {
  selectedUniversity: University;
  onUniversityChange: (university: University) => void;
}

const ForumFilter = ({
  selectedUniversity,
  onUniversityChange,
}: {
  selectedUniversity: University;
  onUniversityChange: (university: University) => void;
}) => {
  const universities: University[] = [
    "All Universities",
    "North South University",
    "BRAC University",
    "Independent University Bangladesh",
  ];

  return (
    <div className="mb-6">
      <label htmlFor="university-filter" className="block text-lg font-medium text-gray-900 mb-2">
        Filter by University
      </label>
      <select
        id="university-filter"
        value={selectedUniversity}
        onChange={(e) => onUniversityChange(e.target.value as University)}
        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
      >
        {universities.map((university) => (
          <option key={university} value={university}>
            {university}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ForumFilter;