import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const ApplicantProfile = sequelize.define("ApplicantProfile", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    fullName: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },

    // store file path if uploading CV
    cvFile: { type: DataTypes.STRING },

    // any extra fields you want
});

User.hasOne(ApplicantProfile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});
ApplicantProfile.belongsTo(User, { foreignKey: "userId" });

export default ApplicantProfile;
