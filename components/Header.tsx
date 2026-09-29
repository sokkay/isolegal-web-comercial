"use client";
import { usePageTheme } from "@/contexts/PageTheme";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";
import IconButton from "./ui/IconButton";

type NavLink = {
  name: string;
  href: string;
};

type DropdownItem = NavLink & {
  description: string;
};

type DropdownId = "areas" | "soluciones";

const navLinks: NavLink[] = [
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Testimonios", href: "/#testimonios" },
];

const areaLinks: DropdownItem[] = [
  {
    name: "GRC",
    description: "Gobierno, riesgo y cumplimiento para empresas",
    href: "/areas/grc",
  },
  {
    name: "Resso",
    description: "Gestión RESSO para contratistas de Codelco",
    href: "/areas/resso",
  },
  {
    name: "SST",
    description: "Seguridad, salud y cumplimiento en un solo lugar",
    href: "/areas/sst",
  },
];

const solutionLinks: DropdownItem[] = [
  {
    name: "Matriz Legal",
    description: "Requisitos legales claros, actualizados y accionables",
    href: "/soluciones/matriz-legal",
  },
  {
    name: "PULSO",
    description: "Tareas, evidencia y trazabilidad en terreno",
    href: "/soluciones/pulso",
  },
  {
    name: "Modelo de Prevención del Delito",
    description: "Modelo defendible bajo la Ley 20.393 y 21.595",
    href: "/soluciones/mdp",
  },
];

const dropdownMenus: {
  id: DropdownId;
  name: string;
  items: DropdownItem[];
}[] = [
  { id: "areas", name: "Áreas", items: areaLinks },
  { id: "soluciones", name: "Soluciones", items: solutionLinks },
];

function isDropdownActive(id: DropdownId, pathname: string) {
  if (id === "areas") {
    return pathname.startsWith("/areas/");
  }

  return pathname.startsWith("/soluciones/");
}

function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn(
        "transition-transform duration-200",
        open && "rotate-180",
        className
      )}
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] =
    useState<DropdownId | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const dropdownRefs = useRef<
    Partial<Record<DropdownId, HTMLLIElement | null>>
  >({});
  const router = useRouter();
  const pathname = usePathname();
  const {
    navIndicatorColor,
    riskCalculatorHref,
    riskCalculatorPath,
    riskCalculatorSectionId,
  } = usePageTheme();

  useEffect(() => {
    const handleHashChange = () => {
      if (pathname === "/") {
        setActiveSection(window.location.hash || "/");
        return;
      }
      setActiveSection(pathname);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  useEffect(() => {
    const closeDropdowns = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideDropdown = Object.values(dropdownRefs.current).some(
        (element) => element?.contains(target)
      );

      if (!clickedInsideDropdown) {
        setOpenDropdown(null);
      }
    };

    const closeDropdownsWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", closeDropdowns);
    document.addEventListener("keydown", closeDropdownsWithKeyboard);

    return () => {
      document.removeEventListener("mousedown", closeDropdowns);
      document.removeEventListener("keydown", closeDropdownsWithKeyboard);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "#") {
      e.preventDefault();
      return;
    }

    const isOnHome = pathname === "/";

    if (href === "/") {
      e.preventDefault();
      if (!isOnHome) {
        router.push(href);
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
      router.push(href);
      setActiveSection(href);
    } else if (href.startsWith("/#")) {
      e.preventDefault();
      if (!isOnHome) {
        router.push(href);
        return;
      }

      const id = href.substring(2);
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        router.push(href);
        setActiveSection(href);
      }
    }
  };

  const handleRiskCtaClick = () => {
    const isOnCalculatorPage = pathname === riskCalculatorPath;

    if (!isOnCalculatorPage) {
      router.push(riskCalculatorHref);
      return;
    }

    const element = document.getElementById(riskCalculatorSectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      router.push(riskCalculatorHref);
      setActiveSection(riskCalculatorHref);
    }
  };

  return (
    <header className="bg-darkBlue text-nav-base sticky top-0 z-50 flex min-h-20 items-center font-medium">
      <nav className="container mx-auto flex h-20 flex-row items-center gap-4">
        <div className="flex items-center gap-8 xl:gap-12">
          <Logo goToHome />

          <ul className="hidden flex-row items-center justify-start gap-6 lg:flex xl:gap-10">
            {dropdownMenus.map((menu) => {
              const isActive = isDropdownActive(menu.id, pathname);
              const isOpen = openDropdown === menu.id;

              return (
                <li
                  key={menu.id}
                  ref={(element) => {
                    dropdownRefs.current[menu.id] = element;
                  }}
                  className="relative"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${menu.id}-menu`}
                    onClick={() =>
                      setOpenDropdown((current) =>
                        current === menu.id ? null : menu.id
                      )
                    }
                    className={cn(
                      "group relative flex cursor-pointer items-center gap-2 text-lg transition-colors",
                      isActive ? "text-nav-active" : "hover:text-nav-active"
                    )}
                  >
                    <span
                      style={{ backgroundColor: navIndicatorColor }}
                      className={cn(
                        "absolute -left-4 h-1.5 w-1.5 rounded-full transition-opacity",
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      )}
                    />
                    {menu.name}
                    <Chevron open={isOpen} className="h-4 w-4" />
                  </button>

                  <div
                    id={`${menu.id}-menu`}
                    className={cn(
                      "bg-darkBlue absolute top-full left-1/2 mt-4 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 p-2 shadow-2xl transition-all duration-200",
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    )}
                  >
                    {menu.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(event) => {
                          handleNavClick(event, item.href);
                          setOpenDropdown(null);
                        }}
                        className={cn(
                          "group block rounded-xl px-4 py-3 transition-colors hover:bg-white/10",
                          pathname === item.href && "bg-white/10"
                        )}
                      >
                        <span className="group-hover:text-nav-active block text-base font-semibold text-white transition-colors">
                          {item.name}
                        </span>
                        <span className="mt-1 block text-sm font-normal text-white/65">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </li>
              );
            })}

            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "group relative flex items-center gap-2 text-lg transition-colors",
                      isActive ? "text-nav-active" : "hover:text-nav-active"
                    )}
                  >
                    <span
                      style={{ backgroundColor: navIndicatorColor }}
                      className={cn(
                        "absolute -left-4 h-1.5 w-1.5 rounded-full transition-opacity",
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      )}
                    />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="ml-auto flex items-center gap-2 text-white">
          <ThemeToggle className="hidden sm:flex" />
          <div className="hidden items-center gap-2 sm:flex">
            <Button
              text="Calcula tu riesgo"
              variant="contained"
              color="primary"
              onClick={handleRiskCtaClick}
              className="shadow-primary/40 px-3 text-sm whitespace-nowrap shadow-lg hover:-translate-y-0.5 xl:px-6 xl:text-base"
            />
            <Button
              text="Iniciar sesión"
              variant="outline"
              color="secondary"
              href="https://app.isolegal.cl"
              className="border-white/30 px-3 text-sm whitespace-nowrap text-white hover:bg-white/10 xl:px-6 xl:text-base"
            />
          </div>

          <ThemeToggle className="sm:hidden" />
          <div className="flex h-10 w-10 items-center justify-center lg:hidden">
            <IconButton
              icon="menu"
              alt="Menú"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>

        <div
          className={cn(
            "fixed inset-0 z-50 bg-black/50 transition-all duration-300 lg:hidden",
            isMenuOpen ? "visible opacity-100" : "invisible opacity-0 delay-300"
          )}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={cn(
              "bg-darkBlue fixed inset-y-0 left-0 w-[70%] shadow-2xl transition-transform duration-300 ease-in-out sm:w-[60%]",
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-4 text-white">
              <Logo />
              <div className="flex h-10 w-10 items-center justify-center">
                <IconButton
                  icon="close"
                  alt="Cerrar menú"
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
            </div>

            <ul className="flex flex-col gap-6 px-10 pt-8 text-lg">
              {dropdownMenus.map((menu) => {
                const isActive = isDropdownActive(menu.id, pathname);
                const isOpen = openMobileDropdown === menu.id;

                return (
                  <li key={menu.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`mobile-${menu.id}-menu`}
                      onClick={() =>
                        setOpenMobileDropdown((current) =>
                          current === menu.id ? null : menu.id
                        )
                      }
                      className={cn(
                        "group relative flex w-full cursor-pointer items-center justify-between gap-2 transition-colors",
                        isActive ? "text-nav-active" : "hover:text-nav-active"
                      )}
                    >
                      <span
                        style={{ backgroundColor: navIndicatorColor }}
                        className={cn(
                          "absolute -left-6 h-2 w-2 rounded-full transition-opacity",
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        )}
                      />
                      {menu.name}
                      <Chevron open={isOpen} className="h-5 w-5" />
                    </button>

                    <div
                      id={`mobile-${menu.id}-menu`}
                      className={cn(
                        "grid transition-all duration-200",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="mt-4 space-y-1 border-l border-white/15 pl-4">
                          {menu.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={(event) => {
                                handleNavClick(event, item.href);
                                setOpenMobileDropdown(null);
                                setIsMenuOpen(false);
                              }}
                              className="block rounded-lg px-3 py-2 hover:bg-white/10"
                            >
                              <span className="block text-base font-semibold">
                                {item.name}
                              </span>
                              <span className="mt-0.5 block text-sm font-normal text-white/60">
                                {item.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}

              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        handleNavClick(e, link.href);
                        setIsMenuOpen(false);
                      }}
                      className={cn(
                        "group relative flex items-center gap-2 transition-colors",
                        isActive ? "text-nav-active" : "hover:text-nav-active"
                      )}
                    >
                      <span
                        style={{ backgroundColor: navIndicatorColor }}
                        className={cn(
                          "absolute -left-6 h-2 w-2 rounded-full transition-opacity",
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        )}
                      />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
              <li className="space-y-3 pt-6 sm:hidden">
                <Button
                  text="Calcula tu riesgo"
                  variant="contained"
                  color="primary"
                  className="w-full"
                  onClick={() => {
                    handleRiskCtaClick();
                    setIsMenuOpen(false);
                  }}
                />
                <Button
                  text="Iniciar sesión"
                  variant="outline"
                  color="secondary"
                  href="https://app.isolegal.cl"
                  className="w-full border-white/80 text-white"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
