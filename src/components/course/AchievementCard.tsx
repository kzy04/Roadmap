import React from 'react';
import { Achievement } from '../../data/courseData';
import { Trophy, Code } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
}

const AchievementCard = ({ achievement, isUnlocked }: AchievementCardProps) => {
  const Icon = achievement.icon === 'trophy' ? Trophy : Code;

  return (
    <div className={`
      p-4 rounded-lg shadow-md transition-all duration-300
      ${isUnlocked ? 'bg-gradient-to-r from-yellow-50 to-yellow-100' : 'bg-gray-50'}
    `}>
      <div className="flex items-center gap-3 mb-2">
        <span className={`
          p-2 rounded-full
          ${isUnlocked ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-400'}
        `}>
          <Icon size={20} />
        </span>
        <h3 className="font-semibold">{achievement.name}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
      <div className="text-sm font-medium text-right">
        +{achievement.points} points
      </div>
    </div>
  );
};

export default AchievementCard;