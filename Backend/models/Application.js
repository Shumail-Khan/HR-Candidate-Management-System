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

    hrRemarks: DataTypes.TEXT
});

// Relations
User.hasMany(Application, { foreignKey: "applicantId" });
Application.belongsTo(User, { foreignKey: "applicantId" });

Opportunity.hasMany(Application, { foreignKey: "opportunityId" });
Application.belongsTo(Opportunity, { foreignKey: "opportunityId" });

export default Application;
