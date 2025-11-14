import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize, { initDb } from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";

// Models
import "./models/User.js";
import "./models/ApplicantProfile.js";
import "./models/Opportunity.js";
import "./models/Application.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start server after DB init
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await initDb();           // Create DB if missing + connect
  await sequelize.sync({ alter: true }); // Sync all models

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
