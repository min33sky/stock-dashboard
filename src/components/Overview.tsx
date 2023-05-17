import Card from "./Card.tsx";

interface OverviewProps {
  symbol: string;
  price?: number;
  currency?: number;
  change?: number;
  changePercent?: string;
}

export default function Overview({
  symbol,
  price,
  currency,
  change,
  changePercent,
}: OverviewProps) {
  return (
    <Card>
      <span className="absolute left-4 top-4 text-lg text-neutral-400 xl:text-xl 2xl:text-2xl">
        {symbol}
      </span>
      <div className="flex h-full w-full items-center justify-around">
        <span className="flex items-center text-lg xl:text-2xl 2xl:text-3xl">
          {price && (
            <>
              ${price}
              <span className="m-2 text-lg text-neutral-400 xl:text-2xl 2xl:text-3xl">
                {currency}
              </span>
            </>
          )}
        </span>
        <span
          className={`text-lg xl:text-xl 2xl:text-2xl ${
            change ? (change > 0 ? "text-lime-500" : "text-red-500") : ""
          }`}
        >
          {change && (
            <>
              {change} <span>({changePercent}%)</span>
            </>
          )}
        </span>
      </div>
    </Card>
  );
}
