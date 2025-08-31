import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import api from "../lib/api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/users/login", form);
      localStorage.setItem("healthSyncUser", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      await api.post("/users/forgot-password", { email: resetEmail });
      alert("Password reset link sent to your email!");
      setForgotModal(false);
      setResetEmail("");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to send reset email");
      console.error(err);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-50 to-green-100 px-4 relative">
      <div className="relative bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-full max-w-md border border-green-100">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white text-3xl shadow-md">
          🌱
        </div>

        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Welcome Back 🌿
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Log in to continue your wellness journey ✨
        </p>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-3 top-3 text-gray-400 group-focus-within:text-green-500 transition" size={18} />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={onChange}
              required
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition shadow-sm hover:shadow-md"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-green-500 transition" size={18} />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={onChange}
              required
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition shadow-sm hover:shadow-md"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium hover:scale-[1.02] transition-transform shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between mt-3 text-sm">
          <span
            onClick={() => setForgotModal(true)}
            className="text-green-600 font-medium cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>
          <span
            onClick={() => navigate("/register")}
            className="text-green-600 font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-xl">
            <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
              Reset Password
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Enter your email to receive a reset link ✉️
            </p>

            <form onSubmit={resetPasswordHandler} className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-3 top-3 text-gray-400 group-focus-within:text-green-500 transition" size={18} />
                <input
                  type="email"
                  placeholder="Email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition shadow-sm hover:shadow-md"
                />
              </div>

              <button
                disabled={resetLoading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium hover:scale-[1.02] transition-transform shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {resetLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <span
              onClick={() => setForgotModal(false)}
              className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-green-600 font-bold text-lg"
            >
              ×
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
