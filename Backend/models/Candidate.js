import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Candidate = sequelize.define("Candidate", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "Pending" },
});

// Association
User.hasMany(Candidate, { foreignKey: "userId" });
Candidate.belongsTo(User, { foreignKey: "userId" });

export default Candidate;