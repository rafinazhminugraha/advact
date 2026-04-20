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

        <div className="px-12 pb-16 pt-12 max-w-[900px] mx-auto">
          <IntroProject />
          <Chapter1Router />
          <Chapter2Query />
          <Chapter3Forms />
          <Chapter4Redux />
          <Chapter5Zustand />
          <Chapter6Testing />
          <CtaSection />
        </div>
      </main>
    </div>
  );
}
