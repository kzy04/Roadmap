"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Import Supabase client
import { CourseNode } from "@/components/course-graph/course_node";



interface Major {
  id: string;
  name: string;
  university_id: string;
}

interface UniversityPageProps {
  universityId: string;
}

export function UniversityPage({ universityId }: UniversityPageProps) {
  const [university, setUniversity] = useState<any>(null);
  const [majors, setMajors] = useState<Major[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  // Fetch university and courses data
  useEffect(() => {
    const fetchData = async () => {
      const { data: universityData, error: universityError } = await supabase
        .from("universities")
        .select("id, name")
        .eq("id", universityId)
        .single();

      if (universityError) {
        console.error("Error fetching university:", universityError);
        return;
      }
      setUniversity(universityData);

      // Fetch majors related to this university
      const { data: majorData, error: majorError } = await supabase
        .from("majors")
        .select("id, name, university_id")
        .eq("university_id", universityId);

      if (majorError) {
        console.error("Error fetching majors:", majorError);
        return;
      }
      setMajors(majorData);

      // Fetch courses related to this university
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("id, code, name, type, difficulty, credits, prerequisites");

      if (courseError) {
        console.error("Error fetching courses:", courseError);
        return;
      }

      setCourses(courseData || []);
    };

    fetchData();
  }, [universityId]);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-4">{university?.name || "Loading University..."}</h2>
      
      {majors.length === 0 ? (
        <p>No majors found for this university.</p>
      ) : (
        majors.map((major) => (
          <div key={major.id} className="my-8">
            <h3 className="text-2xl font-semibold">{major.name} - Roadmap</h3>
            <div className="flex gap-8 flex-wrap mt-4">
              {courses
                .filter((course) =>
                  course.prerequisites.some((prereq) => prereq.includes(major.name))
                )
                .map((course) => (
                  <CourseNode key={course.id} course={course} />
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
