import AgendamientoHeading from "@/sections/agendamiento/AgendamientoHeading";
import BussinessSection from "@/sections/bussiness";

export default function AgendamientoPage() {
  return (
    <main className="flex w-full mx-auto flex-col bg-background">
      <AgendamientoHeading />
      <BussinessSection />
    </main>
  );
}
