import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ThemeContextProvider from './contexts/themeContext.tsx';
import StockContextProvider from './contexts/stockContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <StockContextProvider>
        <App />
      </StockContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
);
