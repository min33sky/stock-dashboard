export type SymbolSearchResult = {
  count: number;
  result: Result[];
};

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

/**
 * **CandleStock** Data Type
 *
 * @description
 * - c: 종가
 * - h: 고가
 * - l: 저가
 * - o: 시가
 * - s: 응답 상태
 * - t: 시간
 * - v: 거래량
 */
export type HistoricalData = {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: number[];
  v: number[];
};
