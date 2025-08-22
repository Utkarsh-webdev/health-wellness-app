import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-green-50 to-blue-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Create Your Account 💙
        </h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={onChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={onChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={onChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
