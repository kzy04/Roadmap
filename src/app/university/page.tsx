'use client';

import { useEffect, useState } from "react";
import Header from "@/components/Header"; // Import the Header component
import BackButton from "@/components/BackButton"; // Import the BackButton component
import UniversityCard from "@/components/university/UniversityCard";
 // Import the UniversityCard component

interface University {
  id: string;
  universities_name: string;
  universities_short_name: string;
}

export default function UniversityLandingPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchUniversities() {
      try {
        const response = await fetch("/api/universities"); // API route to fetch universities
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setUniversities(data);
          setFilteredUniversities(data); // Initially display all universities
        } else {
          throw new Error("Data format is incorrect");
        }
      } catch (error: any) {
        console.error("Error fetching universities:", error);
        setError("Failed to fetch universities");
      }
    }

    fetchUniversities();
  }, []); // Empty dependency array to fetch only once when the component mounts

  // Handle the search input and filter the universities
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter universities by name, case-insensitive
    const filtered = universities.filter((university) =>
      university.universities_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUniversities(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        <BackButton />
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">University Directory</h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by university title"
            className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* University Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUniversities.length === 0 ? (
            <p className="text-xl text-gray-600 text-center">No universities found</p>
          ) : (
            filteredUniversities.map((university) => (
              <UniversityCard
                key={university.universities_short_name}
                name={university.universities_name}
                shortName={university.universities_short_name}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
