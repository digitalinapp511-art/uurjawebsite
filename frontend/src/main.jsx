import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from "./context/CartContext";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>

  </StrictMode>,
)
