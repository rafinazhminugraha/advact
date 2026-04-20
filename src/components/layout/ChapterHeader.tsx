interface ChapterHeaderProps {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  badgeVariant: number;
}

const badgeStyles: Record<number, string> = {
  1: "text-accent bg-accent/10 border-accent/25",
  2: "text-accent4 bg-accent4/10 border-accent4/25",
  3: "text-accent2 bg-accent2/10 border-accent2/25",
  4: "text-accent3 bg-accent3/10 border-accent3/25",
  5: "text-pink-400 bg-pink-400/10 border-pink-400/25",
  6: "text-sky-400 bg-sky-400/10 border-sky-400/25",
};

export default function ChapterHeader({
  id,
  num,
  title,
  subtitle,
  badgeVariant,
}: ChapterHeaderProps) {
  return (
    <div
      className="pt-8 pb-5 flex items-center gap-4 border-b border-border2 mb-2"
      id={id}
    >
        <span
          className={`font-mono text-[11px] px-2.5 py-1 rounded-md shrink-0 border ${badgeStyles[badgeVariant] || badgeStyles[1]}`}
        >
          {num}
        </span>
        <div>
          <h2 className="text-[1.6rem] font-bold text-text leading-tight mb-0.5">
            {title}
          </h2>
          <span className="text-[13px] text-muted">{subtitle}</span>
        </div>
      </div>
  );
}
