import Sidebar from "../components/layout/Sidebar";
import ChapterHeader from "../components/layout/ChapterHeader";
import TopicSection from "../components/layout/TopicSection";
import CardGrid from "../components/layout/CardGrid";
import Card from "../components/ui/Card";
import TipBlock from "../components/ui/TipBlock";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { exerciseNavigationData } from "../data/exerciseNavigation";
import { practiceLabCategories } from "../data/practiceLabData";

const allSectionIds = exerciseNavigationData.flatMap((group) =>
  group.items.map((item) => item.id),
);

const wrap = "px-4 sm:px-6 lg:px-12 max-w-[900px] mx-auto";

function ChapterDivider() {
  return <hr className="border-none h-px bg-border2" />;
}

const quickReadByCategory: Record<string, string> = {
  "1": "Fokuskan speed dan akurasi dasar. Targetkan selesai di bawah 12 menit per challenge.",
  "2": "Biasakan validasi eksplisit dan state form yang predictable. Tunjukkan flow submit yang jelas.",
  "3": "Utamakan immutable update pattern saat add, remove, sort, dan reorder.",
  "4": "Bangun kebiasaan memakai derived state daripada menyimpan hasil filter terpisah.",
  "5": "Selalu tampilkan loading, error, dan success state agar UX dan debugging lebih kuat.",
  "6": "Saat CRUD, pikirkan data model dulu sebelum menulis event handler.",
  "7": "Latih kemampuan memecah komponen tanpa over-engineering.",
  "8": "Pisahkan rule business logic dari JSX agar conditional rendering tetap rapi.",
  "9": "Di widget interaktif, prioritas utama adalah state transition yang konsisten.",
  "10": "Table task biasanya menguji sorting + filtering + pagination secara bersamaan.",
  "11": "Gunakan useRef saat butuh akses DOM atau nilai previous render tanpa rerender.",
  "12": "Pastikan hydration dari localStorage aman terhadap data null atau format invalid.",
  "13": "Gunakan reducer ketika transisi state mulai kompleks dan saling terkait.",
  "14": "Refactor bertahap: buat jalan dulu, baru pecah jadi komponen reusable.",
  "15": "Jelaskan root cause bug sebelum kasih fix agar interviewer melihat cara berpikirmu.",
  "16": "Utamakan type safety di boundary: props, event handler, API response, dan reducer action.",
  "17": "Layout challenge menilai pemahaman fundamental CSS tanpa bantuan UI library.",
  "18": "Mini apps menilai ketahananmu menggabungkan banyak skill dalam 1 alur kerja.",
};

function normalizePromptText(prompt: string) {
  // Prompts are sourced from markdown and may contain escaped punctuation.
  return prompt.replace(/\\([\\`*_{}[\]()#+\-.!|=+])/g, "$1");
}

function isCodeChunk(chunk: string) {
  const trimmed = chunk.trim();
  if (!trimmed) return false;

  const lines = trimmed.split("\n");
  const codeLikeLine =
    /^\s*(const|let|var|function|useEffect|fetch|return|import|type|interface|alert|set[A-Z]\w*|\.then\(|\{|\}|\[|\])\b/;

  if (lines.length > 1) {
    return (
      lines.some((line) => codeLikeLine.test(line)) ||
      lines.some((line) => /;\s*$/.test(line))
    );
  }

  return (
    /^(const|let|var|function|useEffect|fetch|return|import|type|interface)\b/.test(
      trimmed,
    ) || /=>/.test(trimmed)
  );
}

function renderTextWithInlineCode(text: string, keyPrefix: string) {
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, idx) => {
    const key = `${keyPrefix}-${idx}`;

    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      const code = part.slice(1, -1);
      return (
        <code
          key={key}
          className="inline align-baseline font-mono text-[12px] bg-surface3 border border-border rounded px-1.5 py-px text-accent break-all"
        >
          {code}
        </code>
      );
    }

    return <span key={key}>{part}</span>;
  });
}

function PromptContent({ prompt }: { prompt: string }) {
  const normalizedPrompt = normalizePromptText(prompt);
  const chunks = normalizedPrompt
    .split(/\n{2,}/)
    .map((chunk) => chunk.trimEnd())
    .filter((chunk) => chunk.trim().length > 0);

  return (
    <div className="mt-1 space-y-2">
      {chunks.map((chunk, idx) => {
        const key = `prompt-${idx}`;

        if (isCodeChunk(chunk)) {
          return (
            <pre
              key={key}
              className="prompt-code-scroll text-[12px] leading-[1.6] font-mono bg-surface3 border border-border rounded-md px-3 py-2 overflow-x-auto text-text"
            >
              <code className="block whitespace-pre bg-transparent! border-0! rounded-none! px-0! py-0! text-text!">
                {chunk}
              </code>
            </pre>
          );
        }

        return (
          <p key={key} className="whitespace-pre-line">
            {renderTextWithInlineCode(chunk, key)}
          </p>
        );
      })}
    </div>
  );
}

export default function ExercisesPage() {
  const { activeId, setActiveId, progress } = useScrollSpy(allSectionIds);

  return (
    <div className="flex min-h-screen bg-bg overflow-x-hidden md:overflow-x-visible">
      <Sidebar
        activeId={activeId}
        setActiveId={setActiveId}
        progress={progress}
        navigationData={exerciseNavigationData}
        title="Lab"
        subtitle="Live Coding Lab<br />Junior Interview Prep"
      />

      <main className="flex-1 min-w-0">
        <div className="bg-surface border-b border-border py-12">
          <div className={wrap}>
            <ChapterHeader
              id="ex-intro"
              num="Practice Lab"
              title="Interactive Exercises"
              subtitle="Daftar tantangan live coding untuk persiapan interview Junior React Developer."
              badgeVariant={2}
            />
          </div>
        </div>

        <div className={`${wrap} pt-12 pb-6`}>
          {practiceLabCategories.map((category, index) => (
            <TopicSection
              key={category.id}
              id={category.id}
              num={category.num.padStart(2, "0")}
              title={category.title}
              subtitle={`${category.subtitle} · ${category.items.length} exercises`}
              isLast={index === practiceLabCategories.length - 1}
            >
              <CardGrid>
                {category.items.map((exercise) => (
                  <Card
                    key={exercise.id}
                    label={`Exercise ${exercise.id}`}
                    type="what"
                    typeLabelOverride="Prompt"
                  >
                    <div className="flex h-full flex-col justify-between gap-3">
                      <div>
                        <strong className="text-white/80">
                          {exercise.title}
                        </strong>
                        <PromptContent prompt={exercise.prompt} />
                      </div>
                      <p className="text-[12px] text-muted">
                        Target waktu: {exercise.timeTarget}
                      </p>
                    </div>
                  </Card>
                ))}
              </CardGrid>
              <TipBlock>{quickReadByCategory[category.num]}</TipBlock>
            </TopicSection>
          ))}

          <TipBlock>
            Jika kamu sudah lancar di Exercise 1-74 dengan penjelasan yang
            runtut, kamu sudah berada di level siap interview junior untuk
            mayoritas perusahaan.
          </TipBlock>
        </div>

        <div className={`${wrap} pb-24`}>
          <ChapterDivider />
        </div>
      </main>
    </div>
  );
}
