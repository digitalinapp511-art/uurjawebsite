// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { CartProvider } from "./context/CartContext";
// import './index.css'
// import App from './App.jsx'
// import { AuthProvider } from './context/AuthContext.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//       <CartProvider>
//         <App />
//       </CartProvider>
//     </AuthProvider>
//   </StrictMode>,
// )
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./redux/store.js";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);