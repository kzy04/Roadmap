import React from 'react';
import { University, universities } from '../../data/universities';

interface ForumFilterProps {
  selectedUniversity: University;
  onUniversityChange: (university: University) => void;
}

const ForumFilter = ({ selectedUniversity, onUniversityChange }: ForumFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Filter by University:</span>
        <select
          value={selectedUniversity}
          onChange={(e) => onUniversityChange(e.target.value as University)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {universities.map((uni) => (
            <option key={uni} value={uni}>
              {uni}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ForumFilter;