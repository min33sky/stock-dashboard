import {Result} from "../types/stock.ts";

interface Props {
  results: Result[];
}

export default function SearchResults({ results }: Props) {
  return (
    <ul className="custom-scrollbar absolute top-12 h-64 w-full overflow-y-scroll rounded-md border-2 border-neutral-200 bg-white">
      {results.map((item) => (
        <li
          key={item.symbol}
          className="m-2 flex cursor-pointer items-center justify-between rounded-md p-4 hover:bg-indigo-200"
        >
          <span>{item.symbol}</span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
}
