export interface Result {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface Details {
  [key: string]: string | number;
  finnhubIndustry: string;
  country: string;
  ticker: string;
  marketCapitalization: number;
  phone: string;
  weburl: string;
  name: string;
  ipo: string;
  logo: string;
  currency: string;
  exchange: string;
  shareOutstanding: number;
}

export type DetailsListType = {
  [key: string]: string; //? index signature syntax
  finnhubIndustry: string;
  country: string;
  marketCapitalization: string;
  name: string;
  ipo: string;
  currency: string;
  exchange: string;
};
