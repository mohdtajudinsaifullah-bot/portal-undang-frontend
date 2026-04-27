"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2"
    >
      {theme === 'dark' ? '☀️ Cerah' : '🌙 Gelap'}
    </button>
  );
}