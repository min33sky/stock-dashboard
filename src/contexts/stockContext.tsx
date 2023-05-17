import React from "react";
import { createContext, useCallback, useState } from "react";

interface StockContextState {
  stockSymbol: string;
  changeStockSymbol: (symbol: string) => void;
}

const StockContext = createContext<StockContextState>({
  stockSymbol: "",
  changeStockSymbol: () => null,
});

export default function StockContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stockSymbol, setStockSymbol] = useState("");

  const handleChangeSymbol = useCallback((symbol: string) => {
    setStockSymbol(symbol);
  }, []);

  return (
    <StockContext.Provider
      value={{
        stockSymbol: stockSymbol,
        changeStockSymbol: handleChangeSymbol,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = React.useContext(StockContext);

  if (!context) {
    throw new Error("Cannot find StockProvider");
  }

  return context;
}
