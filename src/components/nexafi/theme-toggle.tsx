import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "dark" | "light";

export const themeInitScript = `
try {
  var t = localStorage.getItem('nexafi-theme');
  if (t === 'light') document.documentElement.classList.add('light');
} catch (e) {}
`;

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("nexafi-theme") as Theme | null) ?? "dark";
    setTheme(stored);
    document.documentElement.classList.toggle("light", stored === "light");
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("nexafi-theme", next);
      document.documentElement.classList.toggle("light", next === "light");
      return next;
    });
  };

  return { theme, toggle };
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-full text-muted-foreground hover:text-foreground"
    >
      <Sun
        className={`h-[1.1rem] w-[1.1rem] transition-all duration-500 ${theme === "light" ? "scale-100 rotate-0" : "absolute scale-0 -rotate-90"}`}
      />
      <Moon
        className={`h-[1.1rem] w-[1.1rem] transition-all duration-500 ${theme === "dark" ? "scale-100 rotate-0" : "absolute scale-0 rotate-90"}`}
      />
    </Button>
  );
}
