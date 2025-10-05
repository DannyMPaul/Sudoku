"use client";

import { SudokuGrid } from "@/components/SudokuGrid";
import { DifficultySelector } from "@/components/DifficultySelector";
import { useGameStore } from "@/store/gameStore";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const { initializeGame, isComplete, mistakes, revealed, setRevealed } =
    useGameStore();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) {
        return saved === "dark";
      }
      return true; // default to dark
    }
    return true;
  });

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0a1628] transition-colors duration-300">
      <main className="container mx-auto px-6 py-8 flex flex-col items-center justify-center min-h-screen max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-6 mb-4">
            <h1 className="text-6xl font-black tracking-tight text-[#1e3a8a] dark:text-[#fbbf24]">
              SUDOKU
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-3 hover:scale-110 ${
                isDarkMode
                  ? "bg-[#1e3a8a] border-[#fbbf24]"
                  : "bg-white border-[#1e3a8a]"
              }`}
            >
              {isDarkMode ? (
                <SunIcon className="w-8 h-8 text-[#fbbf24]" />
              ) : (
                <MoonIcon className="w-8 h-8 text-[#1e3a8a]" />
              )}
            </button>
          </div>
          <p className="text-xl text-[#1e3a8a]/70 dark:text-[#fbbf24]/70 font-medium">
            Master the Classic Number Puzzle
          </p>
        </div>

        {/* Game Container */}
        <div className="bg-white dark:bg-[#1e3a8a] rounded-3xl shadow-2xl p-8 w-full max-w-4xl border-4 border-[#1e3a8a] dark:border-[#fbbf24]">
          {/* Game Info Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <DifficultySelector />
              <div className="px-4 py-2 bg-gray-100 dark:bg-[#0a1628] rounded-xl border-2 border-[#1e3a8a] dark:border-[#fbbf24]">
                <span className="text-[#1e3a8a] dark:text-[#fbbf24] font-semibold">
                  Mistakes:{" "}
                </span>
                <span className="font-black text-xl text-red-600 dark:text-red-400">
                  {mistakes}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setRevealed(!revealed)}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 ${
                  revealed
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e3a8a]"
                }`}
              >
                {revealed ? "HIDE ERRORS" : "REVEAL ERRORS"}
              </button>
              <button
                onClick={initializeGame}
                className="px-6 py-3 bg-[#1e3a8a] dark:bg-[#fbbf24] hover:bg-[#1e40af] dark:hover:bg-[#f59e0b] text-white dark:text-[#1e3a8a] rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                NEW GAME
              </button>
            </div>
          </div>

          {/* Completion Message */}
          {isComplete && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-4 border-green-500 dark:border-green-400 rounded-2xl">
              <p className="text-center text-2xl font-black text-green-700 dark:text-green-400 animate-bounce">
                🎉 AMAZING! PUZZLE SOLVED! 🎉
              </p>
            </div>
          )}

          {/* Game Grid */}
          <div className="flex justify-center mb-6">
            <SudokuGrid />
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="bg-gray-50 dark:bg-[#0a1628] rounded-2xl p-4 border-2 border-[#1e3a8a]/20 dark:border-[#fbbf24]/20">
            <h3 className="text-sm font-bold text-[#1e3a8a] dark:text-[#fbbf24] mb-2 text-center">
              ⌨️ KEYBOARD CONTROLS
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <kbd className="px-2 py-1 bg-white dark:bg-[#1e3a8a] border-2 border-[#1e3a8a] dark:border-[#fbbf24] rounded-lg font-mono font-bold text-[#1e3a8a] dark:text-[#fbbf24] text-sm">
                  1-9
                </kbd>
                <p className="text-xs mt-1 text-[#1e3a8a]/70 dark:text-[#fbbf24]/70 font-medium">
                  Enter Number
                </p>
              </div>
              <div>
                <kbd className="px-2 py-1 bg-white dark:bg-[#1e3a8a] border-2 border-[#1e3a8a] dark:border-[#fbbf24] rounded-lg font-mono font-bold text-[#1e3a8a] dark:text-[#fbbf24] text-sm">
                  ←↑→↓
                </kbd>
                <p className="text-xs mt-1 text-[#1e3a8a]/70 dark:text-[#fbbf24]/70 font-medium">
                  Navigate
                </p>
              </div>
              <div>
                <kbd className="px-2 py-1 bg-white dark:bg-[#1e3a8a] border-2 border-[#1e3a8a] dark:border-[#fbbf24] rounded-lg font-mono font-bold text-[#1e3a8a] dark:text-[#fbbf24] text-sm">
                  SPACE
                </kbd>
                <p className="text-xs mt-1 text-[#1e3a8a]/70 dark:text-[#fbbf24]/70 font-medium">
                  Clear Cell
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
