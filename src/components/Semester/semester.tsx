import React, { useState } from "react";
import { AddCourseModal } from "../course/CourseModal";
import { Course } from "@/utils/roadmap-utils";

interface SemesterProps {
  semesterIndex: number;
  courses: Course[];
  availableCourses: Course[];
  highlightedCourses: {
    prerequisites: Set<string>;
    dependents: Set<string>;
  };
  onCourseClick: (courseId: string) => void;
  onAddCourse: (course: Course) => void;
  onRemoveCourse: (course: Course) => void;
}

export function Semester({
  semesterIndex,
  courses,
  availableCourses,
  highlightedCourses,
  onCourseClick,
  onAddCourse,
  onRemoveCourse,
}: SemesterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const difficultyStyles = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Semester {semesterIndex + 1}</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        {courses.map((course) => {
          const isPrerequisite = highlightedCourses.prerequisites.has(course.course_id);
          const isDependent = highlightedCourses.dependents.has(course.course_id);

          return (
            <div
            key={course.course_id}
            className={`p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center ${
              isPrerequisite
                ? "border-blue-500"
                : isDependent
                ? "border-green-500"
                : "border-gray-300"
            }`}
            onClick={() => onCourseClick(course.course_id)} // Triggers highlight
          >
            <div>
              <h4 className="font-medium">{course.course_name}</h4>
              <p className="text-sm text-gray-500">Credits: {course.credits}</p>
              <span
                className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                  difficultyStyles[course.difficulty || "Beginner"]
                }`}
              >
                {course.difficulty}
              </span>
            </div>
            <button
              className="text-red-500 hover:underline text-sm"
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the card click
                onRemoveCourse(course); // Call onRemoveCourse
              }}
            >
              Remove
            </button>
          </div>
          );
        })}
      </div>
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Add Course
      </button>
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCourse={onAddCourse} // Pass the onAddCourse function
        availableCourses={availableCourses}
      />
    </div>
  );
}
