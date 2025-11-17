import React, { useState } from "react";
import { signup as signupApi } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await signupApi({ email, password, fullName });
      toast.success("Account created. Redirecting...");
      // backend returns { message, user, token }
      // store same shape as login flow in AuthContext via redirect to login
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handle} className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Sign up (Applicant)</h2>
        <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Full name" className="w-full border p-2 rounded mb-3" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded mb-3" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 rounded mb-3" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Create account</button>
      </form>
    </div>
  );
};

export default Signup;
