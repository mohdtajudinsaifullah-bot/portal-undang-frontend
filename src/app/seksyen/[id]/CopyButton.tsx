"use client"; // Ini arahan beritahu Next.js yang ni adalah fungsi interaktif kat browser
import { useState } from "react";

export default function CopyButton({ teks }: { teks: string }) {
  const [berjaya, setBerjaya] = useState(false);

  const copyKeClipboard = () => {
    // Fungsi sistem untuk salin teks
    navigator.clipboard.writeText(teks);
    
    // Tukar butang jadi hijau sekejap
    setBerjaya(true);
    setTimeout(() => setBerjaya(false), 2000); // Lepas 2 saat dia kembali asal
  };

  return (
    <button
      onClick={copyKeClipboard}
      className={`mt-4 w-full sm:w-auto font-bold py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all flex justify-center items-center gap-2 ${
        berjaya ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-800 hover:bg-gray-900 text-white'
      }`}
    >
      {berjaya ? "✅ Teks Berjaya Disalin!" : "📋 Salin Teks Undang-Undang"}
    </button>
  );
}