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
import axios from "axios";

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const user = JSON.parse(localStorage.getItem("healthSyncUser"));

  // Live stats
  const [steps, setSteps] = useState(2500);
  const [heartRate, setHeartRate] = useState(72);
  const [water, setWater] = useState(1.2);
  const [sleep] = useState(7.5);

  // Community posts
  const [communityPosts, setCommunityPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Greeting message
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else if (hour < 21) setGreeting("Good evening");
    else setGreeting("Good night");
  }, []);

  // Simulated live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prev) => Math.min(prev + Math.floor(Math.random() * 200), 10000));
      setHeartRate(65 + Math.floor(Math.random() * 35));
      setWater((prev) => Math.min((parseFloat(prev) + 0.05).toFixed(1), 2.5));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Fetch recent community posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/posts");
        // show only 3 most recent
        setCommunityPosts(data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching community posts:", err.message);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []);

  // Reusable Stat Card
  const StatCard = ({ label, value, unit, goal, icon, color }) => {
    const percent = goal ? Math.min((value / goal) * 100, 100) : 100;

    return (
      <Card className="p-6 flex flex-col justify-between bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-xl transition duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value} {unit}
            </p>
            {goal && (
              <p className="text-xs text-gray-400">Goal: {goal} {unit}</p>
            )}
          </div>
          {icon}
        </div>
        {goal && (
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percent}%`, backgroundColor: color }}
            />
          </div>
        )}
      </Card>
    );
  };

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
          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              label="Daily Steps"
              value={steps}
              unit=""
              goal={10000}
              icon={<Footprints className="text-blue-500" size={30} />}
              color="#3b82f6"
            />
            <StatCard
              label="Heart Rate"
              value={heartRate}
              unit="BPM"
              icon={<Heart className="text-red-500" size={30} />}
              color="#ef4444"
            />
            <StatCard
              label="Water Intake"
              value={water}
              unit="L"
              goal={2.5}
              icon={<Droplets className="text-blue-400" size={30} />}
              color="#60a5fa"
            />
            <StatCard
              label="Sleep Quality"
              value={sleep}
              unit="h"
              goal={8}
              icon={<Moon className="text-purple-400" size={30} />}
              color="#a78bfa"
            />
          </div>

          {/* AI Recommendations */}
          <Card className="p-6 bg-white/90 dark:bg-gray-800/70 rounded-2xl shadow-md">
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
              {[
                {
                  title: "Deep Breathing",
                  desc: "Practice 5 minutes of deep breathing to reduce stress and improve focus.",
                  icon: <Wind size={20} />,
                  bg: "bg-purple-500",
                  light: "bg-purple-50 dark:bg-purple-900/40 hover:bg-purple-100 dark:hover:bg-purple-800/60",
                },
                {
                  title: "Daily Walk",
                  desc: "Take a 30-minute brisk walk to boost your daily activity and cardiovascular health.",
                  icon: <Footprints size={20} />,
                  bg: "bg-green-500",
                  light: "bg-green-50 dark:bg-green-900/40 hover:bg-green-100 dark:hover:bg-green-800/60",
                },
                {
                  title: "Hydration Focus",
                  desc: "Increase your water intake with herbal teas and water-rich foods to stay hydrated.",
                  icon: <Droplets size={20} />,
                  bg: "bg-blue-500",
                  light: "bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-800/60",
                },
              ].map((rec, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl flex items-start gap-3 transition ${rec.light}`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${rec.bg}`}>
                    {rec.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{rec.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{rec.desc}</p>
                    <Link to="/profile" className="text-blue-500 text-sm">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Progress Chart */}
          <Card className="p-6 bg-white/90 dark:bg-gray-800/70 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ChartArea size={20} /> Weekly Progress
            </h3>

            {(() => {
              const data = [
                { day: "Mon", steps: 2000, goal: 10000 },
                { day: "Tue", steps: 5000, goal: 10000 },
                { day: "Wed", steps: 3000, goal: 10000 },
                { day: "Thu", steps: 7000, goal: 10000 },
                { day: "Fri", steps: 10000, goal: 10000 },
                { day: "Sat", steps: 8000, goal: 10000 },
                { day: "Sun", steps: 6000, goal: 10000 },
              ];

              const cumulativeData = data.map((d, i) => ({
                ...d,
                cumulative: data.slice(0, i + 1).reduce((sum, x) => sum + x.steps, 0),
              }));

              const todayIndex = new Date().getDay() - 1;

              return (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cumulativeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="steps"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={({ cx, cy, index }) => (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={index === todayIndex ? 8 : 5}
                          fill={index === todayIndex ? "#f59e0b" : "#3b82f6"}
                        />
                      )}
                    />
                    <Line
                      type="monotone"
                      dataKey="goal"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="cumulative"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              );
            })()}
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <Card className="p-6 bg-white/90 dark:bg-gray-800/70 rounded-2xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-left mb-4 text-gray-900 dark:text-white">
              Recent Achievements
            </h3>
            <Trophy className="mx-auto text-gray-400" size={40} />
            <p className="mt-3 text-gray-700 dark:text-gray-300 font-medium">
              No achievements yet
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Keep logging data to earn badges!
            </p>
            <a
              href="#"
              className="mt-4 inline-block text-green-600 font-medium text-sm hover:underline"
            >
              View All Achievements →
            </a>
          </Card>

          {/* Community */}
          <Card className="p-6 bg-white/90 dark:bg-gray-800/70 rounded-2xl shadow-md">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Community
              </h3>
              <Link
                to="/community"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {loadingPosts ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Loading posts...
                </p>
              ) : communityPosts.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  No community posts yet.
                </p>
              ) : (
                communityPosts.map((post) => (
                  <div key={post._id} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                      {post.user?.name ? post.user.name.slice(0, 2).toUpperCase() : "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {post.user?.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {post.content}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
