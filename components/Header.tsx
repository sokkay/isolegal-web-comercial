"use client";
import { usePageTheme } from "@/contexts/PageTheme";
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
  const { riskCalculatorHref, riskCalculatorPath, riskCalculatorSectionId } =
    usePageTheme();

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
                      "group relative flex items-center gap-2 text-lg transition-colors",
                      isActive ? "text-nav-active" : "hover:text-nav-active"
                    )}
                  >
                    <span
                      className={cn(
                        "bg-nav-indicator absolute -left-4 h-1.5 w-1.5 rounded-full transition-opacity",
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
              className="shadow-primary/40 shadow-lg hover:-translate-y-0.5"
            />
            <Button
              text="Iniciar sesión"
              variant="outline"
              color="secondary"
              href="https://app.isolegal.cl"
              className="border-white/30 text-white hover:bg-white/10"
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
                          "bg-nav-indicator absolute -left-6 h-2 w-2 rounded-full transition-opacity",
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
