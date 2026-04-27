export default async function SenaraiSeksyen({ params }: any) {
  const resolvedParams = await params;
  const aktaId = resolvedParams.id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/akta-enakmen-ordinans/${aktaId}?populate=seksyens`, {
    cache: 'no-store'
  });
  
  const json = await res.json();
  const akta = json.data;

  if (!akta) {
    return <div className="p-10 text-center text-red-500">Harap maaf, rekod Akta/Enakmen tidak dijumpai.</div>;
  }

  const seksyenTersusun = akta.seksyens 
    ? akta.seksyens.sort((a: any, b: any) => {
        return a.No_Seksyen.localeCompare(b.No_Seksyen, undefined, { 
          numeric: true, 
          sensitivity: 'base' 
        });
      })
    : [];

  return (
    // Tambah dark:bg-slate-900 untuk background utama
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 p-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium mb-6 inline-block">
          &larr; Kembali ke Senarai Negeri
        </a>

        {/* Tambah dark:bg-slate-800 dan dark:border-slate-700 */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-8 border-t-4 border-t-blue-800 dark:border-t-blue-500 transition-colors">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {akta.Tajuk_Undang_Undang}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            {akta.Nombor_Rujukan} | Tahun {akta.Tahun}
          </p>
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 border-b dark:border-slate-700 pb-2">Senarai Peruntukan (Seksyen)</h2>
        
        <div className="flex flex-col gap-3">
          {seksyenTersusun.length > 0 ? (
            seksyenTersusun.map((seksyen: any) => (
              <a 
                href={`/seksyen/${seksyen.documentId}`} 
                key={seksyen.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all flex justify-between items-center group"
              >
                <div>
                  <span className="font-bold text-blue-900 dark:text-blue-400 mr-4">Seksyen {seksyen.No_Seksyen}</span>
                  <span className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    {seksyen.Tajuk_Seksyen}
                  </span>
                </div>
                <span className="text-blue-300 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">&rarr;</span>
              </a>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-slate-800 p-6 rounded-lg text-center">
              Belum ada peruntukan seksyen dimasukkan ke dalam pangkalan data.
            </p>
          )}
        </div>

      </div>
    </main>
  );
}