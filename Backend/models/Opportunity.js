import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Opportunity = sequelize.define("Opportunity", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  location: DataTypes.STRING,

  status: {
    type: DataTypes.ENUM("open", "closed"),
    defaultValue: "open"
  },

  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default Opportunity;