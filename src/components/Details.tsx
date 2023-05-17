import { Details, DetailsListType } from '../types/stock.ts';
import Card from './Card.tsx';
import { useCallback } from 'react';

interface DetailsProps {
  details: Details;
}

const detailsList: DetailsListType = {
  name: 'Name',
  country: 'Country',
  currency: 'Currency',
  exchange: 'Exchange',
  ipo: 'IPO Date',
  marketCapitalization: 'Market Capitalization',
  finnhubIndustry: 'Industry',
};

export default function Details({ details }: DetailsProps) {
  const convertMillionToBillion = useCallback((number: number) => {
    return (number / 1000).toFixed(2);
  }, []);

  return (
    <Card>
      <ul className="divide-y-1 custom-scrollbar flex h-full w-full flex-col justify-between overflow-y-scroll pr-1 xl:pr-0">
        {Object.keys(detailsList).map((item) => {
          return (
            <li
              key={item}
              className="flex flex-1 items-center justify-between text-sm lg:text-base"
            >
              <span>{detailsList[item]}</span>
              <span className="font-bold">
                {item === 'marketCapitalization'
                  ? `${convertMillionToBillion(details[item])}B`
                  : details[item]}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
