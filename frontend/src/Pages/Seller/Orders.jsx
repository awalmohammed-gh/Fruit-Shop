import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/FruitContextApi";
import { Package, RefreshCw, Search, Filter } from "lucide-react";
import { allOrders, updateStatus } from "../../api/api";
import toast from "react-hot-toast";

const Orders = () => {
  const [getOrders, setGetOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { currency } = useAppContext();

  const getFetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await allOrders();
      if (data.success) {
        setGetOrders(data.orders || []);
      } else {
        toast.error(data.message || "Failed to fetch orders");
        setGetOrders([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders. Please try again.");
      setGetOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (orderId, event) => {

    try {
      const { data } = await updateStatus({ orderId, status: event.target.value });
      if (data.success) {
        toast.success(data.message || "Order status updated successfully");
        // Refresh orders to get updated data from server
        await getFetchOrders();
      } else {
        toast.error(data.message || "Failed to update status");

      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    getFetchOrders();
  }, []);

  // Filter orders based on search and status
  const filteredOrders = getOrders.filter((order) => {
    const matchesSearch =
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address?.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.address?.lastName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.items?.some((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status color mapping
  const getStatusColor = (status) => {
    const colors = {
      "Order Placed": "bg-yellow-100 text-yellow-800",
      Processing: "bg-blue-100 text-blue-800",
      Packed: "bg-purple-100 text-purple-800",
      Shipping: "bg-indigo-100 text-indigo-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Loading state
  if (loading) {
    return (
      <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
        <div className="md:p-10 p-4">
          <h2 className="text-lg font-medium mb-6">Orders List</h2>
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex-1 h-screen flex flex-col justify-between">
      <div className="md:p-10 p-4 space-y-6">
        {/* Header with title and refresh button */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Orders Management
          </h2>
          <button
            onClick={getFetchOrders}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by Order ID, Customer name, or Product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
            >
              <option value="all">All Status</option>
              <option value="Order Placed">Order Placed</option>
              <option value="Processing">Processing</option>
              <option value="Packed">Packed</option>
              <option value="Shipping">Shipping</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Count */}
        <div className="text-sm text-gray-500">
          Showing {filteredOrders.length} of {getOrders.length} orders
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Package size={60} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-400">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No orders have been placed yet"}
            </p>
          </div>
        ) : (
          filteredOrders.map((order, index) => (
            <div
              key={order._id || index}
              className="flex flex-col lg:flex-row justify-between gap-6 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow bg-white"
            >
              {/* Order Items */}
              <div className="flex gap-5 min-w-[200px]">
                <Package size={40} className="text-primary flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 font-mono">
                    Order ID: {order._id?.slice(-8)}
                  </p>
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex flex-col">
                      <p className="font-medium text-gray-800">
                        {item.name}{" "}
                        <span className="text-primary">x {item.quantity}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        {currency}
                        {(item.offerPrice || item.price) * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="text-sm text-gray-600 min-w-[200px]">
                <p className="font-semibold text-gray-800 mb-1">
                  Shipping Address
                </p>
                <p>
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p>
                  {order.address?.street}, {order.address?.city}
                </p>
                <p>
                  {order.address?.state}, {order.address?.zipcode}
                </p>
                <p>{order.address?.country}</p>
                <p className="mt-1"> {order.address?.phone}</p>
              </div>

              {/* Order Amount */}
              <div className="min-w-[100px]">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-primary">
                  {currency}
                  {order.amount?.toFixed(2)}
                </p>
              </div>

              {/* Order Details & Status */}
              <div className="text-sm text-gray-600 min-w-[180px]">
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-500 text-xs">Payment Method</p>
                    <p className="font-medium">
                      {order.paymentMethod === "COD"
                        ? "Cash On Delivery"
                        : "Mobile Money"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Order Date</p>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Payment Status</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Order Status</p>
                    <select
                      value={order.status}
                      onChange={(e) => updateUserStatus(order._id, e)}
                      className={`border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/50 ${getStatusColor(order.status)}`}
                    >
                      <option value="Order Placed" className="text-gray-800">
                        Order Placed
                      </option>
                      <option value="Processing" className="text-gray-800">
                        Processing
                      </option>
                      <option value="Packed" className="text-gray-800">
                        Packed
                      </option>
                      <option value="Shipping" className="text-gray-800">
                        Shipping
                      </option>
                      <option value="Delivered" className="text-gray-800">
                        Delivered
                      </option>
                      <option value="Cancelled" className="text-gray-800">
                        Cancelled
                      </option>
                    </select>
                   
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
