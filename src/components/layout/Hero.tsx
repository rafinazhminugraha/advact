export default function Hero() {
  return (
    <div className="bg-surface border-b border-border relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute -top-[60px] -right-[40px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(97,218,251,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-[80px] left-[30%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[900px] mx-auto px-12 pt-12 pb-10 relative z-10">
        <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-5 relative">
          Advact &mdash; Advance React Learning &mdash; Bahasa Indonesia
        </div>

        <h1 className="text-[2.4rem] font-bold leading-[1.2] mb-4 bg-gradient-to-br from-text to-muted2 bg-clip-text text-transparent relative">
          Library Modern React<br />untuk Junior Developer
        </h1>

        <p className="text-[15px] text-muted2 max-w-[600px] mb-7 leading-[1.7] relative">
          Panduan praktis dan terstruktur untuk menguasai ekosistem React yang dipakai di dunia kerja nyata. Setiap chapter dibangun di atas satu proyek yang sama agar kamu mengerti cara semua tools ini bekerja bersama.
        </p>

        <div className="flex gap-10 flex-wrap relative">
          {[
            { num: "6", label: "Chapter Utama" },
            { num: "24", label: "Subtopik" },
            { num: "50+", label: "Contoh Kode" },
            { num: "1", label: "Proyek Konsisten" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-[1.5rem] font-bold text-text leading-none">{stat.num}</span>
              <span className="text-[12px] text-muted mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
