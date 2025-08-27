import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import {
  Droplets,
  Heart,
  Moon,
  Footprints,
  Brain,
  RefreshCcw,
  Trophy,
  ChartArea,
  Wind,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const user = JSON.parse(localStorage.getItem("healthSyncUser"));

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else if (hour < 21) setGreeting("Good evening");
    else setGreeting("Good night");
  }, []);

  const data = [
    { day: "Mon", steps: 2000, goal: 10000 },
    { day: "Tue", steps: 5000, goal: 10000 },
    { day: "Wed", steps: 3000, goal: 10000 },
    { day: "Thu", steps: 7000, goal: 10000 },
    { day: "Fri", steps: 10000, goal: 10000 },
    { day: "Sat", steps: 8000, goal: 10000 },
    { day: "Sun", steps: 6000, goal: 10000 },
  ];

  const communityPosts = [
    {
      name: "Kaif Kumar",
      avatar: "https://i.pravatar.cc/100?img=1",
      message: "Just finished a 5k run 🏃‍♂️💨",
      date: "Aug 17, 2025",
    },
    {
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/100?img=2",
      message: "Drank 2.5L of water today 💧 Feeling great!",
      date: "Aug 18, 2025",
    },
    {
      name: "Mark Smith",
      avatar: "https://i.pravatar.cc/100?img=3",
      message: "Finally hit 10k steps for the first time 🎉",
      date: "Aug 19, 2025",
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* Greeting */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        {greeting},{" "}
        <span className="text-blue-600 dark:text-blue-400">
          {user?.name || "Guest"}
        </span>{" "}
        🌟
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 flex items-center justify-between bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-lg transition">
              <div>
                <p className="text-sm text-gray-500">Daily Steps</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                <p className="text-xs text-gray-400">Goal: 10,000</p>
              </div>
              <Footprints className="text-blue-500" size={30} />
            </Card>

            <Card className="p-6 flex items-center justify-between bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-lg transition">
              <div>
                <p className="text-sm text-gray-500">Heart Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">72 BPM</p>
                <p className="text-xs text-gray-400">Resting</p>
              </div>
              <Heart className="text-red-500" size={30} />
            </Card>

            <Card className="p-6 flex items-center justify-between bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-lg transition">
              <div>
                <p className="text-sm text-gray-500">Water Intake</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1.8L</p>
                <p className="text-xs text-gray-400">Goal: 2.5L</p>
              </div>
              <Droplets className="text-blue-400" size={30} />
            </Card>

            <Card className="p-6 flex items-center justify-between bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-lg transition">
              <div>
                <p className="text-sm text-gray-500">Sleep Quality</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">7.5h</p>
                <p className="text-xs text-gray-400">Good</p>
              </div>
              <Moon className="text-purple-400" size={30} />
            </Card>
          </div>

          {/* AI Recommendations */}
          <Card className="p-6 bg-white/90 dark:bg-gray-800/60 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Brain className="text-gray-600 dark:text-gray-300" size={28} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Recommendations
                </h3>
              </div>
              <button className="flex items-center gap-1 text-blue-500 text-sm hover:underline">
                <RefreshCcw size={14} /> Refresh
              </button>
            </div>

            <div className="space-y-3">
              {/* Recommendation Cards */}
              {[
                { title: "Deep Breathing", desc: "Practice 5 minutes of deep breathing to reduce stress and improve focus.", icon: Wind, bg: "purple", link: "/profile" },
                { title: "Daily Walk", desc: "Take a 30-minute brisk walk to boost your daily activity and cardiovascular health.", icon: Footprints, bg: "green", link: "/profile" },
                { title: "Hydration Focus", desc: "Increase your water intake with herbal teas and water-rich foods to stay hydrated.", icon: Droplets, bg: "blue", link: "/profile" },
              ].map((rec, idx) => (
                <div key={idx} className={`p-4 rounded-xl bg-${rec.bg}-50 dark:bg-${rec.bg}-900/40 flex items-start gap-3 hover:bg-${rec.bg}-100 dark:hover:bg-${rec.bg}-800/60 transition`}>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-${rec.bg}-500 text-white`}>
                    <rec.icon size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{rec.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{rec.desc}</p>
                    <Link to={rec.link} className="text-blue-500 text-sm">View Details →</Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Progress Chart */}
          <Card className="p-6 bg-white/90 dark:bg-gray-800/60 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ChartArea /> Weekly Progress
            </h3>
            {(() => {
              const cumulativeData = data.map((d, i) => ({
                ...d,
                cumulative: data.slice(0, i + 1).reduce((sum, x) => sum + x.steps, 0),
              }));
              const todayIndex = new Date().getDay() - 1;
              return (
                <ResponsiveContainer width="100%" height={300} style={{ outline: "none" }}>
                  <LineChart data={cumulativeData} tabIndex={-1}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip formatter={(value, name) => [value, name === "steps" ? "Steps" : name === "goal" ? "Goal" : "Cumulative"]} />
                    <Line type="monotone" dataKey="steps" stroke="#3b82f6" strokeWidth={3} dot={({ cx, cy, index }) => (
                      <circle cx={cx} cy={cy} r={index === todayIndex ? 8 : 5} fill={index === todayIndex ? "#f59e0b" : "#3b82f6"} />
                    )} />
                    <Line type="monotone" dataKey="goal" stroke="#10b981" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="cumulative" stroke="#f97316" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              );
            })()}
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <Card className="p-6 bg-white/90 dark:bg-gray-800/60 rounded-2xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-left mb-4 text-gray-900 dark:text-white">
              Recent Achievements
            </h3>
            <Trophy className="mx-auto text-gray-400" size={40} />
            <p className="mt-3 text-gray-700 dark:text-gray-300 font-medium">No achievements yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Keep logging data to earn badges!</p>
            <a href="#" className="mt-4 inline-block text-green-600 font-medium text-sm hover:underline">
              View All Achievements →
            </a>
          </Card>

          <Card className="p-6 bg-white/90 dark:bg-gray-800/60 rounded-2xl shadow-md">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Community</h3>
              <Link to="/community" className="text-green-600 text-sm font-medium hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {communityPosts.slice(0, 3).map((post, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <img src={post.avatar} alt={post.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{post.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{post.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
