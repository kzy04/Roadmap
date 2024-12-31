import { MongoClient } from 'mongodb';

// MongoDB URI from environment variables
const uri = process.env.MONGO_DB_URL || '';
// Removed deprecated options
const clientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

// MongoDB client and connection promise (singleton)
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to avoid multiple MongoClient instances
  // during hot reloading in Next.js
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(uri, clientOptions);
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, connect directly to MongoDB without the global cache
  clientPromise = MongoClient.connect(uri, clientOptions);
}

export default clientPromise;
