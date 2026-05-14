import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/FruitContextApi";
import { getUserOrder } from "../api/api";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setLoading(true);
    try {
      const { data } = await getUserOrder();
      if (data.success) {
        console.log(data);
        setMyOrders(data.orders || []);
      } else {
        toast.error(data.message || "Failed to fetch orders");
        setMyOrders([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders. Please try again.");
      setMyOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="mt-16 pb-16 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col items-end w-max mb-8">
          <p className="text-2xl font-medium uppercase">My Orders</p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">
              Loading your orders...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (myOrders.length === 0) {
    return (
      <div className="mt-16 pb-16 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col items-end w-max mb-8">
          <p className="text-2xl font-medium uppercase">My Orders</p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="bg-gray-100 rounded-full p-6 mb-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-500 mb-6">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => (window.location.href = "/products")}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dull transition"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 pb-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {/* My Orders Data */}
      <div className="space-y-6">
        {myOrders.map((order, index) => (
          <div
            className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            key={order._id || index}
          >
            {/* Order Header */}
            <div className="bg-gray-50 p-4 border-b border-gray-300">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    Order ID:{" "}
                    <span className="font-mono font-medium text-gray-700">
                      {order._id?.slice(0, 12)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    <span className="font-medium text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Shipped"
                            ? "bg-purple-100 text-purple-700"
                            : order.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {order.paymentMethod === "COD"
                      ? "Cash On Delivery"
                      : "Mobile Money"}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="divide-y divide-gray-200">
              {order.items.map((item, itemIndex) => (
                <div
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  key={itemIndex}
                >
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="bg-primary/10 p-3 rounded-lg w-20 h-20 flex items-center justify-center">
                      <img
                        src={item.image?.[0] || "/placeholder-image.jpg"}
                        className="max-w-full max-h-full object-contain"
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Category: {item.category || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-4 md:gap-8">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        Quantity:{" "}
                        <span className="font-medium">
                          {item.quantity || 1}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Price per item: {currency}
                        {(item.offerPrice || item.price)?.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        {currency}
                        {(
                          (item.offerPrice || item.price) * (item.quantity || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-300">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    Payment Method:{" "}
                    <span className="font-medium text-gray-700">
                      {order.paymentMethod === "COD"
                        ? "Cash On Delivery"
                        : "Mobile Money"}
                    </span>
                  </p>
                  {order.paymentMethod !== "COD" && (
                    <p className="text-sm text-gray-500">
                      Transaction ID:{" "}
                      <span className="font-mono text-gray-700">
                        {order.transactionId || "N/A"}
                      </span>
                    </p>
                  )}
                </div>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={fetchMyOrders}
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dull transition"
                  >
                    Track Order
                  </button>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">
                      {currency}
                      {order.amount?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
