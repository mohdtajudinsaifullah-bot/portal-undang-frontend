export default async function SenaraiAkta({ params }: any) {
  const resolvedParams = await params;
  const negeriId = resolvedParams.id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/negeris/${negeriId}?populate=*`, { cache: 'no-store' });
  const json = await res.json();
  const negeri = json.data;

  if (!negeri) return <div className="p-10 text-center dark:text-white">Harap maaf, rekod tidak dijumpai.</div>;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium mb-6 inline-block">
          &larr; Kembali ke Senarai Negeri
        </a>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 border-b dark:border-slate-700 pb-4">
          Senarai Undang-Undang (Negeri {negeri.Nama_Negeri})
        </h1>

        <div className="flex flex-col gap-4">
          {negeri.akta_enakmen_ordinans && negeri.akta_enakmen_ordinans.length > 0 ? (
            negeri.akta_enakmen_ordinans.map((akta: any) => (
              <a 
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
              </a>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-slate-800 p-6 rounded-lg text-center">
              Belum ada enakmen didaftarkan untuk negeri ini.
            </p>
          )}
        </div>

      </div>
    </main>
  );
}