"use client";

import { CourseGraph } from "@/components/course-graph/coursegraph";
import Header from "@/components/Header";

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Course Roadmap
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Explore the courses and their prerequisites in an interactive roadmap.
        </p>
        {/* Render the CourseGraph */}
        <CourseGraph />
      </div>
    </div>
  );
}
