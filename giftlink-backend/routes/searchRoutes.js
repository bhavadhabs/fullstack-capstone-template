const express = require("express");
const router = express.Router();
const { getDb } = require("../models/db");

router.get("/", async (req, res) => {
  try {
    const db = getDb();
    let query = {};

    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.condition) {
      query.condition = req.query.condition;
    }

    if (req.query.age_years) {
      query.age_years = { $lte: parseFloat(req.query.age_years) };
    }

    const gifts = await db.collection("gifts").find(query).toArray();
    res.json(gifts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;