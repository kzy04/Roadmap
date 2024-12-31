import React from "react";
import { CourseGraph } from "@/components/course-graph/coursegraph";
import { CourseRoadmapTitle } from "./courseRoadmapTitle";

export function MainContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <CourseRoadmapTitle />
      <CourseGraph />
    </div>
  );
}
