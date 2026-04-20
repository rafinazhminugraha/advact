import { useEffect, useRef } from "react";
import { navigationData } from "../../data/navigation";

interface SidebarProps {
  activeId: string;
  setActiveId: (id: string) => void;
  progress: number;
}

export default function Sidebar({ activeId, setActiveId, progress }: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);

  // Auto-scroll the sidebar to keep the active item in view
  useEffect(() => {
    if (!activeId || !sidebarRef.current) return;
    const activeLink = sidebarRef.current.querySelector(`a[href="#${activeId}"]`);
    if (activeLink) {
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      
      if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
        activeLink.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [activeId]);

  return (
    <nav ref={sidebarRef} className="w-[270px] min-w-[270px] bg-surface border-r border-border sticky top-0 h-screen overflow-y-auto pb-8 [scrollbar-width:thin] [scrollbar-color:var(--color-surface3)_transparent] hidden md:block">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-border mb-3">
        <span className="font-mono text-[11px] text-accent tracking-[0.08em] uppercase block mb-1">
          npm install react-mastery
        </span>
        <h2 className="text-[15px] font-semibold text-text leading-[1.3]">
          React Ecosystem<br />Junior Dev Roadmap
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
                onClick={() => setActiveId(item.id)}
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
    </nav>
  );
}
