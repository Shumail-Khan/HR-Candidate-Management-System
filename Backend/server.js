import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import sequelize, { initDb } from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import hrRoutes from "./routes/hrRoutes.js";
import applicantRoutes from "./routes/applicantRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

// Models and Associations
import "./models/User.js";
import "./models/ApplicantProfile.js";
import "./models/Opportunity.js";
import "./models/Application.js";
import applyAssociations from "./models/Associations.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/applicant", applicantRoutes);
app.use("/api/profile", profileRoutes);

// Start server after DB init
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await initDb();           // Create DB if missing + connect
  applyAssociations();     // Apply model associations
  await sequelize.sync({ alter: true }); // Sync all models

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();