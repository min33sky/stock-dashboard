import { MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../contexts/themeContext";
import { useCallback } from "react";

export default function ThemeIcon() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [setTheme, theme]);

  return (
    <button
      onClick={toggleTheme}
      className="border-1 absolute right-8 rounded-lg border-neutral-400 p-2 shadow-lg transition duration-300 hover:scale-125 xl:right-32"
    >
      <MoonIcon className="h-8 w-8 cursor-pointer fill-none stroke-neutral-400 stroke-1 dark:fill-yellow-400 dark:stroke-yellow-400" />
    </button>
  );
}
