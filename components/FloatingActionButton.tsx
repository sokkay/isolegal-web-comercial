"use client";

import CalculatorIcon from "@/public/icons/calculate.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

export default function FloatingActionButton() {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();

    const calculatorSection = document.getElementById("calcula-tu-riesgo");
    if (!calculatorSection) return;

    calculatorSection.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#calcula-tu-riesgo");
  };

  return (
    <Link
      href="/#calcula-tu-riesgo"
      onClick={handleClick}
      aria-label="Ir a Calcula tu riesgo"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center gap-0 overflow-hidden rounded-full bg-primary text-white shadow-lg ring-1 ring-white/20 transition-all duration-300 hover:w-64 hover:justify-start hover:gap-3 hover:px-5 hover:shadow-xl"
    >
      <CalculatorIcon className="h-7 w-7 shrink-0 fill-white" />
      <span className="max-w-0 whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[220px] group-hover:opacity-100">
        Calculadora de Riesgo
      </span>
    </Link>
  );
}
