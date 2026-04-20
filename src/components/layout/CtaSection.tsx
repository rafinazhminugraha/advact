const checkItems = [
  "Routing multi-halaman dengan React Router v6",
  "Fetch dan manajemen server state dengan TanStack Query + Axios",
  "Form yang performant dan valid dengan RHF + Zod",
  "State global UI dengan Redux Toolkit",
  "State management minimalis dengan Zustand",
  "Testing komponen dengan React Testing Library",
  "Semua library terintegrasi dalam satu proyek nyata",
];

export default function CtaSection() {
  return (
    <div className="bg-[linear-gradient(135deg,rgba(97,218,251,0.05),rgba(167,139,250,0.05))] border border-border rounded-[16px] text-center p-12 mt-24 mb-16">
      <h2 className="text-[1.5rem] font-bold mb-3 text-text">
        TaskFlow selesai. Kamu siap.
      </h2>
      <p className="text-[14px] text-muted2 max-w-[480px] mx-auto mb-6">
        Kamu sudah mempelajari seluruh ekosistem React modern yang dipakai di dunia kerja nyata, semuanya dalam konteks satu proyek yang konsisten.
      </p>

      <div className="inline-flex flex-col items-start gap-2 text-left mb-8">
        {checkItems.map((item) => (
          <div key={item} className="flex items-center gap-2.5 text-[14px] text-muted2">
            <div className="w-[18px] h-[18px] rounded-full bg-accent3/15 border border-accent3/30 flex items-center justify-center shrink-0 text-[10px] text-accent3">
              ✓
            </div>
            {item}
          </div>
        ))}
      </div>

      <p className="text-[13px] text-muted">
        Langkah selanjutnya: selesaikan TaskFlow, deploy ke Vercel, dan jadikan portfolio-mu. Kemudian lamar pekerjaan.
      </p>
    </div>
  );
}
