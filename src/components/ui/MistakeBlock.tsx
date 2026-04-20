interface MistakeBlockProps {
  children: React.ReactNode;
}

export default function MistakeBlock({ children }: MistakeBlockProps) {
  return (
    <div className="bg-accent5/[0.05] border border-accent5/[0.15] rounded-[10px] py-4 px-5 my-6">
      <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent5 mb-3 flex items-center gap-2">
        Kesalahan Umum
      </div>
      <ul className="list-none m-0 [&_li]:relative [&_li]:pl-6 [&_li]:mb-2 [&_li]:text-[13.5px] [&_li]:text-muted2 [&_li:last-child]:mb-0 [&_li::before]:content-['✕'] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:top-0 [&_li::before]:text-accent5 [&_li::before]:font-bold [&_li::before]:text-[12px] [&_code]:bg-accent5/[0.1] [&_code]:text-[#fca5a5] [&_code]:border [&_code]:border-accent5/[0.2] [&_code]:px-1.5 [&_code]:py-px [&_code]:rounded [&_code]:font-mono [&_code]:text-[12.5px]">
        {children}
      </ul>
    </div>
  );
}
