interface TipBlockProps {
  children: React.ReactNode;
}

export default function TipBlock({ children }: TipBlockProps) {
  return (
    <div className="bg-accent/[0.05] border border-accent/[0.15] rounded-[10px] px-5 py-[0.9rem] my-4">
      <div className="text-[13.5px] text-muted2 [&>p]:mb-0 [&_strong]:text-accent [&_strong]:font-bold [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:bg-surface3 [&_code]:border [&_code]:border-border [&_code]:rounded [&_code]:px-1.5 [&_code]:py-px [&_code]:text-accent">
        {children}
      </div>
    </div>
  );
}
