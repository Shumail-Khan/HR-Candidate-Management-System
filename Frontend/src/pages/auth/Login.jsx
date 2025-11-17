import React, { useState, useContext } from "react";
import { login as loginApi } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handle = async (e) => {
        e.preventDefault();
        try {
            const res = await loginApi({ email, password });
            login(res.data); // expects res.data = { user: {id,email,role}, token }
            toast.success("Logged in");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handle} className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded mb-3" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 rounded mb-3" />
                <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
