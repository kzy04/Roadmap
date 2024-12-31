import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // MongoDB client

// Function to fetch universities data from MongoDB
async function fetchUniversities() {
  const client = await clientPromise;
  const db = client.db("University"); // Your MongoDB database name
  const universitiesData = await db.collection("university").find({}).toArray();
  return universitiesData;
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
