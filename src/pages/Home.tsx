import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-between p-6 xl:py-20 sm:p-6">
      <div className="max-w-4xl w-full text-center mb-9 sm:mb-10">
        <span className="font-mono text-[10px] sm:text-xs text-accent tracking-[0.16em] uppercase mb-6 block">
          Welcome to Advact
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 xl:mb-6 sm:mb-5">
          Kuasai React ke Level <span className="text-accent">Advanced</span>
        </h1>
        <p className="text-muted2 text-base max-w-2xl mx-auto">
          Pelajari tools atau asah skill live coding pakai 90+ exercise interview
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl w-full">
        {/* Learning Card */}
        <Link
          to="/learning"
          className="group relative bg-surface border border-border rounded-xl p-6 sm:p-7 transition-all duration-300 hover:border-accent/50 hover:bg-surface2 overflow-hidden"
        >
          <div className="relative z-10">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4 sm:mb-5 text-accent">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Advanced React</h3>
            <p className="text-muted2 text-[15px] mb-4 sm:mb-5">
              Kurikulum mendalam tentang Router, TanStack Query, Redux Toolkit,
              Zustand, dan Testing.
            </p>
            <div className="inline-flex items-center text-accent text-sm font-semibold group-hover:gap-2 transition-all">
              Mulai Belajar
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </Link>

        {/* Exercises Card */}
        <Link
          to="/exercises"
          className="group relative bg-surface border border-border rounded-xl p-6 sm:p-7 transition-all duration-300 hover:border-accent2/50 hover:bg-surface2 overflow-hidden"
        >
          <div className="relative z-10">
            <div className="w-10 h-10 bg-accent2/10 rounded-lg flex items-center justify-center mb-4 sm:mb-5 text-accent2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Practice Lab</h3>
            <p className="text-muted2 text-[15px] mb-4 sm:mb-5">
              90+ tantangan live coding interview dari kategori Dasar hingga
              Mini-Apps kompleks.
            </p>
            <div className="inline-flex items-center text-accent2 text-sm font-semibold group-hover:gap-2 transition-all">
              Buka Lab
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </Link>
      </div>

      <footer className="mt-14 sm:mt-16 text-muted font-mono text-[10px] sm:text-xs uppercase tracking-[0.08em]">
        Built for Future Senior React Developers
      </footer>
    </div>
  );
}
