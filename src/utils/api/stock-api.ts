import axios from "axios";
import { Details, Quote, SymbolSearchResult } from "../../types/stock.ts";

const fetcher = axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: import.meta.env.VITE_FINNHUB_API_KEY,
  },
});

export function searchSymbol(query: string) {
  return fetcher.get<SymbolSearchResult>(`/search?q=${query}`);
}

export function fetchStockDetails(stockStymbol: string) {
  return fetcher.get<Details>(`/stock/profile2?symbol=${stockStymbol}`);
}

export function fetchQuote(stockStymbol: string) {
  return fetcher.get<Quote>(`/quote?symbol=${stockStymbol}`);
}

export function fetchHistoricalData({
  stockSymbol,
  resolution,
  from,
  to,
}: {
  stockSymbol: string;
  resolution: string;
  from: number;
  to: number;
}) {
  return fetcher.get(
    `/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}`
  );
}
