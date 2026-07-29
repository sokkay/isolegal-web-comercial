export default function CircleNumber({ number }: { number: number }) {
  return (
    <div className="bg-checkbox-bg flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
      <span className="text-primary text-sm font-bold">{number}</span>
    </div>
  );
}
