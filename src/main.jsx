// src/main.jsx (Corrected)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// 💡 FIX: Import BrowserRouter from react-router-dom
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Use BrowserRouter as a wrapper component */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)