interface TopicSectionProps {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export default function TopicSection({
  id,
  num,
  title,
  subtitle,
  children,
  isLast = false,
}: TopicSectionProps) {
  return (
    <section
      className={`py-9 ${isLast ? "pb-4" : "pb-8 border-b border-border"}`}
      id={id}
    >
      <div className="flex items-start gap-4 mb-6">
        <span className="font-mono text-[11px] text-muted bg-surface2 border border-border rounded-md px-2 py-0.5 mt-1 shrink-0">
          {num}
        </span>
        <div>
          <h3 className="text-[1.2rem] font-semibold text-text leading-[1.3] mb-0.5">
            {title}
          </h3>
          <span className="text-[13px] text-muted">{subtitle}</span>
        </div>
      </div>
      {children}
    </section>
  );
}
