import { mockCompanyDetails, mockStockQuote } from '../constants/mock';
import Header from './Header';
import Overview from './Overview.tsx';
import Details from './Details.tsx';
import Chart from './Chart.tsx';

export default function Dashboard() {
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
          symbol={mockCompanyDetails.ticker}
          price={mockStockQuote.pc}
          currency={mockCompanyDetails.currency}
          change={mockStockQuote.d}
          changePercent={mockStockQuote.dp}
        />
      </div>

      <div className="row-span-2 xl:row-span-3">
        <Details details={mockCompanyDetails} />
      </div>
    </div>
  );
}
