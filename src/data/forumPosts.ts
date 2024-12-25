import { University } from './universities';

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  university: Exclude<University, "All Universities">;
  date: string;
  likes: number;
  replies: number;
  tags: string[];
}

export const forumPosts: ForumPost[] = [
  {
    id: 1,
    title: "Tips for CSE251 Final Exam?",
    content: "Hey everyone! I'm preparing for the CSE251 final exam. Any tips or important topics to focus on?",
    author: "Sarah Ahmed",
    university: "North South University",
    date: "March 15, 2024",
    likes: 24,
    replies: 12,
    tags: ["CSE", "Exams", "Study Tips"]
  },
  {
    id: 2,
    title: "Architecture Project Collaboration",
    content: "Looking for team members for the upcoming sustainable architecture project. Need 2-3 creative minds!",
    author: "Rafid Hassan",
    university: "BRAC University",
    date: "March 14, 2024",
    likes: 15,
    replies: 8,
    tags: ["Architecture", "Projects", "Collaboration"]
  },
  {
    id: 3,
    title: "Business Case Competition 2024",
    content: "Who's participating in the upcoming case competition? Let's form a team!",
    author: "Tasnim Khan",
    university: "Independent University Bangladesh",
    date: "March 13, 2024",
    likes: 32,
    replies: 18,
    tags: ["Business", "Competition", "Team Building"]
  }
];