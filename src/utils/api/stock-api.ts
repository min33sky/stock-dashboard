import axios from 'axios';

const fetcher = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
});

export async function searchSymbol(query: string) {
  const response = await fetcher.get(
    `/search?q=${query}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
  );

  console.log(response);
  console.log(response.data);

  return response.data;
}
