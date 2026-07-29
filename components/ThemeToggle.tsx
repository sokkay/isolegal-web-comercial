"use client";

import { useTheme } from "next-themes";
import IconButton from "./ui/IconButton";

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) {
    return <IconButton icon="moon" alt="Tema" className={className} disabled />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <IconButton
      icon={resolvedTheme === "dark" ? "sun" : "moon"}
      alt={resolvedTheme === "dark" ? "Modo claro" : "Modo oscuro"}
      onClick={toggleTheme}
      className={className}
    />
  );
}
