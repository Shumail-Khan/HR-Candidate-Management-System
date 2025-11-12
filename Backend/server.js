import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import User from "./models/User.js";
import Candidate from "./models/Candidate.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);

// Start server after DB init
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await initDb();           // Create DB if missing + connect
  await User.sync({ alter: true });
  await Candidate.sync({ alter: true });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
