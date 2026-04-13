const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGO_URI;

if (!url) throw new Error("MongoDB URL missing in .env");

const client = new MongoClient(url);

let db;

const connectToDatabase = async () => {
  try {
    await client.connect();

    // FIX HERE
    db = client.db("test"); // or "giftlink" if you moved data

    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};

const getDb = () => {
  if (!db) throw new Error("DB not initialized");
  return db;
};

module.exports = { connectToDatabase, getDb };