import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { NavGroup } from "../../types/navigation";

interface SidebarProps {
  activeId: string;
  setActiveId: (id: string) => void;
  progress: number;
  navigationData: NavGroup[];
  title: string;
  subtitle: string;
}

interface NavContentProps {
  activeId: string;
  progress: number;
  onHomeClick: () => void;
  onLinkClick: (id: string) => void;
  navigationData: NavGroup[];
  title: string;
  subtitle: string;
}

function NavContent({
  activeId,
  progress,
  onHomeClick,
  onLinkClick,
  navigationData,
  title,
  subtitle,
}: NavContentProps) {
  return (
    <>
      <div className="px-5 pt-6 pb-5 border-b border-border mb-3">
        <Link
          to="/"
          onClick={onHomeClick}
          className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-surface2 px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-accent hover:bg-surface3 transition-colors"
        >
          Home
        </Link>
        <span className="font-mono text-[11px] text-accent tracking-[0.08em] uppercase block mb-1">
          {title}
        </span>
        <h2
          className="text-[15px] font-semibold text-text leading-[1.3]"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      </div>

      <div className="px-5 py-3 mb-1">
        <div className="flex justify-between text-[11px] text-muted mb-1.5">
          <span>Progress belajar</span>
          <span>{progress}%</span>
        </div>
        <div className="h-0.75 bg-surface3 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-accent to-accent2 rounded-full transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {navigationData.map((group, gi) => (
        <div key={gi}>
          {group.sectionLabel && (
            <div className="px-5 pt-2 pb-1 text-[10px] font-semibold tracking-widest uppercase text-muted mt-2">
              {group.sectionLabel}
            </div>
          )}
          {group.chapter && (
            <div className="px-5 pt-2 pb-1 text-[10px] font-semibold tracking-widest uppercase text-muted mt-2">
              {group.chapter.num
                ? `${group.chapter.num} - ${group.chapter.label}`
                : group.chapter.label}
            </div>
          )}
          <div className="relative ml-5 border-l border-border/80">
            {group.items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-nav-id={item.id}
                  onClick={() => onLinkClick(item.id)}
                  className={`group relative flex w-full items-stretch text-[12.5px] text-left transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "text-text font-semibold"
                      : "text-muted2 hover:text-text"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-px rounded-full transition-all duration-150 ${
                      isActive
                        ? "bg-text shadow-[0_0_10px_rgba(255,255,255,0.35)]"
                        : "bg-transparent group-hover:bg-muted2"
                    }`}
                  />
                  <span className="flex w-full items-center py-2 pl-4 pr-4 truncate">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

export default function Sidebar({
  activeId,
  setActiveId,
  progress,
  navigationData,
  title,
  subtitle,
}: SidebarProps) {
  const desktopRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!activeId || !desktopRef.current) return;
    const activeLink = desktopRef.current.querySelector(
      `[data-nav-id="${activeId}"]`,
    );
    if (activeLink) {
      const sidebarRect = desktopRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      if (
        linkRect.top < sidebarRect.top ||
        linkRect.bottom > sidebarRect.bottom
      ) {
        activeLink.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [activeId]);

  const handleLinkClick = (id: string) => {
    setActiveId(id);

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setMobileOpen(false);
  };

  const handleHomeClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        ref={desktopRef}
        className="w-67.5 min-w-67.5 bg-surface border-r border-border sticky top-0 h-screen overflow-y-auto pb-8 [scrollbar-width:thin] [scrollbar-color:var(--color-surface3)_transparent] hidden md:block"
      >
        <NavContent
          activeId={activeId}
          progress={progress}
          onHomeClick={handleHomeClick}
          onLinkClick={handleLinkClick}
          navigationData={navigationData}
          title={title}
          subtitle={subtitle}
        />
      </nav>

      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        className="md:hidden fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-border text-text shadow-lg"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <line x1="2" y1="4.5" x2="16" y2="4.5" />
          <line x1="2" y1="9" x2="16" y2="9" />
          <line x1="2" y1="13.5" x2="16" y2="13.5" />
        </svg>
      </button>

      <div
        onClick={() => setMobileOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-67.5 bg-surface border-r border-border overflow-y-auto pb-8 [scrollbar-width:thin] [scrollbar-color:var(--color-surface3)_transparent] transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-start px-4 pt-4 pb-2">
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface2 border border-border text-muted hover:text-text transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        <NavContent
          activeId={activeId}
          progress={progress}
          onHomeClick={handleHomeClick}
          onLinkClick={handleLinkClick}
          navigationData={navigationData}
          title={title}
          subtitle={subtitle}
        />
      </div>
    </>
  );
}
