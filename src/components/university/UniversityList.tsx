'use client';

import { useEffect, useState } from 'react';
import UniversityCard from './UniversityCard';

interface University {
  universities_name: string;
  universities_short_name: string;
}

export default function UniversityList() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUniversities() {
      try {
        const response = await fetch('/api/universities'); // Assuming you're fetching universities data from an API route
        if (!response.ok) {
          throw new Error('Failed to fetch universities');
        }

        const data = await response.json();
        setUniversities(data);
      } catch (error: any) {
        console.error('Error fetching universities:', error);
        setError('Failed to fetch universities');
      }
    }

    fetchUniversities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">University Directory</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {universities.map((university) => (
            <UniversityCard
              key={university.universities_short_name}
              name={university.universities_name}
              shortName={university.universities_short_name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
