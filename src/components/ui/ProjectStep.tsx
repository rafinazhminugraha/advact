interface ProjectStepProps {
  label: string;
  children: React.ReactNode;
}

export default function ProjectStep({ label, children }: ProjectStepProps) {
  return (
    <div className="bg-accent3/[0.05] border border-accent3/[0.15] rounded-[10px] py-4 px-5 my-6">
      <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent3 mb-2 flex items-center gap-2">
        ▶ {label}
      </div>
      <div className="text-[13.5px] text-text leading-[1.65] [&_p]:m-0 [&_strong]:text-accent3 [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:bg-surface3 [&_code]:border [&_code]:border-border [&_code]:rounded [&_code]:px-1.5 [&_code]:py-px [&_code]:text-accent">
        {children}
      </div>
    </div>
  );
}
