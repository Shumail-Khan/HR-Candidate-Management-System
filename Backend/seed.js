import axios from "axios";

const users = [
  { email: "hr1@example.com", password: "12345" },
  { email: "hr2@example.com", password: "12345" },
];

const seedUsers = async () => {
  try {
    for (const u of users) {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/signup", u);
        console.log(`Seeded user: ${res.data.user.email}`);
      } catch (err) {
        if (err.response) {
          console.log(`Could not seed ${u.email}: ${err.response.data.message}`);
        } else {
          console.log(`Error seeding ${u.email}: ${err.message}`);
        }
      }
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Error in seeding script:", err);
    process.exit(1);
  }
};

seedUsers();
