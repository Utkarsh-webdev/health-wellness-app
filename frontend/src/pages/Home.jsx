// src/pages/Home.jsx
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Info,
  Activity,
  Brain,
  BarChart3,
  Users,
  Stethoscope,
  ShieldCheck,
} from "lucide-react"; // ✅ Added icons for features

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-green-600">HealthSync</h1>
        <nav>
          <Link
            to="/login"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6 bg-gradient-to-b from-white to-blue-50">
        <h2 className="text-4xl font-bold mb-4">
          Your Personal <span className="text-green-600">Wellness</span> Companion
        </h2>
        <p className="text-gray-600 max-w-2xl mb-6">
          Track your health, get AI-powered recommendations, and connect with a
          community that cares about your wellness journey.
        </p>
        <div className="flex gap-4">
          {/* Start Your Journey Button */}
          <Link
            to="/register"
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-transform duration-300 hover:scale-105"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Learn More Button */}
          <Link
            to="/login"
            className="flex items-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-transform duration-300 hover:scale-105"
          >
            Learn More
            <Info className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 p-10 max-w-6xl mx-auto">
        {[
          {
            title: "Biometric Tracking",
            desc: "Track weight, heart rate, sleep, and more with biometric data integration.",
            icon: <Activity className="w-8 h-8 text-green-600" />,
          },
          {
            title: "AI Recommendations",
            desc: "Get personalized wellness insights powered by AI.",
            icon: <Brain className="w-8 h-8 text-green-600" />,
          },
          {
            title: "Progress Analytics",
            desc: "Visualize your health journey with reports and progress tracking.",
            icon: <BarChart3 className="w-8 h-8 text-green-600" />,
          },
          {
            title: "Community Support",
            desc: "Join like-minded individuals for shared wellness goals.",
            icon: <Users className="w-8 h-8 text-green-600" />,
          },
          {
            title: "Expert Guidance",
            desc: "Book sessions with certified professionals.",
            icon: <Stethoscope className="w-8 h-8 text-green-600" />,
          },
          {
            title: "Privacy First",
            desc: "Your health data is secure and protected.",
            icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-start gap-3 hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            {f.icon}
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-green-600 text-white text-center py-12">
        <h3 className="text-2xl font-bold mb-4">Ready to transform your health?</h3>
        <p className="mb-6">
          Join thousands of users who have already started their wellness journey
        </p>
        <Link
          to="/register"
          className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
        >
          Start Free Today
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-4">
        © 2025 HealthSync. All rights reserved.
      </footer>
    </div>
  );
}
