import React, { useContext, useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllOrders() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userID = decoded.id;

  const [ordersList, setOrdersList] = useState([]);

  async function getUserOrders() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`
      );
      if (res.statusText == "OK") {
        setOrdersList(res.data);
      }
    } catch (err) {
      toast.error("something went wrong!");
    }
  }

  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    getUserOrders();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-center text-5xl font-medium py-5 my-2 rounded-2xl bg-blue-400 text-white drop-shadow-2xl border-4 dark:bg-gray-800 dark:text-gray-100">
        My Orders
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersList?.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
                  {order.createdAt.split("T")[0]}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
                  {order.cartItems.length} Items
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
                  {order.totalOrderPrice} EGP
                </td>
                <td className="px-6 py-4 font-semibold capitalize text-gray-900 dark:text-gray-100">
                  {order.paymentMethodType}
                </td>
                <td className="px-6 py-4">
                  <Link to={order._id}>
                    <button className="font-medium cursor-pointer text-blue-400 hover:underline dark:text-blue-300">
                      View Order
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}