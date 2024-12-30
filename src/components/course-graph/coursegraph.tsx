"use client";

import React, { useEffect, useState } from "react";
import {
  Course,
  distributeCourses,
  buildCourseGraph,
  getHighlightedCourses,
} from "@/utils/roadmap-utils";
import { CreditCounter } from "../course/CreditCounter";
import { Semester } from "../Semester/semester";

export function CourseGraph() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [semesters, setSemesters] = useState<Course[][]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [highlightedCourses, setHighlightedCourses] = useState<{
    prerequisites: Set<string>;
    dependents: Set<string>;
  }>({
    prerequisites: new Set(),
    dependents: new Set(),
  });
  const [courseGraph, setCourseGraph] = useState<{
    [key: string]: { prerequisites: string[]; dependents: string[] };
  }>({});

  const [numSemesters, setNumSemesters] = useState<number>(8); // Default 8 semesters

  // Fetch courses and initialize data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");

        const data = await response.json();
        console.log("Fetched courses:", data);

        if (Array.isArray(data)) {
          setCourses(data);
          setAvailableCourses(data);

          // Distribute courses into semesters
          const initialSemesters = distributeCourses(data, numSemesters, 4);
          setSemesters(initialSemesters);

          // Build course graph for prerequisites and dependents
          const graph = buildCourseGraph(data);
          setCourseGraph(graph);
        } else {
          console.error("API response is not an array:", data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  // Highlight prerequisites and dependents for a course
  const handleCourseClick = (courseId: string) => {
    if (!courseGraph[courseId]) {
      console.warn("Course not found in graph:", courseId);
      return;
    }

    const highlighted = getHighlightedCourses(courseId, courses);
    console.log("Highlighted Courses:", highlighted);
    setHighlightedCourses({
      prerequisites: highlighted?.prerequisites || new Set(),
      dependents: highlighted?.dependents || new Set(),
    });
  };

  // Add a new semester dynamically
  const handleAddSemester = () => {
    setNumSemesters((prev) => prev + 1);
    setSemesters((prev) => [...prev, []]); // Add an empty semester
  };

  // Add a course to a specific semester
  const handleAddCourse = (semesterIndex: number, course: Course) => {
    setSemesters((prevSemesters) => {
      const updatedSemesters = [...prevSemesters];
      updatedSemesters[semesterIndex] = [...updatedSemesters[semesterIndex], course];
      return updatedSemesters;
    });

    // Remove the added course from available courses
    setAvailableCourses((prevCourses) =>
      prevCourses.filter((c) => c.course_id !== course.course_id)
    );
  };

  // Remove a course from a semester
  const handleRemoveCourse = (semesterIndex: number, course: Course) => {
    setSemesters((prevSemesters) => {
      const updatedSemesters = [...prevSemesters];
      updatedSemesters[semesterIndex] = updatedSemesters[semesterIndex].filter(
        (c) => c.course_id !== course.course_id
      );
      return updatedSemesters;
    });

    // Add the removed course back to available courses
    setAvailableCourses((prevCourses) => [...prevCourses, course]);
  };

  return (
    <div className="container mx-auto p-8">
      {/* Credit Counter */}
      <CreditCounter semesters={semesters} />

      {/* Legend for Difficulty */}
      <div className="flex items-center gap-4 mb-6">
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-100 rounded-full"></span> Beginner
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-100 rounded-full"></span> Intermediate
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-100 rounded-full"></span> Advanced
        </span>
      </div>

      {/* Add Semester Button */}
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={handleAddSemester}
        >
          Add Semester
        </button>
      </div>

      {/* Semesters in a tabular layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {semesters.map((semesterCourses, semesterIndex) => (
          <Semester
            key={semesterIndex} // Unique key
            semesterIndex={semesterIndex}
            courses={semesterCourses}
            availableCourses={availableCourses}
            highlightedCourses={highlightedCourses}
            onCourseClick={handleCourseClick}
            onAddCourse={(course: Course) => handleAddCourse(semesterIndex, course)}
            onRemoveCourse={(course: Course) => handleRemoveCourse(semesterIndex, course)}
          />
        ))}
      </div>
    </div>
  );
}
