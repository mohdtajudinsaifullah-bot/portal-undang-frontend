import Link from "next/link";

export default async function LamanCarian({ searchParams }: any) {
  // Ambil kata kunci dari URL (contoh: ?q=Keluarga)
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  // Kita arahkan Strapi untuk tapis data ($containsi = cari ayat yang ada kaitan tanpa kisah huruf besar/kecil)
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/akta-enakmen-ordinans?filters[Tajuk_Undang_Undang][$containsi]=${query}&populate=*`, { 
    cache: 'no-store' 
  });
  const json = await res.json();
  const senaraiAkta = json.data || [];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 p-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium mb-6 inline-block">
          &larr; Kembali ke Laman Utama
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 border-b dark:border-slate-700 pb-4">
          Keputusan Carian: "{query}"
        </h1>

        <div className="flex flex-col gap-4">
          {senaraiAkta.length > 0 ? (
            senaraiAkta.map((akta: any) => (
              <Link 
                href={`/akta/${akta.documentId}`}
                key={akta.id}
                className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                  {akta.Tajuk_Undang_Undang}
                </h2>
                <div className="mt-3 inline-block bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-sm px-3 py-1 rounded-full font-medium mr-2">
                  {akta.Nombor_Rujukan}
                </div>
                <div className="mt-3 inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm px-3 py-1 rounded-full font-medium">
                  Tahun {akta.Tahun}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-slate-800 p-6 rounded-lg text-center">
              Harap maaf, tiada Akta atau Enakmen yang sepadan dengan kata kunci "{query}".
            </p>
          )}
        </div>

      </div>
    </main>
  );
}