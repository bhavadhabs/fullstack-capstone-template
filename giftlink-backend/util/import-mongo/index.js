const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

// ✅ MUST match Kubernetes service
const url = "mongodb://localhost:27017/giftlink";
const dbName = "giftlink";
const collectionName = "gifts";

const filename = path.join(__dirname, "gifts.json");

const raw = fs.readFileSync(filename, "utf8");
const data = JSON.parse(raw);

async function loadData() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.deleteMany({});
    const result = await collection.insertMany(data);

    console.log("Inserted documents:", result.insertedCount);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await client.close();
  }
}

loadData();
