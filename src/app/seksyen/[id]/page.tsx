import Link from "next/link";
import CopyButton from "./CopyButton";

function renderTeks(kandungan: any) {
  if (!kandungan) return <p className="italic text-gray-500 dark:text-gray-400">Tiada kandungan dimasukkan.</p>;
  
  if (typeof kandungan === 'string') {
    return <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 text-justify leading-relaxed text-lg">{kandungan}</div>;
  }

  if (Array.isArray(kandungan)) {
    return kandungan.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="mb-5 text-gray-800 dark:text-gray-200 text-justify leading-relaxed text-lg">
            {block.children ? block.children.map((child: any) => child.text).join('') : ''}
          </p>
        );
      }
      return null;
    });
  }
  return <p className="dark:text-white">Format kandungan tidak disokong.</p>;
}

function dapatkanTeksKosong(kandungan: any) {
  if (!kandungan) return "";
  if (typeof kandungan === 'string') return kandungan;
  if (Array.isArray(kandungan)) {
    return kandungan.map(block => {
      if (block.type === 'paragraph') {
        return block.children ? block.children.map((child: any) => child.text).join('') : '';
      }
      return '';
    }).join('\n\n');
  }
  return "";
}

export default async function PaparanSeksyen({ params }: any) {
  const resolvedParams = await params;
  const seksyenId = resolvedParams.id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/seksyens/${seksyenId}?populate=*`, { cache: 'no-store' });
  const json = await res.json();
  const seksyen = json.data;

  if (!seksyen) return <div className="p-10 text-center text-red-500">Harap maaf, peruntukan tidak dijumpai.</div>;

  const aktaIndukId = seksyen.akta_enakmen_ordinan?.documentId;
  const teksUntukDisalin = `Seksyen ${seksyen.No_Seksyen} - ${seksyen.Tajuk_Seksyen}\n\n${dapatkanTeksKosong(seksyen.Kandungan)}`;

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900 py-12 px-4 sm:px-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {aktaIndukId ? (
          <Link href={`/akta/${aktaIndukId}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium mb-6 inline-block">
            &larr; Kembali ke Senarai Seksyen
          </Link>
        ) : (
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium mb-6 inline-block">
            &larr; Kembali ke Laman Utama
          </Link>
        )}

        <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 relative transition-colors duration-300">
          
          <div className="border-b-2 border-gray-800 dark:border-gray-500 pb-6 mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
              Seksyen {seksyen.No_Seksyen}
            </h1>
            <h2 className="text-xl text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wide">
              {seksyen.Tajuk_Seksyen}
            </h2>
          </div>

          <div className="prose max-w-none">
            {renderTeks(seksyen.Kandungan)}
          </div>

          <div className="border-t border-gray-200 dark:border-slate-700 mt-10 pt-6 flex justify-center md:justify-end">
             <CopyButton teks={teksUntukDisalin} />
          </div>

        </div>
      </div>
    </main>
  );
}
// Test deploy 123