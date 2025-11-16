import User from "./User.js";
import Opportunity from "./Opportunity.js";
import Application from "./Application.js";
import ApplicantProfile from "./ApplicantProfile.js";

// Application relationships
Application.belongsTo(User, { as: "applicant", foreignKey: "applicantId" });
Application.belongsTo(Opportunity, { as: "opportunity", foreignKey: "opportunityId" });
User.hasMany(Application, { as: "applications", foreignKey: "applicantId" });

// Opportunity relationships
Opportunity.belongsTo(User, { as: "hr", foreignKey: "hrId" });
User.hasMany(Opportunity, { as: "opportunities", foreignKey: "hrId" });

// Applicant profile relationships
User.hasOne(ApplicantProfile, { foreignKey: "userId", onDelete: "CASCADE" });
ApplicantProfile.belongsTo(User, { foreignKey: "userId" });

export default function applyAssociations() {}
