/* Navigation data for the sidebar */

export interface NavChapter {
  num: string;
  label: string;
}

export interface NavItemData {
  id: string;
  label: string;
}

export interface NavGroup {
  chapter?: NavChapter;
  sectionLabel?: string;
  items: NavItemData[];
}

export const navigationData: NavGroup[] = [
  {
    sectionLabel: "Proyek & Setup",
    items: [{ id: "intro-project", label: "Intro Proyek TaskFlow" }],
  },
  {
    chapter: { num: "CH 1", label: "React Router" },
    items: [
      {
        id: "rr-setup",
        label: "Setup & createBrowserRouter (final modern pattern)",
      },
      { id: "rr-routes", label: "Router Object & Route Params (final)" },
      { id: "rr-navigate", label: "Navigasi Programatik" },
      { id: "rr-protected", label: "Protected Routes" },
      { id: "rr-nested", label: "Nested Routes & Layout" },
      { id: "rr-searchparams", label: "useSearchParams & Filter (final)" },
    ],
  },
  {
    chapter: { num: "CH 2", label: "TanStack Query + Axios" },
    items: [
      { id: "tq-setup", label: "Setup QueryClient & Axios (interim)" },
      { id: "tq-usequery", label: "useQuery - Fetching Data (final)" },
      { id: "tq-usemutation", label: "useMutation - CUD Data (final)" },
      { id: "tq-cache", label: "Cache & Invalidation (final)" },
      { id: "tq-interceptor", label: "Axios Interceptor (final)" },
    ],
  },
  {
    chapter: { num: "CH 3", label: "React Hook Form + Zod" },
    items: [
      { id: "rhf-setup", label: "Setup & useForm (interim)" },
      { id: "rhf-validation", label: "Validasi dengan Zod (final)" },
      { id: "rhf-controlled", label: "Controlled Components (final)" },
      { id: "rhf-errors", label: "Error Handling (final)" },
    ],
  },
  {
    chapter: { num: "CH 4", label: "Redux Toolkit" },
    items: [
      { id: "rtk-setup", label: "Setup Store & Typed Hooks (final)" },
      { id: "rtk-slice", label: "createSlice & Reducers (final)" },
      { id: "rtk-thunk", label: "Async Thunk (referensi)" },
      { id: "rtk-selector", label: "useAppSelector & useAppDispatch (final)" },
    ],
  },
  {
    chapter: { num: "CH 5", label: "Zustand" },
    items: [
      { id: "zus-setup", label: "Setup & create Store (final)" },
      { id: "zus-actions", label: "Actions & State Update (final)" },
      { id: "zus-vs-redux", label: "Zustand vs Redux Toolkit (final)" },
    ],
  },
  {
    chapter: { num: "CH 6", label: "Testing" },
    items: [
      { id: "test-setup", label: "Setup RTL & Vitest (final)" },
      { id: "test-render", label: "Render & Query (final)" },
      { id: "test-events", label: "User Events & Async (final)" },
      { id: "test-mock", label: "Mocking API (final)" },
    ],
  },
];
