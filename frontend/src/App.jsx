import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Policies from "./pages/Policies";
import Contact from "./pages/Contact";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";




function AppContent({ showSplash }) {
  const location = useLocation();

  // paths where navbar & footer should NOT appear
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin") ||
    showSplash;

  return (
    <>
      {!hideLayout && <Navbar />}

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard/:tab?"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [removeSplash, setRemoveSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplash) {
      setShowSplash(false);
      setRemoveSplash(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <AppWrapper
          showSplash={showSplash}
        />
      </BrowserRouter>

      {!removeSplash && (
        <SplashScreen
          onFinish={() => {
            sessionStorage.setItem("hasSeenSplash", "true");
            setShowSplash(false);
            setTimeout(() => setRemoveSplash(true), 1000);
          }}
        />
      )}
    </>
  );
}

function AppWrapper({ showSplash }) {
  const location = useLocation();

  const hidePadding =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin") ||
    showSplash;

  return (
    <div
      className={`transition-opacity ${!hidePadding ? "pt-16" : ""} ${showSplash ? "opacity-50" : "opacity-100"
        }`}
    >

      <CartProvider>
        <AppContent showSplash={showSplash} />
      </CartProvider>
    </div>
  );
}


export default App;
