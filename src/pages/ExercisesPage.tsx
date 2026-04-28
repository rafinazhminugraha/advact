import Sidebar from "../components/layout/Sidebar";
import ChapterHeader from "../components/layout/ChapterHeader";
import TopicSection from "../components/layout/TopicSection";
import CardGrid from "../components/layout/CardGrid";
import Card from "../components/ui/Card";
import TipBlock from "../components/ui/TipBlock";
import MemorizeBlock from "../components/ui/MemorizeBlock";
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

const memorizePatternByCategory: Record<string, { pattern: string }> = {
  "1": {
    pattern: `// State is the source of truth for every interaction.
// Keep the value minimal, update immutably, and derive the UI from it.
const [count, setCount] = useState(0);

const increment = () => setCount((current) => current + 1);
const decrement = () => setCount((current) => Math.max(0, current - 1));
const reset = () => setCount(0);

return (
  <section>
    <button onClick={decrement} disabled={count === 0}>-</button>
    <span>{count}</span>
    <button onClick={increment}>+</button>
    <button onClick={reset}>Reset</button>
  </section>
);`,
  },
  "2": {
    pattern: `// Form questions are solved with one value object, one change handler, and one submit gate.
// Validate first, then submit, then reset or keep values intentionally.
const [form, setForm] = useState({ name: "", email: "", password: "" });
const [errors, setErrors] = useState<Record<string, string>>({});

const handleChange = (event) => {
  const { name, value } = event.target;
  setForm((current) => ({ ...current, [name]: value }));
};

const handleSubmit = (event) => {
  event.preventDefault();
  const nextErrors = validateForm(form);

  setErrors(nextErrors);

  if (Object.keys(nextErrors).length > 0) return;

  submitForm(form);
  setForm({ name: "", email: "", password: "" });
};`,
  },
  "3": {
    pattern: `// Lists are solved by treating rows as immutable objects with stable ids.
// Map for rendering, filter for removal, map for updates, and never mutate in place.
const [items, setItems] = useState<Array<{ id: number; text: string; done?: boolean }>>([]);

const addItem = (text: string) => {
  const nextItem = { id: Date.now(), text, done: false };
  setItems((current) => [...current, nextItem]);
};

const removeItem = (id: number) => {
  setItems((current) => current.filter((item) => item.id !== id));
};

const toggleItem = (id: number) => {
  setItems((current) =>
    current.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item,
    ),
  );
};`,
  },
  "4": {
    pattern: `// Keep the source data intact and derive all filters from state.
// If there are dependent filters, reset them when the primary filter changes.
const [query, setQuery] = useState("");
const [category, setCategory] = useState("all");
const [page, setPage] = useState(1);

const filteredItems = items.filter((item) => {
  const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
  const matchesCategory = category === "all" || item.category === category;

  return matchesQuery && matchesCategory;
});

const visibleItems = filteredItems.slice((page - 1) * 10, page * 10);`,
  },
  "5": {
    pattern: `// Every fetch question is solved with the same state machine.
// Always handle loading, error, success, cleanup, and refetch paths explicitly.
const [data, setData] = useState<unknown>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("URL", { signal: controller.signal });
      if (!response.ok) throw new Error("Request failed");

      const json = await response.json();
      setData(json);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  return () => controller.abort();
}, []);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
if (!data) return <p>No data</p>;`,
  },
  "6": {
    pattern: `// CRUD questions are solved by separating collection state from draft/edit state.
// Add, edit, toggle, and delete all flow through immutable array updates.
const [items, setItems] = useState<Array<{ id: number; text: string; done: boolean }>>([]);
const [draft, setDraft] = useState("");
const [editingId, setEditingId] = useState<number | null>(null);

const addItem = () => {
  if (!draft.trim()) return;

  setItems((current) => [...current, { id: Date.now(), text: draft, done: false }]);
  setDraft("");
};

const updateItem = (id: number, text: string) => {
  setItems((current) =>
    current.map((item) => (item.id === id ? { ...item, text } : item)),
  );
};

const deleteItem = (id: number) => {
  setItems((current) => current.filter((item) => item.id !== id));
};`,
  },
  "7": {
    pattern: `// Decomposition questions are solved by drawing the boundary around data ownership.
// The parent owns state, children render UI, and callbacks travel upward.
function Parent() {
  const [value, setValue] = useState("");
  const items = getItemsFromSource();

  return (
    <Layout>
      <FilterBar value={value} onChange={setValue} />
      <ResultList items={items} query={value} />
    </Layout>
  );
}`,
  },
  "8": {
    pattern: `// Conditional rendering questions are solved by making every state explicit.
// Use early returns for global states and config maps for repeated UI branching.
if (loading) return <LoadingState />;
if (error) return <ErrorState message={error} />;
if (!items.length) return <EmptyState />;

const viewByRole = {
  admin: <AdminActions />,
  editor: <EditorActions />,
  viewer: <ViewerActions />,
};

return viewByRole[role] ?? null;`,
  },
  "9": {
    pattern: `// Widget questions are solved with one active state and clear event handlers.
// Derive the visible UI from the active index, open item, or current step.
const [activeIndex, setActiveIndex] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);

const goNext = () => setActiveIndex((current) => Math.min(current + 1, items.length - 1));
const goPrev = () => setActiveIndex((current) => Math.max(current - 1, 0));

useEffect(() => {
  if (!isPlaying) return;

  const timerId = setInterval(() => {
    setActiveIndex((current) => current + 1);
  }, 1000);

  return () => clearInterval(timerId);
}, [isPlaying]);`,
  },
  "10": {
    pattern: `// Table questions are solved by keeping source rows untouched and deriving the view.
// The order is always filter first, sort second, paginate last, then recalculate page count.
const [query, setQuery] = useState("");
const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" as const });
const [page, setPage] = useState(1);

const visibleRows = rows
  .filter((row) => matchesQuery(row, query))
  .sort((left, right) => compareRows(left, right, sortConfig))
  .slice((page - 1) * 10, page * 10);

const resetPage = () => setPage(1);`,
  },
  "11": {
    pattern: `// useRef questions are solved by storing things that should survive renders but not trigger them.
// Use it for DOM nodes, timer ids, and previous values.
const inputRef = useRef<HTMLInputElement | null>(null);
const previousValueRef = useRef<string | null>(null);

const focusInput = () => {
  inputRef.current?.focus();
};

useEffect(() => {
  previousValueRef.current = value;
}, [value]);`,
  },
  "12": {
    pattern: `// Persistence questions are solved by hydrating once, syncing on change, and guarding bad storage data.
// Always read on mount, write on update, and clear storage when resetting.
const [value, setValue] = useState(() => {
  try {
    const saved = localStorage.getItem("value");
    return saved ? JSON.parse(saved) : 0;
  } catch {
    return 0;
  }
});

useEffect(() => {
  localStorage.setItem("value", JSON.stringify(value));
}, [value]);

const reset = () => {
  setValue(0);
  localStorage.removeItem("value");
};`,
  },
  "13": {
    pattern: `// useReducer questions are solved by modeling state transitions as actions.
// Keep the reducer pure, keep actions explicit, and use it when state changes are related.
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, items: [...state.items, action.payload] };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "DELETE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}`,
  },
  "14": {
    pattern: `// Pressure questions are solved by keeping the first version working, then slicing the responsibilities apart.
// Extract presentation, keep orchestration in the parent, and preserve behavior while refactoring.
function App() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  return (
    <FeatureShell>
      <SearchBar value={query} onChange={setQuery} />
      <List items={items} />
    </FeatureShell>
  );
}`,
  },
  "15": {
    pattern: `// Bug-fix questions are solved by naming the failure mode before changing code.
// Reproduce, inspect the boundary, fix the root cause, then verify the same path again.
const toggle = (id) => {
  setItems((current) =>
    current.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item,
    ),
  );
};

// mutation -> copy the array or object before updating
// stale closure -> use functional setState or correct dependencies
// memory leak -> cleanup effects and abort async work`,
  },
  "16": {
    pattern: `// TypeScript questions are solved from the edges inward: API data, props, events, then actions.
// Use interfaces for shapes and unions for state machines.
interface User {
  id: number;
  name: string;
}

type FetchState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: User[] };

type Action =
  | { type: "ADD"; payload: string }
  | { type: "DELETE"; payload: number };`,
  },
  "17": {
    pattern: `// Layout and CSS questions are solved by choosing the axis, sizing the containers, then adding responsiveness.
// Start with flex or grid, make spacing intentional, and only then tune breakpoints.
.shell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}`,
  },
  "18": {
    pattern: `// Mini app questions are solved by separating source data, derived data, and interaction state.
// Keep the flow explicit so fetch, filter, sort, selection, loading, and error never fight each other.
const [items, setItems] = useState([]);
const [query, setQuery] = useState("");
const [selectedId, setSelectedId] = useState<number | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const filteredItems = items.filter((item) => item.name.includes(query));
const selectedItem = filteredItems.find((item) => item.id === selectedId) ?? null;`,
  },
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
              {memorizePatternByCategory[category.num] ? (
                <MemorizeBlock
                  pattern={memorizePatternByCategory[category.num].pattern}
                />
              ) : null}
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
