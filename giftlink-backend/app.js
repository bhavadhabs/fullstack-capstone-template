const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { connectToDatabase } = require("./models/db");
const giftRoutes = require("./routes/giftRoutes");
const authRoutes = require("./routes/authRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

// CORS FIX (VERY IMPORTANT)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/gifts", giftRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

// Health check (Render)
app.get("/healthz", (req, res) => {
  res.send("OK");
});

// Test route
app.get("/", (req, res) => {
  res.send("GiftLink Backend Running");
});

const PORT = process.env.PORT || 3060;

const start = async () => {
  try {
    await connectToDatabase();
    console.log("DB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();