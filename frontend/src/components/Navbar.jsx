import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import {useGetCartQuery} from "../redux/backendApi";
import logo from "../assets/logo/logo.jpeg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { data,isLoading, error } = useGetCartQuery();
  
      const cartItems = data?.items || [];

  const navigate = useNavigate();
  // const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* LOAD USER FROM LOCAL STORAGE */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* LOGOUT HANDLER */
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-[#ff9d00]/95 text-white px-6 py-4 font-heading fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center ">
          <img
            src="https://res.cloudinary.com/dqkssrvir/image/upload/v1772029046/logo_hg37lr.jpg"
            alt="Logo"
            className="h-16 w-auto object-contain rounded-full shadow-md"
          />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex space-x-8 text-md font-bold uppercase tracking-wide">
          {["/", "/shop", "/my-orders"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-[#000000] drop-shadow-[0_0_25px_rgba(245,240,206,0.5)]"
                  : "hover:text-[#000000]"
              }
            >
              {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
            </NavLink>
          ))}
        </div>

        {/* DESKTOP RIGHT ICONS */}
        <div className="hidden md:flex items-center space-x-6">

          {/* CART */}
          <Link to="/cart" className="hover:text-[#000000] transition">
            <div className="relative">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-1 bg-gray-800 px-1 text-white text-xs rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {/* USER / LOGIN */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-full bg-white text-black
                           font-bold flex items-center justify-center uppercase"
              >
                {user.name?.charAt(0)}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.phone}</p>
                  </div>

                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-[#000000] transition">
              <FiUser size={20} />
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed top-0 right-0 h-screen w-2/4 bg-[#ff9d00] z-50 p-6 md:hidden shadow-lg">
          <button
            className="absolute top-4 right-4"
            onClick={() => setOpen(false)}
          >
            <FiX size={24} />
          </button>

          <div className="mt-16 flex flex-col space-y-6 text-lg">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
            <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>

            {user ? (
              <>

                <Link to="/my-orders" onClick={() => setOpen(false)}>
                  My Orders
                </Link>
                <span className="font-semibold">User: {user.phone}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="text-left text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
