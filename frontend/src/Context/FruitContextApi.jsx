import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
import {
  addItemToCart,
  cartData,
  productList,
  removeCart,
  sellerAuth,
  updateCart,
  userAuth,
  userData,
} from "../api/api";

const AppContext = createContext();
export const FruitContextApi = ({ children }) => {
  const currency = "GHS";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [isSellerData, setIsSellerData] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);

  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  //fetch seller data
  const fetchSellerData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/seller/seller-data",
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        setIsSellerData(data.seller);
      } else {
        toast.error(data.message);
        setIsSellerData(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const { data } = await userData();
      data.success ? setUser(data.user) : toast.error(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Error getting user data");
    }
  };

  //add to cart

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    console.log(cartData[itemId]);

    setCartItems(cartData);
    try {
      const { data } = await addItemToCart({ itemId });
      data.success ? toast.success(data.message) : toast.error(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  //remove product from cart

  const removeFromCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    try {
      const { data } = await removeCart({ itemId });

      if (data.success) {
        delete cartData[itemId];

        setCartItems(cartData);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    }
  };

  //update cart quantity
  const updateCartItem = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    try {
      const { data } = await updateCart({ itemId, quantity });
      if (data.success) {
        cartData[itemId] = quantity;
        setCartItems(cartData);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //totalCartItems

  const getCartCount = () => {
    let count = 0;

    for (const itemId in cartItems) {
      count += cartItems[itemId];
    }

    return count;
  };

  // get total amount

  const getCartAmount = () => {
    let totalPrice = 0;
    for (const itemId in cartItems) {
      let getItemInfo = products.find((item) => item._id === itemId);
      if (cartItems[itemId] > 0) {
        totalPrice += getItemInfo.offerPrice * cartItems[itemId];
      }
    }

    return Math.floor(totalPrice * 100) / 100;
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        const { data } = await sellerAuth();

        if (data.success) {
          setIsSeller(true);
          await fetchSellerData();
        } else {
          setIsSeller(false);
        }
      } catch (error) {
        setIsSeller(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    const isUserAuth = async () => {
      try {
        const { data } = await userAuth();
        if (data.success) {
          await fetchUserData();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    isUserAuth();
  }, []);

  //function to get cart data

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const { data } = await cartData();
        data.success ? setCartItems(data.cartItems) : toast.error(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    //fetch All Products
    const fetchProducts = async () => {
      try {
        const { data } = await productList();
        if (data.success) {
          console.log(data.products);
          setProducts(data.products);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const appValue = {
    currency,
    user,
    setUser,
    setIsSeller,
    isSeller,
    navigate,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    setCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    isSellerData,
  };

  return <AppContext.Provider value={appValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
