import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, User, LogOut, Sliders, Menu, X } from "lucide-react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("healthSyncUser"));
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
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
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-green-500 text-2xl animate-pulse">❤️</span>
          <span className="font-bold text-xl text-gray-800 dark:text-gray-100">
            HealthSync
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${
                  isActive
                    ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Notifications"
          >
            <Bell className="text-gray-600 dark:text-gray-300" size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-700 text-green-600 dark:text-white font-bold">
                {getInitials(user?.name)}
              </div>
              <span className="hidden sm:block text-gray-700 dark:text-gray-200 font-medium">
                {user?.name}
              </span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fadeIn">
                {/* User Info */}
                <div className="px-4 py-3 border-b dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    <User size={16} /> Profile Settings
                  </Link>
                  <Link
                    to="/preferences"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    <Sliders size={16} /> Preferences
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-600/20"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {mobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-y-2 animate-slideDown">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-500"
                }`}
                onClick={() => setMobileMenu(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
