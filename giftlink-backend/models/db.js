const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) throw new Error("MONGO_URI missing in .env");

const client = new MongoClient(uri);

let db;

const connectToDatabase = async () => {
  try {
    await client.connect();

    db = client.db("giftlink");

    console.log("Connected to MongoDB");
    return db;
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

const getDb = () => {
  if (!db) throw new Error("DB not initialized");
  return db;
};

module.exports = { connectToDatabase, getDb };