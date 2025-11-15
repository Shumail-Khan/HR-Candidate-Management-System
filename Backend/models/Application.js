import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Application = sequelize.define("Application", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    status: {
        type: DataTypes.ENUM("pending", "reviewing", "selected", "rejected"),
        defaultValue: "pending"
    },

    hrRemarks: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Application;