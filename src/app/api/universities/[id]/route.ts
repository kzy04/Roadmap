import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const dbName = 'University';
const collectionName = 'university';

// MongoClient instance
let client: MongoClient | null = null;

// In-memory cache
let cachedUniversities: any[] | null = null;
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

// GET method to fetch universities
export async function GET() {
  try {
    // Use cached data if it is still valid
    if (cachedUniversities && cacheTimestamp && Date.now() - cacheTimestamp < cacheDuration) {
      console.log('Serving universities from cache');
      return NextResponse.json(cachedUniversities);
    }

    console.log('Fetching universities from database...');
    // Get the database client
    const mongoClient = await getMongoClient();
    const db = mongoClient.db(dbName);

    // Fetch universities
    const universities = await db.collection(collectionName).find({}).toArray();

    // Cache the result
    cachedUniversities = universities;
    cacheTimestamp = Date.now();

    console.log('Universities fetched and cached');
    return NextResponse.json(universities);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: 'Failed to fetch universities' }, { status: 500 });
  }
}

// PUT method to update university data
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const universities_short_name = url.searchParams.get('universities_short_name');
    const body = await request.json();

    if (!universities_short_name) {
      return NextResponse.json({ error: 'University short name is required' }, { status: 400 });
    }

    // Extract fields to update from the request body
    const { description, year_created, student_numbers } = body;

    if (!description || !year_created || !student_numbers) {
      return NextResponse.json({ error: 'Missing required fields: description, year_created, student_numbers' }, { status: 400 });
    }

    // Get the database client
    const mongoClient = await getMongoClient();
    const db = mongoClient.db(dbName);

    // Update university based on the short name
    const result = await db.collection(collectionName).updateOne(
      { universities_short_name: universities_short_name },
      {
        $set: {
          description,
          year_created,
          student_numbers,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'University not found or no changes made' }, { status: 404 });
    }

    // Clear the cache so that the new data is fetched
    cachedUniversities = null;
    cacheTimestamp = null;

    return NextResponse.json({ success: true, message: 'University data updated successfully' });
  } catch (error) {
    console.error('Error updating university:', error);
    return NextResponse.json({ error: 'Failed to update university data' }, { status: 500 });
  }
}
