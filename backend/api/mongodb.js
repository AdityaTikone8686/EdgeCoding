import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

export async function connectToDB() {
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };

  if (!process.env.MONGODB_URI || !process.env.DB_NAME)
    throw new Error("Missing MongoDB environment variables");

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db(process.env.DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
