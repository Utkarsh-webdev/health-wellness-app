import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Save,
  Dumbbell,
  ClipboardPlus,
  LogOut,
  Info,
  Heart,
  Sun,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  Moon,
  TrendingUp
} from "lucide-react";


const Profile = () => {
  const navigate = useNavigate();

  // Retrieve logged-in user
  const user = JSON.parse(localStorage.getItem("healthSyncUser"));

  // Profile form state
  const [formData, setFormData] = useState({
    email: user?.email || "",
    height: "",
    goalWeight: "",
    activityLevel: "",
    fitnessGoals: [],
    medicalConditions: [],
    dietaryRestrictions: [],
  });

  const [recommendations, setRecommendations] = useState([]);

  const fitnessOptions = [
    "Weight Loss",
    "Weight Gain",
    "Muscle Building",
    "Cardio Improvement",
    "Strength Training",
    "Flexibility",
    "General Health",
    "Stress Reduction",
    "Better Sleep",
    "Athletic Performance",
  ];

  const medicalOptions = [
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "Asthma",
    "Arthritis",
    "Depression",
    "Anxiety",
    "Sleep Disorders",
  ];

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Low-Sodium",
    "Keto",
    "Paleo",
    "Halal",
    "Kosher",
    "Nut Allergies",
  ];

  // Toggle for multi-select fields
  const handleMultiSelect = (field, value) => {
    setFormData((prev) => {
      const current = prev[field];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("healthSyncUser");
    navigate("/login");
  };

  // Save profile to backend
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("✅ Profile saved:", data);

      if (data.success) {
        alert("Profile saved successfully ✅");
        await loadRecommendations();
      }
    } catch (err) {
      console.error("❌ Error saving profile:", err);
      alert("Failed to save profile ❌");
    }
  };

  // Load recommendations from backend
  const loadRecommendations = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/profile/recommendations?email=${formData.email}`
      );
      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      console.error("❌ Failed to load recommendations:", err);
    }
  };

  // Auto-load profile + recommendations on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/profile?email=${formData.email}`
        );
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({ ...prev, ...data.profile }));
        }
        await loadRecommendations();
      } catch (err) {
        console.error("❌ Failed to load profile:", err);
      }
    };

    if (user?.email) loadProfile();
  }, [user?.email]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4 font-sans">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
      <p className="text-gray-500">
        Manage your health information and get personalized recommendations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-sm p-6 border border-gray-200 space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <h2 className="mt-3 font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <div className="space-y-3">
            <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition">
              <User size={16} /> Account Settings
            </button>
            <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition">
              <Lock size={16} /> Privacy Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="md:col-span-3 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-gray-800">
              <User size={18} /> Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-gray-700 text-sm font-medium">
                Height (cm)
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                />
              </label>

              <label className="block text-gray-700 text-sm font-medium">
                Goal Weight (kg)
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.goalWeight}
                  onChange={(e) =>
                    setFormData({ ...formData, goalWeight: e.target.value })
                  }
                />
              </label>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Activity Level
              </label>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.activityLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, activityLevel: e.target.value })
                  }
                >
                  <option value="">✨ Select your activity level</option>
                  <option value="sedentary">🪑 Sedentary</option>
                  <option value="light">🚶 Lightly Active</option>
                  <option value="moderate">🏃 Moderately Active</option>
                  <option value="active">🏋️ Very Active</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* Fitness Goals */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-gray-800">
              <Dumbbell size={18} /> Fitness Goals
            </h3>
            <div className="flex flex-wrap gap-2">
              {fitnessOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleMultiSelect("fitnessGoals", goal)}
                  className={`px-3 py-1 rounded-full border text-sm transition-all duration-200 ${
                    formData.fitnessGoals.includes(goal)
                      ? "bg-green-100 text-green-600 border-green-300"
                      : "text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Medical Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-gray-800">
              <ClipboardPlus size={18} /> Medical Information
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {medicalOptions.map((cond) => (
                <button
                  key={cond}
                  onClick={() => handleMultiSelect("medicalConditions", cond)}
                  className={`px-3 py-1 rounded-full border text-sm transition-all duration-200 ${
                    formData.medicalConditions.includes(cond)
                      ? "bg-red-100 text-red-600 border-red-300"
                      : "text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>

            <p className="text-sm font-medium text-gray-600">
              Dietary Restrictions
            </p>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((diet) => (
                <button
                  key={diet}
                  onClick={() => handleMultiSelect("dietaryRestrictions", diet)}
                  className={`px-3 py-1 rounded-full border text-sm transition-all duration-200 ${
                    formData.dietaryRestrictions.includes(diet)
                      ? "bg-blue-100 text-blue-600 border-blue-300"
                      : "text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors duration-200 shadow-md"
            >
              <Save size={16} /> Save Profile
            </button>
          </div>

          {/* Recommendations with icons */}
          {recommendations.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mt-6">
              <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <Info size={20} /> Personalized Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec, i) => {
  let Icon;
  if (rec.includes("underweight") || rec.includes("obese")) Icon = AlertTriangle;
  else if (rec.includes("healthy range")) Icon = CheckCircle2;
  else if (rec.includes("calorie deficit") || rec.includes("muscle building")) Icon = TrendingUp;
  else if (rec.includes("cardio") || rec.includes("heart")) Icon = Heart;
  else if (rec.includes("diet") || rec.includes("vegan") || rec.includes("nutrition")) Icon = Leaf;
  else if (rec.includes("sleep")) Icon = Moon;
  else if (rec.includes("active")) Icon = Sun;
  else Icon = Info;

                  return (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-green-50 transition"
                    >
                      <Icon size={20} className="text-green-600 mt-1" />
                      <p className="text-gray-700 text-sm leading-relaxed">{rec}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
