import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/FruitContextApi";
import { dummyOrders } from "../../assets/assets";
import { Package } from "lucide-react";

const Orders = () => {
  const [getOrders, setGetOrders] = useState([]);
  const { currency } = useAppContext();

  const getFetchOrders = async () => {
    setGetOrders(dummyOrders);
  };

  useEffect(() => {
    getFetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {getOrders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col  md:items-center md:flex-row justify-between gap-5 p-5 max-w-4xl rounded-md border border-gray-300"
          >
            <div className="flex gap-5 max-w-80">
              <Package size={40} />
              <div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="font-medium">
                      {item.product.name}{" "}
                      <span className="text-primary">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm md:text-base text-black/60">
              <p className="text-black/80">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city}{" "}
              </p>
              <p>
                {order.address.state},{order.address.zipcode}
                {order.address.country}
              </p>
              <p></p>
              <p>{order.address.phone}</p>
            </div>

            <p className="font-medium text-base my-auto text-black/70">
              {currency}
              {order.amount}
            </p>

            <div className="flex flex-col text-sm md:text-base text-black/60">
              <p>Method: {order.paymentType}</p>
              <p> Status: {order.status || "1"}</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
