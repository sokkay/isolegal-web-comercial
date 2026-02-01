"use client";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";

export default function Heading() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de envío
  };

  return (
    <div className="bg-darkBlue text-white">
      <div className="container mx-auto py-16 flex items-center flex-col lg:flex-row gap-8 xl:gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="font-extrabold text-5xl md:text-6xl leading-[1.06] tracking-[-1.5px]">
            Si te auditan, <br />
            necesitas evidencia. <br />
            No Explicaciones
          </h1>
          <p className="text-lg opacity-90">
            Centraliza tu matriz legal, evidencia y alertas en un solo lugar.
            Isolegal traduce obligaciones en acciones simples y demostrables en
            terreno.
          </p>
          <ul className="space-y-3 opacity-80">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
              Evidencia ordenada y auditable.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
              Alertas y vencimientos en tiempo real.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
              Incorporamos normativa, RCA y exigencias de mandantes (RESO, SIGO,
              RECSS) en un solo sistema.
            </li>
          </ul>
        </div>
        <div className="flex-1 w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-4 md:p-8 xl:p-16 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Nombre" />
              <Input label="Empresa" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Telefono" type="tel" />
              <Input label="Email" type="email" />
            </div>

            <TextArea label="Mensaje" />

            <Checkbox label="Términos y condiciones" />

            <Button text="Enviar" fullWidth />
          </form>
        </div>
      </div>
    </div>
  );
}
