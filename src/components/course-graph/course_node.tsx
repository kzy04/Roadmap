import React from "react";

type Course = {
  course_id: string;
  course_name: string;
  credits: number;
  semester: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

interface CourseNodeProps {
  course: Course;
  isHighlighted?: boolean;
  onClick?: () => void;
}

const difficultyStyles = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
};

export function CourseNode({ course, isHighlighted, onClick }: CourseNodeProps) {
  return (
    <div
      className={`relative p-4 border rounded-lg shadow-md cursor-pointer transition-all duration-200 ${
        isHighlighted
          ? "border-black scale-105"
          : "border-gray-300 bg-white hover:scale-105"
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-sm">{course.course_id}</h4>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            difficultyStyles[course.difficulty]
          }`}
        >
          {course.difficulty.toLowerCase()}
        </span>
      </div>
      <p className="text-xs text-gray-600">{course.course_name}</p>
      <p className="text-xs text-gray-400 mt-2">Semester {course.semester}</p>
      <p className="text-xs text-gray-400">{course.credits} credits</p>
    </div>
  );
}
