"use client";

import { useEffect, useState } from "react";
import StreakCard from "@/components/StreakCard";
import StudyButton from "@/components/StudyButton";
import StreakProgress from "@/components/StreakProgress";
import MotivationMessage from "@/components/MotivationMessage";
import StudyHeatmap from "@/components/StudyHeatmap";
import CursorEmojiTrail from "@/components/CursorEmojiTrail";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState({
    streak: 0,
    total: 0,
    lastDate: null as string | null,
  });

  const [history, setHistory] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const loadData = async () => {
    try {
      const streakRes = await fetch("/api/streak");
      const streakData = await streakRes.json();

      const historyRes = await fetch("/api/history");
      const historyData = await historyRes.json();

      setData(streakData);
      setHistory(historyData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center px-6 py-10 gap-6 
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      {/* Cursor Emoji Effect */}
      <CursorEmojiTrail />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-3">
        <h1 className="text-4xl font-bold">
          📊 Daily Learning Streak Tracker
        </h1>

        <p className="text-gray-500 dark:text-gray-300">
          Welcome back. Keep your learning streak alive.
        </p>

        {/* Day / Night Mode Button */}
        <button
          onClick={toggleMode}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? "☀ Day Mode" : "🌙 Night Mode"}
        </button>
      </div>

      {/* Stats Cards */}
      <StreakCard {...data} />

      {/* Motivation Message */}
      <MotivationMessage streak={data.streak} />

      {/* Weekly Progress */}
      <StreakProgress streak={data.streak} />

      {/* Heatmap */}
      <StudyHeatmap dates={history} />

      {/* Study Button */}
      <StudyButton refresh={loadData} />

      {/* History Button */}
      <Link
        href="/history"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        ⏱ View Study History
      </Link>
    </main>
  );
}