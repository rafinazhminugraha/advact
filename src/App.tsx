import Sidebar from "./components/layout/Sidebar";
import Hero from "./components/layout/Hero";
import ProjectBanner from "./components/layout/ProjectBanner";
import CtaSection from "./components/layout/CtaSection";
import IntroProject from "./components/sections/IntroProject";
import Chapter1Router from "./components/sections/Chapter1Router";
import Chapter2Query from "./components/sections/Chapter2Query";
import Chapter3Forms from "./components/sections/Chapter3Forms";
import Chapter4Redux from "./components/sections/Chapter4Redux";
import Chapter5Zustand from "./components/sections/Chapter5Zustand";
import Chapter6Testing from "./components/sections/Chapter6Testing";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { navigationData } from "./data/navigation";

// Collect all section IDs for the scroll spy observer
const allSectionIds = navigationData.flatMap((group) =>
  group.items.map((item) => item.id)
);

// Shared container class for all chapter content
const wrap = "px-12 max-w-[900px] mx-auto";

// Full-bleed separator — direct child of <main> so it spans the full main width
function ChapterDivider() {
  return <hr className="border-none h-px bg-border2" />;
}

export default function App() {
  const { activeId, setActiveId, progress } = useScrollSpy(allSectionIds);

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <Sidebar activeId={activeId} setActiveId={setActiveId} progress={progress} />

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <Hero />
        <ProjectBanner />

        <div className={`${wrap} pt-12 pb-6`}>
          <IntroProject />
        </div>

        <ChapterDivider />
        <div className={`${wrap} pb-6`}>
          <Chapter1Router />
        </div>

        <ChapterDivider />
        <div className={`${wrap} pb-6`}>
          <Chapter2Query />
        </div>

        <ChapterDivider />
        <div className={`${wrap} pb-6`}>
          <Chapter3Forms />
        </div>

        <ChapterDivider />
        <div className={`${wrap} pb-6`}>
          <Chapter4Redux />
        </div>

        <ChapterDivider />
        <div className={`${wrap} pb-6`}>
          <Chapter5Zustand />
        </div>

        <ChapterDivider />
        <div className={`${wrap} pb-16`}>
          <Chapter6Testing />
          <CtaSection />
        </div>
      </main>
    </div>
  );
}
