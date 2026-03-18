import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  const toggle = () => {
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  return { 
    theme: theme === "system" ? resolvedTheme : theme, 
    toggle 
  };
}
