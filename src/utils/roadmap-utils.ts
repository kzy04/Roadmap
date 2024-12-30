// /types/course.ts
export type Course = {
    course_id: string;
    course_name: string;
    credits: number;
    semester?: number; // Optional since courses might not always have a semester initially
    prerequisites?: string[] | null; // Optional, can be an array or null
    difficulty?: "Beginner" | "Intermediate" | "Advanced"; // Optional, if applicable
  };
  
  // Efficiently distribute courses into semesters
  export function distributeCourses(
    courses: Course[],
    semesterCount: number,
    coursesPerSemester: number
  ): Course[][] {
    const semesters: Course[][] = Array.from({ length: semesterCount }, () => []);
    const courseQueue = [...courses];
  
    for (let semester = 0; semester < semesterCount; semester++) {
      if (courseQueue.length === 0) break;
  
      const currentSemester: Course[] = [];
      const toRequeue: Course[] = [];
  
      let beginnerCount = 0,
        intermediateCount = 0,
        advancedCount = 0;
  
      while (currentSemester.length < coursesPerSemester && courseQueue.length) {
        const course = courseQueue.shift();
        if (!course) break;
  
        if (
          (course.difficulty === "Beginner" && beginnerCount < 2) ||
          (course.difficulty === "Intermediate" && intermediateCount < 2) ||
          (course.difficulty === "Advanced" && advancedCount < 1)
        ) {
          currentSemester.push(course);
          if (course.difficulty === "Beginner") beginnerCount++;
          if (course.difficulty === "Intermediate") intermediateCount++;
          if (course.difficulty === "Advanced") advancedCount++;
        } else {
          toRequeue.push(course); // Requeue for the next semester
        }
      }
  
      semesters[semester] = currentSemester;
      courseQueue.push(...toRequeue);
    }
  
    return semesters;
  }
  export const buildCourseGraph = (courses: Course[]) => {
    const graph: { [key: string]: { prerequisites: string[]; dependents: string[] } } = {};
  
    // Initialize graph nodes
    courses.forEach((course) => {
      graph[course.course_id] = {
        prerequisites: Array.isArray(course.prerequisites)
          ? course.prerequisites
          : course.prerequisites
          ? [course.prerequisites]
          : [],
        dependents: [],
      };
    });
  
    // Populate dependents
    courses.forEach((course) => {
      const prereqs = graph[course.course_id]?.prerequisites || [];
      prereqs.forEach((prereqId) => {
        if (graph[prereqId]) {
          graph[prereqId].dependents.push(course.course_id);
        }
      });
    });
  
    return graph;
  };
  // Highlight prerequisites and dependents
  export function getHighlightedCourses(courseId: string, courses: Course[]) {
    return {
      prerequisites: new Set<string>(),
      dependents: new Set<string>()
    };
  }
  