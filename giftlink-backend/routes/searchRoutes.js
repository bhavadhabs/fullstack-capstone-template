const express = require("express");
const { getDb } = require("../models/db");

const router = express.Router();

router.get("/", async (req, res) => {
  const db = getDb();

  let query = {};

  if (req.query.name) {
    query.name = { $regex: req.query.name, $options: "i" };
  }

  if (req.query.category) query.category = req.query.category;

  const results = await db.collection("gifts").find(query).toArray();

  res.json(results);
});

module.exports = router;