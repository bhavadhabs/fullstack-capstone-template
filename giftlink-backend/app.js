const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { connectToDatabase } = require("./models/db");
const giftRoutes = require("./routes/giftRoutes");
const authRoutes = require("./routes/authRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

// ✅ CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Logger (debug)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ Routes
app.use("/api/gifts", giftRoutes);   // IMPORTANT
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("GiftLink Backend is running!");
});

const PORT = process.env.PORT || 3060;

// ✅ Start server
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