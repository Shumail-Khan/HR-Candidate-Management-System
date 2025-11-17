import fs from "fs";
import path from "path";
import ApplicantProfile from "../models/ApplicantProfile.js";
import User from "../models/User.js";


// --------------------------------------------------
// Create or Update Applicant Profile
// --------------------------------------------------
export const upsertProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { fullName, phone, address } = req.body;

    let newCvFile = req.file ? `/uploads/cv/${req.file.filename}` : null;

    // Check if profile exists
    let profile = await ApplicantProfile.findOne({ where: { userId } });

    if (!profile) {
      // Create new profile
      profile = await ApplicantProfile.create({
        userId,
        fullName,
        phone,
        address,
        cvFile: newCvFile,
      });
    } else {
      // If uploading new CV → delete old one
      if (newCvFile && profile.cvFile) {
        const oldFilePath = path.join(
          "uploads",
          "cv",
          path.basename(profile.cvFile)
        );

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // Update fields
      profile.fullName = fullName;
      profile.phone = phone;
      profile.address = address;
      if (newCvFile) profile.cvFile = newCvFile;

      await profile.save();
    }

    return res.json({
      message: "Profile saved successfully",
      profile,
    });

  } catch (err) {
    console.error("Profile upsert error:", err.message);
    return res.status(500).json({
      message: "Server error updating profile",
      error: err.message,
    });
  }
};


// --------------------------------------------------
// Get Logged-in Applicant's Profile
// --------------------------------------------------
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await ApplicantProfile.findOne({
      where: { userId },
      include: { model: User, attributes: ["email"] },
    });

    if (!profile)
      return res.status(404).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// --------------------------------------------------
// (HR/Admin) Get Applicant Profile by User ID
// --------------------------------------------------
export const getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await ApplicantProfile.findOne({
      where: { userId },
      include: { model: User, attributes: ["email", "role"] },
    });

    if (!profile)
      return res.status(404).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
