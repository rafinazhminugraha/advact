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
        label: "Setup & createBrowserRouter",
      },
      { id: "rr-routes", label: "Router Object & Route Params" },
      { id: "rr-navigate", label: "Navigasi Programatik" },
      { id: "rr-protected", label: "Protected Routes" },
      { id: "rr-nested", label: "Nested Routes & Layout" },
      { id: "rr-searchparams", label: "useSearchParams & Filter" },
    ],
  },
  {
    chapter: { num: "CH 2", label: "TanStack Query + Axios" },
    items: [
      { id: "tq-setup", label: "Setup QueryClient & Axios" },
      { id: "tq-usequery", label: "useQuery - Fetching Data" },
      { id: "tq-usemutation", label: "useMutation - CUD Data" },
      { id: "tq-cache", label: "Cache & Invalidation" },
      { id: "tq-interceptor", label: "Axios Interceptor" },
    ],
  },
  {
    chapter: { num: "CH 3", label: "React Hook Form + Zod" },
    items: [
      { id: "rhf-setup", label: "Setup & useForm " },
      { id: "rhf-validation", label: "Validasi dengan Zod" },
      { id: "rhf-controlled", label: "Controlled Components" },
      { id: "rhf-errors", label: "Error Handling" },
    ],
  },
  {
    chapter: { num: "CH 4", label: "Redux Toolkit" },
    items: [
      { id: "rtk-setup", label: "Setup Store & Typed Hooks" },
      { id: "rtk-slice", label: "createSlice & Reducers" },
      { id: "rtk-thunk", label: "Async Thunk" },
      { id: "rtk-selector", label: "useAppSelector & useAppDispatch" },
    ],
  },
  {
    chapter: { num: "CH 5", label: "Zustand" },
    items: [
      { id: "zus-setup", label: "Setup & create Store" },
      { id: "zus-actions", label: "Actions & State Update" },
      { id: "zus-vs-redux", label: "Zustand vs Redux Toolkit" },
    ],
  },
  {
    chapter: { num: "CH 6", label: "Testing" },
    items: [
      { id: "test-setup", label: "Setup RTL & Vitest" },
      { id: "test-render", label: "Render & Query" },
      { id: "test-events", label: "User Events & Async" },
      { id: "test-mock", label: "Mocking API" },
    ],
  },
];
