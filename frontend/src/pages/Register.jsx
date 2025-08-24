import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import api from "../lib/api";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/users/register", form);
      localStorage.setItem("healthSyncUser", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-50 to-green-100 px-4">
      {/* Register Card */}
      <div className="relative bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-full max-w-md border border-green-100">
        {/* Wellness Emoji/Icon */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white text-3xl shadow-md">
          🌿
        </div>

        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Start your wellness journey today ✨
        </p>

        <form onSubmit={submitHandler} className="space-y-4">
          {/* Full Name */}
          <div className="relative group">
            <User className="absolute left-3 top-3 text-gray-400 group-focus-within:text-green-500 transition" size={18} />
            <input
              name="name"
              placeholder="Full Name"
              onChange={onChange}
              required
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition shadow-sm hover:shadow-md"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-3 top-3 text-gray-400 group-focus-within:text-green-500 transition" size={18} />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={onChange}
              required
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition shadow-sm hover:shadow-md"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-green-500 transition" size={18} />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={onChange}
              required
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition shadow-sm hover:shadow-md"
            />
          </div>

          {/* Register Button */}
          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full font-semibold hover:scale-[1.02] transition-transform shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 font-medium cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
