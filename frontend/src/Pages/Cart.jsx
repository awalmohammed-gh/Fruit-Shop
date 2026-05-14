import { useEffect, useState } from "react";
import { useAppContext } from "../Context/FruitContextApi";
import { Plus, MoveLeft } from "lucide-react";
import { getAddress, orderPlace } from "../api/api";
import toast from "react-hot-toast";

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [cartArray, setCartArray] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [loading, setLoading] = useState(false)
  const {
    products,
    getCartAmount,
    cartItems,
    currency,
    removeFromCart,
    updateCartItem,
    navigate,
    getCartCount,
    setCartItems,
  } = useAppContext();

  // Populate cartArray when products or cartItems change
  useEffect(() => {
    if (products.length > 0 && cartItems) {
      const items = [];
      for (const itemId in cartItems) {
        const product = products.find((product) => product._id === itemId);
        if (product) {
          items.push({
            ...product,
            quantity: cartItems[itemId],
          });
        }
      }
      setCartArray(items);
    }
  }, [products, cartItems]);

  const handleSubmit = async () => {

    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (cartArray.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderItem = {
      items: cartArray,
      address: selectedAddress,
      amount: getCartAmount(),
    };

    try {
      setLoading(true)
      const { data } = await orderPlace(orderItem);
      if (paymentOption === "COD") {
        if (data.success) {
          setCartItems({});
          navigate("/my-orders");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    const getUserAddress = async () => {
      try {
        const { data } = await getAddress();
        if (data.success) {
          setAddresses(data.addresses);
          if (data.addresses && data.addresses.length > 0) {
            setSelectedAddress(data.addresses[0]);
          }
        } else {
          toast.error(data.message || "Failed to get addresses");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to get user address");
      }
    };
    getUserAddress();
  }, []); // Added empty dependency array to prevent infinite loop


if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading cart...</p>
      </div>
    </div>
  );
}

  // Show loading state while products or cartItems are loading
  if (products.length === 0 || !cartItems) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  // Show empty cart message
  if (cartArray.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen mt-16">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dull transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row mt-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-lg text-primary">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3 border-b border-gray-200 pb-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`,
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <p>Qty:</p>
                    <select
                      onChange={(e) => {
                        updateCartItem(product._id, Number(e.target.value));
                        // Update cartArray locally for immediate UI update
                        setCartArray((prev) =>
                          prev.map((item) =>
                            item._id === product._id
                              ? { ...item, quantity: Number(e.target.value) }
                              : item,
                          ),
                        );
                      }}
                      value={cartItems[product._id]}
                      className="outline-none border border-gray-300 rounded px-2 py-1"
                    >
                      {Array.from(
                        { length: Math.max(cartItems[product._id], 10) },
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}
              {(product.offerPrice * product.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => {
                removeFromCart(product._id);
                // Update cartArray locally
                setCartArray((prev) =>
                  prev.filter((item) => item._id !== product._id),
                );
              }}
              className="cursor-pointer mx-auto"
            >
              <Plus className="rotate-45 text-red-500 cursor-pointer" />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <MoveLeft size={18} />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10 shadow-lg">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  + Add new address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            value={paymentOption}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount().toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (3%)</span>
            <span>
              {currency}
              {((getCartAmount() * 3) / 100).toFixed(2)}
            </span>
          </p>
          <div className="border-t border-gray-300 my-2"></div>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency}
              {getCartAmount() === 0
                ? "0.00"
                : (getCartAmount() + (getCartAmount() * 3) / 100).toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedAddress || cartArray.length === 0}
          className={`w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium transition ${
            !selectedAddress || cartArray.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-primary-dull"
          }`}
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
