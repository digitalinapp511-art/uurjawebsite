import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ADMIN_KEY = "123456"; // 🔐 Change this to your secret key

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (password === ADMIN_KEY) {
            localStorage.setItem("adminAuth", "true");
            localStorage.setItem("adminLoginTime", Date.now()); // unified key
            navigate("/admin/dashboard");
        } else {
            setError("Invalid Admin Key");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Admin Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Admin Key"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9d00]"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#ff9d00] text-white py-3 rounded-lg hover:opacity-90 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;