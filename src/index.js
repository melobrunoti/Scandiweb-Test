import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StoreProvider from './Context/StoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
