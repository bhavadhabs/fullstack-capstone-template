const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

const uri =
  "mongodb+srv://bhavadhabs:f7RpdL2lGSb6jT2t@cluster0.rbnfu5e.mongodb.net/giftlink?retryWrites=true&w=majority";

// Database config
const dbName = "giftlink";
const collectionName = "gifts";

// Load JSON file
const filename = path.join(__dirname, "gifts.json");
const raw = fs.readFileSync(filename, "utf8");
const data = JSON.parse(raw);

async function loadData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // clean old data
    await collection.deleteMany({});
    console.log("Old data cleared");

    // insert new data
    const result = await collection.insertMany(data);

    console.log(`Inserted ${result.insertedCount} documents`);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

loadData();
