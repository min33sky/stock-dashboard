import { mockCompanyDetails } from "../constants/mock";
import Header from "./Header";
import Overview from "./Overview.tsx";
import Details from "./Details.tsx";
import Chart from "./Chart.tsx";
import { useStock } from "../contexts/stockContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchQuote, fetchStockDetails } from "../utils/api/stock-api.ts";

export default function Dashboard() {
  const { stockSymbol } = useStock();

  const { data: stockDetails } = useQuery({
    queryKey: ["stockDetails", stockSymbol],
    queryFn: () => fetchStockDetails(stockSymbol),
    select: (res) => res.data,
    enabled: !!stockSymbol,
    onSuccess: (data) => {
      console.log("stockDetails: ", data);
    },
  });

  const { data: quote } = useQuery({
    queryKey: ["stockQuote", stockSymbol],
    queryFn: () => fetchQuote(stockSymbol),
    select: (res) => res.data,
    enabled: !!stockSymbol,
    onSuccess: (data) => {
      console.log("stockQuote: ", data);
    },
  });

  return (
    <div
      className="grid-rows-8 md:grid-rows-7 grid h-screen auto-rows-fr grid-cols-1 gap-6 bg-neutral-100
                  p-10 font-quicksand dark:bg-gray-900 dark:text-gray-300 md:grid-cols-2
                  xl:grid-cols-3 xl:grid-rows-5"
    >
      <div className="col-span-1 row-span-1 flex items-center justify-start md:col-span-2 xl:col-span-3">
        <Header name={mockCompanyDetails.name} />
      </div>

      <div className="row-span-4 md:col-span-2">
        <Chart />
      </div>

      <div>
        <Overview
          symbol={stockSymbol}
          price={quote?.pc}
          currency={quote?.d}
          change={quote?.dp}
          changePercent={stockDetails?.currency}
        />
      </div>

      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
    </div>
  );
}
