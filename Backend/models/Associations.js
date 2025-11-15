import ApplicantProfile from "./ApplicantProfile.js";
import Application from "./Application.js";
import Opportunity from "./Opportunity.js";
import User from "./User.js";

// Associations
Application.belongsTo(User, { as: "applicant", foreignKey: "applicantId" });
Application.belongsTo(Opportunity, { as: "opportunity", foreignKey: "opportunityId" });
Opportunity.belongsTo(User, { as: "hr", foreignKey: "hrId" });
User.hasMany(Opportunity, { as: "opportunities", foreignKey: "hrId" });
User.hasMany(Application, { as: "applications", foreignKey: "applicantId" });
User.hasOne(ApplicantProfile, { foreignKey: "userId", onDelete: "CASCADE" });
ApplicantProfile.belongsTo(User, { foreignKey: "userId" });

export default function applyAssociations() {
    return true; // optional placeholder
}