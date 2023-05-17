import { useCallback, useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchResults from "./SearchResults";
import useOutsideClick from "../hooks/useOutsideClick";
import { useQuery } from "@tanstack/react-query";
import { searchSymbol } from "../utils/api/stock-api.ts";
import { Result } from "../types/stock.ts";

export default function Search() {
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState<Result[]>([]);

  // TODO:  외부 클릭 시 검색 결과를 닫는 로직 (닫는 로직 개선 필요??)
  const searchResultRef = useOutsideClick(() => setBestMatches([]));

  useQuery({
    queryKey: ["search", input],
    queryFn: () => searchSymbol(input),
    select: (res) => res.data,
    onSuccess: (data) => {
      // console.log("result: ", data);
      setBestMatches(data.result);
    },
    onError: (error) => {
      console.log("error: ", error);
    },
    enabled: !!input,
  });

  const clear = useCallback(() => {
    setInput("");
    setBestMatches([]);
  }, []);

  const updateBestMatches = useCallback(() => {
    // 나중에 API 호출로 대체
    // setBestMatches(mockSearchResults.result);
  }, []);

  return (
    <div
      ref={searchResultRef}
      className="relative z-50 my-4 flex w-96 items-center rounded-md border-2 border-neutral-200 bg-white dark:border-gray-800 dark:bg-gray-900"
    >
      <input
        type="text"
        value={input}
        className="w-full rounded-md px-4 py-2 focus:outline-none dark:bg-gray-900"
        placeholder="Search stock..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateBestMatches();
          }
        }}
      />
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
      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} />
      ) : null}
    </div>
  );
}
