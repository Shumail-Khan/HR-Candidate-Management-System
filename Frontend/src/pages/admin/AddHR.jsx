import React, { useState } from "react";
import { addHR } from "../../api/adminApi";

const AddHR = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await addHR(form);

      setMessage("HR Added Successfully!");
      setForm({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Unable to add HR. Try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add HR</h2>

      {message && (
        <p className="mb-4 text-blue-600 font-semibold">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="border p-2 w-full"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border p-2 w-full"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border p-2 w-full"
          value={form.address}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add HR"}
        </button>
      </form>
    </div>
  );
};

export default AddHR;
