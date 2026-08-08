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

// Models + Associations
import "./models/User.js";
import "./models/ApplicantProfile.js";
import "./models/Opportunity.js";
import "./models/Application.js";
import applyAssociations from "./models/Associations.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/applicant", applicantRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await initDb();
  applyAssociations();
  await sequelize.sync();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
