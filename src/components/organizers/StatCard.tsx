// Interface //
interface StatCardProps {
  title: string;
  number: string;
}

/** StatCard Component */
export default function StatCard({ title, number }: StatCardProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1.5 rounded-xl bg-n-100 px-2.5 py-3 text-center">
      {/* Title  */}
      <p className="text-xs text-n-700 font-normal">{title}</p>

      {/* Number */}
      <p className="text-2xl text-n-950 font-medium ">{number}</p>
    </div>
  );
}
