"use client";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Button from "./ui/Button";
import IconButton from "./ui/IconButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.pathname === "/") {
        setActiveSection(window.location.hash || "/");
        return;
      }

      setActiveSection(window.location.pathname);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Soluciones", href: "/#soluciones" },
    { name: "Nosotros", href: "/#nosotros" },
    { name: "Testimonios", href: "/#testimonios" },
    { name: "Calcula tu riesgo", href: "/#calcula-tu-riesgo" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const isOnHome = window.location.pathname === "/";

    if (href === "/") {
      e.preventDefault();
      if (!isOnHome) {
        window.location.href = href;
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", href);
      setActiveSection(href);
    } else if (href.startsWith("/#")) {
      e.preventDefault();
      if (!isOnHome) {
        window.location.href = href;
        return;
      }

      const id = href.substring(2);
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.history.pushState(null, "", href);
        setActiveSection(href);
      }
    }
  };

  return (
    <header className="bg-darkBlue text-nav-base font-medium min-h-20 flex items-center z-50 sticky top-0">
      <nav className="container mx-auto flex flex-row items-center justify-between h-20">
        <Logo />

        <ul className="hidden lg:flex flex-row items-center gap-6 xl:gap-10">
          {navLinks.map((link) => {
            const isActive =
              activeSection === link.href ||
              (activeSection === "/" && link.href === "/");

            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "group relative flex items-center gap-2 transition-colors",
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
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 text-white">
          <IconButton
            icon="moon"
            alt="Modo oscuro"
            className="hidden sm:flex"
          />
          <div className="hidden sm:flex items-center gap-2">
            <Button text="Iniciar sesión" variant="contained" color="primary" />
          </div>

          <IconButton icon="moon" alt="Modo oscuro" className="sm:hidden" />
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
                    <a
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
                    </a>
                  </li>
                );
              })}
              <li className="pt-6 sm:hidden">
                <Button
                  text="Iniciar sesión"
                  variant="contained"
                  color="primary"
                  className="w-full"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
