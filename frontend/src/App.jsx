// App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import "./index.css";
import { useAuth } from "./context/AuthContext"; // ✅ use AuthContext

function App() {
  const { user } = useAuth(); // ✅ get user from context
  const location = useLocation();

  // Navbar should appear only on certain pages
  const showNavbarRoutes = ["/dashboard", "/profile", "/community"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      {/* Navbar only on dashboard/profile/community */}
      {showNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/community"
          element={
            <ProtectedRoute user={user}>
              <Community />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
