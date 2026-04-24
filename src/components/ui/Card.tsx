interface CardProps {
  label?: string;
  type: "what" | "why" | "when";
  typeLabelOverride?: string;
  children: React.ReactNode;
}

const typeColors = {
  what: "text-accent",
  why: "text-accent4",
  when: "text-accent2",
};

const typeLabels = {
  what: "Apa itu",
  why: "Kenapa penting",
  when: "Kapan dipakai",
};

export default function Card({
  label,
  type,
  typeLabelOverride,
  children,
}: CardProps) {
  const typeLabel = typeLabelOverride ?? typeLabels[type];

  return (
    <div className="h-full bg-surface2 border border-border rounded-[10px] p-4 px-5 flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div
          className={`text-[10px] font-semibold tracking-[0.1em] uppercase ${typeColors[type]}`}
        >
          {typeLabel}
        </div>
        {label ? (
          <span className="font-mono text-[10px] text-muted border border-border rounded px-1.5 py-px">
            {label}
          </span>
        ) : null}
      </div>
      <div className="flex-1 text-[13.5px] text-muted2 leading-[1.65] [&_ul]:pl-4 [&_ul]:list-disc [&_ul]:list-outside [&_li]:text-[13.5px] [&_li]:text-muted2 [&_li]:leading-[1.7] [&_li]:mb-0.5 [&_li::marker]:text-muted [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:bg-surface3 [&_code]:border [&_code]:border-border [&_code]:rounded [&_code]:px-1.5 [&_code]:py-px [&_code]:text-accent">
        {children}
      </div>
    </div>
  );
}
