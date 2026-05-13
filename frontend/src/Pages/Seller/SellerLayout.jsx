import { NavLink, Link } from "react-router-dom";
import { useAppContext } from "../../Context/FruitContextApi";
import { CirclePlus, ListTodo, ListOrdered } from "lucide-react";
import { Outlet } from "react-router-dom";
import { sellerLogout } from "../../api/api";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { setIsSeller } = useAppContext();

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
    try {
      const {data} = await sellerLogout();
      if(data.success){
        toast.success(data.message);
        setIsSeller(false)
      }else{
         toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white shrink-0">
        <Link to={"/"}>
          <h1 className="text-xl sm:text-3xl font-bold tracking-wider">
            Fruit.<span className="text-primary">Bay</span>
          </h1>
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p className="hidden sm:block">Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-5 py-1.5 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="md:w-64 w-20 border-r border-gray-300 pt-4 flex flex-col shrink-0 overflow-y-auto">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({
                isActive,
              }) => `flex items-center py-3 md:px-4 px-3 gap-3 transition-colors
                                ${
                                  isActive
                                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-50 border-transparent"
                                }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="md:inline hidden">{item.name}</span>
            </NavLink>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
