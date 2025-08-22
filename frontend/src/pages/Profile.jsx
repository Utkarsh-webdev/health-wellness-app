import { useState } from "react";
import { User, Lock, Save, Dumbbell, ClipboardPlus } from "lucide-react";

const Profile = () => {
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

  // Options for Fitness Goals, matching the screenshot
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

  // Options for Medical Conditions, matching the screenshot
  const medicalOptions = [
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "Asthma",
    "Arthritis",
    "Depression",
    "Anxiety",
    "Sleep Disorders", // Changed from "Kidney Disease" to match screenshot
  ];

  // Options for Dietary Restrictions, matching the screenshot
  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Low-Sodium",
    "Keto",
    "Paleo",
    "Halal", // Added to match screenshot
    "Kosher", // Added to match screenshot
    "Nut Allergies", // Changed from "Nut Allergy" and reordered to match screenshot
  ];

  // Handler for multi-select buttons (fitness goals, medical conditions, dietary restrictions)
  const handleMultiSelect = (field, value) => {
    setFormData((prev) => {
      const current = prev[field];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((item) => item !== value) // Remove if already selected
          : [...current, value], // Add if not selected
      };
    });
  };

  // Handler for saving the profile data
  const handleSave = () => {
    console.log("Profile saved:", formData);
    // In a real application, you would send this data to a backend or save it
    // Using alert for demonstration as per original code, but generally prefer custom modals.
    alert("Profile saved successfully ✅");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-3 font-sans"> {/* Added font-sans for consistent typography */}
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
      <p className="text-gray-500">
        Manage your health information and preferences for personalized
        recommendations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar - User Info and Navigation */}
        <div className="md:col-span-1 bg-white rounded-xl shadow p-6 border space-y-6">
          <div className="flex flex-col items-center text-center">
            {/* User's initial in a circle */}
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700">
              {user?.name?.[0].toUpperCase()}
            </div>
            {/* User Name and Email */}
            <h2 className="mt-3 font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          {/* Sidebar Navigation Buttons */}
          <div className="space-y-3">
            <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <User size={16} /> Account Settings
            </button>
            <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <Lock size={16} /> Privacy Settings
            </button>
            <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200">
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content - Profile Form */}
        <div className="md:col-span-3 space-y-6">
          {/* Basic Information Section */}
          <div className="bg-white rounded-xl shadow p-6 border space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-gray-800">
              <User size={18} /> Basic Information
            </h3>
            <div class="flex flex-col">
  <label for="height" class="mb-2 text-gray-700 font-medium">Height (cm)</label>
              <input
                type="number"
                placeholder="Height (cm)"
                className="rounded-full border border-gray-300 px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Goal Weight (kg)"
                className="rounded-full border border-gray-300 px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={formData.goalWeight}
                onChange={(e) =>
                  setFormData({ ...formData, goalWeight: e.target.value })
                }
              />
            </div>
            <select
              className="border border-gray-300 rounded-md p-2 w-full bg-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              value={formData.activityLevel}
              onChange={(e) =>
                setFormData({ ...formData, activityLevel: e.target.value })
              }
            >
              <option value="">Select your activity level</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="active">Very Active</option>
            </select>
          </div>

          {/* Fitness Goals Section */}
          
          <div className="bg-white rounded-xl shadow p-6 border space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-gray-800">
              <Dumbbell size={18}/>Fitness Goals</h3>            
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

          {/* Medical Information Section */}
          <div className="bg-white rounded-xl shadow p-6 border space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-gray-800">
              <ClipboardPlus size={18}/>Medical Information</h3>
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

          {/* Save Profile Button */}
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors duration-200 shadow-md"
          >
            <Save size={16} /> Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
