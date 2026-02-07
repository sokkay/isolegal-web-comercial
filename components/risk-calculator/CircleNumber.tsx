export default function CircleNumber({ number }: { number: number }) {
  return (
    <div className="w-8 h-8 rounded-full bg-checkbox-bg flex items-center justify-center shrink-0">
      <span className="text-primary text-sm font-bold">{number}</span>
    </div>
  );
}
