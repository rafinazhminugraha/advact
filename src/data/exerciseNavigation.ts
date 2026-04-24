import type { NavGroup } from "../types/navigation";
import { practiceLabCategories } from "./practiceLabData";

export const exerciseNavigationData: NavGroup[] = [
  {
    sectionLabel: "Practice Lab",
    items: [
      { id: "ex-intro", label: "Interactive Exercises" },
      ...practiceLabCategories.map((category) => ({
        id: category.id,
        label: category.title,
      })),
    ],
  },
];
