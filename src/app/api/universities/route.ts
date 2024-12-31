import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // MongoDB client

// Function to fetch universities data from MongoDB
async function fetchUniversities() {
  const client = await clientPromise;
  const db = client.db("University"); // Your MongoDB database name
  const universitiesData = await db.collection("university").find({}).toArray();
  return universitiesData;
}

// Function to fetch a university by short name
async function fetchUniversityByShortName(shortName: string) {
  const client = await clientPromise;
  const db = client.db("University");
  const universityData = await db.collection("university").findOne({
    universities_short_name: shortName,
  });
  return universityData;
}

// Function to update university data
async function updateUniversity(shortName: string, description: string, year_created: number, student_numbers: number) {
  const client = await clientPromise;
  const db = client.db("University");

  const result = await db.collection("university").updateOne(
    { universities_short_name: shortName },
    {
      $set: {
        description,
        year_created,
        student_numbers,
      },
    }
  );

  return result;
}

// Named export for the GET method
export async function GET() {
  try {
    const universities = await fetchUniversities();
    return NextResponse.json(universities); // Send universities data as JSON response
  } catch (error) {
    console.error("Error fetching universities:", error);
    return NextResponse.json({ error: "Failed to fetch universities" }, { status: 500 });
  }
}

// Named export for the PUT method (Admin Panel to update university data)
export async function PUT(request: Request) {
  try {
    const shortName = request.url.split("/").pop();
    if (!shortName) {
      return NextResponse.json({ error: "University short name is required" }, { status: 400 });
    }
    const { description, year_created, student_numbers } = await request.json();

    if (!description || !year_created || !student_numbers) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Update the university with the new details
    const result = await updateUniversity(shortName, description, year_created, student_numbers);

    if (result.modifiedCount > 0) {
      return NextResponse.json({ success: true, message: "University data updated successfully" });
    } else {
      return NextResponse.json({ success: false, message: "University not found or no changes made" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating university data:", error);
    return NextResponse.json({ error: "Failed to update university data" }, { status: 500 });
  }
}
