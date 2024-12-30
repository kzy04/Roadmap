import { Course } from "@/utils/roadmap-utils";
import React from "react";


type AddCourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (course: Course) => void;
  availableCourses: Course[];
};

export function AddCourseModal({
  isOpen,
  onClose,
  onAddCourse,
  availableCourses,
}: AddCourseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full h-auto max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Add Course</h2>
        <ul className="space-y-2">
          {availableCourses.map((course) => (
            <li
              key={course.course_id}
              className="p-4 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onAddCourse(course); // Call onAddCourse
                onClose();
              }}
            >
              <h3 className="font-medium">{course.course_name}</h3>
              <p className="text-sm text-gray-500">Credits: {course.credits}</p>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
