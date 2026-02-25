"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";
import IconButton from "./ui/IconButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();
  const pathname = usePathname();

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
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Soluciones", href: "/#soluciones" },
    { name: "Nosotros", href: "/#nosotros" },
    { name: "Testimonios", href: "/#testimonios" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
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
    const isOnHome = pathname === "/";
    const riskSectionHref = "/#calcula-tu-riesgo";

    if (!isOnHome) {
      router.push(riskSectionHref);
      return;
    }

    const element = document.getElementById("calcula-tu-riesgo");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      router.push(riskSectionHref);
      setActiveSection(riskSectionHref);
    }
  };

  return (
    <header className="bg-darkBlue text-nav-base font-medium min-h-20 flex items-center z-50 sticky top-0">
      <nav className="container mx-auto flex flex-row items-center h-20 gap-4">
        <div className="flex items-center gap-8 xl:gap-12">
          <Logo goToHome />

          <ul className="hidden lg:flex flex-row items-center justify-start gap-6 xl:gap-10">
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.href ||
                (activeSection === "/" && link.href === "/");

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "group relative flex items-center gap-2 transition-colors text-lg",
                      isActive ? "text-nav-active" : "hover:text-nav-active"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full bg-nav-indicator transition-opacity absolute -left-4",
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
          <div className="hidden sm:flex items-center gap-2">
            <Button
              text="Calcula tu riesgo"
              variant="contained"
              color="primary"
              onClick={handleRiskCtaClick}
              className="shadow-lg shadow-primary/40 hover:-translate-y-0.5"
            />
            <Button
              text="Iniciar sesión"
              variant="outline"
              color="secondary"
              className="border-white/30 text-white hover:bg-white/10"
            />
          </div>

          <ThemeToggle className="sm:hidden" />
          <div className="lg:hidden w-10 h-10 flex items-center justify-center">
            <IconButton
              icon="menu"
              alt="Menú"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>

        <div
          className={cn(
            "fixed inset-0 bg-black/50 transition-all duration-300 lg:hidden z-50",
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible delay-300"
          )}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={cn(
              "fixed inset-y-0 left-0 w-[70%] sm:w-[60%] bg-darkBlue transition-transform duration-300 ease-in-out shadow-2xl",
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-20 flex items-center justify-between px-4 border-b border-white/10 shrink-0 text-white">
              <Logo />
              <div className="flex items-center justify-center w-10 h-10">
                <IconButton
                  icon="close"
                  alt="Cerrar menú"
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
            </div>

            <ul className="flex flex-col gap-6 text-lg px-10 pt-8">
              {navLinks.map((link) => {
                const isActive =
                  activeSection === link.href ||
                  (activeSection === "/" && link.href === "/");

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
                        className={cn(
                          "w-2 h-2 rounded-full bg-nav-indicator transition-opacity absolute -left-6",
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
              <li className="pt-6 sm:hidden space-y-3">
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
