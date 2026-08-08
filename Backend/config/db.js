import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT
} = process.env;

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 3306,
  dialect: "mysql",
  logging: false,
});

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize connected successfully");
  } catch (err) {
    console.error("Sequelize connection error:", err);
  }
};

export default sequelize;
