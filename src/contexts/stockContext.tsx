import React from 'react';
import { createContext, useCallback, useState } from 'react';

interface StockContextState {
  symbol: string;
  changeSymbol: (symbol: string) => void;
}

const StockContext = createContext<StockContextState>({
  symbol: '',
  changeSymbol: () => null,
});

export default function StockContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stockSymbol, setStockSymbol] = useState('FB');

  const handleChangeSymbol = useCallback((symbol: string) => {
    setStockSymbol(symbol);
  }, []);

  return (
    <StockContext.Provider
      value={{ symbol: stockSymbol, changeSymbol: handleChangeSymbol }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = React.useContext(StockContext);

  if (!context) {
    throw new Error('Cannot find StockProvider');
  }

  return context;
}
