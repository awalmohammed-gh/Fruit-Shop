import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Search, ShoppingBag, Menu, User, ShoppingCart } from "lucide-react";
import { useAppContext } from "../Context/FruitContextApi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
  } = useAppContext();
  const [openUser, setOpenUser] = useState(false);

  const logoutFunc = async () => {
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery,navigate]);

  return (
    <div className="sticky top-0 left-0 right-0 z-50 w-full bg-white shadow-sm">
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 py-4 bg-white relative">
        <NavLink to={"/"} onClick={() => setOpen(false)}>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Fruit.<span className="text-primary">Bay</span>
          </h2>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <NavLink to={"/"} className="hover:text-primary transition-colors">
            Home
          </NavLink>
          <NavLink
            to={"/products"}
            className="hover:text-primary transition-colors"
          >
            Products
          </NavLink>
          <NavLink
            to={"/contact"}
            className="hover:text-primary transition-colors"
          >
            Contact
          </NavLink>

          <div className="hidden lg:flex items-center gap-2 border border-gray-300 px-3 rounded-full focus-within:border-primary transition-colors">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="py-1.5 w-48 bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
            <Search size={18} className="text-gray-400" />
          </div>

          <div
            onClick={() => navigate(`/cart`)}
            className="relative cursor-pointer hover:text-primary transition-colors"
          >
            <ShoppingBag size={20} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </div>

          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-6 py-1.5 bg-primary hover:bg-primary/90 transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <div
                onClick={() => setOpenUser(!openUser)}
                className="cursor-pointer font-bold bg-primary w-8 h-8 flex items-center justify-center text-white rounded-full hover:bg-primary/90 transition-colors"
              >
                {user.name?.[0] || user.email?.[0] || "U"}
              </div>
              {openUser && (
                <div className="absolute top-10 right-0 bg-white shadow-lg border border-gray-200 rounded-lg py-2 w-44 z-50">
                  <button
                    onClick={() => {
                      setOpenUser(false);
                      navigate("/seller");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Seller Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setOpenUser(false);
                      navigate("/my-orders");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={() => {
                      setOpenUser(false);
                      logoutFunc();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          <div
            onClick={() => navigate(`/cart`)}
            className="relative cursor-pointer"
          >
            <ShoppingCart size={20} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="cursor-pointer p-1"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col gap-3 md:hidden z-50 max-h-[80vh] overflow-y-auto">
            <NavLink
              onClick={() => setOpen(false)}
              to={"/"}
              className="block py-2 hover:text-primary transition-colors"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to={"/products"}
              className="block py-2 hover:text-primary transition-colors"
            >
              Products
            </NavLink>
            {user && (
              <>
                <NavLink
                  onClick={() => setOpen(false)}
                  to={"/my-orders"}
                  className="block py-2 hover:text-primary transition-colors"
                >
                  My Orders
                </NavLink>
                <NavLink
                  onClick={() => setOpen(false)}
                  to={"/seller"}
                  className="block py-2 hover:text-primary transition-colors"
                >
                  Seller Dashboard
                </NavLink>
              </>
            )}
            <NavLink
              onClick={() => setOpen(false)}
              to={"/contact"}
              className="block py-2 hover:text-primary transition-colors"
            >
              Contact
            </NavLink>

            {/* Mobile Search */}
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5 my-2">
              <Search size={16} className="text-gray-400" />
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                className="flex-1 bg-transparent outline-none text-sm"
                type="text"
                placeholder="Search products"
              />
            </div>

            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary/90 transition text-white rounded-full text-sm w-full"
              >
                Login
              </button>
            ) : (
              <button
                onClick={logoutFunc}
                className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary/90 transition text-white rounded-full text-sm w-full"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
