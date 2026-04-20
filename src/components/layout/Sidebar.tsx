import { useEffect, useRef, useState } from "react";
import { navigationData } from "../../data/navigation";

interface SidebarProps {
  activeId: string;
  setActiveId: (id: string) => void;
  progress: number;
}

// ─── Shared nav content (top-level so React never re-creates it) ───────────
interface NavContentProps {
  activeId: string;
  progress: number;
  onLinkClick: (id: string) => void;
}

function NavContent({ activeId, progress, onLinkClick }: NavContentProps) {
  return (
    <>
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-border mb-3">
        <span className="font-mono text-[11px] text-accent tracking-[0.08em] uppercase block mb-1">
          Advact
        </span>
        <h2 className="text-[15px] font-semibold text-text leading-[1.3]">
          Advance React Learning<br />Junior Dev Roadmap
        </h2>
      </div>

      {/* Progress */}
      <div className="px-5 py-3 mb-1">
        <div className="flex justify-between text-[11px] text-muted mb-1.5">
          <span>Progress belajar</span>
          <span>{progress}%</span>
        </div>
        <div className="h-[3px] bg-surface3 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Nav Groups */}
      {navigationData.map((group, gi) => (
        <div key={gi}>
          {group.sectionLabel && (
            <div className="px-5 pt-2 pb-1 text-[10px] font-semibold tracking-[0.1em] uppercase text-muted mt-2">
              {group.sectionLabel}
            </div>
          )}
          {group.chapter && (
            <div className="flex items-center gap-2 px-5 pt-2 pb-1 mt-1">
              <span className="font-mono font-bold text-[10px] text-accent2 bg-accent2/10 border border-accent2/20 rounded px-1.5 py-px shrink-0">
                {group.chapter.num}
              </span>
              <span className="text-[11px] font-semibold text-muted2 tracking-[0.04em]">
                {group.chapter.label}
              </span>
            </div>
          )}
          {group.items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => onLinkClick(item.id)}
                className={`flex items-center gap-2 px-5 py-[6px] text-[12.5px] border-l-2 transition-all duration-150 no-underline ${
                  isActive
                    ? "text-accent border-accent bg-accent/[0.06] font-medium"
                    : "text-muted2 border-transparent hover:text-text hover:bg-surface2"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-150 ${
                    isActive ? "bg-accent" : "bg-surface3"
                  }`}
                />
                {item.label}
              </a>
            );
          })}
        </div>
      ))}
    </>
  );
}

// ─── Main Sidebar component ────────────────────────────────────────────────
export default function Sidebar({ activeId, setActiveId, progress }: SidebarProps) {
  const desktopRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-scroll the desktop sidebar to keep the active link visible
  useEffect(() => {
    if (!activeId || !desktopRef.current) return;
    const activeLink = desktopRef.current.querySelector(`a[href="#${activeId}"]`);
    if (activeLink) {
      const sidebarRect = desktopRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
        activeLink.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [activeId]);

  const handleLinkClick = (id: string) => {
    setActiveId(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── DESKTOP sidebar — identical to original, hidden on mobile ── */}
      <nav
        ref={desktopRef}
        className="w-[270px] min-w-[270px] bg-surface border-r border-border sticky top-0 h-screen overflow-y-auto pb-8 [scrollbar-width:thin] [scrollbar-color:var(--color-surface3)_transparent] hidden md:block"
      >
        <NavContent
          activeId={activeId}
          progress={progress}
          onLinkClick={handleLinkClick}
        />
      </nav>

      {/* ── MOBILE: hamburger button (only visible on mobile) ─────────── */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        className="md:hidden fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-border text-text shadow-lg"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <line x1="2" y1="4.5" x2="16" y2="4.5" />
          <line x1="2" y1="9"   x2="16" y2="9"   />
          <line x1="2" y1="13.5" x2="16" y2="13.5" />
        </svg>
      </button>

      {/* ── MOBILE: backdrop (clicking closes drawer) ─────────────────── */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── MOBILE: slide-in drawer ────────────────────────────────────── */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-[270px] bg-surface border-r border-border overflow-y-auto pb-8 [scrollbar-width:thin] [scrollbar-color:var(--color-surface3)_transparent] transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button — inside the panel so it slides off-screen with it */}
        <div className="flex justify-start px-4 pt-4 pb-2">
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface2 border border-border text-muted hover:text-text transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        <NavContent
          activeId={activeId}
          progress={progress}
          onLinkClick={handleLinkClick}
        />
      </div>
    </>
  );
}
