import SearchBar from "./SearchBar"; // <-- Kita panggil fail kotak carian tadi

async function getNegeri() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/negeris`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export default async function Home() {
  const senaraiNegeri = await getNegeri();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto pt-8">
        
        <h1 className="text-4xl font-bold text-center text-blue-900 dark:text-blue-400 mb-3">
          Portal Rujukan Undang-Undang Malaysia
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-lg">
          Sistem rujukan pantas Akta, Enakmen, dan Hukum Syarak
        </p>

        {/* INI KOTAK CARIAN KITA */}
        <SearchBar />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {senaraiNegeri.map((negeri: any) => (
            <a 
              href={`/negeri/${negeri.documentId}`} 
              key={negeri.id}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all cursor-pointer group"
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 text-center">
                {negeri.Nama_Negeri}
              </h2>
            </a>
          ))}
        </div>

        {senaraiNegeri.length === 0 && (
          <p className="text-center text-red-500 dark:text-red-400 mt-10">
            Tiada data negeri ditemui. Pastikan Strapi sedang berjalan.
          </p>
        )}

      </div>
    </main>
  );
}