"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Import Supabase client
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Brain, Code, GraduationCap, Calculator } from "lucide-react";

// Ensure to import your types correctly
import { CourseType, Difficulty } from "@/lib/course-data";

// Define Course interface
interface Course {
  id: string;
  code: string;
  name: string;
  type: CourseType;
  difficulty: Difficulty;
  credits: number;
  prerequisites: string[];
}

// Define Props for CourseNode
interface CourseNodeProps {
  course: Course;
  onClick?: () => void;
  className?: string;
}

// Define configurations for course types and difficulty levels
const courseTypeConfig: Record<CourseType, { color: string; icon: React.ComponentType; label: string }> = {
  programming: { 
    color: "border-blue-400 bg-blue-50 dark:bg-blue-950/50", 
    icon: Code,
    label: "Programming"
  },
  mathematics: { 
    color: "border-green-400 bg-green-50 dark:bg-green-950/50", 
    icon: Calculator,
    label: "Mathematics"
  },
  ai: { 
    color: "border-purple-400 bg-purple-50 dark:bg-purple-950/50", 
    icon: Brain,
    label: "AI/ML"
  },
  core: { 
    color: "border-orange-400 bg-orange-50 dark:bg-orange-950/50", 
    icon: GraduationCap,
    label: "Core"
  }
};

const difficultyConfig: Record<Difficulty, { color: string; label: string }> = {
  beginner: { color: "bg-emerald-100 text-emerald-700", label: "Beginner" },
  intermediate: { color: "bg-yellow-100 text-yellow-700", label: "Intermediate" },
  advanced: { color: "bg-red-100 text-red-700", label: "Advanced" }
};

export function CourseNode({ course, onClick, className }: CourseNodeProps) {
  const typeConfig = courseTypeConfig[course.type];
  const diffConfig = difficultyConfig[course.difficulty];
  const Icon = typeConfig.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className={`w-[220px] cursor-pointer transition-all duration-200 hover:scale-105 ${typeConfig.color} border-2 ${className}`}
            onClick={onClick}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4" />
                <div className="font-medium">{course.code}</div>
              </div>
              <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {course.name}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`px-2 py-0.5 rounded-full ${diffConfig.color}`}>
                  {diffConfig.label}
                </span>
                <span className="bg-muted px-2 py-0.5 rounded-full">
                  {course.credits} cr
                </span>
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm space-y-2">
            <div className="font-medium">{course.name}</div>
            <div className="text-xs flex items-center gap-1">
              <Icon className="h-3 w-3" />
              {typeConfig.label}
            </div>
            {course.prerequisites.length > 0 && (
              <div className="text-xs text-muted-foreground">
                Prerequisites: {course.prerequisites.join(", ")}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function CourseGraph() {
  const [courses, setCourses] = useState<Course[]>([]);

  // Fetch courses from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from("courses") // Replace with your actual table name
        .select("id, code, name, type, difficulty, credits, prerequisites");

      if (error) {
        console.error("Error fetching courses:", error);
        return;
      }

      // Map fetched data to Course interface
      const coursesData: Course[] = data?.map(course => ({
        id: course.id,
        code: course.code,
        name: course.name,
        type: course.type as CourseType,
        difficulty: course.difficulty as Difficulty,
        credits: course.credits,
        prerequisites: course.prerequisites ? course.prerequisites.split(",").map((prereq: string) => prereq.trim()) : [],
      })) || [];

      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      {courses.map(course => (
        <div key={course.id} className="relative">
          <CourseNode course={course} />
        </div>
      ))}
    </div>
  );
}
