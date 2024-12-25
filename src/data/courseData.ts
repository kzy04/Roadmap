export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  prerequisites: string[];
  description: string;
  learningPoints: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
}

export const cseCourses: Course[] = [
  {
    id: "cse115",
    code: "CSE115",
    name: "Programming Language I",
    credits: 3,
    semester: 1,
    prerequisites: [],
    description: "Introduction to programming using C/C++",
    learningPoints: 100
  },
  {
    id: "cse215",
    code: "CSE215",
    name: "Programming Language II",
    credits: 3,
    semester: 2,
    prerequisites: ["cse115"],
    description: "Object-oriented programming using Java",
    learningPoints: 150
  },
  {
    id: "cse225",
    code: "CSE225",
    name: "Data Structures and Algorithms",
    credits: 3,
    semester: 3,
    prerequisites: ["cse215"],
    description: "Fundamental data structures and algorithms",
    learningPoints: 200
  }
];

export const achievements: Achievement[] = [
  {
    id: "first-semester",
    name: "Freshman Champion",
    description: "Complete all courses in first semester",
    icon: "trophy",
    points: 500
  },
  {
    id: "programming-master",
    name: "Programming Master",
    description: "Complete all programming courses with excellent grades",
    icon: "code",
    points: 1000
  }
];