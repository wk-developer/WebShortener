import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.31.2/mod.ts";

import config from "../env.ts";

console.log("Connecting to MongoDB...");
const client = new MongoClient();

// Force SSL/TLS options
const mongoUrl = config.MONGO_URL;

try {
  await client.connect(mongoUrl, {
    tls: true, // ✅ Explicitly enable TLS
    directConnection: true, // ✅ Force direct connection to avoid DNS issues
  });
  console.log("Connected to MongoDB!");
} catch (err) {
  console.error("Error connecting to MongoDB", err);
  throw err;
}

const db = client.database("SelfShortener");

interface UrlSchema {
  _id: ObjectId;
  hash: string;
  url: string;
}

const urls = db.collection<UrlSchema>("URLS");

export function checkIfUrlExists(url: string) {
  return urls.findOne({ url });
}

export async function shortenUrl(url: string) {
  const isUrlExists = await checkIfUrlExists(url);
  if (isUrlExists) {
    return isUrlExists.hash;
  }
  let hash = Math.random().toString(36).substring(2, 7);
  while (await urls.findOne({ hash })) {
    hash = Math.random().toString(36).substring(2, 7);
  }
  await urls.insertOne({ url, hash });
  return hash;
}

export async function getUrl(hash: string) {
  return (await urls.findOne({ hash }))?.url;
}
