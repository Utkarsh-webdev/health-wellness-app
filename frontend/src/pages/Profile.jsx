import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after logout
import { User, Lock, Save, Dumbbell, ClipboardPlus, LogOut } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("healthSyncUser"));

  // State to manage form data for profile settings
  const [formData, setFormData] = useState({
    height: "",
    goalWeight: "",
    activityLevel: "",
    fitnessGoals: [],
    medicalConditions: [],
    dietaryRestrictions: [],
  });

  // Options
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

  // Multi-select toggle
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

  // Save handler
  const handleSave = () => {
    console.log("Profile saved:", formData);
    alert("Profile saved successfully ✅");
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("healthSyncUser");
    navigate("/login"); // redirect to login
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4 font-sans">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
      <p className="text-gray-500">
        Manage your health information and preferences for personalized
        recommendations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-sm p-6 border border-gray-200 space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700">
              {user?.name?.[0].toUpperCase()}
            </div>
            <h2 className="mt-3 font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          {/* Sidebar Buttons */}
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
                  className="w-full appearance-none border border-gray-300 rounded-full px-4 py-2 
                 text-gray-700 bg-white shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full appearance-none border border-gray-300 rounded-full px-4 py-2 
                 text-gray-700 bg-white shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-green-500"
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
      className="w-full appearance-none border border-gray-300 rounded-full px-4 py-2 
                 text-gray-700 bg-white shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-green-500"
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

    {/* Dropdown arrow */}
    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-500 pointer-events-none">
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
            <p className="text-sm font-medium text-gray-600">
              Select your fitness goals (multiple allowed)
            </p>
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
            <p className="text-sm font-medium text-gray-600">
              Medical Conditions (optional)
            </p>
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
              Dietary Restrictions (optional)
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
