import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  email: { type: DataTypes.STRING, unique: true, allowNull: false },

  password: { type: DataTypes.STRING, allowNull: false },

  role: {
    type: DataTypes.ENUM("admin", "hr", "applicant"),
    allowNull: false,
    defaultValue: "applicant",
  },

  // Optional: This helps with forced password resets for HR managers
  firstLogin: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
});

export default User;
