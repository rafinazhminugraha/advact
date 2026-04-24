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
