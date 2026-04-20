interface CardProps {
  label: string;
  type: "what" | "why" | "when";
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

export default function Card({ type, children }: CardProps) {
  return (
    <div className="bg-surface2 border border-border rounded-[10px] p-4 px-5">
      <div
        className={`text-[10px] font-semibold tracking-[0.1em] uppercase mb-2 ${typeColors[type]}`}
      >
        {typeLabels[type]}
      </div>
      <div className="text-[13.5px] text-muted2 leading-[1.65] [&_ul]:pl-4 [&_ul]:list-disc [&_ul]:list-outside [&_li]:text-[13.5px] [&_li]:text-muted2 [&_li]:leading-[1.7] [&_li]:mb-0.5 [&_li::marker]:text-muted [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:bg-surface3 [&_code]:border [&_code]:border-border [&_code]:rounded [&_code]:px-1.5 [&_code]:py-px [&_code]:text-accent">
        {children}
      </div>
    </div>
  );
}
