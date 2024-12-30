import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const dbName = 'University';
const collectionName = 'courses';

// MongoClient instance
let client: MongoClient | null = null;

// In-memory cache
let cachedCourses: any[] | null = null;
let cacheTimestamp: number | null = null;
const cacheDuration = 5 * 60 * 1000; // Cache expires after 5 minutes

// Function to ensure MongoClient connection
async function getMongoClient() {
  if (!client) {
    const uri = process.env.MONGO_DB_URL;
    if (!uri) {
      throw new Error('MONGO_DB_URL environment variable is not defined.');
    }
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
  }
  return client;
}

export async function GET() {
  try {
    // Use cached data if it is still valid
    if (cachedCourses && cacheTimestamp && Date.now() - cacheTimestamp < cacheDuration) {
      console.log('Serving courses from cache');
      return NextResponse.json(cachedCourses);
    }

    console.log('Fetching courses from database...');
    // Get the database client
    const mongoClient = await getMongoClient();
    const db = mongoClient.db(dbName);

    // Fetch courses
    const courses = await db.collection(collectionName).find({}).toArray();

    // Cache the result
    cachedCourses = courses;
    cacheTimestamp = Date.now();

    console.log('Courses fetched and cached');
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
