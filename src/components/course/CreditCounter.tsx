import { Course } from "@/utils/roadmap-utils";

 

type CreditCounterProps = {
  semesters: Course[][];
};

export function CreditCounter({ semesters }: CreditCounterProps) {
  const totalCredits = semesters.reduce(
    (total, semester) =>
      total + semester.reduce((sum, course) => sum + course.credits, 0),
    0
  );

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Independent University, Bangladesh</h1>
      <div className="flex items-center gap-4">
        <p className="text-lg font-medium">💳 {totalCredits} Total Credits</p>
        <p className="text-lg font-medium">🕒 4 Years Duration</p>
        <p className="text-lg font-medium">📚 {semesters.length} Semesters</p>
      </div>
    </div>
  );
}
