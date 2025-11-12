import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// 1️Connect to MySQL server (without specifying database)
const createDb = async () => {
    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        console.log(`Database "${DB_NAME}" exists or created successfully`);
        await connection.end();
    } catch (err) {
        console.error("Error creating database:", err);
    }
};

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    logging: false,
});

export const initDb = async () => {
    await createDb();
    try {
        await sequelize.authenticate();
        console.log("Sequelize connected to database successfully");
    } catch (err) {
        console.error("Sequelize connection error:", err);
    }
};

export default sequelize;
