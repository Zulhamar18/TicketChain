import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './ThemeContext.jsx';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter> {/* 👈 buka */}
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter> {/* 👈 tutup di sini */}
    </React.StrictMode>
  );
} else {
  console.error("❌ Element with id 'root' not found in index.html");
}

