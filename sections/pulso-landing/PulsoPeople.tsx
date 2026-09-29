import GroupsIcon from "@/public/icons/groups.svg";
import { cn } from "@/utils/cn";

type PulsoPeopleProps = {
  title: string;
  paragraphs: string[];
  className?: string;
};

export default function PulsoPeople({
  title,
  paragraphs,
  className,
}: PulsoPeopleProps) {
  return (
    <section className={cn("bg-darkBlue py-16 text-white sm:py-20", className)}>
      <div className="container mx-auto max-w-3xl text-center">
        <div className="relative mx-auto mb-8 flex size-16 items-center justify-center">
          <span
            aria-hidden="true"
            className="pulso-badge-ring border-primary/50 absolute -inset-2 rounded-full border"
          />
          <span
            aria-hidden="true"
            className="pulso-badge-ring border-primary/35 absolute inset-0 rounded-full border [animation-delay:400ms]"
          />
          <span className="bg-primary/15 ring-primary/40 relative flex size-16 items-center justify-center rounded-full ring-1">
            <GroupsIcon className="fill-primary size-8" aria-hidden="true" />
          </span>
        </div>
        <h2 className="text-3xl leading-tight font-extrabold sm:text-4xl">
          {title}
        </h2>
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
