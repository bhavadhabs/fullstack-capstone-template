const express = require("express");
const { getDb } = require("../models/db");
const { ObjectId } = require("mongodb");

const router = express.Router();

// GET ALL GIFTS
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const gifts = await db.collection("gifts").find({}).toArray();
    res.json(gifts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch gifts" });
  }
});

// GET GIFT BY ID
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const gift = await db.collection("gifts").findOne({
      _id: new ObjectId(id),
    });

    if (!gift) {
      return res.status(404).json({ error: "Gift not found" });
    }

    res.json(gift);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ADD GIFT
router.post("/", async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection("gifts").insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add gift" });
  }
});

// DELETE GIFT
router.delete("/:id", async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await db.collection("gifts").deleteOne({
      _id: new ObjectId(id),
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete" });
  }
});

module.exports = router;