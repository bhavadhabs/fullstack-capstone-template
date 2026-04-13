const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDb } = require("../models/db");

const router = express.Router();

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// =========================
// REGISTER
// =========================
router.post("/register", async (req, res) => {
  try {
    const db = getDb();
    const users = db.collection("users");

    const { firstName, lastName, email, password } = req.body;

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await users.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const token = jwt.sign(
      { user: { id: result.insertedId } },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      authtoken: token,
      email,
      firstName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Register failed" });
  }
});

// =========================
// LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const db = getDb();
    const users = db.collection("users");

    const { email, password } = req.body;

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { user: { id: user._id } },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      authtoken: token,
      userName: user.firstName,
      userEmail: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;