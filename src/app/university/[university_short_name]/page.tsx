import { Metadata } from "next";
import clientPromise from "@/lib/mongodb";
import Header from "@/components/Header";
import WebsiteLink from "@/components/university/WebsiteLink";
import UniversityInfo from "@/components/university/UniversityInfo";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, ExternalLink } from 'lucide-react';
import Image from "next/image";

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
        <BackButton />

        {/* University Card - Full screen style */}
        <Card className="w-full h-full max-w-7xl mx-auto overflow-hidden shadow-xl hover:shadow-2xl transition-all">
          <div className="grid md:grid-cols-[350px_1fr]">
            <div className="relative h-[300px] md:h-full">
              <Image
                src="/placeholder.svg?height=400&width=350"
                alt="University campus"
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                priority
              />
            </div>
            <div className="flex flex-col p-8">
              <CardHeader className="space-y-3">
                <div className="space-y-3">
                  <Badge className="w-fit text-lg font-semibold">Private University</Badge>
                  <h2 className="text-4xl font-bold tracking-tight">{university.universities_name}</h2>
                  <p className="text-lg text-muted-foreground">{university.universities_short_name}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-center gap-4 text-xl">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{university.universities_location}</span>
                  </div>
                  <div className="flex flex-wrap gap-6 text-xl">
                    <div className="flex items-center gap-4">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>Est. 1992</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span>20,000+ Students</span>
                    </div>
                  </div>
                  <p className="text-xl text-muted-foreground">
                    One of the first private universities in Bangladesh, offering quality education in business, engineering,
                    and liberal arts. This prestigious institution aims to provide cutting-edge knowledge and professional skills.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                {/* Visit Website Button */}
                <Button
                  variant="outline"
                  className="w-full sm:w-auto py-3 px-6 text-xl"
                >
                  <ExternalLink className="mr-3 h-5 w-5" />
                  <a
                    href={`https://${university.universities_website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Visit Website
                  </a>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
