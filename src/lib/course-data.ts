// Inside your component file or a separate types.ts file

export type CourseType = 'programming' | 'mathematics' | 'ai' | 'core'; // Course types

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'; // Difficulty levels

export interface Course {
  id: string;
  code: string;
  name: string;
  type: CourseType;
  difficulty: Difficulty;
  credits: number;
  prerequisites: string[];
}
