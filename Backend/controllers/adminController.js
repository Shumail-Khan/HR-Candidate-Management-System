// controllers/adminController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const addHrManager = async (req, res) => {
    try {
        const { email, password, fullName, phone, address } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if email already exists
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // If password not provided, generate a random one
        const plainPassword = password || Math.random().toString(36).slice(-8);
        const hashed = await bcrypt.hash(plainPassword, 10);

        // Create HR user
        const hrUser = await User.create({
            email,
            password: hashed,
            role: "hr",
            fullName: fullName || null,
            phone: phone || null,
            address: address || null
        });

        // Optionally: send email with credentials here

        res.status(201).json({
            message: "HR Manager created successfully",
            user: { id: hrUser.id, email: hrUser.email, role: hrUser.role },
            password: plainPassword // only if you want admin to see it
        });
    } catch (err) {
        console.error("Add HR Error:", err);
        res.status(500).json({ message: "Server error creating HR manager" });
    }
};

export const removeHrManager = async (req, res) => {
    try {
        const hrId = req.params.id;

        const hrUser = await User.findOne({ where: { id: hrId, role: "hr" } });

        if (!hrUser) {
            return res.status(404).json({ message: "HR Manager not found" });
        }

        if (req.query.hard === "true") {
            await hrUser.destroy();
            return res.json({ message: "HR Manager permanently deleted" });
        }
        // Soft delete
        hrUser.isActive = false;
        await hrUser.save();

        res.json({ message: "HR Manager deactivated successfully" });
    } catch (err) {
        console.error("Remove HR Error:", err);
        res.status(500).json({ message: "Server error deactivating HR manager" });
    }
};
