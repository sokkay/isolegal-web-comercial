import AgendamientoHeading from "@/sections/agendamiento/AgendamientoHeading";
import BussinessSection from "@/sections/bussiness";

export default function AgendamientoPage() {
  return (
    <main className="bg-background mx-auto flex w-full flex-col">
      <AgendamientoHeading />
      <BussinessSection />
    </main>
  );
}
