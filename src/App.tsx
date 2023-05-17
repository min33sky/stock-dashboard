import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import { useTheme } from './contexts/themeContext';

export default function App() {
  const { setTheme } = useTheme();
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, [setTheme]);

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return <Dashboard />;
}
