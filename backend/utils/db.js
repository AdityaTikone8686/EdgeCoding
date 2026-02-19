import { MongoClient } from "mongodb";

let client;
let db;

export async function connectToDB() {
  if (db) return db;

  client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  db = client.db(process.env.DB_NAME); // e.g., "otpDB"
  return db;
}

