import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const ApplicantProfile = sequelize.define("ApplicantProfile", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,

    cvFile: DataTypes.STRING,
});

User.hasOne(ApplicantProfile, { foreignKey: "userId", onDelete: "CASCADE" });
ApplicantProfile.belongsTo(User, { foreignKey: "userId" });

export default ApplicantProfile;
