import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

const root = document.getElementById('root');
if (!root) {
  throw new Error('No root element found to mount the app');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
