import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../components/Card";
import { ChartArea } from "lucide-react";

const Progress = () => {
  // Weekly data
  const data = [
    { day: "Mon", steps: 2000, goal: 10000 },
    { day: "Tue", steps: 5000, goal: 10000 },
    { day: "Wed", steps: 3000, goal: 10000 },
    { day: "Thu", steps: 7000, goal: 10000 },
    { day: "Fri", steps: 10000, goal: 10000 },
    { day: "Sat", steps: 8000, goal: 10000 },
    { day: "Sun", steps: 6000, goal: 10000 },
  ];

  // Compute cumulative steps
  const cumulativeData = data.map((d, i) => ({
    ...d,
    cumulative: data.slice(0, i + 1).reduce((sum, x) => sum + x.steps, 0),
  }));

  const todayIndex = new Date().getDay() - 1; // Mon=0

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <ChartArea size={28} /> Weekly Progress
      </h2>

      <Card className="p-6 bg-white/90 dark:bg-gray-800/60 rounded-2xl shadow-md">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={cumulativeData} tabIndex={-1}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              formatter={(value, name) => [
                value,
                name === "steps" ? "Steps" : name === "goal" ? "Goal" : "Cumulative",
              ]}
            />
            {/* Daily Steps */}
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
            {/* Goal */}
            <Line
              type="monotone"
              dataKey="goal"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
            {/* Cumulative Steps */}
            <Line
              type="monotone"
              dataKey="cumulative"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Progress;
