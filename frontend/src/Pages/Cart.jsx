import { useEffect, useState } from "react";
import { useAppContext } from "../Context/FruitContextApi";
import { Plus, MoveLeft } from "lucide-react";
import { getAddress } from "../api/api";
import toast from "react-hot-toast";

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartArray, setCartArray] = useState([]);
  const [paymentOption, setPaymentOption] = useState("COD");

  const {
    products,
    getCartAmount,
    cartItems,
    currency,
    removeFromCart,
    updateCartItem,
    navigate,
    getCartCount,
  } = useAppContext();

  // CART BUILD
  const getCart = () => {
    let tempArray = [];

    for (const itemId in cartItems) {
      const product = products.find((item) => item._id === itemId);

      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[itemId],
        });
      }
    }

    setCartArray(tempArray);
  };

  // FETCH ADDRESSES
  useEffect(() => {
    const getUserAddress = async () => {
      try {
        const { data } = await getAddress();

        if (data.success) {
          const addressList = Array.isArray(data.address)
            ? data.address
            : data.address
              ? [data.address]
              : [];

          setAddresses(addressList);
          setSelectedAddress(addressList.length > 0 ? addressList[0] : null);
        } else {
          setAddresses([]);
          setSelectedAddress(null);
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        setAddresses([]);
        setSelectedAddress(null);
        toast.error("Failed to get user address");
      }
    };

    getUserAddress();
  }, []);

  // BUILD CART
  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const placeOrder = () => {};

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16 px-6 md:px-16 lg:px-24 xl:px-32">
      {/* LEFT SIDE */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-lg text-primary">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3">
          <p>Product</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center py-3"
          >
            <div className="flex items-center gap-3 md:gap-6">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`,
                  );
                  scrollTo(0, 0);
                }}
                className="w-24 h-24 border rounded cursor-pointer"
              >
                <img
                  src={product.image[0]}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              <div>
                <p className="font-semibold hidden md:block">{product.name}</p>

                <p className="text-gray-500">
                  Qty:
                  <select
                    value={cartItems[product._id]}
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                    className="ml-2"
                  >
                    {Array(10)
                      .fill("")
                      .map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>
                </p>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            <button onClick={() => removeFromCart(product._id)}>
              <Plus className="rotate-45 text-red-500" />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 mt-6 text-primary"
        >
          <MoveLeft size={18} />
          Continue Shopping
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 mt-10 border">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="my-4" />

        {/* ADDRESS */}
        <p className="text-sm font-medium uppercase">Delivery Address</p>

        <div className="relative mt-2">
          <p className="text-gray-500">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No address found"}
          </p>

          <button
            onClick={() => setShowAddress((prev) => !prev)}
            className="text-primary mt-2"
          >
            Change
          </button>

          {showAddress && (
            <div className="absolute top-12 bg-white border w-full z-10">
              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))
              ) : (
                <p className="p-2 text-gray-500 text-center">
                  No addresses found
                </p>
              )}

              <p
                onClick={() => navigate("/add-address")}
                className="p-2 text-primary text-center cursor-pointer hover:bg-primary/10"
              >
                Add address
              </p>
            </div>
          )}
        </div>

        {/* PAYMENT */}
        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

        <select
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full border px-3 py-2 mt-2"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <hr className="my-4" />

        {/* TOTAL */}
        <div className="space-y-2 text-gray-500">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount().toFixed(2)}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Tax (3%)</span>
            <span>
              {currency}
              {((getCartAmount() * 3) / 100).toFixed(2)}
            </span>
          </p>

          <p className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>
              {currency}
              {(getCartAmount() + (getCartAmount() * 3) / 100).toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full mt-6 py-3 bg-primary text-white"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
