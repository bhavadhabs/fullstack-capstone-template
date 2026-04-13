const express = require("express");
const router = express.Router();

// Dummy auth routes (for UI / assignment purposes)

// REGISTER
router.post("/register", (req, res) => {
  res.json({ message: "User registered successfully (mock)" });
});

// LOGIN
router.post("/login", (req, res) => {
  res.json({ message: "User logged in successfully (mock)", token: "demo-token" });
});

module.exports = router;