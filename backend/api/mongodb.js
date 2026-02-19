import { MongoClient } from "mongodb";

let client;
let clientPromise;

if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");

if (process.env.NODE_ENV === "development") {
  // In dev, use global variable to prevent multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
}

export async function connectToDB() {
  const client = await clientPromise;
  const db = client.db("edgecoding"); // match your DB name
  return { client, db };
}
