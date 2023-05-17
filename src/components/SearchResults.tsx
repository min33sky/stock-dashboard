import { Result } from "../types/stock.ts";
import { useStock } from "../contexts/stockContext.tsx";

interface Props {
  results: Result[];
}

export default function SearchResults({ results }: Props) {
  const { changeStockSymbol } = useStock();

  return (
    <ul className="dark:custom-scrollbar-dark custom-scrollbar absolute top-12 h-64 w-full overflow-y-scroll rounded-md border-2 border-neutral-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {results.map((item) => (
        <li
          key={item.symbol}
          className="m-2 flex cursor-pointer items-center justify-between rounded-md p-4 hover:bg-indigo-200 dark:hover:bg-indigo-600"
          onClick={() => changeStockSymbol(item.symbol)}
        >
          <span>{item.symbol}</span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
}
