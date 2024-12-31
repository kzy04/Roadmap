import { Metadata } from "next";
import clientPromise from "@/lib/mongodb";
import Header from "@/components/Header";
import WebsiteLink from "@/components/university/WebsiteLink";
import UniversityInfo from "@/components/university/UniversityInfo";
import BackButton from "@/components/BackButton";

// Interface for University
interface University {
  id: string;
  universities_name: string;
  universities_short_name: string;
  universities_location: string;
  universities_website: string;
}

// Fetch university data server-side by using the university short name
async function fetchUniversity(shortName: string): Promise<University | null> {
  const client = await clientPromise;
  const db = client.db("University");

  // Fetch university by short name (case-insensitive match)
  const universityDoc = await db
    .collection("university")
    .findOne({ universities_short_name: { $regex: new RegExp(`^${shortName}$`, "i") } });

  if (!universityDoc) return null;

  const university: University = {
    id: universityDoc._id.toString(),
    universities_name: universityDoc.universities_name,
    universities_short_name: universityDoc.universities_short_name,
    universities_location: universityDoc.universities_location,
    universities_website: universityDoc.universities_website,
  };

  return university;
}

// Generate metadata dynamically for SEO purposes
export async function generateMetadata({
  params,
}: {
  params: { university_short_name: string };
}): Promise<Metadata> {
  const university = await fetchUniversity(params.university_short_name);

  if (!university) {
    return { title: "University Not Found" };
  }

  return {
    title: university.universities_name,
    description: `Details about ${university.universities_name}`,
  };
}

// Server-side page component
export default async function UniversityPage({
  params,
}: {
  params: { university_short_name: string };
}) {
  const { university_short_name } = params;

  const university = await fetchUniversity(university_short_name);

  if (!university) {
    return <h1>University not found!</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <BackButton></BackButton>

        <UniversityInfo
          name={university.universities_name}
          shortName={university.universities_short_name}
          location={university.universities_location}
        />
        <WebsiteLink website={university.universities_website} />
      </main>
    </div>
  );
}
