import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ApplicantProfile = sequelize.define("ApplicantProfile", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,

    cvFile: DataTypes.STRING,
});

export default ApplicantProfile;