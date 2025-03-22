/*
(c) @xditya
View the license: https://github.com/xditya/WebShortener/blob/master/LICENSE

import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.30.0/mod.ts";  // ⬅️ Use v0.30.0


import config from "../env.ts";

console.log("Connecting to MongoDB...");
const client = new MongoClient();
let mongoUrl = config.MONGO_URL; // ✅ Use as a plain string

// ✅ Ensure authMechanism is set correctly
if (!mongoUrl.includes("authMechanism=")) {
  const separator = mongoUrl.includes("?") ? "&" : "?";
  mongoUrl += `${separator}authMechanism=SCRAM-SHA-1`;
}

try {
  await client.connect(mongoUrl); // ✅ Use the string directly
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
*/


import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.30.0/mod.ts"; // Use v0.30.0 for stability

import config from "../env.ts";

console.log("Connecting to MongoDB...");

// Create a new MongoClient instance
const client = new MongoClient();

// Ensure the MONGO_URL is valid
if (!config.MONGO_URL) {
  throw new Error("❌ MONGO_URL is not defined. Check your environment variables.");
}

// Connect to MongoDB with a timeout
const connectWithTimeout = async (url: string, timeout = 10000) => {
  return Promise.race([
    client.connect(url), // Attempt connection
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("❌ MongoDB connection timed out!")), timeout)
    ),
  ]);
};

try {
  await connectWithTimeout(config.MONGO_URL);
  console.log("✅ Connected to MongoDB!");
} catch (err) {
  console.error("❌ Error connecting to MongoDB:", err);
  throw err;
}

// Select database
const db = client.database("SelfShortener");

// Define Schema
interface UrlSchema {
  _id: ObjectId;
  hash: string;
  url: string;
}

// Create Collection
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
