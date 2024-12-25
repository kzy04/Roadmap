import React from 'react';
import { Trophy } from 'lucide-react';

interface ProgressBarProps {
  level: number;
  currentPoints: number;
  nextLevelPoints: number;
}

const ProgressBar = ({ level, currentPoints, nextLevelPoints }: ProgressBarProps) => {
  const progress = (currentPoints / nextLevelPoints) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-500" size={24} />
          <span className="font-semibold">Level {level}</span>
        </div>
        <span className="text-sm text-gray-600">
          {currentPoints} / {nextLevelPoints} points
        </span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;