interface CardGridProps {
  children: React.ReactNode;
}

export default function CardGrid({ children }: CardGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 mb-6">
      {children}
    </div>
  );
}
