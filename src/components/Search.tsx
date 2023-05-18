import { useCallback, useEffect, useRef, useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchResults from "./SearchResults";
import useOutsideClick from "../hooks/useOutsideClick";
import { useQuery } from "@tanstack/react-query";
import { searchSymbol } from "../utils/api/stock-api.ts";
import { Result } from "../types/stock.ts";
import useDebounce from "../hooks/useDebounce.ts";
import { Loader } from "./Loader.tsx";

export default function Search() {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const debouncedText = useDebounce(input, 500);
  const [bestMatches, setBestMatches] = useState<Result[]>([]);

  const searchResultRef = useOutsideClick(() => setIsVisible(false));
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoading } = useQuery({
    queryKey: ["search", debouncedText],
    queryFn: () => searchSymbol(debouncedText),
    select: (res) => res.data,
    onSuccess: (data) => {
      // console.log("result: ", data);

      setBestMatches(data.result);
    },
    onError: (error) => {
      console.log("error: ", error);
    },
    enabled: !!debouncedText,
  });

  const clear = useCallback(() => {
    setInput("");
    setBestMatches([]);
  }, []);

  const updateBestMatches = useCallback(() => {
    // 나중에 API 호출로 대체
    // setBestMatches(mockSearchResults.result);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={searchResultRef}
      className="relative z-50 my-4 flex w-96 items-center rounded-md border-2 border-neutral-200 bg-white dark:border-gray-800 dark:bg-gray-900"
    >
      <input
        ref={inputRef}
        type="text"
        value={input}
        className="w-full rounded-md px-4 py-2 focus:outline-none dark:bg-gray-900"
        placeholder="Search stock..."
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          // TODO: 현재 필요 없는듯
          if (e.key === "Enter") {
            updateBestMatches();
          }
        }}
        onFocus={() => {
          console.log("Focus 되었어요...");
          setIsVisible(true);
        }}
      />
      {input && isLoading && <Loader />}
      {input && (
        <button onClick={clear} className="m-1">
          <XMarkIcon className="h-4 w-4 fill-gray-500" />
        </button>
      )}
      <button
        onClick={updateBestMatches}
        className="m-1 flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 p-2"
      >
        <MagnifyingGlassIcon className="h-4 w-4 fill-gray-100" />
      </button>
      {isVisible && input && bestMatches.length > 0 ? (
        <SearchResults
          results={bestMatches}
          onClose={() => setIsVisible(false)}
        />
      ) : null}
    </div>
  );
}
