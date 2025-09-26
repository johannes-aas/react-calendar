import { EventCalendar } from "../components/EventCalendar"
import { EventCalendarHeader } from "../components/EventCalendarHeader";
import { useState, useEffect } from "react";
import { events } from "./events";
import { Sun } from "./icons/Sun";
import { Moon } from "./icons/Moon";
import { Github } from "./icons/Github";
import { Layout } from "./icons/Layout";
import { Responsive } from "./icons/Responsive";
import { MultiDay } from "./icons/MultiDay";
import { Palette } from "./icons/Palette";

export const Demo = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const today = new Date();
  const [view, setView] = useState<{ year: number; month: number }>({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  return (
    <div className="max-w-5xl mx-auto p-4 mb-8">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          React Event Calendar
        </h1>
        <div className="flex">
          <button 
            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-full p-3 transition-all duration-200" 
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <div className="flex justify-center">
            <a
              href="https://github.com/johannes-aas/react-calendar" // Replace with your actual GitHub URL
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors duration-200 rounded-full"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-neutral-400 text-lg">
        A modern, responsive calendar built with React, TypeScript, and Tailwind CSS
      </p>

      <div className="h-0.5 bg-gray-200 dark:bg-neutral-800 my-4"/>

      <EventCalendarHeader
        year={view.year}
        month={view.month}
        onNavigate={(year, month) => setView({ year, month })}
      />
      <EventCalendar year={view.year} month={view.month} events={events} />
      
      <div className="bg-gray-100 dark:bg-neutral-900 mt-20 mb-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-4 p-5 bg-white dark:bg-neutral-800 rounded-lg">
              <MultiDay width={30} height={30} className="text-blue-500" />
              <span className="text-gray-700 dark:text-white text-lg">
                Multi-day event support
              </span>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white dark:bg-neutral-800 rounded-lg">
              <Layout width={30} height={30} className="text-green-500" />
              <span className="text-gray-700 dark:text-white text-lg">
                Smart layout
              </span>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white dark:bg-neutral-800 rounded-lg">
              <Responsive width={30} height={30} className="text-purple-500" />
              <span className="text-gray-700 dark:text-white text-lg">
                Fully responsive
              </span>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white dark:bg-neutral-800 rounded-lg">
              <Moon width={30} height={30} className="text-indigo-500" />
              <span className="text-gray-700 dark:text-white text-lg">
                Dark mode support
              </span>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white dark:bg-neutral-800 rounded-lg">
              <Palette width={30} height={30} className="text-pink-500 flex-shrink-0" />
              <span className="text-gray-700 dark:text-white text-lg">
                Customizable color-coded categories
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Built with:
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                React
              </span>
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full text-sm font-medium">
                Tailwind CSS
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                Floating UI
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};