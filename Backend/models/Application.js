import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Opportunity from "./Opportunity.js";

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

// Relations
Application.belongsTo(User, { as: "applicant", foreignKey: "applicantId" });
Application.belongsTo(Opportunity, { as: "opportunity", foreignKey: "opportunityId" });

export default Application;
