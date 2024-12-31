import Link from 'next/link';

export default function UniversityCard({
  name,
  shortName,
}: {
  name: string;
  shortName: string;
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link
        href={`/university/${shortName.toLowerCase().replace(/\s+/g, '-')}`} // Navigate by short name
        className="text-blue-600 hover:text-blue-800 text-xl font-medium"
      >
        {name}
      </Link>
    </div>
  );
}
