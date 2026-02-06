"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import IconButton from "./ui/IconButton";

export default function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton icon="moon" alt="Tema" className={className} disabled />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <IconButton
      icon={theme === "dark" ? "sun" : "moon"}
      alt={theme === "dark" ? "Modo claro" : "Modo oscuro"}
      onClick={toggleTheme}
      className={className}
    />
  );
}
