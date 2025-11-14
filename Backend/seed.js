import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("ADMIN_EMAIL or ADMIN_PASSWORD missing in .env");
    return;
  }

  const hashed = await bcrypt.hash(password, 10);

  const [admin, created] = await User.findOrCreate({
    where: { email },
    defaults: { password: hashed, role: "admin", isActive: true },
  });

  if (created) console.log("Admin seeded:", email);
  else console.log("Admin already exists:", email);
};

seedAdmin();
