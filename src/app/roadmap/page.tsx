"use client";

import { MainContent } from "@/components/course-graph/MainContent";
import Header from "@/components/Header";


export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <MainContent />
    </div>
  );
}
