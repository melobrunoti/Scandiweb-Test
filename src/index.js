import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StoreProvider from './Context/StoreProvider';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>
);
