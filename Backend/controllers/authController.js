import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({ id: user.id, email: user.email, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        // Hash password
        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hash });

        res.status(201).json({ message: "User created", user: { id: user.id, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
