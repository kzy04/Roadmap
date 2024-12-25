import React from 'react';


import Header from '@/components/Header';
import UniversitySection from '@/components/UniversitySection';

const universities = [
  {
    name: "North South University",
    departments: [
      { id: "cse", name: "Computer Science" },
      { id: "eee", name: "Electrical Engineering" },
      { id: "bba", name: "Business Administration" },
      { id: "economics", name: "Economics" },
      { id: "pharmacy", name: "Pharmacy" }
    ]
  },
  {
    name: "BRAC University",
    departments: [
      { id: "cse", name: "Computer Science" },
      { id: "eee", name: "Electrical Engineering" },
      { id: "architecture", name: "Architecture" },
      { id: "law", name: "Law" },
      { id: "pharmacy", name: "Pharmacy" }
    ]
  },
  {
    name: "Independent University Bangladesh",
    departments: [
      { id: "cse", name: "Computer Science" },
      { id: "eee", name: "Electrical Engineering" },
      { id: "business", name: "Business" },
      { id: "media", name: "Media & Communications" },
      { id: "environmental", name: "Environmental Science" }
    ]
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Academic Path
            </h1>
            <p className="text-lg text-gray-600">
              Explore course roadmaps from top private universities in Bangladesh
            </p>
          </div>
          {universities.map((university) => (
            <UniversitySection
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