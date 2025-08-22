import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, User, LogOut, Settings, Sliders } from "lucide-react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("healthSyncUser"));
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/progress", label: "Progress" },
    { path: "/community", label: "Community" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("healthSyncUser");
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-green-500 text-2xl">❤️</span>
          <span className="font-bold text-xl text-gray-800">HealthSync</span>
        </Link>

        {/* Center Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1 rounded-full font-medium transition ${
                  isActive
                    ? "bg-green-100 text-green-600"
                    : "text-gray-700 hover:text-green-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Notification */}
          <div className="relative">
            <Bell className="text-gray-600" size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          {/* User Avatar + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold">
                {getInitials(user?.name)}
              </div>
              <span className="text-gray-700 font-medium">{user?.name}</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    <User size={16} /> Profile Settings
                  </Link>
                  <Link
                    to="/preferences"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    <Sliders size={16} /> Preferences
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 w-full text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
