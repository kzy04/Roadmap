import React from 'react';
import { Check, Lock, BookOpen } from 'lucide-react';
import { Course } from '../../data/courseData';
import { useAuth } from '../../contexts/AuthContext';

interface CourseNodeProps {
  course: Course;
  isAvailable: boolean;
  onComplete: () => void;
}

const CourseNode = ({ course, isAvailable, onComplete }: CourseNodeProps) => {
  const { user } = useAuth();
  const isCompleted = user?.completedCourses.includes(course.id);

  return (
    <div 
      className={`
        relative p-4 rounded-lg shadow-md transition-all duration-300
        ${isCompleted ? 'bg-green-50 border-2 border-green-500' : 
          isAvailable ? 'bg-white hover:shadow-lg cursor-pointer' : 
          'bg-gray-100 opacity-75'}
      `}
      onClick={() => isAvailable && !isCompleted && onComplete()}
    >
      <div className="absolute -top-2 -right-2">
        {isCompleted ? (
          <span className="p-1 bg-green-500 rounded-full text-white">
            <Check size={16} />
          </span>
        ) : !isAvailable ? (
          <span className="p-1 bg-gray-500 rounded-full text-white">
            <Lock size={16} />
          </span>
        ) : (
          <span className="p-1 bg-blue-500 rounded-full text-white">
            <BookOpen size={16} />
          </span>
        )}
      </div>
      <h3 className="font-semibold text-lg mb-1">{course.code}</h3>
      <p className="text-sm text-gray-600 mb-2">{course.name}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Credits: {course.credits}</span>
        <span>+{course.learningPoints} pts</span>
      </div>
    </div>
  );
};

export default CourseNode;