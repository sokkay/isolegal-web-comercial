import { cn } from "@/utils/cn";
import SectionHeading from "./SectionHeading";

export type SoftwareComparisonTableRow = {
  criterion: string;
  without: string;
  with: string;
};

type SoftwareComparisonTableProps = {
  eyebrow?: string;
  title: string;
  description: string;
  withoutColumnTitle: string;
  withColumnTitle: string;
  rows: SoftwareComparisonTableRow[];
  className?: string;
};

export default function SoftwareComparisonTable({
  eyebrow,
  title,
  description,
  withoutColumnTitle,
  withColumnTitle,
  rows,
  className,
}: SoftwareComparisonTableProps) {
  return (
    <section
      className={cn("dark:bg-darkBlue bg-white py-16 sm:py-20", className)}
    >
      <div className="container mx-auto">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="border-primary/20 bg-card-background mx-auto max-w-6xl overflow-x-auto rounded-3xl border shadow-sm">
          <table className="w-full min-w-160 border-collapse text-left">
            <thead>
              <tr className="border-primary/15 border-b">
                <th scope="col" className="w-[22%] px-5 py-5 sm:px-8">
                  <span className="sr-only">Criterio</span>
                </th>
                <th
                  scope="col"
                  className="text-text/70 w-[39%] px-5 py-5 text-sm font-extrabold tracking-wide uppercase sm:px-8 sm:text-base"
                >
                  {withoutColumnTitle}
                </th>
                <th
                  scope="col"
                  className="text-primary bg-primary/5 w-[39%] px-5 py-5 text-sm font-extrabold tracking-wide uppercase sm:px-8 sm:text-base"
                >
                  {withColumnTitle}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.criterion}
                  className="border-primary/10 border-b last:border-b-0"
                >
                  <th
                    scope="row"
                    className="text-text px-5 py-5 align-top text-sm font-extrabold sm:px-8 sm:text-base"
                  >
                    {row.criterion}
                  </th>
                  <td className="text-text/70 px-5 py-5 align-top text-sm leading-7 sm:px-8">
                    {row.without}
                  </td>
                  <td className="text-text bg-primary/5 px-5 py-5 align-top text-sm leading-7 font-medium sm:px-8">
                    {row.with}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
