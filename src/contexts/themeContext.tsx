import React, { createContext, useCallback, useState } from 'react';

interface ThemeContextState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextState>({
  theme: 'light',
  setTheme: () => null,
});

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleChangeTheme = useCallback(
    (theme: 'light' | 'dark') => {
      setTheme(theme);
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', theme);
    },
    [setTheme],
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('Cannot find ThemeProvider');
  }

  return context;
}
