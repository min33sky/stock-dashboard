import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import { useTheme } from "./contexts/themeContext";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  const { setTheme } = useTheme();
  const [isMount, setIsMount] = useState(false);
  const queryClient = new QueryClient({
    //? 전역에서 캐시를 관리할 수 있음
    queryCache: new QueryCache({
      onError: (error) => {
        console.log("전역 캐시 에러: ", error);
      },
    }),
  });

  /**
   * 테마 설정
   */
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, [setTheme]);

  /**
   * 마운트 시점
   */
  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
