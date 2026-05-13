import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Footer";
import { useAppContext } from "./Context/FruitContextApi";
import Login from "./Components/Login";
import AllProducts from "./Pages/AllProducts";
import ProductCategory from "./Pages/ProductCategory";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import AddAddress from "./Pages/AddAddress";
import MyOrders from "./Pages/MyOrders";
import SellerLogin from "./Components/Seller/SellerLogin";
import SellerLayout from "./Pages/Seller/SellerLayout";
import AddProduct from "./Pages/Seller/AddProduct";
import ProductList from "./Pages/Seller/ProductList";
import Orders from "./Pages/Seller/Orders";
import Contact from "./Pages/Contact";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className="text-default min-h-screen overflow-hidden text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div
        className={`${isSellerPath ? "" : ""} `}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts/>} />
          <Route path="/products/:category" element={<ProductCategory/>} />
          <Route path="/products/:category/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/add-address" element={<AddAddress/>} />
          <Route path="/my-orders" element={<MyOrders/>} />
          <Route path="/contact" element={<Contact/>} /> 
          <Route path="/seller" element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
             <Route index element={isSeller ? <AddProduct/> : null} />
             <Route path="product-list" element={isSeller ? <ProductList/> : null} />
             <Route path="orders" element={isSeller ? <Orders/> : null} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
