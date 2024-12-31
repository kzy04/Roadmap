import React from "react";
import Link from "next/link";

// Define the Department interface
interface Department {
  id: string;
  name: string;
}

// Define the UniversityProps interface
interface UniversityProps {
  name: string;
  departments: Department[];
  shortName: string; // Add the short name as a prop
}

const UniversitySection = ({ name, departments, shortName }: UniversityProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Make the university name clickable */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {/* Link to the dynamic university page using the short name */}
        <Link
          href={`/university/${shortName.toLowerCase()}`} // Link using shortName
          className="text-blue-600 hover:text-blue-800"
        >
          {name}
        </Link>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Render departments */}
        {departments.map((dept) => (
          <a
            key={dept.id}
            href={`/university/${shortName.toLowerCase()}/department/${dept.id}`} // Link to department page
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
