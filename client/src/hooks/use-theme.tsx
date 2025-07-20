import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove("light", "dark");
    root.setAttribute("data-theme", newTheme);
    
    if (newTheme === "dark") {
      root.classList.add("dark");
      // Dark mode CSS custom properties
      root.style.setProperty('--background', '222.2% 84% 4.9%');
      root.style.setProperty('--foreground', '210% 40% 98%');
      root.style.setProperty('--card', '222.2% 84% 4.9%');
      root.style.setProperty('--card-foreground', '210% 40% 98%');
      root.style.setProperty('--popover', '222.2% 84% 4.9%');
      root.style.setProperty('--popover-foreground', '210% 40% 98%');
      root.style.setProperty('--primary', '263.4% 70% 50.4%');
      root.style.setProperty('--primary-foreground', '210% 20% 98%');
      root.style.setProperty('--secondary', '217.2% 32.6% 17.5%');
      root.style.setProperty('--secondary-foreground', '210% 40% 98%');
      root.style.setProperty('--muted', '217.2% 32.6% 17.5%');
      root.style.setProperty('--muted-foreground', '215% 20.2% 65.1%');
      root.style.setProperty('--accent', '217.2% 32.6% 17.5%');
      root.style.setProperty('--accent-foreground', '210% 40% 98%');
      root.style.setProperty('--destructive', '0 84.2% 60.2%');
      root.style.setProperty('--destructive-foreground', '210% 20% 98%');
      root.style.setProperty('--border', '217.2% 32.6% 17.5%');
      root.style.setProperty('--input', '217.2% 32.6% 17.5%');
      root.style.setProperty('--ring', '263.4% 70% 50.4%');
    } else {
      root.classList.add("light");
      // Light mode CSS custom properties
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '222.2% 84% 4.9%');
      root.style.setProperty('--card', '0 0% 100%');
      root.style.setProperty('--card-foreground', '222.2% 84% 4.9%');
      root.style.setProperty('--popover', '0 0% 100%');
      root.style.setProperty('--popover-foreground', '222.2% 84% 4.9%');
      root.style.setProperty('--primary', '263.4% 70% 50.4%');
      root.style.setProperty('--primary-foreground', '210% 20% 98%');
      root.style.setProperty('--secondary', '210% 40% 96%');
      root.style.setProperty('--secondary-foreground', '222.2% 84% 4.9%');
      root.style.setProperty('--muted', '210% 40% 96%');
      root.style.setProperty('--muted-foreground', '215.4% 16.3% 46.9%');
      root.style.setProperty('--accent', '210% 40% 96%');
      root.style.setProperty('--accent-foreground', '222.2% 84% 4.9%');
      root.style.setProperty('--destructive', '0 84.2% 60.2%');
      root.style.setProperty('--destructive-foreground', '210% 20% 98%');
      root.style.setProperty('--border', '214.3% 31.8% 91.4%');
      root.style.setProperty('--input', '214.3% 31.8% 91.4%');
      root.style.setProperty('--ring', '263.4% 70% 50.4%');
    }
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}