import React from 'react';

interface Department {
  id: string;
  name: string;
}

interface UniversityProps {
  name: string;
  departments: Department[];
}

const UniversitySection = ({ name, departments }: UniversityProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {departments.map((dept) => (
          <a
            key={dept.id}
            href={`/university/${name.toLowerCase().replace(/\s+/g, '-')}/department/${dept.id}`}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg 
                     hover:from-blue-600 hover:to-blue-700 transition-all duration-300 
                     transform hover:-translate-y-1 text-center shadow-md"
          >
            {dept.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default UniversitySection;