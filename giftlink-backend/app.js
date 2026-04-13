const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { connectToDatabase } = require("./models/db");
const giftRoutes = require("./routes/giftRoutes");
const authRoutes = require("./routes/authRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/gifts", giftRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// Root
app.get("/", (req, res) => {
  res.send("GiftLink Backend is running!");
});

// ADD THIS (VERY IMPORTANT)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3060;

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server start failed:", err);
  }
};

startServer();