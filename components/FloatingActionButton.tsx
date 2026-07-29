"use client";

import { usePageTheme } from "@/contexts/PageTheme";
import CalculatorIcon from "@/public/icons/calculate.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

export default function FloatingActionButton() {
  const pathname = usePathname();
  const { riskCalculatorHref, riskCalculatorPath, riskCalculatorSectionId } =
    usePageTheme();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== riskCalculatorPath) return;

    event.preventDefault();

    const calculatorSection = document.getElementById(riskCalculatorSectionId);
    if (!calculatorSection) return;

    calculatorSection.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${riskCalculatorSectionId}`);
  };

  return (
    <Link
      href={riskCalculatorHref}
      onClick={handleClick}
      aria-label="Ir a Calcula tu riesgo"
      className="group bg-primary fixed right-6 z-50 flex h-16 w-16 items-center justify-center gap-0 overflow-hidden rounded-full text-white shadow-lg ring-1 ring-white/20 transition-all duration-300 hover:w-64 hover:justify-start hover:gap-3 hover:px-5 hover:shadow-xl"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
    >
      <CalculatorIcon className="h-9 w-9 shrink-0 fill-white" />
      <span className="max-w-0 text-sm font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[220px] group-hover:opacity-100">
        Calculadora de Riesgo
      </span>
    </Link>
  );
}
