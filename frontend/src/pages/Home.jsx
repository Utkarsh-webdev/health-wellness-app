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
} from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Biometric Tracking",
      desc: "Track weight, heart rate, sleep, and more with biometric data integration.",
      icon: <Activity className="w-10 h-10 text-green-600" />,
    },
    {
      title: "AI Recommendations",
      desc: "Get personalized wellness insights powered by AI.",
      icon: <Brain className="w-10 h-10 text-green-600" />,
    },
    {
      title: "Progress Analytics",
      desc: "Visualize your health journey with reports and progress tracking.",
      icon: <BarChart3 className="w-10 h-10 text-green-600" />,
    },
    {
      title: "Community Support",
      desc: "Join like-minded individuals for shared wellness goals.",
      icon: <Users className="w-10 h-10 text-green-600" />,
    },
    {
      title: "Expert Guidance",
      desc: "Book sessions with certified professionals.",
      icon: <Stethoscope className="w-10 h-10 text-green-600" />,
    },
    {
      title: "Privacy First",
      desc: "Your health data is secure and protected.",
      icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-green-600">HealthSync</h1>
        <nav>
          <Link
            to="/register"
            className="bg-green-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-600 transition duration-300"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-24 px-6 relative">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Your Personal <span className="text-green-600">Wellness Companion</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mb-8">
          Track your health, get AI-powered recommendations, and connect with a
          community that cares about your wellness journey.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/register"
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform shadow-md"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-transform shadow-sm"
          >
            Learn More
            <Info className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-20">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 flex flex-col items-start gap-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-16 px-6">
        <h3 className="text-3xl font-bold mb-4">
          Ready to transform your health?
        </h3>
        <p className="mb-6 max-w-xl mx-auto">
          Join thousands of users who have already started their wellness journey.
        </p>
        <Link
          to="/register"
          className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
        >
          Start Free Today
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        © 2025 HealthSync. All rights reserved.
      </footer>
    </div>
  );
}
