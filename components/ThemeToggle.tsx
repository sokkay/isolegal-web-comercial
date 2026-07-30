"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import IconButton from "./ui/IconButton";

const emptySubscribe = () => () => {};

export default function ThemeToggle({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted || !resolvedTheme) {
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
