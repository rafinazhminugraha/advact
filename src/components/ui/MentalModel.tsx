interface MentalModelProps {
  label?: string;
  children: React.ReactNode;
}

export default function MentalModel({ label = "Mental Model", children }: MentalModelProps) {
  return (
    <div className="bg-accent2/[0.05] border border-accent2/[0.15] rounded-[10px] px-5 py-4 my-4">
      <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-accent2 mb-[0.4rem]">
        {label}
      </div>
      <div className="text-[13.5px] text-muted2 leading-[1.65] [&>p]:mb-0">
        {children}
      </div>
    </div>
  );
}
