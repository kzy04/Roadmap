'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface University {
  id: string;
  universities_name: string;
  universities_short_name: string;
  universities_location: string;
  universities_website: string;
}

const UniversityListPage = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch("/api/universities");
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        setError("Failed to fetch universities");
      }
    };

    fetchUniversities();
  }, []);

  const handleEditClick = (universityShortName: string) => {
    router.push(`/admin/university/${universityShortName}/update`); // Redirect to the update page for selected university
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">University Directory</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4 mt-6">
        {universities.map((university) => (
          <li key={university.id} className="text-xl">
            <div className="flex justify-between items-center">
              <span>{university.universities_name}</span>
              <Button onClick={() => handleEditClick(university.universities_short_name)} className="text-blue-600">
                Edit
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniversityListPage;
