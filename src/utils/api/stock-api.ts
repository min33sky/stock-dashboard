import axios from "axios";
import { SymbolSearchResult } from "../../types/stock.ts";

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
  return fetcher.get(`/stock/profile2?symbol=${stockStymbol}`);
}

export function fetchQuote(stockStymbol: string) {
  return fetcher.get(`/quote?symbol=${stockStymbol}`);
}

export function fetchHistoricalData({
  stockStymbol,
  resolution,
  from,
  to,
}: {
  stockStymbol: string;
  resolution: string;
  from: number;
  to: number;
}) {
  return fetcher.get(
    `/stock/candle?symbol=${stockStymbol}&resolution=${resolution}&from=${from}&to=${to}`
  );
}
