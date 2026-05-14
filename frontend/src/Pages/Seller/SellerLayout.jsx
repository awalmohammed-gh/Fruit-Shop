import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/FruitContextApi";
import {
  CirclePlus,
  ListTodo,
  ListOrdered,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { sellerLogout } from "../../api/api";
import toast from "react-hot-toast";
import { useState } from "react";

const SellerLayout = () => {
  const { setIsSeller } = useAppContext();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: <CirclePlus size={20} /> },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: <ListTodo size={20} />,
    },
    { name: "Orders", path: "/seller/orders", icon: <ListOrdered size={20} /> },
  ];

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      const { data } = await sellerLogout();
      if (data.success) {
        toast.success(data.message || "Logged out successfully");
        setIsSeller(false);
        navigate("/");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-3 bg-white shadow-sm shrink-0">
        <Link to={"/"} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Fruit.<span className="text-primary">Bay</span>
          </h1>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop user info */}
        <div className="hidden md:flex items-center gap-5 text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">A</span>
            </div>
            <p className="font-medium">Admin Panel</p>
          </div>
          <button
            onClick={logout}
            disabled={isLoggingOut}
            className="border border-gray-300 rounded-full text-sm px-5 py-1.5 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                Logging out...
              </>
            ) : (
              <>
                <LogOut size={16} />
                Logout
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 relative">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-64 lg:w-72 border-r border-gray-200 bg-white shadow-sm pt-6 flex flex-col shrink-0 overflow-y-auto">
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Seller Dashboard
            </h3>
          </div>
          <nav className="flex-1">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/seller"}
                className={({ isActive }) =>
                  `flex items-center py-3 px-6 gap-3 transition-all duration-200 mx-2 rounded-lg mb-1
                  ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                  }`
                }
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                {item.path === "/seller" && (
                  <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Mobile Sidebar (Overlay) */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed left-0 top-[65px] bottom-0 w-72 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Admin Panel</p>
                    <p className="text-xs text-gray-500">Manage your store</p>
                  </div>
                </div>
              </div>
              <nav className="py-4">
                {sidebarLinks.map((item) => (
                  <NavLink
                    to={item.path}
                    key={item.name}
                    end={item.path === "/seller"}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `flex items-center py-3 px-6 gap-3 transition-colors
                      ${
                        isActive
                          ? "bg-primary/10 text-primary border-r-4 border-primary"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                <button
                  onClick={logout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                      Logging out...
                    </>
                  ) : (
                    <>
                      <LogOut size={18} />
                      Logout
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
