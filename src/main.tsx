import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { API_BASE_URL } from './config';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
