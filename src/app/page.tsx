import React from 'react';
import Header from '@/components/Header';

const universities = [
  {
    name: "North South University",
    departments: [
      "Computer Science",
      "Business Administration",
      "Electrical Engineering",
      "Economics",
      "Pharmacy",
    ],
  },
  {
    name: "BRAC University",
    departments: [
      "Computer Science",
      "Architecture",
      "Electrical Engineering",
      "Law",
      "Pharmacy",
    ],
  },
  {
    name: "Independent University Bangladesh",
    departments: [
      "Media & Communications",
      "Environmental Science",
      "Electrical Engineering",
      "Computer Science",
      "Business",
    ],
  },
  {
    name: "East West University",
    departments: [
      "Computer Science",
      "Pharmacy",
      "Business Administration",
      "Economics",
      "Genetic Engineering",
    ],
  },
  {
    name: "American International University-Bangladesh",
    departments: [
      "Computer Science",
      "Electrical Engineering",
      "Business Administration",
      "Architecture",
      "Media & Communication",
    ],
  },
  {
    name: "United International University",
    departments: [
      "Computer Science",
      "Electrical Engineering",
      "Business Administration",
      "Economics",
      "Robotics Engineering",
    ],
  },
];

function UniversityCard({ name, departments }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center space-y-4">
      {/* Placeholder for logo/image */}
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
        {/* Replace with university logo if available */}
        <span className="text-gray-400 text-lg">Logo</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      <p className="text-gray-600 text-sm">Choose Your Major</p>
      <div className="space-y-2 w-full">
        {departments.map((dept, index) => (
          <button
            key={index}
            className="w-full bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-900 py-2 px-4 rounded-md transition-colors duration-200"
          >
            {dept}
          </button>
        ))}
        <button
          className="w-full bg-blue-100 hover:bg-blue-300 text-blue-700 py-2 px-4 rounded-md transition-colors duration-200 font-medium mt-4"
        >
          Show All
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Academic Path</h1>
          <p className="text-lg text-gray-600">
            Explore course roadmaps from top private universities in Bangladesh
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((university) => (
            <UniversityCard
              key={university.name}
              name={university.name}
              departments={university.departments}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
