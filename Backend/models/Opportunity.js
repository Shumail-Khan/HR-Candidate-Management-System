import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Opportunity = sequelize.define("Opportunity", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    title: { type: DataTypes.STRING, allowNull: false },
    department: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,

    status: {
        type: DataTypes.ENUM("open", "closed"),
        defaultValue: "open"
    }
});

export default Opportunity;