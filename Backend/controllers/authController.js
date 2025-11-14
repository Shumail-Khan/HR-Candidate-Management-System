// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";
import ApplicantProfile from "../models/ApplicantProfile.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";


// =========================
//  APPLICANT SIGNUP
// =========================
export const signup = async (req, res) => {
    try {
        const { email, password, fullName, phone, address } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Check if user exists
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(409).json({ message: "Email already registered." });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Create user with role "applicant"
        const user = await User.create({
            email,
            password: hashed,
            role: "applicant",
        });

        // Create applicant profile
        await ApplicantProfile.create({
            userId: user.id,
            fullName: fullName || null,
            phone: phone || null,
            address: address || null,
        });

        // Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(201).json({
            message: "User created successfully",
            user: { id: user.id, email: user.email, role: user.role },
            token,
        });

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ message: "Server error during signup" });
    }
};

// =========================
//  LOGIN (UPDATED)
// =========================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find user
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Compare passwords
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            message: "Login successful",
            user: { id: user.id, email: user.email, role: user.role },
            token,
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: "Server error during login" });
    }
};