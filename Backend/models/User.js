import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Opportunity from "./Opportunity.js";
import Application from "./Application.js";

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM("admin", "hr", "applicant"),
        allowNull: false,
        defaultValue: "applicant"
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }

});

User.hasMany(Opportunity, { as: "opportunities", foreignKey: "hrId" });
User.hasMany(Application, { as: "applications", foreignKey: "applicantId" });

export default User;
