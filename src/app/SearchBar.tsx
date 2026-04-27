"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [kataKunci, setKataKunci] = useState("");
  const router = useRouter();

  const buatCarian = (e: any) => {
    e.preventDefault();
    if (kataKunci.trim() !== "") {
      // Bila tekan cari, dia bawa ke page /carian beserta kata kunci
      router.push(`/carian?q=${kataKunci}`);
    }
  };

  return (
    <form onSubmit={buatCarian} className="max-w-2xl mx-auto mb-10 flex gap-2">
      <input
        type="text"
        value={kataKunci}
        onChange={(e) => setKataKunci(e.target.value)}
        placeholder="Cari nama Akta, Enakmen, atau Ordinans..."
        className="w-full px-5 py-3 rounded-xl border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors shadow-sm"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-colors"
      >
        Cari
      </button>
    </form>
  );
}