"use client";

import { useEffect, useRef, useState } from "react";
import { CourseNode } from "./course-node";
import { supabase } from "@/lib/supabase"; // Import the Supabase client

export function CourseGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [lines, setLines] = useState<Array<{ start: string; end: string }>>([]);

  // Fetch the course data and prerequisites from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      // Query to get all the courses and prerequisites from Supabase
      const { data: coursesData, error } = await supabase
        .from('courses') // Replace 'courses' with your actual table name
        .select('id, course_name, credits, prerequisites') // Adjust the fields as necessary

      if (error) {
        console.error("Error fetching courses:", error);
        return;
      }

      // Process the data to map prerequisites as array of course ids
      const coursesWithPrereqs = coursesData?.map(course => ({
        ...course,
        prerequisites: course.prerequisites ? course.prerequisites.split(",") : [] // Assuming comma-separated values for prerequisites
      }));

      setCourses(coursesWithPrereqs || []);
    };

    fetchCourses();
  }, []);

  // Create lines for prerequisites relationships
  useEffect(() => {
    const drawLines = () => {
      const newLines: Array<{ start: string; end: string }> = [];
      courses.forEach(course => {
        course.prerequisites.forEach(prereqId => {
          newLines.push({ start: prereqId, end: course.id });
        });
      });
      setLines(newLines);
    };

    drawLines();
  }, [courses]);

  return (
    <div className="relative w-full overflow-x-auto p-8" ref={containerRef}>
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ minWidth: "100%", height: "100%" }}
      >
        {lines.map((line, index) => {
          const startEl = document.getElementById(line.start);
          const endEl = document.getElementById(line.end);

          if (startEl && endEl) {
            const startRect = startEl.getBoundingClientRect();
            const endRect = endEl.getBoundingClientRect();
            const containerRect = containerRef.current?.getBoundingClientRect();

            if (containerRect) {
              const startX = startRect.left - containerRect.left + startRect.width / 2;
              const startY = startRect.top - containerRect.top + startRect.height;
              const endX = endRect.left - containerRect.left + endRect.width / 2;
              const endY = endRect.top - containerRect.top;

              const midY = startY + (endY - startY) * 0.5;

              return (
                <g key={index}>
                  <path
                    d={`M ${startX} ${startY} 
                        C ${startX} ${midY},
                          ${endX} ${midY},
                          ${endX} ${endY}`}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-muted-foreground/30"
                  />
                  <circle
                    cx={endX}
                    cy={endY}
                    r="3"
                    fill="currentColor"
                    className="text-muted-foreground/50"
                  />
                </g>
              );
            }
          }
          return null;
        })}
      </svg>

      <div className="flex flex-col gap-16">
        {/* Loop through semesters, but now you will create the map based on prerequisites */}
        {courses.map(course => (
          <div key={course.id} className="relative">
            <div className="flex gap-8 flex-wrap">
              <div key={course.id} id={course.id}>
                <CourseNode 
                  course={course} 
                  type={course.prerequisites.length === 0 ? "primary" : 
                        course.prerequisites.length > 1 ? "secondary" : "default"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
