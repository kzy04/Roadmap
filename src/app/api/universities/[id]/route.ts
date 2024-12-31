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
