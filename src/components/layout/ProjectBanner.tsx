const Tag = ({ variant, children }: { variant: string; children: React.ReactNode }) => {
  const styles: Record<string, string> = {
    blue: "text-accent bg-accent/[0.08] border-accent/20",
    orange: "text-accent4 bg-accent4/[0.08] border-accent4/20",
    purple: "text-accent2 bg-accent2/[0.08] border-accent2/20",
    green: "text-accent3 bg-accent3/[0.08] border-accent3/20",
  };
  return (
    <span className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full border ${styles[variant] || styles.blue}`}>
      {children}
    </span>
  );
};

export default function ProjectBanner() {
  return (
    <div className="max-w-225 mx-auto px-12 pt-8 pb-4">
      <div className="bg-[linear-gradient(135deg,rgba(97,218,251,0.08)_0%,rgba(167,139,250,0.06)_100%)] border border-accent/20 rounded-2xl px-8 py-6 flex items-start gap-6">
        <div className="w-12.5 h-12.5 bg-accent/12 border border-accent/25 rounded-xl flex items-center justify-center text-[24px] shrink-0">
        ⚙
      </div>
      <div>
        <h3 className="text-base font-semibold text-text mb-1">
          Proyek: TaskFlow &mdash; Aplikasi Manajemen Tugas Tim
        </h3>
        <p className="text-[13.5px] text-muted2 leading-[1.65] mb-3">
          Seluruh materi di panduan ini dibangun di atas satu proyek bernama <strong className="text-text">TaskFlow</strong>. TaskFlow adalah aplikasi manajemen tugas berbasis web dengan autentikasi, CRUD task, filter status, dan notifikasi. Setiap library yang dipelajari akan diintegrasikan ke dalam proyek yang sama, sehingga kamu bisa melihat bagaimana semua tools saling bekerja sama seperti di production.
        </p>
        <div className="flex flex-wrap gap-1.5">
          <Tag variant="blue">React Router (routing)</Tag>
          <Tag variant="orange">TanStack Query + Axios (server state)</Tag>
          <Tag variant="purple">RHF + Zod (forms)</Tag>
          <Tag variant="green">Redux Toolkit (UI state)</Tag>
          <Tag variant="blue">Zustand (auth state)</Tag>
          <Tag variant="orange">React Testing Library (testing)</Tag>
        </div>
        </div>
      </div>
    </div>
  );
}
